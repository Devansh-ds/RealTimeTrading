package com.devansh.repo;

import com.devansh.model.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails, Integer> {
    PaymentDetails findByUserId(Integer id);
}
