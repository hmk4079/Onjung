package com.app.back.domain.report;


import com.app.back.domain.post.PostVO;
import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class ReportDTO {
    private Long id;
    private String reportReason;
    private String reportStatus;
    private Long postId;
    private Long memberId;
    private Long reportedMemberId;
    private String createdDate;
    private String updatedDate;

    private String postTitle;
    private String postContent;

    private String memberNickname;

    private String reporterNickname; // 신고한 사람 닉네임
    private String reportedNickname; // 신고 당한 사람 닉네임


    public ReportVO toVO(){
        return new ReportVO(id,reportReason,reportStatus,postId,memberId,reportedMemberId,createdDate,updatedDate);
    }

}
