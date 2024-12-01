document.addEventListener("DOMContentLoaded", () => {
    const postIdElement = document.getElementById("post-id");
    const postId = postIdElement ? postIdElement.value : null;

    if (!postId) {
        console.error("postId가 없습니다. HTML에 id='post-id' 요소를 추가하세요.");
        return;
    }

    // 댓글 목록 로드 함수
    window.loadComments = async (page = 1, postId) => {
        try {
            console.log("댓글 새로고침 실행");
            const data = await replyService.getList(page, postId);
            if (data && data.replies) {
                renderComments(data.replies);
                updateReplyCount(postId);
            }
        } catch (error) {
            console.error("댓글 목록 로딩 중 오류:", error);
        }
    };

    // 댓글 렌더링 함수
    function renderComments(comments) {
        if (!comments || comments.length === 0) {
            console.log("댓글 데이터가 없습니다.");
            return;
        }

        const commentSection = document.getElementById("comment-section");
        commentSection.innerHTML = ""; // 기존 댓글 초기화

        comments.forEach((comment) => {
            // Null 값 처리
            const memberName = comment.memberName || comment.memberNickname || "닉네임 없음";
            const profileImage = comment.profileFileName
                ? `/profile/display?memberId=${comment.memberId}`
                : "/images/default-profile.png";

            // 댓글 HTML 템플릿
            const commentHTML = `
    <article class="comment-container">
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
                        <div>${comment.replyContent}</div>
                    </div>
                </div>
            </div>
            <div class="contest-comment-buttons">
                <button 
                    class="edit-button" 
                    data-reply-id="${comment.id}" 
                    onclick="handleEdit(${comment.id})">
                    수정
                </button>
                <button 
                    class="delete-button" 
                    data-reply-id="${comment.id}" 
                    onclick="handleDelete(${comment.id})">
                    삭제
                </button>
            </div>
        </div>
    </article>
`;

            commentSection.insertAdjacentHTML("beforeend", commentHTML);
        });
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

    // 시간 변환 함수
    function timeForToday(datetime) {
        const today = new Date();
        const date = new Date(datetime);
        let gap = Math.floor((today.getTime() - date.getTime()) / 1000 / 60);

        if (gap < 1) return "방금 전";
        if (gap < 60) return `${gap}분 전`;
        gap = Math.floor(gap / 60);
        if (gap < 24) return `${gap}시간 전`;
        gap = Math.floor(gap / 24);
        if (gap < 31) return `${gap}일 전`;
        gap = Math.floor(gap / 31);
        if (gap < 12) return `${gap}개월 전`;
        return `${Math.floor(gap / 12)}년 전`;
    }

    // 초기 댓글 로드
    loadComments(1, postId);
});
