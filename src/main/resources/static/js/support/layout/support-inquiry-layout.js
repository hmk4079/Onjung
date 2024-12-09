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
const goalPoint = parseInt(support.goalPoint);
const currentPoint = parseInt(support.currentPoint);
const percentage = Math.floor((currentPoint / goalPoint) * 100);

document.querySelector(".graph-status .num").textContent = `${percentage}`;
document.querySelector(".graph-bar span").style.width = `${Math.min(
    percentage,
    100
)}%`;

document.querySelector(
    ".total-prize"
).textContent = `${currentPoint} 포인트 / ${goalPoint} 포인트`;

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


// 신고하기 모달
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("report-modal");
    const reportBtn = document.getElementById("report-btn"); // 신고하기 버튼
    const span = document.getElementsByClassName("close")[0];
    const defaultImage = "https://www.wishket.com/static/img/default_avatar_c.png";

    // 신고하기 버튼 클릭 시 모달 열기
    reportBtn.onclick = () => {
        modal.style.display = "block";
        console.log("신고하기 클릭");
    };

    // 모달의 닫기 버튼 클릭 시 모달 닫기
    span.onclick = () => {
        modal.style.display = "none";
    };

    // 모달 외부 클릭 시 모달 닫기
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // "신고하기" 버튼 클릭 시 alert 실행 및 모달 닫기
    const reportSubmitBtn = document.getElementById("reportSubmitBtn");

    reportSubmitBtn.onclick = function () {
        alert("게시글 신고가 완료되었습니다.");
        modal.style.display = "none"; // 신고하기 버튼 클릭 후 모달 닫기
    };
});

