package com.app.back.service.vt_application;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.vt_application.VtApplicationDTO;

import java.util.List;

public interface VtApplicationService {
    public void save(VtApplicationDTO vtApplicationDTO);
    public VtApplicationDTO findById(Long id);
    public List<VtApplicationDTO> findAll();
    public void update(VtApplicationDTO vtApplicationDTO);
    public void deleteById(Long id);
    public List<VtApplicationDTO> getApplicationsByVtId(Long vtId);
    public int getApplicationCountByVtId(Long vtId);
    public void approveApplication(Long applicationId);
    public void refuseApplication(Long applicationId);


    public List<VtApplicationDTO> getApplicationsByMemberIdAndDateRange(Long memberId, String startDate, String endDate);
    public List<VtApplicationDTO> getApplicationsByMemberId(Long memberId);

}
