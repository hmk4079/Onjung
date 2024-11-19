package com.app.back.service.rank;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.repository.member.MemberDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Primary
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class RankServiceImpl implements RankService {
    private final MemberDAO memberDAO;

    @Override
    // 모든 봉사활동 단체 회원 수
    public List<MemberDTO> getAllVolunteerGroup(Pagination pagination) {
        return memberDAO.selectAllVolunteerGroup(pagination);
    }

    // 랭킹에 따른 봉사활동 단체 회원 목록
    public List<MemberDTO> getTop100VolunteerGroup(Pagination pagination) {
        return memberDAO.findTop100VolunteerGroup(pagination);
    };

    @Override
    // 해당 월에 봉사활동을 한 시간이 가장 많은 5명의 회원 목록
    public List<MemberDTO> selectTop5ByVt(int month) {
        return memberDAO.selectTop5ByVt(month);
    };

    @Override
    // 해당 월에 후원한 금액이 가장 많은 5명의 회원 목록
    public List<MemberDTO> selectTop5BySupport(int month) {
        return memberDAO.selectTop5BySupport(month);
    };

    @Override
    // 해당 월에 기부한 금액이 가장 많은 5명의 회원 목록
    public List<MemberDTO> selectTop5ByDonation(int month) {
        return memberDAO.selectTop5ByDonation(month);
    };
}

