package com.app.back.domain.inquiry_answer;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class InquiryAnswerVO {
    private Long id;
    private String inquiryAnswer;
    private Long inquiryId;
}
