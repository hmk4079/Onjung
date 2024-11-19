package com.app.back.service.member;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.member.MemberVO;
import com.app.back.domain.post.Pagination;
import com.app.back.mapper.member.MemberMapper;

import java.util.List;
import java.util.Optional;

public interface MemberService {
    // SMS 인증번호 관련 메서드 추가
    public void sendAuthCode(String phoneNumber);    // 인증번호 전송
    public boolean verifyAuthCode(String phoneNumber, String authCode); // 인증번호 검증

    // 이메일 인증번호 관련 메서드 추가
    public void sendEmailAuthCode(String email);          // 이메일로 인증번호 전송
    public boolean verifyEmailAuthCode(String email, String authCode); // 이메일 인증번호 검증

    public void join(MemberVO memberVO);
    public Optional<MemberVO> login(MemberVO memberVO);
    public Optional<MemberVO> getMember(Long id);
    public void update(MemberVO memberVO);
    public void delete(Long id);
    public Optional<MemberVO> getKakaoMember(String memberKakaoEmail);
    public List<MemberVO> getAllMembers();

    public Optional<MemberVO> findByResetUuid(String uuid);

    public Optional<MemberVO> findByMemberEmail(String email);

    public void passwordUpdate(MemberVO memberVO);

    public int getTotalVtTime(Long memberId);

    public int getVtCountByMemberId(Long memberId);

    public void updateProfile(MemberVO memberVO);

    public List<MemberDTO> getTop100VolunteerGroup(Pagination pagination);
}
