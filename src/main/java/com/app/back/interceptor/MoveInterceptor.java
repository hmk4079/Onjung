package com.app.back.interceptor;

import com.app.back.domain.member.MemberDTO;
import com.app.back.service.volunteer.VolunteerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
        String loginMember = (String) request.getSession().getAttribute("loginMember");
        if (!"ORGANIZATION".equals(loginMember)) {
            String requestURI = request.getRequestURI(); // 현재 요청된 URI 확인

            if (requestURI.contains("volunteer-write")) {
                response.sendRedirect(request.getContextPath() + "/volunteer/volunteer-list");
            } else if (requestURI.contains("support-write")) {
                response.sendRedirect(request.getContextPath() + "/support/support-list");
            } else {
                response.sendRedirect(request.getContextPath() + "/");
            }
            return false;
        }
        return true;
    }


}
