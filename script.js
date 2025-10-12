const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 50);
});
const darkToggle = document.getElementById('darkToggle');

if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkToggle.textContent = '☀️';
}

darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
    darkToggle.textContent = '☀️';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    darkToggle.textContent = '🌙';
    localStorage.setItem('darkMode', 'disabled');
  }
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('section, .box, .devis, .contact, footer').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

const hero = document.getElementById('hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const opacity = Math.max(1 - scrollY / 600, 0.5);
    hero.style.opacity = opacity.toFixed(2);
  });
}

window.addEventListener('load', () => {
  const heroText = hero.querySelector('h1');
  const subtitle = hero.querySelector('.subtitle');

  heroText.style.opacity = '0';
  heroText.style.transform = 'translateY(30px)';
  subtitle.style.opacity = '0';
  subtitle.style.transform = 'translateY(30px)';

  setTimeout(() => {
    heroText.style.transition = 'all 1s ease';
    heroText.style.opacity = '1';
    heroText.style.transform = 'translateY(0)';
  }, 300);

  setTimeout(() => {
    subtitle.style.transition = 'all 1s ease';
    subtitle.style.opacity = '1';
    subtitle.style.transform = 'translateY(0)';
  }, 700);
});

document.querySelectorAll('.btn-cta').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.07)';
    btn.style.transition = 'transform 0.25s ease';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });
});
