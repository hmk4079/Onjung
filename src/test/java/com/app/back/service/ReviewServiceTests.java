package com.app.back.service;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.service.review.ReviewService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
@Slf4j
public class ReviewServiceTests {
    @Autowired
    private ReviewService reviewService;

    @Test
    public void testWrite() throws IOException {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setPostTitle("후기3");
        reviewDTO.setPostContent("후기3");
        reviewDTO.setMemberId(3L);
        reviewDTO.setPostType("REVIEW");
        reviewDTO.setVtGroupName("봉사단체13");
        reviewDTO.setReviewStarRate(5.00);
        reviewService.write(reviewDTO, null, null, null, null, null);
    }

    @Test
    public void testDelete() {
        reviewService.delete(3L);
    }
}
