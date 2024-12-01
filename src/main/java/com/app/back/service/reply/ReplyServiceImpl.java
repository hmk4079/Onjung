package com.app.back.service.reply;

import com.app.back.domain.reply.ReplyDTO;
import com.app.back.domain.reply.ReplyListDTO;
import com.app.back.domain.reply.Pagination;
import com.app.back.repository.reply.ReplyDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;


@Slf4j
@Service
@Primary
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {
    private final ReplyDAO replyDAO;

    // 댓글 추가
    @Override
    public void save(ReplyDTO replyDTO) {
        replyDAO.insertReply(replyDTO);
    }

//    @Override
//    public ReplyListDTO getListByPostId(Long postId, Pagination pagination) {
//        List<ReplyDTO> replies = replyDAO.findPagedByPostId(postId, pagination);
//
//        ReplyListDTO replyListDTO = new ReplyListDTO();
//        replyListDTO.setReplies(replies); // 댓글 목록 설정
//        replyListDTO.setPagination(pagination); // Pagination 설정
//        return replyListDTO;
//    }

    @Override
    public ReplyListDTO getListByPostId(Long postId, Pagination pagination) {
        ReplyListDTO replyListDTO = new ReplyListDTO();

        // 페이지 및 총 댓글 수 설정
        int totalReplies = replyDAO.getReplyCount(postId);
        pagination.setTotal(totalReplies);
        pagination.progress();
        log.info("Pagination 설정 완료: {}", pagination);

        // 댓글 리스트 가져오기
        List<ReplyDTO> replies = replyDAO.findPagedByPostId(pagination.getPage(), postId, pagination);
        if (replies == null || replies.isEmpty()) {
            log.warn("댓글이 없습니다. Post ID: {}", postId);
            replies = Collections.emptyList();
        }

        // DTO에 설정
        replyListDTO.setPagination(pagination);
        replyListDTO.setReplies(replies);

        return replyListDTO;
    }


    //
//    // 댓글 수정
//    @Override
//    public void editReply(ReplyVO replyVO) {replyDAO.update(replyVO);}
//    // 댓글 소프트 삭제
//    @Override
//    public void updateReplyStatus(Long id, String status) {
//        replyDAO.updateStatus(id, status);  // 댓글 상태 업데이트
//    }
    // 댓글 전체 개수
    @Override
    public int getTotalReplies(Long postId) {
        return replyDAO.getReplyCount(postId);
    }

}
