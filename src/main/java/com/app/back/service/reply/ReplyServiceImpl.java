package com.app.back.service.reply;

import com.app.back.domain.reply.ReplyDTO;
import com.app.back.domain.reply.ReplyListDTO;
import com.app.back.domain.reply.ReplyVO;
import com.app.back.repository.reply.ReplyDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Primary
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {
    private final ReplyDAO replyDAO;
    private final ReplyDTO replyDTO;

    // 댓글 추가
    @Override
    public void save(ReplyVO replyVO) {
        replyDAO.insertReply(replyVO);
    }
    // 댓글 목록 조회
    @Override
    public ReplyListDTO getList(Long postId) {
        ReplyListDTO replyListDTO = new ReplyListDTO();
        replyListDTO.setReplies(replyDAO.findAllByPostId(postId));
        return replyListDTO;
    }
    // 댓글 수정
    @Override
    public void editReply(ReplyVO replyVO) {replyDAO.update(replyVO);}
    // 댓글 소프트 삭제
    @Override
    public void updateReplyStatus(Long id, String status) {
        replyDAO.updateStatus(id, status);  // 댓글 상태 업데이트
    }
    // 댓글 전체 개수
    @Override
    public int getTotal(Long postId) {
        return replyDAO.getReplyCount(postId);
    }


}
