// 파일 입력 요소와 드롭존을 선택합니다.
const fileInput = document.getElementById("drop-zone-input");
const dropZone = document.querySelector(".drop-zone");
const fileList = document.querySelector(".file-section-list ul");
const maxFiles = 10;
const maxTotalSize = 20 * 1024 * 1024; // 20MB


let uploadedFiles = new Set(); // 업로드된 파일을 저장하는 Set
let i = 0;

// 파일 선택 시 호출되는 함수
fileInput.addEventListener("change", async (event) => {
    await handleFiles(event.target.files);
    fileInput.value = "";
});

// 드래그한 파일이 드롭존에 들어왔을 때 스타일 변경
dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
});

// 파일을 드롭했을 때 호출되는 함수
dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZone.classList.remove("drag-over");
    handleFiles(event.dataTransfer.files);
});

// 파일 처리 함수
const handleFiles = async (files) => {
    let totalSize = Array.from(uploadedFiles).reduce(
        (acc, file) => acc + file.size,
        0
    );

    for (const file of files) {
        if (uploadedFiles.size >= maxFiles) {
            alert("최대 10개의 파일만 업로드할 수 있습니다.");
            return;
        }

        if (totalSize + file.size > maxTotalSize) {
            alert("총 파일 크기가 20MB를 초과할 수 없습니다.");
            return;
        }

        if (!uploadedFiles.has(file)) {
            uploadedFiles.add(file);
            totalSize += file.size;
            addFileToList(file);
        }
    }

    const form = document["volunteer-write-form"];
    const formData = new FormData();
    formData.append("file", files[0]);
    const attachmentFile = await volunteerWriteService.upload(formData);
    const uuid = attachmentFile.attachmentFileName.substring(0, attachmentFile.attachmentFileName.indexOf("_"));
    const attachmentFileName = document.createElement("input");
    attachmentFileName.type = "hidden";
    attachmentFileName.name = "uuid";
    attachmentFileName.value = `${uuid}`;
    const attachmentFileRealName = document.createElement("input");
    attachmentFileRealName.type = "hidden";
    attachmentFileRealName.name = "realName";
    attachmentFileRealName.value = `${attachmentFile.attachmentFileName.substring(attachmentFile.attachmentFileName.indexOf("_") + 1)}`;
    const attachmentFilePath = document.createElement("input");
    attachmentFilePath.type = "hidden";
    attachmentFilePath.name = "path";
    attachmentFilePath.value = `${attachmentFile.attachmentFilePath}`;
    const attachmentFileSize = document.createElement("input");
    attachmentFileSize.type = "hidden";
    attachmentFileSize.name = "size";
    attachmentFileSize.value = `${attachmentFile.attachmentFileSize}`;
    form.append(attachmentFileName);
    form.append(attachmentFileRealName);
    form.append(attachmentFilePath);
    form.append(attachmentFileSize);
    const receivedThumbnail = document.querySelector(`img.thumbnail-img-${i}`);
    if(files[0].type.includes("image")) {
        receivedThumbnail.src = `/attachment/display?attachmentFileName=${attachmentFile.attachmentFilePath + "/t_" + attachmentFile.attachmentFileName}`;
    } else {
        receivedThumbnail.parentElement.removeChild(receivedThumbnail);
    }
};

// 파일 목록에 파일 추가
const addFileToList = (file) => {
    const thumbnailImg = document.createElement("img");
    const thumbnailWrap = document.createElement("div");
    const textWrap = document.createElement("div");
    const listItem = document.createElement("li");

    thumbnailImg.classList.add(`thumbnail-img-${++i}`);
    thumbnailImg.style = "width: 100%; height: 100%; border: none;";
    thumbnailWrap.style = "width: 20px; height: 20px; margin-top: 16px; margin-right: 10px; border: none;";
    thumbnailWrap.appendChild(thumbnailImg);
    textWrap.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    textWrap.style = "margin-top: 16px";
    listItem.prepend(thumbnailWrap);
    listItem.appendChild(textWrap);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.classList.add("delete-button");

    deleteButton.onclick = () => removeFile(file, listItem);
    listItem.appendChild(deleteButton);
    listItem.style.display = "flex";
    fileList.appendChild(listItem);
};

// 파일 목록에서 파일 삭제
const removeFile = (file, listItem) => {
    uploadedFiles.delete(file);
    fileList.removeChild(listItem); // 목록에서 해당 항목 제거
};

const updateCharCount = (input) => {
    const charCountSpan = document.getElementById("charCount");
    charCountSpan.textContent = input.value.length;
};

const validateAndDisplayNumber = (input) => {
    input.value = input.value.replace(/[^0-9]/, ""); // 숫자 이외 제거
};

// 날짜 설정
const updateDateRange = () => {
    const startDateInput = document.getElementById("start-date").value;
    const endDateInput = document.getElementById("end-date").value;
    const dateCountDisplay = document.getElementById("date-count");

    if (startDateInput && endDateInput) {
        const startDate = new Date(startDateInput);
        const endDate = new Date(endDateInput);

        // 일 수 계산 (종료일 - 시작일)
        const timeDiff = endDate.getTime() - startDate.getTime();
        const dayCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        // 날짜 유효성 검사
        if (dayCount >= 0) {
            dateCountDisplay.textContent = dayCount;
        } else {
            dateCountDisplay.textContent = "X";
        }
    } else {
        dateCountDisplay.textContent = "X";
    }

    // 날짜 범위가 변경될 때 필드 검증 실행
    validateFields();
};

// 필수 입력 필드와 제출 버튼 가져오기(유효성 검사)
const postTitle = document.getElementById('post-title'); // 게시글 이름
const postSummary = document.getElementById('post-summary'); // 한 줄 소개
const recruitmentCount = document.getElementById('post-recruitmentCount'); // 모집 인원
const dateCount = document.getElementById('date-count'); // 남은 일수 (span)
const briefing = document.getElementById('briefing'); // 내용
const submitButton = document.getElementById('submit-volunteer');
const uuidInput = document.querySelector('input[name="uuid"]');

// 삭제 버튼 존재 여부에 따라 작성 완료 버튼 상태를 갱신하는 함수
function validateFields() {
    const isPostTitleValid = postTitle.value.trim() !== '';
    const isPostSummaryValid = postSummary.value.trim() !== '';
    const isRecruitmentCountValid = parseInt(recruitmentCount.value) > 0;
    const dateCountValue = parseInt(dateCount.textContent || dateCount.innerText);
    const isDateCountValid = !isNaN(dateCountValue) && dateCountValue >= 0;
    const isBriefingValid = briefing.value.trim() !== '';

    // 삭제 버튼(".delete-button")이 존재하는지 확인
    const deleteButton = document.querySelector(".delete-button");
    const isAttachmentFileValid = !!deleteButton; // 삭제 버튼이 있으면 true, 없으면 false

    // 모든 필드가 유효한 경우
    if (
        isPostTitleValid &&
        isPostSummaryValid &&
        isRecruitmentCountValid &&
        isDateCountValid &&
        isBriefingValid &&
        isAttachmentFileValid
    ) {
        submitButton.disabled = false; // 버튼 활성화
        submitButton.classList.remove('disable');
    } else {
        submitButton.disabled = true; // 버튼 비활성화
        submitButton.classList.add('disable');
    }
}

// DOM 변경 사항을 감지하여 작성 완료 버튼 상태를 업데이트하는 로직
const observer = new MutationObserver(() => {
    validateFields(); // DOM 변경이 발생할 때마다 유효성 검사 호출
});

// 감시할 영역과 옵션 설정
observer.observe(document.body, {
    childList: true, // 자식 노드의 추가/삭제를 감지
    subtree: true, // 하위 노드의 변경 사항도 감지
});

// 입력 필드 변화 시 유효성 검사 연결
[postTitle, postSummary, recruitmentCount, briefing].forEach(input => {
    input.addEventListener("input", validateFields);
});

// 초기 유효성 검사 호출 (페이지 로드 시 상태 확인)
validateFields();

// 제출 버튼 클릭 이벤트
submitButton.addEventListener('click', function () {
    // 필수 항목 검증
    if (postTitle.value.trim() === '') {
        alert("필수 항목을 확인해주세요. (게시글 제목)");
        return;
    }

    if (postSummary.value.trim() === '') {
        alert("한 줄 소개를 입력해주세요.");
        return;
    }

    if (briefing.value.trim() === '') {
        alert("내용을 작성해주세요.");
        return;
    }

    if (parseInt(recruitmentCount.value) <= 0) {
        alert("모집 인원을 1명 이상 입력해주세요.");
        return;
    }

    const dateCountValue = parseInt(dateCount.textContent || dateCount.innerText);
    if (isNaN(dateCountValue) || dateCountValue < 0) {
        alert("봉사 일자를 올바르게 입력해주세요.");
        return;
    }

    // 모든 검증 통과 시 성공 메시지
    alert("게시글이 성공적으로 작성되었습니다!");
});

// 이벤트 리스너 추가
postTitle.addEventListener('input', validateFields);
postSummary.addEventListener('input', validateFields);
recruitmentCount.addEventListener('input', validateFields);
briefing.addEventListener('input', validateFields);

// 초기 유효성 검사 실행
validateFields();

// 시작일/종료일 변경 시 날짜 범위 갱신 및 검증 호출
document.getElementById("start-date").addEventListener("input", updateDateRange);
document.getElementById("end-date").addEventListener("input", updateDateRange);

// 초기 검증 체크
validateFields();


