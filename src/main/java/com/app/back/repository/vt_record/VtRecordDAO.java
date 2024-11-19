package com.app.back.repository.vt_record;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.vt_record.VtRecordDTO;
import com.app.back.mapper.vt_record.VtRecordMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class VtRecordDAO {
    private final VtRecordMapper vtRecordMapper;

    public void save(VtRecordDTO vtRecordDTO) {
        vtRecordMapper.insert(vtRecordDTO);
    }
    public Optional<VtRecordDTO> findById(Long id) {
        return Optional.ofNullable(vtRecordMapper.selectById(id));
    }

    public List<VtRecordDTO> findAll() {
        return vtRecordMapper.selectAll();
    }
    public void update(VtRecordDTO vtRecordDTO) {
        vtRecordMapper.update(vtRecordDTO);
    }
    public void deleteById(Long id) {
        vtRecordMapper.deleteById(id);
    }

    public List<VtRecordDTO> findByMemberId(Long memberId) {
        return vtRecordMapper.selectByMemberId(memberId);
    }
    public List<VtRecordDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return vtRecordMapper.selectByMemberIdAndDateRange(memberId, startDate, endDate);
    }

    public int getTotalvtTimeByMemberId(Long memberId) {
        return vtRecordMapper.selectTotalVtTimeByMemberId(memberId);
    }
    public int getTotalvtCountByMemberId(Long memberId) {
        return vtRecordMapper.selectVtCountByMemberId(memberId);
    }


}
