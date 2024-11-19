package com.app.back.service.vt_record;


import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.vt_record.VtRecordDTO;

import java.util.List;
import java.util.Optional;

public interface VtRecordService {
    public void save(VtRecordDTO vtRecordDTO);
    public Optional<VtRecordDTO> findById(Long id);
    public List<VtRecordDTO> findAll();
    public void update(VtRecordDTO vtRecordDTO);
    public void deleteById(Long id);
    public List<VtRecordDTO> findByMemberId(Long memberId);
    public List<VtRecordDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate);

    public int getTotalvtTimeCountByMemberId(Long memberId);
    public int getTotalvtCountByMemberId(Long memberId);
}
