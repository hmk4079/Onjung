package com.app.back.domain.support_record;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SupportRecordVO {
    private Long id;
    private Long memberId;
    private Long supportId;
    private int supportAmount;
    private String createdDate;

    public SupportRecordDTO toDTO() {
        SupportRecordDTO supportRecordDTO = new SupportRecordDTO();
        supportRecordDTO.setId(id);
        supportRecordDTO.setMemberId(memberId);
        supportRecordDTO.setSupportId(supportId);
        supportRecordDTO.setSupportAmount(supportAmount);
        supportRecordDTO.setCreatedDate(createdDate);
        return supportRecordDTO;
    }
}
