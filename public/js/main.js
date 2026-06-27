(function () {
  'use strict';

  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');
  const zipForm = document.getElementById('zip-form');
  const zipMsg = document.querySelector('.service-finder__msg');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header scroll effect
  function handleScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
    updateActiveNav();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.classList.toggle('open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active nav on scroll
  function updateActiveNav() {
    let current = '';
    const offset = 120;

    sections.forEach(function (section) {
      const top = section.offsetTop - offset;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  // Scroll reveal
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

    if (prefersReducedMotion) {
      revealEls.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });

    // Hero content visible immediately
    document.querySelectorAll('.hero .reveal').forEach(function (el) {
      setTimeout(function () { el.classList.add('visible'); }, 100);
    });
  }

  // Animated counters
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    if (prefersReducedMotion) {
      counters.forEach(function (el) {
        el.textContent = el.dataset.count + (el.dataset.suffix || '');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1500;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  // Zip form
  if (zipForm) {
    zipForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = zipForm.querySelector('input');
      const zip = input.value.trim();

      if (!/^\d{5}$/.test(zip)) {
        if (zipMsg) {
          zipMsg.textContent = 'Please enter a valid 5-digit zip code.';
          zipMsg.style.color = '#e74c3c';
          zipMsg.classList.remove('visible');
          void zipMsg.offsetWidth;
          zipMsg.classList.add('visible');
        }
        input.focus();
        return;
      }

      if (zipMsg) {
        zipMsg.textContent = 'Great news — Grove & Sons services your area! Call us to schedule.';
        zipMsg.style.color = '';
        zipMsg.classList.remove('visible');
        void zipMsg.offsetWidth;
        zipMsg.classList.add('visible');
      }
    });
  }

  // Service tile tilt on mouse (desktop only)
  function initTilt() {
    if (prefersReducedMotion || window.innerWidth < 768) return;

    document.querySelectorAll('.service-tile').forEach(function (tile) {
      tile.addEventListener('mousemove', function (e) {
        const rect = tile.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        tile.style.transform = 'translateY(-4px) perspective(400px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 6) + 'deg)';
      });

      tile.addEventListener('mouseleave', function () {
        tile.style.transform = '';
      });
    });
  }

  initReveal();
  initCounters();
  initTilt();
})();
