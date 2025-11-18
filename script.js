function applyTheme(mode) {
  const body = document.body;
  body.classList.remove("theme-light", "theme-dark");
  body.classList.add(mode === "dark" ? "theme-dark" : "theme-light");

  document.querySelectorAll(".toggle-label").forEach((el) => {
    el.textContent = mode === "dark" ? "Dark" : "Light";
  });

  localStorage.setItem("cepui-theme", mode);
}

function initTheme() {
  const stored = localStorage.getItem("cepui-theme");
  const preferred =
    stored ||
    (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  applyTheme(preferred);

  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next =
        document.body.classList.contains("theme-dark") ? "light" : "dark";
      applyTheme(next);
    });
  });
}

function setupScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => obs.observe(el));
}

function markActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path) link.classList.add("is-active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-ready");
  initTheme();
  setupScrollReveal();
  markActiveNav();
});
