package com.app.back.repository.payment;

import com.app.back.domain.payment.PaymentDTO;
import com.app.back.mapper.payment.PaymentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class PaymentDAO {
    private final PaymentMapper paymentMapper;

    public void save(PaymentDTO paymentDTO) {
        paymentMapper.insert(paymentDTO);
    }

    public Optional<PaymentDTO> findById(Long id) {
        return Optional.ofNullable(paymentMapper.selectById(id));
    }

    public List<PaymentDTO> findAll() {
        return paymentMapper.selectAll();
    }

    public void update(PaymentDTO donationRecordDTO) {
        paymentMapper.update(donationRecordDTO);
    }

    public void deleteById(Long id) {
        paymentMapper.deleteById(id);
    }

    public int getTotalPaymentByMemberId(Long memberId) {
        return paymentMapper.selectTotalPaymentByMemberId(memberId);
    }

    public List<PaymentDTO> findByMemberId(Long memberId) {
        return paymentMapper.selectByMemberId(memberId);
    }
    public List<PaymentDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return paymentMapper.selectByMemberIdAndDateRange(memberId, startDate, endDate);
    }
}
