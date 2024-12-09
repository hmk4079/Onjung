package com.app.back.controller.support;

import com.app.back.domain.attachment.AttachmentDTO;
import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.support.SupportDTO;
import com.app.back.domain.support.Pagination;
import com.app.back.domain.vt_application.VtApplicationDTO;
import com.app.back.exception.NotFoundPostException;
import com.app.back.service.attachment.AttachmentService;
import com.app.back.service.post.PostService;
import com.app.back.service.support.SupportService;
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

@Controller
@RequestMapping("/support/*")
@RequiredArgsConstructor
@Slf4j
public class SupportController {
        private final SupportService supportService;
        private final PostService postService;
        private final AttachmentService attachmentService;
    private final SupportDTO supportDTO;

    @GetMapping("/lastest-support")
    @ResponseBody
    public List<SupportDTO> getLatestReviews() {
        log.info("최신 후원게시판 10개 조회 요청");
        return supportService.getLatest10Supports();
    }

    @GetMapping("support-write")
    public String goToWriteForm(HttpSession session, SupportDTO supportDTO, Model model) {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        boolean isLoggedIn = (loginMember != null);
        model.addAttribute("isLogin", isLoggedIn);
        if (isLoggedIn) {
            model.addAttribute("member", loginMember);
        }
        return "support/support-write";

    }

    @PostMapping("support-write")
    public RedirectView supportWrite(SupportDTO supportDTO, @RequestParam("uuid") List<String> uuids, @RequestParam("realName") List<String> realNames, @RequestParam("path") List<String> paths, @RequestParam("size") List<String> sizes, @RequestParam("file") List<MultipartFile> files, HttpSession session) throws IOException {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        supportDTO.setMemberId(loginMember.getId());
        supportDTO.setPostType("SUPPORT");
        supportService.write(supportDTO, uuids, realNames, paths, sizes, files);

        return new RedirectView("/support/support-list");
    }



    //        봉사 모집 게시글 목록
    @GetMapping("support-list")
    public String getList(HttpSession session, Pagination pagination, Model model,
                          @RequestParam(value = "order", defaultValue = "recent") String order) {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        boolean isLoggedIn = (loginMember != null);
        model.addAttribute("isLogin", isLoggedIn);
        if (isLoggedIn) {
            model.addAttribute("member", loginMember);
        }

        // loginMember가 null인지 확인하고 memberType을 가져옵니다.
        if (loginMember != null) {
            String memberType = loginMember.getMemberType();
            model.addAttribute("memberType", memberType);
        } else {
            // 로그인되지 않은 경우 또는 loginMember가 null인 경우
            model.addAttribute("memberType", "GUEST");
        }

        pagination.setOrder(order);
        pagination.setPostType("SUPPORT");
        pagination.setTotal(postService.getTotal(pagination.getPostType()));
        pagination.progress();

        log.info("페이지네이션 설정 - page: {}, startRow: {}, rowCount: {}",
                pagination.getPage(), pagination.getStartRow(), pagination.getRowCount());

        List<SupportDTO> supports = supportService.getList(pagination);
        log.info("현재 받은 데이터 갯수: {}", supports.size());

        log.info("Progress 메서드 실행 후 Pagination 상태: {}", pagination);

        log.info("Total from getTotal: {}", postService.getTotal("SUPPORT"));
        log.info("List size from getList: {}", supportService.getList(pagination).size());
        log.info("전달받은 멤버, 프로필:{},{}",supportDTO.getProfileFileName(),supportDTO.getMemberId());


        supports.forEach(support -> {
            log.info("Controller 전달받은 Profile File Name: {}", support.getProfileFileName());
            log.info("Controller 전달받은 Member ID: {}", support.getMemberId());
        });

        model.addAttribute("support", supports);
        return "support/support-list";
    }

    // 봉사모집 게시판 json형태
    @GetMapping("support-info")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getListInfo(
            @RequestParam(value = "order", defaultValue = "recent") String order,
            @RequestParam(value = "page", defaultValue = "1") int page) {
        log.info("받은 page 파라미터: {}", page);
        log.info("받은 order 파라미터: {}", order);

        Pagination pagination = new Pagination();
        pagination.setOrder(order);
        pagination.setPostType("SUPPORT");
        pagination.setPage(page);
        pagination.setTotal(postService.getTotal(pagination.getPostType()));
        pagination.progress();
        log.info("Pagination 객체: {}", pagination);

        List<SupportDTO> supportList = supportService.getList(pagination);
        for (SupportDTO support : supportList) {
            support.calculateDaysLeft();
            support.setPostType(support.getPostType());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("lists", supportList);
        response.put("pagination", pagination);

        return ResponseEntity.ok(response);
    }

    @GetMapping("support-inquiry/{postId}")
    public String goToSupportPath(
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

        // SupportDTO 가져오기
        SupportDTO supportDTO = supportService.getPostById(postId)
                .orElseThrow(() -> new NotFoundPostException("Support with ID " + postId + " not found"));

        // 조회한 SupportDTO의 supportId를 세션에 저장
        session.setAttribute("supportId", supportDTO.getId()); // Support의 ID(vtId)를 저장

        // 로그인한 사용자의 ID 가져오기
        Long userId = loginMember != null ? loginMember.getId() : null;
        // 작성자 ID 가져오기
        Long authorId = supportDTO.getMemberId();
        // 사용자와 작성자 일치 여부 확인
        boolean isAuthor = userId != null && userId.equals(authorId);

        // 디버깅 로그 출력
        log.info("Logged-in userId: {}", userId);
        log.info("Author's memberId: {}", authorId);
        log.info("isAuthor: {}", isAuthor);
        log.info("Support added to Model: {}", supportDTO);

        // Pagination 객체 생성 및 설정
        Pagination pagination = new Pagination();
        pagination.setPage(page);


        // 모델에 데이터 추가
        model.addAttribute("support", supportDTO);
        model.addAttribute("attachments", attachmentService.getList(postId));
        model.addAttribute("isAuthor", isAuthor);
        model.addAttribute("postId", postId); // postId 추가

        return "support/support-inquiry";
    }

    @GetMapping("support-update")
    public String goToUpdateForm(@RequestParam("postId") Long postId, HttpSession session , Model model) {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        boolean isLoggedIn = (loginMember != null);
        model.addAttribute("isLogin", isLoggedIn);
        if (isLoggedIn) {
            model.addAttribute("member", loginMember);
        }
        Optional<SupportDTO> supportDTO = supportService.getPostById(postId);

        if (supportDTO.isPresent()) {
            model.addAttribute("support", supportDTO.get());
            model.addAttribute("attachments", attachmentService.getList(postId));
        } else {
            return "redirect:/support/support-inquiry/" + postId;
        }
        return "support/support-update";
    }

    @PostMapping("support-update")
    public RedirectView supportUpdate( SupportDTO supportDTO, @RequestParam("postId") Long postId, @RequestParam("uuid") List<String> uuids, @RequestParam("realName") List<String> realNames, @RequestParam("path") List<String> paths, @RequestParam("size") List<String> sizes, @RequestParam("file") List<MultipartFile> files, @RequestParam("id") List<Long> ids) throws IOException {

        supportDTO.setId(postId);
        supportDTO.setPostId(postId);

        supportService.update(supportDTO, uuids, realNames, paths, sizes, files, ids);

        return new RedirectView("/support/support-inquiry/" + postId);

    }

    @GetMapping("support-delete")
    public RedirectView reviewDelete(@RequestParam("postId") Long postId) {
        supportService.delete(postId);
        return new RedirectView("/support/support-list");
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
