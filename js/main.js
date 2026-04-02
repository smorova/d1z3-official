/* ═══════════════════════════════════════════════════════════════
   D1Z3 — OFFICIAL ARTIST SITE
   "Sentetik Dünyada Organik Bir Hata."
   ═══════════════════════════════════════════════════════════════ */

// ───────────────────────────────────────────────────────────────
// CONFIGURATION
// ───────────────────────────────────────────────────────────────
const CONFIG = {
    originalTitle: 'D1Z3 — OFFICIAL',
    passiveTitle: '— SİNYAL KESİLDİ —'
};

// ───────────────────────────────────────────────────────────────
// DOM READY
// ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initTabTitleChange();
    initRevealAnimations();
    initSmoothScroll();
});

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
console.log('%cD1Z3',
    'font-size: 28px; color: #FFFFFF; background: #000; padding: 10px; font-family: monospace; letter-spacing: 5px;');
console.log('%c"Sentetik Dünyada Organik Bir Hata"',
    'font-size: 14px; color: #808080; font-style: italic;');
console.log('%cAnalog Ruh, Dijital Beden.',
    'font-size: 12px; color: #FFFFFF;');

