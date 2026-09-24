/* Reads LEH_SITE and the page id, then sets titles, descriptions,
   keywords, social tags, structured data, story cards, and internal links. */

(function () {
  const site = window.LEH_SITE;
  if (!site || !Array.isArray(site.pages)) return;

  const pageById = new Map(site.pages.map((page) => [page.id, page]));

  const isThai = () => document.documentElement.dataset.lang === "th";
  const text = (value) => (value ? (isThai() ? value.th : value.en) : "");

  const current = () => pageById.get(document.body.dataset.page || "home") || pageById.get("home");

  const hrefFor = (path) => {
    const here = current();
    if (here.path.startsWith("index.html") && path.startsWith("index.html#")) return path.slice("index.html".length);
    if (here.type === "story" && path.startsWith("stories/")) return path.slice("stories/".length);
    return `${"../".repeat(Number(here.depth || 0))}${path}`;
  };

  const siteRoot = () => {
    const url = new URL(location.href);
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length && parts[parts.length - 1].includes(".")) parts.pop();
    let depth = Number(current().depth || 0);
    while (depth > 0 && parts.length) {
      parts.pop();
      depth -= 1;
    }
    return `${url.origin}/${parts.join("/")}${parts.length ? "/" : ""}`;
  };

  const absolute = (path) => {
    if (location.protocol !== "http:" && location.protocol !== "https:") return "";
    const url = new URL(path.split("#")[0], siteRoot());
    url.search = "";
    url.hash = "";
    if (url.pathname.endsWith("/index.html")) url.pathname = url.pathname.slice(0, -10) || "/";
    return url.href;
  };

  const ensureMeta = (selector, create) => {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement("meta");
      Object.entries(create).forEach(([key, value]) => node.setAttribute(key, value));
      document.head.append(node);
    }
    return node;
  };

  const setMeta = (name, content) => {
    const node = ensureMeta(`meta[name="${name}"]`, { name });
    node.setAttribute("content", content);
  };

  const setProperty = (property, content) => {
    const node = ensureMeta(`meta[property="${property}"]`, { property });
    node.setAttribute("content", content);
  };

  const relatedIds = (page) => {
    const stories = site.pages.filter((item) => item.type === "story" && item.id !== page.id).map((item) => item.id);
    const core = ["journey", "houses", "answers", "ask", "days", "with-us"].filter((id) => id !== page.id);
    const ids = page.type === "home" ? ["spirit", "journey", "flying", ...stories, "answers"] : ["spirit", "flying", ...stories, ...core];
    return [...new Set(ids)].filter((id) => pageById.has(id)).slice(0, 6);
  };

  const fillRelated = (page) => {
    const list = document.querySelector("[data-related]");
    if (!list) return;
    list.replaceChildren();
    relatedIds(page).forEach((id) => {
      const target = pageById.get(id);
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = hrefFor(target.path);
      const en = document.createElement("span");
      en.className = "en";
      en.textContent = target.anchor.en;
      const th = document.createElement("span");
      th.className = "th";
      th.textContent = target.anchor.th;
      link.append(en, th);
      item.append(link);
      list.append(item);
    });
  };

  const fillStories = () => {
    const grid = document.querySelector("[data-story-grid]");
    if (!grid) return;
    const have = new Set(
      [...grid.querySelectorAll("a")].map((link) => link.getAttribute("href") || "")
    );
    site.pages
      .filter((item) => item.type === "story")
      .forEach((story) => {
        const href = hrefFor(story.path);
        const known = [...have].some((value) => value === href || value.endsWith(story.path));
        if (known) return;
        const card = document.createElement("a");
        card.className = "story-card";
        card.href = href;
        const label = document.createElement("p");
        label.className = "label";
        label.innerHTML = `<span class="en"></span><span class="th"></span>`;
        label.querySelector(".en").textContent = story.label.en;
        label.querySelector(".th").textContent = story.label.th;
        const heading = document.createElement("h3");
        heading.innerHTML = `<span class="en"></span><span class="th"></span>`;
        heading.querySelector(".en").textContent = story.cardTitle.en;
        heading.querySelector(".th").textContent = story.cardTitle.th;
        const copy = document.createElement("p");
        copy.innerHTML = `<span class="en"></span><span class="th"></span>`;
        copy.querySelector(".en").textContent = story.summary.en;
        copy.querySelector(".th").textContent = story.summary.th;
        card.append(label, heading, copy);
        grid.append(card);
      });
  };

  const crumbItems = (page) => {
    const home = pageById.get("home");
    const items = [{ name: text(home.anchor), path: home.path }];
    if (page.type === "story") {
      const stories = pageById.get("stories");
      items.push({ name: text(stories.anchor), path: stories.path });
    }
    if (page.id !== "home") items.push({ name: text(page.anchor), path: page.path });
    return items;
  };

  const answerNodes = () => [...document.querySelectorAll("#answers .answer")];

  const graphFor = (page) => {
    const originOk = location.protocol === "http:" || location.protocol === "https:";
    const pageUrl = originOk ? absolute(page.path) : undefined;
    const orgId = originOk ? `${location.origin}/#leh-spirit` : "#leh-spirit";
    const imagePath = page.image || pageById.get("home").image;
    const imageUrl = originOk ? absolute(imagePath) : imagePath;
    const homeUrl = originOk ? absolute("index.html") : undefined;

    const organization = {
      "@type": "Organization",
      "@id": orgId,
      name: site.name,
      description: text(pageById.get("home").description),
      url: homeUrl,
      image: originOk ? absolute(pageById.get("home").image) : pageById.get("home").image,
      areaServed: "Ladakh",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Leh",
        addressRegion: "Ladakh",
        addressCountry: "IN",
      },
      contactPoint: [
        { "@type": "ContactPoint", name: "Tashi", telephone: "+91-95968-24268", contactType: "reservations" },
        { "@type": "ContactPoint", name: "Tengeleck", telephone: "+91-88991-14489", contactType: "reservations" },
        { "@type": "ContactPoint", name: "Isara", telephone: "+66-82-635-6266", contactType: "reservations", areaServed: "TH" },
      ],
    };

    const webPage = {
      "@type": page.type === "story" ? "Article" : "WebPage",
      "@id": pageUrl ? `${pageUrl}#page` : undefined,
      url: pageUrl,
      name: text(page.title),
      description: text(page.description),
      keywords: text(page.keywords),
      inLanguage: isThai() ? "th" : "en",
      isPartOf: { "@id": orgId },
      publisher: { "@id": orgId },
      image: imageUrl,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: page.type === "story" ? [".story-deck", ".story-close"] : [".lede", "#spirit .spirit-copy p", "#answers .answer p"],
      },
    };

    if (page.type === "story") {
      webPage.headline = text(page.cardTitle || page.anchor);
      webPage.author = { "@id": orgId };
      webPage.mainEntityOfPage = pageUrl;
    }

    const crumbs = crumbItems(page).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: originOk ? absolute(item.path) : undefined,
    }));

    const graph = [
      organization,
      webPage,
      { "@type": "BreadcrumbList", itemListElement: crumbs },
    ];

    const answers = answerNodes();
    if (answers.length) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: answers.map((node) => ({
          "@type": "Question",
          name: node.querySelector("h3")?.innerText.trim() || "",
          acceptedAnswer: {
            "@type": "Answer",
            text: node.querySelector("p")?.innerText.trim() || "",
          },
        })),
      });
    }

    return { "@context": "https://schema.org", "@graph": graph };
  };

  const writeGraph = (page) => {
    let node = document.getElementById("seo-ld");
    if (!node) {
      node = document.createElement("script");
      node.id = "seo-ld";
      node.type = "application/ld+json";
      document.head.append(node);
    }
    node.textContent = JSON.stringify(graphFor(page));
  };

  const apply = () => {
    const page = current();
    if (!page) return;
    const title = text(page.title);
    const description = text(page.description);
    const keywords = text(page.keywords);
    document.title = title;

    const titleNode = document.querySelector("title");
    if (titleNode) {
      titleNode.dataset.titleEn = page.title.en;
      titleNode.dataset.titleTh = page.title.th;
    }

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", "index, follow");
    setMeta("author", site.name);

    const canonicalHref = absolute(page.path);
    if (canonicalHref) {
      let canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.append(canonical);
      }
      canonical.href = canonicalHref;
      ["en", "th", "x-default"].forEach((lang) => {
        let alt = document.head.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
        if (!alt) {
          alt = document.createElement("link");
          alt.rel = "alternate";
          alt.hreflang = lang;
          document.head.append(alt);
        }
        alt.href = canonicalHref;
      });
    }

    const image = absolute(page.image || pageById.get("home").image);
    setProperty("og:site_name", site.name);
    setProperty("og:type", page.type === "story" ? "article" : "website");
    setProperty("og:title", title);
    setProperty("og:description", description);
    setProperty("og:locale", isThai() ? "th_TH" : "en_US");
    if (image) setProperty("og:image", image);
    if (canonicalHref) setProperty("og:url", canonicalHref);
    setMeta("twitter:card", image ? "summary_large_image" : "summary");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    if (image) setMeta("twitter:image", image);

    fillRelated(page);
    fillStories();
    writeGraph(page);
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
      history.replaceState(null, "", `${location.pathname}${location.search}#top`);
    });
  };

  window.LehSeo = { apply, pages: site.pages };
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
