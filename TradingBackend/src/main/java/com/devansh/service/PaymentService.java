package com.devansh.service;

import com.devansh.exception.PaymentException;
import com.devansh.model.PaymentMethod;
import com.devansh.model.PaymentOrder;
import com.devansh.model.User;
import com.devansh.response.PaymentResponse;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

import java.math.BigDecimal;

public interface PaymentService {

    PaymentOrder createOrder(User user, BigDecimal amount, PaymentMethod paymentMethod);
    PaymentOrder getOrderById(Integer paymentOrderId) throws PaymentException;
    Boolean proceedPaymentOrder(Integer paymentOrderId, String paymentId) throws PaymentException, RazorpayException;
    PaymentResponse createRazorpayPayment(User user, BigDecimal amount, Integer orderId) throws RazorpayException;
    PaymentResponse createStripePayment(User user, BigDecimal amount, Integer orderId) throws StripeException;

}
