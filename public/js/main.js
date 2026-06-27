(function () {
  'use strict';

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
  const zipForm = document.getElementById('zip-form');
  const zipMsg = document.querySelector('.service-finder__msg');

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

  if (zipForm) {
    zipForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = zipForm.querySelector('input');
      const zip = input.value.trim();

      if (!/^\d{5}$/.test(zip)) {
        if (zipMsg) {
          zipMsg.textContent = 'Please enter a valid 5-digit zip code.';
          zipMsg.style.color = '#e74c3c';
          zipMsg.classList.add('visible');
        }
        return;
      }

      if (zipMsg) {
        zipMsg.textContent = 'Great news — Grove & Sons services your area! Call us to schedule.';
        zipMsg.style.color = '';
        zipMsg.classList.add('visible');
      }
    });
  }
})();
