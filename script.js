function scrollToContact() {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const button = this.querySelector('button[type="submit"]');
        if (!button) return;

        button.textContent = 'Sending...';
        button.disabled = true;

        const formData = new FormData(contactForm);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            alert('Message sent successfully! We will get back to you soon.');
            contactForm.reset();
        })
        .catch((error) => {
            console.error('Send failed:', error);
            alert('Failed to send message. Please try again later.');
        })
        .finally(() => {
            button.textContent = 'Send Message';
            button.disabled = false;
        });
    });
}
