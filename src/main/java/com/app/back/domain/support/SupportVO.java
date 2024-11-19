package com.app.back.domain.support;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class SupportVO {
    private Long id;
    private int goalPoint;
    private int currentPoint;
    private String supportSdate;
    private String supportEdate;

}
