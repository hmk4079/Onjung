package com.app.back.controller.volunteer;

import com.app.back.domain.attachment.AttachmentDTO;
import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.member.MemberDTO;

import com.app.back.domain.member.MemberVO;
import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.exception.NotFoundPostException;
import com.app.back.mapper.volunteer.VolunteerMapper;
import com.app.back.service.attachment.AttachmentService;
import com.app.back.service.member.MemberService;
import com.app.back.service.post.PostService;
import com.app.back.service.volunteer.VolunteerService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.apache.catalina.User;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller // 이 클래스가 컨트롤러임을 나타냄
@RequestMapping("/volunteer/*") // 봉사모집 관련 요청을 처리
@RequiredArgsConstructor // 생성자 자동 생성
@Slf4j // 로깅 기능 추가
public class VolunteerController {
    private final PostService postService;
    private final VolunteerService volunteerService;
    private final AttachmentService attachmentService;
    private final VolunteerDTO volunteerDTO;

    @GetMapping("volunteer-write")
    public String goToWriteForm(VolunteerDTO volunteerDTO){
        return "volunteer/volunteer-write";
    }

    @PostMapping("volunteer-write")
    public RedirectView volunteerWrite(VolunteerDTO volunteerDTO, @RequestParam("uuid") List<String> uuids, @RequestParam("realName") List<String> realNames, @RequestParam("path") List<String> paths, @RequestParam("size") List<String> sizes, @RequestParam("file") List<MultipartFile> files, HttpSession session) throws IOException {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        volunteerDTO.setMemberId(loginMember.getId());
        volunteerDTO.setPostType("VOLUNTEER");
        volunteerService.write(volunteerDTO, uuids, realNames, paths, sizes, files);

        return new RedirectView("/volunteer/volunteer-list");
    }



    //        봉사 모집 게시글 목록
    @GetMapping("volunteer-list")
    public String getList(HttpSession session, Pagination pagination, Model model,
                          @RequestParam(value = "order", defaultValue = "recent") String order) {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");

        // loginMember가 null인지 확인하고 memberType을 가져옵니다.
        if (loginMember != null) {
            String memberType = loginMember.getMemberType();
            model.addAttribute("memberType", memberType);
        } else {
            // 로그인되지 않은 경우 또는 loginMember가 null인 경우
            model.addAttribute("memberType", "GUEST");
        }

        pagination.setOrder(order);
        pagination.setPostType("VOLUNTEER");
        pagination.setTotal(postService.getTotal(pagination.getPostType()));
        pagination.progress();

        log.info("페이지네이션 설정 - page: {}, startRow: {}, rowCount: {}",
                pagination.getPage(), pagination.getStartRow(), pagination.getRowCount());

        List<VolunteerDTO> volunteers = volunteerService.getList(pagination);
        log.info("현재 받은 데이터 갯수: {}", volunteers.size());

        log.info("Progress 메서드 실행 후 Pagination 상태: {}", pagination);

        log.info("Total from getTotal: {}", postService.getTotal("VOLUNTEER"));
        log.info("List size from getList: {}", volunteerService.getList(pagination).size());

        model.addAttribute("volunteers", volunteers);
        return "volunteer/volunteer-list";
    }



    // 봉사모집 게시판 json형태
    @GetMapping("volunteer-info")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getListInfo(
            @RequestParam(value = "order", defaultValue = "recent") String order,
            @RequestParam(value = "page", defaultValue = "1") int page) {
        log.info("받은 page 파라미터: {}", page);
        log.info("받은 order 파라미터: {}", order);

        Pagination pagination = new Pagination();
        pagination.setOrder(order);
        pagination.setPostType("VOLUNTEER");
        pagination.setPage(page);
        pagination.setTotal(postService.getTotal(pagination.getPostType()));
        pagination.progress();
        log.info("Pagination 객체: {}", pagination);

        List<VolunteerDTO> volunteerList = volunteerService.getList(pagination);
        for (VolunteerDTO volunteer : volunteerList) {
            volunteer.calculateDaysLeft();
            volunteer.setPostType(volunteer.getPostType());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("lists", volunteerList);
        response.put("pagination", pagination);

        return ResponseEntity.ok(response);
    }


//    // 경로 변수를 사용하는 방식 (유일한 매핑으로 유지)
//    @GetMapping("volunteer-inquiry/{postId}")
//    public String goToVolunteerPath(HttpSession session, @PathVariable("postId") Long postId, Model model) {
//        // VolunteerDTO 가져오기
//        VolunteerDTO volunteerDTO = volunteerService.getPostById(postId)
//                .orElseThrow(() -> new NotFoundPostException("Volunteer with ID " + postId + " not found"));
//
//        // VolunteerDTO 확인을 위한 로그 출력
//        log.info("Fetched VolunteerDTO: {}", volunteerDTO);
//
//        // 모델에 데이터 추가
//        model.addAttribute("volunteer", volunteerDTO);
//        log.info("Fetched attachments: {}", attachmentService.getList(postId));
//        model.addAttribute("attachments", attachmentService.getList(postId));
//        log.info("가져온첨부파일:{}", attachmentService.getList(postId));
//
//        return "volunteer/volunteer-inquiry";
//    }

//    @GetMapping("volunteer-inquiry/{postId}")
//    public String goToVolunteerPath(HttpSession session, @PathVariable("postId") Long postId, Model model) {
//        // VolunteerDTO 가져오기
//        VolunteerDTO volunteerDTO = volunteerService.getPostById(postId)
//                .orElseThrow(() -> new NotFoundPostException("Volunteer with ID " + postId + " not found"));
//
//        // 세션에서 사용자 ID 가져오기
//        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
//        // 로그인 성공 시
//        log.info("Logged-in memberId: {}", loginMember);
//
//
//        // 작성자 ID 가져오기 (memberId 사용)
//        Long authorId = volunteerDTO.getMemberId();
//
//        // 사용자와 작성자 일치 여부 확인
//        boolean isAuthor = (loginMember != null) && loginMember.equals(authorId);
//        log.info("Author's memberId: {}", authorId);
//        log.info("isAuthor: {}", isAuthor);
//
//        // 모델에 데이터 추가
//        model.addAttribute("volunteer", volunteerDTO);
//        model.addAttribute("attachments", attachmentService.getList(postId));
//        model.addAttribute("isAuthor", isAuthor);
//
//        return "volunteer/volunteer-inquiry";
//    }

    @GetMapping("volunteer-inquiry/{postId}")
    public String goToVolunteerPath(HttpSession session, @PathVariable("postId") Long postId, Model model) {
        // VolunteerDTO 가져오기
        VolunteerDTO volunteerDTO = volunteerService.getPostById(postId)
                .orElseThrow(() -> new NotFoundPostException("Volunteer with ID " + postId + " not found"));

        // 세션에서 MemberDTO 가져오기 (속성 이름 확인)
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");

        // 로그인한 사용자의 ID 가져오기
        Long userId = loginMember != null ? loginMember.getId() : null;

        // 작성자 ID 가져오기
        Long authorId = volunteerDTO.getMemberId();

        // 사용자와 작성자 일치 여부 확인
        boolean isAuthor = userId != null && userId.equals(authorId);

        // 디버깅 로그 출력
        log.info("Logged-in userId: {}", userId);
        log.info("Author's memberId: {}", authorId);
        log.info("isAuthor: {}", isAuthor);

        // 모델에 데이터 추가
        model.addAttribute("volunteer", volunteerDTO);
        model.addAttribute("attachments", attachmentService.getList(postId));
        model.addAttribute("isAuthor", isAuthor);

        return "volunteer/volunteer-inquiry";
    }





    @GetMapping("display")
    @ResponseBody
    public byte[] display(@RequestParam("fileName") String fileName) throws IOException {
        File file = new File("C:/upload", fileName);

        if (!file.exists()) {
            throw new FileNotFoundException("파일을 찾을 수 없습니다: " + fileName);
        }

        return FileCopyUtils.copyToByteArray(file);
    }

    //    REST방식이 아닌 ViewResolver 방식으로 사용해야 한다.
    @GetMapping("download")
    public ResponseEntity<Resource> download(String fileName) throws IOException {
        Resource resource = new FileSystemResource("C:/upload/" + fileName);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attchment; filename=" + new String(("한동석짱_" + fileName.substring(fileName.indexOf("_") + 1)).getBytes("UTF-8"), "ISO-8859-1"));
        return new ResponseEntity<Resource>(resource, headers, HttpStatus.OK);
    }

    @GetMapping("volunteer-update")
    public String goToUpdateForm(@RequestParam("postId") Long postId, Model model) {
        Optional<VolunteerDTO> volunteerDTO = volunteerService.getPostById(postId);

        if (volunteerDTO.isPresent()) {
            model.addAttribute("volunteer", volunteerDTO.get());
            model.addAttribute("attachments", attachmentService.getList(postId));
        } else {
            return "redirect:/volunteer/volunteer-inquiry?postId=" + postId;
        }
        return "volunteer/volunteer-update";
    }

    @PostMapping("donation-update")
    public RedirectView donationUpdate(DonationDTO donationDTO, @RequestParam("postId") Long postId, @RequestParam("uuid") List<String> uuids, @RequestParam("realName") List<String> realNames, @RequestParam("path") List<String> paths, @RequestParam("size") List<String> sizes, @RequestParam("file") List<MultipartFile> files, @RequestParam("id") List<Long> ids) throws IOException {
        donationDTO.setId(postId);
        donationDTO.setPostId(postId);

        volunteerService.update(volunteerDTO, uuids, realNames, paths, sizes, files, ids);

        return new RedirectView("/volunteer/volunteer-inquiry?postId=" + postId);
    }



}



