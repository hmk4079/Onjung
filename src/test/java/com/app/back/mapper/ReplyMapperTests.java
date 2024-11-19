package com.app.back.mapper;

import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.reply.ReplyDTO;
import com.app.back.mapper.reply.ReplyMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class ReplyMapperTests {
    @Autowired
    private ReplyMapper replyMapper;

    @Test
    public void testwrite() {
        ReplyDTO replyDTO = new ReplyDTO();
        replyDTO.setId(6L);
        replyDTO.setReplyContent("야호");
        replyDTO.setReplyStatus("@gmail.com");
        replyDTO.setMemberId(2L);
        replyDTO.setPostId(1l);
        replyMapper.insert(replyDTO.toReplyVO());

    }
}
