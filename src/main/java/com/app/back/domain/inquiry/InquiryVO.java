package com.app.back.domain.inquiry;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class InquiryVO {
    private Long id;
    private String inquiryStatus;
    private String inquiryEmail;
    private String inquiryPhone;
    private String inquiryType;
}
