package com.app.back.domain.volunteer;


import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter @ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerVO {
    private Long id;
    private int recruitmentCount;
    private int nowRecruitmentCount;
    private String vtSDate;
    private String vtEDate;

}
