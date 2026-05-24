/**
 * كتب الهيرو — صور محلية (بدون 404) أو من كتالوج Supabase
 */
(function () {
  const MANIFEST_URL = "assets/books/manifest.json";

  /** لا تُخمَّن مسارات .jpg — تُقرأ فقط من manifest لتجنب 404 */
  const FALLBACK_MANIFEST_PATHS = ["assets/books/Cover-1.jpg.png"];

  function resolveCoverUrl(url, width) {
    if (!url) return "";
    if (window.dmBooks?.bookCoverUrl && url.includes("supabase.co/storage")) {
      return window.dmBooks.bookCoverUrl(url, width || 400);
    }
    return url;
  }

  /** غلاف CSS عند غياب الصورة */
  function buildPlaceholderFace(title, author) {
    const face = document.createElement("div");
    face.className = "book-cover-face book-cover-face--placeholder";
    face.innerHTML = `
      <div class="book-cover-placeholder-inner">
        <i class="fa-solid fa-book" aria-hidden="true"></i>
        <span>${title || ""}</span>
      </div>`;
    return face;
  }

  function buildCoverEl(item, index) {
    const wrap = document.createElement("div");
    wrap.className = "book-cover-3d";
    wrap.style.setProperty("--book-i", String(index));

    const spine = document.createElement("div");
    spine.className = "book-cover-spine";
    spine.setAttribute("aria-hidden", "true");
    wrap.appendChild(spine);

    const face = document.createElement("div");
    face.className = "book-cover-face";
    wrap.appendChild(face);

    if (!item?.src) {
      face.replaceWith(buildPlaceholderFace(item?.alt, ""));
      return wrap;
    }

    const img = document.createElement("img");
    img.alt = item.alt || "";
    img.width = 210;
    img.height = 298;
    img.decoding = "async";
    img.loading = index === 1 ? "eager" : "lazy";
    img.fetchPriority = index === 1 ? "high" : "low";
    img.src = item.src;

    img.addEventListener("error", () => {
      img.remove();
      face.innerHTML = "";
      face.appendChild(buildPlaceholderFace(item.alt, ""));
    });

    face.appendChild(img);
    return wrap;
  }

  function renderStack(items) {
    const stack = document.getElementById("heroBookStack");
    if (!stack) return;
    stack.innerHTML = "";

    const list = (items || []).filter((x) => x).slice(0, 3);
    if (!list.length) {
      stack.innerHTML = `<div class="hero-books-placeholder" aria-hidden="true"><i class="fa-solid fa-book-open"></i></div>`;
      return;
    }

    list.forEach((item, i) => {
      stack.appendChild(buildCoverEl(item, i + 1));
    });
  }

  /** اختبار مسار صورة — أول مسار يعمل يُستخدم (بدون طلبات لملفات غير موجودة في القائمة النهائية) */
  function probeImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      const done = (ok) => {
        img.onload = null;
        img.onerror = null;
        resolve(ok ? url : null);
      };
      img.onload = () => done(true);
      img.onerror = () => done(false);
      img.src = url;
    });
  }

  async function resolveFirstAvailable(paths) {
    for (const p of paths) {
      const ok = await probeImage(p);
      if (ok) return ok;
    }
    return null;
  }

  async function loadManifestPaths() {
    try {
      const res = await fetch(MANIFEST_URL, { cache: "force-cache" });
      if (!res.ok) return FALLBACK_MANIFEST_PATHS;
      const json = await res.json();
      if (Array.isArray(json.covers) && json.covers.length) {
        return [...new Set(json.covers)];
      }
    } catch (err) {
      console.warn("[hero-books] manifest:", err);
    }
    return FALLBACK_MANIFEST_PATHS;
  }

  /** ملء المكدس حتى 3 عناصر — غلاف حقيقي أو placeholder بدون طلب HTTP فاشل */
  function padStackItems(items) {
    const out = [...items];
    while (out.length < 3) {
      out.push({ src: null, alt: "" });
    }
    return out.slice(0, 3);
  }

  async function loadAssetCovers() {
    const allPaths = await loadManifestPaths();
    const found = [];
    const used = new Set();

    for (const path of allPaths) {
      if (found.length >= 3) break;
      if (used.has(path)) continue;
      const ok = await resolveFirstAvailable([path]);
      if (ok && !used.has(ok)) {
        used.add(ok);
        found.push({ src: ok, alt: "" });
      }
    }

    return padStackItems(found);
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
    try {
      const assetCovers = await loadAssetCovers();
      const catalog =
        window.dmBooks?.readPersistentCache?.() || window.dmBooks?.readCache?.() || [];
      const fromDb = coversFromCatalog(catalog);

      const merged = [...assetCovers];
      for (const c of fromDb) {
        if (merged.length >= 3) break;
        if (!merged.some((m) => m.src === c.src)) merged.push(c);
      }

      renderStack(padStackItems(merged));
    } catch (err) {
      console.error("[hero-books] init:", err);
      renderStack([]);
    }
  }

  function updateHeroFromBooks(books) {
    try {
      const fromDb = coversFromCatalog(books);
      if (!fromDb.length) return;

      const stack = document.getElementById("heroBookStack");
      if (!stack) return;

      const existing = stack.querySelectorAll("img").length;
      if (existing >= 3) return;

      renderStack(padStackItems(fromDb));
    } catch (err) {
      console.error("[hero-books] update:", err);
    }
  }

  window.dmHeroBooks = { initHeroBooks, updateHeroFromBooks, renderStack };
})();
