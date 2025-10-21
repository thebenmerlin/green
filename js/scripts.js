// ==========================================
// GREEN EVENTWAALA v3 - JavaScript
// NO LOADING SCREEN VERSION
// ==========================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    header.init();
    darkMode.init();
    counters.init();
    videoControl.init();
    mobileMenu.init();
    smoothScroll.init();
    
    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined') {
        gsapAnimations.init();
    }
    
    console.log('Green Eventwaala - Site Loaded');
});

// ==========================================
// STICKY HEADER
// ==========================================
const header = {
    element: null,
    
    init: function() {
        this.element = document.getElementById('header');
        if (!this.element) return;
        
        window.addEventListener('scroll', () => this.handleScroll());
    },
    
    handleScroll: function() {
        if (window.scrollY > 100) {
            this.element.classList.add('scrolled');
        } else {
            this.element.classList.remove('scrolled');
        }
    }
};

// ==========================================
// DARK MODE TOGGLE
// ==========================================
const darkMode = {
    toggle: null,
    
    init: function() {
        this.toggle = document.getElementById('darkModeToggle');
        if (!this.toggle) return;
        
        // Check saved preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        this.setTheme(theme);
        
        this.toggle.addEventListener('click', () => this.switchTheme());
    },
    
    setTheme: function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    },
    
    switchTheme: function() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
};

// ==========================================
// ANIMATED COUNTERS
// ==========================================
const counters = {
    init: function() {
        const counters = document.querySelectorAll('[data-count]');
        if (counters.length === 0) return;
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
    },
    
    animateCounter: function(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
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

// ==========================================
// VIDEO CONTROL
// ==========================================
const videoControl = {
    video: null,
    button: null,
    
    init: function() {
        this.video = document.getElementById('heroVideo');
        this.button = document.getElementById('videoControl');
        
        if (!this.video || !this.button) return;
        
        this.button.addEventListener('click', () => this.toggle());
    },
    
    toggle: function() {
        if (this.video.muted) {
            this.video.muted = false;
            this.button.classList.add('unmuted');
        } else {
            this.video.muted = true;
            this.button.classList.remove('unmuted');
        }
    }
};

// ==========================================
// MOBILE MENU
// ==========================================
const mobileMenu = {
    toggle: null,
    nav: null,
    
    init: function() {
        this.toggle = document.getElementById('menuToggle');
        this.nav = document.querySelector('.nav');
        
        if (!this.toggle || !this.nav) return;
        
        this.toggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking nav links
        const navLinks = this.nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    },
    
    toggleMenu: function() {
        this.nav.classList.toggle('active');
        this.toggle.setAttribute('aria-expanded', 
            this.nav.classList.contains('active'));
    },
    
    closeMenu: function() {
        this.nav.classList.remove('active');
        this.toggle.setAttribute('aria-expanded', 'false');
    }
};

// ==========================================
// SMOOTH SCROLL
// ==========================================
const smoothScroll = {
    init: function() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (!target) return;
                
                e.preventDefault();
                
                const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }
};

// ==========================================
// GSAP ANIMATIONS (if GSAP is loaded)
// ==========================================
const gsapAnimations = {
    init: function() {
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
        
        // Hero parallax effect
        this.heroParallax();
        
        // Staggered reveals
        this.staggeredReveals();
        
        // Floating service icons
        this.floatingIcons();
    },
    
    heroParallax: function() {
        gsap.to('.hero-content', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            },
            y: 150,
            opacity: 0.3,
            ease: 'power2.out'
        });
    },
    
    staggeredReveals: function() {
        const sections = [
            '.journey-card',
            '.service-card',
            '.work-card',
            '.creator-card'
        ];
        
        sections.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            if (elements.length === 0) return;
            
            gsap.from(elements, {
                scrollTrigger: {
                    trigger: elements[0].parentElement,
                    start: 'top 70%'
                },
                y: 80,
                opacity: 0,
                duration: 1,
                stagger: {
                    each: 0.15,
                    ease: 'expo.out'
                }
            });
        });
    },
    
    floatingIcons: function() {
        const icons = document.querySelectorAll('.service-icon');
        if (icons.length === 0) return;
        
        icons.forEach((icon, index) => {
            gsap.to(icon, {
                y: -10,
                repeat: -1,
                yoyo: true,
                duration: 2,
                ease: 'sine.inOut',
                delay: index * 0.2
            });
        });
    }
};

// ==========================================
// FORM VALIDATION (for contact page)
// ==========================================
const formValidation = {
    init: function() {
        const form = document.querySelector('form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => this.handleSubmit(e, form));
    },
    
    handleSubmit: function(e, form) {
        e.preventDefault();
        
        // Get all required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Form is valid - you can add actual submission logic here
            console.log('Form submitted successfully');
            alert('Thank you! We will get back to you soon.');
            form.reset();
        } else {
            alert('Please fill in all required fields');
        }
    }
};

// Initialize form validation if on contact page
if (window.location.pathname.includes('contact')) {
    document.addEventListener('DOMContentLoaded', () => {
        formValidation.init();
    });
}

// ==========================================
// UTILITY: Detect if reduced motion is preferred
// ==========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Disable all animations
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
}

// ==========================================
// CONSOLE SIGNATURE
// ==========================================
console.log('%c🌿 Green Eventwaala', 'color: #007D57; font-size: 20px; font-weight: bold;');
console.log('%cSustainable Events. Authentic Beginnings.', 'color: #044A31; font-size: 12px;');
