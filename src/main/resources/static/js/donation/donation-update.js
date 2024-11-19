// 파일 입력 요소와 드롭존을 선택합니다.
const fileInput = document.getElementById("drop-zone-input");
const dropZone = document.querySelector(".drop-zone");
const fileList = document.querySelector(".file-section-list ul");
const maxFiles = 10;
const maxTotalSize = 20 * 1024 * 1024; // 20MB

let uploadedFiles = new Set(); // 업로드된 파일을 저장하는 Set
let i = 0;

HTMLElement.prototype.forEach = Array.prototype.forEach;

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

    const form = document["donation-update-form"];
    const formData = new FormData();
    formData.append("file", files[0]);
    const attachmentFile = await donationWriteService.upload(formData);
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
        // const downloads = document.querySelectorAll("a.download");
        // downloads[i].href = `/file/download?fileName=${fileInfo.filePath + "/" + fileInfo.fileName}`;
    } else {
        receivedThumbnail.parentElement.removeChild(receivedThumbnail);
    }

};

// 첨부파일 목록 출력
const setAttachmentList = (attachments) => {
    console.log(attachments);
    if(attachments) {
        console.log(attachments);
        attachments.forEach((attachment) => {
            console.log(attachment);
            const thumbnailImg = document.createElement("img");
            const thumbnailWrap = document.createElement("div");
            const textWrap = document.createElement("div");
            const listItem = document.createElement("li");

            thumbnailImg.classList.add(`thumbnail-img-${++i}`);
            thumbnailImg.style = "width: 100%; height: 100%; border: none;";
            thumbnailImg.src = `/attachment/display?attachmentFileName=${attachment.attachmentFilePath + "/t_" + attachment.attachmentFileName + attachment.attachmentFileRealName}`;
            thumbnailWrap.style = "width: 20px; height: 20px; margin-top: 16px; margin-right: 10px; border: none;";
            thumbnailWrap.appendChild(thumbnailImg);
            textWrap.textContent = `${attachment.attachmentFileRealName} (${(attachment.attachmentFileSize / 1024).toFixed(1)} KB)`;
            textWrap.style = "margin-top: 16px";
            listItem.prepend(thumbnailWrap);
            listItem.appendChild(textWrap);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "삭제";
            deleteButton.classList.add("delete-button");

            deleteButton.onclick = () => removeFile(attachment, listItem);
            listItem.appendChild(deleteButton);
            listItem.style.display = "flex";
            fileList.appendChild(listItem);
        });
    }
}

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
    if(file.id) {
        const form = document["donation-update-form"];
        const attachmentFileId = document.createElement("input");
        attachmentFileId.type = "hidden";
        attachmentFileId.name = "id";
        attachmentFileId.value = `${file.id}`;
        form.append(attachmentFileId);
    }
    uploadedFiles.delete(file);
    fileList.removeChild(listItem); // 목록에서 해당 항목 제거
};

document.getElementById("submit-review").addEventListener("click", (e) => {
    // 필수 항목 선택
    const companyName = document
        .querySelector(".company-name input")
        .value.trim();
    const serviceContents = document
        .querySelector(".service-contents textarea")
        .value.trim();
    const reviewContent = document.getElementById("briefing").value.trim();
    const rating = document.querySelector('input[name="rating"]:checked');

    // 필수 항목 검증
    if (!companyName) {
        alert("필수 항목을 확인해주세요.");
        return;
    }

    if (!serviceContents) {
        alert("한 줄 소개를 입력해주세요.");
        return;
    }

    if (!reviewContent) {
        alert("내용을 작성해주세요.");
        return;
    }

    alert("후기가 성공적으로 제출되었습니다!");
    // 하고 여기서 목록 페이지로 이동
});
const updateCharCount = (input) => {
    const charCountSpan = document.getElementById("charCount");
    charCountSpan.textContent = input.value.length;
};

const validateAndDisplayNumber = (input) => {
    input.value = input.value.replace(/[^0-9]/, ""); // 숫자 이외 제거
    const number = input.value;
    const formatted = number ? formatNumberToKorean(number) : "0";
    document.getElementById("formattedNumber").textContent = formatted;
};

//날짜 설정

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
};

const getPostId = async () => {
    const form = document["donation-update-form"];
    const postId = document.createElement("input");

    postId.type = "hidden";
    postId.name = "postId";
    postId.value = `${new URL(location.href).searchParams.get('postId')}`;
    form.append(postId);
    console.log(form);
}

getPostId();
updateDateRange();
setAttachmentList(attachments);
