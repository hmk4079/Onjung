package com.app.back.service.reply;

import com.app.back.domain.reply.ReplyDTO;
import com.app.back.domain.reply.ReplyListDTO;
import com.app.back.domain.reply.ReplyVO;

public interface ReplyService {

    // 댓글 추가
    public void save(ReplyDTO replyDTO);

    // 특정 게시글의 댓글 목록 조회
    public ReplyListDTO getListByPostId(Long postId);

    ReplyListDTO getListByPostId(Long postId, Pagination pagination);

    // 댓글 수정
    public void editReply(ReplyVO replyVO);
    // 댓글 소프프 삭제
    public void updateReplyStatus(Long id, String status);

    // 댓글 전체 개수
    public int getTotalReplies(Long postId);
}
