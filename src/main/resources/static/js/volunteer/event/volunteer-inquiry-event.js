const tabs = document.querySelectorAll(".tabs .tab");
const contentContainer = document.querySelector(".content-wrap"); // 내용 섹션 컨테이너
const commentSection = document.querySelector(".comment-wrap"); // 댓글 섹션
const commentInputSection = document.querySelector(".contest-comment-input"); // 댓글 작성 창

// 탭 클릭 이벤트 처리
tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        if (index === 0) {
            // 내용 탭 선택 시
            contentContainer.style.display = "block";
            commentSection.style.display = "none";
            commentInputSection.style.display = "none"; // 댓글 작성 창 숨기기
        } else {
            // 댓글 탭 선택 시
            contentContainer.style.display = "none";
            commentSection.style.display = "block";
            commentInputSection.style.display = "block"; // 댓글 작성 창 보이기
        }
    });
});

// DOM 요소 가져오기
const applyButton = document.getElementById('apply-btn');
const approveModal = document.querySelector('.approvemodal');
const confirmApproveButton = document.getElementById('confirmApprove');

// "지원하기" 버튼 클릭 이벤트
applyButton.addEventListener('click', () => {
    // 모달 표시
    approveModal.style.display = 'flex';
});

// "확인" 버튼 클릭 이벤트
confirmApproveButton.addEventListener('click', () => {
    // 모달 숨기기
    approveModal.style.display = 'none';
    // 여기에 확인 후 처리할 추가 작업을 작성하세요.
    console.log('확인 버튼이 클릭되었습니다.');
    alert("봉사 신청이 완료되었습니다.")
});

// 모달 바깥을 클릭하여 닫는 기능 추가 (선택 사항)
document.querySelector('.last-modal').addEventListener('click', () => {
    approveModal.style.display = 'none';
});

// 첨부파일 렌더링 함수(다운로드)
const renderAttachments = ({ attachments }) => {
    const attachList = document.getElementById("attach-list");

    // DOM 요소 확인
    if (!attachList) {
        console.error("attach-list 요소를 찾을 수 없습니다.");
        return;
    }

    // 데이터 확인
    console.log("Attachments 데이터:", attachments);
    if (!attachments || attachments.length === 0) {
        console.warn("Attachments 데이터가 비어 있습니다.");
        attachList.innerHTML = "<li>첨부파일이 없습니다.</li>";
        return;
    }

    // 리스트 초기화
    attachList.innerHTML = "";

    // 데이터 반복 렌더링
    attachments.forEach((attachment) => {
        console.log("Attachment:", attachment); // 각 데이터 확인

        const attachHTML = `
            <li>
                <p class="file-name">${attachment.attachmentFileRealName}</p>
                <span class="file-download">
                    <span class="size">${attachment.attachmentFileSize} bytes</span>
                        <a href="/attachment/download?fileName=${attachment.attachmentFilePath + "/" + attachment.attachmentFileName + attachment.attachmentFileRealName}" 
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

// 초기 상태 설정
tabs[0].classList.add("active"); // 첫 번째 탭 활성화
commentSection.style.display = "none";
commentInputSection.style.display = "none"; // 처음에는 댓글 작성 창 숨기기

// 데이터 렌더링 예시 (사용자가 데이터 추가)
document.addEventListener("DOMContentLoaded", () => {
    console.log("Attachments 데이터:", attachments); // 데이터 확인
    renderAttachments({ attachments });
});

const goalPerson = parseInt(volunteer.recruitmentCount);
const nowPerson = parseInt(volunteer.nowRecruitmentCount); // 예시로 100% 이상을 넘는 값
console.log(volunteer.nowRecruitmentCount);
console.log(nowPerson);

// 퍼센트 계산 (100% 이상일 수 있음)
const percentage = Math.floor((nowPerson / goalPerson) * 100);

document.querySelector(".graph-status .num").textContent = `${percentage}`;

// 그래프의 width는 최대 100%로 제한
document.querySelector(".graph-bar span").style.width = `${Math.min(
    percentage,
    100
)}%`;

document.querySelector(
    ".total-prize"
).textContent = `${nowPerson} 명 / ${goalPerson} 명`;



const updateButton = document.querySelector("a.go-update");
const deleteButton = document.querySelector("a.go-delete");

updateButton.addEventListener("click", (e) => {
    location.href = `/volunteer/volunteer-update?postId=${volunteer.id}`;
});

deleteButton.addEventListener("click", (e) => {
    alert("게시물이 성공적으로 삭제되었습니다.")
    location.href = `/volunteer/volunteer-delete?postId=${volunteer.id}`;
})

// 신고하기 모달
const modal = document.getElementById("profileModal");
const reportBtn = document.getElementById("report-btn"); // 신고하기 버튼
const span = document.getElementsByClassName("close")[0];
const defaultImage = "https://www.wishket.com/static/img/default_avatar_c.png";

// 신고하기 버튼 클릭 시 모달 열기
reportBtn.onclick = () => {
    modal.style.display = "block";
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

// HTML 요소에 값 삽입
document.getElementById('daysLeftText').textContent = daysLeftText;

// // 댓글 렌더링 함수
// const renderComments = () => {
//     const commentSection = document.getElementById("comment-section");
//     commentSection.innerHTML = "";
//
//     comments.forEach((comment) => {
//         const isAuthor = comment.author ? '<p class="comment">작성자</p>' : "";
//
//         const commentHTML = `
//             <article class="comment-container">
//                 <div class="contest-comment-show">
//                     <div>
//                         <div class="comment-card">
//                             <div class="contest-comment-userinfo">
//                                 <a href="/m/${comment.user}" class="profile-avatar-container avatar">
//                                     <img src="${comment.profile}" />
//                                 </a>
//                                 <div class="nick">
//                                     <div class="nickname-container user-nick-wrapper">
//                                         <p class="nickname-text">
//                                             <a class="user-nick nick" href="/m/${comment.user}">
//                                                 ${comment.user}
//                                             </a>
//                                         </p>
//                                     </div>
//                                     ${isAuthor}
//                                 </div>
//                                 <p>| ${comment.date}</p>
//                             </div>
//                             <div class="contest-comment-content">
//                                 <div>${comment.content}</div>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="contest-comment-buttons"></div>
//                 </div>
//             </article>
//         `;
//
//         commentSection.insertAdjacentHTML("beforeend", commentHTML);
//     });
// };
//
// // 페이지가 로드될 때 댓글 렌더링
// renderComments();

const commentTextarea = document.getElementById("comment-content");
const submitButton = document.querySelector(".submit-comment-button");

// textarea 입력 이벤트 처리
commentTextarea.addEventListener("input", () => {
    if (commentTextarea.value.trim() !== "") {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
});

// 댓글 작성 버튼 클릭 이벤트 처리
submitButton.addEventListener("click", () => {
    const commentText = commentTextarea.value.trim();
    if (commentText) {
        alert(`댓글이 작성되었습니다: ${commentText}`);
        commentTextarea.value = "";
        submitButton.disabled = true;
    }
});

function timeForToday(datetime) {
    const today = new Date();
    const date = new Date(datetime);

    let gap = Math.floor((today.getTime() - date.getTime()) / 1000 / 60);

    if (gap < 1) {
        return "방금 전";
    }

    if (gap < 60) {
        return `${gap}분 전`;
    }

    gap = Math.floor(gap / 60);

    if (gap < 24) {
        return `${gap}시간 전`;
    }

    gap = Math.floor(gap / 24);

    if (gap < 31) {
        return `${gap}일 전`;
    }

    gap = Math.floor(gap / 31);

    if (gap < 12) {
        return `${gap}개월 전`;
    }

    gap = Math.floor(gap / 12);

    return `${gap}년 전`;
}









