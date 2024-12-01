const replyService = (() => {
    // 댓글 작성
    const write = async (replyData) => {
        try {
            const response = await fetch("/replies/write", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(replyData),
            });

            if (!response.ok) {
                console.error("댓글 작성 실패(service):", response.statusText);
            }

            console.log("댓글 작성 성공(service)");
            return true;
        } catch (error) {
            console.error("댓글 작성 중 오류(service):", error);
            return false;
        }
    };

    // 댓글 목록 불러오기
    const getList = async (page, postId) => {
        try {
            const response = await fetch(`/replies/${postId}/${page}`);
            if (!response.ok) {
                const errorText = await response.text();
                console.error("댓글 목록 불러오기 실패 (응답 에러):", errorText);
            }

            const data = await response.json();
            console.log("getList에서 로드된 데이터:", data);
            return data;
        } catch (error) {
            console.error("댓글 목록 로딩 중 오류:", error);
            return null;
        }
    };


    // const getList = async (page, postId, callback) => {
    //     console.log("postId 값:", postId);
    //
    //     try {
    //         const response = await fetch(`/replies/${postId}/${page}`);
    //         if (!response.ok) {
    //             console.error("댓글 목록 불러오기 실패(service):", response.statusText);
    //         }
    //
    //         const data = await response.json();
    //         console.log("댓글 목록 불러오기 성공:", data);
    //
    //         if (callback) callback(data); // 콜백 실행
    //         return data; // 데이터를 호출한 곳으로 반환
    //     } catch (error) {
    //         console.error("댓글 목록 로딩 중 오류:", error);
    //         return null; // 오류 발생 시 null 반환
    //     }
    // };

    // 댓글 삭제
    const remove = async (replyId) => {
        try {
            const response = await fetch(`/replies/${replyId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                console.error("댓글 삭제 실패:", response.statusText);
            }

            console.log("댓글 삭제 성공");
            return true;
        } catch (error) {
            console.error("댓글 삭제 중 오류:", error);
            return false;
        }
    };

    // 댓글 수 조회
    const getReplyCount = async (postId) => {
        try {
            const response = await fetch(`/replies/count/${postId}`);
            if (!response.ok) {
                console.error("댓글 수 조회 실패:", response.statusText);
            }

            const count = await response.json();
            console.log("댓글 수 조회 성공:", count);
            return count;
        } catch (error) {
            console.error("댓글 수 조회 중 오류:", error);
            return 0; // 오류 발생 시 댓글 수를 0으로 반환
        }
    };

    // 메서드들을 객체로 반환
    return { write, getList, remove, getReplyCount };
})();
