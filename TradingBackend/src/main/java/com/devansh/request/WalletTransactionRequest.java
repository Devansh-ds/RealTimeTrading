package com.devansh.request;

import java.math.BigDecimal;

public record WalletTransactionRequest(
        String purpose,
        BigDecimal amount
) {
}
