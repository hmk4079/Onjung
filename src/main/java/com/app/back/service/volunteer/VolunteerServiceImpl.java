package com.app.back.service.volunteer;


import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.exception.GlobalExceptionHandler;
import com.app.back.exception.UserNotAuthenticatedException;
import com.app.back.repository.attachment.AttachmentDAO;
import com.app.back.repository.member.MemberDAO;
import com.app.back.repository.post.PostDAO;
import com.app.back.repository.volunteer.VolunteerDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service // 이 클래스가 서비스임을 나타냄
@Primary // 우선 순위가 높은 서비스
@RequiredArgsConstructor // 생성자 자동 생성
@Transactional(rollbackFor = Exception.class) // 예외 발생 시 롤백 처리
@Slf4j
public class VolunteerServiceImpl implements VolunteerService {
    private final VolunteerDAO volunteerDAO;
    private final PostDAO postDAO;
    private final AttachmentDAO attachmentDAO;
    private final MemberDAO memberDAO;


    @Override
    public void write(VolunteerDTO volunteerDTO, List<String> uuids, List<String> realNames, List<String> paths, List<String> sizes, List<MultipartFile> files) throws IOException {
        postDAO.save(volunteerDTO.toPostVO());
        Long id = postDAO.selectCurrentId();
        volunteerDTO.setId(id);
        volunteerDTO.setPostId(id);
        volunteerDAO.save(volunteerDTO.toVO());

        if(files != null) {
            for(int i=0; i<files.size(); i++){
                volunteerDTO.setAttachmentFileName(uuids.get(i) + "_" + files.get(i).getOriginalFilename());
                volunteerDTO.setAttachmentFileRealName(realNames.get(i));
                volunteerDTO.setAttachmentFilePath(paths.get(i));
                volunteerDTO.setAttachmentFileSize(String.valueOf(sizes.get(i)));
                volunteerDTO.setAttachmentFileType(files.get(i).getContentType());
                attachmentDAO.save(volunteerDTO.toAttachmentVO());
            }
        }
    }

    @Override
    public List<VolunteerDTO> getList(Pagination pagination) {
        return volunteerDAO.findAll(pagination); // 페이징된 Q&A 게시글 목록 조회
    }

    @Override
    public int getTotal() {
        return volunteerDAO.findCount();
    }

    @Override
    public Optional<VolunteerDTO> getById(Long id) {
//        volunteerDAO.updatePostReadCount(id);
        return volunteerDAO.findById(id);
    }

    @Override
    public List<VolunteerDTO> getMemberId(Long memberId){
        return volunteerDAO.findMemberId(memberId);}

    @Override
    public void update(VolunteerDTO volunteerDTO, List<String> uuids, List<String> realNames, List<String> paths, List<String> sizes, List<MultipartFile> files, List<Long> ids) throws IOException {
        postDAO.update(volunteerDTO.toPostVO());
        volunteerDAO.update(volunteerDTO.toVO());

        if(files != null && uuids.size() > 0) {
            for(int i=0; i<files.size(); i++){
                volunteerDTO.setAttachmentFileName(uuids.get(i+1) + "_" + files.get(i).getOriginalFilename());
                volunteerDTO.setAttachmentFileRealName(realNames.get(i+1));
                volunteerDTO.setAttachmentFilePath(paths.get(i+1));
                volunteerDTO.setAttachmentFileSize(String.valueOf(sizes.get(i+1)));
                volunteerDTO.setAttachmentFileType(files.get(i).getContentType());
                attachmentDAO.save(volunteerDTO.toAttachmentVO());
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
            volunteerDAO.delete(id);
            log.info("Volunteer with ID {} has been deleted.", id);
        } catch (Exception e) {
            log.error("Error deleting Volunteer with ID {}: {}", id, e.getMessage());
            throw e; // 필요에 따라 커스텀 예외로 변경할 수 있습니다.
        }
    }

    @Override
    public List<VolunteerDTO> findByMemberId(Long memberId) {
        if (memberId != null){
            log.info("세션에서 가져오는 memberID: {}", memberId);
            return volunteerDAO.findByMemberId(memberId);
        } else {
            log.warn("세션에서 memberID를 찾지 못하였습니다. 로그인 페이지로 이동합니다.");
            try {
                throw new UserNotAuthenticatedException("로그인이 필요합니다.");
            } catch (UserNotAuthenticatedException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public List<VolunteerDTO> findByMemberIdAndDateRange(Long memberId, String startDate, String endDate) {
        return volunteerDAO.findByMemberIdAndDateRange(memberId, startDate, endDate);
    }

}




