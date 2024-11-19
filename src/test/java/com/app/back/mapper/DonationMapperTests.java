
//package com.app.back.mapper;
//
//import com.app.back.domain.donation.DonationDTO;
//import com.app.back.domain.review.ReviewDTO;
//import com.app.back.mapper.donation.DonationMapper;
//import com.app.back.mapper.review.ReviewMapper;
//import lombok.extern.slf4j.Slf4j;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.Optional;
//
//@SpringBootTest
//@Slf4j
//public class DonationMapperTests {
//    @Autowired
//    private DonationMapper donationMapper;
//
//    @Test
//    public void testWrite() {
//        DonationDTO donationDTO = new DonationDTO();
//        donationDTO.setId(2L);
//        donationDTO.setGoalPoint(2000000);
//        donationDTO.setDonationSDate("2024-10-25");
//        donationDTO.setDonationEDate("2024-10-28");
//        donationMapper.insert(donationDTO.toVO());
//    }
//
//    @Test
//    public void testSelectById() {
//        DonationDTO donationDTO = new DonationDTO();
//        donationDTO.setId(1L);
//        Optional<DonationDTO> foundDonation = donationMapper.selectById(donationDTO.getId());
//
//        log.info("{}",foundDonation);
//    }
//
//    @Test
//    public void testUpdate() {
//        DonationDTO donationDTO = new DonationDTO();
//        donationDTO.setId(1L);
//        donationDTO.setGoalPoint(5000000);
//        donationDTO.setDonationSDate("2024-11-25");
//        donationDTO.setDonationEDate("2024-11-28");
//        donationMapper.update(donationDTO);
//    }
//
//    @Test
//    public void testDelete() {
//        donationMapper.deleteById(2L);
//    }
//}