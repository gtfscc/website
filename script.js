let currentLang = 'en';
let isAnimating = false;

function getCopyrightYear() {
    const currentYear = new Date().getFullYear();
    if (currentYear < 2024) {
        return "well i dont know mister time traveller";
    }
    if (currentYear === 2025) {
        return "2025";
    }
    if (currentYear > 2025) {
        return `2025-${currentYear}`;
    }
    return currentYear.toString();
}

const translations = {
    en: {
        hero_title: "Hi, I'm Alex!",
        hero_subtitle: "I’ve been passionate about IT since middle school, and my current focus is on developing web pages, apps (using Dart and Flutter), as well as creating GTFS feeds. Feel free to reach out ",
        about_title: "Page under construction",
        about_text: "Thank you for your patience.",
        nav_home: "Home",
        nav_about: "About me",
        nav_contact: "Contact",
        footer_connect: "Connect",
        footer_email_label: "Email (temporary):",
        footer_email: "koles3520@gmail.com",
        footer_phone_label: "Phone:",
        footer_phone: "+48 507 049 770",
        footer_discord_label: "Discord:",
        footer_discord: "ax7a",
        footer_resources: "Resources",
        footer_github: "GitHub",
        footer_copyright: "© 2025 Alexander Dubis. All rights reserved.",
        footer_disclaimer: "This page is not affiliated with the General Transit Feed Specification's website",
        contact_link: "contact me"
    },
    pl: {
        hero_title: "Cześć, jestem Alex!",
        hero_subtitle: "Informatyką interesuję się od szkoły podstawowej, jednak obecnie skupiam się przede wszystkim na stronach internetowych, programowaniu w C++ oraz tworzeniem plików do GTFS dla różnych gmin. Skontaktuj się ze mną ",
        about_title: "Strona w trakcie budowy",
        about_text: "Dziękuję za cierpliwość.",
        nav_home: "Strona główna",
        nav_about: "O mnie",
        nav_contact: "Kontakt",
        footer_connect: "Kontakt",
        footer_email_label: "Email (tymczasowy):",
        footer_email: "koles3520@gmail.com",
        footer_phone_label: "Telefon:",
        footer_phone: "+48 507 049 770",
        footer_discord_label: "Discord:",
        footer_discord: "ax7a",
        footer_resources: "Zasoby",
        footer_github: "GitHub",
        footer_copyright: "© 2025 Alexander Dubis. Wszelkie prawa zastrzeżone.",
        footer_disclaimer: "Ta strona nie jest powiązana ze stroną General Transit Feed Specification",
        contact_link: "tutaj"
    }
};

function updateNavLinks(t) {
    const navLinks = document.querySelectorAll('.top-nav a');
    const navTexts = [t.nav_home, t.nav_contact];
    navLinks.forEach((link, index) => {
        if (index < navTexts.length) link.textContent = navTexts[index];
    });
}

function updateFooter(t) {
    const footerColumns = document.querySelectorAll('.footer-column');
    const firstCol = footerColumns[0];
    firstCol.querySelector('h4').textContent = t.footer_connect;

    const footerFirstColPs = firstCol.querySelectorAll('p');
    footerFirstColPs[0].childNodes[0].textContent = `${t.footer_email_label} `;
    footerFirstColPs[0].querySelector('a').textContent = t.footer_email;

    footerFirstColPs[1].childNodes[0].textContent = `${t.footer_phone_label} `;
    footerFirstColPs[1].querySelector('a').textContent = t.footer_phone;

    footerFirstColPs[2].childNodes[0].textContent = `${t.footer_discord_label} `;
    footerFirstColPs[2].querySelector('a').textContent = t.footer_discord;

    footerColumns[1].querySelector('h4').textContent = t.footer_resources;
    footerColumns[1].querySelectorAll('a')[0].textContent = t.footer_github;

    const footerBottomPs = document.querySelectorAll('.footer-bottom p');
    footerBottomPs[0].textContent = t.footer_copyright;

    const prefixTexts = {
        en: "This page is not affiliated with the ",
        pl: "Ta strona nie jest powiązana ze stroną "
    };
    const linkTexts = {
        en: "General Transit Feed Specification",
        pl: "General Transit Feed Specification"
    };
    const suffixTexts = {
        en: "'s website",
        pl: " (GTFS)."
    };

    footerBottomPs[1].innerHTML = `${prefixTexts[currentLang]}<a href="https://gtfs.org/">${linkTexts[currentLang]}</a>${suffixTexts[currentLang]}`;
}

function updateHero(t) {
    const heroTitle = document.querySelector('.hero-section h1');
    const subtitleEl = document.querySelector('.hero-section .subtitle');
    heroTitle.textContent = t.hero_title;

    subtitleEl.innerHTML = '';
    const linkEl = document.createElement('a');
    linkEl.href = '#contact';
    linkEl.style.color = '#666';
    linkEl.textContent = t.contact_link;

    subtitleEl.appendChild(document.createTextNode(t.hero_subtitle));
    subtitleEl.appendChild(linkEl);
    subtitleEl.appendChild(document.createTextNode('.'));
}

function updateAbout(t) {
    document.querySelector('.about-section h2').textContent = t.about_title;
    document.querySelector('.about-section p').textContent = t.about_text;
}

function switchLanguage(lang) {
    if (currentLang === lang || isAnimating) return;
    isAnimating = true;

    const contentElements = document.querySelectorAll('[data-lang-content]');
    contentElements.forEach(el => {
        el.classList.add('animating-out');
        el.style.opacity = '0';
        el.style.transform = 'translateY(-10px)';
    });

    updateNavLinks(translations[lang]);

    setTimeout(() => {
        currentLang = lang;
        isAnimating = false;
        
        updateMobileNav(translations[lang]);
        updateHero(translations[lang]);
        updateAbout(translations[lang]);
        updateFooter(translations[lang]);

        contentElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.classList.remove('animating-out');
        });

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }, 300);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
});

const loaderContainer = document.getElementById('loader-container');

function onFontsLoaded() {
    loaderContainer.classList.add('hidden');
    document.body.classList.add('fonts-loaded');
    setTimeout(initScrollAnimations, 100);
}

if ('fonts' in document) {
    Promise.all([
        document.fonts.load('400 16px Inter'),
        document.fonts.load('500 16px Inter'),
        document.fonts.load('600 16px Inter'),
        document.fonts.load('700 16px Inter')
    ]).then(onFontsLoaded).catch(onFontsLoaded);
} else {
    document.fonts.ready.then(onFontsLoaded);
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach(el => observer.observe(el));

    const staggerObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.parentElement.querySelectorAll('.stagger-item');
                items.forEach((item, i) => setTimeout(() => item.classList.add('visible'), i * 100));
                obs.unobserve(entry.target.parentElement);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card-container, .footer-grid').forEach(container => staggerObserver.observe(container));

    const statsObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10);

                let current = 0;
                const increment = numericValue / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        clearInterval(timer);
                        current = numericValue;
                    }
                    let displayVal = Math.floor(current).toString();
                    if (hasPlus) displayVal += '+';
                    if (hasPercent) displayVal += '%';
                    target.textContent = displayVal;
                }, 16);

                obs.unobserve(target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-number').forEach(stat => statsObserver.observe(stat));
}

const cursor = document.getElementById('custom-cursor');
const interactiveElements = document.querySelectorAll('.btn, .big-btn, #logo, .card, .link-item, .stat-item, .footer-column a, .top-nav a');
const buttons = document.querySelectorAll('.btn, .big-btn');

document.addEventListener('keydown', e => {
    if (e.key === 'Tab') document.body.style.setProperty('--show-focus', '1');
});

document.addEventListener('mousedown', () => {
    document.body.style.setProperty('--show-focus', '0');
});

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    const footer = document.querySelector('footer');
    if (footer) {
        const { top, bottom } = footer.getBoundingClientRect();
        cursor.classList.toggle('on-footer', e.clientY >= top && e.clientY <= bottom);
    }
});

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

buttons.forEach(button => {
    button.addEventListener('mousemove', e => {
        const rect = button.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        button.style.setProperty('--mouse-x', `${x}%`);
        button.style.setProperty('--mouse-y', `${y}%`);
    });
    button.addEventListener('mouseleave', () => {
        button.style.setProperty('--mouse-x', '50%');
        button.style.setProperty('--mouse-y', '50%');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href === '#top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const getInTouchBtn = document.querySelector('.big-btn');
const pageOverlay = document.getElementById('page-overlay');
const connectSection = document.querySelector('.footer-column:first-child');

getInTouchBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    pageOverlay.classList.add('active');
    setTimeout(() => {
        connectSection.classList.add('connect-flicker');
        connectSection.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            connectSection.classList.remove('connect-flicker');
            connectSection.classList.add('fade-back');

            setTimeout(() => {
                pageOverlay.classList.remove('active');
                setTimeout(() => {
                    connectSection.classList.remove('fade-back');
                    isAnimating = false;
                }, 800);
            }, 800);
        }, 1500);
    }, 300);
});

document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
    }
});

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    console.log('Mobile menu init:', { mobileMenuBtn, mobileMenu, linksCount: mobileNavLinks.length });

    if (!mobileMenuBtn || !mobileMenu) {
        console.error('Mobile menu elements not found!');
        return;
    }

    function toggleMobileMenu() {
        console.log('Toggle called, current state:', mobileMenu.classList.contains('active'));
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    function closeMobileMenu() {
        console.log('Close called');
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileMenuBtn.addEventListener('click', function(e) {
        console.log('Button clicked');
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });

    mobileNavLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            console.log('Link clicked:', index);
            e.preventDefault();
            const href = this.getAttribute('href');
            closeMobileMenu();
            
            setTimeout(() => {
                if (href === '#top') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const target = document.querySelector(href);
                    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        });
    });

    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && e.target === mobileMenu) {
            closeMobileMenu();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

setTimeout(initMobileMenu, 100);

function updateMobileNav(t) {
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileTexts = [t.nav_home, t.nav_contact];
    mobileLinks.forEach((link, index) => {
        if (index < mobileTexts.length) link.textContent = mobileTexts[index];
    });
}
