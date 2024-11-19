package com.app.back.repository.attachment;


import com.app.back.domain.attachment.AttachmentDTO;
import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.mapper.attachment.AttachmentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AttachmentDAO {
    private final AttachmentMapper attachmentMapper;

//    파일 추가
    public void save(AttachmentVO attachmentVO){
        attachmentMapper.insert(attachmentVO);
    }

//    파일 조회
    public AttachmentDTO findById(Long id){
        return attachmentMapper.selectById(id);
    }

//    파일 목록
    public List<AttachmentDTO> findAll(Long postId){
        return attachmentMapper.selectAll(postId);
    }

//    파일 삭제
    public void delete(Long id){
        attachmentMapper.delete(id);
    }

//    게시글 삭제 시, 해당 파일 전체 삭제
    public void deleteByPostId(Long postId){
        attachmentMapper.deleteByPostId(postId);
    }

}
