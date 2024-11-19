
// 필터링된 문의 데이터를 가져오는 함수
const fetchFilteredDonations = async (page, filterType) => {
    console.log("js에 있는 요청하는 페이지:", page); // 페이지 번호가 전달되는지 확인
    try {
        const response = await fetch(`/donation/donation-list-filter?page=${page}&filterType=${filterType}`);
        const data = await response.json();
        console.log("js 서버 응답 데이터:", data);

        showDonationPosts(data.donations);
        showPaging(data.pagination);
        globalThis.page = page;
    } catch (error) {
        console.error("js 기부 목록 불러오기 오류:", error);
    }
};