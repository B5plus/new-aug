/*===== MENU SHOW/HIDE =====*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== CHANGE BACKGROUND HEADER =====*/
function scrollHeader(){
    const nav = document.getElementById('header');
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); 
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000,
    reset: true
});

sr.reveal(`.hero__data, .hero__img,
           .about-preview__content, .about-preview__img,
           .product-card,
           .manufacturing-preview__content, .manufacturing-preview__img,
           .cta__container,
           .footer__content`, {
    interval: 200
});

/*===== SMOOTH SCROLLING =====*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*===== NEWSLETTER FORM =====*/
const newsletterForm = document.querySelector('.footer__newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('.footer__newsletter-input').value;
        
        if (email) {
            // Here you would typically send the email to your backend
            alert('Thank you for subscribing to our newsletter!');
            this.querySelector('.footer__newsletter-input').value = '';
        }
    });
}

/*===== LOADING ANIMATION =====*/
window.addEventListener('load', function() {
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

/*===== BACK TO TOP BUTTON =====*/
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    background: linear-gradient(135deg, #e53e3e 0%, #dd6b20 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// Back to top functionality
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*===== INTERSECTION OBSERVER FOR ANIMATIONS =====*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .stat, .feature').forEach(el => {
    observer.observe(el);
});

/*===== LAZY LOADING IMAGES =====*/
const images = document.querySelectorAll('img[data-src]');
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            lazyImageObserver.unobserve(img);
        }
    });
});

images.forEach(img => lazyImageObserver.observe(img));

/*===== FORM VALIDATION =====*/
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        
        // Remove previous error styling
        input.classList.remove('error');
        
        if (!value) {
            input.classList.add('error');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(value)) {
            input.classList.add('error');
            isValid = false;
        }
    });
    
    return isValid;
}

/*===== MOBILE MENU ACCESSIBILITY =====*/
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
        }
    }
});

/*===== PRELOADER =====*/
const preloader = document.createElement('div');
preloader.className = 'preloader';
preloader.innerHTML = `
    <div class="preloader__spinner">
        <div class="preloader__circle"></div>
    </div>
`;
preloader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
`;

const spinnerCSS = `
    .preloader__spinner {
        width: 50px;
        height: 50px;
        position: relative;
    }
    .preloader__circle {
        width: 100%;
        height: 100%;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #e53e3e;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const style = document.createElement('style');
style.textContent = spinnerCSS;
document.head.appendChild(style);
document.body.appendChild(preloader);

// Hide preloader when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});

/*===== PERFORMANCE OPTIMIZATION =====*/
// Debounce function for scroll events
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

// Apply debounce to scroll events
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedScrollActive = debounce(scrollActive, 10);

window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollActive);
window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedScrollActive);

/*===== CONTACT FORM HANDLING =====*/
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm(this)) {
            // Simulate form submission
            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24 hours.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

/*===== FAQ FUNCTIONALITY =====*/
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach(faq => faq.classList.remove('active'));

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

/*===== JOB FILTERING =====*/
const filterBtns = document.querySelectorAll('.filter-btn');
const jobCards = document.querySelectorAll('.job-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        jobCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    });
});

/*===== JOB APPLICATION HANDLING =====*/
const jobApplyBtns = document.querySelectorAll('.job-apply-btn');
jobApplyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const jobCard = this.closest('.job-card');
        const jobTitle = jobCard.querySelector('.job-card__title').textContent;

        // Simulate job application process
        const confirmed = confirm(`Apply for ${jobTitle}?\n\nThis will redirect you to our application portal.`);
        if (confirmed) {
            // In a real application, this would redirect to an application form
            alert(`Thank you for your interest in the ${jobTitle} position! You will be redirected to our application portal.`);
        }
    });
});

/*===== SCROLL REVEAL FOR NEW ELEMENTS =====*/
if (typeof ScrollReveal !== 'undefined') {
    sr.reveal(`.manufacturing-overview__content, .manufacturing-overview__img,
               .production-line-card,
               .quality-control__content, .quality-control__img,
               .certification-item,
               .sustainability__content, .sustainability__img,
               .tech-feature,
               .benefit-card,
               .benefits-perks__content, .benefits-perks__img,
               .job-card,
               .process-step,
               .contact-card,
               .office-card,
               .faq-item`, {
        interval: 100
    });
}

/*===== ENHANCED FORM VALIDATION =====*/
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        const value = input.value.trim();

        // Remove previous error styling
        input.classList.remove('error');

        if (!value) {
            input.classList.add('error');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(value)) {
            input.classList.add('error');
            isValid = false;
        }
    });

    // Check privacy checkbox if exists
    const privacyCheckbox = form.querySelector('#privacy');
    if (privacyCheckbox && !privacyCheckbox.checked) {
        alert('Please accept the Privacy Policy to continue.');
        isValid = false;
    }

    return isValid;
}

/*===== ENHANCED SCROLL ANIMATIONS =====*/
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.product-card, .stat, .feature, .benefit-card, .job-card, .process-step');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
};

window.addEventListener('scroll', debounce(animateOnScroll, 50));

/*===== LANGUAGE TOGGLE (PLACEHOLDER) =====*/
const createLanguageToggle = () => {
    const langToggle = document.createElement('div');
    langToggle.className = 'language-toggle';
    langToggle.innerHTML = `
        <button class="lang-btn active" data-lang="en">EN</button>
        <button class="lang-btn" data-lang="fr">FR</button>
    `;

    langToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
        background: var(--white-color);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-md);
        padding: 0.5rem;
        z-index: var(--z-fixed);
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    `;

    document.body.appendChild(langToggle);

    const langBtns = langToggle.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.style.cssText = `
            padding: 0.5rem;
            border: none;
            background: transparent;
            cursor: pointer;
            border-radius: 3px;
            font-weight: var(--font-medium);
            transition: var(--transition);
        `;

        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // In a real application, this would trigger language change
            console.log(`Language changed to: ${btn.dataset.lang}`);
        });
    });

    // Style active button
    const style = document.createElement('style');
    style.textContent = `
        .lang-btn.active {
            background: var(--primary-color) !important;
            color: var(--white-color) !important;
        }
        .lang-btn:hover {
            background: var(--light-gray) !important;
        }
        .lang-btn.active:hover {
            background: var(--primary-red) !important;
        }
    `;
    document.head.appendChild(style);
};

// Initialize language toggle
createLanguageToggle();

/*===== IMAGE PLACEHOLDER HANDLING =====*/
const createPlaceholderImage = (width, height, text, bgColor = '#f7fafc', textColor = '#718096') => {
    const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="${bgColor}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="10,5"/>
            <text x="50%" y="50%" font-family="Inter, sans-serif" font-size="14" font-weight="500"
                  fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const createAfricureLogo = () => {
    const svg = `
        <svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#e53e3e"/>
                    <stop offset="20%" style="stop-color:#dd6b20"/>
                    <stop offset="40%" style="stop-color:#d69e2e"/>
                    <stop offset="60%" style="stop-color:#38a169"/>
                    <stop offset="80%" style="stop-color:#3182ce"/>
                    <stop offset="100%" style="stop-color:#805ad5"/>
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#logoGradient)" rx="8"/>
            <text x="50%" y="50%" font-family="Inter, sans-serif" font-size="18" font-weight="700"
                  fill="white" text-anchor="middle" dominant-baseline="middle">AFRICURE</text>
        </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Handle missing images
const handleMissingImages = () => {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('error', function() {
            const src = this.src;
            let placeholderSrc;

            // Determine placeholder based on image source
            if (src.includes('africure-logo')) {
                placeholderSrc = createAfricureLogo();
            } else if (src.includes('portrait')) {
                placeholderSrc = createPlaceholderImage(300, 300, 'Portrait Photo', '#f7fafc', '#718096');
            } else if (src.includes('product-')) {
                const productName = src.split('product-')[1].split('.')[0].replace('-', ' ');
                placeholderSrc = createPlaceholderImage(400, 300, productName.toUpperCase(), '#f7fafc', '#718096');
            } else if (src.includes('hero-')) {
                placeholderSrc = createPlaceholderImage(800, 500, 'PHARMACEUTICAL RESEARCH', '#e53e3e', '#ffffff');
            } else if (src.includes('manufacturing')) {
                placeholderSrc = createPlaceholderImage(800, 500, 'MANUFACTURING FACILITY', '#38a169', '#ffffff');
            } else if (src.includes('quality')) {
                placeholderSrc = createPlaceholderImage(800, 500, 'QUALITY CONTROL LAB', '#3182ce', '#ffffff');
            } else if (src.includes('team')) {
                placeholderSrc = createPlaceholderImage(800, 500, 'TEAM COLLABORATION', '#805ad5', '#ffffff');
            } else if (src.includes('about')) {
                placeholderSrc = createPlaceholderImage(800, 500, 'COMPANY FACILITIES', '#dd6b20', '#ffffff');
            } else if (src.includes('sustainable')) {
                placeholderSrc = createPlaceholderImage(800, 500, 'SUSTAINABLE PRACTICES', '#38a169', '#ffffff');
            } else {
                // Generic placeholder
                placeholderSrc = createPlaceholderImage(400, 300, 'IMAGE PLACEHOLDER', '#f7fafc', '#718096');
            }

            this.src = placeholderSrc;
            this.style.objectFit = 'cover';
        });

        // Trigger error event if image is already broken
        if (img.complete && img.naturalHeight === 0) {
            img.dispatchEvent(new Event('error'));
        }
    });
};

// Initialize image handling
handleMissingImages();

// Handle dynamically added images
const imageMutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
                const images = node.tagName === 'IMG' ? [node] : node.querySelectorAll('img');
                images.forEach(img => {
                    img.addEventListener('error', function() {
                        handleMissingImages();
                    });
                });
            }
        });
    });
});

imageMutationObserver.observe(document.body, { childList: true, subtree: true });
