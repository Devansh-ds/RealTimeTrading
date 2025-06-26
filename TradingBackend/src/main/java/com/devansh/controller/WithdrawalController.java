package com.devansh.controller;

import com.devansh.exception.UserException;
import com.devansh.exception.WalletException;
import com.devansh.exception.WithdrawalException;
import com.devansh.model.User;
import com.devansh.model.Withdrawal;
import com.devansh.service.UserService;
import com.devansh.service.WithdrawalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/withdrawal")
public class WithdrawalController {

    private final WithdrawalService withdrawalService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Withdrawal> withdrawal(@RequestHeader("Authorization") String token,
                                                 @RequestParam BigDecimal amount
    ) throws UserException, WalletException {
        User user = userService.findByJwtToken(token);
        return ResponseEntity.ok(withdrawalService.requestWithdrawal(amount, user));
    }

    @PatchMapping("/admin/{wId}/proceed/{accept}")
    public ResponseEntity<Withdrawal> proceedWithdrawal(
            @PathVariable Integer wId,
            @PathVariable boolean accept,
            @RequestHeader("Authorization") String token
    ) throws WalletException, WithdrawalException {
        return ResponseEntity.ok(withdrawalService.proceedWithdrawal(wId, accept));
    }

    @GetMapping
    public ResponseEntity<List<Withdrawal>> getWithdrawalHistory(@RequestHeader("Authorization") String token) throws UserException {
        User user = userService.findByJwtToken(token);
        return ResponseEntity.ok(withdrawalService.getUsersWithdrawalHistory(user));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Withdrawal>> getWithdrawalRequests(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(withdrawalService.getAllWithdrawalRequest());
    }



}

















