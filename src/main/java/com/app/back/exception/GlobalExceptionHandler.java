package com.app.back.exception;

import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.view.RedirectView;

import java.nio.file.AccessDeniedException;

@Slf4j
@ControllerAdvice(basePackages = "com.app.back.controller.member")
public class GlobalExceptionHandler {
    @ExceptionHandler(LoginFailException.class)
    protected RedirectView handleLoginFailException(LoginFailException e) {
        log.error(e.getMessage());
        return new RedirectView("/member/login?status=false");
    }
    // UserNotAuthenticatedException 핸들러 추가
    @ExceptionHandler(NotFoundPostException.class)
    protected RedirectView handleUserNotAuthenticatedException(NotFoundPostException e) {
        log.error("Authentication error: {}", e.getMessage());
        return new RedirectView("/volunteer/volunteer-list");
    }

//    @ExceptionHandler(ApplicationFailedException.class)
//    protected RedirectView handleApplicationFailedException(ApplicationFailedException e) {
//        log.error(e.getMessage());
//        return new RedirectView("/volunteer/volunteer-inquiry");
//    }



}
