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
    //    댓글 소프트 삭제
    void updateStatusById(Long id, String status);
    //    댓글 수정
    public void update(ReplyVO replyVO);
    //    댓글 전체 개수
    public int selectCount(Long postId);

}
