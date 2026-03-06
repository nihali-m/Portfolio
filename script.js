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


// ===== 8. CLICK-TO-BLOOM =====
(function () {
    const flowers = ['🌸', '🌷', '🌺', '🌻', '🌼', '💮', '🏵️', '✿'];
    let lastBloom = 0;

    document.addEventListener('click', (e) => {
        // Don't bloom on interactive elements
        const tag = e.target.tagName;
        if (['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT', 'CANVAS'].includes(tag)) return;
        if (e.target.closest('button, a, input, textarea, .game-card, .navbar')) return;

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

// ===== 9. HACKER MODE =====
(function () {
    const toggle = document.getElementById('hackerToggle');
    const canvas = document.getElementById('matrixRain');
    if (!toggle || !canvas) return;

    const ctx = canvas.getContext('2d');
    let isHacker = false;
    let animId = null;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
    const fontSize = 14;
    let columns, drops;

    function initDrops() {
        columns = Math.floor(canvas.width / fontSize);
        drops = new Array(columns).fill(1);
    }
    initDrops();

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00FF41';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.globalAlpha = 0.4 + Math.random() * 0.6;
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
        ctx.globalAlpha = 1;
        animId = requestAnimationFrame(drawMatrix);
    }

    toggle.addEventListener('click', () => {
        isHacker = !isHacker;
        document.body.classList.toggle('hacker-mode', isHacker);
        if (isHacker) {
            initDrops();
            drawMatrix();
        } else {
            if (animId) cancelAnimationFrame(animId);
            animId = null;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    });
})();

// ===== 10. AI CHATBOT =====
(function () {
    const trigger = document.getElementById('chatTrigger');
    const chatWin = document.getElementById('chatWindow');
    const closeBtn = document.getElementById('chatClose');
    const msgArea = document.getElementById('chatMessages');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSend');
    if (!trigger || !chatWin || !msgArea || !input || !sendBtn) return;

    const responses = {
        greetings: {
            patterns: ['hi', 'hello', 'hey', 'sup', 'yo', 'hola', 'howdy'],
            replies: [
                'Hey there! 👋 I\'m NihaliBot. What would you like to know about Nihali?',
                'Hello! 😊 Ask me about skills, projects, experience, or anything else!',
                'Hi! 🌸 I can tell you about Nihali\'s work, skills, or how to get in touch!'
            ]
        },
        skills: {
            patterns: ['skill', 'tech', 'stack', 'language', 'tool', 'programming', 'framework'],
            replies: [
                '💻 Nihali is skilled in:\n\n• Python, JavaScript, HTML/CSS\n• Machine Learning & Deep Learning\n• TensorFlow, PyTorch, OpenCV\n• React, Node.js\n• Git, Docker\n• Problem solving & creative coding!',
                '🛠️ Tech stack: Python, JS, ML/DL frameworks (TensorFlow, PyTorch), web dev (HTML/CSS/JS, React), computer vision (OpenCV), and more!'
            ]
        },
        projects: {
            patterns: ['project', 'portfolio', 'built', 'create', 'made', 'build'],
            replies: [
                '🎨 Some of Nihali\'s projects include:\n\n• AI & ML research projects\n• Computer Vision applications\n• Creative web experiences (like this portfolio!)\n• Interactive games & tools\n\nScroll down to the Projects section! ⬇️',
                '🚀 Nihali has 10+ projects spanning AI, machine learning, web development, and creative coding. Check the Projects section!'
            ]
        },
        experience: {
            patterns: ['experience', 'job', 'intern', 'career', 'professional', 'work'],
            replies: [
                '📈 Nihali is an AI enthusiast and creative developer with 2+ years of learning experience. Passionate about intelligent systems and beautiful digital experiences!',
                '🌟 Currently focused on AI/ML projects and creative development. Always learning, always building!'
            ]
        },
        education: {
            patterns: ['education', 'study', 'university', 'college', 'degree', 'school'],
            replies: [
                '🎓 Nihali is pursuing Computer Science/AI, with a strong focus on machine learning and deep learning. Self-taught in web development!',
                '📚 Studying CS with a focus on AI & ML. A lifelong learner who believes in learning by building!'
            ]
        },
        contact: {
            patterns: ['contact', 'reach', 'email', 'hire', 'message', 'connect'],
            replies: [
                '📬 You can reach Nihali through:\n\n• The contact form below ⬇️\n• GitHub: github.com/nihali-m\n• Or scroll to the Contact section!\n\nAlways happy to connect! 💌',
                '✉️ Head to the Contact section to send a message, or visit the GitHub profile!'
            ]
        },
        ai: {
            patterns: ['ai', 'artificial intelligence', 'machine learning', 'deep learning', 'neural', 'ml', 'model'],
            replies: [
                '🤖 AI is Nihali\'s passion!\n\n• Computer Vision & Image Processing\n• Natural Language Processing\n• Deep Learning architectures\n• ML model optimization\n• Real-world AI applications',
                '🧠 Nihali is deeply passionate about AI — from training neural networks to building computer vision systems!'
            ]
        },
        hobbies: {
            patterns: ['hobby', 'free time', 'interest', 'enjoy', 'passion', 'fun'],
            replies: [
                '🌈 Beyond coding, Nihali enjoys:\n\n• Creative design & digital art\n• Exploring new technologies\n• Building fun interactive projects\n• Gaming & anime\n• Making things cute and cozy ✨',
                '😊 Nihali loves turning boring tech into beautiful, fun experiences — like this portfolio!'
            ]
        },
        cute: {
            patterns: ['cute', 'kawaii', 'cozy', 'pretty', 'beautiful', 'design', 'aesthetic'],
            replies: [
                '🌸 Glad you noticed! This portfolio has a "cozy kawaii" theme — pastel colors, floating decorations, and lots of love! ✨',
                '💖 The cute design is intentional! Try clicking around — there are hidden surprises!'
            ]
        },
        hacker: {
            patterns: ['hacker', 'matrix', 'hack', 'terminal', 'dark'],
            replies: [
                '⌨️ Click the keyboard button (bottom-left) to toggle the Matrix theme! 😎',
                '🖥️ Try the hacker mode toggle (⌨️ bottom-left) — green text, falling code, scanlines!'
            ]
        },
        games: {
            patterns: ['game', 'play', 'memory', 'petal', 'mini-game'],
            replies: [
                '🎮 There are mini-games in the Play Corner!\n\n• 🃏 Memory Match — flip cards to find pairs\n• 🌸 Catch the Petals — catch falling flowers!\n\nScroll to the Play section to try them!',
                '🕹️ Check out the Play Corner! Memory matching and petal-catching games. Can you beat the high score? 🏆'
            ]
        },
        thanks: {
            patterns: ['thank', 'thanks', 'thx', 'appreciate', 'helpful'],
            replies: [
                'You\'re welcome! 💖 Feel free to ask anything else!',
                'Happy to help! 😊 Check out the Contact section to reach Nihali!',
                'Aw, thanks! 🌸 Try the easter egg — type "cute" anywhere on the page! 🤫'
            ]
        },
        bye: {
            patterns: ['bye', 'goodbye', 'see you', 'later', 'cya'],
            replies: [
                'Bye! 👋 Thanks for visiting! Star the GitHub repo! ⭐',
                'See you later! 🌸 Hope you enjoyed the portfolio!',
                'Goodbye! 💖 Come back anytime!'
            ]
        }
    };

    const fallbacks = [
        'Hmm, I\'m not sure about that! Try asking about skills, projects, or contact info 😊',
        'Good question! Try: "What are your skills?" or "Tell me about your projects" 🤖',
        'I\'m a simple bot 😅 — I know about skills, projects, education, and contact info!'
    ];

    function findResponse(text) {
        const lower = text.toLowerCase().trim();
        for (const cat of Object.values(responses)) {
            for (const p of cat.patterns) {
                if (lower.includes(p)) {
                    return cat.replies[Math.floor(Math.random() * cat.replies.length)];
                }
            }
        }
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    function addMsg(text, type) {
        const div = document.createElement('div');
        div.className = 'chat-msg ' + type;
        const span = document.createElement('span');
        span.className = 'chat-msg-text';
        span.textContent = text;
        div.appendChild(span);
        msgArea.appendChild(div);
        msgArea.scrollTop = msgArea.scrollHeight;
    }

    function showTyping() {
        const t = document.createElement('div');
        t.className = 'chat-typing';
        t.id = 'chatTyping';
        t.innerHTML = '<span></span><span></span><span></span>';
        msgArea.appendChild(t);
        msgArea.scrollTop = msgArea.scrollHeight;
    }

    function send() {
        const text = input.value.trim();
        if (!text) return;
        addMsg(text, 'user');
        input.value = '';
        showTyping();
        setTimeout(() => {
            const typing = document.getElementById('chatTyping');
            if (typing) typing.remove();
            addMsg(findResponse(text), 'bot');
        }, 600 + Math.random() * 800);
    }

    trigger.addEventListener('click', () => {
        chatWin.classList.add('open');
        trigger.classList.add('hidden');
        input.focus();
    });

    closeBtn.addEventListener('click', () => {
        chatWin.classList.remove('open');
        trigger.classList.remove('hidden');
    });

    sendBtn.addEventListener('click', send);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
})();

// ===== 11. HACKER GAME TABS =====
(function () {
    document.querySelectorAll('.hacker-games .game-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const parent = tab.closest('.hacker-games');
            parent.querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));
            parent.querySelectorAll('.game-container').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById('game-' + tab.dataset.game);
            if (target) target.classList.add('active');
        });
    });
})();

// ===== 12. SPEED TYPER =====
(function () {
    const prompt = document.getElementById('typerPrompt');
    const input = document.getElementById('typerInput');
    const resetBtn = document.getElementById('typerReset');
    const wpmEl = document.getElementById('typerWpm');
    const timeEl = document.getElementById('typerTime');
    const bestEl = document.getElementById('typerBest');
    const statsEl = document.getElementById('typerStats');
    if (!prompt || !input || !resetBtn) return;

    const snippets = [
        'const server = http.createServer();',
        'for (let i = 0; i < arr.length; i++)',
        'function hack(target) { return true; }',
        'if (access === "granted") unlock();',
        'const data = await fetch(api_url);',
        'while (running) { process(next); }',
        'export default class Matrix extends GL',
        'npm install --save express cors dotenv',
        'git push origin main --force',
        'docker build -t myapp:latest .',
        'SELECT * FROM users WHERE role = admin',
        'chmod 777 /var/www/html/index.php',
        'ssh root@192.168.1.1 -p 2222',
        'python3 -m venv .env && source activate',
        'curl -X POST https://api.hack/decrypt'
    ];

    let currentText = '';
    let startTime = null;
    let timerInterval = null;
    let bestWpm = parseInt(localStorage.getItem('typerBest') || '0');
    let finished = false;

    bestEl.textContent = bestWpm;

    function newGame() {
        currentText = snippets[Math.floor(Math.random() * snippets.length)];
        finished = false;
        startTime = null;
        clearInterval(timerInterval);
        wpmEl.textContent = '0';
        timeEl.textContent = '0';
        statsEl.textContent = '';
        input.value = '';
        input.disabled = false;
        input.focus();
        renderPrompt('');
    }

    function renderPrompt(typed) {
        let html = '';
        for (let i = 0; i < currentText.length; i++) {
            if (i < typed.length) {
                if (typed[i] === currentText[i]) {
                    html += '<span class="correct">' + escHtml(currentText[i]) + '</span>';
                } else {
                    html += '<span class="incorrect">' + escHtml(currentText[i]) + '</span>';
                }
            } else if (i === typed.length) {
                html += '<span class="current">' + escHtml(currentText[i]) + '</span>';
            } else {
                html += escHtml(currentText[i]);
            }
        }
        prompt.innerHTML = html;
    }

    function escHtml(c) {
        return c.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;');
    }

    function calcWpm() {
        if (!startTime) return 0;
        const minutes = (Date.now() - startTime) / 60000;
        if (minutes === 0) return 0;
        const words = input.value.length / 5;
        return Math.round(words / minutes);
    }

    input.addEventListener('input', () => {
        if (finished) return;
        const typed = input.value;

        if (!startTime && typed.length > 0) {
            startTime = Date.now();
            timerInterval = setInterval(() => {
                timeEl.textContent = ((Date.now() - startTime) / 1000).toFixed(1);
                wpmEl.textContent = calcWpm();
            }, 200);
        }

        renderPrompt(typed);

        // Check completion
        if (typed.length >= currentText.length) {
            finished = true;
            clearInterval(timerInterval);
            input.disabled = true;
            const finalWpm = calcWpm();
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
            const correct = typed.split('').filter((c, i) => c === currentText[i]).length;
            const accuracy = Math.round((correct / currentText.length) * 100);

            wpmEl.textContent = finalWpm;
            timeEl.textContent = elapsed;
            statsEl.textContent = '✅ Done! ' + accuracy + '% accuracy | ' + finalWpm + ' WPM';

            if (finalWpm > bestWpm) {
                bestWpm = finalWpm;
                bestEl.textContent = bestWpm;
                localStorage.setItem('typerBest', bestWpm);
                statsEl.textContent += ' 🏆 New best!';
            }
        }
    });

    resetBtn.addEventListener('click', newGame);
})();

// ===== 13. CRACK THE CODE =====
(function () {
    const guessesEl = document.getElementById('crackerGuesses');
    const input = document.getElementById('crackerInput');
    const guessBtn = document.getElementById('crackerGuess');
    const resetBtn = document.getElementById('crackerReset');
    const attemptsEl = document.getElementById('crackerAttempts');
    const bestEl = document.getElementById('crackerBest');
    const msgEl = document.getElementById('crackerMsg');
    if (!guessesEl || !input || !guessBtn || !resetBtn) return;

    let secret = '';
    let attempts = 0;
    let gameOver = false;
    let bestScore = localStorage.getItem('crackerBest') || '-';

    bestEl.textContent = bestScore;

    function newGame() {
        secret = '';
        for (let i = 0; i < 4; i++) secret += Math.floor(Math.random() * 10);
        attempts = 0;
        gameOver = false;
        attemptsEl.textContent = '0';
        guessesEl.innerHTML = '';
        msgEl.textContent = '';
        msgEl.className = 'cracker-msg';
        input.value = '';
        input.focus();
    }

    function checkGuess() {
        if (gameOver) return;
        const guess = input.value.trim();
        if (guess.length !== 4 || !/^\d{4}$/.test(guess)) {
            msgEl.textContent = 'Enter exactly 4 digits!';
            msgEl.className = 'cracker-msg';
            return;
        }

        attempts++;
        attemptsEl.textContent = attempts;
        input.value = '';

        // Calculate feedback
        const feedback = [];
        const secretArr = secret.split('');
        const guessArr = guess.split('');
        const used = [false, false, false, false];

        // First pass: exact matches
        for (let i = 0; i < 4; i++) {
            if (guessArr[i] === secretArr[i]) {
                feedback[i] = '🟢';
                used[i] = true;
                guessArr[i] = null;
            }
        }

        // Second pass: wrong position
        for (let i = 0; i < 4; i++) {
            if (guessArr[i] === null) continue;
            let found = false;
            for (let j = 0; j < 4; j++) {
                if (!used[j] && guessArr[i] === secretArr[j]) {
                    feedback[i] = '🟡';
                    used[j] = true;
                    found = true;
                    break;
                }
            }
            if (!found) feedback[i] = '⚫';
        }

        // Render row
        const row = document.createElement('div');
        row.className = 'cracker-guess-row';
        row.innerHTML = '<span class="cracker-guess-num">' + guess + '</span><span class="cracker-guess-feedback">' + feedback.join('') + '</span>';
        guessesEl.appendChild(row);
        guessesEl.scrollTop = guessesEl.scrollHeight;

        // Check win/lose
        if (guess === secret) {
            gameOver = true;
            msgEl.textContent = '🎉 Cracked it in ' + attempts + ' attempts!';
            msgEl.className = 'cracker-msg win';
            if (bestScore === '-' || attempts < parseInt(bestScore)) {
                bestScore = attempts;
                bestEl.textContent = bestScore;
                localStorage.setItem('crackerBest', bestScore);
                msgEl.textContent += ' 🏆 New best!';
            }
        } else if (attempts >= 8) {
            gameOver = true;
            msgEl.textContent = '💀 Game over! The code was ' + secret;
            msgEl.className = 'cracker-msg lose';
        }
    }

    guessBtn.addEventListener('click', checkGuess);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkGuess(); });
    resetBtn.addEventListener('click', newGame);
    newGame();
})();
