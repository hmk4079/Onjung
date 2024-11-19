package com.app.back.service;

import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.service.volunteer.VolunteerService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
@Slf4j
public class VolunteerServiceTests {
    @Autowired
    private VolunteerService volunteerService;

    @Test
    public void testWrite() throws IOException {
        VolunteerDTO volunteerDTO = new VolunteerDTO();
        volunteerDTO.setPostTitle("우리집 강아지 사료 줄까?");
        volunteerDTO.setPostSummary("요약본인데?");
        volunteerDTO.setPostContent("어떤거 같아?");
        volunteerDTO.setPostViewCount(2L);
        volunteerDTO.setMemberId(21L);
        volunteerDTO.setPostType("VOLUNTEER");
        volunteerDTO.setRecruitmentCount(5);
        volunteerDTO.setVtSDate("2024-11-17");
        volunteerDTO.setVtEDate("2024-12-19");
        volunteerService.write(volunteerDTO,null,null,null,null, null);
    }

    @Test
    public void testDelete() {
        volunteerService.delete(1L);
    }

}