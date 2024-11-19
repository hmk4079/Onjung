package com.app.back.mapper.report;


import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.domain.report.ReportDTO;
import com.app.back.domain.report.ReportVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface ReportMapper {

    // 신고 추가
    public void insert(ReportVO reportVO);

    // 신고 ID로 조회
    public Optional<ReportDTO> selectById(Long id);

    // 전체 신고 목록 조회
    public List<ReportDTO> selectAll(@Param("pagination") Pagination pagination, @Param("search") Search search);

    // 필터가 적용된 전체 신고 목록 조회
    public List<ReportDTO> selectFilterAll(@Param("pagination") Pagination pagination, @Param("search") Search search, @Param("filterType") String filterType);

    // 신고 업데이트
    public void updateById(ReportDTO reportDTO);

    // 신고 상태 업데이트
    public void updateStatus(@Param("id") Long id, @Param("status") String status);

    // 신고 삭제
    public void deleteById(Long id);

    // 전체 신고 개수 조회
    public int selectTotal();

    // 검색 결과 신고 개수 조회
    public int selectTotalWithSearch(@Param("search") Search search);

    // 필터 적용된 신고 개수 조회
    public int selectTotalWithFilter(@Param("search") Search search, @Param("filterType") String filterType);

}
