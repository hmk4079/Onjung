package com.app.back.mapper.reply;


import com.app.back.domain.reply.ReplyDTO;
import com.app.back.domain.reply.ReplyVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReplyMapper {
//    게시글 작성
    public void insert(ReplyVO replyVO);
//    게시글 댓글 목록
    public List<ReplyDTO> postReplyAll(Long postId);
// 댓글 상태 업데이트
    void updateStatusById(Long id, String status);

}
