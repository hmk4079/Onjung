package com.app.back.domain.reply;


import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class ReplyVO {
    private Long id;
    private String replyContent;
    private String replyStatus;
    private String createdDate;
    private String updatedDate;
    private Long memberId;
    private Long postId;
}
