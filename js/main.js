/* ═══════════════════════════════════════════════════════════════
   D1Z3 — KUM SAATİ — SURREAL ANALOG NOIR V2
   "Zaman akıp giderken avuçlarımdan sessiz."
   ═══════════════════════════════════════════════════════════════ */

// ───────────────────────────────────────────────────────────────
// CONFIGURATION
// ───────────────────────────────────────────────────────────────
const CONFIG = {
    originalTitle: 'D1Z3 — KUM SAATİ',
    passiveTitle: '⏳ ZAMAN AKIYOR...',
    sandParticleCount: 60
};

// ───────────────────────────────────────────────────────────────
// DOM READY
// ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initTabTitleChange();
    initRevealAnimations();
    initSandParticles();
    initSmoothScroll();
});

// ═══════════════════════════════════════════════════════════════
// SAND PARTICLES — Falling gold dust (prominent)
// ═══════════════════════════════════════════════════════════════
function initSandParticles() {
    const container = document.getElementById('sand-particles');
    if (!container) return;

    for (let i = 0; i < CONFIG.sandParticleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('sand-particle');

        const left = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 12;
        const opacity = Math.random() * 0.55 + 0.25;

        particle.style.cssText = `
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --particle-opacity: ${opacity};
        `;

        container.appendChild(particle);
    }
}

// ═══════════════════════════════════════════════════════════════
// TAB TITLE CHANGE
// ═══════════════════════════════════════════════════════════════
function initTabTitleChange() {
    document.addEventListener('visibilitychange', () => {
        document.title = document.hidden ? CONFIG.passiveTitle : CONFIG.originalTitle;
    });
}

// ═══════════════════════════════════════════════════════════════
// SMOOTH SCROLL for nav links
// ═══════════════════════════════════════════════════════════════
function initSmoothScroll() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════
// REVEAL ANIMATIONS
// ═══════════════════════════════════════════════════════════════
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');

    function checkReveal() {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 80) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    // Check immediately in case elements are already in viewport
    checkReveal();
}

// ═══════════════════════════════════════════════════════════════
// CONSOLE EASTER EGG
// ═══════════════════════════════════════════════════════════════
console.log('%c⏳ D1Z3 — KUM SAATİ',
    'font-size: 24px; color: #C5A059; background: #000; padding: 10px; font-family: serif;');
console.log('%c"Zaman akıp giderken avuçlarımdan sessiz."',
    'font-size: 14px; color: #8B7355; font-style: italic;');
console.log('%c⚠️ Sentetik bir dünyanın organik kusuruyum.',
    'font-size: 12px; color: #C5A059;');
