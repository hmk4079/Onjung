package com.app.back.service.report;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.domain.report.ReportDTO;
import com.app.back.enums.AdminReportStatus;
import com.app.back.repository.report.ReportDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class ReportServiceImpl implements ReportService {
    private final ReportDAO reportDAO;

    @Override
    public void save(ReportDTO reportDTO) {
        reportDAO.save(reportDTO.toVO());
    }

    @Override
    public Optional<ReportDTO> getReport(Long id) {
        return reportDAO.findById(id);
    }

    @Override
    public List<ReportDTO> getAllReports(Pagination pagination, Search search) {
        return reportDAO.findAll(pagination, search);
    }

    @Override
    public List<ReportDTO> getFilteredReports(Pagination pagination, Search search, String filterType) {
        return reportDAO.findFilterAll(pagination, search, filterType);
    }

    @Override
    public void updateReport(ReportDTO reportDTO) {
        reportDAO.update(reportDTO);
    }

    @Override
    public void updateReportStatus(Long id, AdminReportStatus status) {
        reportDAO.updateStatus(id, status);
    }
    @Override
    public void deleteReport(Long id) {
        reportDAO.delete(id);
    }

    @Override
    public int getTotalReports() {
        return reportDAO.getTotal();
    }

    @Override
    public int getTotalReportsWithSearch(Search search) {
        return reportDAO.getTotalWithSearch(search);
    }

    @Override
    public int getTotalReportsWithFilter(Search search, String filterType) {
        return reportDAO.getTotalWithFilter(search, filterType);
    }
}
