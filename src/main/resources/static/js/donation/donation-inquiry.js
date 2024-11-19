const tabs = document.querySelectorAll(".tabs .tab");
const contentContainer = document.querySelector(".content-wrap"); // 내용 섹션 컨테이너
const commentSection = document.querySelector(".comment-wrap"); // 댓글 섹션
const commentInputSection = document.querySelector(".contest-comment-input"); // 댓글 작성 창
const postSummaryWrap = document.querySelector("div.post-summary");
const goalPointWrap = document.querySelector("div.goal-point");
const postContentWrap = document.querySelector("div.post-content");
const attachmentList = document.querySelector("ul.attach-list.attachments");

const donationAmountInput = document.querySelector("input#donation-amount-input");
const donationButtonContainer = document.querySelector("div.donation-btn-container.tooltip");
const donationDetailSection = document.querySelector("section.info-box-container.meta");
const postTitleWrap = document.querySelector("h2.post-title");
const userNickNameWrap = document.querySelector("a.user-nickname");
const donationDifference = document.querySelector("div.donation-difference");
const donationPeriod = document.querySelector("span.donation-period");
const donationButtonWrap = document.querySelector("div.donation-btn-wrap");
const postViewCount = document.querySelector("div.post-view-count");

let inputFlag = false;

const fetchAccountBalance = async (memberId) => {
    try {
        const response = await fetch(`/mypage/account-balance/${memberId}`);
        if (!response.ok) throw new Error("서버에서 가상계좌 데이터를 가져오는데 실패했습니다.");

        const data = await response.json();
        console.log("가상계좌 데이터: ", data);
        if(parseInt(donationAmountInput.value) <= data) {
            donationButton.href = `/donation-records/write/donationId=${new URL(location.href).searchParams.get('postId')}&donationAmount=${donationAmountInput.value}`;
        } else {
            donationButton.href = `/donation/charge/${parseInt(donationAmountInput.value) - data}`;
        };
    } catch (error) {
        console.error("가상계좌 데이터 불러오기 오류: ", error) ;
        alert("가상계좌 데이터를 불러오는데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
}

postSummaryWrap.innerText = donation.postSummary;
goalPointWrap.innerText = donation.goalPoint;
postContentWrap.innerText = donation.postContent;
postTitleWrap.innerText = donation.postTitle;
userNickNameWrap.innerText = donation.memberNickName;
userNickNameWrap.href = ``;
donationDifference.innerText = new Date(donation.donationEDate).getDate() - new Date(donation.donationSDate).getDate() + 1;
donationPeriod.innerText = `${donation.donationSDate} ~ ${donation.donationEDate}`;
postViewCount.innerText = donation.postViewCount;
console.log(donation.postViewCount);

// donationButtonWrap.innerHTML = '';
// let text = '';
// if(member.id != donation.memberId) {
//     text = `<div
//                                                 class="donation-btn-container tooltip"
//                                             >
//                                                 <input type="text" id="donation-amount-input" style="display: none; text-align: end" placeholder="기부할 금액을 입력하세요. ex) 10000">
//                                                 <a class="donation-btn-style"
//                                                     ><span
//                                                         class="visual-correction"
//                                                         >기부하기</span
//                                                     ></a
//                                                 >
//                                             </div>`;
//     donationButtonWrap.append(text);
const donationButton = document.querySelector("a.donation-btn-style");
donationButton.addEventListener("click", () => {
    if(donationAmountInput.style.display === "none") {
        donationAmountInput.style.display = "block";
        donationButtonContainer.style = "flex-direction: column; gap: 10px";
        donationDetailSection.style["margin-bottom"] = "10px";
        inputFlag = true;
    } else if(donationAmountInput.style.display === "block" && inputFlag){
        fetchAccountBalance(member.id);
        inputFlag = false;
    };
});
// } else {
//     text = `<div class="donation-btn-container report-wrap">
//                                                 <a class="donation-btn-style2 go-update admin-btn"
//                                                     ><span
//                                                         class="visual-correction"
//                                                         >수정하기</span
//                                                     ></a
//                                                 >
//                                                 <div class="space"></div>
//                                                 <a class="donation-btn-style2 go-delete admin-btn"
//                                                     ><span
//                                                         class="visual-correction"
//                                                         >삭제하기</span
//                                                     ></a
//                                                 >
//                                             </div>`;
// donationButtonWrap.append(text);
const updateButton = document.querySelector("a.go-update");
const deleteButton = document.querySelector("a.go-delete");

updateButton.addEventListener("click", (e) => {
    location.href = `/donation/donation-update?postId=${donation.id}`;
});

deleteButton.addEventListener("click", (e) => {
    location.href = `/donation/donation-delete?postId=${donation.id}`;
})
// }

attachmentList.innerHTML = '';
let liText = '';
const liElement = document.createElement("li");
attachments.forEach((attachment) => {

    liText += `<p
                className="file-name"
                title="1725933473451-0.jpg"
            >
                ${attachment.attachmentFileRealName}
            </p>
            <span className="file-download"
            ><span className="size"
            >${(attachment.attachmentFileSize / 1024).toFixed(1)} KB </span
            ><a
                href="/attachment/download?fileName=${attachment.attachmentFilePath + "/" + attachment.attachmentFileName + attachment.attachmentFileRealName}"
                download="${attachment.attachmentFileRealName}"
                className="attach-save"
            ><span
                className="visual-correction"
            >저장</span
            ></a
            ></span
            >`;
    liElement.innerHTML += liText;
});
attachmentList.append(liElement);

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

// 초기 상태 설정
tabs[0].classList.add("active"); // 첫 번째 탭 활성화
commentSection.style.display = "none";
commentInputSection.style.display = "none"; // 처음에는 댓글 작성 창 숨기기

const totalPrize = parseInt(donation.goalPoint);
const currentPrize = parseInt(donation.currentPoint); // 예시로 100% 이상을 넘는 값
console.log(donation.currentPoint);
console.log(currentPrize);

// 퍼센트 계산 (100% 이상일 수 있음)
const percentage = Math.floor((currentPrize / totalPrize) * 100);

document.querySelector(".graph-status .num").textContent = `${percentage}`;

// 그래프의 width는 최대 100%로 제한
document.querySelector(".graph-bar span").style.width = `${Math.min(
    percentage,
    100
)}%`;

document.querySelector(
    ".total-prize"
).textContent = `${currentPrize} 포인트 / ${totalPrize} 포인트`;

// 예시 댓글 데이터 배열
const comments = [
    {
        user: "로고싱",
        profile:
            "https://cdn-dantats.stunning.kr/static/feature/profile/default-profile.png.small?q=80&f=webp&t=crop&s=256x256",
        date: "2024.10.06 21:53:00",
        content: "원컬러 혹은 두컬러의 단순한 색상은 지양하실까요?",
        author: false,
    },
    {
        user: "큰나무이비인후과",
        profile:
            "https://cdn-dantats.stunning.kr/static/feature/profile/default-profile.png.small?q=80&f=webp&t=crop&s=256x256",
        date: "2024.10.06 21:59:45",
        content: "다 가능합니다.",
        author: true,
    },
    {
        user: "이지민",
        profile:
            "https://cdn-dantats.stunning.kr/static/feature/profile/default-profile.png.small?q=80&f=webp&t=crop&s=256x256",
        date: "2024.10.06 21:59:45",
        content: "안녕하세요",
        author: false,
    },
];

// 댓글 렌더링 함수
const renderComments = () => {
    const commentSection = document.getElementById("comment-section");
    commentSection.innerHTML = "";

    comments.forEach((comment) => {
        const isAuthor = comment.author ? '<p class="comment">작성자</p>' : "";

        const commentHTML = `
            <article class="comment-container">
                <div class="contest-comment-show">
                    <div>
                        <div class="comment-card">
                            <div class="contest-comment-userinfo">
                                <a href="/m/${comment.user}" class="profile-avatar-container avatar">
                                    <img src="${comment.profile}" />
                                </a>
                                <div class="nick">
                                    <div class="nickname-container user-nick-wrapper">
                                        <p class="nickname-text">
                                            <a class="user-nick nick" href="/m/${comment.user}">
                                                ${comment.user}
                                            </a>
                                        </p>
                                    </div>
                                    ${isAuthor}
                                </div>
                                <p>| ${comment.date}</p>
                            </div>
                            <div class="contest-comment-content">
                                <div>${comment.content}</div>
                            </div>
                        </div>
                    </div>
                    <div class="contest-comment-buttons">
                    <button id= "update-btn">수정</button>
                    <button id= "delete-btn">삭제</button>
                    </div>
                </div>
            </article>
        `;

        commentSection.insertAdjacentHTML("beforeend", commentHTML);
    });
};

// 페이지가 로드될 때 댓글 렌더링
renderComments();

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

// // 모달 처리
// const modal = document.getElementById("profileModal");
// const reportBtn = document.getElementById("report-btn"); // 신고하기 버튼
// const span = document.getElementsByClassName("close")[0];
// const defaultImage = "https://www.wishket.com/static/img/default_avatar_c.png";
//
// // 신고하기 버튼 클릭 시 모달 열기
// reportBtn.onclick = () => {
//     modal.style.display = "block";
// };
//
// // 모달의 닫기 버튼 클릭 시 모달 닫기
// span.onclick = () => {
//     modal.style.display = "none";
// };
//
// // 모달 외부 클릭 시 모달 닫기
// window.onclick = (event) => {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// };
//
// // "신고하기" 버튼 클릭 시 alert 실행 및 모달 닫기
// const reportSubmitBtn = document.getElementById("reportSubmitBtn");
//
// reportSubmitBtn.onclick = function () {
//     alert("게시글 신고가 완료되었습니다.");
//     modal.style.display = "none"; // 신고하기 버튼 클릭 후 모달 닫기
// };
// =====================================관리자=====================================================

// document.addEventListener("DOMContentLoaded", () => {
const AdminBtn = document.querySelector(".donation-btn-container.report-wrap");
console.log("JavaScript에서 가져온 AdminBtn:", AdminBtn);
console.log("세션에서 전달된 사용자 정보:", member);
console.log(member.memberType);
console.log(member.memberLoginType);
// 세션의 member 정보가 존재하는지 확인
// if (member.memberLoginType === "ADMIN") {
//     document.querySelectorAll(".donation-btn-style2.admin-btn").forEach(btn => {
//         btn.style.display = "block";
//     });
// } else {
//     document.querySelectorAll(".donation-btn-style2.admin-btn").forEach(btn => {
//         btn.style.display = "none";
//     });
// }
// });

// ==========================================================================================
