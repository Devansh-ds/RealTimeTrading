package com.devansh.security;

import com.devansh.exception.OtpException;
import com.devansh.exception.TokenInvalidException;
import com.devansh.exception.UserAlreadyExistException;
import com.devansh.exception.UserException;
import com.devansh.model.Role;
import com.devansh.request.*;
import com.devansh.response.AuthenticationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity register(
            @RequestBody RegisterRequest request) throws UserAlreadyExistException {
        if (request.getRole() == null) {
            request.setRole(Role.USER);
        }
        return authenticationService.register(request);
    }

    @PostMapping("/authenticate")
    public ResponseEntity register(
            @RequestBody AuthenticationRequest request) throws UserException {
        return authenticationService.authenticate(request);

    }

    @PostMapping("/refreshToken")
    public ResponseEntity<AuthenticationResponse> refreshToken(@RequestHeader("Authorization") String refreshToken)
            throws IOException, TokenInvalidException {
        return ResponseEntity.ok(authenticationService.refreshToken(refreshToken));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity otpVerificationHandler(@RequestBody OtpVerificationRequest request) throws ExecutionException, OtpException {
        return authenticationService.verifyOtp(request);
    }

    @PutMapping("/reset-password")
    public ResponseEntity resetPasswordHandler(@RequestBody ResetPasswordRequest request) throws UserException {
        return authenticationService.resetPassword(request);
    }

    @PutMapping("/enable-2-fact-auth")
    public ResponseEntity enableTwoFactorAuth(@RequestBody EnableTwoFactAuthRequest request) throws UserException {
        return authenticationService.enable2FactAuth(request);
    }




}

