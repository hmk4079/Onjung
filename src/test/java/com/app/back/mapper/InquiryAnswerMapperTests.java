package com.app.back.mapper;

import com.app.back.domain.inquiry_answer.InquiryAnswerDTO;
import com.app.back.mapper.inquiryAnswer.InquiryAnswerMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class InquiryAnswerMapperTests {
    @Autowired
    private InquiryAnswerMapper inquiryAnswerMapper;
    @Autowired
    private InquiryAnswerDTO inquiryAnswerDTO;

    @Test
    public void testwrite() {
        InquiryAnswerDTO inquiryAnswerDTO = new InquiryAnswerDTO();
        inquiryAnswerDTO.setId(3L);
        inquiryAnswerDTO.setInquiryId(2L);
        inquiryAnswerDTO.setInquiryAnswer("답변작성2");
        inquiryAnswerMapper.insertAnswer(inquiryAnswerDTO.toAnswerVO());
    }


}
