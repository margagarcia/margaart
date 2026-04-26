/* ========================================
   Marga Garcia — Main JS
   ======================================== */

(function () {
  'use strict';

  // ---- Image protection ----
  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.gallery-img, #lightbox-img, .lightbox-content')) {
      e.preventDefault();
    }
  });
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  // ---- Navigation ----
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  // Shrink nav on scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });

  // Menu toggle (dropdown)
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Contact form → mailto
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      if (!name || !email || !message) return;
      const subject = encodeURIComponent(`Inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:info@margagarcia.com?subject=${subject}&body=${body}`;
    });
  }

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('open')) return;
    if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });

  // Language dropdown
  const langToggle = document.getElementById('lang-toggle');
  const langMenu = document.getElementById('lang-menu');
  if (langToggle && langMenu) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!langMenu.classList.contains('open')) return;
      if (langMenu.contains(e.target) || langToggle.contains(e.target)) return;
      langMenu.classList.remove('open');
    });
  }

  // ---- Lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[index];
    const img = item.querySelector('img');
    // Use the same local image at full resolution
    lightboxImg.src = img.src;
    lightboxImg.alt = item.dataset.title;
    lightboxCaption.textContent = `${item.dataset.title}, ${item.dataset.year}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(direction) {
    currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(i);
    });
  });

  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
  document.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // ---- Fade-in on scroll ----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Animate gallery items in
  galleryItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
    observer.observe(item);
  });

  // Animate about section
  const aboutInner = document.querySelector('.about-inner');
  if (aboutInner) {
    aboutInner.style.opacity = '0';
    aboutInner.style.transform = 'translateY(30px)';
    aboutInner.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(aboutInner);
  }

  // Animate recognitions section
  const recognitionsInner = document.querySelector('.recognitions-inner');
  if (recognitionsInner) {
    recognitionsInner.style.opacity = '0';
    recognitionsInner.style.transform = 'translateY(30px)';
    recognitionsInner.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(recognitionsInner);
  }

  // Animate contact section
  const contactInner = document.querySelector('.contact-inner');
  if (contactInner) {
    contactInner.style.opacity = '0';
    contactInner.style.transform = 'translateY(30px)';
    contactInner.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(contactInner);
  }
})();
