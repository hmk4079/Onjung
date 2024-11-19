package com.app.back.service.donation_record;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.repository.donation_record.DonationRecordDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class DonationRecordServiceImpl implements DonationRecordService {
    private final DonationRecordDAO donationRecordDAO;

    @Override
    public void save(DonationRecordDTO donationRecordDTO) {
        donationRecordDAO.save(donationRecordDTO);
    }

    @Override
    public Optional<DonationRecordDTO> findById(Long id) {
        return donationRecordDAO.findById(id);
    }

    @Override
    public List<DonationRecordDTO> findAll() {
        return donationRecordDAO.findAll();
    }

    @Override
    public void update(DonationRecordDTO donationRecordDTO) {
        donationRecordDAO.update(donationRecordDTO);
    }

    @Override
    public void deleteById(Long id) {
        donationRecordDAO.deleteById(id);
    }
    @Override
    public int getTotalDonationByMemberId(Long memberId) {
        return donationRecordDAO.findTotalDonationByMemberId(memberId);
    }

    @Override
    public List<DonationRecordDTO> findByMemberId(Long memberId) { // 반환 타입 수정
        return donationRecordDAO.findByMemberId(memberId);
    }
    @Override
    public List<DonationRecordDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return donationRecordDAO.findByMemberIdAndDateRange(memberId, startDate, endDate);
    }

}
