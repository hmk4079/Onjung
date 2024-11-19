package com.app.back.domain.payment;

import lombok.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class PaymentVO {
    private Long id;
    private String paymentStatus;
    private int paymentAmount;
    private Long memberId;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    public PaymentDTO toDTO() {
        PaymentDTO paymentDTO = new PaymentDTO();
        paymentDTO.setId(id);
        paymentDTO.setPaymentStatus(paymentStatus);
        paymentDTO.setPaymentAmount(paymentAmount);
        paymentDTO.setMemberId(memberId);
        paymentDTO.setCreatedDate(createdDate);
        paymentDTO.setUpdatedDate(updatedDate);
        return paymentDTO;
    }

}
