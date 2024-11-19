const requestTypeInput = document.querySelector(".request-type-input");
const requestTypeSelect = document.querySelector("#request-type-select");
const requestTypeArea = document.querySelector("#request-type-area");
const requestAgreementInput = document.querySelector(
    "#request-agreements-check"
);
const attachmentsUploadPool = document.querySelector(
    "#attachments-upload-pool"
);
const attachInput = document.querySelector("#attach-input");
let i = 0;

HTMLCollection.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.filter = Array.prototype.filter;

requestTypeInput.addEventListener("focus", (e) => {
    e.target.ariaExpanded = "true";
    requestTypeArea.classList.toggle("active");
    requestTypeInput.classList.toggle("active");
});

requestTypeArea.children.forEach((child) => {
    child.addEventListener("mouseenter", (e) => {
        e.target.style.backgroundColor = "#e9e9e9";
    });
    child.addEventListener("mouseleave", (e) => {
        e.target.style.backgroundColor = "";
    });
    child.addEventListener("click", (e) => {
        // console.log(e.target.innerText);
        // requestTypeInput.innerText = e.target.innerText;
        // requestTypeSelect.children.forEach((child) => {
        //     child.selected =
        //         child.innerText.trim() === e.target.innerText ? "true" : "";
        // });
        // requestTypeInput.ariaExpanded = "false";
        // requestTypeArea.classList.toggle("active");
        // requestTypeInput.classList.toggle("active");
        // console.log(requestTypeSelect.value);
        const selectedText = e.target.innerText.trim(); // 선택한 항목의 텍스트
        requestTypeInput.innerText = selectedText; // 선택한 값을 보여줌

        // 드롭다운에서 선택한 옵션을 실제로 반영
        Array.from(requestTypeSelect.options).forEach((option) => {
            option.selected = option.innerText.trim() === selectedText;
        });

        // 드롭다운 메뉴 상태 닫기
        requestTypeInput.ariaExpanded = "false";
        requestTypeArea.classList.remove("active");
        requestTypeInput.classList.remove("active");

        console.log(requestTypeSelect.value); // 선택한 값 확인용
    });
});

requestAgreementInput.addEventListener("change", (e) => {
    e.target.previousElementSibling.previousElementSibling.classList.toggle(
        "checked"
    );
});

// 첨부파일 목록 관리
attachInput.addEventListener("change", (e) => {
    // 파일 정보 불러오기
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // 첨부파일 객체 생성
    const attachFile = `<li class="attach-file">
                            <label style="margin-bottom: 0; font-size: 0">
                                    <span class="attach-cancel-button" id=attach-cancel-button-${++i}></span>
                                    <input type="file" style="display:none" id=attach-info-${i} disabled/>
                            </label>
                            <a target="_blank" class="attach-text-wrap">${
                                file.name
                            }</a>
                        </li>`;

    attachmentsUploadPool.innerHTML += attachFile;
    // attachInput에 담긴 파일 정보를 첨부파일 객체의 files에 추가
    const attachInfo = document.querySelector(`#attach-info-${i}`);
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    attachInfo.files = dataTransfer.files;
    // attachInput에 담긴 파일 정보 삭제
    attachInput.value = "";
    // 모든 첨부파일의 삭제버튼에 해당 파일 삭제기능 추가
    const attachCancelButtons = document.querySelectorAll(
        ".attach-cancel-button"
    );
    attachCancelButtons.forEach((attachCancelButton) => {
        attachCancelButton.addEventListener("click", (e) => {
            // 첨부파일 목록에서 해당 파일 삭제
            attachInfo.value = "";
            attachmentsUploadPool.removeChild(
                e.target.parentElement.parentElement
            );
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const inquiryForm = document.querySelector("#new-request"); // 이름 변경
    const requestTypeInput = document.querySelector(".request-type-input");
    const inquiryEmailInput = document.querySelector("#requester-email");
    const inquiryPhoneInput = document.querySelector("#requester-phone");
    const titleInput = document.querySelector("#request-title");
    const descriptionInput = document.querySelector("#request-description");
    const agreementCheckbox = document.querySelector("#request-agreements-check");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식
    const phoneRegex = /^[0-9]{10,11}$/; // 연락처 (10자리 또는 11자리 숫자)

    inquiryForm.addEventListener("submit", (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지

        let isValid = true;
        const messages = [];

        if (requestTypeInput.innerText.trim() === "-" || requestTypeInput.innerText.trim() === "") {
            isValid = false;
            messages.push("문의항목을 선택해주세요.");
        }

        if (!emailRegex.test(inquiryEmailInput.value.trim())) {
            isValid = false;
            messages.push("유효한 이메일 주소를 입력해주세요.");
        }

        if (!phoneRegex.test(inquiryPhoneInput.value.trim())) {
            isValid = false;
            messages.push("연락처는 10자리 또는 11자리 숫자로 입력해주세요.");
        }

        if (titleInput.value.trim() === "") {
            isValid = false;
            messages.push("제목을 입력해주세요.");
        }

        if (descriptionInput.value.trim() === "") {
            isValid = false;
            messages.push("설명을 입력해주세요.");
        }

        if (!agreementCheckbox.checked) {
            isValid = false;
            messages.push("개인정보 수집 및 이용에 동의해주세요.");
        }

        if (!isValid) {
            alert(messages.join("\n"));
            return; // 유효성 검사 실패 시 종료
        }

        alert("문의 작성이 완료되었습니다.");
        HTMLFormElement.prototype.submit.call(inquiryForm); // 폼 제출
    });
});





