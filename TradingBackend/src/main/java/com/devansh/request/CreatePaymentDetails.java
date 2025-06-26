package com.devansh.request;

public record CreatePaymentDetails(
        String accountNumber,
        String accountHolderName,
        String ifscCode,
        String bankName
) {
}
