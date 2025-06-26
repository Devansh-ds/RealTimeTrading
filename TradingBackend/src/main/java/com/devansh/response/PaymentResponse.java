package com.devansh.response;

public record PaymentResponse(
        String paymentId,
        String paymentUrl
) {
}
