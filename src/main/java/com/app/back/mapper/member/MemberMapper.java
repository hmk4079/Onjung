package com.app.back.mapper.member;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.member.MemberVO;
import com.app.back.domain.post.Pagination;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MemberMapper {
    //    회원가입
    public void insert(MemberVO memberVO);

    //    로그인
    public Optional<MemberVO> selectByMemberEmailAndMemberPassword(MemberVO memberVO);

    //    회원 정보 조회
    public Optional<MemberVO> selectById(Long id);

    //    회원 정보 수정
    public void update(MemberVO memberVO);

    //    회원 삭제
    public void delete(Long id);

    //    카카오 회원 정보 조회
    public Optional<MemberVO> selectByMemberKakaoEmail(String memberKakaoEmail);

    //    회원 전체 정보 조회
    public List<MemberVO> selectAll();

    public Optional<MemberVO> selectByResetUuid(String uuid);

    public Optional<MemberVO> selectByMemberEmail(String email);

    public void updatePassword(MemberVO memberVO);

    public int getTotalVtTimeByMemberId(@Param("memberId") Long memberId);

    public int getVtCountByMemberId(@Param("memberId") Long memberId);

    public void updateProfile(MemberVO memberVO);  // 프로필 업데이트 메서드 선언

    //  전체 봉사활동 단체 회원 목록
    public List<MemberDTO> selectAllVolunteerGroup(@Param("pagination") Pagination pagination);

    // 랭킹에 따른 봉사활동 단체 회원 목록
    public List<MemberDTO> selectTop100VolunteerGroup(@Param("pagination") Pagination pagination);
    
    // 해당 월에 봉사활동을 한 시간이 가장 많은 5명의 회원 목록
    public List<MemberDTO> selectTop5ByVt(int month);
    
    // 해당 월에 후원한 금액이 가장 많은 5명의 회원 목록
    public List<MemberDTO> selectTop5BySupport(int month);
    
    // 해당 월에 기부한 금액이 가장 많은 5명의 회원 목록
    public List<MemberDTO> selectTop5ByDonation(int month);

}

