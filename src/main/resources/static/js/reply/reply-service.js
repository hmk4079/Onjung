// 댓글 가져오기 함수
function fetchReplies(postId, page) {
    const url = `/community/${postId}/${page}`;
    return fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (response.ok && response.headers.get('Content-Type')?.includes('application/json')) {
                return response.json();
            } else {
                throw new Error(`댓글 가져오기 실패: ${response.status}`);
            }
        })
        .catch(error => {
            console.error("댓글 가져오기 중 오류 발생:", error);
            alert("댓글을 불러오는 데 문제가 발생했습니다.");
            return null;
        });
}

// 댓글 작성하기 함수
function addReply(postId, replyData) {
    const url = `/community/write`;
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            postId: postId,
            replyContent: replyData.replyContent,
            memberId: replyData.memberId,
            replyStatus: "VISIBLE" // 기본 상태 설정
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error("로그인이 필요합니다.");
            } else {
                throw new Error(`댓글 추가 실패: ${response.status}`);
            }
        })
        .catch(error => {
            console.error("댓글 추가 중 오류 발생:", error);
            alert("댓글을 추가하는 데 문제가 발생했습니다.");
            return null;
        });
}

// 댓글 수정하기 함수
function updateReply(replyId, replyData) {
    const url = `/community/replies-update/${replyId}`;
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            replyContent: replyData.replyContent,
            memberId: replyData.memberId
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 403) {
                throw new Error("수정 권한이 없습니다.");
            } else if (response.status === 404) {
                throw new Error("댓글을 찾을 수 없습니다.");
            } else {
                throw new Error(`댓글 수정 실패: ${response.status}`);
            }
        })
        .catch(error => {
            console.error("댓글 수정 중 오류 발생:", error);
            alert("댓글을 수정하는 데 문제가 발생했습니다.");
            return null;
        });
}

// 댓글 삭제하기 함수
function deleteReply(replyId) {
    const url = `/community/replies-delete/${replyId}`;
    return fetch(url, {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(response => {
            if (response.ok) {
                return true;
            } else if (response.status === 403) {
                throw new Error("삭제 권한이 없습니다.");
            } else if (response.status === 404) {
                throw new Error("댓글을 찾을 수 없습니다.");
            } else {
                throw new Error(`댓글 삭제 실패: ${response.status}`);
            }
        })
        .catch(error => {
            console.error("댓글 삭제 중 오류 발생:", error);
            alert("댓글을 삭제하는 데 문제가 발생했습니다.");
            return false;
        });
}

    // // 댓글 수 조회
    // function getReplyCount = (postId) => {
    //     try {
    //         const response = await fetch(`/replies/count/${postId}`);
    //         if (!response.ok) return 0;
    //         const { count } = await response.json();
    //         return count;
    //     } catch (error) {
    //         console.error("댓글 수 조회 중 오류:", error);
    //         return 0;
    //     }
    // };

    // // 댓글 수 업데이트
    // const updateReplyCount = async (postId) => {
    //     try {
    //         const totalCount = await getReplyCount(postId);
    //         const replyCountElement = document.getElementById("reply-count");
    //         if (replyCountElement) replyCountElement.textContent = ` ${totalCount}`;
    //     } catch (error) {
    //         console.error("댓글 수 갱신 중 오류:", error);
    //     }
    // };