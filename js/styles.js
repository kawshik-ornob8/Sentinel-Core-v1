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

    // Reveal all fade-up elements
    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach((el, index) => {
        setTimeout(() => { el.classList.add('visible'); }, 100 * index);
    });

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = localStorage.getItem('theme') || 'light';

    const applyTheme = (theme) => {
        document.body.classList.toggle('light-mode', theme === 'light');
        document.body.classList.toggle('dark-mode', theme === 'dark');
        themeIcon.classList.toggle('ri-sun-line', theme === 'light');
        themeIcon.classList.toggle('ri-moon-line', theme === 'dark');
        localStorage.setItem('theme', theme);
    };

    applyTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
            applyTheme(nextTheme);
        });
    }

    const decodeString = (encoded) => atob(encoded);
    const checkDeveloperFooterLink = () => {
        const devLink = document.getElementById('dev-link');
        const officialHref = decodeString('aHR0cHM6Ly9rYXdzaGlrLmFpby5iZA==');
        const redirectHref = officialHref;

        if (!devLink || devLink.getAttribute('href') !== officialHref) {
            window.location.href = redirectHref;
        }
    };

    checkDeveloperFooterLink();
    setInterval(checkDeveloperFooterLink, 3000);
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

function copyEmail() { copyToClipboard('contact@kawshik.dev', '.email-wrapper'); }
function copyFooterEmail() { copyToClipboard('contact@kawshik.dev', '.footer-contact-item'); }

