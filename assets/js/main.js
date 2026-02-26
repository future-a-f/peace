// =======================================
// MOBILE NAVIGATION TOGGLE
// =======================================
const toggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
    const isActive = navLinks.classList.toggle("active");
    toggle.setAttribute("aria-expanded", isActive);
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
    });
});

// Close menu when clicking outside (backdrop click)
document.addEventListener("click", (e) => {
    if (!e.target.closest(".menu-toggle") && !e.target.closest(".nav-links")) {
        navLinks.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
    }
});

// =======================================
// ACTIVE NAVIGATION INDICATOR
// =======================================
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

function setActiveNav() {
    let current = "";
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href").slice(1) === current) {
            item.classList.add("active");
        }
    });
}

window.addEventListener("scroll", setActiveNav);

// =======================================
// HEADER SCROLL SHADOW EFFECT
// =======================================
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// =======================================
// BACK TO TOP BUTTON
// =======================================
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// =======================================
// CERTIFICATE FILTERING & ENHANCED LIGHTBOX
// =======================================
const certFilters = document.querySelectorAll('.cert-filter');
const certCategories = document.querySelectorAll('.cert-category');
const lightbox = document.getElementById('cert-lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxMeta = document.getElementById('lightbox-meta');
const lightboxDescription = document.getElementById('lightbox-description');
const certs = document.querySelectorAll('.certificate-item img');

// =======================================
// CERTIFICATE ADVANCED FUNCTIONALITY
// =======================================
const certSearchInput = document.getElementById('cert-search-input');
const certSearchClear = document.getElementById('cert-search-clear');
const certSortSelect = document.getElementById('cert-sort-select');
const certCount = document.getElementById('cert-count');
const certItems = document.querySelectorAll('.certificate-item');

// Search functionality
certSearchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let visibleCount = 0;
    
    certItems.forEach(item => {
        const title = item.getAttribute('data-title').toLowerCase();
        const issuer = item.getAttribute('data-issuer').toLowerCase();
        const credentials = item.getAttribute('data-credentials').toLowerCase();
        
        const matchesSearch = title.includes(searchTerm) || 
                                issuer.includes(searchTerm) || 
                                credentials.includes(searchTerm);
        
        const matchesFilter = item.classList.contains('hidden') === false;
        
        if (matchesSearch && matchesFilter) {
            item.classList.remove('hidden');
            visibleCount++;
        } else {
            item.classList.add('hidden');
        }
    });
    
    updateCertificateCount(visibleCount);
    toggleClearButton(searchTerm.length > 0);
});

// Clear search functionality
certSearchClear.addEventListener('click', () => {
    certSearchInput.value = '';
    certSearchInput.dispatchEvent(new Event('input'));
});

// Sorting functionality
certSortSelect.addEventListener('change', (e) => {
    const sortBy = e.target.value;
    const activeCategory = document.querySelector('.cert-filter.active').getAttribute('data-category');
    const visibleItems = Array.from(certItems).filter(item => {
        return activeCategory === 'all' || item.getAttribute('data-category') === activeCategory;
    });
    
    visibleItems.sort((a, b) => {
        switch(sortBy) {
            case 'date-desc':
                return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
            case 'date-asc':
                return new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date'));
            case 'title':
                return a.getAttribute('data-title').localeCompare(b.getAttribute('data-title'));
            case 'issuer':
                return a.getAttribute('data-issuer').localeCompare(b.getAttribute('data-issuer'));
            default:
                return 0;
        }
    });
    
    // Reorder DOM elements
    const container = document.querySelector('.certificate-grid');
    visibleItems.forEach(item => container.appendChild(item));
});

// Helper functions
function updateCertificateCount(count) {
    certCount.textContent = count;
}

function toggleClearButton(show) {
    certSearchClear.style.display = show ? 'flex' : 'none';
}

// Certificate filtering functionality
certFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const category = filter.getAttribute('data-category');
        
        // Update active filter button
        certFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        // Show/hide certificate categories
        certCategories.forEach(cat => {
            if (category === 'all' || cat.getAttribute('data-category') === category) {
                cat.classList.remove('hidden');
            } else {
                cat.classList.add('hidden');
            }
        });
        
        // Trigger search to update count
        certSearchInput.dispatchEvent(new Event('input'));
    });
});

// Certificate protection helper
function protectImage(img) {
    // Disable right-click
    img.addEventListener('contextmenu', e => e.preventDefault());
    
    // Disable drag
    img.addEventListener('dragstart', e => e.preventDefault());
    
    // Disable text selection
    img.addEventListener('selectstart', e => e.preventDefault());
    
    // Disable mousedown (prevents some download methods)
    img.addEventListener('mousedown', e => {
        if (e.button === 2 || e.ctrlKey || e.metaKey) e.preventDefault();
    });
    
    // Disable keyboard shortcuts when image is focused
    img.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
        }
    });
}

// Apply protection to all certificate images
certs.forEach(protectImage);

// =======================================
// EMAILJS INITIALIZATION
// =======================================
(function() {
    emailjs.init("NOU7NpVXxzHGQ_mSX"); // Replace with actual EmailJS public key
})();

// =======================================
// CONTACT FORM FUNCTIONALITY
// =======================================
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formError = document.getElementById('form-error');
const submitButton = contactForm.querySelector('button[type="submit"]');
const btnText = submitButton.querySelector('.btn-text');
const btnLoading = submitButton.querySelector('.btn-loading');
const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('char-count');
const maxChars = 500;

// Character counter
messageTextarea.addEventListener('input', () => {
    const currentLength = messageTextarea.value.length;
    charCount.textContent = currentLength;
    
    // Update character count styling
    const charCountElement = charCount.parentElement;
    charCountElement.classList.remove('warning', 'error');
    
    if (currentLength > maxChars) {
        charCountElement.classList.add('error');
        messageTextarea.value = messageTextarea.value.substring(0, maxChars);
        charCount.textContent = maxChars;
    } else if (currentLength > maxChars * 0.9) {
        charCountElement.classList.add('warning');
    }
});

// Form validation
function validateForm(formData) {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
        errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (optional but if provided, must be valid)
    if (formData.phone && formData.phone.trim()) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
        if (!phoneRegex.test(formData.phone.trim())) {
            errors.phone = 'Please enter a valid phone number';
        }
    }
    
    // Subject validation
    if (!formData.subject) {
        errors.subject = 'Please select a subject';
    }
    
    // Message validation
    if (!formData.message.trim()) {
        errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > maxChars) {
        errors.message = `Message must be less than ${maxChars} characters`;
    }
    
    return errors;
}

// Display form errors
function displayErrors(errors) {
    // Clear all previous errors
    document.querySelectorAll('.form-error').forEach(errorEl => {
        errorEl.textContent = '';
    });
    document.querySelectorAll('.form-input').forEach(inputEl => {
        inputEl.classList.remove('error');
    });
    
    // Display new errors
    Object.keys(errors).forEach(field => {
        const errorEl = document.getElementById(`${field}-error`);
        const inputEl = document.getElementById(field);
        
        if (errorEl && inputEl) {
            errorEl.textContent = errors[field];
            inputEl.classList.add('error');
        }
    });
}

// Clear form errors
function clearErrors() {
    document.querySelectorAll('.form-error').forEach(errorEl => {
        errorEl.textContent = '';
    });
    document.querySelectorAll('.form-input').forEach(inputEl => {
        inputEl.classList.remove('error');
    });
}

// Reset form
function resetForm() {
    contactForm.reset();
    clearErrors();
    formSuccess.style.display = 'none';
    formError.style.display = 'none';
    charCount.textContent = '0';
    charCount.parentElement.classList.remove('warning', 'error');
}

// Show form message
function showMessage(type, messageElement) {
    // Hide both messages first
    formSuccess.style.display = 'none';
    formError.style.display = 'none';
    
    // Show the appropriate message
    messageElement.style.display = 'block';
    
    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide message after 10 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 10000);
}

// Handle form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        newsletter: document.getElementById('newsletter').checked,
        honeypot: document.getElementById('honeypot').value
    };
    
    // Validate form
    const errors = validateForm(formData);
    
    if (Object.keys(errors).length > 0) {
        displayErrors(errors);
        return;
    }
    
    // Check honeypot (spam protection)
    if (formData.honeypot) {
        // This is likely spam, show success but don't actually send
        showMessage('success', formSuccess);
        setTimeout(resetForm, 2000);
        return;
    }
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitButton.disabled = true;
    
    try {
        // Send email using EmailJS
        await emailjs.send("service_7dc4oml", "template_amvl5qc", {
            from_name: formData.name,
            from_email: formData.email,
            from_phone: formData.phone || "Not provided",
            from_company: formData.company || "Not provided",
            subject: document.getElementById('subject').options[document.getElementById('subject').selectedIndex].text,
            message: formData.message,
            newsletter: formData.newsletter ? "Yes" : "No",
            to_email: "peacemutuota@gmail.com"
        });
        
        // Show success message
        showMessage('success', formSuccess);
        
        // Track form submission for analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'contact',
                'event_label': formData.subject,
                'custom_parameter_1': formData.newsletter ? 'newsletter_yes' : 'newsletter_no'
            });
        }
        
        // Reset form after delay
        setTimeout(resetForm, 2000);
        
    } catch (error) {
        console.error('Form submission error:', error);
        showMessage('error', formError);
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitButton.disabled = false;
    }
});

// Real-time validation
document.getElementById('name').addEventListener('blur', (e) => {
    const value = e.target.value.trim();
    const errorEl = document.getElementById('name-error');
    
    if (!value) {
        errorEl.textContent = 'Name is required';
        e.target.classList.add('error');
    } else if (value.length < 2) {
        errorEl.textContent = 'Name must be at least 2 characters';
        e.target.classList.add('error');
    } else {
        errorEl.textContent = '';
        e.target.classList.remove('error');
    }
});

document.getElementById('email').addEventListener('blur', (e) => {
    const value = e.target.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorEl = document.getElementById('email-error');
    
    if (!value) {
        errorEl.textContent = 'Email is required';
        e.target.classList.add('error');
    } else if (!emailRegex.test(value)) {
        errorEl.textContent = 'Please enter a valid email address';
        e.target.classList.add('error');
    } else {
        errorEl.textContent = '';
        e.target.classList.remove('error');
    }
});

document.getElementById('phone').addEventListener('blur', (e) => {
    const value = e.target.value.trim();
    const errorEl = document.getElementById('phone-error');
    
    if (value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
        if (!phoneRegex.test(value)) {
            errorEl.textContent = 'Please enter a valid phone number';
            e.target.classList.add('error');
        } else {
            errorEl.textContent = '';
            e.target.classList.remove('error');
        }
    } else {
        errorEl.textContent = '';
        e.target.classList.remove('error');
    }
});

document.getElementById('message').addEventListener('blur', (e) => {
    const value = e.target.value.trim();
    const errorEl = document.getElementById('message-error');
    
    if (!value) {
        errorEl.textContent = 'Message is required';
        e.target.classList.add('error');
    } else if (value.length < 10) {
        errorEl.textContent = 'Message must be at least 10 characters';
        e.target.classList.add('error');
    } else if (value.length > maxChars) {
        errorEl.textContent = `Message must be less than ${maxChars} characters`;
        e.target.classList.add('error');
    } else {
        errorEl.textContent = '';
        e.target.classList.remove('error');
    }
});

// =======================================
// GLOBAL FUNCTIONS
// =======================================
// Make resetForm globally accessible for HTML onclick handlers
window.resetForm = resetForm;

// =======================================
// CERTIFICATE SHARING FUNCTIONALITY
// =======================================
const lightboxShare = document.getElementById('lightbox-share');

// Share functionality
lightboxShare.addEventListener('click', () => {
    const title = lightboxTitle.textContent;
    const meta = lightboxMeta.textContent;
    const description = lightboxDescription.textContent;
    
    if (navigator.share) {
        // Use native Web Share API if available
        navigator.share({
            title: `Certificate: ${title}`,
            text: `${meta}\n\n${description}`,
            url: window.location.href
        }).catch(err => {
            console.log('Share failed:', err);
            // Fallback to copying link if share fails
            copyShareLink(title);
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        copyShareLink(title);
    }
});

function copyShareLink(title) {
    const shareText = `Check out this certificate: ${title} - ${window.location.href}#certificates`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            // Show success feedback
            showShareFeedback('Link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            showShareFeedback('Failed to copy link');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showShareFeedback('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
            showShareFeedback('Failed to copy link');
        }
        
        document.body.removeChild(textArea);
    }
}

function showShareFeedback(message) {
    // Create temporary feedback element
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--gradient);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 3000;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    // Remove feedback after 3 seconds
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 3000);
}

// =======================================
// CERTIFICATE NAVIGATION FUNCTIONALITY
// =======================================
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxCounter = document.getElementById('lightbox-counter');
let currentCertificateIndex = 0;
let visibleCertificates = [];

// Update visible certificates array
function updateVisibleCertificates() {
    visibleCertificates = Array.from(certItems).filter(item => {
        return !item.classList.contains('hidden');
    });
}

// Navigate to previous certificate
function navigatePrevious() {
    if (visibleCertificates.length <= 1) return;
    
    currentCertificateIndex = (currentCertificateIndex - 1 + visibleCertificates.length) % visibleCertificates.length;
    showCertificate(currentCertificateIndex);
}

// Navigate to next certificate
function navigateNext() {
    if (visibleCertificates.length <= 1) return;
    
    currentCertificateIndex = (currentCertificateIndex + 1) % visibleCertificates.length;
    showCertificate(currentCertificateIndex);
}

// Show certificate by index
function showCertificate(index) {
    const item = visibleCertificates[index];
    if (!item) return;
    
    const src = item.getAttribute('data-full');
    const title = item.getAttribute('data-title');
    const issuer = item.getAttribute('data-issuer');
    const date = item.getAttribute('data-date');
    const credentials = item.getAttribute('data-credentials');
    
    // Update lightbox content
    lightboxContent.style.backgroundImage = `url('${src}')`;
    lightboxTitle.textContent = title;
    lightboxMeta.textContent = `${issuer} • ${date}`;
    lightboxDescription.textContent = credentials;
    lightboxCounter.textContent = `${index + 1} / ${visibleCertificates.length}`;
    
    currentCertificateIndex = index;
}

// Navigation event listeners
lightboxPrev.addEventListener('click', navigatePrevious);
lightboxNext.addEventListener('click', navigateNext);

// Enhanced lightbox functionality
document.querySelectorAll('.certificate-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        // Update visible certificates array
        updateVisibleCertificates();
        
        // Find current index in visible certificates
        currentCertificateIndex = visibleCertificates.indexOf(item);
        
        // Show certificate
        showCertificate(currentCertificateIndex);
        
        // Show lightbox
        lightbox.setAttribute('aria-hidden', 'false');
        lightbox.classList.add('active');
        
        // Prevent scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxContent.style.backgroundImage = '';
    lightboxTitle.textContent = '';
    lightboxMeta.textContent = '';
    lightboxDescription.textContent = '';
    
    // Restore scrolling
    document.body.style.overflow = '';
}

// Lightbox event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    // Close mobile menu on ESC key
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
    }
    
    // Certificate lightbox keyboard navigation
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigatePrevious();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            navigateNext();
        }
    }
});

// Prevent image download from lightbox content
lightboxContent.addEventListener('contextmenu', e => e.preventDefault());
lightboxContent.addEventListener('dragstart', e => e.preventDefault());

// =======================================
// SCROLL REVEAL ANIMATION
// =======================================
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Initial check on page load

// =======================================
// SMOOTH SCROLL OFFSET FOR FIXED HEADER
// =======================================
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#" || !document.querySelector(href)) return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        const offsetTop = target.offsetTop - 80; // Offset for fixed header
        
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });
    });
});

// =======================================
// PAGE LOAD ANIMATION
// =======================================
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

// =======================================
// LAZY LOADING IMAGES
// =======================================
if ("IntersectionObserver" in window) {
    const images = document.querySelectorAll("img[loading='lazy']");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Image already has src attribute, just ensure it loads
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: "50px"
    });
    
    images.forEach(img => imageObserver.observe(img));
}