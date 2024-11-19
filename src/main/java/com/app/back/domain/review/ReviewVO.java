package com.app.back.domain.review;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class ReviewVO {
    private Long id;
    private double reviewStarRate;
    private String vtGroupName;
}
