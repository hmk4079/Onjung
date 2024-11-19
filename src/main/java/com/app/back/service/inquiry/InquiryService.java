package com.app.back.service.inquiry;

import com.app.back.domain.attachment.AttachmentVO;
import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.inquiry.InquiryVO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.Search;

import java.util.List;
import java.util.Optional;

public interface InquiryService {
    //    작성
    public void write(InquiryDTO inquiryDTO);
    //    목록
    public List<InquiryDTO> getList(Pagination pagination, Search search);
    //    필터 목록
    public List<InquiryDTO> getFilterList(Pagination pagination, Search search,String filterType);
    //    조회
    public Optional<InquiryDTO> getPost(Long id);
    //    수정
    public void update(InquiryDTO inquiryDTO);

    // 문의 상태 업데이트 메소드
    public  void updateInquiryStatus(Long id, String status);
    //    삭제
    public void delete(Long id);
    //    전체 게시물 수
    public int getTotal();
    //    검색 조건에 맞는 게시물 수
    public int getTotalWithSearch(Search search);
//    필터 개수 수
    public int getTotalWithFilter(Search search,String filterType);

    public List<InquiryDTO> findByMemberId(Long memberId);
    public List<InquiryDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate);


}
