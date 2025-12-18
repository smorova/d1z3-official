document.addEventListener("DOMContentLoaded", () => {

    // --- Preloader Logic ---
    const loader = document.getElementById('loader');

    // Simulate loading time (or wait for window load)
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000); // 2 seconds fake load

    // --- Glitch Effect Trigger ---
    // Randomly trigger strong glitch animation on the main title
    const mainTitle = document.querySelector('.main-title');

    setInterval(() => {
        if (Math.random() > 0.9) { // 10% chance every check
            mainTitle.style.textShadow = '2px 0 red, -2px 0 blue';
            setTimeout(() => {
                mainTitle.style.textShadow = '0 0 20px var(--neon-orange)';
            }, 100);
        }
    }, 500);

    // --- Smooth Scroll Highlight ---
    // Highlight nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.style.color = 'var(--neon-blue)';
            } else {
                a.style.color = '#fff';
            }
        });
    });

    console.log("D1Z3 System Online. Signal Established.");
});
