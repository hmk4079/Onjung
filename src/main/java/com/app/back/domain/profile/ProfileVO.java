package com.app.back.domain.profile;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class ProfileVO {
    private Long id;
    private String profileFileName;
    private String profileFilePath;
    private Long profileFileSize;
    private String profileFileType;
    private Long memberId;
    private String createdDate;

    public ProfileDTO toDTO(){
        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setId(id);
        profileDTO.setProfileFileName(profileFileName);
        profileDTO.setProfileFilePath(profileFilePath);
        profileDTO.setProfileFileSize(profileFileSize);
        profileDTO.setProfileFileType(profileFileType);
        profileDTO.setMemberId(memberId);
        profileDTO.setCreatedDate(createdDate);
        return profileDTO;
    }
}
