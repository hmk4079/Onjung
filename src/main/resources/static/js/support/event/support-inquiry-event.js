// "후원" 버튼 클릭 이벤트
const applyButton = document.getElementById("support-btn");
const approveModal = document.querySelector(".approvemodal");

applyButton.addEventListener("click", () => {
    approveModal.style.display = "flex";
});

// confirmApproveButton.addEventListener("click", () => {
//     approveModal.style.display = "none";
//     alert("성공적으로 후원되었습니다.");
// });

// 모달 바깥을 클릭하여 닫는 이벤트
document.getElementById("confirmApprove").addEventListener("click", function (event) {
    event.preventDefault(); // 폼 제출 방지

    const goalPoint = parseInt(document.getElementById("goalPointText").innerText, 10);
    const currentPoint = parseInt(document.getElementById("currentPointText").innerText, 10);
    const memberPoint = parseInt(document.getElementById("memberPointText").innerText, 10);
    const inputPointElement = document.querySelector("input[name='currentPoint']");
    const inputPoint = parseInt(inputPointElement.value, 10);

    const confirmButton = document.getElementById("confirmApprove");

    // 후원할 포인트 값이 유효한지 확인
    if (isNaN(inputPoint) || inputPoint <= 0) {
        alert("후원할 포인트를 올바르게 입력해주세요.");
        confirmButton.disabled = true;
        confirmButton.classList.add('disable');
        return;
    }

    // 목표 포인트를 초과하는 경우
    if ((currentPoint + inputPoint) > goalPoint) {
        alert("목표 포인트보다 초과되는 후원 포인트 입니다!");
        confirmButton.disabled = true;
        confirmButton.classList.add('disable');
        return;
    }

    // 보유 포인트를 초과하는 경우
    if (inputPoint > memberPoint) {
        alert("보유 포인트보다 높습니다!");
        confirmButton.disabled = true;
        confirmButton.classList.add('disable');
        return;
    }else {
        // 조건을 만족하는 경우 버튼 활성화 및 폼 제출
        confirmButton.disabled = false;
        confirmButton.classList.remove('disable');
        alert("성공적으로 후원되었습니다!");
        inputPointElement.closest("form").submit();
    }
});
