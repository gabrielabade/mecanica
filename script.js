// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', () => {
  nav.classList.toggle('show');
});

// Close menu when clicking on a link (mobile)
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      nav.classList.remove('show');
    }
  });
});

// Smooth Scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.service-card, .stat-box, .benefit-item, .gallery-item, .blog-card, .about');
  const windowHeight = window.innerHeight;

  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementPosition < windowHeight - elementVisible) {
      element.classList.add('show');
    }
  });
}

// Run animations on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Apenas mostrar uma mensagem de sucesso sem enviar para backend
    alert('Sua solicitação foi registrada com sucesso! Entraremos em contato em breve.');

    // Reset form
    contactForm.reset();
  });
}

// Testimonial Carousel (simple implementation)
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

// Only initialize if we have more than one testimonial and screen is smaller than 992px
function initTestimonialCarousel() {
  if (testimonialCards.length > 1 && window.innerWidth <= 992) {
    // Hide all except first
    testimonialCards.forEach((card, index) => {
      if (index !== 0) {
        card.style.display = 'none';
      }
    });

    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
      testimonialCards[currentTestimonial].style.display = 'none';
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
      testimonialCards[currentTestimonial].style.display = 'block';
    }, 5000);
  } else {
    // Reset display for larger screens
    testimonialCards.forEach(card => {
      card.style.display = 'block';
    });
  }
}

// Initialize carousel and re-initialize on resize
window.addEventListener('load', initTestimonialCarousel);
window.addEventListener('resize', initTestimonialCarousel);

// Active menu item based on scroll position
function setActiveMenu() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveMenu);
window.addEventListener('load', setActiveMenu);