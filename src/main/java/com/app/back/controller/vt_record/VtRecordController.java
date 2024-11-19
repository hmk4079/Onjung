package com.app.back.controller.vt_record;

import com.app.back.domain.vt_record.VtRecordDTO;
import com.app.back.service.vt_record.VtRecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/vt-records")
@RequiredArgsConstructor
@Slf4j
public class VtRecordController {
    private final VtRecordService vtRecordService;

    @PostMapping("/write")
    public void createVtRecord(@RequestBody VtRecordDTO vtRecordDTO) {
        vtRecordService.save(vtRecordDTO);
    }
    @GetMapping("/{id}")
    public Optional<VtRecordDTO> getVtRecordById(@PathVariable Long id) {
        return vtRecordService.findById(id);
    }
    @GetMapping("/all")
    public List<VtRecordDTO> getAllVtRecords() {
        return vtRecordService.findAll();
    }
    @PutMapping("/update")
    public void updateVtRecord(@RequestBody VtRecordDTO vtRecordDTO) {
        vtRecordService.update(vtRecordDTO);
    }
    @DeleteMapping("/{id}")
    public void deleteVtRecordById(@PathVariable Long id) {
        vtRecordService.deleteById(id);
    }

    @GetMapping("/my-vt-record/{memberId}")
    public List<VtRecordDTO> getMyVtRecords(
            @PathVariable Long memberId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        log.info("memberId: {}, startDate: {}, endDate: {}", memberId, startDate, endDate);
        if (startDate != null && endDate != null) {
            return vtRecordService.findByMemberIdAndDateRange(memberId, startDate, endDate);
        }else{
            return vtRecordService.findByMemberId(memberId);
        }

    }
    @GetMapping("/total-vt-time/{memberId}")
    public int getTotalVtTime(@PathVariable Long memberId) {
        log.info("memberId: {}", memberId);
        int totalVtTime = vtRecordService.getTotalvtTimeCountByMemberId(memberId);
        log.info("totalVtTime: {}", totalVtTime);
        return totalVtTime;
    }

    @GetMapping("/total-vt-count/{memberId}")
    public int getTotalVtCount(@PathVariable Long memberId) {
        log.info("memberId: {}", memberId);
        int totalVtCount = vtRecordService.getTotalvtCountByMemberId(memberId);
        log.info("totalVtCount: {}", totalVtCount);
        return totalVtCount;
    }

}
