package com.app.back.mapper;

import com.app.back.domain.post.Pagination;
import com.app.back.domain.post.PostDTO;
import com.app.back.domain.post.Search;
import com.app.back.mapper.post.PostMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

@SpringBootTest
@Slf4j
public class PostMapperTests {
    @Autowired
    private PostMapper postMapper;

    // 전체 게시글 조회 테스트
    @Test
    public void testSelectAll() {
        Pagination pagination = new Pagination();
        pagination.progress();
        Search search = new Search();

        List<PostDTO> posts = postMapper.selectAll(pagination, search);
        log.info("전체 게시글 개수: {}", posts.size());
        posts.forEach(post -> log.info("게시글: {}", post));
    }

    // ID로 게시글 조회 테스트
    @Test
    public void testSelectByPostId() {
        Long id = 109L;
        Optional<PostDTO> postDTO = postMapper.selectById(id);
        if (postDTO.isPresent()) {
            log.info("조회된 게시글: {}", postDTO.get());
        } else {
            log.info("ID {}인 게시글이 존재하지 않습니다.", id);
        }
    }

    // ID로 게시글 삭제 테스트
    @Test
    public void testDeleteById() {
        Long id = 109L; // 삭제할 게시글 ID (예시)
        postMapper.deleteById(id);
        log.info("게시글이 삭제되었습니다. ID: {}", id);

        // 삭제 후 다시 조회하여 삭제 여부 확인
        Optional<PostDTO> deletedPost = postMapper.selectById(id);
        if (deletedPost.isEmpty()) {
            log.info("삭제 확인 완료. ID {}인 게시글이 존재하지 않습니다.", id);
        } else {
            log.info("삭제 실패. ID {}인 게시글이 여전히 존재합니다.", id);
        }
    }
}
