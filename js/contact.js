// --- 1. ROTATING TEXT (TAGLINE) ---
document.addEventListener('DOMContentLoaded', () => {
    const taglineElement = document.querySelector('.dynamic-text');
    if (taglineElement) {
        const roles = ["Cyber Security Expert", "CSE Student @ DIU", "AI & NLP Researcher", "Full-Stack Developer"];
        let roleIndex = 0;
        setInterval(() => {
            taglineElement.style.opacity = 0;
            setTimeout(() => {
                roleIndex = (roleIndex + 1) % roles.length;
                taglineElement.textContent = roles[roleIndex];
                taglineElement.style.opacity = 1;
            }, 500);
        }, 3000);
    }

    // Hero Fade-In
    const heroElements = document.querySelectorAll('.hero-content, .hero-visual');
    heroElements.forEach((el, index) => {
        setTimeout(() => { el.classList.add('visible'); }, 200 * index);
    });
});

// --- 2. CONTACT UTILITIES ---
function copyContactEmail(element) {
    const emailText = document.getElementById('contact-email-val').innerText;
    navigator.clipboard.writeText(emailText).then(() => {
        element.classList.add('copied');
        setTimeout(() => { element.classList.remove('copied'); }, 2000);
    });
}

// --- 3. FORM SUBMISSION ---
function setFormFeedback(feedback, message, cssClass) {
    feedback.innerHTML = message;
    feedback.className = `form-feedback ${cssClass}`;
    feedback.style.display = 'block';
}

async function submitContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const btn = document.getElementById('form-submit-btn');
    const feedback = document.getElementById('form-feedback');
    const btnText = btn.querySelector('span');

    btn.disabled = true;
    btnText.innerText = 'Sending...';
    feedback.style.display = 'none';
    feedback.className = 'form-feedback';

    const formData = new FormData(form);
    const now = new Date();
    formData.append('_subject', `Portfolio Message from ${formData.get('name')} [${now.toLocaleString()}]`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch('https://formsubmit.co/ajax/contact@kawshik.dev', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' },
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        setFormFeedback(feedback, '<i class="ri-checkbox-circle-fill"></i> Message sent successfully!', 'success');
        form.reset();
    } catch (error) {
        const errorMessage = error.name === 'AbortError'
            ? '<i class="ri-error-warning-fill"></i> Request timed out. Please try again.'
            : '<i class="ri-error-warning-fill"></i> Failed to send. Please check your internet connection.';
        console.error('Submission Error:', error);
        setFormFeedback(feedback, errorMessage, 'error');
    } finally {
        clearTimeout(timeout);
        btn.disabled = false;
        btnText.innerText = 'Send Message';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('portfolio-contact-form');
    if (form) {
        form.addEventListener('submit', submitContactForm);
    }
});