package com.app.back.service.rank;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.member.MemberVO;
import com.app.back.domain.post.Pagination;

import java.util.List;
import java.util.Optional;

public interface RankService {
    // 모든 봉사활동 단체 회원 수
    public List<MemberDTO> getAllVolunteerGroup(Pagination pagination);

    // 랭킹에 따른 봉사활동 단체 회원 목록
    public List<MemberDTO> getTop100VolunteerGroup(Pagination pagination);

    // 해당 월에 봉사활동을 한 시간이 가장 많은 5명의 회원 목록
    public List<MemberDTO> selectTop5ByVt(int month);

    // 해당 월에 후원한 금액이 가장 많은 5명의 회원 목록
    public List<MemberDTO> selectTop5BySupport(int month);

    // 해당 월에 기부한 금액이 가장 많은 5명의 회원 목록
    public List<MemberDTO> selectTop5ByDonation(int month);
}
