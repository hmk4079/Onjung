package com.app.back.domain.support_record;


import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SupportRecordDTO {
    private Long id;
    private Long memberId;
    private Long supportId;
    private int supportAmount;
    private String createdDate;

    public SupportRecordVO toVO(){
        return new SupportRecordVO(
                id,memberId,supportId,supportAmount,createdDate
        );
    }
}
