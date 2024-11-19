package com.app.back.service.alarm;

import com.app.back.domain.alarm.AlarmDTO;

import java.util.List;

public interface AlarmService {


    public void createVtApplicationAlarm(Long memberId, Long vtApplicationId, String content);

    public void createDonationAlarm(Long memberId, Long donationId, String content);

    public void createSupportAlarm(Long memberId, Long supportId, String content);

    public void createReplyAlarm(Long memberId, Long replyId, String content);

    public List<AlarmDTO> getAlarmsByMemberId(Long memberId);

    public List<AlarmDTO> getAlarmsByMemberId7(Long memberId);

    public List<AlarmDTO> getUnreadAlarmsByMemberId(Long memberId);

    public boolean markAlarmAsRead(Long id, Long memberId, String alarmType, Long postId);





}
