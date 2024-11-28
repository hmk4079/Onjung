package com.app.back.service.reply;

import com.app.back.domain.reply.ReplyDTO;
import com.app.back.domain.reply.ReplyListDTO;
import com.app.back.domain.reply.ReplyVO;

import java.util.List;

public interface ReplyService {

    // 댓글 추가
    public void addReply(ReplyVO replyVO);

    // 특정 게시글의 댓글 목록 조회
    public ReplyListDTO getRepliesByPostId(Long postId);
    // 댓글 수정
    public void editReply(ReplyVO replyVO);

    // 댓글 소프프 삭제
    public void updateReplyStatus(Long id, String status);

    // 댓글 전체 개수
    public int getTotal(Long postId);
}
