package com.devansh.service;

import com.devansh.exception.UserException;
import com.devansh.model.PaymentDetails;
import com.devansh.model.User;
import com.devansh.request.CreatePaymentDetails;

public interface PaymentDetailsService {

    PaymentDetails addPaymentDetails(CreatePaymentDetails req, User user);
    PaymentDetails getUsersPaymentDetails(User user) throws UserException;

}
