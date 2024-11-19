package com.app.back.domain.member;

import lombok.*;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
@Getter @Setter
@ToString @EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class MemberDTO{
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
    private  double memberStarRate;
    private String memberIntroduction;
    private String createdDate;
    private String updatedDate;
    private String resetUuid;
    private Long countVt;
    private Long countReview;

    private String profileFileName;
    private String profileFilePath;
    private Long profileFileSize;
    private String profileFileType;



    public MemberVO toVO(){
        return new MemberVO(id,kakaoEmail,kakaoProfileURL,kakaoNickName,memberEmail,memberName,memberPhone,
                memberPassword,memberType,memberNickName,memberJung,memberPoint,memberLoginType,memberStarRate,
                memberIntroduction,createdDate,updatedDate,resetUuid,profileFileName,profileFilePath,profileFileSize,profileFileType);}

}