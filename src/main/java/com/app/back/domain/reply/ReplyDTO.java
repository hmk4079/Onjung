package com.app.back.domain.reply;


import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class ReplyDTO {
    private Long id;
    private String replyContent;
    private String replyStatus;
    private String createdDate;
    private String updatedDate;
    private Long memberId;
    private Long postId;

    public ReplyVO toReplyVO() {
        return new ReplyVO(id, replyContent, replyStatus, createdDate, updatedDate, memberId, postId);
    }

}
