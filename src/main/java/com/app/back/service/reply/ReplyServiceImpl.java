package com.app.back.service.reply;

import com.app.back.domain.reply.ReplyDTO;
import com.app.back.domain.reply.ReplyVO;
import com.app.back.repository.reply.ReplyDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Primary
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {
    private final ReplyDAO replyDAO;

    // 댓글 추가
    @Override
    public void addReply(ReplyVO replyVO) {
        replyDAO.save(replyVO);
    }
    // 댓글 목록 조회
    @Override
    public List<ReplyDTO> getRepliesByPostId(Long postId) {
        return replyDAO.findAllByPostId(postId);
    }
    @Override
    public void updateReplyStatus(Long id, String status) {
        replyDAO.updateStatus(id, status);  // 댓글 상태 업데이트
    }



}
