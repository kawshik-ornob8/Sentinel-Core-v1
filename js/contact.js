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
async function handleFormSubmission(event) {
    event.preventDefault();
    const form = event.target;
    const btn = document.getElementById('form-submit-btn');
    const feedback = document.getElementById('form-feedback');
    const btnText = btn.querySelector('span');

    btn.disabled = true;
    btnText.innerText = "Sending...";
    feedback.style.display = "none";

    const formData = new FormData(form);
    const now = new Date();
    formData.append('_subject', `Portfolio Message from ${formData.get('name')} [${now.toLocaleString()}]`);

    try {
        // We use the 'yourornob+contact@gmail.com' alias to ensure it bypasses old domain locks
        const response = await fetch("https://formsubmit.co/ajax/yourornob+contact@gmail.com", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            feedback.innerHTML = '<i class="ri-checkbox-circle-fill"></i> Message sent successfully!';
            feedback.className = "form-feedback success";
            feedback.style.display = "block";
            form.reset();
        } else { throw new Error(); }
    } catch (error) {
        feedback.innerHTML = '<i class="ri-error-warning-fill"></i> Oops! Something went wrong.';
        feedback.className = "form-feedback error";
        feedback.style.display = "block";
    } finally {
        btn.disabled = false;
        btnText.innerText = "Send Message";
    }
}