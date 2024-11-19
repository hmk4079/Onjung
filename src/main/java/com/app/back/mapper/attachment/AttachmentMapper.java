package com.app.back.mapper.attachment;


import com.app.back.domain.attachment.AttachmentDTO;
import com.app.back.domain.attachment.AttachmentVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AttachmentMapper {

//  파일 추가
    public void insert(AttachmentVO attachmentVO);

//  파일 조회
    public AttachmentDTO selectById(Long id);

//  파일 목록
    public List<AttachmentDTO> selectAll(Long postId);

//  파일 삭제
    public void delete(Long id);

//    게시글 삭제 시, 해당 파일 전체 삭제
    public void deleteByPostId(Long postId);

}
