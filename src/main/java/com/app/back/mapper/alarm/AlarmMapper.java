package com.app.back.mapper.alarm;

import com.app.back.domain.alarm.AlarmDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AlarmMapper {

    // 각 알림 테이블에 삽입 메서드
    void insertVtApplicationAlarm(@Param("memberId") Long memberId, @Param("vtApplicationId") Long vtApplicationId, @Param("content") String content);

    public void insertDonationAlarm(@Param("memberId") Long memberId, @Param("donationId") Long donationId, @Param("content") String content);

    public void insertSupportAlarm(@Param("memberId") Long memberId, @Param("supportId") Long supportId, @Param("content") String content);

    public void insertReplyAlarm(@Param("memberId") Long memberId, @Param("replyId") Long replyId, @Param("content") String content);

    public List<AlarmDTO> selectAlarmsByMemberId(@Param("memberId") Long memberId);

    public List<AlarmDTO> selectAlarmsByMemberId7(@Param("memberId") Long memberId);

    public List<AlarmDTO> selectUnreadAlarmsByMemberId(@Param("memberId") Long memberId);

    public int updateAlarmIsRead(
            @Param("id") Long id,
            @Param("memberId") Long memberId,
            @Param("alarmType") String alarmType,
            @Param("postId") Long postId
    );



}
