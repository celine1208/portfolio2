// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
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
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});

// Add animation delays to cards
document.querySelectorAll('.property-card').forEach((card, index) => {
    card.style.setProperty('--card-index', index + 1);
});

document.querySelectorAll('.category-card').forEach((card, index) => {
    card.style.setProperty('--card-index', index + 1);
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

// Observe all animated elements
document.querySelectorAll('.property-card, .category-card, .section-title').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

document.addEventListener('DOMContentLoaded', function() {
    // Page Up Button
    const pageUpBtn = document.getElementById('pageUpBtn');
    const chatBtn = document.getElementById('chatBtn');
    const chatModal = document.getElementById('chatModal');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatMessages = document.querySelector('.chat-messages');

    // Show/hide page up button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            pageUpBtn.style.display = 'flex';
        } else {
            pageUpBtn.style.display = 'none';
        }
    });

    // Scroll to top when page up button is clicked
    pageUpBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Toggle chat modal
    chatBtn.addEventListener('click', function() {
        chatModal.classList.add('active');
    });

    // Close chat modal
    closeChatBtn.addEventListener('click', function() {
        chatModal.classList.remove('active');
    });

    // Send message function
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'message';
            userMessage.style.marginLeft = 'auto';
            userMessage.style.backgroundColor = '#007bff';
            userMessage.style.color = '#fff';
            userMessage.textContent = message;
            chatMessages.appendChild(userMessage);

            // Clear input
            messageInput.value = '';

            // Auto scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simulate response (you can replace this with actual chat functionality)
            setTimeout(() => {
                const response = document.createElement('div');
                response.className = 'message';
                response.style.backgroundColor = '#f1f1f1';
                response.textContent = '상담원이 곧 응답드리겠습니다.';
                chatMessages.appendChild(response);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }

    // Send message on button click
    sendMessageBtn.addEventListener('click', sendMessage);

    // Send message on Enter key
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Hide page up button initially
    pageUpBtn.style.display = 'none';
});