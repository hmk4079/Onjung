package com.app.back.controller.alarm;

import com.app.back.domain.alarm.AlarmDTO;
import com.app.back.domain.member.MemberDTO;
import com.app.back.service.alarm.AlarmService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/alarm")
@Slf4j
public class AlarmController {
    private AlarmService alarmService;

    public AlarmController(AlarmService alarmService) {
        this.alarmService = alarmService;
    }

    @GetMapping("/mypage-member/{memberId}")
    @ResponseBody
    public ResponseEntity<List<AlarmDTO>> getAlarmsByMemberId(@PathVariable Long memberId) {
        List<AlarmDTO> alarms = alarmService.getAlarmsByMemberId(memberId);
        return ResponseEntity.ok(alarms);
    }

    @GetMapping("/member/{memberId}")
    @ResponseBody
    public ResponseEntity<List<AlarmDTO>> getUnreadAlarmsByMemberId7(@PathVariable Long memberId) {
        List<AlarmDTO> latestAlarms = alarmService.getUnreadAlarmsByMemberId(memberId);
        return ResponseEntity.ok(latestAlarms);
    }

    @PutMapping("/{id}/read")
    @ResponseBody
    public ResponseEntity<Void> markAlarmAsRead(
            @PathVariable Long id,
            @RequestBody Map<String, Object> alarmData,
            HttpSession session
    ) {
        MemberDTO member = (MemberDTO) session.getAttribute("loginMember");
        if (member != null) {
            Long memberId = member.getId();
            String alarmType = (String) alarmData.get("alarmType");

            Long postId = alarmData.get("postId") instanceof Number ? ((Number) alarmData.get("postId")).longValue() : null;

            if (alarmType == null || alarmType.isEmpty() || postId == null) {
                log.warn("AlarmType or postId is missing for alarm ID {}", id);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

            boolean success = alarmService.markAlarmAsRead(id, memberId, alarmType, postId);
            if (success) {
                log.info("Alarm with ID {} marked as read by member {} alarmType: {}, postId: {}", id, memberId, alarmType, postId);
                return ResponseEntity.ok().build();
            } else {
                log.warn("Failed to mark alarm with ID {} as read by member {} alarmType: {}, postId: {}", id, memberId, alarmType, postId);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        } else {
            log.warn("Attempt to mark alarm as read without a logged-in member");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/read/{id}")
    public RedirectView readAlarm(
            @PathVariable Long id,
            @RequestParam Long postId,
            @RequestParam String alarmType,
            HttpSession session
    ) {
        MemberDTO member = (MemberDTO) session.getAttribute("loginMember");
        if (member != null) {
            Long memberId = member.getId();
            alarmService.markAlarmAsRead(id, memberId, alarmType, postId);
            log.info("읽음 처리된 알림 아이디: {} 멤버 아이디: {}", id, memberId);
        } else {
            log.warn("로그인 오류");
        }

        // 알림을 읽은 후 무조건 마이페이지로 이동
        return new RedirectView("/mypage/mypage");
    }



}