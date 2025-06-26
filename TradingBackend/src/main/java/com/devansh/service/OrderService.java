package com.devansh.service;

import com.devansh.exception.AssetException;
import com.devansh.exception.OrderException;
import com.devansh.exception.WalletException;
import com.devansh.model.*;

import java.util.List;

public interface OrderService {

    Order getOrderById(Integer orderId, User user) throws OrderException;
    Order createOrder(User user, OrderItem orderItem, OrderType orderType);
    List<Order> getAllOrderOfUser(Integer userId, OrderType orderType, String assetSymbol);
    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws WalletException, OrderException, AssetException;


}
