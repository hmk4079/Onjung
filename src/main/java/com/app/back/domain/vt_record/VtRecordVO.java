package com.app.back.domain.vt_record;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class VtRecordVO {
    private Long id;
    private int vtTime;

    private String postTitle;
    private String createdDate;

    public VtRecordDTO toDTO() {
        VtRecordDTO vtRecordDTO = new VtRecordDTO();
        vtRecordDTO.setId(id);
        vtRecordDTO.setVtTime(vtTime);
        vtRecordDTO.setPostTitle(postTitle);
        vtRecordDTO.setCreatedDate(createdDate);
        return vtRecordDTO;
    }
}
