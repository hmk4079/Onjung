package com.app.back.domain.rank;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.post.Pagination;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class RankDTO {
    @EqualsAndHashCode.Include
    private List<MemberDTO> vtRankMembers;
    private List<MemberDTO> supportRankMembers;
    private List<MemberDTO> donationRankMembers;
    private List<MemberDTO> volunteerGroups;
    private Pagination pagination;

}
