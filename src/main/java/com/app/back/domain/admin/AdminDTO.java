package com.app.back.domain.admin;

import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.notice.NoticeDTO;
import com.app.back.domain.post.PostDTO;
import com.app.back.domain.report.ReportDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.review.ReviewDTO;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class AdminDTO {
    private List<InquiryDTO> inquiries;
    private List<NoticeDTO> notices;
    private List<PostDTO> posts;
    private List<ReportDTO> reports;
    private Pagination pagination;
    private boolean success;
    private String message;
    private NoticeDTO notice;
    private PostDTO post;
    private List<Long> selectedIds;
    private ReviewDTO review;

}
