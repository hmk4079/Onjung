package com.app.back.service.profile;

import com.app.back.domain.profile.ProfileDTO;
import com.app.back.domain.profile.ProfileVO;
import com.app.back.repository.profile.ProfileDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final ProfileDAO profileDAO;

    @Override
    public void save(ProfileDTO profileDTO) {
        // DTO를 VO로 변환
        ProfileVO profileVO = profileDTO.toVO();

        // 기존 프로필 존재 여부 확인하고
        ProfileVO existingProfileVO = profileDAO.selectByMemberId(profileVO.getMemberId());
//        있으면 업데이트
        if (existingProfileVO != null) {

            ProfileVO updatedProfileVO = new ProfileVO(
                    existingProfileVO.getId(),
                    profileVO.getProfileFileName(),
                    profileVO.getProfileFilePath(),
                    profileVO.getProfileFileSize(),
                    profileVO.getProfileFileType(),
                    profileVO.getMemberId(),
                    profileVO.getCreatedDate()
            );
            profileDAO.update(updatedProfileVO);
        } else {
//    없으면 insert!!
            profileDAO.insert(profileVO);
        }
    }


    @Override
    public ProfileDTO selectById(Long id) {
        ProfileVO profileVO = profileDAO.selectById(id);
        return profileVO != null ? profileVO.toDTO() : null;
    }

    @Override
    public ProfileDTO selectByMemberId(Long memberId) {
        ProfileVO profileVO = profileDAO.selectByMemberId(memberId);
        return profileVO != null ? profileVO.toDTO() : null;
    }

    @Override
    public List<ProfileDTO> selectAll() {
        return List.of();
    }

    @Override
    public void update(ProfileDTO profileDTO) {

    }

    @Override
    public void deleteById(Long id) {
        profileDAO.deleteById(id);
    }
}
