document.addEventListener("DOMContentLoaded", () => {
    const postId = document.querySelector(".layout")?.getAttribute("data-post-id");
    if (!postId) return;

    globalThis.page = 1;
    globalThis.loadingFlag = false;

    const writeButton = document.querySelector("#write");
    const replyContent = document.querySelector("#reply-content");

    // 댓글 목록 불러오기 함수
    function loadReplies(page = 1) {
        replyService.getList(page, postId, (data) => {
            if (data && data.pagination) {
                showList(data);
                updateReplyCount(postId);
            }
        });
    }

    // 댓글 작성 이벤트
    writeButton.addEventListener("click", async () => {
        if (!replyContent.value.trim()) {
            alert("댓글 내용을 입력하세요.");
            return;
        }

        await replyService.write({
            memberId: memberId,
            replyContent: replyContent.value.trim(),
            postId: postId
        });

        replyContent.value = ""; // 작성 완료 후 입력 필드 초기화
        loadReplies(globalThis.page);
    });

    // 댓글 수정, 삭제, 취소 버튼 이벤트
    replyLayout.addEventListener("click", async (e) => {
        const replyId = e.target.classList[1]?.replace("reply-id-", "");

        if (!replyId) return;

        const action = e.target.classList[0];
        const replyContentDiv = document.querySelector(`div.reply-content-${replyId}`);

        if (action === "update") {
            // 댓글 수정 시작
            if (globalThis.updateFlag) {
                alert("이미 수정 중입니다.");
                return;
            }

            globalThis.updateFlag = true;
            const originalText = replyContentDiv.innerText;
            const textarea = document.createElement("textarea");
            const updateOkButton = createButton("수정 완료", `update-ok reply-id-${replyId}`);
            const cancelButton = createButton("취소", `cancel reply-id-${replyId}`);
            const deleteButton = document.querySelector(`button.delete.reply-id-${replyId}`);

            textarea.value = originalText;
            textarea.className = `reply-content-${replyId}`;

            replyContentDiv.replaceWith(textarea);
            e.target.replaceWith(updateOkButton);
            deleteButton.replaceWith(cancelButton);
        } else if (action === "update-ok") {
            // 댓글 수정 완료
            const textarea = document.querySelector(`textarea.reply-content-${replyId}`);
            await replyService.update({ id: replyId, replyContent: textarea.value.trim() });
            globalThis.updateFlag = false;
            loadReplies(globalThis.page);
        } else if (action === "cancel") {
            // 댓글 수정 취소
            loadReplies(globalThis.page);
            globalThis.updateFlag = false;
        } else if (action === "delete") {
            // 댓글 삭제
            await replyService.remove(replyId);
            loadReplies(globalThis.page);
        }
    });

    // 더 보기 버튼 이벤트
    moreButton.addEventListener("click", () => {
        replyService.getList(++globalThis.page, postId, showListMore);
    });

    // 무한 스크롤 이벤트
    window.addEventListener("scroll", () => {
        if (globalThis.loadingFlag) return;

        if ((window.innerHeight + window.scrollY - 10) >= document.body.offsetHeight) {
            globalThis.loadingFlag = true;
            replyService.getList(++globalThis.page, postId, showListScroll).finally(() => {
                globalThis.loadingFlag = false;
            });
        }
    });

    // 댓글 수 업데이트 함수
    async function updateReplyCount(postId) {
        try {
            const totalCount = await replyService.getReplyCount(postId);
            document.querySelector("#total-reply-count").textContent = totalCount;
            document.querySelector("#comment-count").textContent = totalCount;
        } catch (error) {
            console.error("댓글 수 업데이트 중 오류:", error);
        }
    }

    // 버튼 생성 함수
    function createButton(text, className) {
        const button = document.createElement("button");
        button.innerText = text;
        button.className = className;
        return button;
    }

    // 초기 댓글 목록 로드
    loadReplies();
});
