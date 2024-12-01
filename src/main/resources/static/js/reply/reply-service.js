const replyService = (() => {
    const write = async (replyData) => {
        try {
            const response = await fetch("/replies/write", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(replyData)
            });

            if (response.ok) {
                console.log("댓글 작성 성공");
            } else {
                console.error("댓글 작성 실패");
            }
        } catch (error) {
            console.error("댓글 작성 중 오류:", error);
        }
    };

    const getList = async (page, postId, callback) => {
        try {
            const response = await fetch(`/replies/${postId}/${page}`);
            if (!response.ok) throw new Error("댓글 로딩 실패");

            const data = await response.json();
            console.log("댓글 리스트 불러오기 성공:", data);

            if (callback) callback(data);
            return data;
        } catch (error) {
            console.error("댓글 로딩 중 오류:", error);
        }
    };

    const remove = async (replyId) => {
        try {
            const response = await fetch(`/replies/${replyId}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("댓글 삭제 실패");
            console.log("댓글 삭제 성공");

            return true;
        } catch (error) {
            console.error("댓글 삭제 중 오류:", error);
            return false;
        }
    };

    const getReplyCount = async (postId) => {
        try {
            const response = await fetch(`/replies/count/${postId}`);
            if (!response.ok) throw new Error("댓글 수 조회 실패");

            const count = await response.json();
            console.log("댓글 수:", count);
            return count;
        } catch (error) {
            console.error("댓글 수 조회 중 오류:", error);
            return 0;
        }
    };

    return { write, getList, remove, getReplyCount };
})();
