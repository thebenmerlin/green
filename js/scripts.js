/**
 * Green Eventwaala - Main Scripts
 * Handles animations, scroll effects, form validation, and interactive elements
 */

(function() {
    'use strict';

    // ==========================================
    // CONFIGURATION
    // ==========================================
    const CONFIG = {
        animationDelay: 100,
        scrollThreshold: 0.1,
        headerScrollThreshold: 100,
        videoMuteStorageKey: 'heroVideoMuted'
    };

    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    const utils = {
        // Debounce function for performance
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Check if element is in viewport
        isInViewport: function(element, threshold = 0.1) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;

            const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
            const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

            return (vertInView && horInView);
        }
    };

    // ==========================================
    // HEADER / NAVIGATION
    // ==========================================
    const header = {
        element: null,

        init: function() {
            this.element = document.getElementById('header');
            if (!this.element) return;

            // Sticky header on scroll
            window.addEventListener('scroll', utils.debounce(this.handleScroll.bind(this), 10));
            this.handleScroll();

            // Mobile menu toggle
            const menuToggle = document.querySelector('.menu-toggle');
            if (menuToggle) {
                menuToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
            }
        },

        handleScroll: function() {
            if (window.pageYOffset > CONFIG.headerScrollThreshold) {
                this.element.classList.add('scrolled');
            } else {
                this.element.classList.remove('scrolled');
            }
        },

        toggleMobileMenu: function() {
            const nav = document.querySelector('.nav-list');
            if (nav) {
                nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';

                // Update ARIA
                const menuToggle = document.querySelector('.menu-toggle');
                const isExpanded = nav.style.display === 'flex';
                menuToggle.setAttribute('aria-expanded', isExpanded);
            }
        }
    };

    // ==========================================
    // HERO VIDEO CONTROLS
    // ==========================================
    const heroVideo = {
        video: null,
        control: null,

        init: function() {
            this.video = document.getElementById('heroVideo');
            this.control = document.getElementById('videoControl');

            if (!this.video || !this.control) return;

            // Restore mute state from localStorage
            const wasMuted = localStorage.getItem(CONFIG.videoMuteStorageKey);
            if (wasMuted === 'false') {
                this.video.muted = false;
                this.control.classList.add('unmuted');
            }

            // Add click listener
            this.control.addEventListener('click', this.toggle.bind(this));
        },

        toggle: function() {
            this.video.muted = !this.video.muted;
            this.control.classList.toggle('unmuted');

            // Save state
            localStorage.setItem(CONFIG.videoMuteStorageKey, this.video.muted);
        }
    };

    // ==========================================
    // ANIMATED COUNTERS
    // ==========================================
    const counters = {
        animated: new Set(),

        init: function() {
            const statNumbers = document.querySelectorAll('.stat-number[data-count]');

            // Use IntersectionObserver if available
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !this.animated.has(entry.target)) {
                                this.animate(entry.target);
                            }
                        });
                    },
                    { threshold: 0.5 }
                );

                statNumbers.forEach(el => observer.observe(el));
            } else {
                // Fallback for older browsers
                window.addEventListener('scroll', utils.debounce(() => {
                    statNumbers.forEach(el => {
                        if (utils.isInViewport(el, 0.5) && !this.animated.has(el)) {
                            this.animate(el);
                        }
                    });
                }, 100));
            }
        },

        animate: function(element) {
            this.animated.add(element);
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    element.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        }
    };

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================
    const scrollReveal = {
        elements: [],

        init: function() {
            this.elements = Array.from(document.querySelectorAll('.reveal'));

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const delay = entry.target.getAttribute('data-delay') || 0;
                                setTimeout(() => {
                                    entry.target.classList.add('active');
                                }, delay);
                                observer.unobserve(entry.target);
                            }
                        });
                    },
                    { threshold: CONFIG.scrollThreshold }
                );

                this.elements.forEach(el => observer.observe(el));
            } else {
                // Fallback
                window.addEventListener('scroll', utils.debounce(this.checkElements.bind(this), 100));
                this.checkElements();
            }
        },

        checkElements: function() {
            this.elements.forEach(el => {
                if (utils.isInViewport(el, CONFIG.scrollThreshold)) {
                    const delay = el.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        el.classList.add('active');
                    }, delay);
                }
            });
        }
    };

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    const smoothScroll = {
        init: function() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    // ==========================================
    // FORM VALIDATION
    // ==========================================
    const formValidation = {
        init: function() {
            const contactForm = document.getElementById('contactForm');
            if (!contactForm) return;

            contactForm.addEventListener('submit', this.handleSubmit.bind(this));

            // Real-time validation
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
            });
        },

        handleSubmit: function(e) {
            e.preventDefault();

            const form = e.target;
            const formData = new FormData(form);

            // Check honeypot
            if (formData.get('website')) {
                return false;
            }

            // Validate all fields
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Show success message
                const successMsg = document.getElementById('formSuccess');
                if (successMsg) {
                    successMsg.style.display = 'block';
                    form.reset();

                    // Hide after 5 seconds
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 5000);
                }

                // In production, you would send data to server here
                console.log('Form data:', Object.fromEntries(formData));
            }

            return false;
        },

        validateField: function(field) {
            const parent = field.closest('.form-group');
            if (!parent) return true;

            const errorMsg = parent.querySelector('.error-message');
            let isValid = true;
            let message = '';

            // Check if required field is empty
            if (field.hasAttribute('required') && !field.value.trim()) {
                isValid = false;
                message = 'This field is required';
            }

            // Email validation
            if (field.type === 'email' && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    message = 'Please enter a valid email address';
                }
            }

            // Update UI
            if (isValid) {
                parent.classList.remove('error');
                if (errorMsg) errorMsg.textContent = '';
            } else {
                parent.classList.add('error');
                if (errorMsg) errorMsg.textContent = message;
            }

            return isValid;
        }
    };

    // ==========================================
    // PORTFOLIO LOADER (from JSON)
    // ==========================================
    const portfolioLoader = {
        init: function() {
            const container = document.getElementById('portfolioGrid');
            if (!container) return;

            fetch('data/portfolio.json')
                .then(response => response.json())
                .then(data => this.render(data, container))
                .catch(error => console.error('Portfolio data not found:', error));
        },

        render: function(items, container) {
            container.innerHTML = items.map((item, index) => `
                <article class="work-card reveal" data-delay="${index * 100}">
                    <div class="work-image">
                        <img src="assets/images/placeholder-work-${(index % 3) + 1}.jpg" 
                             alt="${item.title}" loading="lazy">
                    </div>
                    <div class="work-content">
                        <div class="work-meta">
                            <span class="work-client">${item.client}</span>
                            <span class="work-year">${item.year}</span>
                        </div>
                        <h3 class="work-title">${item.title}</h3>
                        <p class="work-description">${item.sustainable_solution}</p>
                        <div class="work-tag">Sustainability</div>
                    </div>
                </article>
            `).join('');

            // Reinitialize scroll reveal for new elements
            scrollReveal.init();
        }
    };

    // ==========================================
    // GSAP & SCROLL TRIGGER INIT (if available)
    // ==========================================
    const gsapAnimations = {
        init: function() {
            // Check if GSAP is loaded
            if (typeof gsap === 'undefined') {
                console.log('GSAP not loaded, skipping advanced animations');
                return;
            }

            // Register ScrollTrigger if available
            if (typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
            }

            // Parallax effect on hero
            if (document.querySelector('.hero-content')) {
                gsap.to('.hero-content', {
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    },
                    y: 150,
                    opacity: 0.5
                });
            }

            // Stagger animation for cards
            gsap.utils.toArray('.services-grid .service-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.6,
                    delay: i * 0.1
                });
            });
        }
    };

    // ==========================================
    // LOCOMOTIVE SCROLL INIT (if available)
    // ==========================================
    const locomotiveScroll = {
        instance: null,

        init: function() {
            // Check if Locomotive Scroll is loaded
            if (typeof LocomotiveScroll === 'undefined') {
                console.log('Locomotive Scroll not loaded, using default scroll');
                return;
            }

            this.instance = new LocomotiveScroll({
                el: document.querySelector('[data-scroll-container]') || document.body,
                smooth: true,
                smoothMobile: false,
                multiplier: 1.0
            });

            // Update ScrollTrigger on Locomotive scroll
            if (typeof ScrollTrigger !== 'undefined' && this.instance) {
                this.instance.on('scroll', ScrollTrigger.update);

                ScrollTrigger.scrollerProxy('[data-scroll-container]', {
                    scrollTop(value) {
                        return arguments.length 
                            ? locomotiveScroll.instance.scrollTo(value, 0, 0) 
                            : locomotiveScroll.instance.scroll.instance.scroll.y;
                    },
                    getBoundingClientRect() {
                        return {
                            top: 0,
                            left: 0,
                            width: window.innerWidth,
                            height: window.innerHeight
                        };
                    }
                });

                ScrollTrigger.addEventListener('refresh', () => locomotiveScroll.instance.update());
                ScrollTrigger.refresh();
            }
        }
    };

    // ==========================================
    // INITIALIZATION
    // ==========================================
    const app = {
        init: function() {
            console.log('Green Eventwaala - Initializing...');

            // Core functionality (works without external libraries)
            header.init();
            heroVideo.init();
            counters.init();
            scrollReveal.init();
            smoothScroll.init();
            formValidation.init();
            portfolioLoader.init();

            // Enhanced animations (requires GSAP)
            gsapAnimations.init();

            // Smooth scroll (requires Locomotive Scroll)
            // Commented out by default - uncomment if you want to use it
            // locomotiveScroll.init();

            console.log('Green Eventwaala - Ready!');
        }
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => app.init());
    } else {
        app.init();
    }

    // Export for external access if needed
    window.GreenEventwaala = {
        header,
        heroVideo,
        counters,
        scrollReveal,
        utils
    };

})();