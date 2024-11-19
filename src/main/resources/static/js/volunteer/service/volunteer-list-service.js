// volunteer-list-service.js

// 전역 변수 선언 (한 번만 선언)
let currentOrder = 'recent';
let currentPage = 1;
let currentCategory = '';

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", () => {
    // URL에서 현재 페이지 번호와 정렬 기준 가져오기
    const params = new URLSearchParams(window.location.search);
    currentPage = parseInt(params.get('page')) || 1;
    currentOrder = params.get('order') || 'recent';
    currentCategory = params.get('category') || '';
    setOrder(currentOrder, currentPage, currentCategory);
});

// 정렬 기준을 설정하고 fetchVolunteers를 호출하는 함수
function setOrder(order, page = 1, category = '') {
    if (order) {
        currentOrder = order;
        currentPage = page;
        currentCategory = category;
        fetchVolunteers(currentOrder, currentPage, currentCategory);

        // URL 업데이트
        const url = new URL(window.location);
        url.searchParams.set('order', currentOrder);
        url.searchParams.set('page', currentPage);
        window.history.pushState({}, '', url);
    }
}

// 봉사 지원 모집 게시글 가져오기
const fetchVolunteers = async (order = "recent", page = 1, category = "") => {
    console.log("주어진 order:", order);
    console.log("주어진 page:", page);
    console.log("주어진 category:", category);

    const url = `/volunteer/volunteer-info?order=${order}&page=${page}&category=${encodeURIComponent(category)}`;
    console.log("요청 URL:", url);

    try {
        const response = await fetch(url);
        console.log("서버 응답 상태 코드:", response.status);

        if (!response.ok) throw new Error("서버로부터 데이터를 가져오는데 실패했습니다.");

        const data = await response.json();
        const lists = data.lists || data;
        const pagination = data.pagination || {};

        console.log("pagination 객체:", pagination);
        console.log("선택된 페이지:", pagination.page || "페이지 정보가 없습니다");

        showList({ lists, pagination });

    } catch (error) {
        console.error("Error fetching filtered volunteer lists:", error);
        alert("봉사 모집 게시글을 불러오는데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
};
