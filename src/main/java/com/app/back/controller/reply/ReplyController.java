package com.app.back.controller.reply;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.reply.ReplyDTO;
import com.app.back.domain.reply.ReplyListDTO;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.service.reply.ReplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/replies/*")
@Slf4j
//@Tag(name="Reply", description = "Reply RESTful API")
//http://localhost:10000/swagger-ui/index.html
public class ReplyController {

    private final ReplyService replyService;

    // 댓글작성
    @Operation(summary = "댓글 작성", description = "댓글 작성 시 사용하는 API")
    @PostMapping("write")
    public void addReply(@RequestBody ReplyDTO replyDTO) {
        log.info("들어옴!!");
        log.info(replyDTO.toString());

        replyService.save(replyDTO.toReplyVO());
    }

    //    댓글 조회
    @Operation(summary = "댓글 목록", description = "댓글 목록 조회 시 사용하는 API")
    @GetMapping("{postId}/{page}")
    public ReplyListDTO getList(@PathVariable("postId") Long postId,
                                @PathVariable("page") int page,
                                Pagination pagination,
                                Model model) {

        return replyService.getList(postId);
    }

//    //    SELECT
//    @Operation(summary = "댓글 목록", description = "댓글 목록 조회 시 사용하는 API")
//    @GetMapping("{postId}/{page}")
//    public ReplyListDTO getList(@PathVariable("postId") Long postId,
//                                @PathVariable("page") int page,
//                                Pagination pagination,
//                                Model model) {
//
//        return replyService.getRepliesByPostId(postId);
//    }

    // 댓글 json형태
    @GetMapping("reply-info")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getReplyInfo(HttpSession session) {
        // 샘플 ReplyDTO 생성
        ReplyDTO sampleReply = new ReplyDTO();
        sampleReply.setReplyContent("댓글테스트인뎁숑?");
        sampleReply.setReplyStatus("VISIBLE");
        sampleReply.setMemberId(35L);
        sampleReply.setPostId(40L);
        sampleReply.setCreatedDate(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd")));

        // PostId 기준으로 댓글 목록 가져오기
        Long postId = sampleReply.getPostId(); // 예제용 PostId 사용
        ReplyListDTO replyListDTO = replyService.getList(postId);

        // 댓글 목록을 올바르게 처리
        List<ReplyDTO> replyList;
        if (replyListDTO != null) {
            replyList = replyListDTO.getReplies(); // ReplyListDTO 내부에서 List<ReplyDTO> 가져오기
        } else {
            replyList = List.of(); // Null 안전 처리
        }

        // 응답 데이터 구성
        Map<String, Object> response = new HashMap<>();
        response.put("sampleReply", sampleReply);
        response.put("comments", replyList);

        return ResponseEntity.ok(response);
    }
}

