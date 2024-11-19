package com.app.back.repository.review;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.review.ReviewVO;
import com.app.back.mapper.review.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
@Repository
@RequiredArgsConstructor
public class ReviewDAO {
    private final ReviewMapper reviewMapper;

    public void save(ReviewVO reviewVO) {reviewMapper.insert(reviewVO);}

    public Optional<ReviewDTO> findById(Long id) {return reviewMapper.selectById(id);}
    //    전체 조회
    public List<ReviewDTO> findAll(Pagination pagination) {
        return reviewMapper.selectAll(pagination);
    }
    //    전체 개수
    public int findCount(){
        return reviewMapper.selectCount();
    }

    // ID로 프로젝트 포스트 수정
    public void update(ReviewDTO reviewDTO) {
        reviewMapper.update(reviewDTO);
    }

    // ID로 프로젝트 포스트 삭제
    public void delete(Long id) {
        reviewMapper.deleteById(id);
    }

    public List<ReviewDTO> findByMemberId(Long memberId) {
        return reviewMapper.selectByMemberId(memberId);
    }
    public List<ReviewDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return reviewMapper.selectByMemberIdAndDateRange(memberId, startDate, endDate);
    }

    public List<ReviewDTO> findTop10() {
        return reviewMapper.selectTop10Reviews();
    }
}
