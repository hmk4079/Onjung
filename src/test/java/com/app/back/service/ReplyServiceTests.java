package com.app.back.service;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.domain.reply.ReplyDTO;
import com.app.back.domain.report.ReportDTO;
import com.app.back.mapper.reply.ReplyMapper;
import com.app.back.mapper.report.ReportMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
@Slf4j
public class ReplyServiceTests {
    @Autowired
    private ReplyMapper replyMapper;

    @Test
    public void testInsert() {
        ReplyDTO  replyDTO = new ReplyDTO();
        replyDTO.setPostId(40L);
        replyDTO.setMemberId(2L);
        replyDTO.setReplyContent("댓글테스트입니다잇");
        replyDTO.setReplyStatus("VISIBLE");
        replyMapper.insert(replyDTO.toReplyVO());
    }



//    @Test
//    public void testSelectAll() {
//        Pagination pagination = new Pagination();
//        pagination.progress();
//        log.info("{}, {}", pagination.getStartRow(), pagination.getRowCount());
//        reportMapper.selectAll(pagination, new Search()).stream()
//                .map(ReportDTO::toString).forEach(log::info);
//    }
//
//    @Test
//    public void testSelectById() {
//        Long id = 1L;
//        Optional<ReportDTO> reportDTO = reportMapper.selectById(id);
//        reportDTO.ifPresent(dto -> log.info("조회된 신고: " + dto));
//    }
//
//    @Test
//    public void testUpdate() {
//        ReportDTO reportDTO = new ReportDTO();
//        reportDTO.setId(1L);
//        reportDTO.setReportReason("수정된 신고 사유");
//        reportDTO.setReportStatus("RESOLVED");
//        reportMapper.updateById(reportDTO);
//        log.info("신고 수정되었습니다: " + reportDTO);
//    }
//
//    @Test
//    public void testDeleteById() {
//        Long id = 1L;
//        reportMapper.deleteById(id);
//        log.info("신고가 삭제되었습니다. ID: " + id);
//    }
}
