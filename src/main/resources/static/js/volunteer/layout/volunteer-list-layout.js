const vtLayout = document.getElementById("contest-list");

// 메인 리스트 렌더링 함수
const showList = ({ lists, pagination }) => {
    let layText = ``;

    // 서버로부터 받은 lists가 비어있는지 확인
    if (!Array.isArray(lists) || lists.length === 0) {
        layText = `<p class="empty-component"> 게시글이 없습니다.</p>`;
    } else {
        lists.forEach((list) => {
            const today = new Date().toISOString().split('T')[0];
            console.log(`ID: ${list.id}, daysLeft: ${list.daysLeft}, vtEDate: ${list.vtEDate}, today: ${today}, createdDate: ${list.createdDate}, postViewCount: ${list.postViewCount}`);

            let daysLeftText;
            if (list.daysLeft > 0) {
                daysLeftText = `${list.daysLeft}일 남음`;
            } else if (list.vtEDate === today) {
                daysLeftText = "오늘까지";
            } else {
                daysLeftText = "종료됨";
            }

            // 리스트 항목 HTML 생성
            layText += `
                <a href="/volunteer/volunteer-inquiry/${list.id}" class="donation-list-a">
                    <div class="contest-info">
                        <div class="contest-info-top">
                            <div class="outline-info">
                                <div class="outline-info-category">
                                    <label class="deadline state active">
                                        ${daysLeftText}
                                    </label>
                                    <span></span>${list.postTypeDisplayName || '타입없음'}
                                </div>
                                <div class="outline-info-title">
                                    <h2>${list.postTitle || '제목없음'}</h2>
                                </div>
                                <div class="outline-info-companyDesc">
                                    ${list.postSummary || '요약본없음'}
                                </div>
                            </div>
                        </div>
                        <div class="contest-info-bottom">
                            <div class="profile-image-wrap" style="width: 20px; height: 20px; cursor: default;">
                                <img
                                    class="profile-image"
                                    alt="profile-image"
                                    src="${list.profileImage || 'https://via.placeholder.com/20'}"
                                    style="width: 20px; height: 20px; border-radius: 50%; object-fit: cover;"
                                />
                            </div>
                            <div class="contest-info-bottom-user-nick">
                                ${list.memberNickName || '닉네임없음'}
                            </div>
                            <div class="contest-info-bottom-view-icon">
                                <svg type="eye16" color="#8E94A0" viewBox="0 0 16 16" class="trophy-svg">
                                    <path
                                        d="M9.99999 8.00001C9.99999 9.10458 9.10456 10 7.99999 10C6.89542 10 5.99999 9.10458 5.99999 8.00001C5.99999 6.89544 6.89542 6.00001 7.99999 6.00001C9.10456 6.00001 9.99999 6.89544 9.99999 8.00001Z"
                                        stroke-width="1.2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                    <path
                                        d="M8.00028 3.33334C5.0152 3.33334 2.48834 5.29526 1.63882 7.99999C2.48833 10.7047 5.01519 12.6667 8.0003 12.6667C10.9854 12.6667 13.5122 10.7048 14.3618 8.00003C13.5123 5.29529 10.9854 3.33334 8.00028 3.33334Z"
                                        stroke-width="1.2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                </svg>
                            </div>
                            <div class="contest-info-bottom-view-count">
                                ${list.postViewCount || '0'}
                            </div>
                            <svg type="calendar12" color="#8E94A0" viewBox="0 0 12 12" class="calendar-svg" style="margin-left: 20px">
                                <rect x="0.6" y="2.6" width="10.8" height="8.8" rx="1.4" stroke-width="1.2"></rect>
                                <path d="M3 2V1" stroke-width="1.2" stroke-linecap="round"></path>
                                <path d="M9 2V1" stroke-width="1.2" stroke-linecap="round"></path>
                                <path d="M1 5H12" stroke-width="1.2"></path>
                                <rect x="3" y="7" width="2" height="2" rx="0.5"></rect>
                            </svg>
                            <div class="contest-info-bottom-created-date">
                                작성일 : ${list.createdDate || '작성일 없음'}
                            </div>
                        </div>
                    </div>
                    <ul class="prize-info">
                        <li class="prize-info-row">
                            <div class="prize-info-row-key">
                                <svg type="contest16" color="#8E94A0" viewBox="0 0 16 16" class="trophy-svg">
                                    <path
                                        d="M8.10192 14.5629H4.95866C4.95866 11.6908 8.10192 11.7272 8.10192 11.7272V9.8596C4.71508 9.8596 4.59534 7.1023 4.59534 7.1023L4.23682 2H8.10192"
                                        stroke-width="1.2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                    <path
                                        d="M8.10193 14.5629H11.2452C11.2452 11.6908 8.10193 11.7272 8.10193 11.7272V9.8596C11.4881 9.8596 11.6078 7.1023 11.6078 7.1023L11.9663 2H8.10193"
                                        stroke-width="1.2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                </svg>
                                <span>지원한 인원</span>
                            </div>
                            <div class="prize-info-row-label">
                                ${list.nowRecruitmentCount + "명" || '모집인원없음'}
                            </div>
                        </li>
                        <li class="prize-info-row">
                            <div class="prize-info-row-key">
                                <svg type="contest16" color="#8E94A0" viewBox="0 0 16 16" class="trophy-svg">
                                    <path
                                        d="M8.10192 14.5629H4.95866C4.95866 11.6908 8.10192 11.7272 8.10192 11.7272V9.8596C4.71508 9.8596 4.59534 7.1023 4.59534 7.1023L4.23682 2H8.10192"
                                        stroke-width="1.2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                    <path
                                        d="M8.10193 14.5629H11.2452C11.2452 11.6908 8.10193 11.7272 8.10193 11.7272V9.8596C11.4881 9.8596 11.6078 7.1023 11.6078 7.1023L11.9663 2H8.10193"
                                        stroke-width="1.2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                </svg>
                                <span>모집 인원</span>
                            </div>
                            <div class="prize-info-row-label">
                                ${list.recruitmentCount + "명" || '모집인원없음'}
                            </div>
                        </li>
                        <li class="prize-info-row">
                            <div class="prize-info-row-key">
                                <svg type="calendar12" color="#8E94A0" viewBox="0 0 12 12" class="calendar-svg">
                                    <rect x="0.6" y="2.6" width="10.8" height="8.8" rx="1.4" stroke-width="1.2"></rect>
                                    <path d="M3 2V1" stroke-width="1.2" stroke-linecap="round"></path>
                                    <path d="M9 2V1" stroke-width="1.2" stroke-linecap="round"></path>
                                    <path d="M1 5H12" stroke-width="1.2"></path>
                                    <rect x="3" y="7" width="2" height="2" rx="0.5"></rect>
                                </svg>
                                <span>남은 기간</span>
                            </div>
                            <div class="prize-info-row-label">
                                ${daysLeftText}
                            </div>
                        </li>
                        <li class="prize-info-row">
                            <div class="prize-info-row-key"></div>
                            <div class="prize-info-row-label">
                                <div class="prize-info-row-label-date">
                                    ${list.vtSDate || '시작시간없음'} ~ ${list.vtEDate || '끝나는시간없음'} (24시까지)
                                </div>
                            </div>
                        </li>
                    </ul>
                </a>
            `;
        });
    }
    vtLayout.innerHTML = layText;

    // 리스트 렌더링 후 페이징 버튼 생성 함수 호출
    showPaging(pagination);
};

// 페이징 버튼 생성 함수
const showPaging = (pagination) => {
    const pageContainer = document.querySelector(".page-container");
    if (!pageContainer) {
        console.error("The page-container element is missing in the DOM.");
        return;
    }

    let pagingText = ``;

    // 이전 페이지 버튼
    if (pagination.page > 1) {
        const prevPage = pagination.page - 1;
        pagingText += `
            <a href="#" class="page-btn" data-page="${prevPage}">
                <svg viewBox="0 0 12 12" class="icon-default">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.31112 11.0004C8.14812 11.0004 7.98612 10.9424 7.86312 10.8264L3.18312 6.43738C2.93912 6.20738 2.93912 5.83638 3.18412 5.60738L7.92012 1.17438C8.16712 0.942377 8.56712 0.942377 8.81412 1.17138C9.06112 1.40038 9.06212 1.77238 8.81612 2.00338L4.52212 6.02238L8.75912 9.99738C9.00412 10.2294 9.00312 10.6014 8.75512 10.8294C8.63212 10.9434 8.47112 11.0004 8.31112 11.0004Z"
                    ></path>
                </svg>
            </a>
        `;
    }

    // 페이지 번호 버튼 생성
    for (let i = pagination.startPage; i <= Math.min(pagination.endPage, pagination.realEnd); i++) {
        pagingText += `
            <a class="page-btn ${pagination.page === i ? 'active' : ''}" data-page="${i}" href="#">
                ${i}
            </a>
        `;
    }

    // 다음 페이지 버튼
    if (pagination.page < pagination.realEnd) {
        const nextPage = pagination.page + 1;
        pagingText += `
            <a href="#" class="page-btn" data-page="${nextPage}">
                <svg viewBox="0 0 12 12" class="icon-default">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.68888 11.0004C3.85188 11.0004 4.01388 10.9424 4.13688 10.8264L8.81688 6.43738C9.06088 6.20738 9.06088 5.83638 8.81588 5.60738L4.07988 1.17438C3.83288 0.942377 3.43288 0.942377 3.18588 1.17138C2.93888 1.40038 2.93788 1.77238 3.18388 2.00338L7.47788 6.02238L3.24088 9.99738C2.99588 10.2294 2.99688 10.6014 3.24488 10.8294C3.36788 10.9434 3.52888 11.0004 3.68888 11.0004Z"
                    ></path>
                </svg>
            </a>
        `;
    }

    pageContainer.innerHTML = pagingText;

    // 페이지 버튼에 이벤트 리스너 추가
    addPageButtonEventListeners();
};

// 페이지 버튼에 이벤트 리스너 추가 함수
const addPageButtonEventListeners = () => {
    document.querySelectorAll(".page-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const selectedPage = parseInt(button.getAttribute("data-page"), 10);
            console.log("선택된 페이지:", selectedPage);

            // 전역 변수 업데이트
            currentPage = selectedPage;

            // 데이터 재로드
            fetchVolunteers(currentOrder, currentPage);

            // URL 업데이트
            const url = new URL(window.location);
            url.searchParams.set('page', currentPage);
            window.history.pushState({}, '', url);
        });
    });
};







