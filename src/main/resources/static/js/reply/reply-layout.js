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
    function renderReplies(currentMemberId, replies, postId) {
        const commentSection = document.getElementById("comment-section");
        console.log(`댓글 렌더링 중: 게시글 ID ${postId}`);

        if (!replies || replies.length === 0) {
            if (commentSection.childElementCount === 0) {
                const noRepliesMessage = document.createElement('li');
                noRepliesMessage.textContent = "댓글이 없습니다.";
                commentSection.appendChild(noRepliesMessage);
            }
            return;
        }

        replies.forEach((reply) => {
            const memberName = reply.memberName || reply.memberNickname || "닉네임 없음";
            const profileImage = reply.profileFileName
                ? `/profile/display?memberId=${reply.memberId}`
                : "/images/default-profile.png";

            const commentHTML = `
            <li class="comment-container">
                <div class="contest-comment-show">
                    <div>
                        <div class="comment-card">
                            <div class="contest-comment-profile">
                                <a href="/m/${reply.memberId}">
                                    <img src="${profileImage}" alt="${memberName}">
                                </a>
                                <div class="nick">
                                    <div class="nick-info">
                                        <p class="name">
                                            <a class="nickname">${memberName}</a>
                                        </p>
                                    </div>
                                </div>
                                <p>| ${timeForToday(reply.createdDate)}</p>
                            </div>
                            <div class="contest-comment-content">
                                <span class="reply-content">${reply.content}</span>
                            </div>
                        </div>
                    </div>
                    <div class="contest-comment-buttons">
                        <button type="button" class="edit-button" data-reply-id="${reply.id}">
                            <img src="/images/modify-icon.png" alt="수정 아이콘">
                        </button>
                        <button type="button" class="delete-button" data-reply-id="${reply.id}">
                            <img src="/images/delete-icon.png" alt="삭제 아이콘">
                        </button>
                    </div>
                </div>
            </li>
        `;

            const listItem = document.createElement('li');
            let innerHTML = commentHTML;

            // 현재 사용자가 작성자인 경우 수정 및 삭제 버튼 추가
            if (reply.memberId === currentMemberId) {
                console.log(`사용자 ${currentMemberId}가 댓글 ${reply.id}를 수정/삭제할 수 있습니다.`);
                innerHTML += `
                <div class="contest-comment-buttons">
                    <button type="button" class="edit-button" data-reply-id="${reply.id}">
                        <img src="/images/modify-icon.png" alt="수정 아이콘">
                    </button>
                    <button type="button" class="delete-button" data-reply-id="${reply.id}">
                        <img src="/images/delete-icon.png" alt="삭제 아이콘">
                    </button>
                </div>
            `;
            } else {
                console.log(`사용자 ${currentMemberId}가 댓글 ${reply.id}를 수정/삭제할 수 없습니다.`);
            }

            innerHTML += `</div>`; // wrap-comment 닫기
            listItem.innerHTML = innerHTML;
            commentSection.appendChild(listItem);
        });

        // 각 댓글에 대한 이벤트 리스너 추가
        replies.forEach((reply) => {
            if (reply.memberId === currentMemberId) {
                const modifyButton = document.querySelector(`[data-reply-id="${reply.id}"]`);
                const deleteButton = document.querySelector(`[data-reply-id="${reply.id}"]`);

                modifyButton.addEventListener('click', function () {
                    handleModifyButtonClick(postId, reply);
                });

                deleteButton.addEventListener('click', function () {
                    handleDeleteButtonClick(postId, reply);
                });

                console.log(`댓글 ID: ${reply.id}에 대한 이벤트 리스너가 추가되었습니다.`);
            }
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

