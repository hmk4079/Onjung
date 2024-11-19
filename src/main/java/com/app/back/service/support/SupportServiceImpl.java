package com.app.back.service.support;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.support.SupportDTO;
import com.app.back.repository.alarm.AlarmDAO;
import com.app.back.repository.support.SupportDAO;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Primary
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class) // 예외 발생 시 롤백 처리
public class SupportServiceImpl implements SupportService {
    private final SupportDAO supportDAO;
    private final AlarmDAO alarmDAO;

    @Override
    public List<SupportDTO> getLatest10Supports() {
        return supportDAO.findTop10();
    }

    @Override
    public void updateCurrentPointAndCheckGoal(SupportDTO supportDTO) {
        // current_point 업데이트 로직
        supportDAO.updateCurrentPoint(supportDTO);

        // 목표 금액이 100% 달성되었는지 확인
        if (supportDTO.getCurrentPoint() >= supportDTO.getGoalPoint()) {
            String alarmContent = "후원 목표 금액이 100% 달성되었습니다!";
            alarmDAO.saveSupportAlarm(supportDTO.getMemberId(), supportDTO.getId(), alarmContent);
        }
    }


}
