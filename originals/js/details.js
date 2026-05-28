// Translations for Details Page
const translations = {
    ar: {
        pageTitle: "dm | تفاصيل الكتاب",
        navHome: "الرئيسية",
        navCatalog: "كتالوج الكتب",
        navAdmin: "لوحة التحكم",
        btnBack: "العودة للكتالوج",
        loadingText: "جاري تحميل تفاصيل الكتاب...",
        errorText: "لم يتم العثور على هذا الكتاب أو حدث خطأ أثناء التحميل.",
        cartDrawerTitle: "سلة المشتريات",
        wishlistDrawerTitle: "قائمة الأمنيات",
        labelSubtotal: "الإجمالي الفرعي:",
        btnCheckout: "<i class='fa-solid fa-credit-card'></i> إتمام الشراء",
        footerAbout: "بوابتك لعالم المعرفة والقصص الملهمة. نوفر تشكيلة مميزة من الكتب العربية والإنجليزية التي تُثري عقول القراء في جميع أنحاء الوطن العربي.",
        footerQuickLinks: "روابط سريعة",
        footerLinkHome: "الرئيسية",
        footerLinkCatalog: "كتالوج الكتب",
        footerLinkAdmin: "لوحة الأدمن",
        footerCategoriesTitle: "التصنيفات",
        footerContactTitle: "تواصل معنا",
        footerLocation: "القاهرة، جمهورية مصر العربية",
        footerCopyright: "© 2026 مكتبة dm. جميع الحقوق محفوظة.",
        footerCOD: "<i class='fa-solid fa-truck-fast'></i> الدفع عند الاستلام في جميع المحافظات",
        currency: "ج.م",
        addToCart: "إضافة للسلة",
        inStock: "متوفر في المخزن",
        outOfStock: "نفد من المخزن",
        langLabel: "لغة الكتاب",
        categoryLabel: "التصنيف",
        authorLabel: "الكاتب: ",
        arLangName: "العربية",
        enLangName: "الإنجليزية",
        detailsDescTitle: "نبذة عن الكتاب",
        detailsSpecLabel: "تفاصيل إضافية",
        specLanguage: "اللغة",
        specCategory: "التصنيف",
        specAvailability: "التوفر",
        catNovels: "روايات",
        catReligious: "كتب دينية",
        catSelfDevelopment: "تنمية بشرية",
        catChildren: "كتب أطفال",
        catScience: "علوم وتكنولوجيا",
        catHistory: "تاريخ وسير",
        catPolitics: "سياسة",
        catPhilosophy: "فكر وفلسفة",
        catPsychology: "علم نفس",
        catEconomics: "اقتصاد وإدارة",
        catHealth: "صحة وطب",
        discountLabel: "خصم"
    },
    en: {
        pageTitle: "dm | Book Details",
        navHome: "Home",
        navCatalog: "Catalog",
        navAdmin: "Admin",
        btnBack: "Back to Catalog",
        loadingText: "Loading book details...",
        errorText: "Book not found or an error occurred during loading.",
        cartDrawerTitle: "Shopping Cart",
        wishlistDrawerTitle: "My Wishlist",
        labelSubtotal: "Subtotal:",
        btnCheckout: "<i class='fa-solid fa-credit-card'></i> Checkout Now",
        footerAbout: "Your gateway to knowledge and inspiring stories. We offer a curated selection of Arabic and English books that enrich readers across the Arab world.",
        footerQuickLinks: "Quick Links",
        footerLinkHome: "Home",
        footerLinkCatalog: "Catalog",
        footerLinkAdmin: "Admin Board",
        footerCategoriesTitle: "Categories",
        footerContactTitle: "Contact Us",
        footerLocation: "Cairo, Egypt",
        footerCopyright: "© 2026 dm Bookstore. All rights reserved.",
        footerCOD: "<i class='fa-solid fa-truck-fast'></i> Cash on Delivery available nationwide",
        currency: "EGP",
        addToCart: "Add to Cart",
        inStock: "In Stock",
        outOfStock: "Out of Stock",
        langLabel: "Language",
        categoryLabel: "Category",
        authorLabel: "Author: ",
        arLangName: "Arabic",
        enLangName: "English",
        detailsDescTitle: "About the Book",
        detailsSpecLabel: "Book Specifications",
        specLanguage: "Language",
        specCategory: "Category",
        specAvailability: "Availability",
        catNovels: "Novels",
        catReligious: "Religious",
        catSelfDevelopment: "Self-Development",
        catChildren: "Children's Books",
        catScience: "Science & Tech",
        catHistory: "History & Bio",
        catPolitics: "Politics",
        catPhilosophy: "Philosophy",
        catPsychology: "Psychology",
        catEconomics: "Economics & Business",
        catHealth: "Health & Medicine",
        discountLabel: "Discount"
    }
};

function getFinalPrice(book) {
    const price = parseFloat(book.price) || 0;
    const discount = parseInt(book.discount_percentage) || 0;
    if (discount > 0) return price * (1 - discount / 100);
    return price;
}

let currentLang = localStorage.getItem("lang") || "ar";
let bookId = "";
let currentBook = null;
let cart = window.dmStorage ? dmStorage.get("cart", []) : JSON.parse(localStorage.getItem("cart") || "[]");
let wishlist = window.dmStorage ? dmStorage.get("wishlist", []) : JSON.parse(localStorage.getItem("wishlist") || "[]");
let chosenQty = 1;

window.initDetails = function initDetails() {
    // Parse URL parameter (supports router via _dmRouteQueryString)
    var qs = window._dmRouteQueryString != null ? window._dmRouteQueryString : window.location.search;
    var urlParams = new URLSearchParams(qs.replace(/^\?/, ''));
    bookId = urlParams.get("d") && window.dmCrypto ? dmCrypto.decryptParam(urlParams.get("d")) : urlParams.get("id");
    if (!bookId) bookId = urlParams.get("id");

    applyLanguage(currentLang);

    if (bookId) {
        loadBookDetails();
    } else {
        showErrorMsg();
    }

    updateCartCount();
    updateWishlistCount();
    requestAnimationFrame(function () {
        renderCart();
        renderWishlist();
    });
};
document.addEventListener("DOMContentLoaded", window.initDetails);

// Switch Language
function toggleLanguage() {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", currentLang);
    applyLanguage(currentLang);
    if (currentBook) {
        renderBookDetails(currentBook);
    }
    renderCart();
    renderWishlist();
}

function applyLanguage(lang) {
    const t = translations[lang];
    
    // Page Title
    document.title = t.pageTitle;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    
    if (lang === "en") {
        document.body.classList.add("en-mode");
        document.getElementById("langSwitch").innerText = "AR";
        const arrow = document.getElementById("backArrowIcon");
        if (arrow) {
            arrow.className = "fa-solid fa-arrow-left";
        }
    } else {
        document.body.classList.remove("en-mode");
        document.getElementById("langSwitch").innerText = "EN";
        const arrow = document.getElementById("backArrowIcon");
        if (arrow) {
            arrow.className = "fa-solid fa-arrow-right";
        }
    }
    
    const safeSetText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = text;
    };
    
    safeSetText("navHome", t.navHome);
    safeSetText("navCatalog", t.navCatalog);
    safeSetText("navAdmin", t.navAdmin);
    safeSetText("backBtnText", t.btnBack);
    
    safeSetText("cartDrawerTitle", t.cartDrawerTitle);
    safeSetText("wishlistDrawerTitle", t.wishlistDrawerTitle);
    safeSetText("labelSubtotal", t.labelSubtotal);
    safeSetText("btnCheckout", t.btnCheckout);
    
    safeSetText("footerAbout", t.footerAbout);
    safeSetText("footerQuickLinks", t.footerQuickLinks);
    safeSetText("footerLinkHome", t.footerLinkHome);
    safeSetText("footerLinkCatalog", t.footerLinkCatalog);
    safeSetText("footerLinkAdmin", t.footerLinkAdmin);
    safeSetText("footerCategoriesTitle", t.footerCategoriesTitle);
    safeSetText("footerContactTitle", t.footerContactTitle);
    safeSetText("footerLocation", t.footerLocation);
    safeSetText("footerCopyright", t.footerCopyright);
    safeSetText("footerCOD", t.footerCOD);
}

// Load book — show cache instantly, then full record (incl. description)
async function loadBookDetails() {
    try {
        if (window.dmBooks) {
            const cached = window.dmBooks.readCache();
            const hit = cached && cached.find((b) => b.id === bookId);
            if (hit) {
                currentBook = hit;
                renderBookDetails(hit);
            }
        }

        const fetcher = window.dmBooks
            ? () => window.dmBooks.fetchBookById(bookId)
            : async () => {
                const supabase = window.getSupabaseClient();
                const { data, error } = await supabase
                    .from("books")
                    .select("*")
                    .eq("id", bookId)
                    .single();
                if (error) throw error;
                return data;
            };

        const data = await fetcher();
        if (!data) {
            showErrorMsg();
            return;
        }

        currentBook = data;
        renderBookDetails(data);
    } catch (err) {
        console.error("Error fetching book details:", err);
        if (!currentBook) showErrorMsg();
    }
}

function showErrorMsg() {
    const container = document.getElementById("detailsContainer");
    if (!container) return;
    const t = translations[currentLang];
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--danger); padding: 40px;">
        <i class="fa-solid fa-triangle-exclamation fa-3x" style="margin-bottom:12px;"></i>
        <p>${t.errorText}</p>
    </div>`;
}

function renderBookDetails(book) {
    const container = document.getElementById("detailsContainer");
    if (!container) return;
    
    const t = translations[currentLang];
    const inWishlist = wishlist.some(item => item.id === book.id);
    const isAr = book.language === "ar";
    const isOutOfStock = book.in_stock === false;
    
    // Cover Image
    let coverHtml = "";
    if (book.image_url) {
        const src = window.dmBooks
            ? window.dmBooks.bookCoverUrl(book.image_url, 560)
            : book.image_url;
        coverHtml = `<img src="${src}" alt="${book.title}" width="280" height="400" loading="eager" decoding="async">`;
    } else {
        // Fallback Premium Cover
        coverHtml = `
        <div style="width: 260px; height: 380px; background: linear-gradient(135deg, var(--forest-light) 0%, var(--forest) 100%); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 30px; color: #fff; box-shadow: 0 15px 30px rgba(26,18,16,0.3); border-left: 10px solid rgba(255,255,255,0.1); border-radius: 4px 12px 12px 4px;">
            <div style="width: 50px; height: 3px; background: var(--gold); margin-bottom: 20px;"></div>
            <div style="font-size: 26px; font-weight: 800; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4; text-align: center; margin-bottom:16px;">${book.title}</div>
            <div style="font-size: 16px; color: rgba(255,255,255,0.8); text-align: center;">${book.author}</div>
        </div>`;
    }
    
    const categoryLabel = t["cat" + book.category.charAt(0).toUpperCase() + book.category.slice(1).replace("-", "")] || book.category;
    
    container.innerHTML = `
        <div class="details-gallery">
            ${coverHtml}
        </div>
        <div class="details-info">
            <div class="details-meta-top">
                <span class="details-category-tag">${categoryLabel}</span>
            </div>
            
            <h1 class="details-title">${book.title}</h1>
            <div class="details-author">${t.authorLabel}${book.author}</div>
            
            <div class="details-divider"></div>
            
            ${function() {
                const discount = parseInt(book.discount_percentage) || 0;
                if (discount > 0) {
                    const fp = getFinalPrice(book);
                    return `<div class="details-price"><span style="text-decoration:line-through;color:var(--ink-muted);font-size:18px;font-weight:600;margin-left:10px;">${book.price} ${t.currency}</span><span style="color:var(--danger);font-size:28px;">${fp.toFixed(2)}</span> <span>${t.currency}</span> <span class="details-discount-tag"><i class="fa-solid fa-tag"></i> ${t.discountLabel} ${discount}%</span></div>`;
                }
                return `<div class="details-price">${book.price} <span>${t.currency}</span></div>`;
            }()}
            
            <h3 class="details-desc-title">${t.detailsDescTitle}</h3>
            <p class="details-desc">${book.description || (currentLang === "ar" ? "لا يوجد وصف متوفر لهذا الكتاب حالياً." : "No description available for this book.")}</p>
            
            <div class="details-specs">
                <div class="spec-item">
                    <span class="spec-label">${t.specCategory}</span>
                    <span class="spec-val">${categoryLabel}</span>
                </div>
                <div class="spec-item" style="grid-column: span 2;">
                    <span class="spec-label">${t.specAvailability}</span>
                    <span class="spec-val" style="color: ${isOutOfStock ? 'var(--danger)' : 'var(--success)'};">
                        ${isOutOfStock ? t.outOfStock : t.inStock}
                    </span>
                </div>
            </div>
            
            <div class="details-actions">
                ${isOutOfStock ? '' : `
                <div class="quantity-picker">
                    <button class="qty-btn" onclick="updateChosenQty(-1)">-</button>
                    <span class="qty-input" id="chosenQtyText">${chosenQty}</span>
                    <button class="qty-btn" onclick="updateChosenQty(1)">+</button>
                </div>
                
                <button class="btn btn-primary details-buy-btn" onclick="buyBook()">
                    <i class="fa-solid fa-cart-plus"></i> ${t.addToCart}
                </button>
                `}
                
                <button class="details-wishlist-btn ${inWishlist ? 'active' : ''}" onclick="toggleWishlist()" title="${t.wishlistDrawerTitle}">
                    <i class="${inWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                </button>
            </div>
        </div>
    `;
}

function updateChosenQty(delta) {
    chosenQty += delta;
    if (chosenQty < 1) chosenQty = 1;
    const txt = document.getElementById("chosenQtyText");
    if (txt) txt.innerText = chosenQty;
}

function buyBook() {
    if (!currentBook) return;
    
    const finalPrice = getFinalPrice(currentBook);
    
    const existing = cart.find(item => item.id === currentBook.id);
    if (existing) {
        existing.quantity += chosenQty;
    } else {
        cart.push({
            id: currentBook.id,
            quantity: chosenQty,
            title: currentBook.title,
            author: currentBook.author,
            price: finalPrice,
            originalPrice: currentBook.price,
            discount_percentage: currentBook.discount_percentage || 0,
            image_url: currentBook.image_url
        });
    }
    
    if (window.dmStorage) dmStorage.set("cart", cart); else localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
    toggleCartDrawer(true);
    // Reset picker
    chosenQty = 1;
    const txt = document.getElementById("chosenQtyText");
    if (txt) txt.innerText = chosenQty;
}

function toggleWishlist() {
    if (!currentBook) return;
    
    const existingIndex = wishlist.findIndex(item => item.id === currentBook.id);
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
    } else {
        wishlist.push({
            id: currentBook.id,
            title: currentBook.title,
            author: currentBook.author,
            price: currentBook.price,
            image_url: currentBook.image_url
        });
    }
    
    if (window.dmStorage) dmStorage.set("wishlist", wishlist); else localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
    renderWishlist();
    
    // Update button visual state
    const btn = document.querySelector(".details-wishlist-btn");
    if (btn) {
        const inWish = wishlist.some(item => item.id === currentBook.id);
        btn.classList.toggle("active", inWish);
        const icon = btn.querySelector("i");
        if (icon) {
            icon.className = inWish ? "fa-solid fa-heart" : "fa-regular fa-heart";
        }
    }
}

// Drawer Controls
function toggleCartDrawer(open) {
    document.getElementById("cartDrawer").classList.toggle("open", open);
    document.getElementById("cartOverlay").classList.toggle("open", open);
}

function toggleWishlistDrawer(open) {
    document.getElementById("wishlistDrawer").classList.toggle("open", open);
    document.getElementById("wishlistOverlay").classList.toggle("open", open);
}

// Cart Drawer Updates
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartBadge").innerText = count;
}

function updateWishlistCount() {
    document.getElementById("wishlistBadge").innerText = wishlist.length;
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    if (window.dmStorage) dmStorage.set("cart", cart); else localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function updateCartQty(bookId, delta) {
    const item = cart.find(i => i.id === bookId);
    if (!item) return;
    
    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(bookId);
    } else {
        if (window.dmStorage) dmStorage.set("cart", cart); else localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }
}

function renderCart() {
    const container = document.getElementById("cartItemsContainer");
    if (!container) return;
    
    const t = translations[currentLang];
    
    if (cart.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 40px 10px; color: var(--text-light);">
            <i class="fa-solid fa-basket-shopping fa-3x" style="margin-bottom:12px;"></i>
            <p>السلة فارغة حالياً.</p>
        </div>`;
        document.getElementById("cartSubtotal").innerHTML = `0 <span>${t.currency}</span>`;
        return;
    }
    
    let subtotal = 0;
    
    container.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        let coverImgHtml = "";
        if (item.image_url) {
            coverImgHtml = `<img src="${item.image_url}" alt="${item.title}">`;
        } else {
            coverImgHtml = `<div style="width:100%; height:100%; background:var(--forest); display:flex; align-items:center; justify-content:center; color:var(--gold); font-size:16px; font-weight:700;"><i class="fa-solid fa-book-open"></i></div>`;
        }
        
        return `
        <div class="drawer-item">
            <div class="drawer-item-img">
                ${coverImgHtml}
            </div>
            <div class="drawer-item-info">
                <h4 class="drawer-item-title">${item.title}</h4>
                <p class="drawer-item-author">${item.author}</p>
                <div class="drawer-item-price">${item.price} ${t.currency}</div>
                
                <div class="quantity-picker" style="height:32px; margin-top:8px; width:fit-content;">
                    <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)" style="width:28px;">-</button>
                    <span class="qty-input" style="width:30px; font-size:13px; line-height:30px; border:none;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)" style="width:28px;">+</button>
                </div>
            </div>
            <button class="drawer-item-remove" onclick="removeFromCart('${item.id}')" title="حذف">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>`;
    }).join("");
    
    document.getElementById("cartSubtotal").innerHTML = `${subtotal.toFixed(2)} <span>${t.currency}</span>`;
}

function toggleWishlistItem(bookId) {
    const existingIndex = wishlist.findIndex(item => item.id === bookId);
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
    }
    if (window.dmStorage) dmStorage.set("wishlist", wishlist); else localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
    renderWishlist();
    if (currentBook && currentBook.id === bookId) {
        renderBookDetails(currentBook);
    }
}

function renderWishlist() {
    const container = document.getElementById("wishlistItemsContainer");
    if (!container) return;
    
    const t = translations[currentLang];
    
    if (wishlist.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 40px 10px; color: var(--text-light);">
            <i class="fa-regular fa-heart fa-3x" style="margin-bottom:12px;"></i>
            <p>قائمة الأمنيات فارغة.</p>
        </div>`;
        return;
    }
    
    container.innerHTML = wishlist.map(item => {
        let coverImgHtml = "";
        if (item.image_url) {
            coverImgHtml = `<img src="${item.image_url}" alt="${item.title}">`;
        } else {
            coverImgHtml = `<div style="width:100%; height:100%; background:var(--forest); display:flex; align-items:center; justify-content:center; color:var(--gold); font-size:16px; font-weight:700;"><i class="fa-solid fa-book-open"></i></div>`;
        }
        
        return `
        <div class="drawer-item">
            <div class="drawer-item-img">
                ${coverImgHtml}
            </div>
            <div class="drawer-item-info">
                <h4 class="drawer-item-title">${item.title}</h4>
                <p class="drawer-item-author">${item.author}</p>
                <div class="drawer-item-price">${item.price} ${t.currency}</div>
                
                <button class="btn btn-primary" onclick="buyBookFromWishlist('${item.id}')" style="height:28px; padding:0 12px; font-size:12px; margin-top:8px; border-radius:var(--radius-sm);">
                    <i class="fa-solid fa-cart-plus"></i> ${t.addToCart}
                </button>
            </div>
            <button class="drawer-item-remove" onclick="toggleWishlistItem('${item.id}')" title="حذف">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>`;
    }).join("");
}

function buyBookFromWishlist(bookId) {
    const book = wishlist.find(item => item.id === bookId);
    if (!book) return;
    
    const existing = cart.find(item => item.id === bookId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: book.id,
            quantity: 1,
            title: book.title,
            author: book.author,
            price: book.price,
            image_url: book.image_url
        });
    }
    
    if (window.dmStorage) dmStorage.set("cart", cart); else localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
    toggleCartDrawer(true);
}
