package com.app.back.repository.support;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.support.SupportDTO;
import com.app.back.domain.support.SupportVO;
import com.app.back.domain.support.Pagination;
import com.app.back.mapper.support.SupportMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class SupportDAO {
    private final SupportMapper supportMapper;
    private final SupportDTO supportDTO;

    public List<SupportDTO> findTop10() {
        return supportMapper.selectTop10Supports();
    }

    //    봉사활동모집 작성
    public void save(SupportVO supportVO) {
        supportMapper.insert(supportVO);
    }

    // 후원 정보 조회
    public SupportDTO findSupportById(Long id) {
        SupportDTO supportDTO = new SupportDTO();
        supportDTO.setId(id);
        return supportMapper.findSupportById(supportDTO);
    }

    //    게시글 전체 조회(목록 가져오기<최신순, 조회수 순, 마감 임박 순>)
    public List<SupportDTO> getList(Pagination pagination) {
        return supportMapper.selectList(pagination);
    }

    //    게시글 전체 개수 조회
    public int getTotal(Pagination pagination) {
        return supportMapper.selectTotal(pagination.getPostType(), pagination.getPostStatus());
    }

    //    게시글 조회
    public Optional<SupportDTO> findById(Long id) {
        return supportMapper.selectById(id);
    }

    // ID로 프로젝트 포스트 수정
    public void update(SupportVO supportVO) {
        supportMapper.updateSupport(supportVO);
    }

    // ID로 프로젝트 포스트 삭제
    public void delete(Long id) {
        supportMapper.deleteById(id);
    }

    //   세션에서 MemberId찾기
    public List<SupportDTO> findMemberId(Long memberId) {
        return supportMapper.selectByMemberId(memberId);
    }

    //    게시글 조회수 증가
    public void updatePostReadCount(Long id){
        supportMapper.updatePostReadCount(id);
    }

    public List<SupportDTO> findByMemberId(Long memberId) {
        return supportMapper.selectByMemberId(memberId);
    }
    public List<SupportDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return supportMapper.selectByMemberIdAndDateRange(memberId, startDate, endDate);
    }

    // 후원 금액 업데이트
    public void updateCurrentPoint(SupportDTO supportDTO) {
        supportMapper.updateCurrentPoint(supportDTO);
    }
}
