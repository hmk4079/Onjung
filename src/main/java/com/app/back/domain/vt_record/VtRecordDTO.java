package com.app.back.domain.vt_record;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class VtRecordDTO {
    private Long id;
    private int vtTime;

    private String postTitle;
    private String createdDate;

    public VtRecordVO toVO(){
        return new VtRecordVO(id, vtTime, postTitle, createdDate);
    }
}
