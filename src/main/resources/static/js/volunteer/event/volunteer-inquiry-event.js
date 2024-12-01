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

const updateButton = document.querySelector("a.go-update");
const deleteButton = document.querySelector("a.go-delete");

updateButton.addEventListener("click", (e) => {
    location.href = `/volunteer/volunteer-update?postId=${volunteer.id}`;
});

deleteButton.addEventListener("click", (e) => {
    alert("게시물이 성공적으로 삭제되었습니다.")
    location.href = `/volunteer/volunteer-delete?postId=${volunteer.id}`;
})