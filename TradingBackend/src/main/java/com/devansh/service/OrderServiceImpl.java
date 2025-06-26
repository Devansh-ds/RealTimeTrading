package com.devansh.service;

import com.devansh.exception.AssetException;
import com.devansh.exception.OrderException;
import com.devansh.exception.WalletException;
import com.devansh.model.*;
import com.devansh.repo.OrderItemRepository;
import com.devansh.repo.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final WalletService walletService;
    private final AssetService assetService;
    private final OrderItemRepository orderItemRepository;

    @Override
    public Order getOrderById(Integer orderId, User user) throws OrderException {
        Order savedOrder = orderRepository
                .findById(orderId)
                .orElseThrow(() -> new OrderException("order not found for Id: " + orderId));
        if (!savedOrder.getUser().getId().equals(user.getId())) {
            throw new OrderException("user id mismatch with order");
        }
        return savedOrder;
    }

    @Override
    public Order createOrder(User user, OrderItem orderItem, OrderType orderType) {
        double price = orderItem.getCoin().getCurrentPrice()*orderItem.getQuantity();

        Order order = Order
                .builder()
                .user(user)
                .orderType(orderType)
                .orderItem(orderItem)
                .price(BigDecimal.valueOf(price))
                .timeStamp(LocalDateTime.now())
                .status(OrderStatus.PENDING)
                .build();

        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrderOfUser(Integer userId, OrderType orderType, String assetSymbol) {
        return orderRepository.findByUserId(userId);
    }

    private OrderItem createOrderItem(Coin coin, double quantity,
                                      double buyPrice, double sellPrice) {
        OrderItem orderItem = OrderItem
                .builder()
                .coin(coin)
                .quantity(quantity)
                .buyPrice(BigDecimal.valueOf(buyPrice))
                .sellPrice(BigDecimal.valueOf(sellPrice))
                .build();
        return orderItemRepository.save(orderItem);
    }

    @Transactional
    public Order buyAsset(Coin coin, double quantity, User user) throws OrderException, WalletException, AssetException {
        if (quantity <= 0) {
            throw new OrderException("Quantity should be greater than 0");
        }

        double buyPrice = coin.getCurrentPrice();
        OrderItem orderItem = createOrderItem(coin, quantity, buyPrice, 0);
        Order order = createOrder(user, orderItem, OrderType.BUY);
        
        orderItem.setOrder(order);
        orderItemRepository.save(orderItem);

        walletService.payOrderPayment(order.getId(), user);

        order.setStatus(OrderStatus.SUCCESS);
        order.setOrderType(OrderType.BUY);
        Order savedOrder = orderRepository.save(order);

        // create asset
        Asset oldAsset = assetService.findAssetByUserIdAndCoinId(
                savedOrder.getUser().getId(),
                savedOrder.getOrderItem().getCoin().getId()
        );
        if (oldAsset == null) {
            assetService.createAsset(user, orderItem.getCoin(), orderItem.getQuantity());
        } else {
            assetService.updateAsset(oldAsset.getId(), orderItem.getQuantity());
        }

        return savedOrder;
    }

    @Transactional
    public Order sellAsset(Coin coin, double quantity, User user) throws OrderException, WalletException, AssetException {
        if (quantity <= 0) {
            throw new OrderException("Quantity should be greater than 0");
        }

        Asset assetToSell = assetService.findAssetByUserIdAndCoinId(user.getId(), coin.getId());
        if (assetToSell == null) {
            throw new AssetException("asset not found to sell from");
        }
        double sellPrice = coin.getCurrentPrice();
        double buyPrice = assetToSell.getBuyPrice();

        OrderItem orderItem = createOrderItem(coin, quantity, buyPrice , sellPrice);
        Order order = createOrder(user, orderItem, OrderType.SELL);

        orderItem.setOrder(order);
        orderItemRepository.save(orderItem);

        if (assetToSell.getQuantity() >= quantity) {
            walletService.payOrderPayment(order.getId(), user);
            order.setStatus(OrderStatus.SUCCESS);
            order.setOrderType(OrderType.SELL);
            Order savedOrder = orderRepository.save(order);

            Asset updatedAsset = assetService.updateAsset(assetToSell.getId(), -quantity);
            if (updatedAsset.getQuantity()*coin.getCurrentPrice() <= 0) {
                assetService.deleteAsset(updatedAsset.getId());
            }
            return savedOrder;
        }
        throw new OrderException("Insufficient quantity to sell");
    }

    @Override
    @Transactional
    public Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws WalletException, OrderException, AssetException {
        if (orderType.equals(OrderType.BUY)) {
            return buyAsset(coin, quantity, user);
        } else if (orderType.equals(OrderType.SELL)) {
            return sellAsset(coin, quantity, user);
        } else {
            throw new OrderException("Unknown order type");
        }
    }
}





















