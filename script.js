function scrollToContact() {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
}

// Optional: Add form submission feedback and handle same-origin/backend mismatch
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const button = this.querySelector('button[type="submit"]');
        if (!button) return;

        button.textContent = 'Sending...';
        button.disabled = true;

        const endpoint = '/.netlify/functions/send-email';

        const payload = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(() => {
            alert('Message sent successfully!');
            contactForm.reset();
        })
        .catch((error) => {
            console.error('Send failed:', error);
            alert('Failed to send message. Please try again later or check the function logs.');
        })
        .finally(() => {
            button.textContent = 'Send Message';
            button.disabled = false;
        });
    });
}