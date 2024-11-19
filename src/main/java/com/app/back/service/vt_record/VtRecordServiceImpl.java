package com.app.back.service.vt_record;

import com.app.back.domain.vt_record.VtRecordDTO;
import com.app.back.repository.vt_record.VtRecordDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class VtRecordServiceImpl implements VtRecordService {
    private final VtRecordDAO vtRecordDAO;

    @Override
    public void save(VtRecordDTO vtRecordDTO) {
        vtRecordDAO.save(vtRecordDTO);
    }

    @Override
    public Optional<VtRecordDTO> findById(Long id) {
        return vtRecordDAO.findById(id);
    }

    @Override
    public List<VtRecordDTO> findAll() {
        return vtRecordDAO.findAll();
    }

    @Override
    public void update(VtRecordDTO vtRecordDTO) {
        vtRecordDAO.update(vtRecordDTO);

    }

    @Override
    public void deleteById(Long id) {
        vtRecordDAO.deleteById(id);
    }

    @Override
    public List<VtRecordDTO> findByMemberId(Long memberId) {
       return vtRecordDAO.findByMemberId(memberId);
    }

    @Override
    public List<VtRecordDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return vtRecordDAO.findByMemberIdAndDateRange(memberId, startDate, endDate);
    }

    @Override
    public int getTotalvtTimeCountByMemberId(Long memberId) {
        return vtRecordDAO.getTotalvtTimeByMemberId(memberId);
    }

    @Override
    public int getTotalvtCountByMemberId(Long memberId) {
        return vtRecordDAO.getTotalvtCountByMemberId(memberId);
    }
}
