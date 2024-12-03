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
            log.info("로그인 상태 - 사용자 ID: {}, 프로필 ID: {}", loginMember.getId(), memberProfile != null ? memberProfile.getId() : "null");
        } else {
            log.info("비로그인 상태입니다.");
        }
    }

    @Operation(summary = "댓글 작성", description = "댓글 작성 시 사용하는 API")
    @PostMapping("/posts/{postId}/replies")
    public ResponseEntity<ReplyDTO> addReply(
            @PathVariable Long postId,
            @RequestBody ReplyDTO replyDTO) {
        try {
            replyDTO.setPostId(postId);
            Long memberId = replyDTO.getMemberId();
            if (memberId == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            ReplyVO replyVO = replyDTO.toReplyVO();

            // 댓글 저장
            replyService.save(replyVO);

            ReplyDTO createdReplyDTO = replyService.getReplyById(replyVO.getId());

            return new ResponseEntity<>(createdReplyDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("댓글 작성 중 오류", e);
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
            @RequestBody ReplyDTO replyDTO) {
        try {
            replyDTO.setId(replyId);

            // 댓글 조회
            ReplyDTO existingReply = replyService.getReplyById(replyId);
            if (existingReply == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            if (!existingReply.getMemberId().equals(replyDTO.getMemberId())) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }

            ReplyVO replyVO = replyDTO.toReplyVO();

            // 댓글 수정
            replyService.editReply(replyVO);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.error("댓글 수정 중 오류", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @Operation(summary = "댓글 소프트 삭제", description = "댓글 삭제 시 사용하는 API")
//    @DeleteMapping("/replies-delete/{replyId}")
//    public ResponseEntity<Void> deleteReply(
//            @PathVariable Long replyId,
//            @RequestParam Long memberId) { // 프론트엔드에서 memberId를 전달받음
//        try {
//            // 댓글 조회
//            ReplyDTO existingReply = replyService.getReplyById(replyId);
//            if (existingReply == null) {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
//
//            if (!existingReply.getMemberId().equals(memberId)) {
//                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
//            }
//
//            // 댓글 삭제
//            replyService.updateReplyStatus(replyId);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            log.error("댓글 삭제 중 오류", e);
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
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
