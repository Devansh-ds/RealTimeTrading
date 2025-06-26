package com.devansh.service;

import com.devansh.exception.WalletException;
import com.devansh.exception.WithdrawalException;
import com.devansh.model.*;
import com.devansh.repo.WithdrawalRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class WithdrawalServiceImpl implements WithdrawalService {

    private final WithdrawalRepository withdrawalRepository;
    private final WalletService walletService;

    @Override
    public Withdrawal requestWithdrawal(BigDecimal amount, User user) throws WalletException {
        Withdrawal withdrawal = new Withdrawal();
        withdrawal.setAmount(amount);
        withdrawal.setUser(user);
        withdrawal.setDateTime(LocalDateTime.now());
        withdrawal.setStatus(WithdrawalStatus.PENDING);

        Wallet userWallet = walletService.getUserWallet(user);

        walletService.removeBalanceToWallet(amount, user);
        walletService.saveWalletTransaction(
                userWallet, WalletTransactionType.WITHDRAWAL,
                user.getId(), "Bank account withdrawal", amount
        );

        return withdrawalRepository.save(withdrawal);
    }

    @Transactional
    @Override
    public Withdrawal proceedWithdrawal(Integer withdrawalId, boolean accepted) throws WithdrawalException, WalletException {
        Withdrawal withdrawal = withdrawalRepository
                .findById(withdrawalId)
                .orElseThrow(() -> new WithdrawalException("withdrawal not found with id: " + withdrawalId));
        withdrawal.setDateTime(LocalDateTime.now());
        if (accepted) {
            withdrawal.setStatus(WithdrawalStatus.SUCCESS);
        } else {
            withdrawal.setStatus(WithdrawalStatus.DECLINE);
             walletService.addBalanceToWallet(withdrawal.getAmount().doubleValue(), withdrawal.getUser());
        }
        return withdrawalRepository.save(withdrawal);
    }

    @Override
    public List<Withdrawal> getUsersWithdrawalHistory(User user) {
        return withdrawalRepository.findByUserId(user.getId());
    }

    @Override
    public List<Withdrawal> getAllWithdrawalRequest() {
        return withdrawalRepository.findAll();
    }
}
