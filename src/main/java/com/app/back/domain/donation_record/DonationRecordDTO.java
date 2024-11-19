package com.app.back.domain.donation_record;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DonationRecordDTO {
    private Long id;
    private int donationAmount;
    private String createdDate;
    private Long memberId;
    private Long donationId;

    // VO로 변환
    public DonationRecordVO toVO() {
        return new DonationRecordVO(
                id, donationAmount, createdDate, memberId, donationId
        );
    }
}
