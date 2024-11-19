package com.app.back.mapper.inquiryAnswer;


import com.app.back.domain.inquiry_answer.InquiryAnswerVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InquiryAnswerMapper {

    //    답변 추가
    public void insertAnswer(InquiryAnswerVO inquiryanswerVO);

}