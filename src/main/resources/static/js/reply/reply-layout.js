document.addEventListener("DOMContentLoaded", () => {
    const postIdElement = document.getElementById("post-id");
    const postId = postIdElement ? postIdElement.value : null;

    if (!postId) {
        console.error("postId가 없습니다. HTML에 id='post-id' 요소를 추가하세요.");
        return;
    }

    let currentPage = 1; // 현재 페이지를 저장할 변수
    let isLastPage = false; // 마지막 페이지 여부 확인

    // 댓글 목록 로드 함수
    window.loadComments = async (page = 1, postId) => {
        try {
            console.log("댓글 새로고침 실행");
            const data = await replyService.getList(page, postId);

            if (data && data.replies) {
                if (page === 1) {
                    // 처음 로드일 경우 기존 댓글 초기화
                    clearComments();
                }

                renderComments(data.replies);

                // 마지막 페이지 여부 확인
                isLastPage = data.replies.length < data.rowCount;

                // "더보기" 버튼 상태 업데이트
                toggleLoadMoreButton(!isLastPage);
                await updateReplyCount(postId);
            }
        } catch (error) {
            console.error("댓글 목록 로딩 중 오류:", error);
        }
    };

    // 댓글 초기화 함수
    function clearComments() {
        const commentSection = document.getElementById("comment-section");
        commentSection.innerHTML = ""; // 기존 댓글 초기화
    }

    // 댓글 렌더링 함수
    function renderComments(comments) {
        if (!comments || comments.length === 0) {
            console.log("댓글 데이터가 없습니다.");
            return;
        }

        const commentSection = document.getElementById("comment-section");

        comments.forEach((comment) => {
            const memberName = comment.memberName || comment.memberNickname || "닉네임 없음";
            const profileImage = comment.profileFileName
                ? `/profile/display?memberId=${comment.memberId}`
                : "/images/default-profile.png";

            const commentHTML = `
                                       <li class="comment-container">
                                           <div class="contest-comment-show">
                                               <div>
                                                   <div class="comment-card">
                                                       <div class="contest-comment-userinfo">
                                                           <a href="/m/${comment.memberNickname || ""}" class="profile-avatar-container avatar">
                                                               <img src="${profileImage}" alt="프로필 이미지" />
                                                           </a>
                                                           <div class="nick">
                                                               <div class="nickname-container user-nick-wrapper">
                                                                   <p class="nickname-text">
                                                                       <a class="user-nick nick" href="#">
                                                                           ${memberName}
                                                                       </a>
                                                                   </p>
                                                               </div>
                                                           </div>
                                                           <p>| ${timeForToday(comment.createdDate)}</p>
                                                       </div>
                                                       <div class="contest-comment-content">
                                                           <span class="reply-content-${comment.id}">${comment.replyContent}</span>
                                                       </div>
                                                   </div>
                                               </div>
                                               <div class="contest-comment-buttons">
                                                   <button type="button" class="edit-button" data-reply-id="${comment.id}">
                                                       <img src="/images/modify-icon.png" alt="수정 아이콘">
                                                   </button>
                                                   <button type="button" class="delete-button" data-reply-id="${comment.id}">
                                                       <img src="/images/delete-icon.png" alt="삭제 아이콘">
                                                   </button>
                                               </div>
                                           </div>
                                       </li>
                                        `;

            commentSection.insertAdjacentHTML("beforeend", commentHTML);
        });
    }

    // "더보기" 버튼 상태 업데이트
    function toggleLoadMoreButton(show) {
        const loadMoreButton = document.getElementById("load-more");
        if (loadMoreButton) {
            loadMoreButton.style.display = show ? "block" : "none";
        }
    }

    // 댓글 수 업데이트 함수
    async function updateReplyCount(postId) {
        try {
            const totalCount = await replyService.getReplyCount(postId);
            const totalReplyCountElement = document.getElementById("total-reply-count");
            const commentCountElement = document.getElementById("comment-count");

            if (totalReplyCountElement) totalReplyCountElement.textContent = totalCount;
            if (commentCountElement) commentCountElement.textContent = totalCount;
        } catch (error) {
            console.error("댓글 수 업데이트 중 오류:", error);
        }
    }

    // "더보기" 버튼 클릭 이벤트
    const loadMoreButton = document.getElementById("load-more");
    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", () => {
            if (!isLastPage) {
                currentPage += 1; // 페이지 증가
                loadComments(currentPage, postId); // 다음 페이지 댓글 로드
            }
        });
    }

    // 초기 댓글 로드
    loadComments(1, postId);
});
