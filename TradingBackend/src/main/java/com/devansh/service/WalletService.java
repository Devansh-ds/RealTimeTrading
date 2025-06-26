package com.devansh.service;

import com.devansh.exception.UserException;
import com.devansh.exception.WalletException;
import com.devansh.model.User;
import com.devansh.model.Wallet;
import com.devansh.model.WalletTransactionType;
import com.devansh.request.WalletTransactionRequest;

import java.math.BigDecimal;

public interface WalletService {

    Wallet getUserWallet(User user);
    Wallet addBalanceToWallet(Double money, User walletUser) throws WalletException;

    Wallet removeBalanceToWallet(BigDecimal money, User walletUser) throws WalletException;

    Wallet findWalletById(Long walletId) throws WalletException;
    Wallet walletToWalletTransfer(User senderUser, Integer receiverId, WalletTransactionRequest request) throws UserException, WalletException;

    void saveWalletTransaction(Wallet senderWallet, WalletTransactionType transactionType,
                               Integer recipientId, String purpose, BigDecimal amount) throws WalletException;

    Wallet payOrderPayment(Integer orderId, User user) throws WalletException;

}
