package com.devansh.service;

import com.devansh.exception.CoinException;
import com.devansh.exception.HttpException;
import com.devansh.model.Coin;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CoinService {
    String getMarketChart(String coinId, int days) throws HttpException;
    String getCoinDetails(String coinId) throws HttpException;
    Coin findById(String coinId) throws CoinException;
    String searchCoin(String keyword) throws HttpException;
    String getTopCoinsByMarketCapRank() throws HttpException;
    String getTradingCoins() throws HttpException;
    List<Coin> getFilteredCoins(String name, String symbol, Double minPrice, Double maxPrice, Pageable pageable);
}
