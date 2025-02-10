// navigation.js
document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.nav-menu');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginMenuItem = navMenu.querySelector('li:last-child');

    // 로그인 상태에 따라 메뉴 변경
    if (currentUser) {
        loginMenuItem.innerHTML = `
            <li class="dropdown">
                <a href="#" class="dropdown-toggle">
                    <i class="fas fa-user"></i> ${currentUser.name}님
                </a>
                <ul class="dropdown-menu">
                    <li><a href="./mypage.html"><i class="fas fa-user-circle"></i> 마이페이지</a></li>
                    <li><a href="#" id="logout"><i class="fas fa-sign-out-alt"></i> 로그아웃</a></li>
                </ul>
            </li>
        `;

        // 로그아웃 이벤트
        document.getElementById('logout').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    } else {
        loginMenuItem.innerHTML = '<a href="./login.html"><i class="fas fa-user"></i> 로그인/회원가입</a>';
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const closeIcon = document.querySelector('.fa-close');
const openIcon = document.querySelector('.fa-bars');
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    closeIcon.classList.toggle('hidden');
    openIcon.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        openIcon.classList.remove('hidden');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll handling
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});

// chatbot
const chatBtn = document.querySelector('#chat-btn');
const chatWindow = document.querySelector('.chat-window');
const chatClose = document.querySelector('.fa-close');
const chatInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector(".chat-input button");
const chatMessages = document.querySelector('.chat-messages');

chatBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
});

function appendMessage(text, isUser = false) {
    const message = document.createElement("div");
    message.textContent = text;
    message.style.padding = "10px";
    message.style.margin = "5px 0";
    message.style.borderRadius = "10px";
    message.style.width = "fit-content";
    
    if (isUser) {
        message.style.background = "#4f46e533";
        message.style.textAlign = "right";
        message.style.marginLeft = "auto";

    } else {
        message.style.background = "#ededed";
    }
    
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText !== "") {
        appendMessage(messageText, true);
        chatInput.value = "";
        setTimeout(() => {
            appendMessage("상담원과 연결중입니다. 잠시만 기다려주세요.", false);
        }, 500);
    }
}

sendButton.addEventListener("click", sendMessage);

chatInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});