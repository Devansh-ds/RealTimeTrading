package com.devansh.controller;

import com.devansh.model.Coin;
import com.devansh.model.Order;
import com.devansh.model.OrderType;
import com.devansh.model.User;
import com.devansh.request.CreateOrderRequest;
import com.devansh.service.CoinService;
import com.devansh.service.OrderService;
import com.devansh.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final CoinService coinService;

    @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(
            @RequestHeader("Authorization") String token,
            @RequestBody CreateOrderRequest req
    ) throws Exception {
        User user = userService.findByJwtToken(token);
        Coin coin = coinService.findById(req.coinId());

        return ResponseEntity.ok(orderService.processOrder(
                coin, req.quantity(),
                req.orderType(), user)
        );
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(
            @RequestHeader("Authorization") String token,
            @PathVariable Integer orderId
    ) throws Exception {
        User user = userService.findByJwtToken(token);
        return ResponseEntity.ok(orderService.getOrderById(orderId, user));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders(
            @RequestHeader("Authorization") String token,
            @RequestParam(required = false) OrderType order_type,
            @RequestParam(required = false) String asset_symbol
    ) throws Exception {
        User user = userService.findByJwtToken(token);
        return ResponseEntity.ok(
                orderService.getAllOrderOfUser(user.getId(), order_type, asset_symbol)
        );
    }

}





















