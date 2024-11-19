package com.app.back.service.alarm;

import com.app.back.domain.alarm.AlarmDTO;
import com.app.back.repository.alarm.AlarmDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Primary
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class AlarmServiceImpl implements AlarmService {
    private final AlarmDAO alarmDAO;

    @Override
    public void createVtApplicationAlarm(Long memberId, Long vtApplicationId, String content) {
        alarmDAO.saveVtApplicationAlarm(memberId, vtApplicationId, content);
    }
    @Override
    public void createDonationAlarm(Long memberId, Long donationId, String content) {
        alarmDAO.saveDonationAlarm(memberId, donationId, content);
    }

    @Override
    public void createSupportAlarm(Long memberId, Long supportId, String content) {
        alarmDAO.saveSupportAlarm(memberId, supportId, content);
    }

    @Override
    public void createReplyAlarm(Long memberId, Long replyId, String content) {
        alarmDAO.saveReplyAlarm(memberId, replyId, content);
    }

    @Override
    public List<AlarmDTO> getAlarmsByMemberId(Long memberId) {
        return alarmDAO.findAlarmsByMemberId(memberId);
    }
    @Override
    public List<AlarmDTO> getAlarmsByMemberId7(Long memberId) {
        return alarmDAO.findAlarmsByMemberId7(memberId);
    }

    @Override
    public List<AlarmDTO> getUnreadAlarmsByMemberId(Long memberId) {
        return alarmDAO.findUnreadAlarmsByMemberId(memberId);
    }

    @Override
    public boolean markAlarmAsRead(Long id, Long memberId, String alarmType, Long postId) {
        log.info("Marking alarm as read. ID: {}, Member ID: {}, Alarm Type: {}", id, memberId, alarmType);
        int updatedRows = alarmDAO.updateAlarmIsRead(id, memberId, alarmType,postId);
        return updatedRows > 0;
    }
}
