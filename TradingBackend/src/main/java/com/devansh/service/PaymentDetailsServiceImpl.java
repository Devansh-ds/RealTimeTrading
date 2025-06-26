package com.devansh.service;

import com.devansh.exception.UserException;
import com.devansh.model.PaymentDetails;
import com.devansh.model.User;
import com.devansh.repo.PaymentDetailsRepository;
import com.devansh.request.CreatePaymentDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentDetailsServiceImpl implements PaymentDetailsService {

    private final PaymentDetailsRepository paymentDetailsRepository;

    @Override
    public PaymentDetails addPaymentDetails(CreatePaymentDetails req, User user) {
        PaymentDetails paymentDetails = paymentDetailsRepository.findByUserId(user.getId());
        if (paymentDetails == null) {
            paymentDetails = new PaymentDetails();
        }
        paymentDetails.setUser(user);
        if (req.accountHolderName() != null) {
            paymentDetails.setAccountHolderName(req.accountHolderName());
        }
        if (req.bankName() != null) {
            paymentDetails.setBankName(req.bankName());
        }
        if (req.accountNumber() != null) {
            paymentDetails.setAccountNumber(req.accountNumber());
        }
        if (req.ifscCode() != null) {
            paymentDetails.setIfscCode(req.ifscCode());
        }
        return paymentDetailsRepository.save(paymentDetails);
    }

    @Override
    public PaymentDetails getUsersPaymentDetails(User user) throws UserException {
        PaymentDetails paymentDetails = paymentDetailsRepository.findByUserId(user.getId());
        if (paymentDetails == null) {
            throw new UserException("user does not have payment details with userId: " + user.getId());
        }
        return paymentDetails;
    }
}
