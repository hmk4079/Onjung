package com.app.back.mapper;

import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.member.MemberVO;
import com.app.back.mapper.member.MemberMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class MemberMapperTests {

    @Autowired
    private MemberMapper memberMapper;

    @Test
    public void testInsertMember() {
        // 테스트용 DTO 생성
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setMemberNickName("봉사단체23");
        memberDTO.setMemberType("ORGANIZATION");
        memberDTO.setMemberEmail("ljm21000@naver.com");
        memberDTO.setMemberName("봉사단체 유저23");
        memberDTO.setMemberPhone("01012345678");
        memberDTO.setMemberJung(10000);
        memberDTO.setMemberPoint(10000);
        memberDTO.setMemberPassword("123123");
        memberDTO.setMemberLoginType("NORMAL");


        // 회원 삽입 테스트
        memberMapper.insert(memberDTO.toVO());
        log.info("회원 정보 삽입 성공: {}", memberDTO.toVO());

//        MemberDTO memberDTO2 = new MemberDTO();
//        memberDTO2.setMemberNickName("봉사단체24");
//        memberDTO2.setMemberType("ORGANIZATION");
//
//        memberDTO2.setMemberEmail("ljm21000@naver.com");
//        memberDTO2.setMemberName("봉사단체 유저24");
//        memberDTO2.setMemberPhone("01012345678");
//        memberDTO2.setMemberJung(10000);
//        memberDTO2.setMemberPoint(10000);
//        memberDTO2.setMemberPassword("123123");
//
//        memberDTO2.setMemberLoginType("NORMAL");
//
//
//        // 회원 삽입 테스트
//        memberMapper.insert(memberDTO2.toVO());
//        log.info("회원2 정보 삽입 성공: {}", memberDTO2.toVO());
    }

    @Test
    public void testUpdateResetUuid() {
        // UUID 업데이트 테스트
        String email = "ljm21000@gmail.com";
        String uuid = "98a8eb28-1a1a-401e-b302-c1e033ee12b4";

        // 이메일로 회원 조회
        MemberVO memberVO = memberMapper.selectByMemberEmail(email).orElse(null);
        if (memberVO != null) {
            // MemberVO -> MemberDTO 변환 후 UUID 설정
            MemberDTO memberDTO = memberVO.toDTO();
            memberDTO.setResetUuid(uuid);

            // MemberDTO -> MemberVO 변환 후 업데이트 수행
            memberMapper.update(memberDTO.toVO());
            log.info("UUID 업데이트 성공: {}", memberDTO);
        } else {
            log.warn("해당 이메일로 회원을 찾을 수 없습니다.");
        }
    }
    @Test
    public void testUpdatePassword() {
        // 테스트 데이터
        String email = "ljm21000@gmail.com";
        String newPassword = "newPassword123";

        // 이메일로 회원 조회
        MemberVO memberVO = memberMapper.selectByMemberEmail(email).orElse(null);
        if (memberVO != null) {
            MemberDTO memberDTO = memberVO.toDTO();
            memberDTO.setMemberPassword(newPassword);  // 새 비밀번호 설정
            memberDTO.setResetUuid(null);  // UUID 초기화

            memberMapper.updatePassword(memberDTO.toVO());
            log.info("비밀번호 업데이트 성공: {}", memberDTO);

            // 비밀번호 업데이트가 정상적으로 이루어졌는지 다시 조회하여 확인
            MemberVO updatedMember = memberMapper.selectByMemberEmail(email).orElse(null);
            if (updatedMember != null && updatedMember.getMemberPassword().equals(newPassword)) {
                log.info("비밀번호가 올바르게 업데이트되었습니다.");
            } else {
                log.warn("비밀번호 업데이트에 실패했습니다.");
            }
        } else {
            log.warn("해당 이메일로 회원을 찾을 수 없습니다.");
        }
    }

}