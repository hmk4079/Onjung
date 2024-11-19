package com.app.back.domain.donation_record;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DonationRecordVO {
    private Long id;
    private int donationAmount;
    private String createdDate;
    private Long memberId;
    private Long donationId;

    // DTO로 변환
    public DonationRecordDTO toDTO() {
        DonationRecordDTO donationRecordDTO = new DonationRecordDTO();
        donationRecordDTO.setId(id);
        donationRecordDTO.setDonationAmount(donationAmount);
        donationRecordDTO.setCreatedDate(createdDate);
        donationRecordDTO.setMemberId(memberId);
        donationRecordDTO.setDonationId(donationId);

        return donationRecordDTO;
    }
}
