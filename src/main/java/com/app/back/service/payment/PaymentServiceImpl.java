package com.app.back.service.payment;

import com.app.back.domain.payment.PaymentDTO;
import com.app.back.repository.payment.PaymentDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class PaymentServiceImpl implements PaymentService {
    private final PaymentDAO paymentDAO;

    @Override
    public void save(PaymentDTO paymentDTO) {
        paymentDAO.save(paymentDTO);
    }

    @Override
    public Optional<PaymentDTO> findById(Long id) {
        return paymentDAO.findById(id);
    }

    @Override
    public List<PaymentDTO> findAll() {
        return paymentDAO.findAll();
    }

    @Override
    public void update(PaymentDTO paymentDTO) {
        paymentDAO.update(paymentDTO);
    }

    @Override
    public void deleteById(Long id) {
        paymentDAO.deleteById(id);
    }

    @Override
    public int getTotalPayments(Long memberId) {
        return paymentDAO.getTotalPaymentByMemberId(memberId);
    }

    @Override
    public List<PaymentDTO> findByMemberId(Long memberId) {
        return paymentDAO.findByMemberId(memberId);
    }

    @Override
    public List<PaymentDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return paymentDAO.findByMemberIdAndDateRange(memberId, startDate, endDate);
    }
}
