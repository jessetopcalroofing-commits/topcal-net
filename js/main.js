/* ============================================================
   TOPCAL INC — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------
       1. NAVBAR — Scroll Effect & Active State
    -------------------------------------------------------- */
    const navbar  = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        // Scrolled class
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlight
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Back to top
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run on load

    /* --------------------------------------------------------
       2. MOBILE NAV TOGGLE
    -------------------------------------------------------- */
    const navToggle = document.getElementById('navToggle');
    const navLinksEl = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinksEl.classList.toggle('open');
        document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav when link clicked
    navLinksEl.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinksEl.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /* --------------------------------------------------------
       3. SMOOTH SCROLL for anchor links
    -------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* --------------------------------------------------------
       4. BACK TO TOP
    -------------------------------------------------------- */
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* --------------------------------------------------------
       5. ANIMATED COUNTER (Hero Stats)
    -------------------------------------------------------- */
    function animateCounter(el, target, duration = 2000) {
        let start = 0;
        const step = target / (duration / 16);

        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(start);
        }, 16);
    }

    // Use IntersectionObserver to trigger counters when visible
    const counterEls = document.querySelectorAll('.stat-number[data-target]');
    let countersTriggered = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersTriggered) {
                countersTriggered = true;
                counterEls.forEach(el => {
                    animateCounter(el, parseInt(el.dataset.target));
                });
            }
        });
    }, { threshold: 0.5 });

    counterEls.forEach(el => counterObserver.observe(el));

    /* --------------------------------------------------------
       6. SCROLL REVEAL
    -------------------------------------------------------- */
    const revealElements = [
        '.service-card',
        '.project-card',
        '.why-card',
        '.about-grid',
        '.contact-grid',
        '.section-header',
        '.testimonials-slider',
        '.cta-content',
    ];

    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add('reveal');
            // Add staggered delay for grid items
            const delay = el.dataset.delay || (i * 80);
            el.style.transitionDelay = `${delay}ms`;
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* --------------------------------------------------------
       7. PROJECT FILTER
    -------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide cards
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeUp 0.4s ease both';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* --------------------------------------------------------
       8. TESTIMONIALS SLIDER
    -------------------------------------------------------- */
    const track   = document.getElementById('testimonialTrack');
    const cards   = track ? track.querySelectorAll('.testimonial-card') : [];
    const dots    = document.querySelectorAll('.testi-dot');
    let current   = 0;
    let autoSlide;

    function goTo(index) {
        if (!track || cards.length === 0) return;
        current = (index + cards.length) % cards.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    if (track) {
        document.getElementById('prevBtn').addEventListener('click', () => {
            clearInterval(autoSlide);
            goTo(current - 1);
            startAutoSlide();
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            clearInterval(autoSlide);
            goTo(current + 1);
            startAutoSlide();
        });

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                clearInterval(autoSlide);
                goTo(i);
                startAutoSlide();
            });
        });

        function startAutoSlide() {
            autoSlide = setInterval(() => goTo(current + 1), 5500);
        }

        startAutoSlide();
    }

    /* --------------------------------------------------------
       9. CONTACT FORM
    -------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Simple validation
            let valid = true;
            const required = contactForm.querySelectorAll('[required]');
            required.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.style.borderColor = '#EF4444';
                    setTimeout(() => field.style.borderColor = '', 2000);
                }
            });

            if (!valid) return;

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText   = submitBtn.querySelector('.btn-text');
            const btnIcon   = submitBtn.querySelector('.btn-icon');

            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

            // Save to table API (optional persistence)
            try {
                const formData = {
                    firstName:  contactForm.firstName.value,
                    lastName:   contactForm.lastName.value,
                    email:      contactForm.email.value,
                    phone:      contactForm.phone.value || '',
                    company:    contactForm.company.value || '',
                    service:    contactForm.service.value,
                    budget:     contactForm.budget.value || '',
                    message:    contactForm.message.value,
                };

                await fetch('tables/contact_inquiries', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } catch (_) {
                // Silently fail if API not set up
            }

            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                btnText.textContent = 'Send My Request';
                btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                formSuccess.classList.add('show');
                setTimeout(() => formSuccess.classList.remove('show'), 6000);
            }, 1200);
        });
    }

    /* --------------------------------------------------------
       10. PARALLAX EFFECT (Hero)
    -------------------------------------------------------- */
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroSection.style.backgroundPositionY = `calc(center + ${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }

    /* --------------------------------------------------------
       11. Service Card Hover Tilt (subtle)
    -------------------------------------------------------- */
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect  = card.getBoundingClientRect();
            const x     = (e.clientX - rect.left) / rect.width - 0.5;
            const y     = (e.clientY - rect.top)  / rect.height - 0.5;
            card.style.transform = `translateY(-8px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    console.log('%c🏗️ TopCal Inc — Website Loaded', 'color: #C8902A; font-size: 14px; font-weight: bold;');
});
