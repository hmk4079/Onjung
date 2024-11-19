package com.app.back.mapper.inquiry;


import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.inquiry.InquiryVO;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface InquiryMapper {

    //    추가
    public void insert(InquiryVO inquiryVO);

    //    조회
    public Optional<InquiryDTO> selectById(Long id);

    //  전체조회
    public List<InquiryDTO> selectAll(@Param("pagination") Pagination pagination, @Param("search")Search search);

    // 필터링된 전체 조회
    public List<InquiryDTO> selectFilterAll(@Param("pagination") Pagination pagination, @Param("search")Search search,@Param("filterType") String filterType);

    //    수정
    public void updateById(InquiryDTO inquiryDTO);

    // 문의 상태 업데이트 메소드
    public void updateStatus(@Param("id") Long id, @Param("status") String status);

    //    삭제
    public void deleteById(Long id);

    //    게시글 전체 개수 조회
    public int selectTotal();

    //    검색 결과 개수 조회
    public int selectTotalWithSearch(@Param("search") Search search);

    //  필터 개수 조회
    public int selectTotalWithFilter(@Param("search") Search search, @Param("filterType") String filterType);


public List<InquiryDTO> selectByMemberId(@Param("memberId") Long memberId); // 반환 타입 수정

public List<InquiryDTO> selectByMemberIdAndDateRange(
        @Param("memberId") Long memberId,
        @Param("startDate") String startDate,
        @Param("endDate") String endDate
);


}
