package com.app.back.domain.post;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class PostVO {
        private Long id;
        private String postTitle;
        private String postContent;
        private String postSummary;
        private String postType;
        private String postStatus;
        private Long postViewCount;
        private Long memberId;
        private String createdDate;
        private String updatedDate;

        public PostDTO toDTO(){
            PostDTO postDTO = new PostDTO();
            postDTO.setId(id);
            postDTO.setPostTitle(postTitle);
            postDTO.setPostContent(postContent);
            postDTO.setPostSummary(postSummary);
            postDTO.setPostType(postType);
            postDTO.setPostStatus(postStatus);
            postDTO.setPostViewCount(postViewCount);
            postDTO.setMemberId(memberId);
            postDTO.setCreatedDate(createdDate);
            postDTO.setUpdatedDate(updatedDate);
            return postDTO;
        }
    }
