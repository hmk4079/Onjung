package com.app.back.repository.inquiry;


import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.inquiry.InquiryVO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;
import com.app.back.mapper.inquiry.InquiryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class InquiryDAO {
    private final InquiryMapper inquiryMapper;
    private final InquiryDTO inquiryDTO;

    //    게시글 작성
    public void save(InquiryVO inquiryVO) {
        inquiryMapper.insert(inquiryVO);
    }

    //    게시글 전체 조회
    public List<InquiryDTO> findAll(Pagination pagination, Search search){
        return inquiryMapper.selectAll(pagination, search);
    }
    // 필터된 게시글 조회
    public List<InquiryDTO> findFilterAll(Pagination pagination, Search search, String filterType) {
        return inquiryMapper.selectFilterAll(pagination, search, filterType);
    }
    //    게시글 전체 개수 조회
    public int getTotal(){
        return inquiryMapper.selectTotal();
    }

    //    검색 결과 개수 조회
    public int getTotalWithSearch(Search search){
        return inquiryMapper.selectTotalWithSearch(search);
    }

    //    게시글 조회
    public Optional<InquiryDTO> findById(Long id){
        return inquiryMapper.selectById(id);
    }

    //    수정
    public void update(InquiryVO inquiryVO) {
        inquiryMapper.updateById(inquiryDTO);
    }

    // 상태 업데이트
    public void updateStatus(Long id, String status) {
        inquiryMapper.updateStatus(id, status);
    }
    //    삭제
    public void delete(Long id) {inquiryMapper.deleteById(id);}

    // 필터 조건에 맞는 전체 개수 조회
    public int getTotalWithFilter(Search search, String filterType) {
        return inquiryMapper.selectTotalWithFilter(search, filterType);
    }

    public List<InquiryDTO> findByMemberId(Long memberId) {
        return inquiryMapper.selectByMemberId(memberId);
    }
    public List<InquiryDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return inquiryMapper.selectByMemberIdAndDateRange(memberId, startDate, endDate);
    }

}
