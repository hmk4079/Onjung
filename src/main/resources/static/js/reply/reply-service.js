const replyService = (() => {
    const write = async (reply) => {
        await fetch("/replies/write", {
            method: "post",
            body: JSON.stringify(reply),
            headers: {"Content-Type": "application/json; charset=utf-8"}
        });
    }

    const getList = async (page, postId, callback) => {
        page = page || 1;
        const response = await fetch(`/replies/${postId}/${page}`)
        const replies = await response.json();

        if(callback){
            callback(replies);
        }
    }

    const update = async (reply) => {
        await fetch("/replies/update", {
            method: "put",
            body: JSON.stringify(reply),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });
    }

    const remove = async (id) => {
        await fetch(`/replies/${id}`, {
            method: "delete"
        })
    }

    return {write: write, getList: getList, update: update, remove: remove};
})()