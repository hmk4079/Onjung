// 결제 버튼 클릭 이벤트
document.querySelector("button.jNNRuG.withdraw-btn").addEventListener("click", function () {
    const workId = "123456";
    const memberProfileId = member.id;
    const profileName = member.memberName;
    const profilePhone = member.memberPhone;
    const profileEmail = member.memberEmail;
    const workPrice = document.querySelector("input#payment-amount").value;

    console.log("workPrice:", workPrice);
    console.log("memberProfileId:", memberProfileId);
    console.log("profileName:", profileName);
    console.log("profilePhone:", profilePhone);
    console.log("profileEmail:", profileEmail);

    if(parseInt(workPrice)%1000 != 0) {
        alert("충전 신청은 1,000원 단위로 가능합니다.");
    } else {
        Bootpay.requestPayment({
            application_id: "660e7f36943b38693860d7e9",
            price: parseInt(workPrice, 10),
            order_name: workPrice + "원 충전", // 포인트 충전
            order_id: workId, // 결제 내역 id
            pg: "카카오페이",
            method: "간편",
            tax_free: 0,
            user: {
                id: memberProfileId, // 회원 id
                username: profileName, // 이름
                phone: profilePhone, // 전화번호
                email: profileEmail // 이메일
            },
            items: [
                {
                    id: workId, // 결제 내역 id
                    name: workPrice + "원 충전", // 포인트 충전
                    qty: 1,
                    price: parseInt(workPrice, 10)
                }
            ],
            extra: {
                open_type: "iframe",
                card_quota: "0,2,3",
                escrow: false
            }
        })
            .then(async (response) => {
                console.log("결제 응답:", response); // 결제 성공 응답 로그 출력
                // 결제 성공 시 서버에 데이터 전송
                await completePayment(workPrice, memberProfileId);
                alert("결제가 성공적으로 완료되었습니다.");
            })
            .catch((error) => {
                console.error("결제 요청 중 오류 발생:", error.message);
                alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
            });
    }
});

// 결제 완료 시 서버로 데이터 전송 함수
async function completePayment(workPrice, memberProfileId) {
    try {
        const response = await fetch("/payments/write", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                paymentAmount: workPrice,
                memberId: memberProfileId,
            })
        });

        if (!response.ok) {
            console.error("서버에 결제 정보 전송 실패:", await response.text());
            alert("결제 정보 저장에 실패했습니다.");
        } else {
            console.log("서버에 결제 정보 전송 성공");
            fetchAccountBalance(memberProfileId);
            document.querySelector("input#payment-amount").value = "";
            showTab("payment", document.querySelector("div#payment-tab").firstElementChild);
            fetchPayments(memberProfileId);
        }
    } catch (error) {
        console.error("결제 완료 데이터 전송 중 오류 발생:", error);
    }

}
