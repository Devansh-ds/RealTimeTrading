package com.devansh.security;

import com.devansh.config.JwtService;
import com.devansh.exception.TokenInvalidException;
import com.devansh.exception.UserAlreadyExistException;
import com.devansh.exception.UserException;
import com.devansh.model.Role;
import com.devansh.model.User;
import com.devansh.repo.TokenRepository;
import com.devansh.repo.UserRepository;
import com.devansh.request.AuthenticationRequest;
import com.devansh.request.OtpContext;
import com.devansh.request.OtpVerificationRequest;
import com.devansh.request.RegisterRequest;
import com.devansh.response.AuthenticationResponse;
import com.devansh.service.EmailService;
import com.devansh.token.Token;
import com.devansh.token.TokenType;
import com.google.common.cache.LoadingCache;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;
    private final LoadingCache oneTimePasswordCache;
    private final EmailService emailService;


    public ResponseEntity register(RegisterRequest request) throws UserAlreadyExistException {

        var user = User.builder()
                .fullname(request.getFullname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .createdAt(LocalDateTime.now())
                .isActive(true)
                .isEmailVerified(false)
                .build();

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistException("Email already in use: " + request.getEmail());
        }

        sendOtp(user, "Verify your account");
        return ResponseEntity.ok(getOtpSendMessage());
    }

    private Map getOtpSendMessage() {
        final var response = new HashMap<>();
        response.put("message", "OTP sent successfully sent to your registered email-address. verify it using /verify-otp endpoint");
        return response;
    }

    private void sendOtp(User savedUser, String subject) {
//        oneTimePasswordCache.invalidate(savedUser.getEmail());
        final var otp = new Random().ints(1, 100000, 999999).sum();

        // cache user details + otp
        Map<String, Object> data = new HashMap<>();
        data.put("otp", otp);
        data.put("fullname", savedUser.getFullname());
        data.put("email", savedUser.getEmail());
        data.put("role", savedUser.getRole());
        data.put("password", savedUser.getPassword());

        oneTimePasswordCache.put(savedUser.getEmail(), data);

        System.out.println("Otp sent :: " + otp);

        CompletableFuture.supplyAsync(() -> {
            emailService.sendEmail(savedUser.getEmail(), subject, "OTP: " + otp);
            return HttpStatus.OK;
        }).thenAccept(status -> {
            System.out.println("Email sent successfully with status: " + status);
        });
    }

    public ResponseEntity verifyOtp(final OtpVerificationRequest otpVerificationRequestDto) throws ExecutionException {
        Object cached = oneTimePasswordCache.get(otpVerificationRequestDto.getEmailId());
        if (cached instanceof Map) {
            Map<String, Object> data = (Map<String, Object>) cached;
            int otp = (Integer) data.get("otp");

            if (otp != otpVerificationRequestDto.getOneTimePassword()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid otp");
            }

            if (otpVerificationRequestDto.getContext().equals(OtpContext.SIGN_UP)) {
                User user = User.builder()
                        .fullname((String) data.get("fullname"))
                        .email((String) data.get("email"))
                        .password((String) data.get("password"))
                        .role((Role) data.get("role"))
                        .createdAt(LocalDateTime.now())
                        .isActive(true)
                        .isEmailVerified(true)
                        .build();
                user = userRepository.save(user);

                // invalidating OTP
                oneTimePasswordCache.invalidate(user.getEmail());

                String accessToken = jwtService.generateToken(user);
                String refreshToken = jwtService.generateRefreshToken(user);

                return ResponseEntity
                        .ok(AuthenticationResponse.builder()
                                .accessToken(accessToken)
                                .refreshToken(refreshToken)
                                .build());

            } else if (otpVerificationRequestDto.getContext().equals(OtpContext.LOGIN)) {
                User loginUser = userRepository
                        .findByEmail(otpVerificationRequestDto.getEmailId())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found with id: " + otpVerificationRequestDto.getEmailId()));

                String accessToken = jwtService.generateToken(loginUser);
                String refreshToken = jwtService.generateRefreshToken(loginUser);

                return ResponseEntity
                        .ok(AuthenticationResponse.builder()
                                .accessToken(accessToken)
                                .refreshToken(refreshToken)
                                .build());
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP-Context not supported");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, otpVerificationRequestDto.getEmailId() + " does not have a valid otp");
        }
//        Integer storedOneTimePassword = null;
//        try {
//            storedOneTimePassword = (Integer) oneTimePasswordCache.get(user.getEmail());
//        } catch (ExecutionException e) {
//            System.out.println("FAILED TO FETCH PAIR FROM OTP CACHE: " + e);
//            throw new ResponseStatusException(HttpStatus.NOT_IMPLEMENTED);
//        }

//        if (storedOneTimePassword.equals(otpVerificationRequestDto.getOneTimePassword())) {
//
//            if (otpVerificationRequestDto.getContext().equals(OtpContext.SIGN_UP)) {
//
//                user.setEmailVerified(true);
//                user = userRepository.save(user);
//
//                String accessToken = jwtService.generateToken(user);
//                String refreshToken = jwtService.generateRefreshToken(user);
//
//                return ResponseEntity
//                        .ok(AuthenticationResponse.builder().accessToken(accessToken)
//                                .refreshToken(refreshToken).build());
//
//            } else if (otpVerificationRequestDto.getContext().equals(OtpContext.LOGIN)) {
//
//                String accessToken = jwtService.generateToken(user);
//                String refreshToken = jwtService.generateRefreshToken(user);
//
//                return ResponseEntity
//                        .ok(AuthenticationResponse.builder().accessToken(accessToken)
//                                .refreshToken(refreshToken).build());
//
//            } else if (otpVerificationRequestDto.getContext().equals(OtpContext.ACCOUNT_DELETION)) {
//                user.setActive(false);
//                user = userRepository.save(user);
//                return ResponseEntity.ok().build();
//            }
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
//        } else {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
//        }
    }


    public ResponseEntity authenticate(AuthenticationRequest request) throws UserException {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserException(request.getEmail() + " does not exist"));

        if (!user.isActive()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Account not active");
        }

        sendOtp(user, "2FA: Request to log in to your account");
        return ResponseEntity.ok(getOtpSendMessage());
    }

//    private void saveUserToken(User savedUser, String jwtToken) {
//        var token = new Token(
//                jwtToken,
//                TokenType.BEARER,
//                false,
//                false,
//                savedUser
//        );
//        tokenRepository.save(token);
//    }

    public AuthenticationResponse refreshToken(String refreshToken) throws TokenInvalidException {

        String userEmail;

        if (refreshToken == null || !refreshToken.startsWith("Bearer ")) {
            throw new TokenInvalidException("token might be null or empty");
        }

        refreshToken = refreshToken.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail != null) {
            var user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UsernameNotFoundException(userEmail));

            if (jwtService.validateToken(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                return new AuthenticationResponse(accessToken, refreshToken);
            } else {
                throw new TokenInvalidException("refresh token is invalid");
            }
        } else {
            throw new TokenInvalidException("Weird refresh token");
        }

    }
}













