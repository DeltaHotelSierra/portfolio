// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Gradual blur effect on scroll
    const sections = document.querySelectorAll(
        ".about-section, .projects-section, .contact-section"
    );
    const navbar = document.querySelector(".navbar");
    const header = document.querySelector("header");

    const observerOptions = {
        threshold: 0.3,
        rootMargin: "0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            } else {
                entry.target.classList.remove("in-view");
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Decrypted Text Animation for header info
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    
    function decryptText(element) {
        const text = element.getAttribute('data-text');
        if (!text) return;
        
        let iterations = 0;
        const speed = 26;
        
        const interval = setInterval(() => {
            element.textContent = text
                .split('')
                .map((char, index) => {
                    if (char === ' ' || char === ':') return char;
                    if (index < iterations) {
                        return text[index];
                    }
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join('');
            
            iterations += 0.38;
            
            if (iterations >= text.length) {
                clearInterval(interval);
                element.textContent = text;
            }
        }, speed);
    }
    
    // Apply decrypted effect to header info items
    const decryptElements = document.querySelectorAll('.decrypt-text');
    decryptElements.forEach((element, index) => {
        element.setAttribute('data-text', element.textContent);
        // Stagger the animations
        setTimeout(() => {
            decryptText(element);
        }, index * 300);
    });
});
