package com.devansh.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Withdrawal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private WithdrawalStatus status;
    private LocalDateTime dateTime = LocalDateTime.now();
    private BigDecimal amount;

    @JsonIgnore
    @ManyToOne
    private User user;


}
