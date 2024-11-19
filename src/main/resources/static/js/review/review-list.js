// 드롭다운 필터 설정
const filterContainer = document.querySelector(".review-list-filter");
const headerWrap = filterContainer.querySelector(".header-wrap");
const bottomWrap = filterContainer.querySelector(".bottom-wrap");
const arrow = filterContainer.querySelector(".arrow");
const items = filterContainer.querySelectorAll(".item");
const inputField = headerWrap.querySelector("input");
const pagingDiv = document.querySelector("nav.page-container.paginator");

// 드롭다운 열고 닫기
headerWrap.addEventListener("click", () => {
    const isVisible = bottomWrap.style.visibility === "visible";
    bottomWrap.style.visibility = isVisible ? "hidden" : "visible";
    arrow.style.transform = isVisible ? "rotate(90deg)" : "rotate(-90deg)";
});

// 항목 클릭 시 필터 업데이트 및 드롭다운 닫기
items.forEach((item) => {
    item.addEventListener("click", () => {
        // 모든 항목의 활성화 클래스 제거
        items.forEach((i) => i.classList.remove("active"));
        // 선택된 항목에 활성화 클래스 추가
        item.classList.add("active");
        // 선택된 항목의 텍스트를 input에 반영
        inputField.value = item.textContent.trim();
        // 드롭다운 닫기
        bottomWrap.style.visibility = "hidden";
        arrow.style.transform = "rotate(90deg)";
    });
});

// 드롭다운 외부 클릭 시 닫기
document.addEventListener("click", (event) => {
    if (!filterContainer.contains(event.target)) {
        bottomWrap.style.visibility = "hidden";
        arrow.style.transform = "rotate(90deg)";
    }
});

const tabs = document.querySelectorAll(".tab-container .tab");
const reviewListContainer = document.querySelector(".review-list-cards");

// 별점 설정 함수
// const setStarRating = (score, reviewElement) => {
//     const stars = reviewElement.querySelectorAll(".stunning-star");
//     stars.forEach((star, index) => {
//         index < score
//             ? star.classList.add("active")
//             : star.classList.remove("active");
//     });
// };

const showVolunteerPosts = () => {
    reviewListContainer.innerHTML = '';
    const cardDivider = document.createElement("div");
    cardDivider.classList.add(
        "review-card-divider",
        "review-rectangle-card"
    );
    let text = '';
    let lightStar = `<svg class="gKXOVf dryTGB stunning-star active" viewBox="0 0 32 32">
                             <path fill-rule="evenodd" clip-rule="evenodd" d="M29.2658 12.7468C29.1247 12.3246 28.7691 12.0213 28.3358 11.9557L20.5396 10.7669L17.0476 3.33933C16.851 2.9249 16.4499 2.66602 15.9977 2.66602C15.5444 2.66602 15.1433 2.9249 14.9467 3.34044L11.4546 10.7669L3.65733 11.9557C3.22625 12.0213 2.8696 12.3246 2.72739 12.7468C2.58295 13.179 2.68961 13.649 3.00626 13.9734L8.67481 19.7066L7.32933 27.9441C7.25267 28.404 7.43933 28.8551 7.81486 29.1196C8.01374 29.2607 8.24594 29.3318 8.47704 29.3318C8.66592 29.3318 8.85702 29.284 9.03145 29.1873L15.9977 25.3441L22.9628 29.1873C23.3506 29.4007 23.8183 29.3751 24.1794 29.1196C24.5538 28.8551 24.7416 28.404 24.6638 27.9452L23.2839 19.8066L28.988 13.9734C29.3047 13.649 29.4113 13.1801 29.2658 12.7468Z"></path>
                             <defs></defs>
                       </svg>`;
    let star = `<svg class="gKXOVf dryTGB stunning-star" viewBox="0 0 32 32">
                             <path fill-rule="evenodd" clip-rule="evenodd" d="M29.2658 12.7468C29.1247 12.3246 28.7691 12.0213 28.3358 11.9557L20.5396 10.7669L17.0476 3.33933C16.851 2.9249 16.4499 2.66602 15.9977 2.66602C15.5444 2.66602 15.1433 2.9249 14.9467 3.34044L11.4546 10.7669L3.65733 11.9557C3.22625 12.0213 2.8696 12.3246 2.72739 12.7468C2.58295 13.179 2.68961 13.649 3.00626 13.9734L8.67481 19.7066L7.32933 27.9441C7.25267 28.404 7.43933 28.8551 7.81486 29.1196C8.01374 29.2607 8.24594 29.3318 8.47704 29.3318C8.66592 29.3318 8.85702 29.284 9.03145 29.1873L15.9977 25.3441L22.9628 29.1873C23.3506 29.4007 23.8183 29.3751 24.1794 29.1196C24.5538 28.8551 24.7416 28.404 24.6638 27.9452L23.2839 19.8066L28.988 13.9734C29.3047 13.649 29.4113 13.1801 29.2658 12.7468Z"></path>
                             <defs></defs>
                       </svg>`;
    reviews.forEach((review) => {
        let stars = '';
        for (let i = 0; i < review.reviewStarRate; i++) {
            stars += lightStar;
        }
        for (let i = 0; i < 5 - review.reviewStarRate; i++) {
            stars += star;
        }
        text += `
            <div class="review-part">
                <a class="review-thumbnail" href="/contest/view/152313">
                    <div class="card-image-container">
                        <div class="card-image-default card-image">
                            <div>
                                <div class="observer"></div>
                                <img src="https://cdn-dantats.stunning.kr/prod/portfolios/37db3714-d292-481e-a288-d29b7c2a6279/covers/eavxYqGTx3xsnczv.%EC%88%A8_1.%EC%84%AC%EB%84%A4%EC%9D%BC.jpg.small?s=1000x1000&amp;e=195x249&amp;t=crop&amp;q=100&amp;f=webp" alt="봉사활동 후기 이미지" />
                            </div>
                        </div>
                    </div>
                </a>
                <div class="review-content">
                    <div class="avatar-container">
                        <a class="avatar-default avatar review-content-avatar" href="/m/jk8171822">
                            <img src="https://cdn-dantats.stunning.kr/static/feature/profile/default-profile.png.small?q=80&amp;f=webp&amp;t=crop&amp;s=256x256" />
                        </a>
                        <div class="review-user-info">
                            <div class="review-score">
                                <div class="review-rate-star">
                                    ${stars}
                                </div>
                                <span>${review.reviewStarRate}점</span>
                            </div>
                            <div class="review-user">
                                <span class="review-user-nick"><a href="/m/jk8171822" class="review-user-nick-inner">${review.memberNickName}</a></span>
                                <span class="review-user-industry">${review.vtGroupName}</span>
                                <span class="review-user-date">${review.updatedDate}</span>
                            </div>
                        </div>
                    </div>
                    <div class="review-comment-container">
                        <div class="review-comment-area">
                            <div class="review-comment">
                                ${review.postContent}
                            </div>
                        </div>
                        <a class=" hLIslS review-thumbnail-m" href="/contest/view/153179"><div class="sc-eXBvqI FYvcO cover ">
                        <div class="sc-evrZIY jslVlk aspect-ratio-card-wrapper card-image ">
                        <div><div class="observer">
                        </div>
                        <img src=
                       https://cdn-dantats.stunning.kr/prod/portfolios/37db3714-d292-481e-a288-d29b7c2a6279/covers/eavxYqGTx3xsnczv.%EC%88%A8_1.%EC%84%AC%EB%84%A4%EC%9D%BC.jpg.small?s=1000x1000&e=195x249&t=crop&q=100&f=webp
                        alt="한의원의 신탄진 고든 한의원 이미지" class="sc-llJcti hkAQYM" style="display:none">
                        </div>
                        </div>
                        </div>
                        </a>
                    </div>
                </div>
            </div>`; });
    cardDivider.innerHTML = text;
    reviewListContainer.appendChild(cardDivider);
};

// 페이지 네비게이션을 표시하는 함수
const showPaging = () => {
    let text = ``; // HTML 내용을 저장할 변수 초기화

    // 이전 페이지 버튼 추가
    if (pagination.page > 1) {
        text += `<a 
                    href="/review/review-list?page=${pagination.page - 1}" 
                    class="page-btn prev"
                    ><svg
                        viewBox="0 0 12 12"
                        class="icon-default"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.68888 11.0004C3.85188 11.0004 4.01388 10.9424 4.13688 10.8264L8.81688 6.43738C9.06088 6.20738 9.06088 5.83638 8.81588 5.60738L4.07988 1.17438C3.83288 0.942377 3.43288 0.942377 3.18588 1.17138C2.93888 1.40038 2.93788 1.77238 3.18388 2.00338L7.47788 6.02238L3.24088 9.99738C2.99588 10.2294 2.99688 10.6014 3.24488 10.8294C3.36788 10.9434 3.52888 11.0004 3.68888 11.0004Z"
                        ></path>
                        <defs></defs>
                    </svg>
                </a>`;
    }

    // 페이지 번호 생성
    for (let i = pagination.startPage; i <= pagination.endPage; i++) {
        if (pagination.page === i) {
            // 현재 페이지인 경우
            text += `<a class="page-btn active">${i}</a>`;
        } else {
            // 다른 페이지인 경우
            text += `<a href="/review/review-list?page=${i}" class="page-btn">${i}</a>`;
        }
    }

    // 다음 페이지 버튼 추가: endPage가 realEnd보다 작거나, 더 로드할 데이터가 있을 경우
    const shouldShowNext = pagination.endPage < pagination.realEnd || (pagination.endRow < pagination.total);

    // 다음 페이지 버튼 추가: endPage가 realEnd보다 작거나, 더 로드할 데이터가 있을 경우
    if (shouldShowNext) {
        text += `<a 
                    href="/review/review-list?page=${pagination.page + 1}" 
                    class="page-btn next"
                    ><svg
                        viewBox="0 0 12 12"
                        class="icon-default"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.68888 11.0004C3.85188 11.0004 4.01388 10.9424 4.13688 10.8264L8.81688 6.43738C9.06088 6.20738 9.06088 5.83638 8.81588 5.60738L4.07988 1.17438C3.83288 0.942377 3.43288 0.942377 3.18588 1.17138C2.93888 1.40038 2.93788 1.77238 3.18388 2.00338L7.47788 6.02238L3.24088 9.99738C2.99588 10.2294 2.99688 10.6014 3.24488 10.8294C3.36788 10.9434 3.52888 11.0004 3.68888 11.0004Z"
                        ></path>
                        <defs></defs>
                    </svg>
                </a>`;
    }

    // 페이지 네비게이션을 HTML 요소에 삽입
    pagingDiv.innerHTML = text;
}

showVolunteerPosts();
showPaging();

// 부모 컨테이너 가져오기
const rightBarContainer = document.querySelector(".right-bar-container");

// 9번 반복해서 right-bar-img-wrap 요소 생성
for (let i = 0; i < 9; i++) {
    const rightBarImgWrap = document.createElement("div");
    rightBarImgWrap.classList.add("right-bar-img-wrap");
    rightBarImgWrap.innerHTML = `
        <a href="" class="right-bar">
            <div class="right-bar-img-container cover">
                <div class="card-image-default aspect-ratio-card-wrapper card-image">
                    <div>
                        <div class="observer"></div>
                        <img
                            src="https://cdn-dantats.stunning.kr/prod/portfolios/37db3714-d292-481e-a288-d29b7c2a6279/covers/eavxYqGTx3xsnczv.%EC%88%A8_1.%EC%84%AC%EB%84%A4%EC%9D%BC.jpg.small?s=1000x1000&amp;e=195x249&amp;t=crop&amp;q=100&amp;f=webp"
                            alt="삼성숨정신건강의학과 의 삼성숨정신건강의학과의원  이미지"
                        />
                    </div>
                </div>
            </div>
            <p class="card-img-in-right" title="삼성숨정신건강의학과의원 로고+간판 콘테스트">
                삼성숨정신건강의학과의원 로고+간판 콘테스트
            </p>
        </a>
    `;
    rightBarContainer.appendChild(rightBarImgWrap);
}

document.addEventListener("DOMContentLoaded", function ()  {
    const reviewListContainer = document.querySelector(
        "div.review-card-divider.review-rectangle-card"
    );
    let sortOrder = {};

    function sortReviews(order) {
        const reviewDatas = Array.from(
            reviewListContainer.querySelectorAll("div.review-part")
        );

        // 모든 게시글 다시 표시
        reviewDatas.forEach((reviewData) => (reviewData.style.display = "flex"));

        if (order === "최신순") {
            reviewDatas.sort((a, b) => {
                console.log("최신순");
                const countA = a
                    .querySelector("span.review-user-date")
                    .textContent.trim();
                const countB = b
                    .querySelector("span.review-user-date")
                    .textContent.trim();
                return sortOrder[order] === "asc"
                    ? countA - countB
                    : countB - countA;
            });
        } else if (order === "높은 평점순") {
            reviewDatas.sort((a, b) => {
                console.log("높은 평점순");
                const countA = a
                    .querySelector("div.review-score span")
                    .textContent.trim().substring(0,1);
                const countB = b
                    .querySelector("div.review-score span")
                    .textContent.trim().substring(0,1);
                return sortOrder[order] === "desc"
                    ? countA - countB
                    : countB - countA;
            });
        }

        // 정렬된 순서대로 다시 DOM에 추가
        reviewListContainer.innerHTML = "";
        reviewDatas.forEach((reviewData) => {
            reviewListContainer.appendChild(reviewData);
        });
    }

    // 페이지 로드 시 기본적으로 '가입일 순'은 내림차순, '이름 순'은 오름차순으로 정렬
    sortOrder["최신순"] = "desc";
    sortOrder["높은 평점순"] = "desc";

    // 기본 정렬
    sortReviews("최신순");

    // 각 옵션 클릭 시 정렬 및 필터링 수행
    items.forEach(function (item) {
        item.addEventListener("click", function () {
            const order = item.textContent.trim();

            // 클릭 시마다 정렬 순서 변경
            sortOrder[order] = sortOrder[order] === "asc" ? "desc" : "asc";

            // 모든 옵션의 선택된 클래스 초기화
            items.forEach((it) => it.classList.remove("active"));

            // 클릭된 옵션에 선택된 클래스 추가
            item.classList.add("active");

            // 선택된 옵션에 따라 정렬 또는 필터링 수행
            sortReviews(order);
        });
    });
})
