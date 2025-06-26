package com.devansh.exception;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
public record ErrorResponse (
        LocalDateTime timestamp,
        String errorMessage,
        String endpoint
) {
}
