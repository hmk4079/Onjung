document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".hkjhsp").addEventListener("click", function () {
        const notiPopup = document.querySelector(".noti-popup");
        const profilePopup = document.querySelector(".profile-popup");

        // profile-popup이 열려 있으면 닫기
        if (profilePopup.style.display === "block") {
            profilePopup.style.display = "none";
        }

        // noti-popup 토글
        if (notiPopup.style.display === "none" || notiPopup.style.display === "") {
            notiPopup.style.display = "block"; // 표시
        } else {
            notiPopup.style.display = "none"; // 숨기기
        }
    });

    // 마우스가 헤더 밖으로 나가면 드롭다운 닫기
    document.querySelector("#gnb").addEventListener("mouseleave", function () {
        const notiPopup = document.querySelector(".noti-popup");
        const profilePopup = document.querySelector(".profile-popup");

        // 드롭다운 숨기기
        notiPopup.style.display = "none";
        profilePopup.style.display = "none";
    });

    document.querySelector(".opener").addEventListener("click", function () {
        const profilePopup = document.querySelector(".profile-popup");
        const notiPopup = document.querySelector(".noti-popup");

        // noti-popup이 열려 있으면 닫기
        if (notiPopup.style.display === "block") {
            notiPopup.style.display = "none";
        }

        // profile-popup 토글
        if (
            profilePopup.style.display === "none" ||
            profilePopup.style.display === ""
        ) {
            profilePopup.style.display = "block"; // 표시
        } else {
            profilePopup.style.display = "none"; // 숨기기
        }
    });
});



