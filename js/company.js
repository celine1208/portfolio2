// 스크롤 애니메이션
function revealOnScroll() {
    const elements = document.querySelectorAll('.mission-vision, .timeline-item, .team-member, .contact-item');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
}

// CSS 추가
const style = document.createElement('style');
style.textContent = `
    .mission-vision, .timeline-item, .team-member, .contact-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .company-header {
        animation: fadeInDown 1s ease-out;
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // 초기 로드 시 실행