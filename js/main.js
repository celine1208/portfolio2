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