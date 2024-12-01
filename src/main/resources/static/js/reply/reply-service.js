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

    // 댓글 수정 함수
    async function handleEdit(replyId, replyContent) {
        const replyData = {
            id: replyId,
            replyContent: replyContent
        };

        try {
            const response = await fetch('/reply/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(replyData)
            });

            if (response.ok) {
                alert('댓글이 성공적으로 수정되었습니다.');
                location.reload(); // 페이지 새로고침
            } else {
                const errorMessage = await response.text();
                alert(`댓글 수정 실패: ${errorMessage}`);
            }
        } catch (error) {
            alert('댓글 수정 중 오류가 발생했습니다.');
            console.error(error);
        }
    }


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

    // 댓글 수 조회
    const getReplyCount = async (postId) => {
        try {
            const response = await fetch(`/replies/count/${postId}`);
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`댓글 수 조회 실패 (Post ID: ${postId}):`, errorText);
                return 0; // 실패 시 기본값 반환
            }

            const { count } = await response.json(); // JSON 응답에서 count 값 추출
            console.log(`댓글 수 조회 성공 (Post ID: ${postId}):`, count);
            return count;
        } catch (error) {
            console.error(`댓글 수 조회 중 오류 (Post ID: ${postId}):`, error);
            return 0; // 오류 발생 시 기본값 반환
        }
    };

// 댓글 수 업데이트 함수
    const updateReplyCount = async (postId) => {
        try {
            // 댓글 수 가져오기
            const totalCount = await getReplyCount(postId);

            // 댓글 수 표시할 요소 가져오기
            const replyCountElement = document.getElementById("reply-count");

            // 요소가 존재하면 업데이트
            if (replyCountElement) {
                replyCountElement.textContent = totalCount; // 댓글 수 업데이트
                console.log(`댓글 수 업데이트 완료 (Post ID: ${postId}):`, totalCount);
            } else {
                console.error("reply-count 요소를 찾을 수 없습니다.");
            }
        } catch (error) {
            console.error(`댓글 수 업데이트 중 오류 (Post ID: ${postId}):`, error);
        }
    };

// 페이지 로드 시 댓글 수 업데이트 실행
    document.addEventListener("DOMContentLoaded", () => {
        const postIdElement = document.getElementById("post-id");
        const postId = postIdElement ? postIdElement.value : null;

        if (postId) {
            updateReplyCount(postId); // 댓글 수 업데이트 호출
        } else {
            console.error("postId가 없습니다. HTML에 id='post-id' 요소를 추가하세요.");
        }
    });


    // 메서드들을 객체로 반환
    return { write, getList, handleEdit, remove, getReplyCount };
})();
