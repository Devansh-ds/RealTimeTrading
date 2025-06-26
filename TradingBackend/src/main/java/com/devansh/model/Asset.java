package com.devansh.model;

import com.devansh.repo.UserRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private double quantity;
    private double buyPrice;

    @ManyToOne
    private Coin coin;

    @JsonIgnore
    @ManyToOne
    private User user;

}
