const replyService = (() => {
    // 댓글 작성
    const write = async (replyData) => {
        try {
            const response = await fetch("/replies/write", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(replyData),
            });

            if (!response.ok) {
                console.error("댓글 작성 실패(service):", response.statusText);
            }

            console.log("댓글 작성 성공(service)");
            return true;
        } catch (error) {
            console.error("댓글 작성 중 오류(service):", error);
            return false;
        }
    };

    // 댓글 목록 불러오기
    const getList = async (page, postId) => {
        try {
            const response = await fetch(`/replies/${postId}/${page}`);
            if (!response.ok) {
                const errorText = await response.text();
                console.error("댓글 목록 불러오기 실패 (응답 에러):", errorText);
            }

            const data = await response.json();
            console.log("getList에서 로드된 데이터:", data);
            return data;
        } catch (error) {
            console.error("댓글 목록 로딩 중 오류:", error);
            return null;
        }
    };

    // 댓글 삭제
    const remove = async (replyId) => {
        try {
            const response = await fetch(`/replies/${replyId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                console.error("댓글 삭제 실패:", response.statusText);
            }

            console.log("댓글 삭제 성공");
            return true;
        } catch (error) {
            console.error("댓글 삭제 중 오류:", error);
            return false;
        }
    };

    // 댓글 수정
    function updateReply(postId, replyId, memberId, newContent) {
        const url = `/community/replies-update/${replyId}`;

        const replyData = {
            replyContent: newContent,
            memberId: memberId
        };

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(replyData)
        })
            .then(response => {
                console.log(`updateReply - 응답 상태: ${response.status}`);
                const contentType = response.headers.get('Content-Type');
                console.log(`updateReply - Content-Type: ${contentType}`);

                if (response.status === 204) {
                    // 본문이 없는 경우
                    return null;
                } else if (response.ok && contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    throw new Error(`서버 응답 오류: ${response.status}`);
                }
            })
            .then(updatedReply => {
                const listItem = document.querySelector(`[data-reply-id="${replyId}"]`).closest('li');
                const commentTxt = listItem.querySelector('.comment-txt');
                const modifyButton = listItem.querySelector('.btn-comment-etc-modi');
                const modifyButtonImg = modifyButton.querySelector('img');

                if (updatedReply) {
                    console.log("댓글이 수정되었습니다:", updatedReply);
                    // DOM에서 댓글 내용 업데이트
                    commentTxt.textContent = updatedReply.replyContent;
                } else {
                    // 서버가 204 No Content를 반환한 경우, newContent로 DOM 업데이트
                    commentTxt.textContent = newContent;
                }

                // 버튼을 다시 수정 모드로 변경
                modifyButtonImg.src = '/images/community/modify-icon.png'; // 수정 아이콘 경로
                modifyButtonImg.alt = '수정 아이콘';
                modifyButton.setAttribute('data-state', 'modify');

                alert("댓글이 성공적으로 수정되었습니다.");
            })
            .catch(error => {
                console.error("댓글 수정 중 오류 발생:", error);
                alert(error.message || "댓글을 수정하는 데 문제가 발생했습니다.");
            });
    }

    // 댓글 수 조회
    const getReplyCount = async (postId) => {
        try {
            const response = await fetch(`/replies/count/${postId}`);
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`댓글 수 조회 실패 (Post ID: ${postId}):`, errorText);
                return 0;
            }

            const { count } = await response.json();
            console.log(`댓글 수 조회 성공 (Post ID: ${postId}):`, count);
            return count;
        } catch (error) {
            console.error(`댓글 수 조회 중 오류 (Post ID: ${postId}):`, error);
            return 0;
        }
    };

    // 댓글 수 업데이트 함수
    const updateReplyCount = async (postId) => {
        try {
            const totalCount = await replyService.getReplyCount(postId); // 댓글 수 조회
            const replyCountElement = document.getElementById("reply-count");

            if (replyCountElement) {
                replyCountElement.textContent = ` ${totalCount}`; // 댓글 수 갱신
                console.log(`댓글 수 갱신 완료: ${totalCount}`);
            } else {
                console.error("댓글 수 표시 요소(reply-count)를 찾을 수 없습니다.");
            }
        } catch (error) {
            console.error("댓글 수 갱신 중 오류:", error);
        }
    };

    // 페이지 로드 시 댓글 수 업데이트
    document.addEventListener("DOMContentLoaded", () => {
        const postIdElement = document.getElementById("post-id");
        const postId = postIdElement ? postIdElement.value : null;

        if (postId) {
            updateReplyCount(postId);
        } else {
            console.error("postId가 없습니다. HTML에 id='post-id' 요소를 추가하세요.");
        }
    });

    // getReplyCount의 별칭으로 getTotalReplies 추가
    const getTotalReplies = getReplyCount;

    // 메서드들을 객체로 반환
    return { write, getList, remove, updateReply, getReplyCount, updateReplyCount, getTotalReplies };
})();
