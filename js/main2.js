// ─── Page navigation ─────────────────────────────────────────
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');

function navigateTo(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) target.classList.add('active');

  navLinks.forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile menu
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('burger').classList.remove('open');

  // Trigger reveal animations on new page
  setTimeout(triggerReveal, 100);
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});

// ─── Hamburger ───────────────────────────────────────────────
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// ─── Sticky nav ──────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('main-nav').classList.toggle('scrolled', window.scrollY > 40);
});

// ─── Scroll reveal ───────────────────────────────────────────
function triggerReveal() {
  const items = document.querySelectorAll('.page.active .reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add('visible');
        observer.unobserve(el.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });
}
triggerReveal();

// ─── Form submit ─────────────────────────────────────────────
function submitForm() {
  const email = document.getElementById('email').value.trim();
  const fname = document.getElementById('fname').value.trim();
  if (!fname || !email) {
    alert('Please enter at least your name and email address.');
    return;
  }
  document.getElementById('form-success').classList.add('show');
  // Reset fields
  ['fname','lname','company','email','message'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('country').selectedIndex = 0;
  document.getElementById('enq-type').selectedIndex = 0;
  document.getElementById('volume').selectedIndex = 0;
}

// ─── Hero entrance animation ─────────────────────────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-content > *').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity .7s .${i*12 + 10}s cubic-bezier(.25,.46,.45,.94), transform .7s .${i*12 + 10}s cubic-bezier(.25,.46,.45,.94)`;
    setTimeout(() => {
      el.style.opacity = '';
      el.style.transform = '';
    }, 80);
  });
});
