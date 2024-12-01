document.addEventListener("DOMContentLoaded", () => {
    const writeButton = document.querySelector("#write-button");
    const commentTextarea = document.getElementById("reply-content");
    const postIdElement = document.getElementById("post-id");
    const postId = postIdElement ? postIdElement.value : null;

    if (!postId) {
        console.error("postId가 없습니다. HTML에 id='post-id' 요소를 추가하세요.");
        return;
    }
    console.log("가져온 postId:", postId);


    // 댓글 작성 이벤트 등록
    writeButton.addEventListener("click", async () => {
        const commentText = commentTextarea.value.trim();
        if (!commentText) {
            alert("댓글 내용을 입력하세요.");
            return;
        }

        try {
            await replyService.write({ postId, replyContent: commentText });
            commentTextarea.value = ""; // 입력 필드 초기화
            console.log("댓글 작성 성공!");
            loadComments(); // 댓글 목록 새로 로드
        } catch (error) {
            console.error("댓글 작성 중 오류:", error);
            alert("댓글 작성에 실패했습니다.");
        }
    });

    // 댓글 목록 로드 함수
    function loadComments() {
        replyService.getList(1, postId, (data) => {
            if (data && data.replies) {
                renderComments(data.replies);
            }
        });
    }

    // 댓글 렌더링 함수
    function renderComments(comments) {
        function renderComments(comments) {
            if (!comments) {
                console.error("comments 데이터가 없습니다.");
                return;
            }
            comments.forEach(comment => {
                console.log(comment);
                // 댓글 렌더링 로직
            });
        }

        const commentSection = document.getElementById("comment-section");
        commentSection.innerHTML = "";

        comments.forEach((comment) => {
            const commentHTML = `
                <article class="comment-container">
                <div class="contest-comment-show">
                    <div>
                        <div class="comment-card">
                            <div class="contest-comment-userinfo">
                                <a href="/m/${comment.memberNickName}" class="profile-avatar-container avatar">
                                    <img th:src="${comment.profileFileName != null ? '/profile/display?memberId=' + comment.memberId : '/images/default-profile.png'}" alt="프로필 이미지" />
                                </a>
                                <div class="nick">
                                    <div class="nickname-container user-nick-wrapper">
                                        <p class="nickname-text">
                                            <a class="user-nick nick" href="#">
                                            th:text="${comment.memberName != null ? comment.memberName : (comment.memberNickname != null ? comment.memberNickname : '닉네임없음')}"
                                            </a>
                                        </p>
                                    </div>
                                    ${isAuthorWriter}
                                </div>
                                <p>| ${comment.createdDate}</p>
                            </div>
                            <div class="contest-comment-content">
                                <div>${comment.replyContent}</div>
                            </div>
                        </div>
                    </div>
                    <div class="contest-comment-buttons"></div>
                </div>
            </article>
            `;
            commentSection.insertAdjacentHTML("beforeend", commentHTML);
        });
    }


// 댓글 데이터 로드 함수
    function loadComments(page = 1) {
        replyService.getList(page, postId, (data) => {
            if (data && data.replies) {
                renderComments(data.replies);
                updateReplyCount(postId);
            }
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

    // textarea 입력 이벤트 처리
    commentTextarea.addEventListener("input", () => {
        submitButton.disabled = commentTextarea.value.trim() === "";
    });

    // // 댓글 작성 버튼 클릭 이벤트 처리
    // submitButton.addEventListener("click", async () => {
    //     const commentText = commentTextarea.value.trim();
    //     if (!commentText) return;
    //
    //     await replyService.write({ postId, replyContent: commentText });
    //     commentTextarea.value = "";
    //     submitButton.disabled = true;
    //
    //     loadComments(globalThis.page); // 작성 후 댓글 목록 새로고침
    // });

    // 무한 스크롤 이벤트
    window.addEventListener("scroll", () => {
        if (globalThis.loadingFlag) return;

        if ((window.innerHeight + window.scrollY - 10) >= document.body.offsetHeight) {
            globalThis.loadingFlag = true;
            replyService.getList(++globalThis.page, postId, (data) => {
                if (data && data.replies) {
                    renderComments(data.replies);
                }
                globalThis.loadingFlag = false;
            });
        }
    });

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
    loadComments();
});
