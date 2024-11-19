package com.app.back.domain.report;


import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class ReportVO {
    private Long id;
    private String reportReason;
    private String reportStatus;
    private Long postId;
    private Long memberId;
    private Long reportedMemberId;
    private String createdDate;
    private String updatedDate;
}
