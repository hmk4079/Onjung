
package com.app.back.service;

import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.service.post.PostService;
import com.app.back.service.volunteer.VolunteerService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
@Slf4j
public class PostServiceTests {
    @Autowired
    private PostService postService;

    @Test
    public void testDelete() {
        postService.delete(1L);
    }

}