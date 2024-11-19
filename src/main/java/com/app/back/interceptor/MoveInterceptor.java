package com.app.back.interceptor;

import com.app.back.domain.member.MemberDTO;
import com.app.back.service.volunteer.VolunteerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
public class MoveInterceptor implements HandlerInterceptor {
    private final VolunteerService volunteerService;

    public MoveInterceptor(VolunteerService volunteerService) {
        this.volunteerService = volunteerService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 기존 세션이 있는지 확인 (세션을 생성하지 않음)
        HttpSession session = request.getSession(false);
        if (session == null) {
            log.info("세션이 존재하지 않습니다. 로그인 페이지로 리다이렉트합니다.");
            response.sendRedirect(request.getContextPath() + "/member/login");
            return false;
        }

        // 세션에서 loginMember 가져오기
        MemberDTO loginMember = (MemberDTO) session.getAttribute("loginMember");

        if (loginMember == null) {
            log.info("로그인된 사용자가 아닙니다. 로그인 페이지로 리다이렉트합니다.");
            response.sendRedirect(request.getContextPath() + "/member/login");
            return false;
        }

        // memberType 필드 가져오기
        String memberType = loginMember.getMemberType();
        log.debug("로그인한 사용자의 memberType: {}", memberType);

        if (!"ORGANIZATION".equals(memberType)) {
            String requestURI = request.getRequestURI(); // 현재 요청된 URI 확인
            log.info("비조직 회원이 {} URI에 접근하려고 합니다.", requestURI);

            if (requestURI.contains("support-write")) {
                log.info("support-write URI 접근 시도: {}. 지원 리스트로 리다이렉트합니다.", requestURI);
                response.sendRedirect(request.getContextPath() + "/support/support-list");
            } else {
                log.info("기타 URI 접근 시도: {}. 봉사 리스트로 리다이렉트합니다.", requestURI);
                response.sendRedirect(request.getContextPath() + "/volunteer/volunteer-list");
            }
            return false;
        }

        // "ORGANIZATION" 타입의 사용자라면 요청을 계속 처리
        log.info("조직 회원이 {} URI에 접근합니다.", request.getRequestURI());
        return true;
    }


}
