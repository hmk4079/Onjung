package com.app.back.mapper.payment;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.payment.PaymentDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@Mapper
public interface PaymentMapper {

    public void insert(PaymentDTO paymentDTO);
    public PaymentDTO selectById(Long id);
    public List<PaymentDTO> selectAll();
    public void update(PaymentDTO paymentDTO);
    public void deleteById(Long id);
    public int selectTotalPaymentByMemberId(Long memberId);
    public List<PaymentDTO> selectByMemberId(@Param("memberId") Long memberId);
    public List<PaymentDTO> selectByMemberIdAndDateRange(
            @Param("memberId") Long memberId,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate
    );
}
