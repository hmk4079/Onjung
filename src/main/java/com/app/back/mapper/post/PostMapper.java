package com.app.back.mapper.post;

import com.app.back.domain.inquiry.InquiryDTO;
import com.app.back.domain.member.MemberDTO;
import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.PostDTO;
import com.app.back.domain.post.PostVO;
import com.app.back.domain.post.Search;
import com.app.back.domain.volunteer.VolunteerDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface PostMapper {
    //    게시글 작성
    public void insert(PostVO postVO);

    //
    public int getTotal(String postType);

    //    현재 ID 조회
    public Long selectCurrentId();

    // ID로 게시글 조회
//    public PostVO selectById(Long id);

    // ID로 게시글 수정
    public void updateById(PostVO postVO);

    // ID로 게시글 삭제
    public void deleteById(Long id);

    // 전체 게시글 조회 (기존 메소드)
    public List<PostVO> selectAll();

    //    조회수 증가
    public void increaseViewCountById(Long id);

    //  전체조회
    public List<PostDTO> selectAll(@Param("pagination") Pagination pagination, @Param("search") Search search);

    public List<PostDTO> selectFilterAll(@Param("pagination") Pagination pagination, @Param("search")Search search ,@Param("filterType") String filterType);

    // 전체 조회 (삭제된 게시글 제외)
    public List<PostDTO> selectAllWithNoDeleted(@Param("pagination") Pagination pagination, @Param("search") Search search);

    // 필터링된 게시글 조회 (삭제된 게시글 제외)
    public List<PostDTO> selectFilterAllWithNoDeleted(@Param("pagination") Pagination pagination, @Param("search") Search search, @Param("filterType") String filterType);


    //    조회
    public Optional<PostDTO> selectById(Long id);

    //    게시글 전체 개수 조회
    public int selectTotal();
    //    검색 결과 개수 조회
    public int selectTotalWithSearch(@Param("search") Search search);

    public int selectTotalWithFilter(@Param("search") Search search, @Param("filterType") String filterType);

    // 상태 업데이트 메서드
    public void updateStatusById(@Param("id") Long id, @Param("postStatus") String postStatus);
  
    public int selectTotalByPostType(String postType);




}
