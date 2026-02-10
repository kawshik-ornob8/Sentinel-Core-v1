document.addEventListener('DOMContentLoaded', () => {
    // --- ROTATING TEXT (TAGLINE) ---
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