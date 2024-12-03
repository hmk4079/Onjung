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

// 댓글 수정 버튼 클릭 시 핸들러 함수
function handleModifyButtonClick(postId, reply) {
    const listItem = document.querySelector(`.edit-button[data-reply-id="${reply.id}"]`).closest('li');
    if (!listItem) {
        console.error(`listItem not found for reply.id: ${reply.id}`);
        return;
    }

    const commentTxt = listItem.querySelector(`.reply-content-${reply.id}`);
    const modifyButton = listItem.querySelector('.edit-button');
    const modifyButtonImg = modifyButton.querySelector('img');

    if (!commentTxt) {
        console.error(`commentTxt not found for reply.id: ${reply.id}`);
        return;
    }

    if (!modifyButton) {
        console.error(`modifyButton not found in listItem.`);
        return;
    }


    const currentState = modifyButton.getAttribute('data-state');

    if (currentState === 'modify') {
        if (!commentTxt) {
            console.error(`commentTxt not found for reply.id: ${reply.id}`);
            return;
        }

        const originalContent = commentTxt.textContent;
        commentTxt.setAttribute('data-original-content', originalContent);

        const textarea = document.createElement('textarea');
        textarea.value = originalContent;
        textarea.classList.add('modify-comment');

        commentTxt.innerHTML = '';
        commentTxt.appendChild(textarea);

        modifyButtonImg.src = '/images/save-icon.png';
        modifyButtonImg.alt = '저장 아이콘';
        modifyButton.setAttribute('data-state', 'save');
    } else if (currentState === 'save') {
        const textarea = commentTxt.querySelector('textarea');
        if (!textarea) {
            console.error("Textarea not found");
            return;
        }

        const updatedContent = textarea.value.trim();
        const originalContent = commentTxt.getAttribute('data-original-content');

        if (updatedContent === "") {
            alert("댓글 내용을 입력해주세요.");
            return;
        }

        if (updatedContent === originalContent) {
            alert("수정된 내용이 없습니다.");
            commentTxt.innerHTML = originalContent;
            modifyButtonImg.src = '/images/modify-icon.png';
            modifyButtonImg.alt = '수정 아이콘';
            modifyButton.setAttribute('data-state', 'modify');
            return;
        }

        // 댓글 수정 요청 로직 (추후 서버 통신 추가)
        console.log("수정된 내용:", updatedContent);

        // 성공 시 UI 업데이트
        commentTxt.innerHTML = updatedContent;
        modifyButtonImg.src = '/images/modify-icon.png';
        modifyButtonImg.alt = '수정 아이콘';
        modifyButton.setAttribute('data-state', 'modify');
    }
}
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


// 댓글 수정 버튼 클릭 시 핸들러 함수
// const replyService = (() => {
//     // 댓글 수정
//     const update = async (id, memberId, newContent) => {
//         const url = `/reply/replies-update/${memberId}`;
//
//         const replyData = {
//             replyContent: newContent,
//             memberId: memberId
//         };
//
//         try {
//             console.log("댓글 수정 요청 시작(service):", { id, memberId, newContent });
//
//             const response = await fetch(url, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 credentials: "include",
//                 body: JSON.stringify(replyData),
//             });
//
//             console.log(`댓글 수정 응답 상태(service): ${response.status}`);
//             const contentType = response.headers.get("Content-Type");
//             console.log(`댓글 수정 Content-Type(service): ${contentType}`);
//
//             if (!response.ok) {
//                 console.error("댓글 수정 실패(service):", response.statusText);
//                 return false;
//             }
//
//             if (response.status === 204) {
//                 console.log("댓글 수정 성공(service) - 응답 본문 없음");
//                 return { replyContent: newContent };
//             }
//
//             if (contentType && contentType.includes("application/json")) {
//                 const updatedReply = await response.json();
//                 console.log("댓글 수정 성공(service):", updatedReply);
//                 return updatedReply;
//             }
//
//             console.error("댓글 수정 실패(service) - 예상치 못한 응답");
//             return false;
//         } catch (error) {
//             console.error("댓글 수정 중 오류(service):", error);
//             return false;
//         }
//     };
//
//     return { update };
// })();

