package com.app.back.service.reply;

import com.app.back.domain.reply.ReplyDTO;
import com.app.back.domain.reply.ReplyVO;

import java.util.List;

public interface ReplyService {

    // 댓글 추가
    public void addReply(ReplyVO replyVO);

    // 특정 게시글의 댓글 목록 조회
    public List<ReplyDTO> getRepliesByPostId(Long postId);

    // 댓글 상태 업데이트
    public void updateReplyStatus(Long id, String status);

}
