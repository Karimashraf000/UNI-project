/* ========================================
   DREAM CAR - Shared JavaScript
   Utilities and Interactive Features
   ======================================== */

// ========================================
// SCROLL TO TOP FUNCTIONALITY
// ========================================
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (!scrollBtn) return;

    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
// FORM VALIDATION HELPERS
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
}

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease-out',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });

    // Set background color based on type
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#2563EB'
    };
    toast.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
// NEWSLETTER SUBSCRIPTION
function initNewsletterForm() {
    const forms = document.querySelectorAll('form[aria-label="Newsletter subscription"]');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = this.querySelector('.email');
            const email = emailInput.value.trim();

            if (!validateEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }

            // Simulate subscription
            showToast('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        });
    });
}
// SMOOTH SCROLL FOR ANCHOR LINKS
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
// MOBILE MENU TOGGLE (if needed)
function initMobileMenu() {
    const header = document.querySelector('header');
    if (!header) return;
    // Check if mobile menu button exists
    let menuBtn = document.querySelector('.mobile-menu-btn');
    // Create mobile menu button if it doesn't exist
    if (!menuBtn && window.innerWidth <= 700) {
        menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '☰';
        menuBtn.setAttribute('aria-label', 'Toggle menu');

        Object.assign(menuBtn.style, {
            display: 'none',
            fontSize: '24px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '10px'
        });

        header.appendChild(menuBtn);

        menuBtn.addEventListener('click', function () {
            const nav = header.querySelector('nav');
            if (nav) {
                nav.classList.toggle('mobile-active');
            }
        });
    }
}
// LOCAL STORAGE HELPERS
const Storage = {
    set: function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },

    get: function (key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },

    remove: function (key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    }
};
// ANIMATION ON SCROLL
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with animation class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}
// INITIALIZE ALL FEATURES
document.addEventListener('DOMContentLoaded', function () {
    initScrollToTop();
    initNewsletterForm();
    initSmoothScroll();
    initMobileMenu();
    initScrollAnimations();

    // Add fade-in animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease-in';
        document.body.style.opacity = '1';
    }, 10);
});
// EXPORT UTILITIES FOR USE IN OTHER SCRIPTS
window.DreamCar = {
    validateEmail,
    validatePhone,
    showToast,
    Storage
};
