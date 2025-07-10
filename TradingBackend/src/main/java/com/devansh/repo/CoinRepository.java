package com.devansh.repo;

import com.devansh.model.Coin;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CoinRepository extends JpaRepository<Coin, String> {

    @Query("SELECT c FROM Coin c " +
            "WHERE (:name IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))) " +
            "AND (:symbol IS NULL OR LOWER(c.symbol) LIKE LOWER(CONCAT('%', :symbol, '%'))) " +
            "AND (:minPrice IS NULL OR c.currentPrice >= :minPrice) " +
            "AND (:maxPrice IS NULL OR c.currentPrice <= :maxPrice)")
    List<Coin> filterCoins(
            @Param("name") String name,
            @Param("symbol") String symbol,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable
    );

    @Query("select count(*) from Coin")
    Integer getTotalCount();
}
