package com.app.back.domain.payment;

import lombok.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Getter @Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {
    private Long id;
    private String paymentStatus;
    private int paymentAmount;
    private Long memberId;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    public PaymentVO toVO() {
        return new PaymentVO(id, paymentStatus, paymentAmount, memberId, createdDate, updatedDate);
    }

}
