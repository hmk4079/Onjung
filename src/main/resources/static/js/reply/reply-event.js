document.addEventListener("DOMContentLoaded", () => {
    const writeButton = document.querySelector("#write-button");
    const commentTextarea = document.getElementById("reply-content");
    const postId = document.getElementById("post-id").value;

    const postIdElement = document.getElementById("post-id");
    if (!postIdElement || !postIdElement.value) {
        console.error("postId가 없습니다. HTML에 data-post-id 속성을 추가하세요.");
        console.log("postId 요소: ", postIdElement);
        return;
    }

    writeButton.addEventListener("click", async () => {
        const replyContent = commentTextarea.value.trim();

        if (!replyContent) {
            alert("댓글 내용을 입력하세요.");
            return;
        }

        try {
            await replyService.write({ postId, replyContent });
            commentTextarea.value = ""; // 입력 필드 초기화
            alert("댓글 작성이 완료되었습니다.");
            loadComments(); // 댓글 새로고침
        } catch (error) {
            console.error("댓글 작성 중 오류:", error);
            alert("댓글 작성에 실패했습니다.");
        }
    });

    function loadComments() {
        // 댓글 새로고침 로직
        console.log("댓글 새로고침 실행");
        replyService.getList(postId).then(renderComments).catch(console.error);
    }

});