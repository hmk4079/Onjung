
package com.app.back.service;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.service.donation.DonationService;
import com.app.back.service.review.ReviewService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
@Slf4j
public class DonationServiceTests {
    @Autowired
    private DonationService donationService;

     @Test
    public void testWrite() throws IOException {
        DonationDTO donationDTO = new DonationDTO();
        donationDTO.setPostTitle("9985sdfsadf");
        donationDTO.setPostContent("23dfsfa");
        donationDTO.setMemberId(1L);
        donationDTO.setPostType("DONATION");
        donationDTO.setGoalPoint(666000);
        donationDTO.setDonationSDate("2024-12-17");
        donationDTO.setDonationEDate("2024-12-29");
        donationService.write(donationDTO, null, null, null, null, null);
    }

    @Test
    public void testDelete() {
        donationService.delete(3L);
    }
}

