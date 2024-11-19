package com.app.back.controller.donation;

import com.app.back.domain.donation.DonationDTO;
import com.app.back.domain.donation.DonationListDTO;
import com.app.back.domain.donation.DonationVO;
import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.review.ReviewDTO;
import com.app.back.service.attachment.AttachmentService;
import com.app.back.service.donation.DonationService;
import com.app.back.service.post.PostService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Controller
@RequestMapping("/donation/*")
@RequiredArgsConstructor
@Slf4j
public class DonationController {
    private final DonationService donationService;
    private final PostService postService;
    private final AttachmentService attachmentService;
    private final HttpSession session;

    @GetMapping("donation-write")
    public String goToWriteForm(HttpSession session, Model model) {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        if (loginMember != null) {
            model.addAttribute("member", loginMember);
        } else {
            return "redirect:/member/login";
        }

        return "donation/donation-write";
    }

    @PostMapping("donation-write")
    public RedirectView donationWrite(DonationDTO donationDTO, @RequestParam("uuid") List<String> uuids, @RequestParam("realName") List<String> realNames, @RequestParam("path") List<String> paths, @RequestParam("size") List<String> sizes, @RequestParam("file") List<MultipartFile> files, HttpSession session) throws IOException {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        donationDTO.setMemberId(loginMember.getId());
        donationDTO.setPostType("DONATION");

        if (donationDTO.getPostTitle() == null || donationDTO.getPostContent() == null) {
            log.error("필수 데이터가 없습니다.");
            return new RedirectView("/donation/donation-write");
        }

//        데이터가 문제없으면 세션에 저장
//        session.setAttribute("donation", donationDTO);

        donationService.write(donationDTO, uuids, realNames, paths, sizes, files);

        return new RedirectView("/donation/donation-list");
    }

    private String getPath() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }

    @GetMapping("donation-list")
    public String goToList(Pagination pagination, Model model) {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        boolean isLoggedIn = (loginMember != null);

        model.addAttribute("isLogin", isLoggedIn);
        if (isLoggedIn) {
            model.addAttribute("member", loginMember);
        }

        pagination.setOrder("최신등록순");
        pagination.setTotal(postService.getTotal("DONATION"));
        log.info("총 도네이션 수: {}", pagination.getTotal());
        pagination.progressReview();
        model.addAttribute("pagination", pagination);
        model.addAttribute("donations", donationService.getList(pagination));

        return "donation/donation-list";
    }

    @GetMapping("donation-list-filter")
    @ResponseBody
    public DonationListDTO getList(Pagination pagination, @RequestParam("filterType") String filterType) {
        DonationListDTO donationListDTO = new DonationListDTO();
        log.info("필터타입은 : {}", filterType);
        pagination.setOrder(filterType);
        pagination.setTotal(postService.getTotal("DONATION"));
        log.info("총 도네이션 수: {}", pagination.getTotal());
        pagination.progressReview();
        donationListDTO.setPagination(pagination);
        if(pagination.getOrder() == null || pagination.getOrder().equals("최신등록순")) {
            donationListDTO.setDonations(donationService.getList(pagination));
        } else if(pagination.getOrder().equals("조회순")){
            donationListDTO.setDonations(donationService.getFilterList(pagination));
        } else {
            log.info("오류 : filterType 미 입력");
        }
        return donationListDTO;
    }

    @GetMapping("donation-inquiry")
    public String goToInquiry( HttpSession session, @RequestParam("postId") Long postId, Model model) {
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        boolean isLoggedIn = (loginMember != null);

        model.addAttribute("isLogin", isLoggedIn);
        if (isLoggedIn) {
            model.addAttribute("member", loginMember);
            model.addAttribute("isLogin", true);
        } else {
            model.addAttribute("isLogin", false);
        }
        log.info("들어옴");
        if (loginMember != null) {
            log.info("멤버는 : {}", loginMember);
            model.addAttribute("member", loginMember);
        }

        Optional<DonationDTO> donationDTO = donationService.getById(postId);

        if (donationDTO.isPresent()) {
            model.addAttribute("donation", donationDTO.get());
            log.info("{}",donationDTO.get().getCurrentPoint());
            model.addAttribute("attachments", attachmentService.getList(postId));
        }
        return "donation/donation-inquiry";
    }

    @GetMapping("donation-update")
    public String goToUpdateForm(@RequestParam("postId") Long postId, Model model) {
        Optional<DonationDTO> donationDTO = donationService.getById(postId);

        if (donationDTO.isPresent()) {
            model.addAttribute("donation", donationDTO.get());
            model.addAttribute("attachments", attachmentService.getList(postId));
        } else {
            return "redirect:/donation/donation-inquiry?postId=" + postId;
        }
        return "donation/donation-update";
    }

    @PostMapping("donation-update")
    public RedirectView donationUpdate(DonationDTO donationDTO, @RequestParam("postId") Long postId, @RequestParam("uuid") List<String> uuids, @RequestParam("realName") List<String> realNames, @RequestParam("path") List<String> paths, @RequestParam("size") List<String> sizes, @RequestParam("file") List<MultipartFile> files, @RequestParam("id") List<Long> ids) throws IOException {
        donationDTO.setId(postId);
        donationDTO.setPostId(postId);

//        if (donationDTO.getPostTitle() == null || donationDTO.getPostContent() == null) {
//            log.error("필수 데이터가 없습니다.");
//            return new RedirectView("/donation/donation-update?postId=" + postId);
//        }

        donationService.update(donationDTO, uuids, realNames, paths, sizes, files, ids);

        return new RedirectView("/donation/donation-inquiry?postId=" + postId);
    }

    @GetMapping("donation-delete")
    public RedirectView reviewDelete(@RequestParam("postId") Long postId) {
        donationService.delete(postId);
        return new RedirectView("/donation/donation-list");
    }

    @GetMapping("/my-posts/{memberId}")
    @ResponseBody
    public List<DonationDTO> getDonationPosts(
            @PathVariable Long memberId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        log.info("받은 회원 ID: {}, 시작 날짜: {}, 끝 날짜: {}", memberId, startDate, endDate);

        if (startDate != null && endDate != null) {
            return donationService.findByMemberIdAndDateRange(memberId, startDate, endDate);
        } else {
            return donationService.findByMemberId(memberId);
        }
    }


}
