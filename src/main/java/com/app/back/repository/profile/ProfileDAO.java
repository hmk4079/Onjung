package com.app.back.repository.profile;

import com.app.back.domain.profile.ProfileDTO;
import com.app.back.domain.profile.ProfileVO;
import com.app.back.mapper.profile.ProfileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

// ProfileDAO.java
@Repository
@RequiredArgsConstructor
public class ProfileDAO {
    private final ProfileMapper profileMapper;

    public void insert(ProfileVO profileVO) {
        profileMapper.insert(profileVO);
    }

    public ProfileVO selectById(Long id) {
        return profileMapper.selectById(id);
    }

    public ProfileVO selectByMemberId(Long memberId) {
        return profileMapper.selectByMemberId(memberId);
    }

    public void update(ProfileVO profileVO) {
        profileMapper.update(profileVO);
    }

    public void deleteById(Long id) {
        profileMapper.deleteById(id);
    }

    public List<ProfileVO> selectAll() {
        return profileMapper.selectAll();
    }
}
