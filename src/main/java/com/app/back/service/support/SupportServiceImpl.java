package com.app.back.service.support;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.support.SupportDTO;
import com.app.back.domain.support.Pagination;
import com.app.back.exception.NotFoundPostException;
import com.app.back.repository.alarm.AlarmDAO;
import com.app.back.repository.attachment.AttachmentDAO;
import com.app.back.repository.post.PostDAO;
import com.app.back.repository.support.SupportDAO;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Primary
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class) // 예외 발생 시 롤백 처리
public class SupportServiceImpl implements SupportService {
    private final SupportDAO supportDAO;
    private final AlarmDAO alarmDAO;
    private final PostDAO postDAO;
    private final AttachmentDAO attachmentDAO;

    @Override
    public List<SupportDTO> getLatest10Supports() {
        return supportDAO.findTop10();
    }

    @Override
    public void updateCurrentPointAndCheckGoal(SupportDTO supportDTO) {
        // current_point 업데이트 로직
        supportDAO.updateCurrentPoint(supportDTO);

        // 목표 금액이 100% 달성되었는지 확인
        if (supportDTO.getCurrentPoint() >= supportDTO.getGoalPoint()) {
            String alarmContent = "후원 목표 금액이 100% 달성되었습니다!";
            alarmDAO.saveSupportAlarm(supportDTO.getMemberId(), supportDTO.getId(), alarmContent);
        }
    }

    @Override
    public void write(SupportDTO supportDTO, List<String> uuids, List<String> realNames, List<String> paths, List<String> sizes, List<MultipartFile> files) throws IOException {
        postDAO.save(supportDTO.toPostVO());
        Long id = postDAO.selectCurrentId();
        supportDTO.setId(id);
        supportDTO.setPostId(id);
        supportDAO.save(supportDTO.toVO());

        if(files != null) {
            for(int i=0; i<files.size(); i++){
                supportDTO.setAttachmentFileName(uuids.get(i) + "_" + files.get(i).getOriginalFilename());
                supportDTO.setAttachmentFileRealName(realNames.get(i));
                supportDTO.setAttachmentFilePath(paths.get(i));
                supportDTO.setAttachmentFileSize(String.valueOf(sizes.get(i)));
                supportDTO.setAttachmentFileType(files.get(i).getContentType());
                attachmentDAO.save(supportDTO.toAttachmentVO());
            }
        }
    }

    @Override
    public List<SupportDTO> getList(Pagination pagination) {
        return supportDAO.findAll(pagination); // 페이징된 Q&A 게시글 목록 조회
    }

    @Override
    public int getTotal() {
        return supportDAO.findCount();
    }

    @Override
    public Optional<SupportDTO> getPostById(Long id) {
        supportDAO.updatePostReadCount(id);

        return supportDAO.findById(id);
    }

    @Override
    public List<SupportDTO> getMemberId(Long memberId){
        return supportDAO.findMemberId(memberId);}

    @Override
    public void update(SupportDTO supportDTO, List<String> uuids, List<String> realNames, List<String> paths, List<String> sizes, List<MultipartFile> files, List<Long> ids) throws IOException {
        postDAO.update(supportDTO.toPostVO());
        supportDAO.update(supportDTO.toVO());

        if(files != null && uuids.size() > 0) {
            for(int i=0; i<files.size(); i++){
                supportDTO.setAttachmentFileName(uuids.get(i+1) + "_" + files.get(i).getOriginalFilename());
                supportDTO.setAttachmentFileRealName(realNames.get(i+1));
                supportDTO.setAttachmentFilePath(paths.get(i+1));
                supportDTO.setAttachmentFileSize(String.valueOf(sizes.get(i+1)));
                supportDTO.setAttachmentFileType(files.get(i).getContentType());
                attachmentDAO.save(supportDTO.toAttachmentVO());
            }
        }
        if(ids != null) {
            for(int i=0; i<ids.size(); i++){
                attachmentDAO.delete(ids.get(i));
            }
        }
    }

    @Override
    public void delete(Long id) {
        try {
            supportDAO.delete(id);
            log.info("Support with ID {} has been deleted.", id);
        } catch (Exception e) {
            log.error("Error deleting Support with ID {}: {}", id, e.getMessage());
            throw e; // 필요에 따라 커스텀 예외로 변경할 수 있습니다.
        }
    }

    @Override
    public List<SupportDTO> findByMemberId(Long memberId) {
        if (memberId != null){
            log.info("세션에서 가져오는 memberID: {}", memberId);
            return supportDAO.findByMemberId(memberId);
        } else {
            log.warn("세션에서 memberID를 찾지 못하였습니다. 로그인 페이지로 이동합니다.");
            try {
                throw new NotFoundPostException("로그인이 필요합니다.");
            } catch (NotFoundPostException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public List<SupportDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return supportDAO.findByMemberIdAndDateRange(memberId, startDate, endDate);
    }


}
