package com.app.back.repository.reply;


import com.app.back.domain.reply.ReplyDTO;
import com.app.back.domain.reply.ReplyVO;
import com.app.back.mapper.reply.ReplyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReplyDAO {
    private final ReplyMapper replyMapper;

    public void save(ReplyVO replyVO) {
        replyMapper.insert(replyVO);
    }

    public List<ReplyDTO> findAllByPostId(Long postId) {
        return replyMapper.postReplyAll(postId);
    }

    public void updateStatus(Long id, String status) {
        replyMapper.updateStatusById(id, status);
    }
}
