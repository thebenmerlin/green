// ===========================================
// GREEN EVENTWAALA - SINGLE PAGE WEBSITE
// Smooth Scrolling, Animations, Form Handling
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    preloader.init();
    navigation.init();
    scrollAnimations.init();
    counters.init();
    form.init();
    backToTop.init();
    
    console.log('🌿 Green Eventwaala - Site Loaded Successfully');
});

// ===========================================
// PRELOADER
// ===========================================
const preloader = {
    element: null,
    maxVisibleTime: 2000, // 2 seconds max
    
    init: function() {
        this.element = document.getElementById('preloader');
        if (!this.element) return;
        
        // Hide after max time OR when window loads (whichever comes first)
        const hideTimer = setTimeout(() => this.hide(), this.maxVisibleTime);
        
        window.addEventListener('load', () => {
            clearTimeout(hideTimer);
            setTimeout(() => this.hide(), 300); // Small delay for smooth UX
        });
    },
    
    hide: function() {
        if (this.element) {
            this.element.classList.add('hidden');
        }
    }
};

// ===========================================
// NAVIGATION
// ===========================================
const navigation = {
    navbar: null,
    navToggle: null,
    navMenu: null,
    navLinks: null,
    
    init: function() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        if (!this.navbar) return;
        
        // Scroll behavior
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }
        
        // Smooth scroll for nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e, link));
        });
        
        // Update active link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
    },
    
    handleScroll: function() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },
    
    toggleMenu: function() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    },
    
    closeMenu: function() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    },
    
    handleNavClick: function(e, link) {
        const href = link.getAttribute('href');
        
        // Only handle internal links
        if (!href || !href.startsWith('#')) return;
        
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const navHeight = this.navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            this.closeMenu();
        }
    },
    
    updateActiveLink: function() {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = this.navbar.offsetHeight;
        const scrollPosition = window.scrollY + navHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

// ===========================================
// SCROLL ANIMATIONS
// ===========================================
const scrollAnimations = {
    observer: null,
    
    init: function() {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: just show all elements
            document.querySelectorAll('.reveal').forEach(el => {
                el.classList.add('active');
            });
            return;
        }
        
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, options);
        
        // Observe all elements with reveal class
        document.querySelectorAll('.reveal').forEach(element => {
            this.observer.observe(element);
        });
        
        // Also observe cards for staggered animation
        this.animateCards('.journey-card', 200);
        this.animateCards('.service-card', 150);
        this.animateCards('.value-card', 100);
        this.animateCards('.commitment-card', 100);
    },
    
    animateCards: function(selector, staggerDelay) {
        const cards = document.querySelectorAll(selector);
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = `all 0.6s ease-out ${index * staggerDelay}ms`;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(card);
        });
    }
};

// ===========================================
// ANIMATED COUNTERS
// ===========================================
const counters = {
    animated: new Set(),
    
    init: function() {
        const counterElements = document.querySelectorAll('[data-target]');
        
        if (counterElements.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated.has(entry.target)) {
                    this.animateCounter(entry.target);
                    this.animated.add(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterElements.forEach(element => observer.observe(element));
    },
    
    animateCounter: function(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
};

// ===========================================
// CONTACT FORM
// ===========================================
const form = {
    element: null,
    messageDiv: null,
    
    init: function() {
        this.element = document.getElementById('contactForm');
        this.messageDiv = document.getElementById('formMessage');
        
        if (!this.element) return;
        
        this.element.addEventListener('submit', (e) => this.handleSubmit(e));
    },
    
    handleSubmit: function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.element);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Validate required fields
        if (!data.name || !data.email || !data.eventType || !data.message) {
            this.showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show success message
        this.showMessage('Thank you! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        this.element.reset();
        
        // In production, you would send data to a server here
        console.log('Form data:', data);
    },
    
    showMessage: function(message, type) {
        if (!this.messageDiv) return;
        
        this.messageDiv.textContent = message;
        this.messageDiv.className = `form-message ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.messageDiv.className = 'form-message';
        }, 5000);
    }
};

// ===========================================
// BACK TO TOP BUTTON
// ===========================================
const backToTop = {
    button: null,
    
    init: function() {
        this.button = document.getElementById('backToTop');
        if (!this.button) return;
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Scroll to top on click
        this.button.addEventListener('click', () => this.scrollToTop());
    },
    
    handleScroll: function() {
        if (window.scrollY > 500) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    },
    
    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

// Debounce function for performance
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

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Disable smooth scroll
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Reduce animation durations
    document.querySelectorAll('*').forEach(element => {
        const style = element.style;
        style.animationDuration = '0.01ms';
        style.transitionDuration = '0.01ms';
    });
}

// ===========================================
// PERFORMANCE OPTIMIZATIONS
// ===========================================

// Lazy load images when they come into viewport
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading if images exist
if (document.querySelectorAll('img[data-src]').length > 0) {
    lazyLoadImages();
}

// ===========================================
// ERROR HANDLING
// ===========================================

// Log errors to console in development
window.addEventListener('error', (e) => {
    console.error('Error caught:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===========================================
// CONSOLE SIGNATURE
// ===========================================
console.log('%c🌿 Green Eventwaala', 'color: #007D57; font-size: 24px; font-weight: bold;');
console.log('%cSustainable Events. Authentic Beginnings.', 'color: #044A31; font-size: 14px;');
console.log('%cBuilding India\'s greenest event management company.', 'color: #6BBF59; font-size: 12px;');