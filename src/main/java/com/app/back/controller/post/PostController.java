package com.app.back.controller.post;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.post.PostDTO;
import com.app.back.repository.post.PostDAO;
import com.app.back.service.post.PostService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
@Slf4j
public class PostController {
    private final PostService postService;
    private final PostDAO postDAO;

    @GetMapping("/check-permission")
    public String checkPermission(@RequestParam Long postId, HttpSession session) {
        System.out.println("컨트롤러에서 전달된 postId: " + postId); // null 또는 잘못된 값 확인

        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");
        if (loginMember == null) {
            return "APPLY";
        }

        String loggedInUserId = String.valueOf(loginMember.getId());
        System.out.println("로그인된 사용자 ID: " + loggedInUserId);

        boolean isOwner = postService.checkPermission(postId, loggedInUserId);
        return isOwner ? "EDIT" : "APPLY";
    }

    @GetMapping("/post/{id}")
    public String getPostDetail(@PathVariable Long postId, Model model) {
        Optional<PostDTO> post = postService.getPost(postId); // ID로 게시글 조회
        model.addAttribute("post", post); // Model에 추가
        return "post/detail"; // 렌더링할 HTML 파일명
    }


}

