/* Updates titles and social tags when the language changes.
   Page copy, links, and structured data live in the HTML. */

(function () {
  const isThai = () => document.documentElement.dataset.lang === "th";

  const setContent = (selector, value) => {
    const node = document.head.querySelector(selector);
    if (node && value) node.setAttribute("content", value);
  };

  const apply = () => {
    const title = document.querySelector("title");
    if (title && title.dataset.titleEn) {
      document.title = isThai() ? title.dataset.titleTh : title.dataset.titleEn;
    }

    const description = document.querySelector('meta[name="description"]');
    if (description && description.dataset.en) {
      const text = isThai() ? description.dataset.th : description.dataset.en;
      description.setAttribute("content", text);
      setContent('meta[property="og:description"]', text);
      setContent('meta[name="twitter:description"]', text);
    }

    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords && keywords.dataset.en) {
      keywords.setAttribute("content", isThai() ? keywords.dataset.th : keywords.dataset.en);
    }

    setContent('meta[property="og:title"]', document.title);
    setContent('meta[name="twitter:title"]', document.title);
    setContent('meta[property="og:locale"]', isThai() ? "th_TH" : "en_US");
  };

  const watchTop = () => {
    const link = document.querySelector(".to-top");
    if (!link) return;
    const sync = () => {
      const long = document.documentElement.scrollHeight > window.innerHeight + 240;
      link.classList.toggle("is-on", long && window.scrollY > 480);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      window.scrollTo({ top: 0, behavior: motion });
      history.replaceState(null, "", `${location.pathname}#top`);
    });
  };

  window.LehSeo = { apply };
  const start = () => {
    apply();
    watchTop();
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
