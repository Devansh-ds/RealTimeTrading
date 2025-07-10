package com.devansh.controller;

import com.devansh.exception.CoinException;
import com.devansh.exception.UserException;
import com.devansh.model.User;
import com.devansh.model.WatchList;
import com.devansh.service.UserService;
import com.devansh.exception.WatchlistException;
import com.devansh.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/watchlist")
public class WatchlistController {

    private final WatchlistService watchlistService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<WatchList> getUserWatchlist(@RequestHeader("Authorization") String token) throws UserException {
        User user = userService.findByJwtToken(token);
        return ResponseEntity.ok(watchlistService.findUserWatchlist(user));
    }

    @GetMapping("/{watchlistId}")
    public ResponseEntity<WatchList> getUserWatchlist(@PathVariable("watchlistId") Integer watchlistId) throws UserException, WatchlistException {
        return ResponseEntity.ok(watchlistService.findById(watchlistId));
    }

    @PutMapping("/add/coin/{coinId}")
    public ResponseEntity<WatchList> addItemToWatchlist(@PathVariable("coinId") String coinId,
                                                   @RequestHeader("Authorization") String token) throws UserException, CoinException {
        User user = userService.findByJwtToken(token);
        return ResponseEntity.ok(watchlistService.addItemToWatchlist(user, coinId));
    }




}
