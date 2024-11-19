package com.app.back.service.support_record;


import com.app.back.domain.support_record.SupportRecordDTO;
import com.app.back.repository.support.SupportDAO;
import com.app.back.repository.support_record.SupportRecordDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class SupportRecordServiceImpl implements SupportRecordService {
    private final SupportRecordDAO supportRecordDAO;
    @Override
    public void save(SupportRecordDTO supportRecordDTO) {
        supportRecordDAO.save(supportRecordDTO);
    }

    @Override
    public Optional<SupportRecordDTO> findById(Long id) {
        return supportRecordDAO.findById(id);
    }

    @Override
    public List<SupportRecordDTO> findAll() {
        return supportRecordDAO.findAll();
    }

    @Override
    public void update(SupportRecordDTO supportRecordDTO) {
       supportRecordDAO.update(supportRecordDTO);
    }

    @Override
    public void deleteById(Long id) {
    supportRecordDAO.deleteById(id);
    }

    @Override
    public int getTotalSupportByMemberId(Long memberId) {
        return supportRecordDAO.findTotalSupportByMemberId(memberId);
    }

    @Override
    public List<SupportRecordDTO> findByMemberId(Long memberId) {

        return supportRecordDAO.findByMemberId(memberId);
    }

    @Override
    public List<SupportRecordDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return supportRecordDAO.findByMemberIdAndDateRange(memberId, startDate, endDate);
    }
}
