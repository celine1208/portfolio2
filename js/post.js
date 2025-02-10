// 게시물 작성 폼 제출 처리
document.getElementById('postForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const post = {
        id: `post-${Date.now()}`,
        category: document.getElementById('category').value,
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        author: '작성자', // 실제로는 로그인된 사용자 정보 사용
        date: new Date().toISOString().split('T')[0],
        views: 0,
        likes: 0,
        comments: []
    };

    // 로컬 스토리지에 저장
    const posts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
    posts.push(post);
    localStorage.setItem('communityPosts', JSON.stringify(posts));

    // 커뮤니티 페이지로 이동
    window.location.href = 'community.html';
});

// 취소 버튼 처리
document.querySelector('.cancel-btn').addEventListener('click', () => {
    window.location.href = 'community.html';
});