// // post-detail.js
// document.addEventListener('DOMContentLoaded', function () {
//     const STORAGE_KEY = 'communityPosts';
    
//     // URL에서 게시글 ID 가져오기
//     const urlParams = new URLSearchParams(window.location.search);
//     const postId = urlParams.get('id');

//     // 현재 로그인한 사용자 정보 가져오기
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
//     if (!postId) {
//         alert('잘못된 접근입니다.');
//         window.location.href = 'community.html';
//         return;
//     }

//     // 게시글 데이터 가져오기
//     const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
//     const post = posts.find(p => p.id === postId);

//     if (!post) {
//         alert('존재하지 않는 게시글입니다.');
//         window.location.href = 'community.html';
//         return;
//     }

//     // 게시글 내용 표시
//     displayPost(post);

//     // 댓글 목록 표시
//     displayComments(post.comments || []);

//     // 수정/삭제 버튼 표시 여부 설정
//     setupPostActions(post);

//     // 댓글 입력 폼 이벤트 설정
//     setupCommentForm(post);
// });

// // 게시글 표시 함수
// function displayPost(post) {
//     document.querySelector('.post-category').textContent = getCategoryName(post.category);
//     document.querySelector('.post-title').textContent = post.title;
//     document.querySelector('.post-content').innerHTML = post.content;
//     document.querySelector('.post-author').textContent = post.author;
//     document.querySelector('.post-date').textContent = post.date;
//     document.querySelector('.post-views').textContent = post.views || 0;
// }

// // 카테고리 이름 변환
// function getCategoryName(category) {
//     const categoryNames = {
//         hot: '인기글',
//         notice: '공지사항',
//         review: '매물후기',
//         qna: '질문/답변',
//         free: '자유게시판'
//     };
//     return categoryNames[category] || '기타';
// }

// // 댓글 목록 표시
// function displayComments(comments) {
//     const commentsContainer = document.querySelector('.comments-list');
//     commentsContainer.innerHTML = '';

//     if (comments.length === 0) {
//         commentsContainer.innerHTML = '<p class="no-comments">첫 댓글을 작성해보세요!</p>';
//         return;
//     }

//     comments.forEach(comment => {
//         const commentElement = createCommentElement(comment);
//         commentsContainer.appendChild(commentElement);
//     });
// }

// // 댓글 요소 생성
// function createCommentElement(comment) {
//     const div = document.createElement('div');
//     div.className = 'comment-item';
//     div.innerHTML = `
//         <div class="comment-header">
//             <span class="comment-author">${comment.author}</span>
//             <span class="comment-date">${comment.date}</span>
//         </div>
//         <div class="comment-content">${comment.content}</div>
//         ${comment.author === currentUser?.name ? `
//         <div class="comment-actions">
//             <button class="btn-text edit-comment"><i class="fas fa-edit"></i> 수정</button>
//             <button class="btn-text delete-comment"><i class="fas fa-trash"></i> 삭제</button>
//         </div>
//         ` : ''}
//     `;

//     // 댓글 수정/삭제 이벤트 설정
//     setupCommentActions(div, comment);

//     return div;
// }

// // 게시글 수정/삭제 버튼 설정
// function setupPostActions(post) {
//     const actionsContainer = document.querySelector('.post-actions');
//     if (!actionsContainer) return;

//     // 현재 사용자가 작성자인 경우에만 수정/삭제 버튼 표시
//     if (currentUser && post.author === currentUser.name) {
//         actionsContainer.innerHTML = `
//             <button class="btn edit-post"><i class="fas fa-edit"></i> 수정</button>
//             <button class="btn delete-post"><i class="fas fa-trash"></i> 삭제</button>
//         `;

//         // 수정 버튼 이벤트
//         document.querySelector('.edit-post').addEventListener('click', () => {
//             window.location.href = `post.html?id=${post.id}`;
//         });

//         // 삭제 버튼 이벤트
//         document.querySelector('.delete-post').addEventListener('click', () => {
//             if (confirm('정말 삭제하시겠습니까?')) {
//                 deletePost(post.id);
//             }
//         });
//     }
// }

// // 게시글 삭제
// function deletePost(postId) {
//     const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
//     const updatedPosts = posts.filter(p => p.id !== postId);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
//     window.location.href = 'community.html';
// }

// // 댓글 입력 폼 설정
// function setupCommentForm(post) {
//     const commentForm = document.querySelector('.comment-form');
//     if (!commentForm) return;

//     commentForm.addEventListener('submit', (e) => {
//         e.preventDefault();

//         if (!currentUser) {
//             alert('로그인이 필요합니다.');
//             window.location.href = 'login.html';
//             return;
//         }

//         const commentContent = document.querySelector('#commentContent').value.trim();
//         if (!commentContent) {
//             alert('댓글 내용을 입력해주세요.');
//             return;
//         }

//         addComment(post, commentContent);
//         commentForm.reset();
//     });
// }

// // 댓글 추가
// function addComment(post, content) {
//     const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
//     const postIndex = posts.findIndex(p => p.id === post.id);

//     if (postIndex === -1) return;

//     const newComment = {
//         id: Date.now().toString(),
//         author: currentUser.name,
//         content: content,
//         date: new Date().toLocaleDateString()
//     };

//     if (!posts[postIndex].comments) {
//         posts[postIndex].comments = [];
//     }

//     posts[postIndex].comments.push(newComment);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
//     displayComments(posts[postIndex].comments);
// }

// // 댓글 수정/삭제 이벤트 설정
// function setupCommentActions(commentElement, comment) {
//     const editBtn = commentElement.querySelector('.edit-comment');
//     const deleteBtn = commentElement.querySelector('.delete-comment');

//     if (editBtn) {
//         editBtn.addEventListener('click', () => {
//             const newContent = prompt('댓글을 수정하세요:', comment.content);
//             if (newContent && newContent.trim()) {
//                 updateComment(comment.id, newContent.trim());
//             }
//         });
//     }

//     if (deleteBtn) {
//         deleteBtn.addEventListener('click', () => {
//             if (confirm('댓글을 삭제하시겠습니까?')) {
//                 deleteComment(comment.id);
//             }
//         });
//     }
// }

// // 댓글 수정
// function updateComment(commentId, newContent) {
//     const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
//     const urlParams = new URLSearchParams(window.location.search);
//     const postId = urlParams.get('id');
//     const post = posts.find(p => p.id === postId);

//     if (!post || !post.comments) return;

//     const commentIndex = post.comments.findIndex(c => c.id === commentId);
//     if (commentIndex === -1) return;

//     post.comments[commentIndex].content = newContent;
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
//     displayComments(post.comments);
// }

// // 댓글 삭제
// function deleteComment(commentId) {
//     const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
//     const urlParams = new URLSearchParams(window.location.search);
//     const postId = urlParams.get('id');
//     const post = posts.find(p => p.id === postId);

//     if (!post || !post.comments) return;

//     post.comments = post.comments.filter(c => c.id !== commentId);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
//     displayComments(post.comments);
// }

// // 뒤로가기 버튼
// document.querySelector('.back-btn')?.addEventListener('click', () => {
//     window.location.href = 'community.html';
// });


// post-detail.js
document.addEventListener('DOMContentLoaded', function () {
    const STORAGE_KEY = 'communityPosts';
    
    // URL에서 게시글 ID 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // 현재 로그인한 사용자 정보 가져오기
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // 게시글 데이터 가져오기
    const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const post = posts.find(p => p.id === postId);

    if (!post) {
        alert('존재하지 않는 게시글입니다.');
        window.location.href = 'community.html';
        return;
    }

    // 게시글 내용 표시
    displayPost(post);

    // 댓글 목록 표시
    displayComments(post.comments || []);

    // 댓글 입력 폼 이벤트 설정
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!currentUser) {
                alert('로그인이 필요합니다.');
                window.location.href = 'login.html';
                return;
            }

            const commentContent = document.getElementById('commentContent').value.trim();
            
            if (!commentContent) {
                alert('댓글 내용을 입력해주세요.');
                return;
            }

            addComment(commentContent);
            commentForm.reset();
        });
    }

    // 게시글 삭제 버튼 이벤트
    const deleteBtn = document.querySelector('.delete-btn');
    if (deleteBtn && currentUser && currentUser.name === post.author) {
        deleteBtn.addEventListener('click', function() {
            if (confirm('정말 삭제하시겠습니까?')) {
                deletePost(postId);
            }
        });
    }
});

// 게시글 표시 함수
function displayPost(post) {
    document.querySelector('.post-category').textContent = getCategoryName(post.category);
    document.querySelector('.post-title').textContent = post.title;
    document.querySelector('.post-author').textContent = post.author;
    document.querySelector('.post-date').innerHTML = `<i class="fas fa-calendar"></i> ${post.date}`;
    document.querySelector('.post-views').innerHTML = `<i class="fas fa-eye"></i> ${post.views || 0}`;
    document.querySelector('.post-content').innerHTML = post.content;

    // 수정/삭제 버튼 표시 여부
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const actionsDiv = document.querySelector('.post-actions');
    if (currentUser && currentUser.name === post.author) {
        actionsDiv.innerHTML = `
            <button class="edit-btn" onclick="location.href='write.html?id=${post.id}'">
                <i class="fas fa-edit"></i> 수정
            </button>
            <button class="delete-btn">
                <i class="fas fa-trash"></i> 삭제
            </button>
        `;
    } else {
        actionsDiv.style.display = 'none';
    }
}

// 카테고리 이름 변환
function getCategoryName(category) {
    const categoryNames = {
        hot: '인기글',
        notice: '공지사항',
        review: '매물후기',
        qna: '질문/답변',
        free: '자유게시판'
    };
    return categoryNames[category] || '기타';
}

// 댓글 목록 표시
function displayComments(comments) {
    const commentsContainer = document.querySelector('.comments-list');
    commentsContainer.innerHTML = '';

    if (!comments || comments.length === 0) {
        commentsContainer.innerHTML = '<p class="no-comments">첫 댓글을 작성해보세요!</p>';
        return;
    }

    comments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsContainer.appendChild(commentElement);
    });
}

// 댓글 요소 생성
function createCommentElement(comment) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${comment.author}</span>
            <span class="comment-date">${comment.date}</span>
        </div>
        <div class="comment-content">${comment.content}</div>
        ${currentUser && currentUser.name === comment.author ? `
        <div class="comment-actions">
            <button onclick="deleteComment('${comment.id}')" class="btn-text delete-comment">
                <i class="fas fa-trash"></i> 삭제
            </button>
        </div>
        ` : ''}
    `;
    return div;
}

// 댓글 추가
function addComment(content) {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return;

    const newComment = {
        id: Date.now().toString(),
        author: currentUser.name,
        content: content,
        date: new Date().toLocaleDateString()
    };

    if (!posts[postIndex].comments) {
        posts[postIndex].comments = [];
    }

    posts[postIndex].comments.push(newComment);
    localStorage.setItem('communityPosts', JSON.stringify(posts));
    
    displayComments(posts[postIndex].comments);
}

// 댓글 삭제
function deleteComment(commentId) {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return;

    const post = posts[postIndex];
    post.comments = post.comments.filter(c => c.id !== commentId);
    
    localStorage.setItem('communityPosts', JSON.stringify(posts));
    displayComments(post.comments);
}

// 게시글 삭제
function deletePost(postId) {
    const posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    const updatedPosts = posts.filter(p => p.id !== postId);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
    window.location.href = 'community.html';
}