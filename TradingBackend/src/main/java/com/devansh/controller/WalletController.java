package com.devansh.controller;

import com.devansh.exception.OrderException;
import com.devansh.exception.PaymentException;
import com.devansh.exception.UserException;
import com.devansh.exception.WalletException;
import com.devansh.model.Order;
import com.devansh.model.PaymentOrder;
import com.devansh.model.User;
import com.devansh.model.Wallet;
import com.devansh.request.WalletTransactionRequest;
import com.devansh.response.PaymentResponse;
import com.devansh.service.OrderService;
import com.devansh.service.PaymentService;
import com.devansh.service.UserService;
import com.devansh.service.WalletService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/wallet")
public class WalletController {

    private final WalletService walletService;
    private final UserService userService;
    private final OrderService orderService;
    private final PaymentService paymentService;

    @GetMapping
    public ResponseEntity<Wallet> getUserWallet(@RequestHeader("Authorization") String token) throws UserException {
        User user = userService.findByJwtToken(token);
        return ResponseEntity.ok(walletService.getUserWallet(user));
    }

    @PutMapping("/add")
    public ResponseEntity<Wallet> addBalanceWallet(@RequestHeader("Authorization") String token,
                                                   @RequestParam("money") double money) throws UserException, WalletException {
        User user = userService.findByJwtToken(token);
        return ResponseEntity.ok(walletService.addBalanceToWallet(money, user));
    }

    @PutMapping("/transfer/user/{receiverId}")
    public ResponseEntity<Wallet> walletToWalletTransfer(
            @RequestHeader("Authorization") String token,
            @PathVariable Integer receiverId,
            @RequestBody WalletTransactionRequest req
            ) throws UserException, WalletException {
        User senderUser = userService.findByJwtToken(token);
        return ResponseEntity.ok(walletService.walletToWalletTransfer(senderUser, receiverId, req));
    }

    @GetMapping("/{walletId}")
    public ResponseEntity<Wallet> getWalletById(@PathVariable Long walletId) throws UserException, WalletException {
        return ResponseEntity.ok(walletService.findWalletById(walletId));
    }

    @PutMapping("/order/{orderId}/pay")
    public ResponseEntity<Wallet> payOrderPayment(
            @RequestHeader("Authorization") String token,
            @PathVariable Integer orderId
    ) throws UserException, WalletException, OrderException {
        User user = userService.findByJwtToken(token);
        Order order = orderService.getOrderById(orderId, user);
        return ResponseEntity.ok(walletService.payOrderPayment(order.getId(), user));
    }

    @PutMapping("/deposit")
    public ResponseEntity<Wallet> addBalanceToWallet(
            @RequestHeader("Authorization") String token,
            @RequestParam(name = "order_id") Integer orderId,
            @RequestParam(name = "payment_id") String paymentId
    ) throws UserException, WalletException, OrderException, PaymentException, RazorpayException {
        User user = userService.findByJwtToken(token);
        Wallet wallet = walletService.getUserWallet(user);

        PaymentOrder order = paymentService.getOrderById(orderId);
        Boolean status = paymentService.proceedPaymentOrder(orderId, paymentId);

        if (wallet.getBalance() == null) {
            wallet.setBalance(BigDecimal.valueOf(0));
        }

        if (status) {
            wallet = walletService.addBalanceToWallet(order.getAmount().doubleValue(), user);
        }

        return new ResponseEntity<>(wallet, HttpStatus.CREATED);
    }

}























