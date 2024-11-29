// 탭 UI 처리
const tabs = document.querySelectorAll(".tabs .tab");
const contentContainer = document.querySelector(".content-wrap");
const commentSection = document.querySelector(".comment-wrap");
const commentInputSection = document.querySelector(".contest-comment-input");

// 초기 상태 설정
tabs[0].classList.add("active");
commentSection.style.display = "none";
commentInputSection.style.display = "none";

// 탭 클릭 이벤트
tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        if (index === 0) {
            contentContainer.style.display = "block";
            commentSection.style.display = "none";
            commentInputSection.style.display = "none";
        } else {
            contentContainer.style.display = "none";
            commentSection.style.display = "block";
            commentInputSection.style.display = "block";
        }
    });
});

// 그래프 상태 업데이트
const goalPerson = parseInt(volunteer.recruitmentCount);
const nowPerson = parseInt(volunteer.nowRecruitmentCount);
const percentage = Math.floor((nowPerson / goalPerson) * 100);

document.querySelector(".graph-status .num").textContent = `${percentage}`;
document.querySelector(".graph-bar span").style.width = `${Math.min(
    percentage,
    100
)}%`;

document.querySelector(
    ".total-prize"
).textContent = `${nowPerson} 명 / ${goalPerson} 명`;

// 첨부파일 렌더링
const renderAttachments = ({ attachments }) => {
    const attachList = document.getElementById("attach-list");

    if (!attachList) {
        console.error("attach-list 요소를 찾을 수 없습니다.");
        return;
    }

    if (!attachments || attachments.length === 0) {
        attachList.innerHTML = "<li>첨부파일이 없습니다.</li>";
        return;
    }

    attachList.innerHTML = "";
    attachments.forEach((attachment) => {
        const attachHTML = `
            <li>
                <p class="file-name">${attachment.attachmentFileRealName}</p>
                <span class="file-download">
                    <span class="size">${attachment.attachmentFileSize} bytes</span>
                    <a href="/attachment/download?fileName=${attachment.attachmentFilePath}/${attachment.attachmentFileName}${attachment.attachmentFileRealName}" 
                       download="${attachment.attachmentFileRealName}" 
                       class="attach-save">
                       <span class="visual-correction">저장</span>
                    </a>
                </span>
            </li>
        `;
        attachList.insertAdjacentHTML("beforeend", attachHTML);
    });
};

// 댓글 시간 변환 함수
function timeForToday(datetime) {
    const today = new Date();
    const date = new Date(datetime);

    let gap = Math.floor((today.getTime() - date.getTime()) / 1000 / 60);

    if (gap < 1) return "방금 전";
    if (gap < 60) return `${gap}분 전`;

    gap = Math.floor(gap / 60);
    if (gap < 24) return `${gap}시간 전`;

    gap = Math.floor(gap / 24);
    if (gap < 31) return `${gap}일 전`;

    gap = Math.floor(gap / 31);
    if (gap < 12) return `${gap}개월 전`;

    return `${Math.floor(gap / 12)}년 전`;
}

// 페이지 로드 시 첨부파일 데이터 렌더링
document.addEventListener("DOMContentLoaded", () => {
    renderAttachments({ attachments });
});

// 게시물 업데이트 및 삭제
const updateButton = document.querySelector("a.go-update");
const deleteButton = document.querySelector("a.go-delete");

updateButton.addEventListener("click", () => {
    location.href = `/volunteer/volunteer-update?postId=${volunteer.id}`;
});

deleteButton.addEventListener("click", () => {
    alert("게시물이 성공적으로 삭제되었습니다.");
    location.href = `/volunteer/volunteer-delete?postId=${volunteer.id}`;
});
