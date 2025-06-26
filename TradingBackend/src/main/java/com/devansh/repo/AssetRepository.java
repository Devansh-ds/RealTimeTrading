package com.devansh.repo;

import com.devansh.model.Asset;
import com.devansh.model.Coin;
import com.devansh.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, Integer> {
    List<Asset> findByUserId(Integer userId);
    Asset findByUserIdAndCoinId(Integer userId, String coinId);

    Integer user(User user);

    String coin(Coin coin);
}
