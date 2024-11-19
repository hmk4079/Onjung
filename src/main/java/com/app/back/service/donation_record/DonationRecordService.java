package com.app.back.service.donation_record;

import com.app.back.domain.donation_record.DonationRecordDTO;

import java.util.List;
import java.util.Optional;

public interface DonationRecordService {
    public void save(DonationRecordDTO donationRecordDTO);
    public Optional<DonationRecordDTO> findById(Long id);
    public List<DonationRecordDTO> findAll();
    public void update(DonationRecordDTO donationRecordDTO);
    public void deleteById(Long id);
    public int getTotalDonationByMemberId(Long memberId);
    public List<DonationRecordDTO> findByMemberId(Long memberId); // 반환 타입 수정
    public List<DonationRecordDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate);

}
