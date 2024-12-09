package com.app.back.mapper.support;

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

    public List<SupportDTO> selectTop10Supports();
    public void updateCurrentPoint(SupportDTO supportDTO);
    // 봉사활동 게시글 작성
    public void insert(SupportVO supportVO);
    // 봉사활동 게시글 전체 조회
    public List<SupportDTO> selectAll(@Param("pagination") Pagination pagination);
    // 전체 개수
    public int selectTotal();
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

}

