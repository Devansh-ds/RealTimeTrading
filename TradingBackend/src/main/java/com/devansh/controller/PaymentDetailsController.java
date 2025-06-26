package com.devansh.controller;

import com.devansh.exception.UserException;
import com.devansh.model.PaymentDetails;
import com.devansh.model.User;
import com.devansh.request.CreatePaymentDetails;
import com.devansh.service.PaymentDetailsService;
import com.devansh.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment-details")
public class PaymentDetailsController {

    private final PaymentDetailsService paymentDetailsService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<PaymentDetails> addPaymentDetails(
            @RequestBody CreatePaymentDetails request,
            @RequestHeader("Authorization") String token
            ) throws UserException {
        User user = userService.findByJwtToken(token);
        return ResponseEntity.ok(paymentDetailsService.addPaymentDetails(request, user));
    }

    @GetMapping
    public ResponseEntity<PaymentDetails> getUserPaymentDetails(
            @RequestHeader("Authorization") String token
    ) throws UserException {
        User user = userService.findByJwtToken(token);
        return ResponseEntity.ok(paymentDetailsService.getUsersPaymentDetails(user));
    }

}
