const tabs = document.querySelectorAll(".tabs .tab");
const contentContainer = document.querySelector(".content-wrap"); // 내용 섹션 컨테이너
const commentSection = document.querySelector(".comment-wrap"); // 댓글 섹션
const commentInputSection = document.querySelector(".contest-comment-input"); // 댓글 작성 창

// 댓글 렌더링 함수
const renderComments = () => {
    const commentSection = document.getElementById("comment-section");
    commentSection.innerHTML = "";

    comments.forEach((comment) => {
        const isAuthorWriter = comment.author ? '<p class="comment">작성자</p>' : "";

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
                                    ${isAuthorWriter}
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