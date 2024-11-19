package com.app.back.service.payment;

import com.app.back.domain.payment.PaymentDTO;

import java.util.List;
import java.util.Optional;

public interface PaymentService {

    public void save(PaymentDTO paymentDTO);
    public Optional<PaymentDTO> findById(Long id);
    public List<PaymentDTO> findAll();
    public void update(PaymentDTO paymentDTO);
    public void deleteById(Long id);
    public int getTotalPayments(Long memberId);
    public List<PaymentDTO> findByMemberId(Long memberId);
    public List<PaymentDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate);
}
