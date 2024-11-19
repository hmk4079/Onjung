document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.querySelector("#chk-agree");
    const completeButton = document.querySelector(".register-btn-complete");

    // 이메일 관련 요소들
    const emailInput = document.getElementById("email");
    const sendAuthButton = document.querySelector(".button-btn-send");
    const emailCodeInput = document.getElementById("email-code");
    const emailCodeBox = document.querySelector(".register-email-code-box");
    const emailCountdownTimer = document.getElementById("countdown-timer");
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net)$/;

    // 전화번호 관련 요소들
    const phoneInput = document.getElementById("phone-number");
    const sendPhoneAuthButton = document.querySelector(".button-btn-send-phone");
    const phoneCodeInput = document.getElementById("phone-code");
    const phoneCodeBox = document.querySelector(".register-phone-code-box");
    const phoneCountdownTimer = document.getElementById("countdown-timer-phone");
    const phoneRegex = /^[0-9]{3}[0-9]{4}[0-9]{4}$/;

    // 비밀번호 관련 요소들
    const passwordInput = document.getElementById("password");
    const passwordConfirmInput = document.getElementById("password-confirm");
    const passwordWarningMessage = document.querySelector(".password-warning-msg");
    const passwordWarningMessage2 = document.querySelector(".password-warning-msg2");
    const passwordShowBtns = document.querySelectorAll(".password-show-btn");
    const checkboxWarningMessage = document.querySelector(".warning-msg2");

    // 추가된 버튼 요소들
    const confirmPhoneButton = document.querySelector(
        ".register-phone-code-box .button-btn-send-phone"
    );
    const confirmButton = document.querySelector(
        ".register-email-code-box .button-btn-send"
    );

    let emailTimerInterval;
    let phoneTimerInterval;
    let isEmailCodeSent = false;
    let isPhoneCodeSent = false;

    // 인증번호 입력란 초기 숨김
    emailCodeBox.style.display = "none";
    phoneCodeBox.style.display = "none";



    // 전화번호 인증번호 발송 로직
    sendPhoneAuthButton.addEventListener("click", async function () {
        const phoneValue = phoneInput.value.trim();

        if (!phoneRegex.test(phoneValue)) {
            showWarningMessage("전화번호 형식이 올바르지 않습니다.", phoneInput);
            phoneInput.classList.add("warning");
            return;
        }

        try {
            const response = await fetch("/send-auth-code", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ phoneNumber: phoneValue }),
            });

            if (response.ok) {
                showSuccessMessage("인증 번호가 발송되었습니다.", phoneInput);
                phoneCodeBox.style.display = "block";
                startCountdown(phoneCountdownTimer, 10 * 60, 'phone');
                isPhoneCodeSent = true;
                sendPhoneAuthButton.textContent = "재전송";
            } else {
                throw new Error("인증번호 전송 실패");
            }
        } catch (error) {
            showWarningMessage("인증번호 전송에 실패했습니다.", phoneInput);
        }
    });

    phoneInput.addEventListener("input", function () {
        const phoneValue = phoneInput.value.trim();
        const successMessage = document.querySelector(".desc-span.success-msg");
        const warningMessage = document.querySelector(".desc-span.warning-msg");

        // 전화번호 값이 변경될 때 인증번호 입력란을 숨기고 초기화
        phoneCodeBox.style.display = "none"; // 인증번호 입력란 숨기기
        phoneCodeInput.value = ""; // 인증번호 입력란 초기화
        phoneCountdownTimer.style.display = "none"; // 타이머 숨기기
        clearInterval(phoneTimerInterval); // 타이머 초기화
        if (warningMessage) warningMessage.style.display = "none";

        // 전화번호 값이 없을 경우
        if (phoneValue === "") {
            phoneInput.classList.remove("success-sign", "warning");
            phoneInput.style.border = "1px solid #ccc"; // 기본 테두리 색상
            phoneInput.style.outline = ""; // 기본 아웃라인
            sendPhoneAuthButton.classList.remove("button-send-phone-active");

            // 성공 및 경고 메시지 숨기기
            if (successMessage) successMessage.style.display = "none";
            if (warningMessage) warningMessage.style.display = "none";
        } else {
            sendPhoneAuthButton.classList.add("button-send-phone-active"); // 인증 버튼 활성화
            phoneInput.classList.remove("warning");
            phoneInput.style.borderColor = "blue"; // 포커스 색상

            if (successMessage) successMessage.style.display = "none";
        }
    });

    // 전화번호 인증 완료 버튼 클릭 로직
    confirmPhoneButton.addEventListener("click", async function () {
        if (isPhoneCodeSent) {
            const inputCode = phoneCodeInput.value.trim();

            if (inputCode === "") {
                showWarningMessage("인증번호를 입력해 주세요.", phoneCodeInput);
                return;
            }

            try {
                const response = await fetch("/verify-auth-code", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams({
                        phoneNumber: phoneInput.value,
                        authCode: inputCode,
                    }),
                });

                const result = await response.text();
                if (result === "인증 성공") {
                    clearInterval(phoneTimerInterval);
                    showSuccessMessage("인증되었습니다.", phoneCodeInput);
                } else {
                    showWarningMessage("인증번호가 일치하지 않습니다.", phoneCodeInput);
                }
            } catch (error) {
                showWarningMessage("인증 실패. 다시 시도해 주세요.", phoneCodeInput);
            }
        }
    });

    // 전화번호 인증 번호 입력 시 인증 완료 버튼 활성화
    phoneCodeInput.addEventListener("input", function () {
        const phoneCodeValue = phoneCodeInput.value.trim();

        if (phoneCodeValue.length > 0) {
            confirmPhoneButton.classList.add("button-send-phone-active"); // 인증 완료 버튼 활성화
            confirmPhoneButton.style.cursor = "pointer"; // 커서 스타일 변경
        } else {
            confirmPhoneButton.classList.remove("button-send-phone-active"); // 입력값이 없으면 비활성화
            confirmPhoneButton.style.cursor = "default";
        }
    });

    // 이메일 인증번호 발송 로직 추가
    sendAuthButton.addEventListener("click", async function () {
        const emailValue = emailInput.value.trim();
        const loadingImg = document.querySelector(".loading-img");


        if (!emailRegex.test(emailValue)) {
            showWarningMessage("이메일 형식이 올바르지 않습니다.", emailInput);
            emailInput.classList.add("warning");
            return;
        }

        try {
            loadingImg.style.display = "inline-block";


            const response = await fetch("/send-email-auth-code", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ email: emailValue }),
            });

            if (response.ok) {
                showSuccessMessage("인증 번호가 발송되었습니다.", emailInput);
                emailCodeBox.style.display = "block";
                startCountdown(emailCountdownTimer, 10 * 60, 'email');
                isEmailCodeSent = true;
                sendAuthButton.textContent = "재전송";
                loadingImg.style.display = "none";

            } else {
                throw new Error("인증번호 전송 실패");
            }
        } catch (error) {
            showWarningMessage("인증번호 전송에 실패했습니다.", emailInput);
        }
    });

    // 이메일 입력 변경 시 처리
    emailInput.addEventListener("input", function () {
        const emailValue = emailInput.value.trim();
        const successMessage = emailInput
            .closest(".register-with-btn-box")
            .querySelector(".desc-span.success-msg");
        const warningMessage = emailInput
            .closest(".register-with-btn-box")
            .querySelector(".desc-span.warning-msg");

        // 이메일 값이 변경될 때 인증번호 입력란을 숨기고 초기화
        emailCodeBox.style.display = "none"; // 인증번호 입력란 숨기기
        emailCodeInput.value = ""; // 인증번호 입력란 초기화
        emailCountdownTimer.style.display = "none"; // 타이머 숨기기
        clearInterval(emailTimerInterval); // 타이머 초기화
        if (warningMessage) warningMessage.style.display = "none";

        // 이메일 값이 없을 경우
        if (emailValue === "") {
            emailInput.classList.remove("success-sign", "warning");
            emailInput.style.border = "1px solid #ccc"; // 기본 테두리 색상
            emailInput.style.outline = ""; // 기본 아웃라인
            sendAuthButton.classList.remove("button-send-active");

            // 성공 및 경고 메시지 숨기기
            if (successMessage) successMessage.style.display = "none";
            if (warningMessage) warningMessage.style.display = "none";
        } else {
            sendAuthButton.classList.add("button-send-active"); // 인증 버튼 활성화
            emailInput.classList.remove("warning");
            emailInput.style.borderColor = "blue"; // 포커스 색상

            if (successMessage) successMessage.style.display = "none";
        }
    });

    // 이메일 인증 완료 버튼 클릭 로직 추가
    confirmButton.addEventListener("click", async function () {
        if (isEmailCodeSent) {
            const inputCode = emailCodeInput.value.trim();

            if (inputCode === "") {
                showWarningMessage("인증번호를 입력해 주세요.", emailCodeInput);
                return;
            }

            try {
                const response = await fetch("/verify-email-auth-code", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams({
                        email: emailInput.value,
                        authCode: inputCode,
                    }),
                });

                const result = await response.text();
                if (result === "인증 성공") {
                    clearInterval(emailTimerInterval);
                    showSuccessMessage("인증되었습니다.", emailCodeInput);
                } else {
                    showWarningMessage("인증번호가 일치하지 않습니다.", emailCodeInput);
                }
            } catch (error) {
                showWarningMessage("인증 실패. 다시 시도해 주세요.", emailCodeInput);
            }
        }
    });

    // 이메일 인증 번호 입력 시 인증 완료 버튼 활성화
    emailCodeInput.addEventListener("input", function () {
        const emailCodeValue = emailCodeInput.value.trim();

        if (emailCodeValue.length > 0) {
            confirmButton.classList.add("button-send-active"); // 인증 완료 버튼 활성화
            confirmButton.style.cursor = "pointer"; // 커서 스타일 변경
            emailCodeInput.style.borderColor = "blue"; // 기본 포커스 스타일 적용
        } else {
            confirmButton.classList.remove("button-send-active"); // 입력값이 없으면 비활성화
            confirmButton.style.cursor = "default";
            emailCodeInput.style.borderColor = "#ccc"; // 기본 테두리 색상으로 복원
        }
    });

    // 비밀번호 입력 필드에서 입력 값이 변경될 때 호출되는 함수
    passwordInput.addEventListener("input", function () {
        if (passwordInput.value.length > 0) {
            passwordInput.style.borderColor = "blue"; // 입력 중 기본 포커스 스타일
        } else {
            passwordInput.style.borderColor = "#ccc"; // 입력이 없을 경우 기본 테두리 색상
        }

        // 경고나 성공 상태 해제
        passwordInput.classList.remove("warning", "success-sign");
        if (passwordWarningMessage) passwordWarningMessage.style.display = "none";
    });

    // 비밀번호 확인 필드에서 입력 값이 변경될 때 호출되는 함수
    passwordConfirmInput.addEventListener("input", function () {
        if (passwordConfirmInput.value.length > 0) {
            passwordConfirmInput.style.borderColor = "blue"; // 입력 중 기본 포커스 스타일
        } else {
            passwordConfirmInput.style.borderColor = "#ccc"; // 입력이 없을 경우 기본 테두리 색상
        }

        // 경고나 성공 상태 해제
        passwordConfirmInput.classList.remove("warning", "success-sign");
        if (passwordWarningMessage) passwordWarningMessage.style.display = "none";
    });

    // 비밀번호 필드에 포커스 및 블러 이벤트 추가
    passwordInput.addEventListener("focus", function () {
        if (
            !passwordInput.classList.contains("warning") &&
            !passwordInput.classList.contains("success-sign")
        ) {
            passwordInput.style.borderColor = "blue"; // 기본 포커스 스타일
        }
    });

    passwordInput.addEventListener("blur", function () {
        if (
            !passwordInput.classList.contains("warning") &&
            !passwordInput.classList.contains("success-sign")
        ) {
            passwordInput.style.borderColor = "#ccc"; // 포커스 해제 시 기본 테두리 색상
        }
    });

    // 비밀번호 확인 필드에 포커스 및 블러 이벤트 추가
    passwordConfirmInput.addEventListener("focus", function () {
        if (
            !passwordConfirmInput.classList.contains("warning") &&
            !passwordConfirmInput.classList.contains("success-sign")
        ) {
            passwordConfirmInput.style.borderColor = "blue"; // 기본 포커스 스타일
        }
    });

    passwordConfirmInput.addEventListener("blur", function () {
        if (
            !passwordConfirmInput.classList.contains("warning") &&
            !passwordConfirmInput.classList.contains("success-sign")
        ) {
            passwordConfirmInput.style.borderColor = "#ccc"; // 포커스 해제 시 기본 테두리 색상
        }
    });

    // 비밀번호 유효성 검사 함수
    function validatePasswords() {
        const passwordValue = passwordInput.value.trim();
        const passwordConfirmValue = passwordConfirmInput.value.trim();

        // 초기화: 경고 메시지와 테두리 색상 리셋
        passwordWarningMessage.style.display = "none";
        passwordWarningMessage2.style.display = "none";
        passwordInput.classList.remove("warning");
        passwordConfirmInput.classList.remove("warning");
        passwordInput.style.borderColor = "#ccc";
        passwordConfirmInput.style.borderColor = "#ccc";

        if (passwordValue.length === 0 || passwordConfirmValue.length === 0) {
            passwordWarningMessage.textContent = "비밀번호를 입력하세요";
            passwordWarningMessage.style.display = "block";
            passwordWarningMessage.classList.add("warning-msg");
            passwordInput.classList.add("warning");
            passwordConfirmInput.classList.add("warning");
            passwordInput.style.borderColor = "#f05050";
            passwordConfirmInput.style.borderColor = "#f05050";
            return false;
        }

        if (passwordValue.length < 6 || passwordConfirmValue.length < 6) {
            passwordWarningMessage.textContent = "6자 이상 입력하세요";
            passwordWarningMessage.style.display = "block";
            passwordWarningMessage.classList.add("warning-msg");
            passwordInput.classList.add("warning");
            passwordConfirmInput.classList.add("warning");
            passwordInput.style.borderColor = "#f05050";
            passwordConfirmInput.style.borderColor = "#f05050";
            return false;
        }

        if (passwordValue !== passwordConfirmValue) {
            passwordWarningMessage2.textContent = "비밀번호가 일치하지 않습니다.";
            passwordWarningMessage2.style.display = "block";
            passwordWarningMessage2.classList.add("warning-msg");
            passwordInput.classList.add("warning");
            passwordConfirmInput.classList.add("warning");
            passwordInput.style.borderColor = "#f05050";
            passwordConfirmInput.style.borderColor = "#f05050";
            return false;
        }

        // 비밀번호가 유효한 경우
        passwordWarningMessage.style.display = "block";
        passwordWarningMessage.textContent = "비밀번호가 일치합니다.";
        passwordWarningMessage.classList.remove("warning-msg");
        passwordWarningMessage.classList.add("success-msg");
        passwordInput.style.border = "1px solid #189f14";
        passwordConfirmInput.style.border = "1px solid #189f14";
        return true;
    }




    passwordShowBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            const inputElement = btn.parentElement.querySelector("input");
            togglePasswordVisibility(inputElement, btn);
        });
    });

    // 비밀번호 보이기/숨기기 토글 함수
    function togglePasswordVisibility(passwordInput, btn) {
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

    // 타이머 시작 함수
    function startCountdown(timerElement, timeLeft, type) {
        if (type === 'phone') {
            clearInterval(phoneTimerInterval);
            timerElement.style.display = "block";

            phoneTimerInterval = setInterval(() => {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(
                    seconds
                ).padStart(2, "0")}`;

                if (timeLeft <= 0) {
                    clearInterval(phoneTimerInterval);
                    timerElement.textContent = "";
                    showWarningMessage("입력 시간을 초과하였습니다.", phoneCodeInput);
                    phoneCodeBox.style.display = "none";
                    isPhoneCodeSent = false;
                }
                timeLeft--;
            }, 1000);
        } else if (type === 'email') {
            clearInterval(emailTimerInterval);
            timerElement.style.display = "block";

            emailTimerInterval = setInterval(() => {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(
                    seconds
                ).padStart(2, "0")}`;

                if (timeLeft <= 0) {
                    clearInterval(emailTimerInterval);
                    timerElement.textContent = "";
                    showWarningMessage("입력 시간을 초과하였습니다.", emailCodeInput);
                    emailCodeBox.style.display = "none";
                    isEmailCodeSent = false;
                }
                timeLeft--;
            }, 1000);
        }
    }

    // 경고 메시지 출력 함수
    function showWarningMessage(message, element) {
        const parentElement = element.closest(".register-with-btn-box");
        let existingMessage = parentElement.querySelector(".desc-span.warning-msg");

        if (!existingMessage) {
            const warningMessage = document.createElement("span");
            warningMessage.className = "desc-span warning-msg";
            warningMessage.textContent = message;
            warningMessage.style.display = "block";
            parentElement.appendChild(warningMessage);
        } else {
            existingMessage.textContent = message;
            existingMessage.style.display = "block";
        }
    }

    // 성공 메시지 출력 함수
    function showSuccessMessage(message, element) {
        const parentElement = element.closest(".register-with-btn-box");

        // 기존 경고 메시지 숨기기
        const existingWarningMessage = parentElement.querySelector(".desc-span.warning-msg");
        if (existingWarningMessage) {
            existingWarningMessage.style.display = "none";
        }

        // 기존 성공 메시지 제거
        const existingSuccessMessage = parentElement.querySelector(".desc-span.success-msg");
        if (existingSuccessMessage) existingSuccessMessage.remove();

        const successMessage = document.createElement("span");
        successMessage.className = "desc-span success-msg";
        successMessage.textContent = message;
        successMessage.style.display = "block";
        parentElement.appendChild(successMessage);
    }

    completeButton.addEventListener("click", function (event) {
        let isValid = true;

        const emailValue = emailInput.value.trim();
        const emailCodeValue = emailCodeInput.value.trim();
        const phoneValue = phoneInput.value.trim();
        const phoneCodeValue = phoneCodeInput.value.trim();

        // 이메일 입력 필드가 비어 있을 때 경고 메시지 표시
        if (emailValue.length === 0) {
            showWarningMessage("이메일 주소를 입력해 주세요.", emailInput);
            emailInput.classList.add("warning");
            emailInput.style.borderColor = "#f05050"; // 경고 색상으로 변경
            isValid = false;
        }

        // 인증번호 입력 필드가 비어 있을 때 경고 메시지 표시
        if (emailCodeValue.length === 0) {
            showWarningMessage("인증번호를 입력해 주세요.", emailCodeInput);
            emailCodeInput.classList.add("warning");
            emailCodeInput.style.borderColor = "#f05050"; // 경고 색상으로 변경
            isValid = false;
        }

        // 전화번호 입력 필드가 비어 있을 때 경고 메시지 표시
        if (phoneValue.length === 0) {
            showWarningMessage("전화번호를 입력해 주세요.", phoneInput);
            phoneInput.classList.add("warning");
            phoneInput.style.borderColor = "#f05050"; // 경고 색상으로 변경
            isValid = false;
        }

        // 전화번호 인증번호 입력 필드가 비어 있을 때 경고 메시지 표시
        if (phoneCodeValue.length === 0) {
            showWarningMessage("인증번호를 입력해 주세요.", phoneCodeInput);
            phoneCodeInput.classList.add("warning");
            phoneCodeInput.style.borderColor = "#f05050"; // 경고 색상으로 변경
            isValid = false;
        }

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                checkboxWarningMessage.style.display = "none";
            } else {
                checkboxWarningMessage.style.display = "block";
            }
        });
        // 비밀번호 유효성 검사
        if (!validatePasswords()) {
            isValid = false;
        }

        // 유효성 검사를 통과하지 못한 경우 폼 제출 막기
        if (!isValid) {
            event.preventDefault();
        }
    });

});
