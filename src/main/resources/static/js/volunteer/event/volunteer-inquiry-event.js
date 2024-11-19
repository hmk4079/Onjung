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

// 초기 상태 설정
tabs[0].classList.add("active"); // 첫 번째 탭 활성화
commentSection.style.display = "none";
commentInputSection.style.display = "none"; // 처음에는 댓글 작성 창 숨기기

// 예시로 넣은 데이터
const totalPrize = 50000;
const currentPrize = 30000;

const percentage = Math.floor((currentPrize / totalPrize) * 100);

document.querySelector(".graph-status .num").textContent = percentage;
document.querySelector(".graph-bar span").style.width = `${percentage}%`;
document.querySelector(
    ".total-prize"
).textContent = `${currentPrize} 명/ ${totalPrize} 명`;

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

// let daysLeftText;
// if (list.daysLeft > 0) {
//     daysLeftText = `${list.daysLeft}일 남음`;
// } else if (list.vtEDate === today) {
//     daysLeftText = "오늘까지";
// } else {
//     daysLeftText = "종료됨";
// }

const list = {
    daysLeft: 5, // 예: 5일 남음
    vtEDate: '2024-04-27' // 오늘 날짜와 비교
};
const today = '2024-04-27'; // 오늘 날짜 (예시)

let daysLeftText;
if (list.daysLeft > 0) {
    daysLeftText = `${list.daysLeft}일 남음`;
} else if (list.vtEDate === today) {
    daysLeftText = "오늘까지";
} else {
    daysLeftText = "종료됨";
}

// HTML 요소에 값 삽입
document.getElementById('daysLeftText').textContent = daysLeftText;

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
                    <div class="contest-comment-buttons"></div>
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
