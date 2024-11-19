package com.app.back.service.post;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.PostDTO;
import com.app.back.domain.post.Search;
import com.app.back.enums.AdminPostStatus;
import com.app.back.enums.AdminPostType;

import java.util.List;
import java.util.Optional;

public interface PostService {
public int getTotal(String postType);

public int getPostTotal();
//    검색 조건에 맞는 게시물 수
public int getTotalWithSearch(Search search);

//    목록
public List<PostDTO> getList(Pagination pagination, Search search);

//    필터 목록
public List<PostDTO> getFilterList(Pagination pagination, Search search, AdminPostType filterType);
//    조회
public Optional<PostDTO> getPost(Long id);
//    삭제
public void delete(Long id);

// 필터 조건에 맞는 게시글 수 조회
public  int getTotalWithFilter(Search search, AdminPostType filterType);

// 상태 업데이트 메서드
public  void updateStatus(Long id, AdminPostStatus postStatus);

// 삭제된 게시글을 제외한 목록
List<PostDTO> getListWithoutDeleted(Pagination pagination, Search search);

// 삭제된 게시글을 제외한 필터 목록
List<PostDTO> getFilterListWithoutDeleted(Pagination pagination, Search search, AdminPostType filterType);

}
