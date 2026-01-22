/* ═══════════════════════════════════════════════════════════════
   D1Z3 - THE DARK PHARMACY
   JavaScript - Interactive Elements
   "Her pikselde kusurlu mükemmelliği koruyun. 
    Temiz kod yazın, ama kirli hissettirin."
   ═══════════════════════════════════════════════════════════════ */

// ───────────────────────────────────────────────────────────────
// CONFIGURATION
// ───────────────────────────────────────────────────────────────
const CONFIG = {
    releaseDate: new Date('January 22, 2026 22:00:00 GMT+0300'),
    originalTitle: 'D1Z3 - İLAÇ',
    passiveTitle: '⚠️ TEDAVİNİZ YARIM KALDI...',
    bsodDuration: 3000, // 3 seconds
    ambientVolume: 0.05 // 5% volume
};

// ───────────────────────────────────────────────────────────────
// STATE
// ───────────────────────────────────────────────────────────────
let hasEnteredSite = false;
let countdownComplete = false;
let ambientAudio = null;

// ───────────────────────────────────────────────────────────────
// DOM READY
// ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initEntryModal();
    initCountdown();
    initTabTitleChange();
    initRevealAnimations();
    initButtonEffects();
});

// ═══════════════════════════════════════════════════════════════
// LOADER
// ═══════════════════════════════════════════════════════════════
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    // Typing effect for terminal text
    const terminalText = document.querySelector('.loader-terminal');
    if (terminalText) {
        typeText(terminalText, [
            '> SCANNING PATIENT...',
            '> emotional_status: CRITICAL',
            '> recommended_dose: 1x İLAÇ',
            '> LOADING PRESCRIPTION...'
        ], 50);
    }

    // Hide loader after entry modal is dismissed
    setTimeout(() => {
        if (hasEnteredSite) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 2000);
}

// ═══════════════════════════════════════════════════════════════
// ENTRY MODAL - "UYARI"
// ═══════════════════════════════════════════════════════════════
function initEntryModal() {
    const modal = document.getElementById('entry-modal');
    const enterBtn = document.getElementById('enter-btn');
    const loader = document.getElementById('loader');

    if (!modal || !enterBtn) {
        // If no modal, auto-enter
        hasEnteredSite = true;
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }, 2000);
        }
        return;
    }

    enterBtn.addEventListener('click', () => {
        // Play injection sound effect
        playInjectionSound();

        // Hide modal with glitch effect
        modal.style.animation = 'buttonGlitch 0.2s';
        setTimeout(() => {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                hasEnteredSite = true;

                // Start ambient audio
                initAmbientAudio();

                // Hide loader
                if (loader) {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.style.display = 'none', 500);
                }
            }, 300);
        }, 200);
    });
}

// ═══════════════════════════════════════════════════════════════
// COUNTDOWN TIMER
// ═══════════════════════════════════════════════════════════════
function initCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = CONFIG.releaseDate.getTime() - now;

        if (distance < 0 && !countdownComplete) {
            // Countdown reached zero! Trigger BSOD
            countdownComplete = true;
            triggerBSOD();
            return;
        }

        if (distance < 0) {
            // Already released
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ═══════════════════════════════════════════════════════════════
// BSOD - BLUE SCREEN OF DEATH
// ═══════════════════════════════════════════════════════════════
function triggerBSOD() {
    const bsodScreen = document.getElementById('bsod-screen');
    if (!bsodScreen) {
        // If no BSOD element, go directly to release
        redirectToRelease();
        return;
    }

    // Stop ambient audio
    if (ambientAudio) {
        ambientAudio.pause();
    }

    // Show BSOD
    bsodScreen.classList.add('active');

    // After 3 seconds, pixel sort and transition
    setTimeout(() => {
        bsodScreen.classList.add('bsod-pixelsort');

        // After pixel sort animation, redirect or show video
        setTimeout(() => {
            bsodScreen.style.display = 'none';
            redirectToRelease();
        }, 500);
    }, CONFIG.bsodDuration);
}

function redirectToRelease() {
    // Update hero content for release mode
    const statusTerminal = document.querySelector('.status-terminal');
    if (statusTerminal) {
        statusTerminal.innerHTML = '[STATUS: RELEASED // PRESCRIPTION_AVAILABLE]';
    }

    // Change button to "HEMEN DİNLE"
    const dozBtn = document.querySelector('.doz-btn');
    if (dozBtn) {
        dozBtn.textContent = '💉 HEMEN DİNLE';
        dozBtn.href = 'https://distrokid.com/hyperfollow/d1z3/ila';
    }

    // Hide countdown
    const countdown = document.getElementById('countdown');
    if (countdown) {
        countdown.style.display = 'none';
    }

    // Update release date text
    const releaseDate = document.querySelector('.release-date');
    if (releaseDate) {
        releaseDate.textContent = 'YAYINDA';
        releaseDate.style.color = 'var(--poison-green)';
    }
}

// ═══════════════════════════════════════════════════════════════
// TAB TITLE CHANGE
// ═══════════════════════════════════════════════════════════════
function initTabTitleChange() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = CONFIG.passiveTitle;
        } else {
            document.title = CONFIG.originalTitle;
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// AMBIENT AUDIO
// ═══════════════════════════════════════════════════════════════
function initAmbientAudio() {
    // Try to create and play ambient audio
    try {
        ambientAudio = new Audio('assets/audio/ambient.mp3');
        ambientAudio.loop = true;
        ambientAudio.volume = CONFIG.ambientVolume;

        // Play with user interaction already happened from modal click
        ambientAudio.play().catch(err => {
            console.log('Ambient audio blocked:', err);
        });
    } catch (err) {
        console.log('Ambient audio not available');
    }
}

// ═══════════════════════════════════════════════════════════════
// BUTTON EFFECTS
// ═══════════════════════════════════════════════════════════════
function initButtonEffects() {
    const dozBtn = document.querySelector('.doz-btn');

    if (dozBtn) {
        dozBtn.addEventListener('click', (e) => {
            playInjectionSound();
        });
    }
}

function playInjectionSound() {
    try {
        const audio = new Audio('assets/audio/injection.mp3');
        audio.volume = 0.3;
        audio.play().catch(err => console.log('Sound blocked'));
    } catch (err) {
        console.log('Injection sound not available');
    }
}

// ═══════════════════════════════════════════════════════════════
// TYPING EFFECT
// ═══════════════════════════════════════════════════════════════
function typeText(element, lines, speed = 50) {
    let lineIndex = 0;
    let charIndex = 0;
    let currentText = '';

    function type() {
        if (lineIndex < lines.length) {
            if (charIndex < lines[lineIndex].length) {
                currentText += lines[lineIndex].charAt(charIndex);
                element.innerHTML = currentText + '<span class="typing-cursor"></span>';
                charIndex++;
                setTimeout(type, speed);
            } else {
                currentText += '<br>';
                lineIndex++;
                charIndex = 0;
                setTimeout(type, speed * 5);
            }
        }
    }

    type();
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

            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on load
}

// ═══════════════════════════════════════════════════════════════
// GLITCH TEXT EFFECT (for status terminal)
// ═══════════════════════════════════════════════════════════════
function glitchText(element, text, iterations = 3) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&';
    let iteration = 0;

    const interval = setInterval(() => {
        element.innerText = text.split('')
            .map((char, index) => {
                if (index < iteration) {
                    return text[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iteration >= text.length) {
            clearInterval(interval);
        }

        iteration += 1 / iterations;
    }, 30);
}

// ═══════════════════════════════════════════════════════════════
// CONSOLE EASTER EGG
// ═══════════════════════════════════════════════════════════════
console.log('%c💊 D1Z3 - THE DARK PHARMACY',
    'font-size: 24px; color: #00F3FF; background: #030303; padding: 10px;');
console.log('%c"Zaman hemhal olmuş, ilaçta zehir de sensin."',
    'font-size: 14px; color: #39FF14; font-style: italic;');
console.log('%c⚠️ UYARI: Yan etkiler kalıcı olabilir.',
    'font-size: 12px; color: #ff6b6b;');
