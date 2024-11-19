package com.app.back.service.support_record;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.support_record.SupportRecordDTO;

import java.util.List;
import java.util.Optional;

public interface SupportRecordService {

    public void save(SupportRecordDTO supportRecordDTO);
    public Optional<SupportRecordDTO> findById(Long id);
    public List<SupportRecordDTO> findAll();
    public void update(SupportRecordDTO supportRecordDTO);
    public void deleteById(Long id);
    public int getTotalSupportByMemberId(Long memberId);

    public List<SupportRecordDTO> findByMemberId(Long memberId);
    public List<SupportRecordDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate);
}
