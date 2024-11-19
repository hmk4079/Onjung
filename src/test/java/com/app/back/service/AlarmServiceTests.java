package com.app.back.service;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.support.SupportDTO;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.mapper.attachment.AttachmentMapper;
import com.app.back.service.alarm.AlarmService;
import com.app.back.service.attachment.AttachmentService;
import com.app.back.service.donation.DonationService;
import com.app.back.service.donation.DonationServiceImpl;
import com.app.back.service.support.SupportService;
import com.app.back.service.support.SupportServiceImpl;
import com.app.back.service.vt_application.VtApplicationService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
@Slf4j
public class AlarmServiceTests {


    @Autowired
    private AlarmService alarmService;
    @Autowired
    private SupportService supportService;
    @Autowired
    private DonationService donationService;


    @Test
    public void testVtApplicationStatusChange() {
        alarmService.createVtApplicationAlarm(23L, 2L, "봉사활동 신청이 승인되었습니다.");
    }

    @Test
    public void testDonationUpdateCurrentPointAndSendAlarmWhenGoalIsMet() {
       DonationDTO donationDTO = new DonationDTO();
       donationDTO.setMemberId(22L);
       donationDTO.setId(40L);
       donationDTO.setGoalPoint(200000);
       donationDTO.setCurrentPoint(200000);

       donationService.updateCurrentPointAndCheckGoal(donationDTO);
    }

    @Test
    void testSupportUpdateCurrentPointAndSendAlarmWhenGoalIsMet() {
        SupportDTO supportDTO = new SupportDTO();
        supportDTO.setMemberId(22L);
        supportDTO.setId(78L);
        supportDTO.setGoalPoint(10000);
        supportDTO.setCurrentPoint(10000);

        supportService.updateCurrentPointAndCheckGoal(supportDTO);

    }

    @Test
    public void testNewReply() {
        alarmService.createReplyAlarm(23L, 400L, "새로운 댓글이 달렸습니다.");
    }


}