package com.app.back.service;

import com.app.back.domain.post.PostDTO;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.domain.vt_application.VtApplicationDTO;
import com.app.back.service.volunteer.VolunteerService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@Slf4j
public class VolunteerServiceTests {
    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private VtApplicationDTO vtApplicationDTO;

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
        volunteerService.delete(32L);
    }

    @Test
    public void testGetPostById() {
        Long postId = 36L;
        Optional<VolunteerDTO> post = volunteerService.getPostById(postId);
        assertNotNull(post, "Post should not be null");
        assertEquals(postId, post.get().getPostId(), "Post ID should match");
        log.info("Post retrieved: {}", post);
    }

    @Test
    public void testApplyForVolunteer() {
        VtApplicationDTO vtApplicationDTO = new VtApplicationDTO();
        vtApplicationDTO.setVtId(40L);
        vtApplicationDTO.setMemberId(35L);
        vtApplicationDTO.setApplicationStatus("WAITING");

        // 현재 시간을 String으로 포맷하여 설정
        String current = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        vtApplicationDTO.setCreatedDate(current);

        volunteerService.applyForVolunteer(vtApplicationDTO.getVtId(), vtApplicationDTO);
    }
}