package com.app.back.controller.reply;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.profile.ProfileDTO;
import com.app.back.domain.reply.Pagination;
import com.app.back.domain.reply.ReplyDTO;
import com.app.back.domain.reply.ReplyListDTO;
import com.app.back.domain.reply.ReplyVO;
import com.app.back.service.reply.ReplyService;
import com.app.back.service.volunteer.VolunteerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/replies/*")
@Slf4j
@RequiredArgsConstructor
@Tag(name="Reply", description = "Reply RESTful API")
//http://localhost:10000/swagger-ui/index.html
public class ReplyController {

    private final ReplyService replyService;

    @ModelAttribute
    public void setMemberInfo(HttpSession session, Model model) {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        ProfileDTO memberProfile = (ProfileDTO) session.getAttribute("memberProfile");

        boolean isLoggedIn = loginMember != null;
        model.addAttribute("isLoggedIn", isLoggedIn);

        if (isLoggedIn) {
            model.addAttribute("loginMember", loginMember);
            model.addAttribute("memberProfile", memberProfile);
            log.info("로그인 상태 - 사용자 ID: {}, 프로필 정보: {}", loginMember.getId(), memberProfile != null ? memberProfile.getId() : "null");
        } else {
            log.info("비로그인 상태입니다.");
        }
    }

    @Operation(summary = "댓글 작성", description = "댓글 작성 시 사용하는 API")
    @PostMapping("/posts/{postId}/replies")
    public ResponseEntity<ReplyDTO> addReply(
            @PathVariable Long postId,
            @RequestBody ReplyDTO replyDTO, HttpSession session) {
        try {
            // 세션에서 로그인 멤버 정보 가져오기
            MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");

            if (loginMember == null) {
                log.error("로그인된 사용자가 없습니다.");
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // 401 Unauthorized
            }

            // 댓글 정보 설정
            replyDTO.setPostId(postId);
            replyDTO.setMemberId(loginMember.getId()); // 세션에서 가져온 사용자 ID 설정
            replyDTO.setReplyStatus("VISIBLE");

            // VO 변환 후 저장
            ReplyVO replyVO = replyDTO.toReplyVO();
            replyService.save(replyVO);

            log.info("저장된 ReplyVO ID: {}", replyVO.getId());

            // 저장된 댓글 데이터 조회
            ReplyDTO createdReplyDTO = replyService.getReplyById(replyVO.getId());
            if (createdReplyDTO == null) {
                log.error("저장된 댓글 데이터를 조회할 수 없습니다. ID: {}", replyVO.getId());
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

            // 세션에서 가져온 프로필 정보 추가
            createdReplyDTO.setProfileFileName(loginMember.getProfileFileName());
            createdReplyDTO.setProfileFilePath(loginMember.getProfileFilePath());

            log.info("저장된 댓글 데이터: {}", createdReplyDTO);
            log.info("작성자의 프로필 파일명: {}", createdReplyDTO.getProfileFileName());
            log.info("작성자의 프로필 경로: {}", createdReplyDTO.getProfileFilePath());

            return new ResponseEntity<>(createdReplyDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("댓글 작성 중 오류 발생", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Operation(summary = "댓글 목록", description = "댓글 목록 조회 시 사용하는 API")
    @GetMapping("/posts/{postId}/replies")
    public ReplyListDTO getReplies(
            @PathVariable("postId") Long postId,
            @RequestParam(defaultValue = "1") int page,
            Pagination pagination
    ) {
        int totalReplies = replyService.getTotalReplies(postId);
        pagination.setTotal(totalReplies);
        pagination.setPage(page);
        pagination.progress();

        return replyService.getListByPostId(page, postId, pagination);
    }

    @Operation(summary = "댓글 수정", description = "댓글 수정 시 사용하는 API")
    @PutMapping("/replies-update/{replyId}")
    public ResponseEntity<Void> updateReply(
            @PathVariable Long replyId,
            @RequestBody ReplyDTO replyDTO, HttpSession session) {
        try {
            // 세션에서 로그인 사용자 정보 가져오기
            MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
            if (loginMember == null) {
                log.error("로그인된 사용자가 없습니다.");
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            replyDTO.setId(replyId);

            // 댓글 조회
            ReplyDTO existingReply = replyService.getReplyById(replyId);
            if (existingReply == null) {
                log.error("댓글이 존재하지 않습니다. replyId: {}", replyId);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            // 권한 검사: 로그인 사용자와 댓글 작성자 비교
            if (!existingReply.getMemberId().equals(loginMember.getId())) {
                log.error("수정 권한이 없습니다. 로그인 사용자 ID: {}, 댓글 작성자 ID: {}", loginMember.getId(), existingReply.getMemberId());
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            // 댓글 수정
            ReplyVO replyVO = replyDTO.toReplyVO();
            replyService.editReply(replyVO);

            log.info("댓글이 수정되었습니다. replyId: {}", replyId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.error("댓글 수정 중 오류", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

        @Operation(summary = "댓글 소프트 삭제", description = "댓글 삭제 시 사용하는 API")
    @DeleteMapping("/replies-delete/{replyId}")
    public ResponseEntity<Void> deleteReply(
            @PathVariable Long replyId,
            @RequestParam Long memberId) { // 프론트엔드에서 memberId를 전달받음
        try {
            // 댓글 조회
            ReplyDTO existingReply = replyService.getReplyById(replyId);
            if (existingReply == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            if (!existingReply.getMemberId().equals(memberId)) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            // 댓글 삭제
            replyService.updateReplyStatus(id, status);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.error("댓글 삭제 중 오류", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @Operation(summary = "댓글 작성", description = "댓글 작성 시 사용하는 API")
//    @PostMapping("/write")
//    public ResponseEntity<?> write(@RequestBody ReplyDTO replyDTO, HttpSession session) {
//        // 세션에서 사용자 정보 가져오기
//        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
//        if (loginMember == null) {
//            log.warn("로그인 상태가 아닙니다. 댓글 작성 요청 거부.");
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
//        }
//
//        // 사용자 정보 및 기본 상태 설정
//        replyDTO.setMemberId(loginMember.getId());
//        replyDTO.setReplyStatus("VISIBLE"); // 댓글 상태 설정
//
//        // 댓글 저장
//        try {
//            replyService.save(replyDTO);
//            log.info("댓글이 성공적으로 저장되었습니다. ReplyDTO: {}", replyDTO);
//            return ResponseEntity.ok("댓글 작성 성공");
//        } catch (Exception e) {
//            log.error("댓글 저장 중 오류 발생: {}", e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 작성 실패");
//        }
//    }
//
//
//    @Operation(summary = "댓글 목록", description = "댓글 목록 조회 시 사용하는 API")
//    @GetMapping("/{postId}/{page}")
//    public ResponseEntity<ReplyListDTO> getReplies(
//            @PathVariable Long postId,
//            @PathVariable int page) {
//        // 페이지네이션 설정
//        Pagination pagination = new Pagination();
//        pagination.setPage(page);
//        pagination.setRowCount(10);
//
//        // 댓글 목록 조회
//        ReplyListDTO replyListDTO = replyService.getListByPostId(postId, pagination);
//
//        // 응답 반환
//        return ResponseEntity.ok(replyListDTO);
//    }

    // 댓글 수 조회
    @Operation(summary = "댓글 수 조회", description = "댓글 수 조회 시 사용하는 API")
    @GetMapping("/count/{postId}")
    public ResponseEntity<?> getReplyCount(@PathVariable Long postId) {
        try {
            int count = replyService.getTotalReplies(postId);
            return ResponseEntity.ok(Collections.singletonMap("count", count));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "댓글 수 조회 실패"));
        }
    }
}
