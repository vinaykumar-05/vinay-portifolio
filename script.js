// 🌙 Dark/Light Mode
const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  modeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// ⌨️ Typing Effect
const typing = document.querySelector(".typing");
const roles = ["Full-Stack Developer", "AI & ML Enthusiast", "Cybersecurity Learner", "Creative Problem Solver"];
let i = 0, j = 0, isDeleting = false;

function type() {
  let current = roles[i];
  typing.textContent = current.substring(0, j) + (isDeleting ? "" : "|");
  if (!isDeleting && j++ === current.length) {
    isDeleting = true;
    setTimeout(type, 1500);
  } else if (isDeleting && j-- === 0) {
    isDeleting = false;
    i = (i + 1) % roles.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}
type();

// 🧭 Active Navbar
const sections = document.querySelectorAll("section,header");
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) link.classList.add("active");
  });
});

// ✨ Fade-in sections
const faders = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });
faders.forEach(f => observer.observe(f));

// ✨ Fade-in project cards
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach(card => {
  observer.observe(card);
});

// 📧 EmailJS
(function () { emailjs.init("3nWHkDgesFOukxFuV"); })(); // Your Public Key
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  emailjs.send("service_18ic5n8", "template_q1mxo4g", {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  }).then(() => {
    document.getElementById("status").textContent = "✅ Message Sent!";
    document.getElementById("status").style.color = "lightgreen";
    this.reset();
  }, () => {
    document.getElementById("status").textContent = "❌ Failed, try again!";
    document.getElementById("status").style.color = "red";
  });
});

// 🏆 Certifications & Achievements Toggle
const certBtn = document.getElementById("certBtn");
const achieveBtn = document.getElementById("achieveBtn");
const certBox = document.getElementById("certificationsBox");
const achieveBox = document.getElementById("achievementsBox");

certBtn.addEventListener("click", () => {
  certBox.style.display = "flex";
  achieveBox.style.display = "none";
  certBtn.classList.add("active");
  achieveBtn.classList.remove("active");
});

achieveBtn.addEventListener("click", () => {
  certBox.style.display = "none";
  achieveBox.style.display = "flex";
  achieveBtn.classList.add("active");
  certBtn.classList.remove("active");
});
