package com.app.back.domain.donation;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class DonationVO {
    private Long id;
    private int goalPoint;
    private int currentPoint;
    private String donationSDate;
    private String donationEDate;
}
