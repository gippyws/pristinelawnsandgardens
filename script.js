// Web3Forms AJAX and success message logic
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact-form');
    var success = document.getElementById('form-success');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var formData = new FormData(form);
            fetch(form.action, {
                method: 'POST',
                body: formData
            })
            .then(function(response) { return response.json(); })
            .then(function(data) {
                if (data.success) {
                    form.style.display = 'none';
                    if (success) {
                        success.style.display = 'block';
                        success.classList.remove('d-none');
                    }
                } else {
                    alert('There was an error sending your message. Please try again.');
                }
            })
            .catch(function() {
                alert('There was an error sending your message. Please try again.');
            });
        });
    }
});
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality (functions are defined below)
    initScrollToTop();
    initSmoothScrolling();
    initFormHandling();
    initScrollAnimations();
    initMobileMenu();
    initHeaderScrollEffect();

    console.log('Pristine Lawns and Gardens website loaded successfully!');
});

// -------- Utilities & Features (minimal safe versions) --------

// Scroll to Top functionality (safe minimal)
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (!scrollToTopBtn) return;
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth internal anchor scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('.nav-link, .footer-links a');
    if (!links.length) return;
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href') || '';
            if (!href.startsWith('#')) return;
            e.preventDefault();
            const target = document.getElementById(href.slice(1));
            if (!target) return;
            const header = document.querySelector('.header');
            const headerH = header ? header.offsetHeight : 0;
            const y = target.getBoundingClientRect().top + window.pageYOffset - headerH - 10;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });
}

// No-op; Web3Forms handles submit. Keep to avoid ReferenceError.
function initFormHandling() {}

// Optional animations; safe no-op
function initScrollAnimations() {}

// Mobile menu with exact header height
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.getElementById('main-navigation') || document.querySelector('.main-navigation');
    const header = document.querySelector('.header');
    if (!toggle || !nav || !header) return;

    function applyPosition() {
        const h = header.offsetHeight || 0;
        nav.style.top = h + 'px';
        nav.style.maxHeight = `calc(100vh - ${h}px)`;
    }
    applyPosition();

    function openMenu() {
        toggle.classList.add('active');
        nav.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
        applyPosition();
    }
    function closeMenu() {
        toggle.classList.remove('active');
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    }
    function toggleMenu() {
        if (nav.classList.contains('active')) closeMenu(); else openMenu();
    }
    toggle.addEventListener('click', toggleMenu);
    toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();
            toggleMenu();
        }
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !nav.contains(e.target)) closeMenu();
    });
    // Close on nav link click
    nav.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', closeMenu));
    // Recompute on resize and load
    window.addEventListener('resize', applyPosition);
    window.addEventListener('load', applyPosition);
}

// Header scroll hide/show and shadow
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (!header) return;
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) header.classList.add('scrolled'); else header.classList.remove('scrolled');
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
}

// Remove dynamic style injection to avoid conflicts with styles.css

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initLazyLoading();

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add parallax effect to hero section (subtle)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading animation for page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .loading-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

document.head.appendChild(loadingStyle);
