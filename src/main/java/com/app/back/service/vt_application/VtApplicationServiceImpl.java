package com.app.back.service.vt_application;

import com.app.back.domain.vt_application.VtApplicationDTO;
import com.app.back.repository.vt_application.VtApplicationDAO;
import com.app.back.service.alarm.AlarmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class VtApplicationServiceImpl implements VtApplicationService {
    private final VtApplicationDAO vtApplicationDAO;
    private final AlarmService alarmService;

    @Override
    public void save(VtApplicationDTO vtApplicationDTO) {
        vtApplicationDAO.save(vtApplicationDTO);
    }

    @Override
    public VtApplicationDTO findById(Long id) {
        return vtApplicationDAO.findById(id);
    }


    @Override
    public List<VtApplicationDTO> findAll() {
        return vtApplicationDAO.findAll();
    }

    @Override
    public void update(VtApplicationDTO vtApplicationDTO) {
        vtApplicationDAO.update(vtApplicationDTO);
    }

    @Override
    public void deleteById(Long id) {
        vtApplicationDAO.deleteById(id);
    }

    @Override
    public List<VtApplicationDTO> getApplicationsByVtId(Long vtId) {
        return vtApplicationDAO.findByVtId(vtId);
    }

    @Override
    public int getApplicationCountByVtId(Long vtId) {
        return vtApplicationDAO.countByVtId(vtId);
    }

    @Override
    public void approveApplication(Long applicationId) {
        vtApplicationDAO.updateApplicationStatus(applicationId, "APPROVED");

        Long memberId = vtApplicationDAO.findMemberIdByApplicationId(applicationId);
        String content = "봉사활동 신청이 승인되었습니다!";
        alarmService.createVtApplicationAlarm(memberId, applicationId, content);
    }

    @Override
    public void refuseApplication(Long applicationId) {
        vtApplicationDAO.updateApplicationStatus(applicationId, "REJECTED");
        Long memberId = vtApplicationDAO.findMemberIdByApplicationId(applicationId);
        String content = "봉사활동 신청이 거부되었습니다.";
        alarmService.createVtApplicationAlarm(memberId, applicationId, content);
    }

    @Override
    public List<VtApplicationDTO> getApplicationsByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return vtApplicationDAO.findByMemberIdAndDateRange(memberId, startDate, endDate);
    }


    @Override
    public List<VtApplicationDTO> getApplicationsByMemberId(Long memberId) {
        return vtApplicationDAO.findByMemberId(memberId);
    }

}
