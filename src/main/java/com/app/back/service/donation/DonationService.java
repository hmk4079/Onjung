package com.app.back.service.donation;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.donation.DonationVO;
import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.support.SupportDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface DonationService {
    public void write(DonationDTO donationDTO, List<String> uuids, List<String> realNames, List<String> paths, List<String> sizes, List<MultipartFile> files) throws IOException;;
    public Optional<DonationDTO> getById(Long id);
    public List<DonationDTO> getList(Pagination pagination);
    public List<DonationDTO> getFilterList(Pagination pagination);
    public int getTotal();
    public void update(DonationDTO donationDTO, List<String> uuids, List<String> realNames, List<String> paths, List<String> sizes, List<MultipartFile> files, List<Long> ids) throws IOException;
    public void updateCurrentPointAndCheckGoal(DonationDTO donationDTO);

    public void delete(Long id);

    public List<DonationDTO> findByMemberId(Long memberId); // 반환 타입 수정
    public List<DonationDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate);
}
