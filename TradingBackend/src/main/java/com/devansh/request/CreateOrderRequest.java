package com.devansh.request;

import com.devansh.model.OrderType;

public record CreateOrderRequest(
        String coinId,
        double quantity,
        OrderType orderType
) {
}
