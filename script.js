// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
    });
}, observerOptions);

// Observe all elements with animate class
document.querySelectorAll('.animate').forEach((el) => observer.observe(el));

// Mobile navigation toggle
const createMobileNav = () => {
    const nav = document.querySelector('.nav-links');
    const burger = document.createElement('div');
    burger.className = 'mobile-nav-toggle';
    burger.innerHTML = '<i class="fas fa-bars"></i>';
    
    document.querySelector('.nav-content').appendChild(burger);
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.querySelector('i').classList.toggle('fa-bars');
        burger.querySelector('i').classList.toggle('fa-times');
    });
};

// Initialize mobile navigation if screen width is below 768px
if (window.innerWidth < 768) {
    createMobileNav();
}

// Project links hover effect
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.querySelector('i').style.transform = 'translateX(5px)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.querySelector('i').style.transform = 'translateX(0)';
    });
});

// Add loading animation for skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Lazy loading for project images (if any)
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});