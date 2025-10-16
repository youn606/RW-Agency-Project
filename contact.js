const navbar = document.getElementById("navbar");
const darkToggle = document.getElementById("darkToggle");
const heroSection = document.getElementById("hero-contact");
const heroTitle = document.querySelector("#hero-contact .hero-text h1");

const heroBackgrounds = {
  light: "/assets/images/jon-tyson-_o0aonObEt8-unsplash.jpg", 
  dark:  "/assets/images/jon-tyson-_o0aonObEt8-unsplash.jpg", 
};

function fileExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function updateHeroBackground(){
  if (!heroSection) return;

  const isDark = document.body.classList.contains("dark-mode");
  const imageUrl = isDark ? heroBackgrounds.dark : heroBackgrounds.light;

  const hasImage = await fileExists(imageUrl);

  const overlayColor = isDark ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.12)";

  let overlayEl = heroSection.querySelector(".overlay");
  if (!overlayEl) {
    overlayEl = document.createElement("div");
    overlayEl.className = "overlay";
    heroSection.appendChild(overlayEl);
  }
  overlayEl.style.background = overlayColor;

  if (hasImage) {
    heroSection.style.backgroundImage = `url("${imageUrl}")`;
  } else {
    console.warn("Hero image introuvable :", imageUrl);
  }
}

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  if (darkToggle) darkToggle.textContent = "☀️";
} else {
  if (darkToggle) darkToggle.textContent = "🌙";
}

updateHeroBackground();

if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const enabled = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");
    darkToggle.textContent = enabled ? "☀️" : "🌙";
    updateHeroBackground();
  });
}

if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

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

document.querySelectorAll("section, .box, footer").forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});

["contactForm", "quoteForm"].forEach((id) => {
  const form = document.getElementById(id);
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Merci ! Votre demande a bien été envoyée.");
      form.reset();
    });
  }
});

function sendMail(){
  let parms = { 
    name : document.getElementById("name").value,
    email : document.getElementById("email").value,
    title : document.getElementById("sujet").value,
    message : document.getElementById("message").value,
  }
  emailjs.send("service_fds5nvo","template_i63a3yn", parms)

}
