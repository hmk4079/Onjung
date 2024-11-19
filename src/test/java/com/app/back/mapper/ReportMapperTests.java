package com.app.back.mapper;

import com.app.back.domain.report.ReportDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.mapper.report.ReportMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

@SpringBootTest
@Slf4j
public class ReportMapperTests {
    @Autowired
    private ReportMapper reportMapper;

    @Test
    public void testWrite() {
        ReportDTO reportDTO = new ReportDTO();
        reportDTO.setReportReason("신고 준비 중");
        reportDTO.setReportStatus("WAITING");
        reportDTO.setPostId(151L);
        reportDTO.setMemberId(2L);
        reportDTO.setReportedMemberId(1L);
        reportMapper.insert(reportDTO.toVO());
    }


    @Test
    public void testWriteMultiple() {
        for (long i = 5; i <= 150; i++) {
            ReportDTO reportDTO = new ReportDTO();
            reportDTO.setReportReason("신고사유 " + i);
            reportDTO.setReportStatus("WAITING");
            reportDTO.setPostId(i);
            reportDTO.setMemberId(1L);
            reportDTO.setReportedMemberId(2L);
            reportMapper.insert(reportDTO.toVO());
        }
    }

    @Test
    public void testSelectAll() {
        Pagination pagination = new Pagination();
        pagination.progress();
        log.info("{}, {}", pagination.getStartRow(), pagination.getRowCount());
        reportMapper.selectAll(pagination, new Search()).stream()
                .map(ReportDTO::toString).forEach(log::info);
    }

    @Test
    public void testSelectById() {
        Long id = 1L;
        Optional<ReportDTO> reportDTO = reportMapper.selectById(id);
        reportDTO.ifPresent(dto -> log.info("조회된 신고: " + dto));
    }

    @Test
    public void testUpdate() {
        ReportDTO reportDTO = new ReportDTO();
        reportDTO.setId(1L);
        reportDTO.setReportReason("수정된 신고 사유");
        reportDTO.setReportStatus("RESOLVED");
        reportMapper.updateById(reportDTO);
        log.info("신고 수정되었습니다: " + reportDTO);
    }

    @Test
    public void testDeleteById() {
        Long id = 1L;
        reportMapper.deleteById(id);
        log.info("신고가 삭제되었습니다. ID: " + id);
    }
}
