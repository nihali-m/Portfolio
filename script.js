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
