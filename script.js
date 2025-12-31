// NEW YEAR 2026 - INTERACTIVE FUNCTIONALITY

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initFireworks();
    initPersonalization();
    initMusicToggle();
    initShareButtons();
    initScrollAnimations();
    initAccessibility();
});

// COUNTDOWN TIMER
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    const celebrationElement = document.getElementById('celebration-message');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    const targetDate = new Date('2026-01-01T00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownElement.classList.add('hidden');
            celebrationElement.classList.remove('hidden');
            triggerCelebration();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updateTimeBox(daysElement, days);
        updateTimeBox(hoursElement, hours);
        updateTimeBox(minutesElement, minutes);
        updateTimeBox(secondsElement, seconds);
    }

    function updateTimeBox(element, value) {
        const formattedValue = String(value).padStart(2, '0');
        if (element.textContent !== formattedValue) {
            element.style.transform = 'scale(1.2)';
            element.textContent = formattedValue;
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// FIREWORKS ANIMATION - FIXED TO NOT LEAVE RESIDUE
function initFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.015;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.velocity.x *= 0.98;
            this.velocity.y *= 0.98;
            this.velocity.y += 0.2;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
        }
    }

    let particles = [];
    const colors = ['#FFD700', '#FFA500', '#FFE55C', '#FF6B6B', '#4ECDC4', '#95E1D3'];

    function createFirework(x, y) {
        const particleCount = 50;
        const color = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    function animate() {
        // Clear canvas completely to avoid residue
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update();
                particle.draw();
            }
        });

        requestAnimationFrame(animate);
    }

    animate();

    function randomFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5;
        createFirework(x, y);

        const nextDelay = Math.random() * 2000 + 3000;
        setTimeout(randomFirework, nextDelay);
    }

    setTimeout(randomFirework, 2000);

    canvas.addEventListener('click', (e) => {
        createFirework(e.clientX, e.clientY);
    });
}

// CELEBRATION TRIGGER
function triggerCelebration() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#FFD700', '#FFA500', '#FFE55C', '#FF6B6B', '#4ECDC4']
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#FFD700', '#FFA500', '#FFE55C', '#FF6B6B', '#4ECDC4']
        });
    }, 250);
}

// PERSONALIZATION - NO NAME REQUIRED
function initPersonalization() {
    const greetBtn = document.getElementById('greet-btn');
    const personalMsg = document.getElementById('personal-message');

    greetBtn.addEventListener('click', () => {
        // Generic wishes without names
        const messages = [
            'May 2026 bring boundless joy, incredible adventures, and dreams that soar higher than the stars! ✨',
            'May this New Year paint your life with vibrant colors of happiness, success, and love! 🎨',
            'Embrace 2026 with open arms! May every moment sparkle with opportunity and every day overflow with blessings! 🌟',
            'May 2026 be your masterpiece – filled with laughter, growth, and unforgettable memories! 🎉',
            'Step into 2026 with confidence! May your path be illuminated with prosperity, health, and endless possibilities! 💫',
            'Wishing you a year filled with magical moments, beautiful surprises, and countless reasons to smile! 🌈',
            'May 2026 bring you closer to your dreams and fill your heart with peace, love, and contentment! 💖',
            'Here is to new beginnings, fresh opportunities, and a year of unlimited potential! 🚀',
            'May every sunrise bring hope, every sunset bring peace, and every moment bring happiness in 2026! 🌅',
            'Wishing you twelve months of success, 52 weeks of laughter, 365 days of joy, and endless moments of love! 🎊'
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        personalMsg.textContent = randomMessage;
        personalMsg.classList.remove('hidden');

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500', '#FFE55C']
        });

        setTimeout(() => {
            personalMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    });
}

// MUSIC TOGGLE WITH TOOLTIP
function initMusicToggle() {
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = musicBtn.querySelector('.music-icon');
    const muteIcon = musicBtn.querySelector('.mute-icon');
    const tooltip = document.getElementById('music-tooltip');

    let isPlaying = false;

    // Auto-hide tooltip after 5 seconds
    setTimeout(() => {
        if (tooltip && !isPlaying) {
            tooltip.classList.add('hidden');
        }
    }, 5000);

    musicBtn.addEventListener('click', () => {
        // Hide tooltip on first click
        if (tooltip) {
            tooltip.classList.add('hidden');
        }

        if (isPlaying) {
            bgMusic.pause();
            musicIcon.classList.remove('hidden');
            muteIcon.classList.add('hidden');
            musicBtn.setAttribute('aria-label', 'Play background music');
        } else {
            bgMusic.play().catch(error => {
                console.log('Audio playback failed:', error);
            });
            musicIcon.classList.add('hidden');
            muteIcon.classList.remove('hidden');
            musicBtn.setAttribute('aria-label', 'Pause background music');
        }
        isPlaying = !isPlaying;
    });

    // Hide tooltip on hover over button
    musicBtn.addEventListener('mouseenter', () => {
        if (tooltip && !isPlaying) {
            tooltip.style.opacity = '0.5';
        }
    });

    musicBtn.addEventListener('mouseleave', () => {
        if (tooltip && !isPlaying && !tooltip.classList.contains('hidden')) {
            tooltip.style.opacity = '1';
        }
    });
}

// SHARE BUTTONS
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const copyBtn = document.getElementById('copy-link');
    const copyFeedback = document.getElementById('copy-feedback');

    const shareData = {
        title: 'Happy New Year 2026!',
        text: 'Wishing you an amazing 2026 filled with joy, success, and endless possibilities!',
        url: window.location.href
    };

    shareButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.getAttribute('data-platform');

            switch(platform) {
                case 'twitter':
                    window.open(
                        'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareData.text) + '&url=' + encodeURIComponent(shareData.url),
                        '_blank',
                        'width=600,height=400'
                    );
                    break;

                case 'instagram':
                    // Instagram doesn't have direct web share - copy link and show message
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('Link copied! 📋\n\nShare on Instagram:\n1. Open Instagram app\n2. Create a new Story or Post\n3. Add text with this link\n4. Share with your followers! 🎉');
                    }).catch(err => {
                        alert('Please copy this link to share on Instagram: ' + window.location.href);
                    });
                    break;

                case 'whatsapp':
                    window.open(
                        'https://wa.me/?text=' + encodeURIComponent(shareData.text + ' ' + shareData.url),
                        '_blank'
                    );
                    break;

                case 'linkedin':
                    window.open(
                        'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(shareData.url),
                        '_blank',
                        'width=600,height=400'
                    );
                    break;
            }

            confetti({
                particleCount: 30,
                spread: 50,
                origin: { 
                    x: btn.offsetLeft / window.innerWidth,
                    y: btn.offsetTop / window.innerHeight
                },
                colors: ['#FFD700', '#FFA500']
            });
        });
    });

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            copyFeedback.classList.remove('hidden');

            confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.8 },
                colors: ['#FFD700', '#FFA500', '#FFE55C']
            });

            setTimeout(() => {
                copyFeedback.classList.add('hidden');
            }, 3000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
}

// SCROLL ANIMATIONS
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// ACCESSIBILITY
function initAccessibility() {
    const wishCards = document.querySelectorAll('.wish-card');
    wishCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');

        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

console.log('%c🎉 Happy New Year 2026! 🎉', 'font-size: 30px; font-weight: bold; color: #FFD700;');
console.log('%cMay your code be bug-free! 🚀', 'font-size: 16px; color: #FFA500;');
console.log('%c♪ Soft music ready to play - click the button! ♪', 'font-size: 14px; color: #4ECDC4;');
