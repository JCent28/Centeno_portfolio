// Portfolio JavaScript - Dark Elegance Theme

// Global Variables
let currentImageIndex = 0;
let allImages = [];
const nicknames = ['My Name is Jervyn', 'Jade', 'I am a Developer', 'Programmer', 'Software Engineer', 'Tech Enthusiast'];
let currentNicknameIndex = 0;
let screenshots = [];
let currentIndex = 0;

// DOM Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');
const backToTopBtn = document.getElementById('backToTop');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const nameTypewriter = document.getElementById('nameTypewriter');

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main Initialization Function
function initializePortfolio() {
    setupMobileMenu();
    setupSmoothScrolling();
    setupScrollEffects();
    setupImageModal();
    setupTypewriterEffect();
    collectAllImages();
    addScrollAnimations();
}

// Mobile Menu Toggle
function setupMobileMenu() {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects (Back to Top Button & Header)
function setupScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Back to Top Button
        if (scrollTop > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Header Background Opacity
        const opacity = Math.min(scrollTop / 100, 1);
        header.style.backgroundColor = `rgba(18, 18, 18, ${0.95 + (opacity * 0.05)})`;
        
        // Active Navigation Link
        updateActiveNavLink();
    });
}

// Update Active Navigation Link Based on Scroll Position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Typewriter Effect for Name/Nicknames
function setupTypewriterEffect() {
    if (nameTypewriter) {
        startTypewriterCycle();
    }
}

function startTypewriterCycle() {
    const typewriterElement = nameTypewriter;
    
    function typeWriter(text, callback) {
        typewriterElement.textContent = '';
        typewriterElement.style.borderRight = '3px solid var(--accent)';
        
        let i = 0;
        function type() {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 200);
            } else {
                setTimeout(callback, 2000); // Wait before starting delete
            }
        }
        type();
    }
    
    function deleteWriter(callback) {
        const text = typewriterElement.textContent;
        let i = text.length;
        
        function deleteChar() {
            if (i > 0) {
                typewriterElement.textContent = text.substring(0, i - 1);
                i--;
                setTimeout(deleteChar, 50);
            } else {
                setTimeout(callback, 2000); // Wait before next word
            }
        }
        deleteChar();
    }
    
    function cycleNames() {
        const currentName = nicknames[currentNicknameIndex];
        typeWriter(currentName, function() {
            deleteWriter(function() {
                currentNicknameIndex = (currentNicknameIndex + 1) % nicknames.length;
                cycleNames();
            });
        });
    }
    
    // Start the cycle
    cycleNames();
}

// Image Modal Functionality
function setupImageModal() {
    // Close modal when clicking on background
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (imageModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeImageModal();
            } else if (e.key === 'ArrowLeft') {
                previousImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });
}

// Collect All Images for Modal Navigation
function collectAllImages() {
    allImages = Array.from(document.querySelectorAll('.screenshot'));
}

// Open Image Modal
function openImageModal(imgElement, imagesArray) {
    screenshots = imagesArray;
    currentIndex = 0;
    document.getElementById('modalImage').src = screenshots[currentIndex];
    document.getElementById('imageModal').classList.add('active');
    updateModalNavigation();
}

// Close Image Modal
function closeImageModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
    screenshots = [];
    currentIndex = 0;
    
}

// Previous Image in Modal
function previousImage() {
    if (screenshots.length === 0) return;
    currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
    document.getElementById('modalImage').src = screenshots[currentIndex];
    updateModalNavigation();
}

// Next Image in Modal
function nextImage() {
    if (screenshots.length === 0) return;
    currentIndex = (currentIndex + 1) % screenshots.length;
    document.getElementById('modalImage').src = screenshots[currentIndex];
    updateModalNavigation();
}

// Update Modal Navigation Buttons
function updateModalNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn && nextBtn && screenshots.length > 0) {
        prevBtn.style.opacity = currentIndex > 0 ? '1' : '0.3';
        nextBtn.style.opacity = currentIndex < screenshots.length - 1 ? '1' : '0.3';
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === screenshots.length - 1;
    }
}

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// CV Download Function
function downloadCV() {
    // Replace with actual CV file path
    const cvPath = 'Centeno-CV.pdf';
    
    // Create temporary download link
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'Centeno-CV.pdf';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show notification (optional)
    showNotification('CV download started!', 'success');
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        backgroundColor: type === 'success' ? 'var(--highlight)' : 'var(--accent)',
        color: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        zIndex: '2001',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Scroll Animation for Sections
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards for staggered animation
    const cards = document.querySelectorAll('.project-card, .certificate-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Parallax Effect for Background Elements
function addParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Dynamic Skill Tags Animation
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('loading');
    });
}

// Form Validation (if contact form is added later)
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form data
            if (validateFormData(data)) {
                submitForm(data);
            }
        });
    });
}

// Utility Functions
function validateFormData(data) {
    // Add form validation logic here
    return true;
}

function submitForm(data) {
    // Add form submission logic here
    showNotification('Message sent successfully!', 'success');
}

// Debounce Function for Performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle Function for Scroll Events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Enhanced scroll event with throttling
window.addEventListener('scroll', throttle(function() {
    setupScrollEffects();
}, 16));

// Resize Handler
window.addEventListener('resize', debounce(function() {
    // Recalculate positions on resize
    collectAllImages();
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        mobileMenuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    }
}, 250));

// Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    animateSkillTags();
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});

// Service Worker Registration (for PWA features - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for global access
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.previousImage = previousImage;
window.nextImage = nextImage;
window.scrollToTop = scrollToTop;
window.downloadCV = downloadCV;

document.getElementById('modalImage').addEventListener('click', function(e) {
    const img = e.target;
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the image

    if (x < rect.width / 2) {
        previousImage();
    } else {
        nextImage();
    }
});