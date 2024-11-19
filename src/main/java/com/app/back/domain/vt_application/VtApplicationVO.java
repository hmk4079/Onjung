package com.app.back.domain.vt_application;


import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class VtApplicationVO {

    private Long id;
    private String applicationDate;
    private String applicationStatus;
    private Long vtId;
    private Long memberId;

    private String memberName;
    private String postTitle;

    public VtApplicationDTO toDTO() {
        VtApplicationDTO vtApplicationDTO = new VtApplicationDTO();
        vtApplicationDTO.setId(id);
        vtApplicationDTO.setApplicationDate(applicationDate);
        vtApplicationDTO.setApplicationStatus(applicationStatus);
        vtApplicationDTO.setVtId(vtId);
        vtApplicationDTO.setMemberId(memberId);
        vtApplicationDTO.setMemberName(memberName);
        vtApplicationDTO.setPostTitle(postTitle);
        return vtApplicationDTO;
    }



}
