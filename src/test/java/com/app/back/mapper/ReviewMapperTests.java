package com.app.back.mapper;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.mapper.review.ReviewMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
@Slf4j
public class ReviewMapperTests {
    @Autowired
    private ReviewMapper reviewMapper;

    @Test
    public void testWrite() {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setId(2L);
        reviewDTO.setReviewStarRate(4.99);
        reviewDTO.setVtGroupName("test");
        reviewMapper.insert(reviewDTO.toVO());
    }

    @Test
    public void testSelectById() {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setId(1L);
        Optional<ReviewDTO> foundReview = reviewMapper.selectById(reviewDTO.getId());

        log.info("{}",foundReview);
    }

    @Test
    public void testUpdate() {
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setId(1L);
        reviewDTO.setReviewStarRate(3.99);
        reviewMapper.update(reviewDTO);
    }

    @Test
    public void testDelete() {
        reviewMapper.deleteById(1L);
    }



}
