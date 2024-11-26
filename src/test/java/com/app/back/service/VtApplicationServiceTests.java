package com.app.back.service;

import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.domain.vt_application.VtApplicationDTO;
import com.app.back.service.volunteer.VolunteerService;
import com.app.back.service.vt_application.VtApplicationService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

import static com.app.back.enums.vtApplicationStatus.WAITING;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Slf4j
public class VtApplicationServiceTests {
    @Autowired
    private VtApplicationService vtApplicationService;

    @Test
    //    지원하기 버튼시 insert문
    public void testInsertSelective() {
        VtApplicationDTO vtApplicationDTO  = new VtApplicationDTO();
        VolunteerDTO volunteerDTO = new VolunteerDTO();
        // 설정할 필드 값들 설정
        vtApplicationDTO.setId(38L);  // 신청 ID
        vtApplicationDTO.setApplicationDate(LocalDateTime.now().toString());  // LocalDateTime을 String으로 변환
        vtApplicationDTO.setApplicationStatus(String.valueOf(WAITING));
        vtApplicationDTO.setVtId(40L);  // 봉사활동 ID
        vtApplicationDTO.setMemberId(38L);  // 신청자 ID (Long 타입으로 설정)
        volunteerDTO.setNowRecruitmentCount(+1);

        vtApplicationService.save(vtApplicationDTO);

        log.info("회원 정보 삽입 성공: {}",vtApplicationDTO.toVO().toString());
        log.info("신청성공:{}",volunteerDTO.getNowRecruitmentCount());
    }



}