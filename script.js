// THEME TOGGLE + SCROLL REVEAL + YEAR

function applyTheme(mode) {
  const body = document.body;

  // make sure only one of the classes is applied
  body.classList.remove("theme-dark", "theme-light");
  body.classList.add(mode === "dark" ? "theme-dark" : "theme-light");

  // update icon on all toggles
  document.querySelectorAll(".theme-toggle-icon").forEach((icon) => {
    icon.textContent = mode === "dark" ? "🌙" : "☀️";
  });

  localStorage.setItem("cepui-theme", mode);
}

function initTheme() {
  const stored = localStorage.getItem("cepui-theme");
  const initial = stored === "dark" || stored === "light" ? stored : "light";
  applyTheme(initial);

  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isDark = document.body.classList.contains("theme-dark");
      const next = isDark ? "light" : "dark";
      applyTheme(next);

      // small pulse animation on click
      btn.classList.add("pulse");
      setTimeout(() => btn.classList.remove("pulse"), 220);
    });
  });
}

// Scroll reveal
function setupScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("visible"));
    return;
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

  elements.forEach((el) => observer.observe(el));
}

// Year
function setupYearSpans() {
  const year = String(new Date().getFullYear());
  ["year", "yearAr"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupScrollReveal();
  setupYearSpans();
});
