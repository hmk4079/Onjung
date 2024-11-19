package com.app.back.controller.vt_application;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.vt_application.VtApplicationDTO;
import com.app.back.service.vt_application.VtApplicationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vt-applications")
@RequiredArgsConstructor
@Slf4j
public class VtApplicationController {

    private final VtApplicationService vtApplicationService;

    // 지원서 작성
    @PostMapping("/insert")
    public String insertVtApplication(@RequestBody VtApplicationDTO vtApplicationDTO) {
        vtApplicationService.save(vtApplicationDTO);
        return "Insert Success";
    }

    // 특정 지원서 조회
    @GetMapping("/selectById/{id}")
    public VtApplicationDTO selectVtApplicationById(@PathVariable Long id) {
        return vtApplicationService.findById(id);
    }

    // 모든 지원서 조회
    @GetMapping("/selectAll")
    public List<VtApplicationDTO> selectAllVtApplications() {
        return vtApplicationService.findAll();
    }

    // 지원서 업데이트
    @PutMapping("/update")
    public String updateVtApplication(@RequestBody VtApplicationDTO vtApplicationDTO) {
        vtApplicationService.update(vtApplicationDTO);
        return "Update Success";
    }

    // 지원서 삭제
    @DeleteMapping("/deleteById/{id}")
    public String deleteVtApplicationById(@PathVariable Long id) {
        vtApplicationService.deleteById(id);
        return "Delete Success";
    }

    // 특정 게시글에 지원한 사용자 목록 조회
    @GetMapping("/vt/{vtId}")
    public List<VtApplicationDTO> getApplicationsByVtId(@PathVariable Long vtId) {
        return vtApplicationService.getApplicationsByVtId(vtId);
    }

    // 특정 게시글에 지원한 사용자 수 조회
    @GetMapping("/vt/{vtId}/count")
    public int getApplicationCountByVtId(@PathVariable Long vtId) {
        return vtApplicationService.getApplicationCountByVtId(vtId);
    }

    // 지원자 승인
    @PostMapping("/approve/{applicationId}")
    public ResponseEntity<String> approveApplication(@PathVariable Long applicationId) {
        log.info("Approve request received for applicationId: {}", applicationId);
        try {
            vtApplicationService.approveApplication(applicationId);
            return ResponseEntity.ok("지원 승인!");
        } catch (Exception e) {
            log.error("Error approving applicationId: {}", applicationId, e);
            return ResponseEntity.status(500).body("지원 승인 실패!");
        }
    }

    // 지원자 거절
    @PostMapping("/refuse/{applicationId}")
    public ResponseEntity<String> refuseApplication(@PathVariable Long applicationId) {
        log.info("Refuse request received for applicationId: {}", applicationId);
        try {
            vtApplicationService.refuseApplication(applicationId);
            return ResponseEntity.ok("지원 거절");
        } catch (Exception e) {
            log.error("Error refusing applicationId: {}", applicationId, e);
            return ResponseEntity.status(500).body("지원 거절 실패!");
        }
    }

    @GetMapping("/application-list/{memberId}")
    public List<VtApplicationDTO> getApplicationsByMemberIdAndDateRange(
            @PathVariable Long memberId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        log.info("받은 회원 ID: {}, 시작 날짜: {}, 끝 날짜: {}",
                memberId, startDate, endDate);

        if (startDate != null && endDate != null) {
            return vtApplicationService.getApplicationsByMemberIdAndDateRange(memberId, startDate, endDate);
        } else {
            return vtApplicationService.getApplicationsByMemberId(memberId);
        }
    }


}
