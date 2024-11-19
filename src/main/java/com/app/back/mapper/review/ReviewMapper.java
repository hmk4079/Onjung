package com.app.back.mapper.review;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.review.ReviewVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface ReviewMapper {
    // 추가
    public void insert(ReviewVO reviewVO);
    // 조회
    public Optional<ReviewDTO> selectById(Long id);
    // 전체 조회
    public List<ReviewDTO> selectAll(@Param("pagination") Pagination pagination);
    // 전체 개수
    public int selectCount();
    // 수정
    public void update(ReviewDTO reviewDTO);
    // 삭제
    public void deleteById(Long id);

    public List<ReviewDTO> selectByMemberId(@Param("memberId") Long memberId); // 반환 타입 수정
    public List<ReviewDTO> selectByMemberIdAndDateRange(
            @Param("memberId") Long memberId,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate
    );

    public List<ReviewDTO> selectTop10Reviews();
}
