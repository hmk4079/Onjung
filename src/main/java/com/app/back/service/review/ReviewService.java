package com.app.back.service.review;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.review.ReviewVO;
import com.app.back.domain.support_record.SupportRecordDTO;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ReviewService {
    @Async
    public void write(ReviewDTO reviewDTO, List<String> uuids, List<String> realNames, List<String> paths, List<String> sizes, List<MultipartFile> files) throws IOException;
    public Optional<ReviewDTO> getById(Long id);
    public List<ReviewDTO> getList(Pagination pagination);
    public int getTotal();
    public void update(ReviewDTO reviewDTO);
    public void delete(Long id);
    public List<ReviewDTO> findByMemberId(Long memberId);
    public List<ReviewDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate);

    public List<ReviewDTO> getLatest10Reviews();


}


