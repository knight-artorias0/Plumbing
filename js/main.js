(function () {
  'use strict';

  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
  const faqItems = document.querySelectorAll('.faq-item');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.querySelector('.form-success');

  // Header scroll effect
  function handleScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isOpen);
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

  // FAQ accordion
  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Form validation
  function validateField(field) {
    const group = field.closest('.form-group');
    const errorEl = group.querySelector('.form-error');
    let valid = true;
    let message = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
      valid = false;
      message = 'This field is required.';
    } else if (field.type === 'email' && field.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(field.value.trim())) {
        valid = false;
        message = 'Please enter a valid email address.';
      }
    } else if (field.type === 'tel' && field.value.trim()) {
      const phonePattern = /^[\d\s\-().+]{7,}$/;
      if (!phonePattern.test(field.value.trim())) {
        valid = false;
        message = 'Please enter a valid phone number.';
      }
    }

    if (valid) {
      group.classList.remove('has-error');
      field.classList.remove('error');
      if (errorEl) errorEl.textContent = '';
    } else {
      group.classList.add('has-error');
      field.classList.add('error');
      if (errorEl) errorEl.textContent = message;
    }

    return valid;
  }

  if (contactForm) {
    const fields = contactForm.querySelectorAll('input, select, textarea');

    fields.forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let allValid = true;
      fields.forEach(function (field) {
        if (!validateField(field)) {
          allValid = false;
        }
      });

      if (allValid) {
        contactForm.reset();
        if (formSuccess) {
          formSuccess.classList.add('visible');
          setTimeout(function () {
            formSuccess.classList.remove('visible');
          }, 5000);
        }
      }
    });
  }
})();
