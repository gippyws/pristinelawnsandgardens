// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initScrollToTop();
    initSmoothScrolling();
    // initFormHandling(); // Removed to allow native form submission
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
    if (typeof initMobileMenu === 'function') initMobileMenu();
    initHeaderScrollEffect();
    
    console.log('Pristine Lawns and Gardens website loaded successfully!');
});

// Scroll to Top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Form handling and validation removed to allow native form submission to Web3Forms

// Form validation
function validateForm(data) {
    let isValid = true;
    
    // Required fields
    if (!data.name || data.name.trim() === '') {
        showFieldError('name', 'Name is required');
        isValid = false;
    }
    
    if (!data.email || data.email.trim() === '') {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

// Field validation
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(fieldName, `${field.previousElementSibling.textContent.replace(' *', '')} is required`);
        return false;
    }
    
    if (fieldName === 'email' && value && !isValidEmail(value)) {
        showFieldError(fieldName, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    clearFieldError(field);
    
    // Add error class
    formGroup.classList.add('error');
    
    // Create and add error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    formGroup.appendChild(errorMessage);
}

// Clear field error
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (errorMessage) {
        errorMessage.remove();
    }
    
    formGroup.classList.remove('error');
}

// Clear all form errors
function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorFormGroups = document.querySelectorAll('.form-group.error');
    
    errorMessages.forEach(msg => msg.remove());
    errorFormGroups.forEach(group => group.classList.remove('error'));
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Form handling and validation
    // function initFormHandling() {
    //     const quoteForm = document.getElementById('quote-form');
    //     
    //     if (quoteForm) {
    //         quoteForm.addEventListener('submit', function(e) {
    //             e.preventDefault();
    //             
    //             // Get form data
    //             const formData = new FormData(this);
    //             const formObject = {};
    //             
    //             formData.forEach((value, key) => {
    //                 formObject[key] = value;
    //             });
    //             
    //             // Validate form
    //             if (validateForm(formObject)) {
    //                 // Show loading state
    //                 const submitBtn = this.querySelector('button[type="submit"]');
    //                 const originalText = submitBtn.textContent;
    //                 submitBtn.textContent = 'Sending...';
    //                 submitBtn.disabled = true;
    //                 
    //                 // Simulate form submission (replace with actual form handling)
    //                 setTimeout(() => {
    //                     // Show success message
    //                     showNotification('Thank you! Your quote request has been sent successfully. We\'ll get back to you soon.', 'success');
    //                     
    //                     // Reset form
    //                     this.reset();
    //                     
    //                     // Reset button
    //                     submitBtn.textContent = originalText;
    //                     submitBtn.disabled = false;
    //                     
    //                     // Remove any error states
    //                     clearFormErrors();
    //                 }, 2000);
    //             }
    //         });
    //         
    //         // Real-time validation
    //         const formInputs = quoteForm.querySelectorAll('input, select, textarea');
    //         formInputs.forEach(input => {
    //             input.addEventListener('blur', function() {
    //                 validateField(this);
    //             });
    //             
    //             input.addEventListener('input', function() {
    //                 clearFieldError(this);
    //             });
    //         });
    //     }
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = mainNavigation.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mainNavigation.classList.remove('active');
                
                // Reset hamburger animation
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !mainNavigation.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mainNavigation.classList.remove('active');
                
                // Reset hamburger animation
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

// Header scroll effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Add CSS for mobile menu and notifications
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Mobile menu styles */
        @media (max-width: 768px) {
            .main-navigation {
                position: fixed;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .main-navigation.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-menu {
                flex-direction: column;
                padding: 2rem;
                gap: 1rem;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
        
        /* Header scroll effect */
        .header.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 30px rgba(0, 0, 0, 0.15);
        }
        
        /* Notification animations */
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        /* Form validation styles */
        .form-group.error input,
        .form-group.error select,
        .form-group.error textarea {
            border-color: #dc3545;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
        }
        
        .error-message {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .error-message::before {
            content: "⚠";
            font-size: 1rem;
        }
        
        /* Loading state for form */
        .btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        /* Enhanced focus styles */
        .btn:focus,
        .nav-link:focus {
            outline: 2px solid #7B9E36;
            outline-offset: 2px;
        }
        
        /* Smooth transitions for all interactive elements */
        * {
            transition: all 0.3s ease;
        }
        
        /* Hover effects for service cards */
        .service-card:hover .service-icon {
            transform: scale(1.1);
        }
        
        .service-card:hover .service-title {
            color: #7B9E36;
        }
        
        /* Enhanced button hover effects */
        .btn:hover {
            transform: translateY(-2px);
        }
        
        .btn:active {
            transform: translateY(0);
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

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
