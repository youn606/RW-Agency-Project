// --- Sélection des éléments ---
const navbar = document.getElementById("navbar");
const darkToggle = document.getElementById("darkToggle");
const heroSection = document.getElementById("hero-contact");
const heroTitle = document.querySelector("#hero-contact h1");

// --- Images de fond uniquement pour le hero ---
const heroBackgrounds = {
  light: "/assets/images/bg-office.jpg",
  dark: "/assets/images/bg-cleaning-dark.jpg",
};

// --- Fonction : mise à jour du fond et de la couleur du titre ---
function updateHeroBackground() {
  const isDark = document.body.classList.contains("dark-mode");

  if (isDark) {
    heroSection.style.backgroundImage = `
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url('${heroBackgrounds.dark}')
    `;
    heroTitle.style.color = "#fff";
  } else {
    heroSection.style.backgroundImage = `
      linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
      url('${heroBackgrounds.light}')
    `;
    heroTitle.style.color = "#0d47a1"; // Bleu foncé R.W Agency
  }
}

// --- Activation du dark mode depuis localStorage ---
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkToggle.textContent = "☀️";
} else {
  darkToggle.textContent = "🌙";
}

// --- Applique l'image du hero au chargement ---
updateHeroBackground();

// --- Bascule dark/light instantanée ---
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    darkToggle.textContent = "☀️";
  } else {
    localStorage.setItem("darkMode", "disabled");
    darkToggle.textContent = "🌙";
  }

  updateHeroBackground();
});

// --- Navbar : effet au scroll ---
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// --- Apparition fluide des sections ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("section, .form-container, footer").forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});

// --- Formulaires (contact + devis) ---
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const quoteForm = document.getElementById("quoteForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Merci ! Votre message a bien été envoyé à R.W Agency.");
      contactForm.reset();
    });
  }

  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Votre demande de devis a bien été transmise. Réponse sous 24h !");
      quoteForm.reset();
    });
  }
});
