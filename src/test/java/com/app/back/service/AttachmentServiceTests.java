package com.app.back.service;

import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.mapper.attachment.AttachmentMapper;

import com.app.back.service.attachment.AttachmentService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class AttachmentServiceTests {

    @Autowired
    private AttachmentMapper attachmentMapper;
    @Autowired
    private AttachmentService attachmentService;

    @Test
    public void testInsert() {
    }
}