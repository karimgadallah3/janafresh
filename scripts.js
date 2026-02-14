// Advanced JavaScript Animations and Interactions for Jana Fresh Website

// ==================== PAGE LOADER & SCROLL RESTORATION ====================
// Force scroll to top on reload
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    window.scrollTo(0, 0);

    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 300); // Reduced from 500ms to 300ms for faster perceived loading
    }
});

// ==================== OPTIMIZED SCROLL HANDLER ====================
let scrollTicking = false;
let lastScrollY = 0;

// Cache DOM elements to avoid re-querying on every scroll
const scrollProgress = document.querySelector('.scroll-progress');
const header = document.querySelector('header');

function onScroll() {
    lastScrollY = window.scrollY;
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            updateScrollEffects(lastScrollY);
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

function updateScrollEffects(scrollY) {
    // 1. Scroll Progress Bar
    if (scrollProgress) {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (scrollY / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }

    // 2. Header Scroll Effect
    if (header) {
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header logic (simplified for performance)
        // Only checking significant changes to avoid jitter
        if (Math.abs(scrollY - lastScroll) > 10) {
            if (scrollY > lastScroll && scrollY > 500) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScroll = scrollY;
        }
    }

    // 3. Back to Top Button
    if (backToTopBtn) {
        if (scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    }
}

// Initialize variables
let lastScroll = 0;

// ==================== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1, // Trigger as soon as 10% is visible
    rootMargin: '0px 0px -10px 0px' // Trigger almost immediately when entering viewport
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .rotate-in, .image-reveal');
    animatedElements.forEach(el => observer.observe(el));

    // Observe stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(el => observer.observe(el));
});

// ==================== COUNTER ANIMATION ====================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// ==================== PARALLAX EFFECT ====================
// JS Parallax removed for performance. Using CSS background-attachment: fixed instead.

// ==================== MOBILE MENU TOGGLE ====================
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.querySelector('.mobile-menu-icon');

    if (mobileMenu) {
        mobileMenu.classList.toggle('active');

        // Animate hamburger icon
        if (menuIcon) {
            menuIcon.classList.toggle('active');
        }
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.querySelector('.mobile-menu-btn');

    if (mobileMenu && menuButton) {
        if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    }
});

// ==================== SMOOTH SCROLL TO SECTION ====================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 100;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
}

// ==================== LANGUAGE SWITCHER ====================
const translations = {
    en: {
        'home': 'Home',
        'about': 'About Us',
        'products': 'Products',
        'quality': 'Quality Management',
        'certificates': 'Certificates',
        'contact': 'Contact Us',
        'view-all': 'View All Products',
        'contact-btn': 'Contact Us for Orders',
        'learn-more': 'Learn More',
        'our-mission': 'Our Mission',
        'our-vision': 'Our Vision',
        'back-products': 'Back to Products',
        'copyright': '© 2025 Jana Fresh. All rights reserved.'
    },
    ar: {
        'home': 'المنزل',
        'about': 'من نحن',
        'products': 'المنتجات',
        'quality': 'إدارة الجودة',
        'certificates': 'شهادات الاعتماد',
        'contact': 'تواصل معنا',
        'view-all': 'عرض جميع المنتجات',
        'contact-btn': 'تواصل معنا للطلبات',
        'learn-more': 'اعرف المزيد',
        'our-mission': 'مهمتنا',
        'our-vision': 'رؤيتنا',
        'back-products': 'العودة للمنتجات',
        'copyright': '© 2025 جني فريش. جميع الحقوق محفوظة.'
    },
    fr: {
        'home': 'Accueil',
        'about': 'À Propos',
        'products': 'Produits',
        'quality': 'Gestion Qualité',
        'certificates': 'Certificats',
        'contact': 'Contactez-Nous',
        'view-all': 'Voir Tous les Produits',
        'contact-btn': 'Contactez-nous pour les Commandes',
        'learn-more': 'En Savoir Plus',
        'our-mission': 'Notre Mission',
        'our-vision': 'Notre Vision',
        'back-products': 'Retour aux Produits',
        'copyright': '© 2025 Jana Fresh. Tous droits réservés.'
    },
    zh: {
        'home': '主页',
        'about': '关于我们',
        'products': '产品',
        'quality': '质量管理',
        'certificates': '证书',
        'contact': '联系我们',
        'view-all': '查看所有产品',
        'contact-btn': '联系我们订购',
        'learn-more': '了解更多',
        'our-mission': '我们的使命',
        'our-vision': '我们的愿景',
        'back-products': '返回产品',
        'copyright': '© 2025 Jana Fresh。保留所有权利。'
    }
};

function changeLanguage(lang) {
    // Close dropdown immediately
    const dropdownMenu = document.querySelector('.language-menu');
    if (dropdownMenu) {
        dropdownMenu.style.visibility = 'hidden'; // Force hide
        setTimeout(() => {
            dropdownMenu.style.visibility = ''; // Restore after a brief moment
        }, 300); // Enough time for mouse to leave or transition to finish
    }
    if (document.activeElement) {
        document.activeElement.blur();
    }

    // Force LTR for all languages as requested
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', lang);

    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });

    // Update common translations (fallback/legacy)
    updateCommonTranslations(lang);

    // Save language preference
    localStorage.setItem('preferredLanguage', lang);

    // Add animation to language change
    document.body.style.opacity = '0.7';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
}

function updateCommonTranslations(lang) {
    const commonElements = {
        'home-link': translations[lang]['home'],
        'about-link': translations[lang]['about'],
        'products-link': translations[lang]['products'],
        'quality-link': translations[lang]['quality'],
        'certificates-link': translations[lang]['certificates'],
        'contact-link': translations[lang]['contact']
    };

    Object.keys(commonElements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = commonElements[id];
        }
    });
}

// Load saved language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(savedLang);

    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Initialize AOS-like animations
    initScrollAnimations();
});

// ==================== INITIALIZE SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    // Global index-based delay removed to ensure elements appear immediately upon scrolling.
    // Animation timing is now handled by CSS and IntersectionObserver.
}

// ==================== PRODUCT CARD INTERACTIONS ====================
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Add floating badge
            const badge = card.querySelector('.product-badge');
            if (badge) {
                badge.style.transform = 'translateX(0)';
            }
        });

        card.addEventListener('mouseleave', (e) => {
            const badge = card.querySelector('.product-badge');
            if (badge) {
                badge.style.transform = 'translateX(150%)';
            }
        });
    });
});

// ==================== CERTIFICATE CARD CLICK ====================
function openCertificate(certType) {
    const certificateLinks = {
        'brc': 'https://drive.google.com/file/d/15s37rkAIm6_j2oon0Nb1VvX9Z6V3VKrg/view?usp=sharing',
        'iso': 'https://drive.google.com/file/d/13UVAYzXqkvXNnY6moajiZux6pgg_V2x7/view?usp=sharing',
        'sedex-packhouse': 'https://drive.google.com/file/d/1CFgCZNsBHDM3WR_23pz447xmEaGlVJSr/view?usp=sharing',
        'sedex-farms': 'https://drive.google.com/file/d/1z6XR9cNz6wkvDUK-QKZszokmwjqlBAS6/view?usp=sharing',
        'globalgap': 'https://drive.google.com/file/d/1maRtiFoSyBEWjDa9ZZtvERtprx6zgI8n/view?usp=sharing',
        'grasp': 'https://drive.google.com/file/d/110tgMp3bESnetmdsbFIY244G4195wI_j/view?usp=sharing'
    };

    if (certificateLinks[certType]) {
        // Add click animation
        const card = event.target.closest('.certificate-card');
        if (card) {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
                window.open(certificateLinks[certType], '_blank');
            }, 150);
        }
    }
}

// ==================== FORM VALIDATION ====================
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
            input.style.animation = 'shake 0.5s';
        } else {
            input.style.borderColor = '#22c55e';
        }
    });

    return isValid;
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ==================== IMAGE LAZY LOADING ====================
// ==================== IMAGE LAZY LOADING ====================
// Native lazy loading is used in HTML (loading="lazy")
// This section is kept for any future custom handling if needed, but currently empty to avoid conflict.

// ==================== CUSTOM CURSOR (REMOVED) ====================
// Custom cursor logic has been removed as per user request.

// ==================== NAVIGATION TO PRODUCT DETAIL ====================
function goToProduct(productId) {
    // Add page transition
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
        window.location.href = `product-detail.html?product=${productId}`;
    }, 150);
}

// ==================== BACK TO TOP BUTTON ====================
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
`;

document.body.appendChild(backToTopBtn);

// Scroll listener for backToTopBtn is now in updateScrollEffects

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'translateY(0) scale(1)';
});

// ==================== PAGE TRANSITION ====================
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add page transition for links
document.querySelectorAll('a:not([target="_blank"])').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const href = link.getAttribute('href');

            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = href;
            }, 150);
        }
    });
});

// ==================== CONTACT FORM SUBMISSION (EmailJS) ====================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Basic validation
        if (!validateForm('contact-form')) {
            // Show alert for validation error (helpful on mobile)
            Swal.fire({
                title: 'Missing Information',
                text: 'Please fill in all required fields.',
                icon: 'warning',
                confirmButtonColor: '#f59e0b'
            });
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Prepare template parameters
        // IMPORTANT: These IDs must match your EmailJS Service ID and Template ID
        const serviceID = 'service_tt00x5a';
        const templateID = 'template_yg4xuk8';

        // Use e.target to ensure we get the form element
        emailjs.sendForm(serviceID, templateID, e.target)
            .then(() => {
                // Success
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                submitBtn.classList.add('bg-green-500');

                Swal.fire({
                    title: 'Success!',
                    text: 'Your message has been sent successfully. We will get back to you soon!',
                    icon: 'success',
                    confirmButtonColor: '#16a34a'
                });

                contactForm.reset();

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                    submitBtn.classList.remove('bg-green-500');
                }, 3000);
            }, (err) => {
                // Error
                console.error('EmailJS Error:', err);
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                // Show detailed error for debugging
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to send message. ' + (err.text || err.message || 'Unknown error'),
                    icon: 'error',
                    confirmButtonColor: '#dc2626'
                });
            });
    });
}

// Initialize contact form
// Initialize contact form and hero slider
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initHeroSlider();
});

// ==================== HERO SLIDESHOW ====================
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const defaultInterval = 5000; // 5 seconds for images
    let slideTimer;

    function activateSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });

        // Activate new slide
        const slide = slides[index];
        slide.classList.add('active');

        // Check content type
        const video = slide.querySelector('video');
        if (video) {
            // It's a video
            video.loop = false; // Ensure loop is off so 'ended' event fires
            video.muted = true; // Ensure muted for autoplay
            video.playsInline = true; // Critical for mobile

            // Safety timer in case video fails to load or play
            // Set to video duration if available, else default + buffer
            const safetyDuration = (video.duration && !isNaN(video.duration)) ? (video.duration * 1000) + 1000 : 10000;

            slideTimer = setTimeout(() => {
                console.warn("Video slide timed out or stuck, forcing next slide.");
                nextSlide();
            }, safetyDuration);

            // Play video
            const playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Video playback started
                    // Clear safety timer if we want to rely strictly on 'ended', 
                    // but keeping it as a backup is safer for web hosting issues.
                    // We can update it to the exact duration now that metadata might be loaded
                    clearTimeout(slideTimer);
                    const exactDuration = (video.duration * 1000) + 500; // +500ms buffer
                    slideTimer = setTimeout(nextSlide, exactDuration);
                })
                    .catch(error => {
                        console.error("Video play error:", error);
                        // If video fails to play (e.g. policy), wait default time then next
                        clearTimeout(slideTimer);
                        slideTimer = setTimeout(nextSlide, defaultInterval);
                    });
            }

            video.onended = () => {
                clearTimeout(slideTimer); // Clear the safety timer
                nextSlide();
            };
        } else {
            // It's an image
            slideTimer = setTimeout(nextSlide, defaultInterval);
        }
    }

    function nextSlide() {
        clearTimeout(slideTimer);
        currentSlide = (currentSlide + 1) % slides.length;
        activateSlide(currentSlide);
    }

    function prevSlide() {
        clearTimeout(slideTimer);
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        activateSlide(currentSlide);
    }

    // Event Listeners for Buttons
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Start the slideshow
    activateSlide(0);
}

// ==================== CONSOLE MESSAGE ====================
console.log('%c🌟 Jana Fresh Website 🌟', 'color: #22c55e; font-size: 24px; font-weight: bold;');
console.log('%cDeveloped with ❤️ for Agricultural Excellence', 'color: #10b981; font-size: 14px;');
