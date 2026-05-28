// Translations for Checkout Page
const translations = {
    ar: {
        pageTitle: "dm | إتمام الشراء",
        navHome: "الرئيسية",
        navCatalog: "كتالوج الكتب",
        navAdmin: "لوحة التحكم",
        btnBack: "العودة للتسوق",
        shippingTitle: "تفاصيل الشحن والتوصيل",
        lblFullName: "الاسم الكامل للعميل *",
        phFullName: "أدخل اسمك ثلاثي أو رباعي",
        lblPhone: "رقم الهاتف (أساسي للتأكيد) *",
        phPhone: "مثال: 01000000000",
        lblGovernorate: "المحافظة *",
        optSelectGov: "اختر المحافظة",
        lblAddress: "العنوان بالتفصيل *",
        phAddress: "الشارع، رقم المبنى، الدور، الشقة",
        lblNotes: "ملاحظات إضافية (اختياري)",
        phNotes: "مواعيد التوصيل المفضلة، علامة مميزة...",
        lblPaymentTitle: "الدفع عند الاستلام (COD)",
        lblPaymentDesc: "ستقوم بالدفع نقداً لمندوب الشحن فور استلام طلبك.",
        btnPlaceOrder: "<i class='fa-solid fa-circle-check'></i> تأكيد الطلب وإرسال",
        summaryTitle: "ملخص طلبك",
        lblSubtotal: "الإجمالي الفرعي:",
        lblShipping: "تكلفة التوصيل:",
        lblTotal: "الإجمالي الكلي:",
        currency: "ج.م",
        successTitle: "تم إرسال طلبك بنجاح!",
        successDesc: "شكراً لتسوقك من dm. لقد تم تسجيل طلبك وسيتواصل معك فريق خدمة العملاء قريباً جداً لتأكيد الشحن وتوصيله إلى عنوانك.",
        successOrderIDLabel: "رقم الطلب (ORDER ID):",
        successHomeBtn: "<i class='fa-solid fa-house'></i> العودة للرئيسية",
        cartEmptyAlert: "سلة المشتريات فارغة! لا يمكن إتمام الشراء.",
        orderSubmitError: "حدث خطأ أثناء إرسال طلبك. يرجى المحاولة لاحقاً.",
        networkError: "عذراً، حدث خطأ في الاتصال بالسيرفر. يرجى المحاولة مرة أخرى.",
        requestTimeout: "انتهت مهلة الاتصال. تحقق من الشبكة وحاول مرة أخرى.",
        submitting: "<i class='fa-solid fa-spinner fa-spin'></i> جاري إرسال الطلب...",
        
        govCairo: "القاهرة",
        govGiza: "الجيزة",
        govAlex: "الإسكندرية",
        govDelta: "الدلتا والقناة (طنطا، المنصورة، السويس...)",
        govUpper: "الصعيد (المنيا، أسيوط، سوهاج...)",
        govRemote: "المناطق النائية (البحر الأحمر، مطروح...)",
        
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
        whatsappNoteTitle: "🎁 عايز تستعجل توصيل طلبك؟ أو تبعت كتاب كهدية (جيفت) لحد؟",
        whatsappNoteDesc: "تواصل معنا عالواتساب عشان نجهز طلبك بسرعة",
        whatsappBtnText: "<i class='fa-brands fa-whatsapp'></i> تواصل عبر واتساب"
    },
    en: {
        pageTitle: "dm | Checkout",
        navHome: "Home",
        navCatalog: "Catalog",
        navAdmin: "Admin",
        btnBack: "Back to Shopping",
        shippingTitle: "Shipping & Delivery Details",
        lblFullName: "Full Name *",
        phFullName: "Enter your full name",
        lblPhone: "Phone Number (for confirmation) *",
        phPhone: "e.g., 01000000000",
        lblGovernorate: "Governorate *",
        optSelectGov: "Select your governorate",
        lblAddress: "Detailed Address *",
        phAddress: "Street name, building, floor, apartment",
        lblNotes: "Additional Notes (optional)",
        phNotes: "Preferred delivery timing, landmarks...",
        lblPaymentTitle: "Cash on Delivery (COD)",
        lblPaymentDesc: "You will pay cash to the shipping representative upon receiving your order.",
        btnPlaceOrder: "<i class='fa-solid fa-circle-check'></i> Confirm & Place Order",
        summaryTitle: "Order Summary",
        lblSubtotal: "Subtotal:",
        lblShipping: "Shipping Cost:",
        lblTotal: "Order Total:",
        currency: "EGP",
        successTitle: "Order Placed Successfully!",
        successDesc: "Thank you for shopping at dm. Your order has been placed. Our customer service team will contact you shortly to confirm and deliver your order.",
        successOrderIDLabel: "ORDER ID:",
        successHomeBtn: "<i class='fa-solid fa-house'></i> Back to Home",
        cartEmptyAlert: "Your shopping cart is empty! Cannot proceed to checkout.",
        orderSubmitError: "An error occurred while placing your order. Please try again.",
        networkError: "Sorry, a server connection error occurred. Please try again.",
        requestTimeout: "The request timed out. Check your connection and try again.",
        submitting: "<i class='fa-solid fa-spinner fa-spin'></i> Placing order...",
        
        govCairo: "Cairo",
        govGiza: "Giza",
        govAlex: "Alexandria",
        govDelta: "Delta & Canal (Tanta, Mansoura, Suez...)",
        govUpper: "Upper Egypt (Minya, Asyut, Sohag...)",
        govRemote: "Remote Areas (Red Sea, Matrouh...)",
        
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
        whatsappNoteTitle: "🎁 Want to expedite your order? Or send a book as a gift?",
        whatsappNoteDesc: "Contact us on WhatsApp to prepare your order quickly",
        whatsappBtnText: "<i class='fa-brands fa-whatsapp'></i> Contact via WhatsApp"
    }
};

let currentLang = localStorage.getItem("lang") || "ar";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let shippingCost = 0;
let cartSubtotal = 0;

// Shipping fees mapping based on select value
const shippingRates = {
    cairo: 50,
    giza: 50,
    alexandria: 60,
    delta: 70,
    upper: 80,
    remote: 100
};

/** مفاتيح ترجمة المحافظات — منفصلة عن منطق الإرسال */
const GOV_LABEL_KEYS = {
    cairo: "govCairo",
    giza: "govGiza",
    alexandria: "govAlex",
    delta: "govDelta",
    upper: "govUpper",
    remote: "govRemote",
};

let submitBtnOriginalHtml = "";
let isSubmittingOrder = false;
let orderSubmitSucceeded = false;

/** مهلة طلب Supabase (مللي ثانية) */
const CHECKOUT_REQUEST_TIMEOUT_MS = 45000;

document.addEventListener("DOMContentLoaded", async () => {
    if (cart.length === 0) {
        alert(translations[currentLang].cartEmptyAlert);
        window.location.href = "index.html";
        return;
    }
    
    applyLanguage(currentLang);
    calculateSubtotal();
    renderSummary();
    calculateShipping();
    await prefillCheckoutFromSession();
});

async function prefillCheckoutFromSession() {
    try {
        const supabase = window.getSupabaseClient && window.getSupabaseClient();
        if (!supabase) return;
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;
        const nameInput = document.getElementById("fullName");
        const { data: profile } = await supabase.from("profiles").select("full_name, phone").eq("id", session.user.id).maybeSingle();
        if (nameInput && !nameInput.value.trim()) {
            nameInput.value = profile?.full_name || session.user.user_metadata?.full_name || "";
        }
        const phoneInput = document.getElementById("phone");
        if (phoneInput && !phoneInput.value.trim() && profile?.phone) {
            phoneInput.value = profile.phone;
        }
    } catch (e) {
        console.warn("prefill checkout", e);
    }
}

// Switch Language
function toggleLanguage() {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", currentLang);
    applyLanguage(currentLang);
    renderSummary();
    calculateShipping();
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
        if (arrow) arrow.className = "fa-solid fa-arrow-left";
    } else {
        document.body.classList.remove("en-mode");
        document.getElementById("langSwitch").innerText = "EN";
        const arrow = document.getElementById("backArrowIcon");
        if (arrow) arrow.className = "fa-solid fa-arrow-right";
    }
    
    // Set text elements
    const safeSetText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = text;
    };
    
    const safeSetPlaceholder = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.placeholder = text;
    };

    safeSetText("navHome", t.navHome);
    safeSetText("navCatalog", t.navCatalog);
    safeSetText("navAdmin", t.navAdmin);
    safeSetText("backBtnText", t.btnBack);
    
    safeSetText("shippingTitle", t.shippingTitle);
    safeSetText("lblFullName", t.lblFullName);
    safeSetPlaceholder("fullName", t.phFullName);
    
    safeSetText("lblPhone", t.lblPhone);
    safeSetPlaceholder("phone", t.phPhone);
    
    safeSetText("lblGovernorate", t.lblGovernorate);
    safeSetText("lblAddress", t.lblAddress);
    safeSetPlaceholder("address", t.phAddress);
    
    safeSetText("lblNotes", t.lblNotes);
    safeSetPlaceholder("notes", t.phNotes);
    
    safeSetText("lblPaymentTitle", t.lblPaymentTitle);
    safeSetText("lblPaymentDesc", t.lblPaymentDesc);
    safeSetText("btnPlaceOrder", t.btnPlaceOrder);
    
    safeSetText("summaryTitle", t.summaryTitle);
    safeSetText("lblSubtotal", t.lblSubtotal);
    safeSetText("lblShipping", t.lblShipping);
    safeSetText("lblTotal", t.lblTotal);
    
    // Translate governorate options
    const govSelect = document.getElementById("governorate");
    if (govSelect) {
        govSelect.options[0].text = t.optSelectGov;
        govSelect.options[1].text = t.govCairo;
        govSelect.options[2].text = t.govGiza;
        govSelect.options[3].text = t.govAlex;
        govSelect.options[4].text = t.govDelta;
        govSelect.options[5].text = t.govUpper;
        govSelect.options[6].text = t.govRemote;
    }
    
    // WhatsApp Note
    safeSetText("whatsappNoteTitle", t.whatsappNoteTitle);
    safeSetText("whatsappNoteDesc", t.whatsappNoteDesc);
    safeSetText("whatsappBtnText", t.whatsappBtnText);

    // Success panel
    safeSetText("successTitle", t.successTitle);
    safeSetText("successDesc", t.successDesc);
    safeSetText("successOrderIDLabel", t.successOrderIDLabel);
    safeSetText("successHomeBtn", t.successHomeBtn);
    
    // Footer
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

function calculateSubtotal() {
    cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function renderSummary() {
    const container = document.getElementById("checkoutSummaryItems");
    if (!container) return;
    
    const t = translations[currentLang];
    
    container.innerHTML = cart.map(item => {
        let coverImgHtml = "";
        if (item.image_url) {
            coverImgHtml = `<img src="${item.image_url}" alt="${item.title}">`;
        } else {
            coverImgHtml = `<div style="width:100%; height:100%; background:var(--primary-dark); display:flex; align-items:center; justify-content:center; color:#fff; font-size:9px; font-weight:700;">dm</div>`;
        }
        
        return `
        <div class="drawer-item" style="border-bottom: 1px solid rgba(18, 53, 36, 0.05); padding-bottom: 12px; margin-bottom: 12px;">
            <div class="drawer-item-img" style="width: 44px; height: 60px;">
                ${coverImgHtml}
            </div>
            <div class="drawer-item-info">
                <h4 class="drawer-item-title" style="font-size: 14px;">${item.title}</h4>
                <p class="drawer-item-author" style="font-size: 12px; margin-bottom:2px;">${item.author}</p>
                <div style="font-size: 13px; font-weight: 700; color: var(--primary-medium);">
                    ${item.quantity} × ${item.price} ${t.currency}
                </div>
            </div>
        </div>`;
    }).join("");
    
    document.getElementById("summarySubtotal").innerText = `${cartSubtotal.toFixed(2)} ${t.currency}`;
}

function calculateShipping() {
    const govSelect = document.getElementById("governorate");
    const selectedGov = govSelect.value;
    const t = translations[currentLang];
    
    shippingCost = shippingRates[selectedGov] || 0;
    
    document.getElementById("summaryShipping").innerText = `${shippingCost} ${t.currency}`;
    
    const total = cartSubtotal + shippingCost;
    document.getElementById("summaryTotal").innerText = `${total.toFixed(2)} ${t.currency}`;
}

/* ═══════════════════════════════════════════════════════════════
   منطق الطلب — منفصل عن عرض الواجهة (Separation of Concerns)
   ═══════════════════════════════════════════════════════════════ */

/** الحصول على عميل Supabase أو رمي خطأ واضح */
function getCheckoutClient() {
    const client = window.getSupabaseClient && window.getSupabaseClient();
    if (!client || !client.from) {
        throw new Error(
            currentLang === "ar"
                ? "تعذر الاتصال بالخادم. حدّث الصفحة وحاول مرة أخرى."
                : "Cannot connect to server. Refresh and try again."
        );
    }
    return client;
}

/** هل الخطأ من نوع FetchError (فشل الشبكة / CORS / السيرفر لا يرد) */
function isFetchError(err) {
    if (!err) return false;
    const name = err.name || err.constructor?.name || "";
    if (name === "FetchError") return true;
    const str = String(err.message || err);
    return str.includes("FetchError") || str.includes("Failed to fetch");
}

/** توحيد الأخطاء — Supabase أحياناً يرمي Object وليس Error */
function normalizeCheckoutError(err) {
    const t = translations[currentLang];

    if (!err) {
        return new Error(t.orderSubmitError);
    }

    if (isFetchError(err)) {
        return new Error(t.networkError);
    }

    if (err instanceof Error && err.message) {
        return err;
    }

    const name = err.name || "SupabaseError";
    const msg = String(
        err.message || err.msg || err.error_description || err.details || err.hint || ""
    ).trim();
    const status = err.status || err.statusCode || err.httpStatus;

    if (status && Number(status) >= 400) {
        const httpErr = new Error(msg || `${t.orderSubmitError} (HTTP ${status})`);
        httpErr.status = status;
        httpErr.code = err.code;
        return httpErr;
    }

    if (typeof err === "object") {
        const wrapped = new Error(msg || JSON.stringify(err));
        wrapped.name = name;
        wrapped.code = err.code;
        wrapped.status = status;
        wrapped.details = err.details;
        return wrapped;
    }

    return new Error(String(err));
}

/**
 * تنفيذ طلب Supabase مع مهلة — أي رد فيه error أو HTTP غير ناجح يُرمى كـ Exception
 */
async function runCheckoutRequest(label, requestFn) {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
            const t = translations[currentLang];
            reject(new Error(t.requestTimeout));
        }, CHECKOUT_REQUEST_TIMEOUT_MS);
    });

    try {
        const result = await Promise.race([requestFn(), timeoutPromise]);
        clearTimeout(timeoutId);

        if (result && typeof result === "object" && "error" in result && result.error) {
            throw normalizeCheckoutError(result.error);
        }

        return result;
    } catch (err) {
        clearTimeout(timeoutId);
        const normalized = normalizeCheckoutError(err);
        normalized.checkoutStep = label;
        throw normalized;
    }
}

/** إعادة زر الإرسال لحالته الطبيعية */
function resetSubmitButton() {
    isSubmittingOrder = false;
    setSubmitLoading(false);
}

/** معالجة الفشل: console + تنبيه + إعادة الزر */
function handleCheckoutFailure(err, context) {
    const normalized = normalizeCheckoutError(err);
    const friendly = parseCheckoutError(normalized);

    console.error(`[Checkout] فشل (${context || "submit"}):`, normalized);
    console.error("[Checkout] تفاصيل الخطأ:", {
        name: normalized.name,
        message: normalized.message,
        code: normalized.code,
        status: normalized.status,
        step: normalized.checkoutStep,
        raw: err,
    });

    showCheckoutMessage(friendly, "error");
    alert(friendly);
    resetSubmitButton();
}

/** تحويل أخطاء Supabase / الشبكة إلى رسالة مفهومة للمستخدم */
function parseCheckoutError(err) {
    const t = translations[currentLang];
    const normalized = normalizeCheckoutError(err);

    if (isFetchError(normalized) || isFetchError(err)) {
        return t.networkError;
    }

    if (normalized.message === t.requestTimeout) {
        return t.requestTimeout;
    }

    const code = normalized.code || err?.code || err?.error_code || "";
    const msg = String(normalized.message || "").trim();
    const details = String(normalized.details || err?.details || err?.hint || "").trim();
    const status = normalized.status || err?.status;
    const combined = `${msg} ${details}`.toLowerCase();

    if (status && Number(status) >= 400) {
        return currentLang === "ar"
            ? `رفض السيرفر الطلب (${status}). ${msg || t.orderSubmitError}`
            : `Server rejected the request (${status}). ${msg || t.orderSubmitError}`;
    }

    const mapAr = {
        invalid_customer_name: "يرجى إدخال اسم العميل (حرفان على الأقل).",
        invalid_phone: "يرجى إدخال رقم هاتف صحيح.",
        invalid_governorate: "يرجى اختيار المحافظة.",
        invalid_address: "يرجى إدخال العنوان بالتفصيل.",
        empty_cart: "السلة فارغة. أضف كتباً قبل إتمام الشراء.",
        book_unavailable: "أحد الكتب في السلة لم يعد متوفراً. حدّث السلة وحاول مرة أخرى.",
        "42501": "صلاحيات قاعدة البيانات تمنع إتمام الطلب. شغّل supabase/checkout-fix.sql في SQL Editor.",
        "23503": "أحد الكتب في السلة لم يعد متوفراً. حدّث السلة وحاول مرة أخرى.",
        "23505": "طلب مكرر. حاول مرة أخرى بعد لحظات.",
        PGRST301: "انتهت الجلسة أو مفتاح API غير صالح.",
        "Failed to fetch": t.networkError,
        fetcherror: t.networkError,
        request_timeout: t.requestTimeout,
        "No data returned": "لم يُرجع السيرفر رقم الطلب. شغّل سكربت checkout-fix.sql.",
    };

    if (currentLang === "ar") {
        for (const [key, arMsg] of Object.entries(mapAr)) {
            if (code === key || combined.includes(key.toLowerCase())) return arMsg;
        }
        if (msg.includes("JWT") || msg.includes("API key")) {
            return "إعدادات Supabase غير صحيحة. راجع مفتاح المشروع.";
        }
        return msg || t.orderSubmitError;
    }

    return msg || details || t.orderSubmitError;
}

/** تنبيه داخل الصفحة (بديل أو مكمّل لـ alert) */
function showCheckoutMessage(text, type) {
    const el = document.getElementById("checkoutMessage");
    if (!el) {
        if (text) alert(text);
        return;
    }
    if (!text) {
        el.hidden = true;
        el.textContent = "";
        return;
    }
    el.textContent = text;
    el.className = "auth-message" + (type ? ` auth-message--${type}` : "");
    el.hidden = false;
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/** تفعيل / إيقاف حالة تحميل زر الإرسال — تُستدعى دائماً في finally */
function setSubmitLoading(loading) {
    const submitBtn = document.getElementById("btnPlaceOrder");
    if (!submitBtn) return;

    const t = translations[currentLang];

    if (loading) {
        if (!submitBtnOriginalHtml) submitBtnOriginalHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.setAttribute("aria-busy", "true");
        submitBtn.innerHTML = t.submitting;
    } else {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
        submitBtn.innerHTML = submitBtnOriginalHtml || t.btnPlaceOrder;
    }
}

function getGovernorateLabel(code) {
    const t = translations[currentLang];
    const key = GOV_LABEL_KEYS[code];
    return key && t[key] ? t[key] : code;
}

/** التحقق من الحقول قبل الإرسال */
function validateCheckoutForm() {
    const t = translations[currentLang];
    const fullName = document.getElementById("fullName")?.value.trim() || "";
    const phone = document.getElementById("phone")?.value.trim() || "";
    const governorate = document.getElementById("governorate")?.value || "";
    const address = document.getElementById("address")?.value.trim() || "";

    if (!cart.length) {
        return { ok: false, message: t.cartEmptyAlert };
    }
    if (fullName.length < 2) {
        return {
            ok: false,
            message: currentLang === "ar" ? "يرجى إدخال الاسم الكامل." : "Please enter your full name.",
        };
    }
    if (phone.length < 8) {
        return {
            ok: false,
            message: currentLang === "ar" ? "يرجى إدخال رقم هاتف صحيح." : "Please enter a valid phone number.",
        };
    }
    if (!governorate) {
        return {
            ok: false,
            message: currentLang === "ar" ? "يرجى اختيار المحافظة." : "Please select a governorate.",
        };
    }
    if (!shippingRates[governorate]) {
        return {
            ok: false,
            message: currentLang === "ar" ? "محافظة غير صالحة." : "Invalid governorate.",
        };
    }
    if (address.length < 5) {
        return {
            ok: false,
            message: currentLang === "ar" ? "يرجى إدخال العنوان بالتفصيل." : "Please enter your full address.",
        };
    }

    return {
        ok: true,
        data: { fullName, phone, governorate, address, notes: document.getElementById("notes")?.value.trim() || "" },
    };
}

/** بناء payload الطلب */
function buildOrderPayload(formData, session) {
    return {
        user_id: session?.user?.id || null,
        customer_name: formData.fullName,
        customer_phone: formData.phone,
        customer_email: session?.user?.email || null,
        governorate: getGovernorateLabel(formData.governorate),
        address: formData.address,
        notes: formData.notes,
        total_price: Number((cartSubtotal + shippingCost).toFixed(2)),
        shipping_cost: shippingCost,
        status: "pending",
        items: cart.map((item) => ({
            book_id: item.id,
            quantity: item.quantity,
            price: item.price,
        })),
    };
}

/** الطريقة المفضلة: RPC آمن (يتجاوز مشكلة RLS على SELECT بعد INSERT للضيف) */
async function placeOrderViaRpc(supabase, payload) {
    const { data } = await runCheckoutRequest("place_order RPC", () =>
        supabase.rpc("place_order", {
            p_customer_name: payload.customer_name,
            p_customer_phone: payload.customer_phone,
            p_customer_email: payload.customer_email,
            p_governorate: payload.governorate,
            p_address: payload.address,
            p_notes: payload.notes || "",
            p_total_price: payload.total_price,
            p_shipping_cost: payload.shipping_cost,
            p_user_id: payload.user_id,
            p_items: payload.items,
        })
    );

    const orderId = data?.order_id || data?.orderId;
    if (!orderId) {
        throw new Error("No order_id returned from place_order RPC");
    }
    return String(orderId);
}

/** احتياطي: إدراج مباشر (قد يفشل SELECT للضيف بدون backend-fix.sql) */
async function placeOrderDirect(supabase, payload) {
    const orderResult = await runCheckoutRequest("insert order", () =>
        supabase
            .from("orders")
            .insert([
                {
                    user_id: payload.user_id,
                    customer_name: payload.customer_name,
                    customer_phone: payload.customer_phone,
                    customer_email: payload.customer_email,
                    governorate: payload.governorate,
                    address: payload.address,
                    notes: payload.notes,
                    total_price: payload.total_price,
                    shipping_cost: payload.shipping_cost,
                    status: payload.status,
                },
            ])
            .select("id")
    );

    const orderData = orderResult.data;
    if (!orderData?.length) {
        throw new Error("No data returned from order insertion.");
    }

    const orderId = orderData[0].id;
    const orderItems = payload.items.map((item) => ({
        order_id: orderId,
        book_id: item.book_id,
        quantity: item.quantity,
        price: item.price,
    }));

    await runCheckoutRequest("insert order_items", () =>
        supabase.from("order_items").insert(orderItems)
    );

    return String(orderId);
}

async function createOrder(payload) {
    const supabase = getCheckoutClient();

    try {
        return await placeOrderViaRpc(supabase, payload);
    } catch (rpcErr) {
        const normalized = normalizeCheckoutError(rpcErr);
        const rpcMsg = String(normalized.message || normalized.code || "").toLowerCase();
        const rpcMissing =
            rpcMsg.includes("place_order") ||
            rpcMsg.includes("function") ||
            rpcMsg.includes("does not exist") ||
            normalized.code === "42883";

        if (!rpcMissing) throw normalized;

        console.warn("[Checkout] place_order RPC غير متاح، محاولة الإدراج المباشر:", normalized);
        return await placeOrderDirect(supabase, payload);
    }
}

function showCheckoutSuccess(orderId) {
    const successIdEl = document.getElementById("successOrderID");
    if (successIdEl) successIdEl.innerText = orderId;

    const formState = document.getElementById("checkoutFormState");
    const successState = document.getElementById("checkoutSuccessState");
    if (formState) formState.style.display = "none";
    if (successState) successState.style.display = "block";

    document.getElementById("checkoutMain")?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
        window.location.href = `pages/order-confirmation.html?order=${encodeURIComponent(orderId)}`;
    }, 1800);
}

/** تنفيذ إرسال الطلب — try/catch/finally + إعادة الزر عند أي فشل */
async function submitOrder() {
    if (isSubmittingOrder) return;

    orderSubmitSucceeded = false;
    showCheckoutMessage("");

    const validation = validateCheckoutForm();
    if (!validation.ok) {
        showCheckoutMessage(validation.message, "error");
        return;
    }

    isSubmittingOrder = true;
    setSubmitLoading(true);

    try {
        const supabase = getCheckoutClient();

        const sessionResult = await runCheckoutRequest("auth.getSession", () =>
            supabase.auth.getSession()
        );
        const session = sessionResult?.data?.session || null;

        const payload = buildOrderPayload(validation.data, session);
        const orderId = await createOrder(payload);

        localStorage.removeItem("cart");
        cart = [];
        orderSubmitSucceeded = true;
        showCheckoutSuccess(orderId);
    } catch (err) {
        handleCheckoutFailure(err, "submitOrder");
    } finally {
        if (!orderSubmitSucceeded) {
            resetSubmitButton();
        }
    }
}

/**
 * غلاف النموذج — يمنع Uncaught (in promise) عند استخدام async مع onsubmit
 */
async function handleCheckoutSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    try {
        await submitOrder();
    } catch (err) {
        handleCheckoutFailure(err, "handleCheckoutSubmit");
    }

    return false;
}

/** شبكة أمان: أي Promise مرفوض على صفحة الدفع يُعالج ولا يعلق الزر */
window.addEventListener("unhandledrejection", (event) => {
    if (!/\/checkout\.html$/i.test(location.pathname)) return;

    const btn = document.getElementById("btnPlaceOrder");
    const stillLoading = isSubmittingOrder || btn?.disabled;

    if (!stillLoading) return;

    console.error("[Checkout] unhandledrejection:", event.reason);
    event.preventDefault();
    handleCheckoutFailure(event.reason, "unhandledrejection");
});

window.handleCheckoutSubmit = handleCheckoutSubmit;
window.submitOrder = submitOrder;
window.resetSubmitButton = resetSubmitButton;
