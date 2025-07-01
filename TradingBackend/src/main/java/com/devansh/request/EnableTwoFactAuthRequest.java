package com.devansh.request;

public record EnableTwoFactAuthRequest(
        String email,
        boolean enableTwoFactAuth
) {
}
