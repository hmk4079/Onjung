document.getElementById("login-btn").addEventListener("click", async function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("id-info");
    const passwordInput = document.getElementById("pass-info");
    const warningMsg = document.querySelector(".warning-msg");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        warningMsg.style.display = "block";
        warningMsg.innerText = "이메일과 비밀번호를 모두 입력해 주세요.";
        emailInput.classList.add("warning");
        passwordInput.classList.add("warning");
        return;
    }

    try {
        const response = await fetch("/member/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                memberEmail: email,
                memberPassword: password
            })
        });
        const result = await response.json();
        if (response.ok) {
            const redirectUrl = result.redirectUrl;
            window.location.href = redirectUrl;
        } else {
            warningMsg.style.display = "block";
            warningMsg.innerText = "가입되어 있지 않은 이메일이거나 이메일 또는 비밀번호가 일치하지 않습니다.";
            emailInput.classList.add("warning");
            passwordInput.classList.add("warning");
        }
    } catch (error) {
        console.error("로그인 요청 중 오류 발생:", error);
        warningMsg.style.display = "block";
        warningMsg.innerText = "로그인 중 문제가 발생했습니다. 다시 시도해 주세요.";
    }
});

// 입력란에 변화가 있을 때 경고 메시지 및 스타일을 숨김
document.getElementById("id-info").addEventListener("input", hideWarning);
document.getElementById("pass-info").addEventListener("input", hideWarning);

function hideWarning() {
    const warningMsg = document.querySelector(".warning-msg");
    warningMsg.style.display = "none";
    document.getElementById("id-info").classList.remove("warning");
    document.getElementById("pass-info").classList.remove("warning");
}

// 비밀번호 보이기/숨기기 기능을 처리하는 함수
function togglePasswordVisibility() {
    const passwordInput = document.getElementById("pass-info");
    const passwordShowBtn = document.querySelector(".password-show-btn");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordShowBtn.src = "https://accounts-front.stunning.kr/assets/img/login/ico-visible.png";
    } else {
        passwordInput.type = "password";
        passwordShowBtn.src = "https://accounts-front.stunning.kr/assets/img/login/ico-hidden.png";
    }
}
