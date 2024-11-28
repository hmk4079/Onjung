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
    //    댓글 추가
    public void save(ReplyVO replyVO) {
        replyMapper.insert(replyVO);
    }
    //    해당 포스트 댓글 목록
    public List<ReplyDTO> findAllByPostId(Long postId) {
        return replyMapper.postReplyAll(postId);
    }
    //    댓글 수정
    public void update(ReplyVO replyVO) {replyMapper.update(replyVO);}
    //    댓글 소프트 삭제
    public void updateStatus(Long id, String status) {
        replyMapper.updateStatusById(id, status);
    }
    //    댓글 갯수 조회
    public int getReplyCount(Long postId){
        return replyMapper.selectCount(postId);
    }
}
