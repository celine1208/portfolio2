document.addEventListener('DOMContentLoaded', function () {
    const STORAGE_KEY = 'communityPosts';
    const tabButtons = document.querySelectorAll('.tab-btn');
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const writeButton = document.querySelector('.write-btn');
    const paginationLinks = document.querySelectorAll('.pagination a');

    let currentPage = 1;
    let currentCategory = '전체글';
    let currentSearch = '';

    function displayPosts() {
        const postsContainer = document.querySelector('.posts');
        postsContainer.innerHTML = '';
        const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        posts.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });

        filterPosts();
    }

    function createPostElement(post) {
        const div = document.createElement('div');
        div.className = 'post-item';
        div.dataset.postId = post.id;
        div.innerHTML = `
            <span class="badge ${post.category}">${getCategoryName(post.category)}</span>
            <div class="post-title">${post.title}</div>
            <div class="post-meta">
                <span><i class="fas fa-user"></i> ${post.author}</span>
                <span><i class="fas fa-calendar"></i> ${post.date}</span>
                <span><i class="fas fa-eye"></i> ${post.views || 0}</span>
            </div>
        `;
        div.addEventListener('click', function () {
            // 조회수 증가 로직
            const posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            const postIndex = posts.findIndex(p => p.id === post.id);
            if (postIndex !== -1) {
                posts[postIndex].views = (posts[postIndex].views || 0) + 1;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
            }
            window.location.href = `post-detail.html?id=${post.id}`;
        });
        return div;
    }

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

    function filterPosts() {
        const postItems = document.querySelectorAll('.post-item');

        postItems.forEach(post => {
            const category = post.querySelector('.badge').textContent;
            const title = post.querySelector('.post-title').textContent;
            const author = post.querySelector('.fa-user').nextSibling.textContent.trim();

            const categoryMatch = currentCategory === '전체글' || category === currentCategory;
            const searchMatch = currentSearch === '' ||
                title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                author.toLowerCase().includes(currentSearch.toLowerCase());

            post.style.display = categoryMatch && searchMatch ? 'block' : 'none';
        });

        updatePagination();
    }

    function updatePagination() {
        paginationLinks.forEach(link => {
            if (link.textContent === currentPage.toString()) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function handleSearch() {
        currentSearch = searchInput.value.trim();
        filterPosts();
    }

    // 이벤트 리스너 설정
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') handleSearch();
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.textContent;
            filterPosts();
        });
    });

    paginationLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            paginationLinks.forEach(l => l.classList.remove('active'));

            if (this.textContent !== '') {
                currentPage = parseInt(this.textContent);
                this.classList.add('active');
            } else if (this.querySelector('.fa-chevron-left')) {
                if (currentPage > 1) currentPage--;
            } else if (this.querySelector('.fa-chevron-right')) {
                if (currentPage < 5) currentPage++;
            }

            updatePagination();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    });

    writeButton.addEventListener('click', () => {
        window.location.href = 'post.html';
    });

    displayPosts();
});