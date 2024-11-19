package com.app.back.mapper.profile;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.profile.ProfileDTO;
import com.app.back.domain.profile.ProfileVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProfileMapper {
    void insert(ProfileVO profileVO);
    ProfileVO selectById(Long id);
    ProfileVO selectByMemberId(Long memberId);
    void update(ProfileVO profileVO);
    void deleteById(Long id);
    List<ProfileVO> selectAll();
}
