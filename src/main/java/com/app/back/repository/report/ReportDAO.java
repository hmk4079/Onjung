package com.app.back.repository.report;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.domain.report.ReportDTO;
import com.app.back.domain.report.ReportVO;
import com.app.back.enums.AdminReportStatus;
import com.app.back.mapper.report.ReportMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ReportDAO {
    private final ReportMapper reportMapper;

    // 신고 추가
    public void save(ReportVO reportVO) {
        reportMapper.insert(reportVO);
    }

    // 신고 ID로 조회
    public Optional<ReportDTO> findById(Long id) {
        return reportMapper.selectById(id);
    }

    // 전체 신고 목록 조회
    public List<ReportDTO> findAll(Pagination pagination, Search search) {
        return reportMapper.selectAll(pagination, search);
    }

    // 필터된 전체 신고 목록 조회
    public List<ReportDTO> findFilterAll(Pagination pagination, Search search, String filterType) {
        return reportMapper.selectFilterAll(pagination, search, filterType);
    }

    // 신고 업데이트
    public void update(ReportDTO reportDTO) {
        reportMapper.updateById(reportDTO);
    }

    // 신고 상태 업데이트
    public void updateStatus(Long id, AdminReportStatus status) {
        reportMapper.updateStatus(id, status.name());  // Enum name()으로 변환하여 상태 업데이트
    }
    // 신고 삭제
    public void delete(Long id) {
        reportMapper.deleteById(id);
    }

    // 전체 신고 개수 조회
    public int getTotal() {
        return reportMapper.selectTotal();
    }

    // 검색 결과 신고 개수 조회
    public int getTotalWithSearch(Search search) {
        return reportMapper.selectTotalWithSearch(search);
    }
    // 필터 적용된 신고 개수 조회
    public int getTotalWithFilter(Search search, String filterType) {
        return reportMapper.selectTotalWithFilter(search, filterType);
    }
}
