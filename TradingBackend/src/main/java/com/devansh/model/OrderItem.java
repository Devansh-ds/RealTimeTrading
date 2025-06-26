package com.devansh.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Coin coin;

    private BigDecimal buyPrice;
    private Double quantity;
    private BigDecimal sellPrice;

    @JsonIgnore
    @OneToOne
    private Order order;
}
