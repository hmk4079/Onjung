package com.app.back.repository.donation_record;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.mapper.donation_record.DonationRecordMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class DonationRecordDAO {
    private final DonationRecordMapper donationRecordMapper;

    public void save(DonationRecordDTO donationRecordDTO) {
        donationRecordMapper.insert(donationRecordDTO);
    }

    public Optional<DonationRecordDTO> findById(Long id) {
        return Optional.ofNullable(donationRecordMapper.selectById(id));
    }

    public List<DonationRecordDTO> findAll() {
        return donationRecordMapper.selectAll();
    }

    public void update(DonationRecordDTO donationRecordDTO) {
        donationRecordMapper.update(donationRecordDTO);
    }

    public void deleteById(Long id) {
        donationRecordMapper.deleteById(id);
    }
    public int findTotalDonationByMemberId(Long memberId) {
        return donationRecordMapper.selectTotalDonationByMemberId(memberId);
    }
    public List<DonationRecordDTO> findByMemberId(Long memberId) {
        return donationRecordMapper.selectByMemberId(memberId);
    }
    public List<DonationRecordDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return donationRecordMapper.selectByMemberIdAndDateRange(memberId, startDate, endDate);
    }

}
