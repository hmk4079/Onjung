package com.app.back.domain.reply;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter
@Setter
@ToString
public class ReplyListDTO {
    private List<ReplyDTO> replies; // 댓글 목록
    private Pagination pagination; // Pagination 객체
}
