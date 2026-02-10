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
});

// --- 2. EMAIL UTILITIES ---
function copyToClipboard(text, elementSelector, cssClass = 'copied') {
    navigator.clipboard.writeText(text).then(() => {
        const el = document.querySelector(elementSelector);
        if (el) {
            el.classList.add(cssClass);
            setTimeout(() => el.classList.remove(cssClass), 2000);
        }
    });
}

function copyEmail() { copyToClipboard('yourornob@gmail.com', '.email-wrapper'); }
function copyFooterEmail() { copyToClipboard('yourornob@gmail.com', '.footer-contact-item'); }

