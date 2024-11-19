package com.app.back.controller.payment;

import com.app.back.domain.payment.PaymentDTO;
import com.app.back.service.payment.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/write")
    public void createPayment(@RequestBody PaymentDTO paymentDTO) {
        log.info("{}", paymentDTO);
        paymentDTO.setPaymentStatus("COMPLETED");
        paymentService.save(paymentDTO);
    }

    @GetMapping("/{id}")
    public Optional<PaymentDTO> getPaymentById(@PathVariable Long id) {
        return paymentService.findById(id);
    }

    @GetMapping("/all")
    public List<PaymentDTO> getAllPayments() {
        return paymentService.findAll();
    }

    @PutMapping("/update")
    public void updatePayment(@RequestBody PaymentDTO paymentDTO) {
        paymentService.update(paymentDTO);
    }

    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        paymentService.deleteById(id);
    }

    @GetMapping("/my-payments/{memberId}")
    public List<PaymentDTO> getMyPayments(
            @PathVariable Long memberId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        log.info("Received member ID: {}, start date: {}, end date: {}",
                memberId, startDate, endDate);

        if (startDate != null && endDate != null) {
            return paymentService.findByMemberIdAndDateRange(memberId, startDate, endDate);
        } else {
            return paymentService.findByMemberId(memberId);
        }
    }
}
