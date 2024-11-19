document.addEventListener("DOMContentLoaded", function () {
    // 비밀번호 및 비밀번호 확인 입력 필드
    const passwordInput = document.getElementById("password");
    const passwordConfirmInput = document.getElementById("password-confirm");

    // 비밀번호 변경 완료 버튼
    const completeButton = document.querySelector(
        ".reset-password-btn-complete"
    );

    // 비밀번호 유효성 검사 경고 메시지 (6자 이상 경고)
    const passwordWarningMessage = document.querySelector(
        ".reset-password-btn-waring"
    );
    // 비밀번호 일치 여부 경고 메시지
    const passwordWarningMessage2 = document.querySelector(
        ".reset-password-btn-waring2"
    );

    // 비밀번호 보이기/숨기기 버튼들
    const passwordShowBtns = document.querySelectorAll(".password-show-btn");

    // 모달 관련 요소
    const modalContainer = document.querySelector(".modal"); // 모달의 최상위 컨테이너
    const overlay = modalContainer.querySelector(".last-modal"); // 모달의 오버레이 부분
    const modalConfirmButton = modalContainer.querySelector(
        ".alert-btn-complete-1qcb1"
    ); // 모달의 "확인" 버튼

    function validatePasswords() {
        const passwordValue = passwordInput.value.trim();
        const passwordConfirmValue = passwordConfirmInput.value.trim();

        // 초기화
        passwordWarningMessage.style.display = "none";
        passwordWarningMessage2.style.display = "none";
        passwordInput.style.borderColor = "#ccc";
        passwordConfirmInput.style.borderColor = "#ccc";

        if (passwordValue.length < 6) {
            passwordWarningMessage.style.display = "block";
            passwordInput.style.borderColor = "#f05050";
            return false;  // 유효성 실패 시 false 반환
        }

        if (passwordValue !== passwordConfirmValue) {
            passwordWarningMessage2.style.display = "block";
            passwordConfirmInput.style.borderColor = "#f05050";
            return false;  // 비밀번호 불일치 시 false 반환
        }

        return true;  // 유효성 통과 시 true 반환
    }

    // 완료 버튼 클릭 시 비밀번호 유효성 검사 실행
    completeButton.addEventListener("click", function () {
        validatePasswords();
    });

    // 비밀번호 입력 시 경고 메시지 제거 및 테두리 색상 파란색으로 변경
    passwordInput.addEventListener("input", function () {
        if (passwordInput.value.length > 0) {
            passwordInput.classList.remove("warning");
            passwordInput.style.borderColor = "blue"; // 입력 중 파란 테두리
            passwordWarningMessage.style.display = "none"; // 경고 메시지 제거
        }
    });

    // 비밀번호 확인 입력 시 경고 메시지 제거 및 테두리 색상 파란색으로 변경
    passwordConfirmInput.addEventListener("input", function () {
        if (passwordConfirmInput.value.length > 0) {
            passwordConfirmInput.classList.remove("warning");
            passwordConfirmInput.style.borderColor = "blue"; // 입력 중 파란 테두리
            passwordWarningMessage2.style.display = "none"; // 경고 메시지 제거
        }
    });

    // 입력 필드에서 포커스가 없을 때 테두리 색상을 기본 색상으로 변경
    passwordInput.addEventListener("blur", function () {
        if (!passwordInput.classList.contains("warning")) {
            passwordInput.style.borderColor = "#ccc"; // 포커스 해제 시 기본 테두리
        }
    });

    // 비밀번호 확인 필드에서 포커스가 없을 때 테두리 색상을 기본 색상으로 변경
    passwordConfirmInput.addEventListener("blur", function () {
        if (!passwordConfirmInput.classList.contains("warning")) {
            passwordConfirmInput.style.borderColor = "#ccc"; // 포커스 해제 시 기본 테두리
        }
    });

    // 비밀번호 보이기/숨기기 버튼 클릭 이벤트 추가
    passwordShowBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const inputElement = btn.parentElement.querySelector("input"); // 버튼의 부모 요소에서 input 찾기
            togglePasswordVisibility(inputElement, btn); // 비밀번호 보이기/숨기기 토글
        });
    });

    // 비밀번호 보이기/숨기기 토글 함수
    function togglePasswordVisibility(passwordInput, btn) {
        passwordInput.value = passwordInput.value.trim(); // 공백이 포함되어 있으면 공백 제거
        if (passwordInput && passwordInput.type === "password") {
            passwordInput.type = "text"; // 비밀번호 표시
            btn.src =
                "https://accounts-front.stunning.kr/assets/img/login/ico-visible.png"; // 아이콘 변경
        } else if (passwordInput) {
            passwordInput.type = "password"; // 비밀번호 숨기기
            btn.src =
                "https://accounts-front.stunning.kr/assets/img/login/ico-hidden.png"; // 아이콘 변경
        }
    }
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    console.log("UUID:", uuid);  // 확인용 로그

    function resetPassword() {
        const password = passwordInput.value.trim();
        console.log("Sending password reset request:", { uuid, password });

        fetch("/member/password-reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uuid, password })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Response from server:", data);
                if (data.success) {
                    modalContainer.style.display = "flex";  // 모달 표시
                } else {
                    alert(data.message || "비밀번호 변경에 실패했습니다.");
                }
            })
            .catch((error) => console.error("Error:", error));
    }

    completeButton.addEventListener("click", function () {
        if (validatePasswords()) {
            console.log("Password validation passed, attempting reset.");
            resetPassword();  // 비밀번호 리셋 호출
        } else {
            console.warn("Password validation failed.");
        }
    });

    // 모달의 "확인" 버튼 클릭 시 모달창 및 오버레이 숨기기
    modalConfirmButton.addEventListener("click", function () {
        window.location.href = "/member/login";
    });

});

