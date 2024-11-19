package com.app.back.controller.support;

import com.app.back.domain.review.ReviewDTO;
import com.app.back.domain.support.SupportDTO;
import com.app.back.service.review.ReviewService;
import com.app.back.service.support.SupportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/support/*")
@RequiredArgsConstructor
@Slf4j
public class SupportController {
        private final SupportService supportService;

    @GetMapping("/lastest-support")
    @ResponseBody
    public List<SupportDTO> getLatestReviews() {
        log.info("최신 후원게시판 10개 조회 요청");
        return supportService.getLatest10Supports();
    }
}
