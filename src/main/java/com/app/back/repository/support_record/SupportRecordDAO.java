package com.app.back.repository.support_record;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.support_record.SupportRecordDTO;
import com.app.back.mapper.support_record.SupportRecordMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class SupportRecordDAO {
    private final SupportRecordMapper supportRecordMapper;

    public void save(SupportRecordDTO supportRecordDTO) {
        supportRecordMapper.insert(supportRecordDTO);
    }

    public Optional<SupportRecordDTO> findById(Long id) {
        return Optional.ofNullable(supportRecordMapper.selectById(id));
    }
    public List<SupportRecordDTO> findAll() {
        return supportRecordMapper.selectAll();
    }
    public void update(SupportRecordDTO supportRecordDTO) {
        supportRecordMapper.update(supportRecordDTO);
    }
    public void deleteById(Long id) {
        supportRecordMapper.deleteById(id);
    }
    public int findTotalSupportByMemberId(Long memberId) {
        return supportRecordMapper.selectTotalSupportByMemberId(memberId);
    }

    public List<SupportRecordDTO> findByMemberId(Long memberId) {
        return supportRecordMapper.selectByMemberId(memberId);
    }
    public List<SupportRecordDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return supportRecordMapper.selectByMemberIdAndDateRange(memberId, startDate, endDate);
    }


}
