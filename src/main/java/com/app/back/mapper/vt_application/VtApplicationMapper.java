package com.app.back.mapper.vt_application;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.volunteer.VolunteerVO;
import com.app.back.domain.vt_application.VtApplicationDTO;
import com.app.back.domain.vt_application.VtApplicationVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface VtApplicationMapper {

    public void insert(VtApplicationDTO vtApplicationDTO);
    public VtApplicationDTO selectById(Long id);
    public List<VtApplicationDTO> selectAll();
    public void update(VtApplicationDTO vtApplicationDTO);
    public void deleteById(Long id);

    public List<VtApplicationDTO> selectByVtId(@Param("vtId") Long vtId);
    public int countByVtId(@Param("vtId") Long vtId);
    public void updateApplicationStatus(@Param("applicationId") Long applicationId, @Param("status") String status);
    public List<VtApplicationDTO>selectByMemberId(@Param("memberId") Long memberId);
    public List<VtApplicationDTO> selectByMemberIdAndDateRange(@Param("memberId") Long memberId, @Param("startDate") String startDate, @Param("endDate") String endDate);
    public Long findMemberIdByApplicationId(@Param("applicationId") Long applicationId);

}

