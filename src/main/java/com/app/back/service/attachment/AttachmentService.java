package com.app.back.service.attachment;

import com.app.back.domain.attachment.AttachmentDTO;
import com.app.back.domain.attachment.AttachmentVO;

import java.util.List;

public interface AttachmentService {

//    파일 추가
    public void register(AttachmentVO attachmentVO);

//    파일 조회
    public AttachmentDTO getFile(Long id);

//    파일 목록
    public List<AttachmentDTO> getList(Long postId);

//    파일 삭제
    public void delete(Long id);

//    게시글 삭제 시, 해당 파일 전체 삭제
    public void deleteAll(Long postId);
}
