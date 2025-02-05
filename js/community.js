// board.js
let currentPost = null;
const defaultUser = "사용자"; // 실제로는 로그인 시스템과 연동 필요

// localStorage에서 게시글 데이터 가져오기
function getPosts() {
    const posts = localStorage.getItem('posts');
    return posts ? JSON.parse(posts) : [];
}

// 게시글 저장하기
function savePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// 게시글 목록 표시
function displayPosts(category = '') {
    const posts = getPosts();
    const filteredPosts = category ? posts.filter(post => post.category === category) : posts;
    const postsContainer = document.querySelector('.posts');
    postsContainer.innerHTML = '';

    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post-item';
        postElement.innerHTML = `
            <span class="badge ${getCategoryBadgeClass(post.category)}">${getCategoryName(post.category)}</span>
            <div class="post-title">${post.title}</div>
            <div class="post-meta">
                <span><i class="fas fa-user"></i> ${post.author}</span>
                <span><i class="fas fa-calendar"></i> ${post.date}</span>
                <span><i class="fas fa-eye"></i> ${post.views}</span>
            </div>
        `;
        postElement.onclick = () => viewPost(post.id);
        postsContainer.appendChild(postElement);
    });
}

// 카테고리 뱃지 클래스 반환
function getCategoryBadgeClass(category) {
    const classes = {
        'news': 'notice',
        'trend': 'hot',
        'review': 'review',
        'qna': 'qna',
        'free': 'notice'
    };
    return classes[category] || 'notice';
}

// 카테고리 한글명 반환
function getCategoryName(category) {
    const names = {
        'news': '뉴스',
        'trend': '동향',
        'review': '후기',
        'qna': '질문',
        'free': '자유'
    };
    return names[category] || '기타';
}

// 글쓰기 모달 열기
function openWriteModal() {
    document.getElementById('writeModal').style.display = 'block';
}

// 모달 닫기
function closeModal() {
    document.getElementById('writeModal').style.display = 'none';
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
    document.getElementById('postCategory').value = '';
    currentPost = null;
}

// 게시글 저장
function savePost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const category = document.getElementById('postCategory').value;

    if (!title || !content || !category) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    const posts = getPosts();
    const now = new Date().toLocaleDateString();

    if (currentPost) {
        // 게시글 수정
        const index = posts.findIndex(post => post.id === currentPost.id);
        if (index !== -1) {
            posts[index] = {
                ...posts[index],
                title,
                content,
                category,
                lastModified: now
            };
        }
    } else {
        // 새 게시글 작성
        const newPost = {
            id: uuid.v4(),
            title,
            content,
            category,
            author: defaultUser,
            date: now,
            views: 0
        };
        posts.unshift(newPost);
    }

    savePosts(posts);
    closeModal();
    displayPosts();
}

// 게시글 보기
function viewPost(postId) {
    const posts = getPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    // 조회수 증가
    post.views = (post.views || 0) + 1;
    savePosts(posts);

    document.getElementById('viewTitle').textContent = post.title;
    document.getElementById('viewAuthor').innerHTML = `<i class="fas fa-user"></i> ${post.author}`;
    document.getElementById('viewDate').innerHTML = `<i class="fas fa-calendar"></i> ${post.date}`;
    document.getElementById('viewViews').innerHTML = `<i class="fas fa-eye"></i> ${post.views}`;
    document.getElementById('viewContent').textContent = post.content;
    
    currentPost = post;
    document.getElementById('viewModal').style.display = 'block';
}

// 게시글 수정
function editPost() {
    if (!currentPost) return;

    document.getElementById('postTitle').value = currentPost.title;
    document.getElementById('postContent').value = currentPost.content;
    document.getElementById('postCategory').value = currentPost.category;

    closeViewModal();
    openWriteModal();
}

// 게시글 삭제
function deletePost() {
    if (!currentPost || !confirm('정말 삭제하시겠습니까?')) return;

    const posts = getPosts().filter(post => post.id !== currentPost.id);
    savePosts(posts);
    closeViewModal();
    displayPosts();
}

// 상세보기 모달 닫기
function closeViewModal() {
    document.getElementById('viewModal').style.display = 'none';
    currentPost = null;
}

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', () => {
    displayPosts();

    // 글쓰기 버튼
    document.querySelector('.write-btn').addEventListener('click', openWriteModal);

    // 카테고리 탭
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const category = e.target.textContent === '전체글' ? '' : 
                            e.target.textContent === '부동산 뉴스' ? 'news' :
                            e.target.textContent === '시장동향' ? 'trend' :
                            e.target.textContent === '매물후기' ? 'review' :
                            e.target.textContent === '질문/답변' ? 'qna' :
                            e.target.textContent === '자유게시판' ? 'free' : '';
            
            displayPosts(category);
        });
    });
});