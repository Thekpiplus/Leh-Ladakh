const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const setLang = (lang) => {
  const next = lang === "th" ? "th" : "en";
  document.documentElement.dataset.lang = next;
  document.documentElement.lang = next;
  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.setLang === next));
  });
  const title = document.querySelector("title");
  if (title && title.dataset.titleEn) {
    document.title = next === "th" ? title.dataset.titleTh : title.dataset.titleEn;
  }
  try {
    localStorage.setItem("leh-lang", next);
  } catch (err) {
    /* keep the choice for this visit */
  }
  if (window.LehSeo) window.LehSeo.apply();
};

document.querySelectorAll("[data-set-lang]").forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.setLang));
});

try {
  const saved = localStorage.getItem("leh-lang");
  if (saved === "en" || saved === "th") setLang(saved);
} catch (err) {
  /* start in English */
}

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    document.querySelector(".site-header").classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    const menuLabel = toggle.querySelector(".nav-toggle-label");
    const menuEn = menuLabel.querySelector(".en");
    const menuTh = menuLabel.querySelector(".th");
    if (menuEn && menuTh) {
      menuEn.textContent = open ? "Close" : "Menu";
      menuTh.textContent = open ? "ปิด" : "เมนู";
    }
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });
}
