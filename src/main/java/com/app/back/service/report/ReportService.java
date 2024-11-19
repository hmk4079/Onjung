package com.app.back.service.report;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.domain.report.ReportDTO;
import com.app.back.enums.AdminReportStatus;

import java.util.List;
import java.util.Optional;

public interface ReportService {
    // 신고 추가
    public void save(ReportDTO reportDTO);

    // 신고 ID로 조회
    public Optional<ReportDTO> getReport(Long id);

    // 전체 신고 목록 조회
    public List<ReportDTO> getAllReports(Pagination pagination, Search search);

    // 필터가 적용된 전체 신고 목록 조회
    public List<ReportDTO> getFilteredReports(Pagination pagination, Search search, String filterType);

    // 신고 업데이트
    public void updateReport(ReportDTO reportDTO);

    // 신고 상태 업데이트
    public void updateReportStatus(Long id, AdminReportStatus status);

    // 신고 삭제
    public void deleteReport(Long id);

    // 전체 신고 개수 조회
    public int getTotalReports();

    // 검색 결과 신고 개수 조회
    public int getTotalReportsWithSearch(Search search);

    // 필터 적용된 신고 개수 조회
    public int getTotalReportsWithFilter(Search search, String filterType);
}
