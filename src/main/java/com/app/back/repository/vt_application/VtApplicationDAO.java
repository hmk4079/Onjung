package com.app.back.repository.vt_application;


import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.vt_application.VtApplicationDTO;
import com.app.back.domain.vt_application.VtApplicationVO;
import com.app.back.mapper.vt_application.VtApplicationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class VtApplicationDAO {
    private final VtApplicationMapper vtApplicationMapper;

    public void save(VtApplicationDTO vtApplicationDTO) {
        vtApplicationMapper.insert(vtApplicationDTO);
    }

    public VtApplicationDTO findById(Long id) {
        return vtApplicationMapper.selectById(id);
    }

    public List<VtApplicationDTO> findAll() {
        return vtApplicationMapper.selectAll();
    }

    public void update(VtApplicationDTO vtApplicationDTO) {
        vtApplicationMapper.update(vtApplicationDTO);
    }

    public void deleteById(Long id) {
        vtApplicationMapper.deleteById(id);
    }

    public List<VtApplicationDTO> findByVtId(Long vtId) {
        return vtApplicationMapper.selectByVtId(vtId);
    }

    public int countByVtId(Long vtId) {
        return vtApplicationMapper.countByVtId(vtId);
    }

    public void updateApplicationStatus(Long applicationId, String status) {
        vtApplicationMapper.updateApplicationStatus(applicationId, status);
    }

    public List<VtApplicationDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return vtApplicationMapper.selectByMemberIdAndDateRange(memberId, startDate, endDate);
    }

    public List<VtApplicationDTO> findByMemberId(Long memberId) {
        return vtApplicationMapper.selectByMemberId(memberId);
    }
    public Long findMemberIdByApplicationId(Long applicationId) {
        return vtApplicationMapper.findMemberIdByApplicationId(applicationId);
    }

}
