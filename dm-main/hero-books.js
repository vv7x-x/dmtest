/**
 * كتب الهيرو — صور من assets/books أو أحدث كتب من الكتالوج
 */
(function () {
  const MANIFEST_URL = "assets/books/manifest.json";
  const DEFAULT_COVERS = [
    "assets/books/cover-1.jpg",
    "assets/books/cover-2.jpg",
    "assets/books/cover-3.jpg",
  ];

  function resolveCoverUrl(url, width) {
    if (!url) return "";
    if (window.dmBooks?.bookCoverUrl && url.includes("supabase.co/storage")) {
      return window.dmBooks.bookCoverUrl(url, width || 400);
    }
    return url;
  }

  function buildCoverEl(src, alt, index) {
    const wrap = document.createElement("div");
    wrap.className = "book-cover-3d";
    wrap.style.setProperty("--book-i", String(index));
    wrap.innerHTML = `
      <div class="book-cover-spine" aria-hidden="true"></div>
      <div class="book-cover-face">
        <img src="${src}" alt="${alt || ""}" width="210" height="298" loading="${index === 1 ? "eager" : "lazy"}" decoding="async" fetchpriority="${index === 1 ? "high" : "low"}">
      </div>`;
    const img = wrap.querySelector("img");
    img.addEventListener("error", () => wrap.classList.add("book-cover-3d--failed"));
    return wrap;
  }

  function renderStack(urls) {
    const stack = document.getElementById("heroBookStack");
    if (!stack) return;
    stack.innerHTML = "";
    urls.slice(0, 3).forEach((item, i) => {
      if (!item?.src) return;
      stack.appendChild(buildCoverEl(item.src, item.alt, i + 1));
    });
    if (!stack.children.length) {
      stack.innerHTML = `<div class="hero-books-placeholder" aria-hidden="true"><i class="fa-solid fa-book-open"></i></div>`;
    }
  }

  function probeImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  async function loadAssetCovers() {
    let paths = DEFAULT_COVERS;
    try {
      const res = await fetch(MANIFEST_URL, { cache: "force-cache" });
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.covers) && json.covers.length) paths = json.covers;
      }
    } catch {
      /* use defaults */
    }
    const checked = await Promise.all(paths.slice(0, 3).map(probeImage));
    return checked.filter(Boolean).map((src, i) => ({ src, alt: "" }));
  }

  function coversFromCatalog(books) {
    if (!books?.length) return [];
    return books
      .filter((b) => b.image_url)
      .slice(0, 3)
      .map((b) => ({
        src: resolveCoverUrl(b.image_url, 420),
        alt: b.title || "",
      }));
  }

  async function initHeroBooks() {
    const assetCovers = await loadAssetCovers();
    if (assetCovers.length >= 3) {
      renderStack(assetCovers);
      return;
    }
    const catalog = window.dmBooks?.readPersistentCache?.() || window.dmBooks?.readCache?.();
    const fromDb = coversFromCatalog(catalog);
    if (fromDb.length) {
      const merged = [...assetCovers];
      for (const c of fromDb) {
        if (merged.length >= 3) break;
        if (!merged.some((m) => m.src === c.src)) merged.push(c);
      }
      renderStack(merged);
      return;
    }
    if (assetCovers.length) renderStack(assetCovers);
    else renderStack([]);
  }

  function updateHeroFromBooks(books) {
    const stack = document.getElementById("heroBookStack");
    if (!stack) return;
    const hasRealImg = stack.querySelector("img:not([src=''])");
    const failedOnly = stack.querySelectorAll(".book-cover-3d--failed").length;
    if (hasRealImg && failedOnly === 0 && stack.querySelectorAll("img").length >= 3) return;

    const assetCovers = [];
    stack.querySelectorAll("img").forEach((img) => {
      if (img.src && !img.closest(".book-cover-3d--failed") && img.src.includes("/assets/books/")) {
        assetCovers.push({ src: img.src, alt: img.alt });
      }
    });

    const fromDb = coversFromCatalog(books);
    const merged = [...assetCovers];
    for (const c of fromDb) {
      if (merged.length >= 3) break;
      if (!merged.some((m) => m.src === c.src)) merged.push(c);
    }
    if (merged.length) renderStack(merged);
  }

  window.dmHeroBooks = { initHeroBooks, updateHeroFromBooks, renderStack };
})();
