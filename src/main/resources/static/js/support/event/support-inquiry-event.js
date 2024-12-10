// "지원하기" 버튼 클릭 이벤트
const applyButton = document.getElementById("support-btn");
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

// 게시물 업데이트 및 삭제
const updateButton = document.querySelector("a.go-update");
const deleteButton = document.querySelector("a.go-delete");

if (updateButton) {
    updateButton.addEventListener("click", (e) => {
        const postId = updateButton.dataset.postId;
        console.log(updateButton);
        location.href = `/support/support-update?postId=${postId}`;
    });
}

if (deleteButton) {
    deleteButton.addEventListener("click", (e) => {
        const postId = deleteButton.dataset.postId;
        console.log(deleteButton);
        alert("게시물이 성공적으로 삭제되었습니다.");
        location.href = `/support/support-delete?postId=${postId}`;
    });
}
//
// document.addEventListener("DOMContentLoaded", function () {
//     const goalPoint = parseInt(document.getElementById("goalPointText").dataset.goal, 10);
//     const currentPoint = parseInt(document.getElementById("currentPointText").dataset.current, 10);
//     const memberPoint = parseInt(document.getElementById("memberPointText").dataset.member, 10);
//     const inputPoint = document.getElementById("inputPoint");
//     const confirmButton = document.getElementById("confirmApprove");
//     const errorText = document.getElementById("errorText");
//
//     // 입력 필드 변경 시 검증
//     inputPoint.addEventListener("input", function () {
//         const newPoint = parseInt(inputPoint.value, 10);
//
//         if (isNaN(newPoint) || newPoint < 1) {
//             errorText.textContent = "올바른 금액을 입력해주세요.";
//             errorText.hidden = false;
//             confirmButton.disabled = true;
//             return;
//         }
//
//         // 목표 금액 초과 여부
//         if (newPoint + currentPoint > goalPoint) {
//             errorText.textContent = "후원 금액이 목표 금액을 초과합니다.";
//             errorText.hidden = false;
//             confirmButton.disabled = true;
//         }
//         // 보유 포인트 초과 여부
//         else if (newPoint > memberPoint) {
//             errorText.textContent = "보유 포인트가 부족합니다.";
//             errorText.hidden = false;
//             confirmButton.disabled = true;
//         }
//         // 조건 만족
//         else {
//             errorText.hidden = true;
//             confirmButton.disabled = false;
//         }
//     });
// });
//
//
