package com.app.back.repository.volunteer;


import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.domain.volunteer.VolunteerVO;
import com.app.back.mapper.volunteer.VolunteerMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class VolunteerDAO {
    private final VolunteerMapper volunteerMapper;
    private final VolunteerVO volunteerVO;

    //    봉사활동모집 작성
    public void save(VolunteerVO volunteerVO) {
        volunteerMapper.insert(volunteerVO);
    }

    //    게시글 전체 개수 조회(목록 가져오기<최신순, 조회수 순, 마감 임박 순>)
    public List<VolunteerDTO> findAll(Pagination pagination) {
        return volunteerMapper.selectAll(pagination);
    }

    //    게시글 전체 개수 조회
    public int findCount() {
        return volunteerMapper.selectTotal();
    }

    //    게시글 조회
    public Optional<VolunteerDTO> findById(Long id) {
        return volunteerMapper.selectById(id);
    }

    // ID로 프로젝트 포스트 수정
    public void update(VolunteerVO volunteerVO) {
        volunteerMapper.update(volunteerVO);
    }

    // ID로 프로젝트 포스트 삭제
    public void delete(Long id) {
        volunteerMapper.deleteById(id);
    }

    //   세션에서 MemberId찾기
    public List<VolunteerDTO> findMemberId(Long memberId) {
        return volunteerMapper.selectByMemberId(memberId);
    }

    //    게시글 조회수 증가
//    public void updatePostReadCount(Long id){
//        volunteerMapper.updatePostReadCount(id);
//    }

    public List<VolunteerDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return volunteerMapper.selectByMemberIdAndDateRange(memberId, startDate, endDate);
    }

    public List<VolunteerDTO> findByMemberId(Long memberId) {
        return volunteerMapper.selectByMemberId(memberId);
    }
}
