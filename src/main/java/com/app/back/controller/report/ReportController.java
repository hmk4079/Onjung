package com.app.back.controller.report;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.post.PostDTO;
import com.app.back.domain.report.ReportDTO;
import com.app.back.service.post.PostService;
import com.app.back.service.report.ReportService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
@Controller // 이 클래스가 컨트롤러임을 나타냄
@RequestMapping("/report/*") // 봉사모집 관련 요청을 처리
@RequiredArgsConstructor // 생성자 자동 생성
@Slf4j // 로깅 기능 추가
public class ReportController {

    private final PostService postService;
    private final ReportService reportService;

    @PostMapping("report-write")
    public RedirectView postReport(ReportDTO reportDTO, HttpSession session) {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");

        if (reportDTO.getPostId() == null) {
            throw new IllegalStateException("게시글 ID가 전달되지 않았습니다.");
        }

        if (loginMember == null) {
            throw new IllegalStateException("로그인 정보가 세션에 없습니다.");
        }

        // 게시글 정보를 가져옵니다.
        PostDTO post = postService.getPost(reportDTO.getPostId())
                .orElseThrow(() -> new IllegalStateException("해당 게시글을 찾을 수 없습니다."));

        // 작성자 정보를 가져옵니다.
        Long reportedMemberId = post.getMemberId();

        if (reportedMemberId == null) {
            throw new IllegalStateException("게시글 작성자의 정보가 없습니다.");
        }

        reportDTO.setMemberId(loginMember.getId()); // 신고한 회원 ID
        reportDTO.setReportedMemberId(reportedMemberId); // 신고 당한 회원 ID
        reportDTO.setReportStatus("WAITING");
        reportDTO.setCreatedDate(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

        reportService.save(reportDTO);

        return new RedirectView("/volunteer/volunteer-list");
    }
}
