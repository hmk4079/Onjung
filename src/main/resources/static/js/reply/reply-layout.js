document.addEventListener("DOMContentLoaded", function () {
    const postId = window.location.pathname.split('/').pop(); // URL에서 postId 추출
    let currentPage = 1; // 현재 페이지 번호

    const moreButton = document.querySelector('#load-more');
    moreButton.style.display = 'block'; // 초기에는 "더보기" 버튼을 보이게 설정

    // 현재 사용자 정보 가져오기
    getCurrentMember().then(currentMember => {
        if (!currentMember) {
            console.error("로그인되지 않은 사용자입니다.");
            window.location.href = "/login"; // 로그인 페이지로 리디렉션
            return;
        }

        const currentMemberId = currentMember.id;
        console.log("현재 사용자 닉네임:", currentMember.memberNickname,currentMember.memberName);

        // 댓글 등록 버튼 클릭 이벤트 처리
        document.querySelector('.submit-comment-button').addEventListener('click', function () {
            const replyContent = document.getElementById('reply-content').value.trim();

            if (replyContent === "") {
                alert("댓글 내용을 입력해주세요.");
                return;
            }

            const replyData = {
                replyContent: replyContent,
                memberId: currentMemberId
            };

            addReply(postId, replyData);
        });

        // 첫 페이지 댓글 불러오기
        fetchReplies(postId, currentMemberId, currentPage);

        // "더보기" 버튼 클릭 시 다음 페이지의 댓글을 불러오기
        moreButton.addEventListener('click', function () {
            currentPage++;
            fetchReplies(postId, currentMemberId, currentPage);
        });
    });
});

// 현재 사용자 정보 가져오기 함수
function getCurrentMember() {
    return fetch('/member/info', {
        method: 'GET',
        credentials: 'include' // 쿠키 포함
    })
        .then(response => {
            console.log(`getCurrentMember - 응답 상태: ${response.status}`);
            const contentType = response.headers.get('Content-Type');
            console.log(`getCurrentMember - Content-Type: ${contentType}`);

            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error("로그인이 필요합니다.");
            } else {
                throw new Error("현재 사용자 정보를 가져오는 데 실패했습니다.");
            }
        })
        .then(data => {
            console.log("현재 사용자 데이터:", data);
            return data;
        })
        .catch(error => {
            console.error("현재 사용자 정보 가져오기 중 오류 발생:", error);
            alert(error.message);
            return null;
        });
}

document.querySelector('.comment-section').addEventListener('click', function (event) {
    const button = event.target.closest('button');
    if (!button) return;

    const replyId = button.getAttribute('data-reply-id');
    const state = button.getAttribute('data-state');
    const postId = window.location.pathname.split('/').pop();

    if (!replyId || !state) return;

    // // 수정 버튼 클릭 처리
    // if (button.classList.contains('edit-button') && state === 'modify') {
    //     handleModifyButtonClick(postId, { id: replyId });
    // }

    // 삭제 버튼 클릭 처리
    if (button.classList.contains('delete-button')) {
        handleDeleteButtonClick(postId, { id: replyId });
    }
});

// 댓글 가져오기 함수
function fetchReplies(postId, currentMemberId, page) {
    const url = `/replies/posts/${postId}/replies?page=${page}`;

    fetch(url, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            console.log(`fetchReplies - 응답 상태: ${response.status}`);
            const contentType = response.headers.get('Content-Type');
            console.log(`fetchReplies - Content-Type: ${contentType}`);

            if (response.ok && contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }
        })
        .then(repliesData => {
            console.log("가져온 댓글 데이터:", repliesData);
            renderReplies(repliesData.replies, currentMemberId, postId);

            // 페이징 처리: 더보기 버튼 표시 여부 결정
            if (page >= repliesData.pagination.realEnd) {
                document.querySelector('#load-more').style.display = 'none';
            } else {
                document.querySelector('#load-more').style.display = 'block';
            }
        })
        .catch(error => {
            console.error("댓글 가져오기 중 오류 발생:", error);
            alert("댓글을 불러오는 데 문제가 발생했습니다.");
        });
}


// 댓글 추가하기
function addReply(postId, replyData) {
    const url = `/replies/posts/${postId}/replies`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(replyData)
    })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error(`댓글 작성 실패: ${response.status}`);
            }
        })
        .then(reply => {
            console.log("서버에서 반환된 댓글 데이터:", reply);
            console.log("서버에서 받환된 프로필이름 :{}", reply.profileFileName)
            alert("댓글이 성공적으로 작성되었습니다!");

            const commentSections = document.querySelector(".comment-section");

            if (!commentSections) {
                console.error(".comment-section 요소를 찾을 수 없습니다.");
                return;
            }

            // 새 댓글 요소 생성
            const listItem = document.createElement("li");
            listItem.setAttribute('data-reply-id', reply.id);
            listItem.setAttribute('data-member-id', reply.memberId);

            const memberName = reply.memberName || reply.memberNickname || "닉네임 없음";
            const profileImage = reply.profileFileName
                ? `/profile/display?memberId=${reply.memberId}`
                : "/images/default-profile.png"; // 기본 이미지 설정

            listItem.innerHTML = `
                <div class="comment-container">
                    <div class="contest-comment-show">
                        <div>
                            <div class="comment-card">
                                <div class="contest-comment-userinfo">
                                    <a href="/m/${reply.memberNickname || ""}" class="profile-avatar-container avatar">
                                        <img src="${profileImage}" alt="프로필 이미지" />
                                    </a>
                                    <div class="nick">
                                        <div class="nickname-container user-nick-wrapper">
                                            <p class="nickname-text">
                                                <a class="user-nick nick" href="#">${memberName}</a>
                                            </p>
                                        </div>
                                    </div>
                                    <p>| ${timeForToday(reply.createdDate)}</p>
                                </div>
                                <div class="contest-comment-content">
                                    <div class="reply-content-${reply.id}">${reply.replyContent}</div>
                                </div>
                            </div>
                            <div class="contest-comment-buttons">
                                <button type="button" class="edit-button" data-reply-id="${reply.id}" data-state="modify">
                                    <img src="/images/modify-icon.png" alt="수정 아이콘">
                                </button>
                                <button type="button" class="delete-button" data-reply-id="${reply.id}">
                                    <img src="/images/delete-icon.png" alt="삭제 아이콘">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // 댓글 목록 맨 위에 새 댓글 추가
            commentSections.prepend(listItem);

            // 수정 버튼 클릭 처리
            listItem.querySelector('.edit-button').addEventListener("click", (e) => {
                const replyId = listItem.getAttribute('data-reply-id');
                handleModifyButtonClick(postId, { id: replyId });
            })

            // 삭제 버튼 클릭 처리
            listItem.querySelector('.delete-button').addEventListener("click", (e) => {
                const replyId = listItem.getAttribute('data-reply-id');
                handleDeleteButtonClick(postId, { id: replyId });
            })

            // 댓글 수 갱신
            updateReplyCount(postId);

            // 입력 필드 초기화
            const inputField = document.getElementById('reply-content');
            if (inputField) inputField.value = ''; // textarea 초기화
        })
        .catch(error => {
            console.error("댓글 작성 중 오류 발생:", error);
            alert("댓글 추가 중 문제가 발생했습니다.");
        });
}

// 댓글 수정 버튼 클릭 시 핸들러 함수
function handleModifyButtonClick(postId, reply) {
    const listItem = document.querySelector(`[data-reply-id="${reply.id}"]`).closest('li');
    const commentTxt = listItem.querySelector('.reply-content-' + reply.id); // 수정할 댓글 내용
    const modifyButton = listItem.querySelector('.edit-button'); // 수정 버튼
    const modifyButtonImg = modifyButton.querySelector('img'); // 수정 버튼 아이콘
    console.log("함수 드러옴");
    // 현재 버튼 상태 확인
    const currentState = modifyButton.getAttribute('data-state');

    if (currentState === 'modify') {
        // 수정 모드로 전환
        const originalContent = commentTxt.textContent; // 기존 댓글 내용 저장
        commentTxt.setAttribute('data-original-content', originalContent); // 원본 내용 저장

        // `textarea` 생성 후 기존 댓글 내용을 입력
        const textarea = document.createElement('textarea');
        textarea.value = originalContent;
        textarea.classList.add('edit-textarea');

        // 댓글 영역을 `textarea`로 대체
        commentTxt.innerHTML = '';
        commentTxt.appendChild(textarea);

        // 버튼을 저장 모드로 변경
        modifyButtonImg.src = '/images/save-icon.png'; // 저장 아이콘 경로
        modifyButtonImg.alt = '저장 아이콘';
        modifyButton.setAttribute('data-state', 'save');
        console.log("1번 - 수정 모드 활성화", currentState);
    } else if (currentState === 'save') {
        // 저장 모드: 수정된 내용 저장
        const textarea = commentTxt.querySelector('textarea');
        const updatedContent = textarea.value.trim(); // 수정된 댓글 내용
        const originalContent = commentTxt.getAttribute('data-original-content'); // 원본 내용
        console.log("저장 시도 - 수정 모드에서의 상태:", currentState);

        // 유효성 검사: 내용이 비어 있거나 수정되지 않은 경우
        if (updatedContent === "") {
            alert("댓글 내용을 입력해주세요.");
            console.log("2번 - 빈 내용");
            return;
        }

        if (updatedContent === originalContent) {
            alert("수정된 내용이 없습니다.");

            // **수정된 내용이 없을 경우 원래 상태 복구**
            // 1. 원래 내용을 다시 DOM에 적용
            commentTxt.innerHTML = originalContent; // 원래 댓글 내용 복구
            console.log("3번 - 원래 내용 복구 완료:", originalContent);

            // 2. 버튼 상태와 아이콘 복구
            modifyButtonImg.src = '/images/modify-icon.png'; // 수정 아이콘 경로
            modifyButtonImg.alt = '수정 아이콘';
            modifyButton.setAttribute('data-state', 'modify');
            console.log("3번 - 버튼 상태 복구 완료", modifyButton.getAttribute('data-state'));

            return; // 복구 완료 후 함수 종료
        }

        // 수정된 내용이 있는 경우
        alert("댓글이 수정되었습니다.");

        // 댓글 수정 요청
        updateReply(postId, reply.id, reply.memberId, updatedContent);
    }
}

// 댓글 렌더링 함수
function renderReplies(replies, currentMemberId, postId) {
    const commentSections = document.querySelector(".comment-section");

    if (!replies || replies.length === 0) {
        console.log("더 이상 가져올 댓글이 없습니다.");
        return;
    }

    replies.forEach(reply => {
        const listItem = document.createElement("li");
        listItem.setAttribute('data-reply-id', reply.id);
        listItem.setAttribute('data-member-id', reply.memberId);

        const memberName = reply.memberName || reply.memberNickname || "닉네임 없음";
        const profileImage = reply.profileFileName
            ? `/profile/display?memberId=${reply.memberId}`
            : "/images/default-profile.png";

        listItem.innerHTML = `
            <div class="comment-container">
                <div class="contest-comment-show">
                    <div>
                        <div class="comment-card">
                            <div class="contest-comment-userinfo">
                                <a href="/m/${reply.memberNickname || ""}" class="profile-avatar-container avatar">
                                    <img src="${profileImage}" alt="프로필 이미지" />
                                </a>
                                <div class="nick">
                                    <div class="nickname-container user-nick-wrapper">
                                        <p class="nickname-text">
                                            <a class="user-nick nick" href="#">${memberName}</a>
                                        </p>
                                    </div>
                                </div>
                                <p>| ${timeForToday(reply.createdDate)}</p>
                            </div>
                            <div class="contest-comment-content">
                                <div class="reply-content-${reply.id}">${reply.replyContent}</div>
                            </div>
                        </div>
                        <div class="contest-comment-buttons">
                            <button type="button" class="edit-button" data-reply-id="${reply.id}" data-state="modify">
                                <img src="/images/modify-icon.png" alt="수정 아이콘">
                            </button>
                            <button type="button" class="delete-button" data-reply-id="${reply.id}">
                                <img src="/images/delete-icon.png" alt="삭제 아이콘">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        commentSections.appendChild(listItem);

        const editButton = listItem.querySelector('.edit-button');
        const deleteButton = listItem.querySelector('.delete-button');

        editButton.addEventListener('click', () => {
            handleModifyButtonClick(postId, { id: reply.id });
        });
        deleteButton.addEventListener('click', () => {
            handleDeleteButtonClick(postId, { id: reply.id });
        });
    });
}



// 댓글 수정하기 함수
function updateReply(postId, replyId, memberId, newContent) {
    const url = `/replies/replies-update/${replyId}`;

    const replyData = {
        replyContent: newContent,
        memberId: memberId
    };

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(replyData)
    })
        .then(response => {
            console.log(`updateReply - 응답 상태: ${response.status}`);
            if (response.status === 204) {
                // 본문이 없는 경우
                return null;
            } else if (response.ok) {
                return response.json();
            } else {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }
        })
        .then(updatedReply => {
            const listItem = document.querySelector(`[data-reply-id="${replyId}"]`).closest('li');
            const commentTxt = listItem.querySelector('.reply-content-' + replyId);
            const modifyButton = listItem.querySelector('.edit-button');
            const modifyButtonImg = modifyButton.querySelector('img');

            if (updatedReply) {
                console.log("댓글이 수정되었습니다:", updatedReply);
                commentTxt.textContent = updatedReply.replyContent; // DOM 업데이트
            } else {
                commentTxt.textContent = newContent; // 서버가 204를 반환한 경우 DOM 업데이트
            }

            // 버튼을 다시 수정 모드로 변경
            modifyButtonImg.src = '/images/modify-icon.png'; // 수정 아이콘 경로
            modifyButtonImg.alt = '수정 아이콘';
            modifyButton.setAttribute('data-state', 'modify');

            console.log("댓글 수정 성공");
        })
        .catch(error => {
            console.error("댓글 수정 중 오류 발생:", error);
            alert("댓글 수정 중 문제가 발생했습니다.");
        });
}



// 댓글 삭제 버튼 클릭 시 핸들러
function handleDeleteButtonClick(postId, reply) {
    const confirmDelete = confirm("정말로 댓글을 삭제하시겠습니까?");
    if (confirmDelete) {
        console.log(`Post ID: ${postId}, Reply ID: ${reply.id} 삭제 요청`);
        deleteReply(postId, reply.id);
    }
}

// 댓글 삭제하기 함수
function deleteReply(postId, replyId) {
    const url = `/replies/replies-delete/${replyId}`;

    fetch(url, {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(response => {
            console.log(`deleteReply - 응답 상태: ${response.status}`);
            if (response.status === 204) {
                console.log("댓글이 성공적으로 삭제되었습니다.");
                const replyElement = document.querySelector(`[data-reply-id="${replyId}"]`);
                if (replyElement) replyElement.remove(); // DOM에서 댓글 제거
                alert("댓글이 성공적으로 삭제되었습니다.")
                updateReplyCount(postId); // 댓글 수 갱신
            } else {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }
        })
        .catch(error => {
            console.error("댓글 삭제 중 오류 발생:", error);
            alert("댓글 삭제 중 문제가 발생했습니다.");
        });
}


const replyCountElement = document.getElementById("reply-count");
if (!replyCountElement) {
    console.error("댓글 수를 표시할 요소를 찾을 수 없습니다: #reply-count");
}

// 댓글 수 조회
async function getReplyCount(postId) {
    const url = `/replies/count/${postId}`;
    try {
        const response = await fetch(url, { method: 'GET', credentials: 'include' });
        if (!response.ok) {
            throw new Error(`댓글 수 요청 실패: ${response.status}`);
        }
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error("댓글 수 가져오기 중 오류:", error);
        return 0;
    }
}

// 댓글 수 업데이트
async function updateReplyCount(postId) {
    try {
        const totalCount = await getReplyCount(postId); // 댓글 수 가져오기
        const replyCountElement = document.getElementById("reply-count");
        if (replyCountElement) {
            replyCountElement.textContent = `${totalCount}`; // 댓글 수 업데이트
        } else {
            console.error("댓글 수를 표시할 요소를 찾을 수 없습니다: #reply-count");
        }
    } catch (error) {
        console.error("댓글 수 갱신 중 오류:", error);
    }
}

// 페이지 로드 시 댓글 수 초기화
document.addEventListener("DOMContentLoaded", function () {
    const postId = window.location.pathname.split('/').pop(); // URL에서 postId 추출
    if (!postId || isNaN(postId)) {
        console.error("postId가 유효하지 않습니다. 값:", postId);
        return; // postId가 유효하지 않으면 실행 중단
    }

    console.log("postId:", postId); // postId 값 확인
    updateReplyCount(postId); // 댓글 수 초기화
});

