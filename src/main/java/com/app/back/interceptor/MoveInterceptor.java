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
        MemberDTO loginMember = (MemberDTO) request.getSession().getAttribute("loginMember");

        if (!loginMember.equals("ORGANIZATION")){
            response.sendRedirect(request.getContextPath() + "/volunteer/volunteer-list");
            return false;
        }
        return true;
    }

}
