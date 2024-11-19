// 파일 입력 요소와 드롭존을 선택합니다.
const fileInput = document.getElementById("drop-zone-input");
const dropZone = document.querySelector(".drop-zone");
const fileList = document.querySelector(".file-section-list ul");
const maxFiles = 10;
const maxTotalSize = 20 * 1024 * 1024; // 20MB

let uploadedFiles = new Set(); // 업로드된 파일을 저장하는 Set

// 파일 선택 시 호출되는 함수
fileInput.addEventListener("change", (event) => {
    handleFiles(event.target.files);
    fileInput.value = ""; // 같은 파일을 다시 선택할 수 있도록 초기화
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
const handleFiles = (files) => {
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
};

// 파일 목록에 파일 추가
const addFileToList = (file) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = () => removeFile(file, listItem);

    listItem.appendChild(deleteButton);
    fileList.appendChild(listItem);
};

// 파일 목록에서 파일 삭제
const removeFile = (file, listItem) => {
    uploadedFiles.delete(file);
    fileList.removeChild(listItem); // 목록에서 해당 항목 제거
};

// 별점 평가 시 별점 표시 업데이트
document.querySelectorAll(".star-reviewStarRate input").forEach((radio) => {
    radio.addEventListener("change", (e) => {
        const reviewStarRate = e.target.value;
        document.getElementById("reviewStarRate-value").textContent = reviewStarRate;
        console.log(`별점 ${reviewStarRate}점이 선택되었습니다.`);
    });
});

// 폼 제출 버튼 클릭 시 검증 및 제출
document.getElementById("submit-review").addEventListener("click", (e) => {
    // 필수 항목 선택
    const companyName = document
        .querySelector(".company-name input")
        .value.trim();
    const serviceContents = document
        .querySelector(".service-contents textarea")
        .value.trim();
    const reviewContent = document.getElementById("briefing").value.trim();
    const reviewStarRate = document.querySelector('input[name="reviewStarRate"]:checked');

    // 필수 항목 검증
    if (!companyName) {
        alert("봉사 단체명을 입력해주세요.");
        e.preventDefault(); // 폼 제출 방지
        return;
    }

    if (!serviceContents) {
        alert("봉사 내용을 입력해주세요.");
        e.preventDefault();
        return;
    }

    if (!reviewContent) {
        alert("봉사활동 후기를 작성해주세요.");
        e.preventDefault();
        return;
    }

    if (!reviewStarRate) {
        alert("별점을 선택해주세요.");
        e.preventDefault();
        return;
    }

    // 파일 업로드 제한 검증
    if (uploadedFiles.size > maxFiles) {
        alert("최대 10개의 파일만 업로드할 수 있습니다.");
        e.preventDefault();
        return;
    }

    let totalSize = Array.from(uploadedFiles).reduce(
        (acc, file) => acc + file.size,
        0
    );
    if (totalSize > maxTotalSize) {
        alert("총 파일 크기가 20MB를 초과할 수 없습니다.");
        e.preventDefault();
        return;
    }

});

// 문자 수 업데이트 함수
const updateCharCount = (input) => {
    const charCountSpan = document.getElementById("charCount");
    charCountSpan.textContent = input.value.length;
};
