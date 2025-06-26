package com.devansh.service;

import com.devansh.exception.UserException;
import com.devansh.exception.WalletException;
import com.devansh.model.*;
import com.devansh.repo.OrderRepository;
import com.devansh.repo.UserRepository;
import com.devansh.repo.WalletRepository;
import com.devansh.repo.WalletTransactionRepository;
import com.devansh.request.WalletTransactionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final WalletTransactionRepository walletTransactionRepository;

    @Override
    public Wallet getUserWallet(User user) {
        Wallet wallet = walletRepository.findByUserId(user.getId());
        if (wallet == null) {
            Wallet newWallet = Wallet
                    .builder()
                    .user(user)
                    .balance(new BigDecimal(0))
                    .build();
            wallet = walletRepository.save(newWallet);
        }
        return wallet;
    }

    @Override
    public Wallet addBalanceToWallet(Double money, User walletUser) throws WalletException {
        Wallet wallet = walletRepository.findByUserId(walletUser.getId());
        if (wallet == null) {
            throw new WalletException("wallet not found with user id: " + walletUser.getId());
        }
        if (money < 0) {
            throw new WalletException("invalid money: " + money);
        }
        BigDecimal balance = wallet.getBalance();
        balance = balance.add(BigDecimal.valueOf(money));
        wallet.setBalance(balance);

        saveWalletTransaction(wallet, WalletTransactionType.ADD_MONEY, walletUser.getId(), "Adding money", BigDecimal.valueOf(money));

        return walletRepository.save(wallet);
    }

    @Override
    public Wallet removeBalanceToWallet(BigDecimal money, User walletUser) throws WalletException {
        Wallet wallet = walletRepository.findByUserId(walletUser.getId());
        if (wallet == null) {
            throw new WalletException("wallet not found with user id: " + walletUser.getId());
        }
        if (money.compareTo(BigDecimal.valueOf(0)) < 0) {
            throw new WalletException("invalid money: " + money);
        }
        BigDecimal balance = wallet.getBalance();
        balance = balance.subtract(money);
        wallet.setBalance(balance);

        return walletRepository.save(wallet);
    }

    @Override
    public Wallet findWalletById(Long walletId) throws WalletException {
        return walletRepository
                .findById(walletId)
                .orElseThrow(() -> new WalletException("wallet not found with Id: " + walletId));
    }

    @Transactional
    @Override
    public Wallet walletToWalletTransfer(User sendedUser, Integer receiverId, WalletTransactionRequest req) throws UserException, WalletException {
        Wallet senderWallet = getUserWallet(sendedUser);
        User receiver = userRepository
                .findById(receiverId)
                .orElseThrow(() -> new UserException("user not found with id: " + receiverId));
        Wallet recipientWallet = getUserWallet(receiver);

        if (senderWallet.getBalance().compareTo(req.amount()) < 0) {
            throw new WalletException("Insufficient balance...");
        }

        senderWallet.setBalance(senderWallet.getBalance().subtract(req.amount()));
        recipientWallet.setBalance(recipientWallet.getBalance().add(req.amount()));

        Wallet senderUpdatedWallet = walletRepository.save(senderWallet);
        walletRepository.save(recipientWallet);

        saveWalletTransaction(senderWallet, WalletTransactionType.WALLET_TRANSFER, receiver.getId(), req.purpose(), req.amount());

        return senderUpdatedWallet;
    }

    @Override
    public void saveWalletTransaction(Wallet senderWallet, WalletTransactionType transactionType,
                                      Integer recipientId, String purpose, BigDecimal amount) throws WalletException {
        WalletTransaction walletTransaction = WalletTransaction
                .builder()
                .recipientId(recipientId)
                .purpose(purpose)
                .amount(amount)
                .type(transactionType)
                .wallet(senderWallet)
                .date(LocalDateTime.now())
                .build();
        walletTransactionRepository.save(walletTransaction);
    }

    @Override
    public Wallet payOrderPayment(Integer orderId, User user) throws WalletException {
        Wallet wallet = getUserWallet(user);
        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() -> new WalletException("order not found with id: " + orderId));

        if (order.getOrderType().equals(OrderType.BUY)) {
            if(wallet.getBalance().compareTo(order.getPrice()) < 0) {
                throw new WalletException("Insufficient funds for this transaction.");
            }
            BigDecimal newBalance = wallet.getBalance().subtract(order.getPrice());
            wallet.setBalance(newBalance);
            walletRepository.save(wallet);

            saveWalletTransaction(wallet, WalletTransactionType.BUY_ASSET, user.getId(), "Purchase of asset", order.getPrice());
        } else {
            BigDecimal newBalance = wallet.getBalance().add(order.getPrice());
            wallet.setBalance(newBalance);
            walletRepository.save(wallet);

            saveWalletTransaction(wallet, WalletTransactionType.SELL_ASSET, user.getId(), "Selling asset", order.getPrice());
        }

        return wallet;
    }
}
