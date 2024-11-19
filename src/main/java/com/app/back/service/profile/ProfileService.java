package com.app.back.service.profile;

import com.app.back.domain.profile.ProfileDTO;

import java.util.List;

public interface ProfileService {

    public void save(ProfileDTO profileDTO);
    public ProfileDTO selectById(Long id);
    public ProfileDTO selectByMemberId(Long memberId);
    public List<ProfileDTO> selectAll();
    public void update(ProfileDTO profileDTO);
    public void deleteById(Long id);
}
