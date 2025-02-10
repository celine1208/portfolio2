document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // 사용자 정보 표시
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-email').textContent = currentUser.email;
});
// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', () => {
    // localStorage에서 현재 로그인한 사용자 정보 가져오기
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // 사용자 데이터 설정
    const userData = {
        name: currentUser.name,
        email: currentUser.email,
        joinDate: currentUser.joinDate || '2024-01-15',
        lastLogin: currentUser.lastLogin || new Date().toISOString(),
        phone: currentUser.phone || '',
        membershipLevel: currentUser.membershipLevel || '일반회원',
        stats: currentUser.stats || {
            favorites: 0,
            posts: 0,
            notifications: 0
        }
    };

    // 초기 데이터 로드
    initializeUserData(userData);
    
    // 탭 전환 이벤트 리스너
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab));
    });

    // 프로필 이미지 변경 버튼 이벤트
    const changeProfileBtn = document.getElementById('change-profile-pic');
    if (changeProfileBtn) {
        changeProfileBtn.addEventListener('click', handleProfileImageChange);
    }

    // 모달 관련 이벤트
    setupModalEvents();
    
    // 설정 변경 이벤트
    setupSettingsEvents();
});

// 사용자 데이터 초기화
function initializeUserData(data) {
    // 기본 정보 설정
    document.getElementById('user-name').textContent = data.name;
    document.getElementById('user-email').textContent = data.email;
    document.getElementById('join-date').textContent = formatDate(data.joinDate);
    document.getElementById('last-login').textContent = formatDateTime(data.lastLogin);

    // 전화번호가 있는 경우에만 표시
    const phoneElement = document.getElementById('user-phone');
    if (data.phone) {
        phoneElement.innerHTML = data.phone;
    }

    // 통계 업데이트
    updateStats(data.stats);
}

// 날짜 포맷팅 함수
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// 날짜/시간 포맷팅 함수
function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 통계 업데이트
function updateStats(stats) {
    const statElements = document.querySelectorAll('.stat-item strong');
    statElements[0].textContent = stats.favorites;
    statElements[1].textContent = stats.posts;
    statElements[2].textContent = stats.notifications;
}

// 탭 전환 함수
function switchTab(selectedTab) {
    // 기존 활성 탭 제거
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // 선택된 탭 활성화
    selectedTab.classList.add('active');
    const targetId = selectedTab.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('active');
}

// 프로필 이미지 변경 처리
function handleProfileImageChange() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('profile-pic').src = e.target.result;
                // 여기에 이미지 업로드 API 호출 추가
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

// 모달 이벤트 설정
function setupModalEvents() {
    // 모달 열기
    document.getElementById('edit-profile').addEventListener('click', () => {
        const modal = document.getElementById('editProfileModal');
        modal.classList.add('active');
        
        // 현재 사용자 데이터로 폼 초기화
        document.getElementById('editName').value = document.getElementById('user-name').textContent;
        const phone = document.getElementById('user-phone').textContent;
        document.getElementById('editPhone').value = phone !== '연락처를 등록해주세요' ? phone : '';
    });

    // 모달 닫기
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('editProfileModal').classList.remove('active');
        });
    });

    // 프로필 저장
    document.getElementById('saveProfile').addEventListener('click', () => {
        const newData = {
            name: document.getElementById('editName').value,
            phone: document.getElementById('editPhone').value,
            bio: document.getElementById('editBio').value
        };

        // 여기에 프로필 업데이트 API 호출 추가
        updateProfile(newData);
        document.getElementById('editProfileModal').classList.remove('active');
    });
}

// 프로필 업데이트
function updateProfile(data) {
    // 화면 업데이트
    document.getElementById('user-name').textContent = data.name;
    if (data.phone) {
        document.getElementById('user-phone').innerHTML = data.phone;
    }
    
    // 성공 메시지 표시
    showNotification('프로필이 성공적으로 업데이트되었습니다.');
}

// 설정 이벤트 설정
function setupSettingsEvents() {
    // 알림 설정 토글
    document.querySelectorAll('.toggle input').forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const setting = e.target.parentElement.querySelector('span').textContent;
            const isEnabled = e.target.checked;
            // 여기에 설정 업데이트 API 호출 추가
            console.log(`${setting} ${isEnabled ? '활성화' : '비활성화'}`);
        });
    });

    // 회원탈퇴 버튼
    document.getElementById('delete-account').addEventListener('click', () => {
        if (confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            // 여기에 회원탈퇴 API 호출 추가
            console.log('회원탈퇴 처리');
        }
    });
}

// 알림 표시 함수
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // 3초 후 알림 제거
    setTimeout(() => {
        notification.remove();
    }, 3000);
}