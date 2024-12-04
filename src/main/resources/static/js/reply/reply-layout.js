// document.addEventListener("DOMContentLoaded", () => {
//     const postId = window.location.pathname.split('/').pop(); // URL에서 postId 추출
//     let currentPage = 1; // 현재 페이지
//     if (!postId) {
//         console.error("postId가 없습니다. HTML에 id='post-id' 요소를 추가하세요.");
//         return;
//     }
//
//     // 댓글 목록 로드 함수
//     window.loadComments = async (page = 1, postId) => {
//         try {
//             console.log("댓글 새로고침 실행");
//             const data = await replyService.getList(page, postId);
//
//             if (data && data.replies) {
//                 if (page === 1) clearComments(); // 기존 댓글 초기화
//
//                 renderReplies(data.replies, postId);
//
//                 // 마지막 페이지 여부 확인
//                 isLastPage = data.replies.length < data.rowCount;
//
//                 // "더보기" 버튼 상태 업데이트
//                 toggleLoadMoreButton(!isLastPage);
//                 await replyService.updateReplyCount(postId);
//             }
//         } catch (error) {
//             console.error("댓글 목록 로딩 중 오류:", error);
//         }
//     };
//
//     // 댓글 초기화 함수
//     function clearComments() {
//         const commentSection = document.getElementById("comment-section");
//         commentSection.innerHTML = ""; // 기존 댓글 초기화
//     }
//
//     // 댓글 렌더링 함수
//     function renderReplies(replies, postId) {
//         const commentSection = document.getElementById("comment-section");
//         console.log(`댓글 렌더링 중: 게시글 ID ${postId}`);
//
//         if (!replies || replies.length === 0) {
//             if (commentSection.childElementCount === 0) {
//                 const noRepliesMessage = document.createElement("li");
//                 noRepliesMessage.textContent = "댓글이 없습니다.";
//                 commentSection.appendChild(noRepliesMessage);
//             }
//             return;
//         }
//
//         replies.forEach((reply) => {
//             const commentHTML = `
//                 <article class="comment-container">
//                     <div class="contest-comment-show">
//                         <div>
//                             <div class="comment-card">
//                                 <div class="contest-comment-profile">
//                                     <a href="/m/${reply.memberId}">
//                                         <img src="${reply.profileFileName ? `/profile/display?memberId=${reply.memberId}` : "/images/default-profile.png"}" alt="${reply.memberName || "닉네임 없음"}">
//                                     </a>
//                                     <div class="nick">
//                                         <p class="name">
//                                             <a class="nickname">
//                                               ${reply.memberNickname ? reply.memberNickname : (reply.memberName ? reply.memberName : "닉네임 없음")}
//                                             </a>
//                                         </p>
//                                     </div>
//                                     <p>| ${timeForToday(reply.createdDate)}</p>
//                                 </div>
//                                 <div class="contest-comment-content">
//                                     <span class="reply-content">${reply.replyContent}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </article>
//             `;
//             const listItem = document.createElement("li");
//             listItem.innerHTML = commentHTML;
//             commentSection.appendChild(listItem);
//         });
//     }
//
//     // "더보기" 버튼 상태 업데이트
//     function toggleLoadMoreButton(show) {
//         const loadMoreButton = document.getElementById("load-more");
//         if (loadMoreButton) loadMoreButton.style.display = show ? "block" : "none";
//     }
//
//     // 초기 댓글 로드
//     loadComments(1, postId);
// });



// function renderReplies(replies, currentMemberId) {
//     const commentSection = document.querySelector(".comment-section");
//
//
//     if (!replies || replies.length === 0) {
//         if (commentSection.childElementCount === 0) {
//             const noRepliesMessage = document.createElement('li');
//             noRepliesMessage.textContent = "댓글이 없습니다.";
//             commentSection.appendChild(noRepliesMessage);
//         }
//         return;
//     }
//
//     replies.forEach(reply => {
//         const listItem = document.createElement("li");
//         listItem.setAttribute('data-reply-id', reply.id);
//         listItem.setAttribute('data-member-id', reply.memberId);
//         const formattedDate = reply.createdDate ? new Date(reply.createdDate).toLocaleDateString() : "날짜 정보 없음";
//
//         let innerHTML = `
//             <article class="comment-container">
//                     <div class="contest-comment-show">
//                         <div>
//                             <div class="comment-card">
//                                 <div class="contest-comment-profile">
//                                     <a href="/m/${reply.memberId}">
//                                         <img src="${reply.profileFileName ? `/profile/display?memberId=${reply.memberId}` : "/images/default-profile.png"}" alt="${reply.memberName || "닉네임 없음"}">
//                                     </a>
//                                     <div class="nick">
//                                         <p class="name">
//                                             <a class="nickname">
//                                               ${reply.memberNickname ? reply.memberNickname : (reply.memberName ? reply.memberName : "닉네임 없음")}
//                                             </a>
//                                         </p>
//                                     </div>
//                                     <p>| ${timeForToday(reply.createdDate)}</p>
//                                 </div>
//                                 <div class="contest-comment-content">
//                                     <span class="reply-content">${reply.replyContent}</span>
//                                 </div>
//                             </div>
//                             <div class="contest-comment-buttons">
//                             </div>
//                         </div>
//                     </div>
//                 </article>
//         `;
//
//         if (reply.memberId === currentMemberId) {
//             innerHTML += `
//                 <button type="button" class="edit-button" data-reply-id="${reply.id}">
//                     <img src="/images/modify-icon.png" alt="수정 아이콘">
//                 </button>
//                 <button type="button" class="delete-button" data-reply-id="${reply.id}">
//                     <img src="/images/delete-icon.png" alt="삭제 아이콘">
//                 </button>
//             `;
//         }
//
//         innerHTML += `</div>`;
//         listItem.innerHTML = innerHTML;
//         commentSection.appendChild(listItem);
//     });
// }
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

        // const memberNicknameElement = document.getElementById('user-nick');
        // memberNicknameElement.textContent = currentMember.memberNickname;
        // memberNameElement.textContent = currentMember.memberName;

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

// 댓글 렌더링 함수
function renderReplies(replies, currentMemberId, postId) {
    const commentSections = document.querySelector(".comment-section");

    if (!replies || replies.length === 0) {
        console.log("더 이상 가져올 댓글이 없습니다.");
        return;
    }

    // 새 댓글 추가
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
        commentSections.appendChild(listItem); // 기존 댓글 아래에 새 댓글 추가
    });
    // 각 댓글에 대한 이벤트 리스너 추가
    // 이는 `renderReplies`가 여러 번 호출될 때마다 이벤트 리스너가 중복 추가되지 않도록 주의해야 합니다.
    // 따라서, 이벤트 위임을 사용하는 것이 더 효율적입니다.
    // 하지만 현재 구조를 유지하기 위해 기존 방식을 사용하겠습니다.
}

document.querySelector('.comment-section').addEventListener('click', function (event) {
    const target = event.target;

    // 수정 버튼 클릭 시 처리
    if (target.classList.contains('edit-button')) {
        const replyId = target.closest('li').getAttribute('data-reply-id');
        const state = target.getAttribute('data-state');
        if (state === 'modify') {
            console.log(`수정 버튼 클릭: ${replyId}`);
            handleModifyButtonClick(postId, { id: replyId });
        }
    }

    // 삭제 버튼 클릭 시 처리
    if (target.classList.contains('delete-button')) {
        const replyId = target.closest('li').getAttribute('data-reply-id');
        console.log(`삭제 버튼 클릭: ${replyId}`);
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
            alert("댓글이 성공적으로 추가되었습니다!");

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

// 댓글 수정 버튼 클릭 시 핸들러 함수
    function handleModifyButtonClick(postId, reply) {
        const listItem = document.querySelector(`[data-reply-id="${reply.id}"]`).closest('li');
        const commentTxt = listItem.querySelector('.comment-txt');
        const modifyButton = listItem.querySelector('.edit-button');
        const modifyButtonImg = modifyButton.querySelector('img');

        // 현재 버튼의 상태 확인
        const currentState = modifyButton.getAttribute('data-state');

        if (currentState === 'modify') {
            // 수정 모드로 전환
            const originalContent = commentTxt.textContent;
            commentTxt.setAttribute('data-original-content', originalContent);

            const textarea = document.createElement('textarea');
            textarea.value = originalContent;
            textarea.classList.add('modify-comment');

            commentTxt.innerHTML = '';
            commentTxt.appendChild(textarea);

            // 버튼을 저장 모드로 변경
            modifyButtonImg.src = '/images/save-icon.png'; // 저장 아이콘 경로
            modifyButtonImg.alt = '저장 아이콘';
            modifyButton.setAttribute('data-state', 'save');
        } else if (currentState === 'save') {
            // 저장 모드: 수정 내용 저장
            const textarea = commentTxt.querySelector('textarea');
            const updatedContent = textarea.value.trim();
            const originalContent = commentTxt.getAttribute('data-original-content');

            if (updatedContent === "") {
                alert("댓글 내용을 입력해주세요.");
                return;
            }

            if (updatedContent === originalContent) {
                alert("수정된 내용이 없습니다.");
                commentTxt.innerHTML = originalContent;
                modifyButtonImg.src = '/images/modify-icon.png'; // 수정 아이콘 경로
                modifyButtonImg.alt = '수정 아이콘';
                modifyButton.setAttribute('data-state', 'modify');
                return;
            }

            // 댓글 수정 요청
            updateReply(postId, reply.id, reply.memberId, updatedContent);
        }
    }
}

// 댓글 수정하기 함수
function updateReply(postId, replyId, memberId, newContent) {
    const url = `/replies-update/${replyId}`; // URL 수정

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
            const contentType = response.headers.get('Content-Type');
            console.log(`updateReply - Content-Type: ${contentType}`);

            if (response.status === 204) {
                // 본문이 없는 경우
                return null;
            } else if (response.ok && contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }
        })
        .then(updatedReply => {
            const listItem = document.querySelector(`[data-reply-id="${replyId}"]`).closest('li');
            const commentTxt = listItem.querySelector('.comment-txt');
            const modifyButton = listItem.querySelector('.btn-comment-etc-modi');
            const modifyButtonImg = modifyButton.querySelector('img');

            if (updatedReply) {
                console.log("댓글이 수정되었습니다:", updatedReply);
                // DOM에서 댓글 내용 업데이트
                commentTxt.textContent = updatedReply.replyContent;
            } else {
                // 서버가 204 No Content를 반환한 경우, newContent로 DOM 업데이트
                commentTxt.textContent = newContent;
            }

            // 버튼을 다시 수정 모드로 변경
            modifyButtonImg.src = '/images/modify-icon.png'; // 수정 아이콘 경로
            modifyButtonImg.alt = '수정 아이콘';
            modifyButton.setAttribute('data-state', 'modify');

            alert("댓글이 성공적으로 수정되었습니다.");
        })
        .catch(error => {
            console.error("댓글 수정 중 오류 발생:", error);
            alert(error.message || "댓글을 수정하는 데 문제가 발생했습니다.");
        });
}


// 댓글 삭제 버튼 클릭 시 핸들러 함수
function handleDeleteButtonClick(postId, reply) {
    const confirmDelete = confirm("정말로 댓글을 삭제하시겠습니까?");
    if (confirmDelete) {
        console.log(`댓글 ID: ${reply.id} 삭제 중`);
        deleteReply(postId, reply.id, reply.memberId);
    }
}

// 댓글 삭제하기 함수
function deleteReply(postId, replyId, memberId) {
    const url = `/replies/replies-delete/${replyId}?memberId=${memberId}`;

    fetch(url, {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(response => {
            console.log(`deleteReply - 응답 상태: ${response.status}`);
            if (response.status === 204 || response.status === 200) { // 204 No Content 또는 200 OK
                // DOM에서 삭제된 댓글 제거
                const replyElement = document.querySelector(`[data-reply-id="${replyId}"]`).closest('li');
                if (replyElement) {
                    replyElement.remove();
                    alert("댓글이 삭제되었습니다.");
                } else {
                    console.error(`댓글 요소 ID: ${replyId}를 찾을 수 없습니다.`);
                }
            } else {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }
        })
        .catch(error => {
            console.error("댓글 삭제 중 오류 발생:", error);
            alert(error.message || "댓글을 삭제하는 데 문제가 발생했습니다.");
        });
}

const replyCountElement = document.getElementById("reply-count");
if (!replyCountElement) {
    console.error("댓글 수를 표시할 요소를 찾을 수 없습니다: #reply-count");
}


// 댓글 수 조회
async function getReplyCount(postId) {
    try {
        const response = await fetch(`/replies/count/${postId}`);
        if (!response.ok) return 0;
        const { count } = await response.json();
        return count;
    } catch (error) {
        console.error("댓글 수 조회 중 오류:", error);
        return 0;
    }
}

// 댓글 수 업데이트
async function updateReplyCount(postId) {
    try {
        const totalCount = await getReplyCount(postId);
        const replyCountElement = document.getElementById("reply-count");
        if (replyCountElement) replyCountElement.textContent = `${totalCount}`;
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

