attachmentService = (() => {
    // 파일 업로드
    const upload = async (formData) => {
        const response =
            await fetch("/attachment/upload", {
                method: "post",
                body: formData
            });
        const attachmentFileName = await response.json();
        return attachmentFileName;
    }

    const getFiles = async (callback) => {
        const attachmentFiles = await response.json()
        if(callback) {
            callback(attachmentFiles);
        }
    }

    return {upload: upload, getFiles: getFiles};
})();