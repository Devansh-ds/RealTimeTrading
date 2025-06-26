package com.devansh.service;

import com.devansh.exception.WalletException;
import com.devansh.exception.WithdrawalException;
import com.devansh.model.User;
import com.devansh.model.Withdrawal;

import java.math.BigDecimal;
import java.util.List;

public interface WithdrawalService {

    Withdrawal requestWithdrawal(BigDecimal amount, User user) throws WalletException;
    Withdrawal proceedWithdrawal(Integer withdrawalId, boolean accepted) throws WithdrawalException, WalletException;
    List<Withdrawal> getUsersWithdrawalHistory(User user);
    List<Withdrawal> getAllWithdrawalRequest();

}
