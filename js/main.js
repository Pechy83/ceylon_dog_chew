// ─── Page navigation ─────────────────────────────────────────
// ─── Aktivní stránka v menu ──────────────────────────────────
const navLinks = document.querySelectorAll('.nav-link');
const currentPath = window.location.pathname;

navLinks.forEach(link => {
  const linkHref = link.getAttribute('href');
  
  // Kontrola, zda URL odpovídá odkazu (např. ošetření domovské stránky vs podstránek)
  if (currentPath.includes(linkHref)) {
    link.classList.add('active');
  } else if ((currentPath.endsWith('/') || currentPath === '') && linkHref === 'index.html') {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ─── Hamburger ───────────────────────────────────────────────
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

// ─── Spuštění animací po načtení stránky ─────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (typeof triggerReveal === 'function') {
    triggerReveal();
  }
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

/* ── Carousel navigace ── */
(function () {
  const track = document.querySelector('.strip-track');
  const prevBtn = document.querySelector('.strip-prev');
  const nextBtn = document.querySelector('.strip-next');
  if (!track || !prevBtn || !nextBtn) return;

  const scrollAmount = () => {
    const img = track.querySelector('.strip-img');
    return img ? img.offsetWidth + 12 : 300; // šířka obrázku + gap
  };

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
})();