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
        replyDTO.setReplyContent("댓글테스트하겠습니다");
        replyDTO.setReplyStatus("VISIBLE");
        replyDTO.setMemberId(37L);
        replyDTO.setPostId(40l);
        replyMapper.insert(replyDTO.toReplyVO());
    }
}
