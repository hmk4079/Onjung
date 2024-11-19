document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll(
        '.contest-list-state input[type="radio"]'
    );
    const labels = document.querySelectorAll(".contest-list-state label");
    const accordionDescription = document.querySelector(
        ".accordion-description"
    );
    const svgToggle = document.querySelector(".status-svg svg"); // SVG 요소 선택
    const openButton = document.querySelector(".open-button");
    const inputField = document.querySelector(".header-wrap input");
    const headerWrap = document.querySelector(".header-wrap");
    const bottomWrap = document.querySelector(".bottom-wrap");
    const listItems = document.querySelectorAll(".list-wrap .item");
    const arrowIcon = document.querySelector(".header-wrap .arrow");

    // 기본적으로 SVG 아이콘에 active 클래스 부여
    openButton.classList.add("active");
    svgToggle.style.transform = "rotate(0deg)"; // 기본 상태에서 위쪽 보기

    // 라디오 버튼 클릭 시 active 클래스 옮기기
    radioButtons.forEach((radio) => {
        radio.addEventListener("click", () => {
            labels.forEach((label) => label.classList.remove("active"));
            radio.closest("label").classList.add("active");
            console.log(`선택된 상태: ${radio.value}`);
        });
    });

    // 아코디언 열기/닫기 및 화살표 회전
    openButton.addEventListener("click", () => {
        const isVisible = accordionDescription.style.height !== "0px";

        if (isVisible) {
            accordionDescription.style.height = "0px";
            svgToggle.style.transform = "rotate(90deg)"; // 위쪽 보기
        } else {
            accordionDescription.style.height = "129px";
            svgToggle.style.transform = "rotate(0deg)"; // 아래쪽 보기
        }

        openButton.classList.toggle("active");
    });

    // header-wrap 클릭 시 드롭다운 열기/닫기
    headerWrap.addEventListener("click", (event) => {
        event.stopPropagation();
        const isVisible = bottomWrap.style.visibility === "visible";

        if (isVisible) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    // 각 정렬 옵션 클릭 시 이벤트 처리
    listItems.forEach((item) => {
        item.addEventListener("click", () => {
            listItems.forEach((el) => el.classList.remove("active"));
            item.classList.add("active");
            inputField.value = item.textContent.trim();
            closeDropdown();
        });
    });

    // 드롭다운 외부 클릭 시 닫기
    document.addEventListener("click", (event) => {
        if (
            !headerWrap.contains(event.target) &&
            !bottomWrap.contains(event.target)
        ) {
            closeDropdown();
        }
    });

    // 드롭다운 열기 함수
    function openDropdown() {
        bottomWrap.style.visibility = "visible";
        arrowIcon.style.transform = "rotate(270deg)"; // 아래쪽 보기
    }

    // 드롭다운 닫기 함수
    function closeDropdown() {
        bottomWrap.style.visibility = "hidden";
        arrowIcon.style.transform = "rotate(90deg)"; // 위쪽 보기
    }
});
// 목록 반복
const ulElement = document.getElementById("contest-list");

const createListItem = () => {
    const liElement = document.createElement("li");
    liElement.innerHTML = `
                                    <a
                                        href="/contest/view/149724/brief"
                                        class="donation-list-a"
                                        ><div class="contest-info">
                                            <div class="contest-info-top">
                                                <div class="outline-info">
                                                    <div
                                                        class="outline-info-category"
                                                    >
                                                        <label
                                                            class="deadline state active"
                                                            >18일 남음</label
                                                        >기타<span
                                                        ></span>일반/기타
                                                    </div>
                                                    <div
                                                        class="outline-info-title"
                                                    >
                                                        <h2>
                                                            제 2회 하나카드
                                                            plate 디자인 공모전
                                                        </h2>
                                                    </div>
                                                    <div
                                                        class="outline-info-companyDesc"
                                                    >
                                                        하나카드는 1978년
                                                        대한민국 최초로
                                                        신용카드를 만든 금융
                                                        회사로, 2014년
                                                        '하나SK카드'와
                                                        '외환카드'가 통합하여,
                                                        모바일, 디지털 분야는
                                                        물론, 글로벌 시장에서도
                                                        뛰어난 성과를 내고
                                                        있습니다. 트래블로그
                                                        카드, JADE(제이드) 카드,
                                                        원더시리즈 상품을
                                                        출시하였으며, 스마트한
                                                        라이프를 선도하는
                                                        금융사로 발돋음하고
                                                        있습니다.
                                                    </div>
                                                </div>
                                              
                                            </div>
                                            <div class="contest-info-bottom">
                                                <div
                                                    class="profile-image-wrap"
                                                    style="
                                                        width: 20px;
                                                        height: 20px;
                                                        cursor: default;
                                                    "
                                                >
                                                    <img
                                                        class="profile-image"
                                                        alt="profile-image"
                                                        src="https://cdn-dantats.stunning.kr/prod/users/8aca0f63-1d3b-4e6d-a3ec-4404690b63e4/avatar/fvBZSrehSed7XvGb.%E1%84%92%E1%85%A1%E1%84%82%E1%85%A1%E1%84%8F%E1%85%A1%E1%84%83%E1%85%B3%20CI.png.small?q=100&amp;t=crop&amp;s=40x40&amp;f=webp"
                                                        style="
                                                            width: 20px;
                                                            height: 20px;
                                                            border-radius: 50%;
                                                            object-fit: cover;
                                                        "
                                                    />
                                                </div>
                                                <div
                                                    class="contest-info-bottom-user-nick"
                                                >
                                                    하나카드
                                                </div>
                                                <div
                                                    class="contest-info-bottom-view-icon"
                                                >
                                                    <svg
                                                        type="eye16"
                                                        color="#8E94A0"
                                                        viewBox="0 0 16 16"
                                                        class="trophy-svg"
                                                    >
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
                                                        <defs></defs>
                                                    </svg>
                                                </div>
                                                <div
                                                    class="contest-info-bottom-view-count"
                                                >
                                                    14,173
                                                </div>
                                            </div>
                                        </div>
                                        <ul class="prize-info">
                                            <li class="prize-info-row">
                                                <div class="prize-info-row-key">
                                                    <svg
                                                        type="contest16"
                                                        color="#8E94A0"
                                                        viewBox="0 0 16 16"
                                                        class="trophy-svg"
                                                    >
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
                                                        <path
                                                            d="M4.68623 7.73717C2.83544 7.65737 2.20118 6.73757 2.05681 5.96687C1.80707 4.63127 2.40918 4.05797 3.30549 4.21617"
                                                            stroke-width="1.2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                        <path
                                                            d="M11.5037 7.73717C13.3538 7.65737 13.9887 6.73757 14.1331 5.96687C14.3828 4.63127 13.7807 4.05797 12.8837 4.21617"
                                                            stroke-width="1.2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                        <defs></defs>
                                                    </svg>
                                                    <span>목표 기부액</span>
                                                </div>
                                                <div
                                                    class="prize-info-row-label"
                                                >
                                                    1,600만원
                                                </div>
                                            </li>
                                            <li class="prize-info-row">
                                                <div class="prize-info-row-key">
                                                    <svg
                                                        type="calendar12"
                                                        color="#8E94A0"
                                                        viewBox="0 0 12 12"
                                                        class="calendar-svg"
                                                    >
                                                        <rect
                                                            x="0.6"
                                                            y="2.6"
                                                            width="10.8"
                                                            height="8.8"
                                                            rx="1.4"
                                                            stroke-width="1.2"
                                                        ></rect>
                                                        <path
                                                            d="M3 2V1"
                                                            stroke-width="1.2"
                                                            stroke-linecap="round"
                                                        ></path>
                                                        <path
                                                            d="M9 2V1"
                                                            stroke-width="1.2"
                                                            stroke-linecap="round"
                                                        ></path>
                                                        <path
                                                            d="M1 5H12"
                                                            stroke-width="1.2"
                                                        ></path>
                                                        <rect
                                                            x="3"
                                                            y="7"
                                                            width="2"
                                                            height="2"
                                                            rx="0.5"
                                                        ></rect>
                                                        <defs></defs>
                                                    </svg>
                                                    <span>남은 기간</span>
                                                </div>
                                                <div
                                                    class="prize-info-row-label"
                                                >
                                                    18일
                                                </div>
                                            </li>
                                            <li class="prize-info-row">
                                                <div
                                                    class="prize-info-row-key"
                                                ></div>
                                                <div
                                                    class="prize-info-row-label"
                                                >
                                                    <div
                                                        class="prize-info-row-label-date"
                                                    >
                                                        24.09.13 ~ 24.10.31
                                                        (24시까지)
                                                    </div>
                                                </div>
                                            </li>
                                        </ul></a
                                    >
    `;
    return liElement;
};

for (let i = 0; i < 10; i++) {
    ulElement.appendChild(createListItem());
}
