package com.app.back.controller.reply;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.profile.ProfileDTO;
import com.app.back.domain.reply.ReplyDTO;
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
    public ResponseEntity<?> write(@RequestBody ReplyDTO replyDTO) {
        ProfileDTO memberProfile = (ProfileDTO) session.getAttribute("memberProfile");

        // 로그인이 필요한 경우 처리
        if (memberProfile == null) {
            log.warn("로그인이 필요합니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        // 사용자 정보 설정
        replyDTO.setProfileFileName(memberProfile.getProfileFileName());
        replyDTO.setId(memberProfile.getId());
        VolunteerDTO volunteerDTO = volunteerService.getPostById(replyDTO.getPostId())
                .orElseThrow(() -> new NotFoundPostException("Volunteer with ID " + replyDTO.getPostId() + " not found"));

        // postId 확인 및 검증
        if (volunteerDTO.getPostId() == null) {
            log.error("postId가 null입니다. 요청을 확인하세요.");
            return ResponseEntity.badRequest().body("postId는 필수 입력값입니다.");
        } else {
            log.info("postId를 정상적으로 받았습니다: {}", replyDTO.getPostId());
        }

        // 댓글 저장 처리
        try {
            replyService.save(replyDTO);
            log.info("댓글이 성공적으로 작성되었습니다. ReplyDTO: {}", replyDTO);
            return ResponseEntity.ok("댓글이 성공적으로 작성되었습니다.");
        } catch (Exception e) {
            log.error("댓글 작성 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 작성 중 오류가 발생했습니다.");
        }
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

    @GetMapping("/count/{postId}")
    public ResponseEntity<Integer> getReplyCount(@PathVariable Long postId) {
        int count = replyService.getTotalReplies(postId);
        return ResponseEntity.ok(count);
    }
}
