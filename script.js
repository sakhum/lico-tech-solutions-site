/**
 * LICO TECH SOLUTIONS PTY Website
 * Main JavaScript file
 */

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const backToTopBtn = document.getElementById('backToTop');
const currentYearEl = document.getElementById('currentYear');

// Form validation function
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const errorId = field.id + '-error';
        const errorEl = document.getElementById(errorId);
        
        // Reset error
        if (errorEl) {
            errorEl.textContent = '';
            field.classList.remove('error');
        }
        
        // Check if field is empty
        if (!field.value.trim()) {
            isValid = false;
            if (errorEl) {
                errorEl.textContent = 'This field is required';
            }
            field.classList.add('error');
        }
        
        // Validate email format
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                if (errorEl) {
                    errorEl.textContent = 'Please enter a valid email address';
                }
                field.classList.add('error');
            }
        }
    });
    
    return isValid;
}

// Form submission handler
async function handleFormSubmit(form, endpoint) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;
    
    // Hide previous messages
    if (formSuccess) formSuccess.style.display = 'none';
    if (formError) formError.style.display = 'none';
    
    try {
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // In a real application, you would send this to a server
        // For GitHub Pages, we'll simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        if (formSuccess) {
            formSuccess.style.display = 'flex';
            form.reset();
        }
        
        // Log to console for debugging
        console.log('Form submitted:', data);
        
    } catch (error) {
        console.error('Form submission error:', error);
        if (formError) {
            formError.style.display = 'block';
        }
    } finally {
        // Reset button state
        btnText.style.display = 'inline-flex';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Initialize Mobile Menu
function initMobileMenu() {
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Initialize Form Submissions
function initForms() {
    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm(contactForm)) {
                handleFormSubmit(contactForm, '/api/contact');
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required')) {
                    const errorId = input.id + '-error';
                    const errorEl = document.getElementById(errorId);
                    
                    if (!input.value.trim()) {
                        if (errorEl) {
                            errorEl.textContent = 'This field is required';
                        }
                        input.classList.add('error');
                    } else {
                        if (errorEl) {
                            errorEl.textContent = '';
                        }
                        input.classList.remove('error');
                    }
                }
            });
        });
    }
    
    // Newsletter Form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && email.includes('@')) {
                // Simulate subscription
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Initialize Back to Top Button
function initBackToTop() {
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip # or empty href
            if (href === '#' || href === '') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Initialize Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize Active Navigation
function initActiveNavigation() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Set current year in footer
function setCurrentYear() {
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
}

// Initialize Lazy Loading for Images
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        // Could implement Intersection Observer here
    }
}

// Initialize Performance Monitoring
function initPerformanceMonitoring() {
    // Log page load time
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${pageLoadTime}ms`);
        }
    });
}

// Initialize Service Worker (optional)
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed:', error);
                });
        });
    }
}

// Initialize all functionality
function init() {
    setCurrentYear();
    initMobileMenu();
    initForms();
    initBackToTop();
    initSmoothScrolling();
    initIntersectionObserver();
    initActiveNavigation();
    initLazyLoading();
    initPerformanceMonitoring();
    
    // Initialize service worker only if file exists
    // initServiceWorker();
    
    // Add loading class to body and remove when page is loaded
    document.body.classList.add('loading');
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 100);
    });
    
    // Console greeting
    console.log('%cLICO TECH SOLUTIONS PTY%c\nInnovative Technology & Supply Chain Solutions\nhttps://licotechsolutions.co.za', 
        'color: #1e3a8a; font-size: 18px; font-weight: bold;',
        'color: #4b5563; font-size: 14px;');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        initMobileMenu,
        initForms,
        initBackToTop,
        initSmoothScrolling
    };
}