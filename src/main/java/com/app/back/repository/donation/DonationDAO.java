package com.app.back.repository.donation;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.donation.DonationVO;
import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.support.SupportDTO;
import com.app.back.mapper.donation.DonationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class DonationDAO {
    private final DonationMapper donationMapper;
    private final DonationDTO donationDTO;

    public void save(DonationVO donationVO) {donationMapper.insert(donationVO);}

    public Optional<DonationDTO> findById(Long id) {return donationMapper.selectById(id);}
    //    전체 조회
    public List<DonationDTO> findAll(Pagination pagination) {
        return donationMapper.selectAll(pagination);
    }

    public List<DonationDTO> findFilterAll(Pagination pagination) {
        return donationMapper.selectFilterAll(pagination);
    }
    //    전체 개수
    public int findCount(){
        return donationMapper.selectCount();
    }

    // ID로 프로젝트 포스트 수정
    public void update(DonationVO donationVO) {
        donationMapper.update(donationVO);
    }

    public void updateCurrentPoint(DonationDTO donationDTO) {
        donationMapper.updateCurrentPoint(donationDTO);
    }

    // ID로 프로젝트 포스트 삭제
    public void delete(Long id) {
        donationMapper.deleteById(id);
    }

    public List<DonationDTO> findByMemberId(Long memberId) { // 반환 타입 수정
        return donationMapper.selectByMemberId(memberId);
    }
    public List<DonationDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return donationMapper.selectByMemberIdAndDateRange(memberId, startDate, endDate);
    }
}
