package com.app.back.controller.support_record;

import com.app.back.domain.donation_record.DonationRecordDTO;
import com.app.back.domain.support_record.SupportRecordDTO;
import com.app.back.service.support_record.SupportRecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/support-records")
@RequiredArgsConstructor
@Slf4j
public class SupportRecordController {

    private final SupportRecordService supportRecordService;

    @PostMapping("/write")
    public void write(@RequestBody SupportRecordDTO supportRecordDTO){
        supportRecordService.save(supportRecordDTO);
    }

    @GetMapping("/{id}")
    public Optional<SupportRecordDTO> getSupportRecordById(@PathVariable Long id){
        return supportRecordService.findById(id);
    }

    @GetMapping("/all")
    public List<SupportRecordDTO> getAllDonationRecords() {
        return supportRecordService.findAll();
    }

    @PutMapping("/update")
    public void updateDonationRecord(@RequestBody SupportRecordDTO supportRecordDTO) {
        supportRecordService.update(supportRecordDTO);
    }
    @DeleteMapping("/{id}")
    public void deleteDonationRecord(@PathVariable Long id) {
        supportRecordService.deleteById(id);
    }
    @GetMapping("total/{memberId}")
    public int getTotalSupportByMemberId(@PathVariable Long memberId) {
        log.info("받은 회원 ID:{}",memberId);
        int total = supportRecordService.getTotalSupportByMemberId(memberId);
        log.info("Total Support for MemberId:{} {}",memberId, total);
        return total;
    }

    @GetMapping("/my-support/{memberId}")
    public List<SupportRecordDTO> getMySupportRecordsByMemberId
            (@PathVariable Long memberId,
             @RequestParam(required = false) String startDate,
             @RequestParam(required = false) String endDate) {
        log.info("받은 회원 ID:{}, 시작 날짜:{}, 끝 날짜: {}",memberId,startDate,endDate);

        if (startDate != null && endDate != null) {
            return supportRecordService.findByMemberIdAndDateRange(memberId, startDate, endDate);
        } else {
            return supportRecordService.findByMemberId(memberId);
        }
    }
}
