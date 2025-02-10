// auth.js
document.addEventListener('DOMContentLoaded', () => {
    // 회원가입 폼 처리
    const signupForm = document.querySelector('form[aria-labelledby="signup-title"]');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 입력값 가져오기
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const passwordConfirm = document.getElementById('password-confirm').value;
            const name = document.getElementById('name').value;

            // 비밀번호 확인
            if (password !== passwordConfirm) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            // localStorage에서 기존 사용자 목록 가져오기
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // 이메일 중복 체크
            if (users.find(user => user.email === email)) {
                alert('이미 가입된 이메일입니다.');
                return;
            }

            // 새 사용자 추가하고 저장
            users.push({ email, password, name });
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('회원가입 완료! 로그인 페이지로 이동합니다.');
            window.location.href = 'login.html';
        });
    }

    // 로그인 폼 처리
    const loginForm = document.querySelector('form[aria-labelledby="login-title"]');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 입력값 가져오기
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // localStorage에서 사용자 찾기
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // 로그인 성공
                localStorage.setItem('currentUser', JSON.stringify(user));
                alert('로그인 성공! 메인 페이지로 이동합니다.');
                window.location.href = 'index.html';
            } else {
                // 로그인 실패
                alert('이메일 또는 비밀번호가 틀렸습니다.');
            }
        });
    }

    // 로그아웃 기능
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
});