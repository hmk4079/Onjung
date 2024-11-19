const pagingDiv = document.querySelector("nav.page-container.paginator");

document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = document.querySelectorAll(
        '.contest-list-state input[type="radio"]'
    );
    const labels = document.querySelectorAll(".contest-list-state label");
    const accordionDescription = document.querySelector(
        ".accordion-description"
    );
    // const svgToggle = document.querySelector(".status-svg svg"); // SVG 요소 선택
    // const openButton = document.querySelector(".open-button");
    const inputField = document.querySelector(".header-wrap input");
    const listItems = document.querySelectorAll(".list-wrap .item");
    const headerWrap = document.querySelector(".header-wrap");
    const bottomWrap = document.querySelector(".bottom-wrap");
    const arrowIcon = document.querySelector(".header-wrap .arrow");
    let inquiryFilterType = '최신등록순';

    // // 기본적으로 SVG 아이콘에 active 클래스 부여
    // openButton.classList.add("active");
    // svgToggle.style.transform = "rotate(0deg)"; // 기본 상태에서 위쪽 보기

    // 라디오 버튼 클릭 시 active 클래스 옮기기
    radioButtons.forEach((radio) => {
        radio.addEventListener("click", () => {
            labels.forEach((label) => label.classList.remove("active"));
            radio.closest("label").classList.add("active");
            console.log(`선택된 상태: ${radio.value}`);
        });
    });

    // // 아코디언 열기/닫기 및 화살표 회전
    // openButton.addEventListener("click", () => {
    //     const isVisible = accordionDescription.style.height !== "0px";
    //
    //     if (isVisible) {
    //         accordionDescription.style.height = "0px";
    //         svgToggle.style.transform = "rotate(90deg)"; // 위쪽 보기
    //     } else {
    //         accordionDescription.style.height = "129px";
    //         svgToggle.style.transform = "rotate(0deg)"; // 아래쪽 보기
    //     }
    //
    //     openButton.classList.toggle("active");
    // });

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
            inquiryFilterType = item.textContent.trim();
            const filterType = document.querySelector('div.item.active').textContent.trim();
            console.log("선택된 필터 타입:", filterType);
            fetchFilteredDonations(globalThis.page, filterType);
            console.log("필터입력했다"); // 필터 조건으로 데이터 불러오기
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

showDonationPosts(donations);
showPaging(pagination);
