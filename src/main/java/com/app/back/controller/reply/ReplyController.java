package com.app.back.controller.reply;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.reply.ReplyDTO;
import com.app.back.domain.reply.ReplyListDTO;
import com.app.back.service.reply.ReplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/replies/*")
@Slf4j
@Tag(name="Reply", description = "Reply RESTful API")
//http://localhost:10000/swagger-ui/index.html
public class ReplyController {

    private final ReplyService replyService;

    // 댓글작성
    @Operation(summary = "댓글 작성", description = "댓글 작성 시 사용하는 API")
    @PostMapping("write")
    public void addReply(@RequestBody ReplyDTO replyDTO){
        log.info("들어옴!!");
        log.info(replyDTO.toString());
        replyService.addReply(replyDTO.toReplyVO());
    }

    //    SELECT
    @Operation(summary = "댓글 목록", description = "댓글 목록 조회 시 사용하는 API")
    @GetMapping("{postId}/{page}")
    public ReplyListDTO getList(@PathVariable("postId") Long postId,
                                @PathVariable("page") int page,
                                Pagination pagination,
                                Model model){

        return replyService.getRepliesByPostId(postId);
    }

//    // 댓글 json형태
//    @GetMapping("reply-info")
//    @ResponseBody
//    public ResponseEntity<ReplyDTO> getReplyInfo(HttpSession session){
//        ReplyDTO replyDTO = new ReplyDTO();
//        replyDTO.setReplyContent("댓글테스트인뎁숑?");
//        replyDTO.setReplyStatus("VISIBLE");
//        replyDTO.setMemberId(35L);
//        replyDTO.setPostId(40L);
//        replyDTO.getCreatedDate()
//
//    }
}
