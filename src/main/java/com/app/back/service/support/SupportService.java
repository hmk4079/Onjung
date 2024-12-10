package com.app.back.service.support;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.support.SupportDTO;
import com.app.back.domain.support.Pagination;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface SupportService {

    public List<SupportDTO> getLatest10Supports();

    //    봉사모집 작성
    void write(SupportDTO supportDTO, List<String> uuids, List<String> realNames, List<String> paths, List<String> sizes, List<MultipartFile> files) throws IOException;;
    //    봉사모집 목록
    List<SupportDTO> getList(Pagination pagination);
    //    게시글 전체 개수 조회
    int getTotal(Pagination pagination);
    //    개시글 조회
    public Optional<SupportDTO> getPostById(Long id);
    //    게시글 수정
    void update(SupportDTO supportDTO, List<String> uuids, List<String> realNames, List<String> paths, List<String> sizes, List<MultipartFile> files, List<Long> ids) throws IOException;
    //    게시글 삭제
    public void delete(Long id);

    public List<SupportDTO> findByMemberId(Long memberId); // 반환 타입 수정
    public List<SupportDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate);

    //    멤버ID가져오기
    public List<SupportDTO> getMemberId(Long memberId);

//    후원포인트 증가 및 목표 포인트체크
    public void updateCurrentPointAndCheckGoal(SupportDTO supportDTO);

    // 현재 포인트 업데이트 메서드
    public void updateCurrentPoint(SupportDTO supportDTO);

    // 후원 정보 조회 메서드
    SupportDTO getSupportById(Long id);
}
