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
  const pageLoader = document.getElementById('page-loader');
  const statsRow = document.getElementById('stats-row');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Premium page load sequence
  function initPageLoad() {
    if (prefersReducedMotion) {
      document.body.classList.add('page-loaded');
      if (pageLoader) pageLoader.classList.add('done');
      return;
    }

    requestAnimationFrame(function () {
      setTimeout(function () {
        document.body.classList.add('page-loaded');
        if (pageLoader) pageLoader.classList.add('done');
      }, 600);
    });
  }

  // Header scroll
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

  function updateActiveNav() {
    let current = '';
    const offset = 120;

    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - offset) {
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
      animateStats();
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');

        if (entry.target.id === 'stats-row') {
          animateStats();
        }

        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // Animated stat counters
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    const counters = document.querySelectorAll('.stat-card__number[data-count]');

    if (prefersReducedMotion) {
      counters.forEach(function (el) {
        el.textContent = el.dataset.count + (el.dataset.suffix || '');
      });
      return;
    }

    counters.forEach(function (el, i) {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const delay = i * 150;
      const start = performance.now() + delay;

      el.classList.add('counting');
      el.textContent = '0' + suffix;

      function tick(now) {
        if (now < start) {
          requestAnimationFrame(tick);
          return;
        }
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.classList.remove('counting');
        }
      }

      requestAnimationFrame(tick);
    });
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

  // Service tile tilt
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

  initPageLoad();
  initReveal();
  initTilt();
})();
