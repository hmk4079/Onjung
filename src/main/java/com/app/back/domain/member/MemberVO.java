package com.app.back.domain.member;

import lombok.*;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
@Getter @ToString @EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class MemberVO implements Serializable {
    private final Long serialVersionUID = 2L;

    @EqualsAndHashCode.Include
    private Long id;
    private String kakaoEmail;
    private String kakaoProfileURL;
    private String kakaoNickName;
    private String memberEmail;
    private String memberName;
    private String memberPhone;
    private String memberPassword;
    private String memberType;
    private String memberNickName;
    private int memberJung;
    private int memberPoint;
    private String memberLoginType;
    private double memberStarRate;
    private String memberIntroduction;
    private String createdDate;
    private String updatedDate;
    private String resetUuid;

    private String profileFileName;
    private String profileFilePath;
    private Long profileFileSize;
    private String profileFileType;



    public MemberDTO toDTO() {
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(id);
        memberDTO.setKakaoEmail(kakaoEmail);
        memberDTO.setKakaoProfileURL(kakaoProfileURL);
        memberDTO.setKakaoNickName(kakaoNickName);
        memberDTO.setMemberEmail(memberEmail);
        memberDTO.setMemberName(memberName);
        memberDTO.setMemberPhone(memberPhone);
        memberDTO.setMemberPassword(memberPassword);
        memberDTO.setMemberType(memberType);
        memberDTO.setMemberNickName(memberNickName);
        memberDTO.setMemberJung(memberJung);
        memberDTO.setMemberPoint(memberPoint);
        memberDTO.setMemberLoginType(memberLoginType);
        memberDTO.setMemberStarRate(memberStarRate);
        memberDTO.setMemberIntroduction(memberIntroduction);
        memberDTO.setCreatedDate(createdDate);
        memberDTO.setUpdatedDate(updatedDate);
        memberDTO.setResetUuid(resetUuid);
        memberDTO.setProfileFileName(profileFileName);
        memberDTO.setProfileFilePath(profileFilePath);
        memberDTO.setProfileFileSize(profileFileSize);
        memberDTO.setProfileFileType(profileFileType);
        return memberDTO;
    }
}
