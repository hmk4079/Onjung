const writeButton = document.querySelector("#write");
const replyContent = document.querySelector("#reply-content");

// replyService.getList(postId);
replyService.getList(1, postId, showList);
globalThis.page = 1;
// replyService.getList(globalThis.page, postId, showListMore);
// replyService.getList(postId);
replyService.getList(globalThis.page, postId, showListScroll);

// replyPaging.addEventListener("click", (e) => {
//     e.preventDefault();
//     if(e.target.tagName === "A") {
//         globalThis.page = e.target.getAttribute("href");
//         replyService.getList(globalThis.page, postId, showList);
//     }
// });

writeButton.addEventListener("click", async (e) => {
    await replyService.write({memberId: memberId, replyContent: replyContent.value, postId: postId});
    await replyService.getList(globalThis.page, postId, showList);
});

let originalText = ``;
let updateFlag = false;
replyLayout.addEventListener("click", async (e) => {
    if(updateFlag && e.target.classList[0] === "update") {
        alert("이미 수정중이잖아요 ㅎㅎ");
        return;
    }
    const replyId = e.target.classList[1].replace("reply-id-", "");

    if(e.target.classList[0] === "update") {
        updateFlag = true;
        const replyContent = document.querySelector(`div.reply-content-${replyId}`);
        const textarea = document.createElement("textarea");
        const updateOkButton = document.createElement("button")
        const cancelButton = document.createElement("button")
        const deleteButton = document.querySelector(`button.delete.reply-id-${replyId}`);

        originalText = replyContent.innerText;

        updateOkButton.innerText = "수정 완료";
        updateOkButton.className = "update-ok";
        updateOkButton.classList.add(`reply-id-${replyId}`);

        cancelButton.innerText = "취소"
        cancelButton.className = "cancel";
        cancelButton.classList.add(`reply-id-${replyId}`);

        textarea.value = replyContent.innerText;
        textarea.className = `reply-content-${replyId}`

        replyContent.replaceWith(textarea);
        e.target.replaceWith(updateOkButton);
        deleteButton.replaceWith(cancelButton);

    } else if (e.target.classList[0] === "update-ok"){
        const textarea = document.querySelector(`textarea.reply-content-${replyId}`)
        const replyDiv = document.createElement("div");
        const cancelButton = document.querySelector(`button.cancel.reply-id-${replyId}`);
        const updateButton = document.createElement("button")
        const deleteButton = document.createElement("button")

        replyDiv.className = `reply-content-${replyId}`
        replyDiv.innerText = textarea.value;

        textarea.replaceWith(replyDiv);

        updateButton.innerText = "수정";
        updateButton.className = "update";
        updateButton.classList.add(`reply-id-${replyId}`);

        e.target.replaceWith(updateButton);

        deleteButton.innerText = "삭제";
        deleteButton.className = "delete";
        deleteButton.classList.add(`reply-id-${replyId}`);

        cancelButton.replaceWith(deleteButton);

        replyService.update({id: replyId, replyContent: textarea.value});
        updateFlag = false;

    } else if (e.target.classList[0] === "cancel") {
        const textarea = document.querySelector(`textarea.reply-content-${replyId}`)
        const replyDiv = document.createElement("div");
        const updateOkButton = document.querySelector(`button.update-ok.reply-id-${replyId}`);
        const updateButton = document.createElement("button")
        const deleteButton = document.createElement("button")

        replyDiv.className = `reply-content-${replyId}`;
        replyDiv.innerText = originalText;

        textarea.replaceWith(replyDiv);

        updateButton.innerText = "수정";
        updateButton.className = "update";
        updateButton.classList.add(`reply-id-${replyId}`);

        updateOkButton.replaceWith(updateButton);

        deleteButton.innerText = "삭제";
        deleteButton.className = "delete";
        deleteButton.classList.add(`reply-id-${replyId}`);

        e.target.replaceWith(deleteButton);
        updateFlag = false;
    } else if (e.target.classList[0] === "delete") {
        await replyService.remove(replyId);
        await replyService.getList(globalThis.page, postId, showList);
    }
});

moreButton.addEventListener("click", (e) => {
    replyService.getList(++globalThis.page, postId, showListMore);
});

globalThis.loadingFlag = false;
window.addEventListener("scroll", (e) => {
    // console.log(window.innerHeight + window.scrollY)
    // console.log(document.body.offsetHeight)
    console.log(loadingFlag);
    if(loadingFlag){
        globalThis.loadingFlag = false;
        return;
    }

    if((window.innerHeight + window.scrollY - 10) >= document.body.offsetHeight) {
        globalThis.loadingFlag = true;
        replyService.getList(++globalThis.page, postId, showListScroll);
    }
})












