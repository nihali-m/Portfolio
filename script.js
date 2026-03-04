// ===== COZY CUTE PORTFOLIO — SCRIPT =====

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== MOBILE NAV =====
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== ACTIVE NAV LINK =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ===== COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let count = 0;
                const duration = 1500;
                const increment = target / (duration / 30);

                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        el.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(count) + '+';
                    }
                }, 30);

                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    // ===== TYPED SUBTITLE EFFECT =====
    const subtitles = [
        '~ building things with love & code ~',
        '~ AI enthusiast & creative developer ~',
        '~ turning ideas into magic ✨ ~',
        '~ one project at a time ~'
    ];
    const typedEl = document.getElementById('typedRole');
    let subIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeSubtitle() {
        if (!typedEl) return;
        const current = subtitles[subIndex];

        if (!isDeleting) {
            typedEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                setTimeout(() => { isDeleting = true; typeSubtitle(); }, 2500);
                return;
            }
        } else {
            typedEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                subIndex = (subIndex + 1) % subtitles.length;
            }
        }

        setTimeout(typeSubtitle, isDeleting ? 35 : 65);
    }

    setTimeout(typeSubtitle, 2000);

    // ===== SKILL PILLS STAGGER =====
    const pills = document.querySelectorAll('.skill-pill');
    const pillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const items = container.querySelectorAll('.skill-pill');
                items.forEach((pill, i) => {
                    pill.style.opacity = '0';
                    pill.style.transform = 'translateY(15px) scale(0.9)';
                    setTimeout(() => {
                        pill.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        pill.style.opacity = '1';
                        pill.style.transform = 'translateY(0) scale(1)';
                    }, 60 * i);
                });
                pillObserver.unobserve(container);
            }
        });
    }, { threshold: 0.2 });

    const skillsCloud = document.querySelector('.skills-cloud');
    if (skillsCloud) pillObserver.observe(skillsCloud);

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Sent! 🎉 Thank you!';
            btn.style.background = 'linear-gradient(135deg, #B5EAD7, #B5D8FF)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // ===== PARALLAX FLOATING DECOS =====
    const decos = document.querySelectorAll('.floating-deco');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        decos.forEach((deco, i) => {
            const speed = (i + 1) * 5;
            const dx = (x - 0.5) * speed;
            const dy = (y - 0.5) * speed;
            deco.style.transform = `translate(${dx}px, ${dy}px)`;
        });
    });

    // ===== GAME TAB SWITCHING =====
    const gameTabs = document.querySelectorAll('.game-tab');
    const gameContainers = document.querySelectorAll('.game-container');

    gameTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            gameTabs.forEach(t => t.classList.remove('active'));
            gameContainers.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById(`game-${tab.dataset.game}`);
            if (target) target.classList.add('active');
        });
    });

    // ================================================================
    // GAME 1: MEMORY MATCH
    // ================================================================
    const memoryEmojis = ['🌸', '🦋', '🌈', '⭐', '🍰', '🎀', '🌷', '💎'];
    let memoryCards = [];
    let flippedCards = [];
    let memoryMoves = 0;
    let memoryPairsFound = 0;
    let memoryLocked = false;

    function shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function initMemoryGame() {
        const grid = document.getElementById('memoryGrid');
        const movesEl = document.getElementById('memoryMoves');
        const pairsEl = document.getElementById('memoryPairs');
        const msgEl = document.getElementById('memoryMessage');
        if (!grid) return;

        memoryMoves = 0;
        memoryPairsFound = 0;
        flippedCards = [];
        memoryLocked = false;
        movesEl.textContent = '0';
        pairsEl.textContent = '0';
        msgEl.textContent = '';
        grid.innerHTML = '';

        memoryCards = shuffle([...memoryEmojis, ...memoryEmojis]);

        memoryCards.forEach((emoji, index) => {
            const cell = document.createElement('div');
            cell.className = 'memory-cell';
            cell.dataset.emoji = emoji;
            cell.dataset.index = index;
            cell.innerHTML = `
                <div class="memory-cell-inner">
                    <div class="memory-face memory-face-back"></div>
                    <div class="memory-face memory-face-front">${emoji}</div>
                </div>
            `;
            cell.addEventListener('click', () => flipCard(cell));
            grid.appendChild(cell);
        });
    }

    function flipCard(cell) {
        if (memoryLocked) return;
        if (cell.classList.contains('flipped') || cell.classList.contains('matched')) return;
        if (flippedCards.length >= 2) return;

        cell.classList.add('flipped');
        flippedCards.push(cell);

        if (flippedCards.length === 2) {
            memoryMoves++;
            document.getElementById('memoryMoves').textContent = memoryMoves;

            const [a, b] = flippedCards;
            if (a.dataset.emoji === b.dataset.emoji) {
                // Match!
                memoryLocked = true;
                setTimeout(() => {
                    a.classList.add('matched');
                    b.classList.add('matched');
                    memoryPairsFound++;
                    document.getElementById('memoryPairs').textContent = memoryPairsFound;
                    flippedCards = [];
                    memoryLocked = false;

                    if (memoryPairsFound === memoryEmojis.length) {
                        document.getElementById('memoryMessage').textContent =
                            `🎉 You did it in ${memoryMoves} moves! Amazing! 🌟`;
                    }
                }, 400);
            } else {
                // No match
                memoryLocked = true;
                setTimeout(() => {
                    a.classList.add('wrong');
                    b.classList.add('wrong');
                    setTimeout(() => {
                        a.classList.remove('flipped', 'wrong');
                        b.classList.remove('flipped', 'wrong');
                        flippedCards = [];
                        memoryLocked = false;
                    }, 500);
                }, 600);
            }
        }
    }

    initMemoryGame();
    const memoryReset = document.getElementById('memoryReset');
    if (memoryReset) memoryReset.addEventListener('click', initMemoryGame);

    // ================================================================
    // GAME 2: CATCH THE PETALS
    // ================================================================
    const petalEmojis = ['🌸', '🌺', '🌷', '🌻', '🌼', '💮', '🪻', '🏵️'];
    const bonusEmojis = ['⭐', '💎', '✨'];
    let petalScore = 0;
    let petalTimer = 30;
    let petalBest = 0;
    let petalInterval = null;
    let petalSpawnInterval = null;
    let petalRunning = false;

    function startPetalGame() {
        const arena = document.getElementById('petalsArena');
        const scoreEl = document.getElementById('petalScore');
        const timerEl = document.getElementById('petalTimer');
        const msgEl = document.getElementById('petalsMessage');
        const startBtn = document.getElementById('petalStart');
        if (!arena || petalRunning) return;

        // Reset
        petalScore = 0;
        petalTimer = 30;
        petalRunning = true;
        scoreEl.textContent = '0';
        timerEl.textContent = '30';
        if (msgEl) msgEl.style.display = 'none';
        startBtn.textContent = '🌸 Playing...';
        startBtn.disabled = true;

        // Clear existing petals
        arena.querySelectorAll('.petal, .petal-pop').forEach(p => p.remove());

        // Spawn petals
        let spawnRate = 600;
        function spawnPetal() {
            if (!petalRunning) return;
            const petal = document.createElement('div');
            const isBonus = Math.random() < 0.12;
            const emoji = isBonus
                ? bonusEmojis[Math.floor(Math.random() * bonusEmojis.length)]
                : petalEmojis[Math.floor(Math.random() * petalEmojis.length)];

            const points = isBonus ? 3 : 1;
            const speed = 2 + Math.random() * 3; // 2-5 seconds
            const left = 5 + Math.random() * 85;

            petal.className = 'petal';
            petal.textContent = emoji;
            petal.style.left = `${left}%`;
            petal.style.animationDuration = `${speed}s`;
            if (isBonus) {
                petal.style.fontSize = '2.2rem';
                petal.style.filter = 'drop-shadow(0 0 8px rgba(255,215,0,0.6))';
            }

            petal.addEventListener('click', (e) => {
                e.stopPropagation();
                petalScore += points;
                scoreEl.textContent = petalScore;

                // Pop feedback
                const pop = document.createElement('div');
                pop.className = 'petal-pop';
                pop.textContent = `+${points}`;
                pop.style.left = petal.style.left;
                pop.style.top = petal.style.top || petal.offsetTop + 'px';
                arena.appendChild(pop);
                setTimeout(() => pop.remove(), 600);

                petal.remove();
            });

            petal.addEventListener('animationend', () => petal.remove());
            arena.appendChild(petal);

            // Slightly speed up over time
            spawnRate = Math.max(300, spawnRate - 5);
            petalSpawnInterval = setTimeout(spawnPetal, spawnRate);
        }

        spawnPetal();

        // Timer countdown
        petalInterval = setInterval(() => {
            petalTimer--;
            timerEl.textContent = petalTimer;

            if (petalTimer <= 0) {
                endPetalGame();
            }
        }, 1000);
    }

    function endPetalGame() {
        petalRunning = false;
        clearInterval(petalInterval);
        clearTimeout(petalSpawnInterval);

        const arena = document.getElementById('petalsArena');
        const msgEl = document.getElementById('petalsMessage');
        const startBtn = document.getElementById('petalStart');
        const bestEl = document.getElementById('petalBest');

        // Remove remaining petals
        arena.querySelectorAll('.petal').forEach(p => p.remove());

        if (petalScore > petalBest) {
            petalBest = petalScore;
            bestEl.textContent = petalBest;
        }

        if (msgEl) {
            msgEl.style.display = 'block';
            const messages = [
                `🌸 You caught ${petalScore} petals!`,
                petalScore > 20 ? 'Amazing reflexes! 🌟' :
                    petalScore > 10 ? 'Great job! 💫' :
                        'Nice try! Try again! ✨'
            ];
            msgEl.innerHTML = messages.join('<br>');
        }

        startBtn.textContent = '🌸 Play Again!';
        startBtn.disabled = false;
    }

    const petalStartBtn = document.getElementById('petalStart');
    if (petalStartBtn) petalStartBtn.addEventListener('click', startPetalGame);

    // ================================================================
    // MUSIC PLAYER
    // ================================================================
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicDisc = document.getElementById('musicDisc');
    const musicLabel = document.getElementById('musicLabel');
    let musicPlaying = false;

    if (musicToggle && bgMusic) {
        bgMusic.volume = 0.3;

        musicToggle.addEventListener('click', () => {
            if (musicPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
                musicDisc.textContent = '🎵';
                musicLabel.textContent = 'play';
                musicPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    musicDisc.textContent = '🎶';
                    musicLabel.textContent = 'on';
                    musicPlaying = true;
                }).catch(() => {
                    // Audio file not found or can't play
                    musicLabel.textContent = '✗';
                    setTimeout(() => { musicLabel.textContent = 'play'; }, 1500);
                });
            }
        });
    }

});

// ================================================================
// ENHANCEMENTS (outside DOMContentLoaded for performance)
// ================================================================

// ===== 1. LOADING SCREEN =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loadingScreen');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 600);
        }, 1200);
    }
});

// ===== 2. SCROLL PROGRESS BAR =====
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
});

// ===== 3. SPARKLE CURSOR TRAIL =====
(function () {
    const canvas = document.getElementById('sparkleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0, mouseY = 0;
    let animating = true;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#FFB5C2', '#D4B5FF', '#B5EAD7', '#FFCBA4', '#B5D8FF', '#F48FB1'];

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Spawn 1-2 particles per move
        for (let i = 0; i < 1 + Math.random(); i++) {
            particles.push({
                x: mouseX + (Math.random() - 0.5) * 10,
                y: mouseY + (Math.random() - 0.5) * 10,
                size: Math.random() * 3 + 1.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5 - 0.5,
                life: 1,
                decay: 0.015 + Math.random() * 0.02,
                shape: Math.random() > 0.5 ? 'circle' : 'star'
            });
        }
        // Limit particles
        if (particles.length > 80) particles = particles.slice(-80);
    });

    function drawStar(cx, cy, size, color, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const r = i === 0 ? size : size;
            const method = i === 0 ? 'moveTo' : 'lineTo';
            ctx[method](cx + Math.cos(angle) * size, cy + Math.sin(angle) * size);
            const innerAngle = angle + (2 * Math.PI) / 10;
            ctx.lineTo(cx + Math.cos(innerAngle) * (size * 0.4), cy + Math.sin(innerAngle) * (size * 0.4));
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function animate() {
        if (!animating) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            p.size *= 0.99;

            if (p.life <= 0) {
                particles.splice(i, 1);
                return;
            }

            if (p.shape === 'star') {
                drawStar(p.x, p.y, p.size, p.color, p.life);
            } else {
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }

    animate();

    // Pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
        animating = !document.hidden;
        if (animating) animate();
    });
})();

// ===== 4. EASTER EGG — Type "cute" for confetti! =====
(function () {
    let typed = '';
    const secret = 'cute';

    document.addEventListener('keydown', (e) => {
        typed += e.key.toLowerCase();
        if (typed.length > secret.length) {
            typed = typed.slice(-secret.length);
        }
        if (typed === secret) {
            typed = '';
            launchConfetti();
        }
    });

    function launchConfetti() {
        const emojis = ['🌸', '⭐', '✨', '💖', '🦋', '🎀', '🌈', '🍰', '💎', '🌷', '🎵', '🌙'];
        for (let i = 0; i < 40; i++) {
            const el = document.createElement('div');
            el.className = 'confetti-piece';
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.left = Math.random() * 100 + 'vw';
            el.style.top = -20 + 'px';
            el.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
            el.style.animationDuration = (1.5 + Math.random() * 2) + 's';
            el.style.animationDelay = (Math.random() * 0.5) + 's';
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 4000);
        }
    }
})();

// ===== 5. TIME-BASED GREETING =====
(function () {
    const greeting = document.getElementById('heroGreeting');
    if (!greeting) return;
    const hour = new Date().getHours();
    let text, emoji;
    if (hour >= 5 && hour < 12) { text = 'Good morning'; emoji = '☀️'; }
    else if (hour >= 12 && hour < 17) { text = 'Good afternoon'; emoji = '🌤️'; }
    else if (hour >= 17 && hour < 21) { text = 'Good evening'; emoji = '🌅'; }
    else { text = 'Late night vibes'; emoji = '🌙'; }
    greeting.textContent = text + ' ' + emoji + ',';
})();

// ===== 6. PET MASCOT (MOCHI) =====
(function () {
    const pet = document.getElementById('petMascot');
    const body = document.getElementById('petBody');
    const bubble = document.getElementById('petBubble');
    if (!pet || !body || !bubble) return;

    const sayings = [
        'meow~ 🐾', 'you look nice today!', 'keep going! ✨',
        'take a break? ☕', 'uwu~', '*purrs* 💗', 'have fun! 🎮',
        'you\'re amazing! 🌈', '*naps* 😴', 'hi friend! 🌸',
        'explore more! 🗺️', 'stay cozy~ 🧸', 'great taste! 💖'
    ];

    const faces = ['🐱', '😺', '😸', '😻', '🙀', '😹', '😽'];

    function showBubble(text) {
        bubble.textContent = text;
        bubble.classList.add('show');
        setTimeout(() => bubble.classList.remove('show'), 2500);
    }

    // Random idle chatter
    function idleChat() {
        if (Math.random() > 0.6) {
            showBubble(sayings[Math.floor(Math.random() * sayings.length)]);
        }
        setTimeout(idleChat, 8000 + Math.random() * 12000);
    }
    setTimeout(idleChat, 4000);

    // Click reaction
    pet.addEventListener('click', () => {
        body.textContent = faces[Math.floor(Math.random() * faces.length)];
        showBubble(sayings[Math.floor(Math.random() * sayings.length)]);
        setTimeout(() => { body.textContent = '🐱'; }, 3000);
    });

    // Say hi on first visit
    setTimeout(() => showBubble('welcome! 🌸'), 2500);
})();

// ===== 7. FORTUNE COOKIE =====
(function () {
    const btn = document.getElementById('fortuneBtn');
    const popup = document.getElementById('fortunePopup');
    const text = document.getElementById('fortuneText');
    const close = document.getElementById('fortuneClose');
    if (!btn || !popup || !text || !close) return;

    const fortunes = [
        '🌸 Something beautiful is about to happen.',
        '✨ Your next project will be your best one yet.',
        '🦋 Growth happens outside your comfort zone.',
        '💖 Someone is inspired by your work right now.',
        '🌈 The best code is the code that makes people smile.',
        '⭐ You\'re closer to your goals than you think.',
        '🎀 Creativity is your superpower — never forget that.',
        '🌷 Take a moment to appreciate how far you\'ve come.',
        '🍰 Good things come to those who debug patiently.',
        '💎 Your portfolio just made someone\'s day brighter.',
        '🌙 Rest is productive too. You deserve it.',
        '🔮 A wonderful opportunity is heading your way.',
        '🎵 The rhythm of your work creates harmony.',
        '🐱 Mochi says: you\'re purrfect!',
        '🌻 Plant seeds of kindness — they always bloom.'
    ];

    let isOpen = false;

    btn.addEventListener('click', () => {
        if (isOpen) {
            popup.classList.remove('show');
            isOpen = false;
            return;
        }
        text.textContent = fortunes[Math.floor(Math.random() * fortunes.length)];
        popup.classList.add('show');
        isOpen = true;
    });

    close.addEventListener('click', () => {
        popup.classList.remove('show');
        isOpen = false;
    });
})();

// ===== 8. CLICK-TO-BLOOM =====
(function () {
    const flowers = ['🌸', '🌷', '🌺', '🌻', '🌼', '💮', '🏵️', '✿'];
    let lastBloom = 0;

    document.addEventListener('click', (e) => {
        // Don't bloom on interactive elements
        const tag = e.target.tagName;
        if (['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT', 'CANVAS'].includes(tag)) return;
        if (e.target.closest('button, a, input, textarea, .game-card, .pet-mascot, .fortune-btn, .fortune-popup, .music-toggle, .navbar')) return;

        // Throttle — max 1 bloom per 200ms
        const now = Date.now();
        if (now - lastBloom < 200) return;
        lastBloom = now;

        const bloom = document.createElement('div');
        bloom.className = 'bloom';
        bloom.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        bloom.style.left = (e.clientX - 12) + 'px';
        bloom.style.top = (e.clientY - 12) + 'px';
        bloom.style.fontSize = (1 + Math.random() * 1) + 'rem';
        document.body.appendChild(bloom);
        setTimeout(() => bloom.remove(), 1000);
    });
})();
