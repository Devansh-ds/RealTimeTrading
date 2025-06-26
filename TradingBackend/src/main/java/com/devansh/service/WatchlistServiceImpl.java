package com.devansh.service;

import com.devansh.exception.CoinException;
import com.devansh.exception.WatchlistException;
import com.devansh.model.Coin;
import com.devansh.model.User;
import com.devansh.model.WatchList;
import com.devansh.repo.WatchlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WatchlistServiceImpl implements WatchlistService {

    private final WatchlistRepository watchlistRepository;
    private final CoinService coinService;

    @Override
    public WatchList findUserWatchlist(User user) {
        Optional<WatchList> watchlist = watchlistRepository.findByUserId(user.getId());
        if (watchlist.isPresent()) {
            return watchlist.get();
        } else {
            WatchList newWatchlist = new WatchList();
            newWatchlist.setUser(user);
            return watchlistRepository.save(newWatchlist);
        }
    }

    @Override
    public WatchList createWatchlist(User user) {
        WatchList newWatchlist = new WatchList();
        newWatchlist.setUser(user);
        return watchlistRepository.save(newWatchlist);
    }

    @Override
    public WatchList findById(Integer id) throws WatchlistException {
        return watchlistRepository
                .findById(id)
                .orElseThrow(() -> new WatchlistException("Watchlist not found with id: "+ id));
    }

    @Override
    public WatchList addItemToWatchlist(User user, String coinId) throws CoinException {
        WatchList watchlist = findUserWatchlist(user);
        Coin coin = coinService.findById(coinId);

        if (watchlist.getCoin().contains(coin)) {
            watchlist.getCoin().remove(coin);
        } else {
            watchlist.getCoin().add(coin);
        }
        return watchlistRepository.save(watchlist);
    }
}
