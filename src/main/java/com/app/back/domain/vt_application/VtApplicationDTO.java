package com.app.back.domain.vt_application;


import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class VtApplicationDTO {

    private Long id;
    private String applicationDate;
    private String applicationStatus;
    private Long vtId;
    private Long memberId;

    private String memberName;
    private String postTitle;

    public VtApplicationVO toVO() {
        return new VtApplicationVO(id,applicationDate,applicationStatus,vtId,memberId,memberName,postTitle);}

}
