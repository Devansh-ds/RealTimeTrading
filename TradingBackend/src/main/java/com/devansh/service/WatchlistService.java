package com.devansh.service;

import com.devansh.exception.CoinException;
import com.devansh.exception.WatchlistException;
import com.devansh.model.User;
import com.devansh.model.WatchList;

public interface WatchlistService {

    WatchList findUserWatchlist(User user);
    WatchList createWatchlist(User user);
    WatchList findById(Integer id) throws WatchlistException;
    WatchList addItemToWatchlist(User user, String coinId) throws CoinException;

}
