package com.app.back.controller.reply;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.profile.ProfileDTO;
import com.app.back.domain.reply.Pagination;
import com.app.back.domain.reply.ReplyDTO;
import com.app.back.domain.reply.ReplyListDTO;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.exception.NotFoundPostException;
import com.app.back.service.reply.ReplyService;
import com.app.back.service.volunteer.VolunteerService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/replies/*")
@Slf4j
@RequiredArgsConstructor
public class ReplyController {

    private final ReplyService replyService;
    private final HttpSession session;
    private VolunteerService volunteerService;

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

    @PostMapping("/write")
    public ResponseEntity<?> write(@RequestBody ReplyDTO replyDTO, HttpSession session) {
        // 세션에서 사용자 정보 가져오기
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        if (loginMember == null) {
            log.warn("로그인 상태가 아닙니다. 댓글 작성 요청 거부.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        // 사용자 정보 설정
        replyDTO.setMemberId(loginMember.getId());

        // 댓글 저장
        try {
            replyService.save(replyDTO);
            log.info("댓글이 성공적으로 저장되었습니다. ReplyDTO: {}", replyDTO);
            return ResponseEntity.ok("댓글 작성 성공");
        } catch (Exception e) {
            log.error("댓글 저장 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 작성 실패");
        }
    }

    @GetMapping("/list")
    public ResponseEntity<ReplyListDTO> getReplies(
            @RequestParam Long postId,
            @RequestParam(required = false, defaultValue = "1") int page) {
        Pagination pagination = new Pagination();
        pagination.setPage(page);

        ReplyListDTO replyListDTO = replyService.getListByPostId(postId, pagination);
        return ResponseEntity.ok(replyListDTO);
    }



//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteReply(@PathVariable Long id) {
//        try {
//            replyService.updateReplyStatus(id,);
//            log.info("댓글이 성공적으로 삭제되었습니다. ID: {}", id);
//            return ResponseEntity.ok("댓글이 성공적으로 삭제되었습니다.");
//        } catch (Exception e) {
//            log.error("댓글 삭제 중 오류 발생: {}", e.getMessage());
//            return ResponseEntity.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR).body("댓글 삭제 중 오류가 발생했습니다.");
//        }
//    }
//
//    @GetMapping("{postId}/{page}")
//    public ResponseEntity<ReplyListDTO> getRepliesByPostId(@PathVariable("postId") Long postId,
//                                                           @PathVariable("page") int page,
//                                                           Pagination pagination) {
//        ReplyListDTO replies = replyService.selectRepliesByPostId(page, pagination, postId);
//        return ResponseEntity.ok(replies);
//    }

//    @GetMapping("/count/{postId}")
//    public ResponseEntity<Integer> getReplyCount(@PathVariable Long postId) {
//        int count = replyService.getTotalReplies(postId);
//        return ResponseEntity.ok(count);
//    }
}
