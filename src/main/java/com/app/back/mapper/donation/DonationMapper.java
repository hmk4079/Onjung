package com.app.back.mapper.donation;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.donation.DonationVO;
import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.review.ReviewVO;
import com.app.back.domain.support.SupportDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface DonationMapper {
    // 추가
    public void insert(DonationVO donationVO);
    // 조회
    public Optional<DonationDTO> selectById(Long id);
    // 전체 조회
    public List<DonationDTO> selectAll(@Param("pagination") Pagination pagination);

    public List<DonationDTO> selectFilterAll(@Param("pagination") Pagination pagination);
    // 전체 개수
    public int selectCount();
    // 수정
    public void update(DonationVO donationVO);

    public void updateCurrentPoint(DonationDTO donationDTO);

    // 삭제
    public void deleteById(Long id);

    public List<DonationDTO> selectByMemberId(@Param("memberId") Long memberId); // 반환 타입 수정
    public List<DonationDTO> selectByMemberIdAndDateRange(
            @Param("memberId") Long memberId,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate
    );
}
