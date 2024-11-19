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

    const form = document["review-write-form"];
    const formData = new FormData();
    formData.append("file", files[0]);
    const attachmentFile = await reviewWriteService.upload(formData);
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

document.querySelectorAll(".star-rating input").forEach((radio) => {
    radio.addEventListener("change", (e) => {
        const rating = e.target.value;
        document.getElementById("rating-value").textContent = rating;
        console.log(`별점 ${rating}점이 선택되었습니다.`);
    });
});

document.getElementById("submit-review").addEventListener("click", (e) => {
    // 필수 항목 선택
    const companyName = document
        .querySelector(".company-name input")
        .value.trim();
    const serviceContents = document
        .querySelector(".service-contents textarea")
        .value.trim();
    const reviewContent = document.getElementById("briefing").value.trim();
    const rating = document.querySelector('input[name="reviewStarRate"]:checked');

    // 필수 항목 검증
    if (!companyName) {
        alert("봉사 단체명을 입력해주세요.");
        return;
    }

    if (!serviceContents) {
        alert("봉사 내용을 입력해주세요.");
        return;
    }

    if (!reviewContent) {
        alert("봉사활동 후기를 작성해주세요.");
        return;
    }

    if (!rating) {
        alert("별점을 선택해주세요.");
        return;
    }

    alert("후기가 성공적으로 제출되었습니다!");
    // 하고 여기서 목록 페이지로 이동
});
const updateCharCount = (input) => {
    const charCountSpan = document.getElementById("charCount");
    charCountSpan.textContent = input.value.length;
};
