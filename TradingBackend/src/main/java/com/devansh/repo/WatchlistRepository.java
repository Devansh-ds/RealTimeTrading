package com.devansh.repo;

import com.devansh.model.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WatchlistRepository extends JpaRepository<WatchList, Integer> {
    Optional<WatchList> findByUserId(Integer id);
}
