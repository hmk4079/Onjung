package com.app.back.service.inquiryAnswer;

import com.app.back.domain.inquiry_answer.InquiryAnswerDTO;
import com.app.back.domain.inquiry_answer.InquiryAnswerVO;
import com.app.back.mapper.inquiryAnswer.InquiryAnswerMapper;
import com.app.back.repository.InquiryAnswer.InquiryAnswerDAO;
import com.app.back.repository.attachment.AttachmentDAO;
import com.app.back.repository.post.PostDAO;
import com.app.back.service.attachment.AttachmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class InquiryAnswerServiceImpl implements InquiryAnswerService {

    private final AttachmentDAO attachmentDAO;
    private final PostDAO postDAO; // 게시글 DAO
    private final AttachmentService attachmentService;
    private final InquiryAnswerDAO inquiryAnswerDAO;
    private final InquiryAnswerMapper inquiryAnswerMapper;

    @Override
    public void write(InquiryAnswerDTO inquiryAnswerDTO) {
        InquiryAnswerVO inquiryAnswerVO = inquiryAnswerDTO.toAnswerVO();
        inquiryAnswerMapper.insertAnswer(inquiryAnswerVO);

    }
}