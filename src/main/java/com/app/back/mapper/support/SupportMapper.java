package com.app.back.mapper.support;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.support.SupportDTO;
import com.app.back.domain.support.SupportVO;
import com.app.back.domain.support.Pagination;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface SupportMapper {

    //    메인페이지 top10
    public List<SupportDTO> selectTop10Supports();
    // 봉사활동 게시글 작성
    public void insert(SupportVO supportVO);
    // 봉사활동 게시글 전체 조회
    List<SupportDTO> selectList(Pagination pagination);
    // 전체 개수
    int selectTotal(@Param("postType") String postType, @Param("postStatus") String postStatus);
    //  봉사활동 게시글 조회
    public Optional<SupportDTO> selectById(Long id);
    //  봉사활동 게시글 수정
    public void updateSupport(SupportVO supportVO);
    //  봉사활동 게시글 삭제
    public void deleteById(Long id);

    public List<SupportDTO> selectByMemberId(@Param("memberId") Long memberId); // 반환 타입 수정

    public List<SupportDTO> selectByMemberIdAndDateRange(
            @Param("memberId") Long memberId,
            @Param("startDate") String startDate,
            @Param("endDate") String endDate
    );
    //    조회수 증가
    public void updatePostReadCount(Long id);

    //    후원 포인트 증가
    void updateCurrentPoint(SupportDTO supportDTO);

    //    현재 후원 포인트와 목표포인트 조회(확인)
    SupportDTO findSupportById(SupportDTO supportDTO);

}

