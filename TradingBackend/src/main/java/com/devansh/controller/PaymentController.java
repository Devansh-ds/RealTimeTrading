package com.devansh.controller;

import com.devansh.exception.PaymentException;
import com.devansh.exception.UserException;
import com.devansh.model.PaymentMethod;
import com.devansh.model.PaymentOrder;
import com.devansh.model.User;
import com.devansh.response.PaymentResponse;
import com.devansh.service.PaymentService;
import com.devansh.service.UserService;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final UserService userService;

    @PostMapping("/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(
            @PathVariable PaymentMethod paymentMethod,
            @PathVariable BigDecimal amount,
            @RequestHeader("Authorization") String token
            ) throws UserException, RazorpayException, StripeException {
        User user = userService.findByJwtToken(token);
        PaymentResponse paymentResponse;

        PaymentOrder order = paymentService.createOrder(user, amount, paymentMethod);
        if (paymentMethod.equals(PaymentMethod.RAZORPAY)) {
            paymentResponse = paymentService.createRazorpayPayment(user, amount, order.getId());
        } else {
            paymentResponse = paymentService.createStripePayment(user, amount, order.getId());
        }
        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }


}


















