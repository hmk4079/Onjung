package com.app.back.repository.InquiryAnswer;

import com.app.back.domain.inquiry.InquiryVO;
import com.app.back.domain.inquiry_answer.InquiryAnswerVO;
import com.app.back.mapper.inquiryAnswer.InquiryAnswerMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class InquiryAnswerDAO {
    private final InquiryAnswerMapper inquiryAnswerMapper;
    private final InquiryAnswerVO inquiryAnswerVO;

    //    게시글 작성
    public void save(InquiryAnswerVO inquiryAnswerVO) {
        inquiryAnswerMapper.insertAnswer(inquiryAnswerVO);
    }
}
