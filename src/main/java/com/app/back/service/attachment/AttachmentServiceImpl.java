package com.app.back.service.attachment;


import com.app.back.domain.attachment.AttachmentDTO;
import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.repository.attachment.AttachmentDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Primary
@RequiredArgsConstructor
public class AttachmentServiceImpl implements AttachmentService{
    private final AttachmentDAO attachmentDAO;

    @Override
    public void register(AttachmentVO attachmentVO) {
        attachmentDAO.save(attachmentVO);
    }

    @Override
    public AttachmentDTO getFile(Long id) {
        return attachmentDAO.findById(id);
    }

    @Override
    public List<AttachmentDTO> getList(Long postId) {
        return attachmentDAO.findAll(postId);
    }

    @Override
    public void delete(Long id) {
        attachmentDAO.delete(id);
    }

    @Override
    public void deleteAll(Long postId) {
        attachmentDAO.deleteByPostId(postId);
    }
}
