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
            const isSuccess = await replyService.write({ postId, replyContent });

            if (isSuccess) {
                commentTextarea.value = ""; // 입력 필드 초기화
                alert("댓글 작성이 완료되었습니다.");

                // 댓글 수 갱신
                await replyService.updateReplyCount(postId);

                // 댓글 목록 새로고침
                await loadComments(1, postId);
            } else {
                alert("댓글 작성에 실패했습니다.");
            }
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

let originalText = ``;
let updateFlag = false;

commentSection.addEventListener("click", async (e) => {
    const id = e.target.dataset.id; // replyId 대신 id 사용

    console.log("추출된 id:", id);

    if (!id) {
        console.error("id가 없습니다. data-id 속성을 확인하세요.", e.target);
        return;
    }

    if (e.target.classList.contains("edit-button")) {
        if (updateFlag) {
            alert("이미 수정 중입니다!");
            return;
        }

        updateFlag = true;

        const replyContent = document.querySelector(`div.reply-content-${id}`);
        if (!replyContent) {
            console.error(`reply-content-${id} 요소를 찾을 수 없습니다.`);
            return;
        }

        const textarea = document.createElement("textarea");
        textarea.value = replyContent.innerText;
        textarea.className = `reply-content-${id}`;

        const saveButton = document.createElement("button");
        saveButton.innerText = "저장";
        saveButton.className = "save";
        saveButton.dataset.id = id;

        const cancelButton = document.createElement("button");
        cancelButton.innerText = "취소";
        cancelButton.className = "cancel";
        cancelButton.dataset.id = id;

        replyContent.replaceWith(textarea);
        e.target.replaceWith(saveButton);
        document.querySelector(`button.delete[data-id="${id}"]`)?.replaceWith(cancelButton);

    } else if (e.target.classList.contains("save")) {
        const textarea = document.querySelector(`textarea.reply-content-${id}`);
        if (!textarea) {
            console.error("수정 중인 텍스트 영역을 찾을 수 없습니다.");
            return;
        }

        const replyContent = document.createElement("div");
        replyContent.className = `reply-content-${id}`;
        replyContent.innerText = textarea.value;

        textarea.replaceWith(replyContent);

        const editButton = document.createElement("button");
        editButton.innerText = "수정";
        editButton.className = "edit-button";
        editButton.dataset.id = id;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "삭제";
        deleteButton.className = "delete";
        deleteButton.dataset.id = id;

        e.target.replaceWith(editButton);
        document.querySelector(`button.cancel[data-id="${id}"]`)?.replaceWith(deleteButton);

        // 서버에 수정 내용 전송
        await replyService.update({ id: id, replyContent: textarea.value });
        updateFlag = false;

    } else if (e.target.classList.contains("cancel")) {
        const textarea = document.querySelector(`textarea.reply-content-${id}`);
        if (!textarea) {
            console.error("취소하려는 텍스트 영역을 찾을 수 없습니다.");
            return;
        }

        const replyContent = document.createElement("div");
        replyContent.className = `reply-content-${id}`;
        replyContent.innerText = originalText;

        textarea.replaceWith(replyContent);

        const editButton = document.createElement("button");
        editButton.innerText = "수정";
        editButton.className = "edit-button";
        editButton.dataset.id = id;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "삭제";
        deleteButton.className = "delete";
        deleteButton.dataset.id = id;

        e.target.replaceWith(editButton);
        document.querySelector(`button.save[data-id="${id}"]`)?.replaceWith(deleteButton);

        updateFlag = false;

    } else if (e.target.classList.contains("delete")) {
        const isDeleted = await replyService.remove(id);

        if (isDeleted) {
            alert("댓글이 삭제되었습니다.");
            await loadComments(1, postId); // 댓글 목록 새로고침
        } else {
            alert("댓글 삭제에 실패했습니다.");
        }
    }
});
