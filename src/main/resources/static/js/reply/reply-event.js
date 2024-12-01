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


// 1202-0730 이부분 작업 중이였음
let originalText = ``;
let updateFlag = false;

commentSection.addEventListener("click", async (e) => {
    // 이미 수정 중인 경우
    if (updateFlag && e.target.classList[0] === "edit") {
        alert("이미 수정 중입니다!");
        return;
    }

    const replyId = e.target.classList[1].replace("reply-id-", "");

    // 수정 버튼 클릭 시
    if (e.target.classList[0] === "edit") {
        updateFlag = true;

        const replyContent = document.querySelector(`div.reply-content-${replyId}`);
        const textarea = document.createElement("textarea");
        const saveButton = document.createElement("button");
        const cancelButton = document.createElement("button");
        const deleteButton = document.querySelector(`button.delete.reply-id-${replyId}`);

        // 기존 내용 저장
        originalText = replyContent.innerText;

        // 수정 완료 버튼 생성
        saveButton.innerText = "저장";
        saveButton.className = "save";
        saveButton.classList.add(`reply-id-${replyId}`);

        // 취소 버튼 생성
        cancelButton.innerText = "취소";
        cancelButton.className = "cancel";
        cancelButton.classList.add(`reply-id-${replyId}`);

        // 텍스트박스 설정
        textarea.value = replyContent.innerText;
        textarea.className = `reply-content-${replyId}`;

        // 기존 요소 교체
        replyContent.replaceWith(textarea);
        e.target.replaceWith(saveButton);
        deleteButton.replaceWith(cancelButton);

    } else if (e.target.classList[0] === "save") { // 저장 버튼 클릭 시
        const textarea = document.querySelector(`textarea.reply-content-${replyId}`);
        const replyDiv = document.createElement("div");
        const cancelButton = document.querySelector(`button.cancel.reply-id-${replyId}`);
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        // 수정된 내용 적용
        replyDiv.className = `reply-content-${replyId}`;
        replyDiv.innerText = textarea.value;

        textarea.replaceWith(replyDiv);

        // 수정 버튼 재생성
        editButton.innerText = "수정";
        editButton.className = "edit";
        editButton.classList.add(`reply-id-${replyId}`);

        e.target.replaceWith(editButton);

        // 삭제 버튼 재생성
        deleteButton.innerText = "삭제";
        deleteButton.className = "delete";
        deleteButton.classList.add(`reply-id-${replyId}`);

        cancelButton.replaceWith(deleteButton);

        // 서버에 수정 내용 전송
        replyService.update({ id: replyId, replyContent: textarea.value });
        updateFlag = false;

    } else if (e.target.classList[0] === "cancel") { // 취소 버튼 클릭 시
        const textarea = document.querySelector(`textarea.reply-content-${replyId}`);
        const replyDiv = document.createElement("div");
        const saveButton = document.querySelector(`button.save.reply-id-${replyId}`);
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        // 원래 내용 복원
        replyDiv.className = `reply-content-${replyId}`;
        replyDiv.innerText = originalText;

        textarea.replaceWith(replyDiv);

        // 수정 버튼 재생성
        editButton.innerText = "수정";
        editButton.className = "edit";
        editButton.classList.add(`reply-id-${replyId}`);

        saveButton.replaceWith(editButton);

        // 삭제 버튼 재생성
        deleteButton.innerText = "삭제";
        deleteButton.className = "delete";
        deleteButton.classList.add(`reply-id-${replyId}`);

        e.target.replaceWith(deleteButton);

        updateFlag = false;

    } else if (e.target.classList[0] === "delete") { // 삭제 버튼 클릭 시
        await replyService.remove(replyId);
        await replyService.getList(globalThis.page, postId, showList);
    }
});


