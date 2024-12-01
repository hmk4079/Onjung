document.addEventListener("DOMContentLoaded", () => {
    const writeButton = document.querySelector("#write-button");
    const commentTextarea = document.getElementById("reply-content");
    const postIdElement = document.getElementById("post-id");
    const postId = postIdElement ? postIdElement.value : null;

    if (!postId) {
        console.error("postId가 없습니다. HTML에 id='post-id' 요소를 추가하세요.");
        return;
    }

    // 댓글 작성 이벤트 등록
    writeButton.addEventListener("click", async () => {
        const replyContent = commentTextarea.value.trim();

        if (!replyContent) {
            alert("댓글 내용을 입력하세요.");
            return;
        }

        try {
            console.log("댓글 작성 버튼 클릭 이벤트 실행");
            await replyService.write({ postId, replyContent });
            commentTextarea.value = ""; // 입력 필드 초기화
            alert("댓글 작성이 완료되었습니다.");
            loadComments(1, postId); // 댓글 새로고침 (layout.js에 있는 함수 호출)
        } catch (error) {
            console.error("댓글 작성 중 오류:", error);
            alert("댓글 작성에 실패했습니다.");
        }
    });

    // textarea 입력 이벤트 처리
    const submitButton = document.getElementById("write-button");
    commentTextarea.addEventListener("input", () => {
        submitButton.disabled = commentTextarea.value.trim() === "";
    });
});
