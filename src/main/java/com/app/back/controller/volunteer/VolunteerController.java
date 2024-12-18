package com.app.back.controller.volunteer;

import com.app.back.domain.attachment.AttachmentDTO;
import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.support.SupportDTO;
import com.app.back.domain.volunteer.Pagination;
import com.app.back.domain.volunteer.VolunteerDTO;
import com.app.back.domain.vt_application.VtApplicationDTO;
import com.app.back.exception.NotFoundPostException;
import com.app.back.service.attachment.AttachmentService;
import com.app.back.service.post.PostService;
import com.app.back.service.reply.ReplyService;
import com.app.back.service.volunteer.VolunteerService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private ReplyService replyService;

    @GetMapping("volunteer-write")
    public String goToWriteForm(HttpSession session, VolunteerDTO volunteerDTO, Model model) {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        boolean isLoggedIn = (loginMember != null);
        model.addAttribute("isLogin", isLoggedIn);
        if (isLoggedIn) {
            model.addAttribute("member", loginMember);
        }
        return "volunteer/volunteer-write";

    }

    @PostMapping("volunteer-write")
    public RedirectView volunteerWrite(VolunteerDTO volunteerDTO, @RequestParam("uuid") List<String> uuids, @RequestParam("realName") List<String> realNames, @RequestParam("path") List<String> paths, @RequestParam("size") List<String> sizes, @RequestParam("file") List<MultipartFile> files, HttpSession session) throws IOException {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        volunteerDTO.setMemberId(loginMember.getId());
        volunteerDTO.setPostType("VOLUNTEER");
        volunteerDTO.setPostStatus("VISIBLE");
        volunteerService.write(volunteerDTO, uuids, realNames, paths, sizes, files);

        return new RedirectView("/volunteer/volunteer-list");
    }



    //        봉사 모집 게시글 목록
    @GetMapping("volunteer-list")
    public String getList(
            HttpSession session,
            Pagination pagination,
             Model model,
            @RequestParam(value = "order", defaultValue = "recent") String order) {

        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        boolean isLoggedIn = (loginMember != null);
        model.addAttribute("isLogin", isLoggedIn);

        if (isLoggedIn) {
            model.addAttribute("member", loginMember);
            model.addAttribute("memberType", loginMember.getMemberType());
        } else {
            model.addAttribute("memberType", "GUEST");
        }
    // Pagination 설정
        pagination.setOrder(order);
        pagination.setPostType("VOLUNTEER");
        pagination.setPostStatus("VISIBLE");  // 필수 조건 설정
        // 로그 추가: getTotal 호출 전 Pagination 상태 확인
        log.info("getTotal 호출 전 Pagination 상태: {}", pagination);

        pagination.setTotal(volunteerService.getTotal(pagination));

        // 로그 추가: getTotal 호출 후 total 값 확인
        log.info("getTotal 호출 후 total 값: {}", pagination.getTotal());

        pagination.progress();

        // 데이터 가져오기
        List<VolunteerDTO> volunteers = volunteerService.getList(pagination);
        model.addAttribute("volunteers", volunteers);
        model.addAttribute("pagination", pagination);
        log.info("supports 데이터 확인: {}", volunteers);
        log.info("Pagination 상태: {}", pagination);
        log.info("getTotal 결과: {}", pagination.getTotal());

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
        pagination.setPostStatus("VISIBLE"); // VISIBLE 상태 추가
        pagination.setPage(page);

        // 로그 추가: Pagination 상태 확인
        log.info("support-info 호출 전 Pagination 상태: {}", pagination);

        pagination.setTotal(volunteerService.getTotal(pagination));

        // 로그 추가: total 값 확인
        log.info("support-info 호출 후 total 값: {}", pagination.getTotal());

        pagination.progress();

        log.info("받은 order: {}, 받은 page: {}", order, page);
        log.info("Pagination 상태: {}", pagination);
        List<VolunteerDTO> volunteers = volunteerService.getList(pagination);
        log.info("서버에서 반환할 volunteers 데이터 크기: {}", volunteers.size());


        Map<String, Object> response = new HashMap<>();
        response.put("volunteers", volunteers);
        response.put("pagination", pagination);

        return ResponseEntity.ok(response);
    }

    @GetMapping("volunteer-inquiry/{postId}")
    public String goToVolunteerPath(
            HttpSession session,
            @PathVariable("postId") Long postId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            Model model
    ) {
        // 로그인 상태 확인
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        boolean isLoggedIn = (loginMember != null);
        model.addAttribute("isLogin", isLoggedIn);

        if (isLoggedIn) {
            model.addAttribute("member", loginMember);
        }

        // VolunteerDTO 가져오기
        VolunteerDTO volunteerDTO = volunteerService.getPostById(postId)
                .orElseThrow(() -> new NotFoundPostException("Volunteer with ID " + postId + " not found"));

        // 조회한 VolunteerDTO의 vtId를 세션에 저장
        session.setAttribute("vtId", volunteerDTO.getId()); // Volunteer의 ID(vtId)를 저장

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
        log.info("Volunteer added to Model: {}", volunteerDTO);

        // Pagination 객체 생성 및 설정
        Pagination pagination = new Pagination();
        pagination.setPage(page);

        // ReplyListDTO 가져오기
//        ReplyListDTO replyList = replyService.getListByPostId(postId, pagination);

        // 모델에 데이터 추가
        model.addAttribute("volunteer", volunteerDTO);
        model.addAttribute("attachments", attachmentService.getList(postId));
        model.addAttribute("isAuthor", isAuthor);
        model.addAttribute("postId", postId); // postId 추가
//        model.addAttribute("comments", replyList.getReplies()); // 댓글 목록 추가
//        model.addAttribute("pagination", replyList.getPagination()); // 페이징 정보 추가

        return "volunteer/volunteer-inquiry";
    }

    //    지원하기
    @PostMapping("/apply")
    public String applyForVolunteer(HttpSession session, RedirectAttributes redirectAttributes) {
        // 세션에서 로그인 사용자 정보와 vtId 가져오기
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        Long vtId = (Long) session.getAttribute("vtId"); // vtId를 세션에서 가져옴

        if (loginMember == null || vtId == null) {
            // 로그인 필요 또는 모집 정보 없음
            return "redirect:/member/login"; // 로그인 페이지로 리다이렉트하거나 에러 페이지로 이동
        }

        // VtApplicationDTO 생성
        VtApplicationDTO applicationDTO = new VtApplicationDTO();
        applicationDTO.setVtId(vtId); // 세션에서 가져온 vtId 설정
        applicationDTO.setMemberId(loginMember.getId());
        applicationDTO.setApplicationStatus("WAITING");
        applicationDTO.setCreatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        // 서비스 호출
        try {
            volunteerService.applyForVolunteer(vtId, applicationDTO);
            // 성공 시 마이페이지로 리다이렉트
            return "redirect:/mypage/mypage"; // 마이페이지 경로로 수정
        } catch (Exception e) {
            log.error("지원 중 오류 발생: {}", e.getMessage());
            // 에러 메시지를 FlashAttribute로 추가하여 리다이렉트 시 전달
            redirectAttributes.addFlashAttribute("errorMessage", "지원 중 오류가 발생했습니다.");
            // 현재 페이지로 리다이렉트
            return "redirect:/volunteer-inquiry/" + vtId;
        }
    }

    @GetMapping("volunteer-update")
    public String goToUpdateForm(@RequestParam("postId") Long postId, HttpSession session , Model model) {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        boolean isLoggedIn = (loginMember != null);
        model.addAttribute("isLogin", isLoggedIn);
        if (isLoggedIn) {
            model.addAttribute("member", loginMember);
        }
        Optional<VolunteerDTO> volunteerDTO = volunteerService.getPostById(postId);

        if (volunteerDTO.isPresent()) {
            model.addAttribute("volunteer", volunteerDTO.get());
            model.addAttribute("attachments", attachmentService.getList(postId));
        } else {
            return "redirect:/volunteer/volunteer-inquiry/" + postId;
        }
        return "volunteer/volunteer-update";
    }

    @PostMapping("volunteer-update")
    public RedirectView volunteerUpdate( VolunteerDTO volunteerDTO, @RequestParam("postId") Long postId, @RequestParam("uuid") List<String> uuids, @RequestParam("realName") List<String> realNames, @RequestParam("path") List<String> paths, @RequestParam("size") List<String> sizes, @RequestParam("file") List<MultipartFile> files, @RequestParam("id") List<Long> ids) throws IOException {

        volunteerDTO.setId(postId);
        volunteerDTO.setPostId(postId);

        volunteerService.update(volunteerDTO, uuids, realNames, paths, sizes, files, ids);

        return new RedirectView("/volunteer/volunteer-inquiry/" + postId);

    }

    @GetMapping("volunteer-delete")
    public RedirectView volunteerDelete(@RequestParam("postId") Long postId, Long id) {
        volunteerService.delete(postId);
        postService.delete(id);
        return new RedirectView("/volunteer/volunteer-list");
    }

//    첨부파일 부분
    @PostMapping("upload")
    @ResponseBody
    public AttachmentDTO upload(@RequestParam("file")List<MultipartFile> files) throws IOException {

        String rootPath = "C:/upload/" + getPath();
        log.info("{}",files.size());

        AttachmentDTO attachmentDTO = new AttachmentDTO();
        UUID uuid = UUID.randomUUID();

        attachmentDTO.setAttachmentFilePath(getPath());

        File directory = new File(rootPath);
        if(!directory.exists()){
            directory.mkdirs();
        }

        for(int i=0; i<files.size(); i++){
            files.get(i).transferTo(new File(rootPath, uuid.toString() + "_" + files.get(i).getOriginalFilename()));
            attachmentDTO.setAttachmentFileName(uuid.toString() + "_" + files.get(i).getOriginalFilename());
            attachmentDTO.setAttachmentFileSize(String.valueOf(files.get(i).getSize()));

            if(files.get(i).getContentType().startsWith("image")){
                FileOutputStream fileOutputStream = new FileOutputStream(new File(rootPath, "t_" + uuid.toString() + "_" + files.get(i).getOriginalFilename()));
                Thumbnailator.createThumbnail(files.get(i).getInputStream(), fileOutputStream, 100, 100);
                fileOutputStream.close();
            }
        }

        return attachmentDTO;
    }

    private String getPath(){
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
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
        headers.add("Content-Disposition", "attchment; filename=" + new String(("온정_" + fileName.substring(fileName.indexOf("_") + 1)).getBytes("UTF-8"), "ISO-8859-1"));
        return new ResponseEntity<Resource>(resource, headers, HttpStatus.OK);
    }
}



