function scrollToContact() {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
}

// Form submission feedback
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        const button = this.querySelector('button[type="submit"]');
        if (button) {
            button.textContent = 'Sending...';
            button.disabled = true;
        }
    });
}