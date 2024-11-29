// "지원하기" 버튼 클릭 이벤트
const applyButton = document.getElementById("apply-btn");
const approveModal = document.querySelector(".approvemodal");
const confirmApproveButton = document.getElementById("confirmApprove");

applyButton.addEventListener("click", () => {
    approveModal.style.display = "flex";
});

confirmApproveButton.addEventListener("click", () => {
    approveModal.style.display = "none";
    alert("봉사 신청이 완료되었습니다.");
});

// 모달 바깥을 클릭하여 닫는 이벤트
document.querySelector('.last-modal').addEventListener('click', () => {
    approveModal.style.display = 'none';
});

// "신고하기" 모달
const modal = document.getElementById("profileModal");
const reportBtn = document.getElementById("report-btn");
const span = document.getElementsByClassName("close")[0];

reportBtn.onclick = () => {
    modal.style.display = "block";
};

span.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// 댓글 작성 이벤트
const commentTextarea = document.getElementById("comment-content");
const submitButton = document.querySelector(".submit-comment-button");

commentTextarea.addEventListener("input", () => {
    submitButton.disabled = commentTextarea.value.trim() === "";
});

submitButton.addEventListener("click", () => {
    const commentText = commentTextarea.value.trim();
    if (commentText) {
        alert(`댓글이 작성되었습니다: ${commentText}`);
        commentTextarea.value = "";
        submitButton.disabled = true;
    }
});
