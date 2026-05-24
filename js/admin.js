// Translations for Admin Page
const translations = {
    ar: {
        pageTitle: "dm | لوحة تحكم الأدمن",
        navHome: "الرئيسية",
        navCatalog: "كتالوج الكتب",
        navAdmin: "لوحة التحكم",
        loginTitle: "تسجيل دخول المشرف",
        lblAdminEmail: "البريد الإلكتروني *",
        lblAdminPassword: "كلمة المرور *",
        btnLoginSubmit: "<i class='fa-solid fa-right-to-bracket'></i> تسجيل الدخول",
        sidebarTitle: "لوحة التحكم dm",
        btnTabOrdersText: "الطلبات الواردة",
        btnTabBooksText: "إدارة الكتب",
        btnTabGovText: "المحافظات والشحن",
        btnAdminLogoutText: "تسجيل الخروج",
        ordersPaneTitle: "الطلبات الواردة",
        ordersCount: "العدد الإجمالي: ",
        thCustomerName: "العميل",
        thPhone: "رقم الهاتف",
        thGov: "المحافظة",
        thDate: "التاريخ",
        thTotal: "الإجمالي",
        thStatus: "الحالة",
        thActions: "إجراءات",
        govPaneTitle: "إدارة المحافظات وأسعار الشحن",
        govCount: "عدد المحافظات: ",
        btnAddGovText: "إضافة محافظة",
        addGovModalTitle: "إضافة محافظة جديدة",
        lblGovNameAr: "اسم المحافظة (عربي) *",
        lblGovNameEn: "اسم المحافظة (English) *",
        lblGovShipping: "سعر التوصيل (ج.م) *",
        btnCancelGov: "إلغاء",
        btnSubmitGov: "حفظ",
        thGovName: "المحافظة",
        thGovShipping: "سعر التوصيل (ج.م)",
        thGovCities: "عدد المدن",
        thGovActions: "إجراءات",
        citySectionTitle: "مدن ومراكز ",
        btnAddCityText: "إضافة مدينة",
        addCityModalTitle: "إضافة مدينة / مركز",
        lblCityNameAr: "الاسم (عربي) *",
        lblCityNameEn: "الاسم (English) *",
        btnCancelCity: "إلغاء",
        btnSubmitCity: "حفظ",
        thCityName: "المدينة / المركز",
        thCityActions: "حذف",
        govDeleteConfirm: "هل أنت متأكد من حذف هذه المحافظة وجميع مدنها؟",
        cityDeleteConfirm: "هل أنت متأكد من حذف هذه المدينة؟",
        govShippingUpdated: "تم تحديث سعر التوصيل بنجاح",
        booksPaneTitle: "إدارة الكتب",
        btnAddBookBtn: "إضافة كتاب جديد",
        thBookCover: "الغلاف",
        thBookTitle: "عنوان الكتاب",
        thBookAuthor: "الكاتب",
        thBookCat: "التصنيف",
        thBookLang: "اللغة",
        thBookPrice: "السعر",
        thBookStock: "التوفر",
        thBookActions: "حذف",
        addBookModalTitle: "إضافة كتاب جديد",
        lblBookTitleInput: "عنوان الكتاب *",
        lblBookAuthorInput: "اسم الكاتب *",
        lblBookPriceInput: "سعر البيع (ج.م) *",
        lblBookCategoryInput: "التصنيف *",
        lblBookLanguageInput: "اللغة *",
        lblBookDescInput: "وصف الكتاب / نبذة",
        lblBookCoverUpload: "صورة الغلاف *",
        uploadPromptText: "اضغط هنا لاختيار صورة الغلاف أو اسحبها هنا",
        btnCancelBook: "إلغاء",
        btnSubmitBook: "حفظ وإضافة",
        btnUpdateBook: "حفظ التعديلات",
        editBookModalTitle: "تعديل الكتاب",
        addBookModalTitle2: "إضافة كتاب جديد",
        btnEditBook: "تعديل",
        bookUpdatedSuccess: "تم تحديث الكتاب بنجاح ✅",
        bookUpdatedError: "فشل تحديث الكتاب",
        bookAddedSuccess: "تمت إضافة الكتاب بنجاح ✅",
        validationRequired: "يرجى ملء جميع الحقول المطلوبة.",
        validationImageType: "يُسمح فقط بصور JPG و PNG و WebP.",
        validationImageSize: "حجم الصورة يجب ألا يتجاوز 5 ميجابايت.",
        currentCoverLabel: "الغلاف الحالي:",
        coverNotChanged: "(لن يتم تغيير الغلاف ما لم تختر صورة جديدة)",
        orderDetailsModalTitle: "تفاصيل الطلب",
        orderCustInfoTitle: "بيانات العميل",
        lblDetName: "الاسم:",
        lblDetPhone: "الهاتف:",
        lblDetGov: "المحافظة:",
        lblDetAddress: "العنوان:",
        lblDetNotes: "ملاحظات:",
        orderStatusTitle: "حالة الطلب",
        lblDetStatusSelect: "تحديث الحالة:",
        lblDetDate: "تاريخ الطلب:",
        orderItemsTitle: "الكتب المطلوبة",
        thDetBookTitle: "الكتاب",
        thDetQty: "الكمية",
        thDetUnitPrice: "سعر الوحدة",
        thDetSubtotal: "الإجمالي",
        lblDetSubtotalPrice: "إجمالي الكتب:",
        lblDetShippingPrice: "تكلفة الشحن:",
        lblDetTotalPrice: "الإجمالي الكلي:",
        btnDeleteOrder: "<i class='fa-solid fa-trash-can'></i> حذف الطلب نهائياً",
        btnSaveOrderDet: "إغلاق",
        currency: "ج.م",
        loading: "جاري التحميل...",
        saving: "جاري الحفظ...",
        deleteConfirm: "هل أنت متأكد من حذف هذا الطلب نهائياً؟",
        bookDeleteConfirm: "هل أنت متأكد من حذف هذا الكتاب نهائياً؟",
        noSearchResults: "لا توجد نتائج مطابقة للبحث.",
        noOrdersToExport: "لا توجد طلبات لتصديرها.",
        
        statusPending: "قيد الانتظار",
        statusProcessing: "جاري التجهيز",
        statusCompleted: "تم التوصيل",
        statusCancelled: "ملغي",
        
        catNovels: "روايات",
        catReligious: "كتب دينية",
        catSelfDevelopment: "تنمية بشرية",
        catChildren: "كتب أطفال",
        catScience: "علوم وتكنولوجيا",
        catHistory: "تاريخ وسير",
        
        arLangName: "العربية",
        enLangName: "الإنجليزية",
        inStock: "متوفر",
        outOfStock: "غير متوفر",
        
        footerAbout: "بوابتك لعالم المعرفة والقصص الملهمة. نوفر تشكيلة مميزة من الكتب العربية والإنجليزية التي تُثري عقول القراء في جميع أنحاء الوطن العربي.",
        footerQuickLinks: "روابط سريعة",
        footerLinkHome: "الرئيسية",
        footerLinkCatalog: "كتالوج الكتب",
        footerLinkAdmin: "لوحة الأدمن",
        footerCategoriesTitle: "التصنيفات",
        footerContactTitle: "تواصل معنا",
        footerLocation: "القاهرة، جمهورية مصر العربية",
        footerCopyright: "© 2026 مكتبة dm. جميع الحقوق محفوظة.",
        footerCOD: "<i class='fa-solid fa-truck-fast'></i> الدفع عند الاستلام في جميع المحافظات"
    },
    en: {
        pageTitle: "dm | Admin Dashboard",
        navHome: "Home",
        navCatalog: "Catalog",
        navAdmin: "Admin Dashboard",
        loginTitle: "Admin Sign In",
        lblAdminEmail: "Email Address *",
        lblAdminPassword: "Password *",
        btnLoginSubmit: "<i class='fa-solid fa-right-to-bracket'></i> Login",
        sidebarTitle: "dm Control Panel",
        btnTabOrdersText: "Incoming Orders",
        btnTabBooksText: "Manage Books",
        btnTabGovText: "Governorates & Shipping",
        btnAdminLogoutText: "Logout",
        ordersPaneTitle: "Incoming Orders",
        ordersCount: "Total Orders: ",
        thCustomerName: "Customer",
        thPhone: "Phone",
        thGov: "Governorate",
        thDate: "Date",
        thTotal: "Total",
        thStatus: "Status",
        thActions: "Actions",
        govPaneTitle: "Governorates & Shipping Management",
        govCount: "Governorates: ",
        btnAddGovText: "Add Governorate",
        addGovModalTitle: "Add New Governorate",
        lblGovNameAr: "Name (Arabic) *",
        lblGovNameEn: "Name (English) *",
        lblGovShipping: "Shipping Cost (EGP) *",
        btnCancelGov: "Cancel",
        btnSubmitGov: "Save",
        thGovName: "Governorate",
        thGovShipping: "Shipping Cost (EGP)",
        thGovCities: "Cities Count",
        thGovActions: "Actions",
        citySectionTitle: "Cities & Districts of ",
        btnAddCityText: "Add City",
        addCityModalTitle: "Add City / District",
        lblCityNameAr: "Name (Arabic) *",
        lblCityNameEn: "Name (English) *",
        btnCancelCity: "Cancel",
        btnSubmitCity: "Save",
        thCityName: "City / District",
        thCityActions: "Delete",
        govDeleteConfirm: "Are you sure you want to delete this governorate and all its cities?",
        cityDeleteConfirm: "Are you sure you want to delete this city?",
        govShippingUpdated: "Shipping cost updated successfully",
        booksPaneTitle: "Books Management",
        btnAddBookBtn: "Add New Book",
        thBookCover: "Cover",
        thBookTitle: "Title",
        thBookAuthor: "Author",
        thBookCat: "Category",
        thBookLang: "Language",
        thBookPrice: "Price",
        thBookStock: "Availability",
        thBookActions: "Delete",
        addBookModalTitle: "Add New Book",
        lblBookTitleInput: "Book Title *",
        lblBookAuthorInput: "Author Name *",
        lblBookPriceInput: "Sale Price (EGP) *",
        lblBookCategoryInput: "Category *",
        lblBookLanguageInput: "Language *",
        lblBookDescInput: "Book Description",
        lblBookCoverUpload: "Cover Image *",
        uploadPromptText: "Click to upload cover image or drag & drop",
        btnCancelBook: "Cancel",
        btnSubmitBook: "Save Book",
        btnUpdateBook: "Save Changes",
        editBookModalTitle: "Edit Book",
        addBookModalTitle2: "Add New Book",
        btnEditBook: "Edit",
        bookUpdatedSuccess: "Book updated successfully ✅",
        bookUpdatedError: "Failed to update book",
        bookAddedSuccess: "Book added successfully ✅",
        validationRequired: "Please fill all required fields.",
        validationImageType: "Only JPG, PNG & WebP images are allowed.",
        validationImageSize: "Image size must not exceed 5MB.",
        currentCoverLabel: "Current cover:",
        coverNotChanged: "(Cover won't change unless you pick a new image)",
        orderDetailsModalTitle: "Order Details",
        orderCustInfoTitle: "Customer Info",
        lblDetName: "Name:",
        lblDetPhone: "Phone:",
        lblDetGov: "Governorate:",
        lblDetAddress: "Address:",
        lblDetNotes: "Notes:",
        orderStatusTitle: "Order Status",
        lblDetStatusSelect: "Update Status:",
        lblDetDate: "Ordered At:",
        orderItemsTitle: "Books Ordered",
        thDetBookTitle: "Book",
        thDetQty: "Qty",
        thDetUnitPrice: "Unit Price",
        thDetSubtotal: "Subtotal",
        lblDetSubtotalPrice: "Books Total:",
        lblDetShippingPrice: "Shipping Fee:",
        lblDetTotalPrice: "Grand Total:",
        btnDeleteOrder: "<i class='fa-solid fa-trash-can'></i> Delete Order Permanently",
        btnSaveOrderDet: "Close",
        currency: "EGP",
        loading: "Loading...",
        saving: "Saving...",
        deleteConfirm: "Are you sure you want to permanently delete this order?",
        bookDeleteConfirm: "Are you sure you want to permanently delete this book?",
        noSearchResults: "No results match your search.",
        noOrdersToExport: "No orders available to export.",
        
        statusPending: "Pending",
        statusProcessing: "Processing",
        statusCompleted: "Completed",
        statusCancelled: "Cancelled",
        
        catNovels: "Novels",
        catReligious: "Religious",
        catSelfDevelopment: "Self-Development",
        catChildren: "Children's Books",
        catScience: "Science & Tech",
        catHistory: "History & Bio",
        
        arLangName: "Arabic",
        enLangName: "English",
        inStock: "In Stock",
        outOfStock: "Out of Stock",
        
        footerAbout: "Your gateway to knowledge and inspiring stories. We offer a curated selection of Arabic and English books that enrich readers across the Arab world.",
        footerQuickLinks: "Quick Links",
        footerLinkHome: "Home",
        footerLinkCatalog: "Catalog",
        footerLinkAdmin: "Admin Board",
        footerCategoriesTitle: "Categories",
        footerContactTitle: "Contact Us",
        footerLocation: "Cairo, Egypt",
        footerCopyright: "© 2026 dm Bookstore. All rights reserved.",
        footerCOD: "<i class='fa-solid fa-truck-fast'></i> Cash on Delivery available nationwide"
    }
};

let currentLang = localStorage.getItem("lang") || "ar";
let activeTab = "orders";
let currentOrders = [];
let currentBooks = [];
let currentGovernorates = [];
let currentCities = [];
let selectedGovId = null;
let selectedOrderId = null;
let preparedCoverBlob = null;
let preparedCoverPreviewUrl = null;
let editingBookId = null;

function getSb() {
    const client = window.getSupabaseClient && window.getSupabaseClient();
    if (!client || !client.auth) {
        throw new Error("Supabase client not ready");
    }
    return client;
}

/** تنفيذ طلب Supabase عبر طبقة الحماية — يرمي خطأً واضحاً عند الفشل */
async function adminRun(label, requestFn) {
    if (window.dmApiGuard?.runRequest) {
        return window.dmApiGuard.runRequest(label, requestFn);
    }
    const result = await requestFn();
    if (result?.error) throw result.error;
    return result;
}

/** رسالة تنبيهية أعلى محتوى لوحة التحكم */
function showAdminDashboardAlert(text, type) {
    let el = document.getElementById("adminDashboardAlert");
    if (!el) {
        el = document.createElement("div");
        el.id = "adminDashboardAlert";
        el.setAttribute("role", "alert");
        el.className = "admin-dashboard-alert";
        const content = document.querySelector(".admin-content");
        if (content) content.prepend(el);
    }
    if (!el) return;
    if (!text) {
        el.hidden = true;
        el.textContent = "";
        return;
    }
    el.textContent = text;
    el.className = "admin-dashboard-alert" + (type ? ` admin-dashboard-alert--${type}` : "");
    el.hidden = false;
}

function showAdminToast(message, type) {
    const toast = document.getElementById("adminToast");
    const msgEl = document.getElementById("adminToastMessage");
    if (!toast || !msgEl) return;
    msgEl.textContent = message;
    toast.className = "admin-toast" + (type ? ` admin-toast--${type}` : "");
    toast.hidden = false;
    setTimeout(() => { toast.hidden = true; }, 4000);
}

function hideAdminToast() {
    const toast = document.getElementById("adminToast");
    if (toast) toast.hidden = true;
}

function showAdminLoginMessage(text, type) {
    const el = document.getElementById("adminLoginMessage");
    if (!el) {
        if (text) alert(text);
        return;
    }
    el.textContent = text || "";
    el.className = "admin-login-message" + (type ? ` admin-login-message--${type}` : "");
    el.hidden = !text;
}

document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(currentLang);
    checkAuthSession();
});

// Switch Language
function toggleLanguage() {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", currentLang);
    applyLanguage(currentLang);
    
    const dash = document.getElementById("adminDashboardState");
    if (dash && dash.style.display !== "none") {
        if (activeTab === "orders") {
            filterOrders(); // Re-render with active filters
        } else {
            filterBooks(); // Re-render with active filters
        }
    }
}

function applyLanguage(lang) {
    const t = translations[lang];
    
    document.title = t.pageTitle;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    
    const langSwitch = document.getElementById("langSwitch");
    if (lang === "en") {
        document.body.classList.add("en-mode");
        if (langSwitch) langSwitch.innerText = "AR";
    } else {
        document.body.classList.remove("en-mode");
        if (langSwitch) langSwitch.innerText = "EN";
    }
    
    const safeSetText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = text;
    };

    safeSetText("navHome", t.navHome);
    safeSetText("navCatalog", t.navCatalog);
    safeSetText("navAdmin", t.navAdmin);
    
    safeSetText("loginTitle", t.loginTitle);
    safeSetText("lblAdminEmail", t.lblAdminEmail);
    safeSetText("lblAdminPassword", t.lblAdminPassword);
    safeSetText("btnLoginSubmit", t.btnLoginSubmit);
    
    safeSetText("sidebarTitle", t.sidebarTitle);
    safeSetText("btnTabOrdersText", t.btnTabOrdersText);
    safeSetText("btnTabBooksText", t.btnTabBooksText);
    safeSetText("btnTabGovText", t.btnTabGovText);
    safeSetText("btnAdminLogoutText", t.btnAdminLogoutText);
    
    safeSetText("ordersPaneTitle", t.ordersPaneTitle);
    safeSetText("thCustomerName", t.thCustomerName);
    safeSetText("thPhone", t.thPhone);
    safeSetText("thGov", t.thGov);
    safeSetText("thDate", t.thDate);
    safeSetText("thTotal", t.thTotal);
    safeSetText("thStatus", t.thStatus);
    safeSetText("thActions", t.thActions);
    
    safeSetText("govPaneTitle", t.govPaneTitle);
    safeSetText("btnAddGovText", t.btnAddGovText);
    safeSetText("addGovModalTitle", t.addGovModalTitle);
    safeSetText("lblGovNameAr", t.lblGovNameAr);
    safeSetText("lblGovNameEn", t.lblGovNameEn);
    safeSetText("lblGovShipping", t.lblGovShipping);
    safeSetText("btnCancelGov", t.btnCancelGov);
    safeSetText("btnSubmitGov", t.btnSubmitGov);
    safeSetText("thGovName", t.thGovName);
    safeSetText("thGovShipping", t.thGovShipping);
    safeSetText("thGovCities", t.thGovCities);
    safeSetText("thGovActions", t.thGovActions);
    safeSetText("citySectionTitle", t.citySectionTitle);
    safeSetText("btnAddCityText", t.btnAddCityText);
    safeSetText("addCityModalTitle", t.addCityModalTitle);
    safeSetText("lblCityNameAr", t.lblCityNameAr);
    safeSetText("lblCityNameEn", t.lblCityNameEn);
    safeSetText("btnCancelCity", t.btnCancelCity);
    safeSetText("btnSubmitCity", t.btnSubmitCity);
    safeSetText("thCityName", t.thCityName);
    safeSetText("thCityActions", t.thCityActions);
    
    safeSetText("booksPaneTitle", t.booksPaneTitle);
    safeSetText("btnAddBookBtn", t.btnAddBookBtn);
    safeSetText("btnAddBookBtn2", t.btnAddBookBtn);
    safeSetText("thBookCover", t.thBookCover);
    safeSetText("thBookTitle", t.thBookTitle);
    safeSetText("thBookAuthor", t.thBookAuthor);
    safeSetText("thBookCat", t.thBookCat);
    safeSetText("thBookLang", t.thBookLang);
    safeSetText("thBookPrice", t.thBookPrice);
    safeSetText("thBookStock", t.thBookStock);
    safeSetText("thBookActions", t.thBookActions);
    
    safeSetText("addBookModalTitle", t.addBookModalTitle);
    safeSetText("lblBookTitleInput", t.lblBookTitleInput);
    safeSetText("lblBookAuthorInput", t.lblBookAuthorInput);
    safeSetText("lblBookPriceInput", t.lblBookPriceInput);
    safeSetText("lblBookCategoryInput", t.lblBookCategoryInput);
    safeSetText("lblBookLanguageInput", t.lblBookLanguageInput);
    safeSetText("lblBookDescInput", t.lblBookDescInput);
    safeSetText("lblBookCoverUpload", t.lblBookCoverUpload);
    safeSetText("uploadPromptText", t.uploadPromptText);
    safeSetText("btnCancelBook", t.btnCancelBook);
    safeSetText("btnSubmitBook", t.btnSubmitBook);
    
    safeSetText("orderDetailsModalTitle", t.orderDetailsModalTitle);
    safeSetText("orderCustInfoTitle", t.orderCustInfoTitle);
    safeSetText("lblDetName", t.lblDetName);
    safeSetText("lblDetPhone", t.lblDetPhone);
    safeSetText("lblDetGov", t.lblDetGov);
    safeSetText("lblDetAddress", t.lblDetAddress);
    safeSetText("lblDetNotes", t.lblDetNotes);
    safeSetText("orderStatusTitle", t.orderStatusTitle);
    safeSetText("lblDetStatusSelect", t.lblDetStatusSelect);
    safeSetText("lblDetDate", t.lblDetDate);
    safeSetText("orderItemsTitle", t.orderItemsTitle);
    safeSetText("thDetBookTitle", t.thDetBookTitle);
    safeSetText("thDetQty", t.thDetQty);
    safeSetText("thDetUnitPrice", t.thDetUnitPrice);
    safeSetText("thDetSubtotal", t.thDetSubtotal);
    safeSetText("lblDetSubtotalPrice", t.lblDetSubtotalPrice);
    safeSetText("lblDetShippingPrice", t.lblDetShippingPrice);
    safeSetText("lblDetTotalPrice", t.lblDetTotalPrice);
    safeSetText("btnDeleteOrder", t.btnDeleteOrder);
    safeSetText("btnSaveOrderDet", t.btnSaveOrderDet);
    
    const catSelect = document.getElementById("bookCategoryInput");
    if (catSelect) {
        catSelect.options[0].text = t.catNovels;
        catSelect.options[1].text = t.catReligious;
        catSelect.options[2].text = t.catSelfDevelopment;
        catSelect.options[3].text = t.catChildren;
        catSelect.options[4].text = t.catScience;
        catSelect.options[5].text = t.catHistory;
    }
}

async function checkAuthSession() {
    let sb;
    try {
        sb = getSb();
        const { data: { session }, error } = await sb.auth.getSession();
        if (error) throw error;
        await handleAdminSession(session);
    } catch (err) {
        const msg = window.dmApiGuard?.normalizeError
            ? window.dmApiGuard.normalizeError(err).message
            : currentLang === "ar"
              ? "تعذر الاتصال بقاعدة البيانات. تأكد من إعداد Supabase."
              : "Database connection failed.";
        console.error("[admin] checkAuthSession:", err);
        showAdminLoginMessage(msg, "error");
        toggleUIState(false);
        return;
    }

    // معالجة تغيّر الجلسة — منع Uncaught (in promise) الذي يُفرغ اللوحة
    sb.auth.onAuthStateChange((_event, session) => {
        handleAdminSession(session).catch((err) => {
            console.error("[admin] onAuthStateChange:", err);
            const normalized = window.dmApiGuard?.normalizeError
                ? window.dmApiGuard.normalizeError(err)
                : err;
            showAdminDashboardAlert(normalized.message, "error");
            if (window.dmApiGuard?.isFetchError?.(err)) {
                toggleUIState(false);
                showAdminLoginMessage(normalized.message, "error");
            }
        });
    });
}

async function handleAdminSession(session) {
    try {
        showAdminDashboardAlert("");
        if (!session) {
            toggleUIState(false);
            return;
        }
        const isAdmin = await checkIfAdmin(session.user.id);
        if (!isAdmin) {
            const msg =
                currentLang === "ar"
                    ? "هذا الحساب غير مخوّل."
                    : "Unauthorized access.";
            showAdminLoginMessage(msg, "error");
            try {
                await getSb().auth.signOut();
            } catch (e) {
                console.warn("[admin] signOut:", e);
            }
            toggleUIState(false);
            return;
        }
        showAdminLoginMessage("");
        toggleUIState(true);
    } catch (err) {
        const normalized = window.dmApiGuard?.normalizeError
            ? window.dmApiGuard.normalizeError(err)
            : err;
        console.error("[admin] handleAdminSession:", normalized);
        showAdminLoginMessage(normalized.message, "error");
        toggleUIState(false);
    }
}

async function checkIfAdmin(uid) {
    if (!uid) return false;
    const sb = getSb();

    const { data: rpcOk } = await adminRun("admin.check_is_admin", () => sb.rpc("check_is_admin"));
    if (rpcOk === true) return true;

    const { data: adminRow } = await adminRun("admin.admin_users", () =>
        sb.from("admin_users").select("user_id").eq("user_id", uid).maybeSingle()
    );
    if (adminRow) return true;

    const { data: profile } = await adminRun("admin.profiles", () =>
        sb.from("profiles").select("is_admin").eq("id", uid).maybeSingle()
    );
    return !!profile?.is_admin;
}

function toggleUIState(isLoggedIn) {
    const loginEl = document.getElementById("adminLoginState");
    const dashEl = document.getElementById("adminDashboardState");
    if (!loginEl || !dashEl) return;

    if (isLoggedIn) {
        loginEl.style.display = "none";
        dashEl.style.display = "grid";
        switchTab(activeTab);
    } else {
        loginEl.style.display = "block";
        dashEl.style.display = "none";
        showAdminDashboardAlert("");
    }
}

async function loginAdmin(e) {
    e.preventDefault();
    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const loginBtn = document.getElementById("btnLoginSubmit");
    const t = translations[currentLang];
    
    const originalBtn = loginBtn.innerHTML;
    loginBtn.disabled = true;
    loginBtn.innerHTML = t.loading;
    
    try {
        showAdminLoginMessage("");
        const sb = getSb();
        const { data } = await adminRun("admin.signIn", () =>
            sb.auth.signInWithPassword({ email, password })
        );

        const isAdmin = await checkIfAdmin(data.user?.id);
        if (!isAdmin) {
            await sb.auth.signOut();
            showAdminLoginMessage(
                currentLang === "ar"
                    ? "الحساب ليس مشرفاً."
                    : "Not an admin account.",
                "error"
            );
            return;
        }
        await handleAdminSession(data.session);
    } catch (err) {
        const normalized = window.dmApiGuard?.normalizeError
            ? window.dmApiGuard.normalizeError(err)
            : err;
        console.error("[admin] login:", normalized);
        const msg = String(normalized.message || "").includes("Invalid login")
            ? currentLang === "ar"
                ? "البريد أو كلمة المرور غير صحيحة."
                : "Invalid email or password."
            : normalized.message ||
              (currentLang === "ar" ? "فشل تسجيل الدخول." : "Login failed.");
        showAdminLoginMessage(msg, "error");
    } finally {
        loginBtn.disabled = false;
        loginBtn.innerHTML = originalBtn;
    }
}

async function logoutAdmin() {
    try { await getSb().auth.signOut(); } catch (err) {}
}

function switchTab(tab) {
    activeTab = tab;
    document.getElementById("tabBtnOrders").classList.toggle("active", tab === "orders");
    document.getElementById("tabBtnBooks").classList.toggle("active", tab === "books");
    document.getElementById("tabBtnGovernorates").classList.toggle("active", tab === "governorates");
    document.getElementById("paneOrders").style.display = tab === "orders" ? "block" : "none";
    document.getElementById("paneBooks").style.display = tab === "books" ? "block" : "none";
    document.getElementById("paneGovernorates").style.display = tab === "governorates" ? "block" : "none";
    
    if (tab === "orders") loadOrders();
    else if (tab === "books") loadBooks();
    else if (tab === "governorates") loadGovernorates();
}

// ---------------------------
// قسم الطلبات والفلترة والتصدير
// ---------------------------

async function loadOrders() {
    const tbody = document.getElementById("ordersTableBody");
    const t = translations[currentLang];
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;">${t.loading}</td></tr>`;
    showAdminDashboardAlert("");

    try {
        const { data } = await adminRun("admin.orders.list", () =>
            getSb().from("orders").select("*").order("created_at", { ascending: false })
        );
        currentOrders = data || [];
        filterOrders();
    } catch (err) {
        const normalized = window.dmApiGuard?.normalizeError
            ? window.dmApiGuard.normalizeError(err)
            : err;
        console.error("[admin] loadOrders:", normalized);
        const msg =
            normalized.message ||
            (currentLang === "ar" ? "خطأ في تحميل الطلبات." : "Failed to load orders.");
        showAdminDashboardAlert(msg, "error");
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--danger);">${msg}</td></tr>`;
    }
}

function filterOrders() {
    const searchInput = document.getElementById("searchOrdersInput")?.value.toLowerCase() || "";
    const statusFilter = document.getElementById("filterOrderStatus")?.value || "all";

    const filtered = currentOrders.filter(order => {
        const matchesSearch = (order.customer_name && order.customer_name.toLowerCase().includes(searchInput)) || 
                              (order.customer_phone && order.customer_phone.includes(searchInput));
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    renderOrdersTable(filtered);
}

function renderOrdersTable(ordersToRender = currentOrders) {
    const tbody = document.getElementById("ordersTableBody");
    const countEl = document.getElementById("ordersCount");
    const t = translations[currentLang];
    
    countEl.innerText = `${t.ordersCount}${ordersToRender.length}`;
    
    if (ordersToRender.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--ink-muted); padding:20px;">${t.noSearchResults}</td></tr>`;
        return;
    }
    
    tbody.innerHTML = ordersToRender.map(order => {
        const orderDate = new Date(order.created_at).toLocaleDateString(currentLang === "ar" ? "ar-EG" : "en-US", {
            year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
        });
        
        let statusClass = "status-pending";
        let statusText = t.statusPending;
        if (order.status === "processing") { statusClass = "status-processing"; statusText = t.statusProcessing; } 
        else if (order.status === "completed") { statusClass = "status-completed"; statusText = t.statusCompleted; } 
        else if (order.status === "cancelled") { statusClass = "status-cancelled"; statusText = t.statusCancelled; }
        
        const totalCost = parseFloat(order.total_price) || 0;
        
        return `
        <tr>
            <td style="font-weight:700;">${order.customer_name}</td>
            <td><a href="tel:${order.customer_phone}">${order.customer_phone}</a></td>
            <td>${order.governorate}</td>
            <td style="font-size:13px; color:var(--ink-muted);">${orderDate}</td>
            <td style="font-weight:800; color:var(--gold);">${totalCost.toFixed(2)} ${t.currency}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <button class="btn btn-secondary" style="padding:6px 12px; font-size:13px;" onclick="openOrderDetailsModal('${order.id}')">
                    <i class="fa-solid fa-eye"></i> تفاصيل
                </button>
            </td>
        </tr>`;
    }).join("");
}

function exportOrdersToCSV() {
    const t = translations[currentLang];
    if (currentOrders.length === 0) {
        alert(t.noOrdersToExport);
        return;
    }

    const headers = [t.thCustomerName, t.thPhone, t.thGov, t.thDate, t.thTotal, t.thStatus];
    let csvContent = "\uFEFF" + headers.join(",") + "\n"; // BOM لدعم اللغة العربية في إكسيل

    // Use currently filtered orders if search is active, otherwise all orders
    const searchInput = document.getElementById("searchOrdersInput")?.value.toLowerCase() || "";
    const statusFilter = document.getElementById("filterOrderStatus")?.value || "all";
    const filteredOrders = currentOrders.filter(order => {
        const matchesSearch = (order.customer_name && order.customer_name.toLowerCase().includes(searchInput)) || 
                              (order.customer_phone && order.customer_phone.includes(searchInput));
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    filteredOrders.forEach(order => {
        const orderDate = new Date(order.created_at).toLocaleDateString(currentLang === "ar" ? "ar-EG" : "en-US", {
            year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
        });
        
        let statusText = t.statusPending;
        if (order.status === "processing") statusText = t.statusProcessing;
        else if (order.status === "completed") statusText = t.statusCompleted;
        else if (order.status === "cancelled") statusText = t.statusCancelled;

        const row = [
            `"${order.customer_name}"`,
            `"${order.customer_phone}"`,
            `"${order.governorate}"`,
            `"${orderDate}"`,
            `"${order.total_price || 0}"`,
            `"${statusText}"`
        ];
        csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `dm_orders_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ---------------------------
// قسم المحافظات والمدن والشحن
// ---------------------------

async function loadGovernorates() {
    const tbody = document.getElementById("governoratesTableBody");
    const t = translations[currentLang];
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">${t.loading}</td></tr>`;
    showAdminDashboardAlert("");

    try {
        const { data } = await adminRun("admin.governorates.list", () =>
            getSb().from("governorates").select("*").order("sort_order", { ascending: true })
        );
        currentGovernorates = data || [];
        renderGovernorates();
    } catch (err) {
        const normalized = window.dmApiGuard?.normalizeError
            ? window.dmApiGuard.normalizeError(err)
            : err;
        console.error("[admin] loadGovernorates:", normalized);
        const msg =
            normalized.message ||
            (currentLang === "ar" ? "خطأ في تحميل المحافظات." : "Failed to load governorates.");
        showAdminDashboardAlert(msg, "error");
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--danger);">${msg}</td></tr>`;
    }
}

function renderGovernorates() {
    const tbody = document.getElementById("governoratesTableBody");
    const countEl = document.getElementById("govCount");
    const t = translations[currentLang];
    if (!tbody) return;

    countEl.innerText = `${t.govCount}${currentGovernorates.length}`;

    if (currentGovernorates.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--ink-muted); padding:20px;">${t.noSearchResults}</td></tr>`;
        return;
    }

    tbody.innerHTML = currentGovernorates.map(gov => {
        const cityCount = currentCities.filter(c => c.governorate_id === gov.id).length;
        const isSelected = selectedGovId === gov.id;
        return `
        <tr class="${isSelected ? 'row-selected' : ''}" style="cursor:pointer;">
            <td style="font-weight:700;" onclick="selectGovernorate('${gov.id}')">${currentLang === "ar" ? gov.name_ar : gov.name_en}</td>
            <td>
                <input type="number" step="0.01" min="0" value="${gov.shipping_cost}" 
                       style="width:100px; padding:4px 8px; border:1px solid rgba(197,150,58,0.3); border-radius:6px; background:transparent;"
                       onchange="updateShippingCost('${gov.id}', this.value)">
            </td>
            <td onclick="selectGovernorate('${gov.id}')">${cityCount}</td>
            <td>
                <button class="action-btn" style="color:var(--danger); border:none; background:transparent; cursor:pointer;" onclick="deleteGovernorate('${gov.id}')">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>`;
    }).join("");
}

async function selectGovernorate(govId) {
    selectedGovId = govId;
    renderGovernorates();

    const gov = currentGovernorates.find(g => g.id === govId);
    if (!gov) return;

    document.getElementById("selectedGovName").innerText = currentLang === "ar" ? gov.name_ar : gov.name_en;
    document.getElementById("citySection").style.display = "block";
    await loadCities(govId);
}

async function loadCities(govId) {
    const tbody = document.getElementById("citiesTableBody");
    const t = translations[currentLang];
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="2" style="text-align:center;">${t.loading}</td></tr>`;

    try {
        const { data } = await adminRun("admin.cities.list", () =>
            getSb().from("cities").select("*").eq("governorate_id", govId).order("sort_order", { ascending: true })
        );
        currentCities = data || [];
        renderGovernorates();
        renderCities();
    } catch (err) {
        const normalized = window.dmApiGuard?.normalizeError
            ? window.dmApiGuard.normalizeError(err)
            : err;
        console.error("[admin] loadCities:", normalized);
        tbody.innerHTML = `<tr><td colspan="2" style="text-align:center; color:var(--danger);">${normalized.message || "Error"}</td></tr>`;
    }
}

function renderCities() {
    const tbody = document.getElementById("citiesTableBody");
    const t = translations[currentLang];
    if (!tbody) return;

    if (currentCities.length === 0) {
        tbody.innerHTML = `<tr><td colspan="2" style="text-align:center; color:var(--ink-muted);">${currentLang === "ar" ? "لا توجد مدن مضافة بعد." : "No cities added yet."}</td></tr>`;
        return;
    }

    tbody.innerHTML = currentCities.map(city => `
        <tr>
            <td>${currentLang === "ar" ? city.name_ar : city.name_en}</td>
            <td>
                <button class="action-btn" style="color:var(--danger); border:none; background:transparent; cursor:pointer;" onclick="deleteCity('${city.id}')">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>
    `).join("");
}

async function updateShippingCost(govId, cost) {
    const t = translations[currentLang];
    const newCost = parseFloat(cost);
    if (isNaN(newCost) || newCost < 0) return;

    try {
        await adminRun("admin.governorates.shipping", () =>
            getSb().from("governorates").update({ shipping_cost: newCost }).eq("id", govId)
        );
        const gov = currentGovernorates.find(g => g.id === govId);
        if (gov) gov.shipping_cost = newCost;
        showAdminDashboardAlert(t.govShippingUpdated, "success");
    } catch (err) {
        const normalized = window.dmApiGuard?.normalizeError
            ? window.dmApiGuard.normalizeError(err)
            : err;
        console.error("[admin] updateShippingCost:", normalized);
        showAdminDashboardAlert(normalized.message || "Error", "error");
    }
}

async function deleteGovernorate(govId) {
    const t = translations[currentLang];
    if (!confirm(t.govDeleteConfirm)) return;

    try {
        await adminRun("admin.governorates.delete", () =>
            getSb().from("governorates").delete().eq("id", govId)
        );
        currentGovernorates = currentGovernorates.filter(g => g.id !== govId);
        if (selectedGovId === govId) {
            selectedGovId = null;
            document.getElementById("citySection").style.display = "none";
            currentCities = [];
        }
        renderGovernorates();
    } catch (err) {
        const normalized = window.dmApiGuard?.normalizeError
            ? window.dmApiGuard.normalizeError(err)
            : err;
        console.error("[admin] deleteGovernorate:", normalized);
        alert(normalized.message || "Error");
    }
}

async function deleteCity(cityId) {
    const t = translations[currentLang];
    if (!confirm(t.cityDeleteConfirm)) return;

    try {
        await adminRun("admin.cities.delete", () =>
            getSb().from("cities").delete().eq("id", cityId)
        );
        currentCities = currentCities.filter(c => c.id !== cityId);
        renderCities();
        if (selectedGovId) renderGovernorates();
    } catch (err) {
        const normalized = window.dmApiGuard?.normalizeError
            ? window.dmApiGuard.normalizeError(err)
            : err;
        console.error("[admin] deleteCity:", normalized);
        alert(normalized.message || "Error");
    }
}

function openAddGovernorateModal() {
    document.getElementById("addGovernorateModal").classList.add("open");
}

function closeAddGovernorateModal() {
    document.getElementById("addGovernorateModal").classList.remove("open");
    document.getElementById("addGovernorateForm").reset();
}

async function submitGovernorate(e) {
    e.preventDefault();
    const t = translations[currentLang];
    const saveBtn = document.getElementById("btnSubmitGov");
    const originalBtn = saveBtn.innerHTML;

    saveBtn.disabled = true;
    saveBtn.innerHTML = t.saving;

    const nameAr = document.getElementById("govNameArInput").value.trim();
    const nameEn = document.getElementById("govNameEnInput").value.trim();
    const shippingCost = parseFloat(document.getElementById("govShippingInput").value);

    try {
        const { data } = await adminRun("admin.governorates.insert", () =>
            getSb().from("governorates").insert([{
                name_ar: nameAr,
                name_en: nameEn,
                shipping_cost: shippingCost,
                sort_order: currentGovernorates.length + 1
            }]).select().single()
        );

        if (data) {
            currentGovernorates.push(data);
            renderGovernorates();
        }

        closeAddGovernorateModal();
    } catch (err) {
        const normalized = window.dmApiGuard?.normalizeError
            ? window.dmApiGuard.normalizeError(err)
            : err;
        console.error("[admin] submitGovernorate:", normalized);
        showAdminDashboardAlert(normalized.message || "Error", "error");
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalBtn;
    }
}

function openAddCityModal() {
    if (!selectedGovId) {
        alert(currentLang === "ar" ? "يرجى اختيار محافظة أولاً." : "Please select a governorate first.");
        return;
    }
    document.getElementById("addCityModal").classList.add("open");
}

function closeAddCityModal() {
    document.getElementById("addCityModal").classList.remove("open");
    document.getElementById("addCityForm").reset();
}

async function submitCity(e) {
    e.preventDefault();
    const t = translations[currentLang];
    const saveBtn = document.getElementById("btnSubmitCity");
    const originalBtn = saveBtn.innerHTML;

    saveBtn.disabled = true;
    saveBtn.innerHTML = t.saving;

    const nameAr = document.getElementById("cityNameArInput").value.trim();
    const nameEn = document.getElementById("cityNameEnInput").value.trim();

    try {
        const { data } = await adminRun("admin.cities.insert", () =>
            getSb().from("cities").insert([{
                governorate_id: selectedGovId,
                name_ar: nameAr,
                name_en: nameEn,
                sort_order: currentCities.length + 1
            }]).select().single()
        );

        if (data) {
            currentCities.push(data);
            renderCities();
            renderGovernorates();
        }

        closeAddCityModal();
    } catch (err) {
        const normalized = window.dmApiGuard?.normalizeError
            ? window.dmApiGuard.normalizeError(err)
            : err;
        console.error("[admin] submitCity:", normalized);
        showAdminDashboardAlert(normalized.message || "Error", "error");
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalBtn;
    }
}

// ---------------------------
// قسم الكتب والفلترة
// ---------------------------

async function loadBooks() {
    const tbody = document.getElementById("booksTableBody");
    const t = translations[currentLang];
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;">${t.loading}</td></tr>`;
    showAdminDashboardAlert("");

    try {
        const { data } = await adminRun("admin.books.list", () =>
            getSb().from("books").select("*").order("created_at", { ascending: false })
        );
        currentBooks = data || [];
        filterBooks();
    } catch (err) {
        const normalized = window.dmApiGuard?.normalizeError
            ? window.dmApiGuard.normalizeError(err)
            : err;
        console.error("[admin] loadBooks:", normalized);
        const msg =
            normalized.message ||
            (currentLang === "ar" ? "خطأ في تحميل الكتب." : "Failed to load books.");
        showAdminDashboardAlert(msg, "error");
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--danger);">${msg}</td></tr>`;
    }
}

function filterBooks() {
    const searchInput = document.getElementById("searchBooksInput")?.value.toLowerCase() || "";
    const catFilter = document.getElementById("filterBookCategory")?.value || "all";

    const filtered = currentBooks.filter(book => {
        const matchesSearch = (book.title && book.title.toLowerCase().includes(searchInput)) || 
                              (book.author && book.author.toLowerCase().includes(searchInput));
        const matchesCat = catFilter === "all" || book.category === catFilter;
        return matchesSearch && matchesCat;
    });

    renderBooksTable(filtered);
}

function renderBooksTable(booksToRender = currentBooks) {
    const tbody = document.getElementById("booksTableBody");
    const t = translations[currentLang];
    
    if (booksToRender.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--text-light); padding:20px;">${t.noSearchResults}</td></tr>`;
        return;
    }
    
    tbody.innerHTML = booksToRender.map(book => {
        const isAr = book.language === "ar";
        const inStockVal = book.in_stock !== false;
        
        let coverHtml = "";
        if (book._coverUploading) {
            coverHtml = `<div class="admin-table-img admin-cover-loading"><i class="fa-solid fa-spinner fa-spin"></i></div>`;
        } else if (book.image_url) {
            const thumb = window.dmBooks?.bookCoverUrl && book.image_url.includes("supabase.co/storage")
                    ? window.dmBooks.bookCoverUrl(book.image_url, 80)
                    : book.image_url;
            coverHtml = `<img src="${thumb}" alt="${book.title}" class="admin-table-img" loading="lazy" decoding="async" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'admin-table-img admin-cover-placeholder',innerHTML:'<i class=\\'fa-solid fa-book-open\\'></i>'}))">`;
        } else {
            coverHtml = `<div class="admin-table-img admin-cover-placeholder"><i class="fa-solid fa-book-open"></i></div>`;
        }
        
        const categoryLabel = t["cat" + book.category.charAt(0).toUpperCase() + book.category.slice(1).replace("-", "")] || book.category;
        
        return `
        <tr>
            <td>${coverHtml}</td>
            <td style="font-weight:700;">${book.title}</td>
            <td>${book.author}</td>
            <td>${categoryLabel}</td>
            <td>${isAr ? t.arLangName : t.enLangName}</td>
            <td style="font-weight:800;">${book.price} ${t.currency}</td>
            <td>
                <button class="status-badge" style="background:${inStockVal ? 'var(--success-light, #d4edda)' : 'var(--danger-light, #f8d7da)'}; color:${inStockVal ? 'var(--success)' : 'var(--danger)'}; cursor:pointer;" onclick="toggleBookStock('${book.id}', ${inStockVal})">
                    ${inStockVal ? t.inStock : t.outOfStock}
                </button>
            </td>
            <td>
                <div style="display:flex; gap:8px; align-items:center; justify-content:center;">
                    <button class="action-btn edit-btn" style="color:var(--gold); border:none; background:transparent; cursor:pointer;" onclick="openEditBookModal('${book.id}')" title="${t.btnEditBook}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="action-btn" style="color:var(--danger); border:none; background:transparent; cursor:pointer;" onclick="deleteBook('${book.id}')" title="${t.thBookActions}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        </tr>`;
    }).join("");
}

// ---------------------------
// باقي وظائف الإضافة والحذف
// ---------------------------

async function toggleBookStock(bookId, currentVal) {
    try {
        await adminRun("admin.books.stock", () =>
            getSb().from("books").update({ in_stock: !currentVal }).eq("id", bookId)
        );
        const book = currentBooks.find(b => b.id === bookId);
        if (book) book.in_stock = !currentVal;
        filterBooks();
    } catch (err) {
        const msg = window.dmApiGuard?.normalizeError?.(err)?.message || "Error";
        console.error("[admin] toggleBookStock:", err);
        showAdminDashboardAlert(msg, "error");
    }
}

async function deleteBook(bookId) {
    const t = translations[currentLang];
    if (!confirm(t.bookDeleteConfirm)) return;
    
    try {
        await adminRun("admin.books.delete", () => getSb().from("books").delete().eq("id", bookId));
        
        // تصفير الكاش لإجبار الموقع على إعادة جلب البيانات المحدثة
        localStorage.setItem("dm_books_cache_time", "0");
        window.dmBooks?.clearCache?.();
        
        currentBooks = currentBooks.filter(b => b.id !== bookId);
        filterBooks();
    } catch (err) {
        const msg = window.dmApiGuard?.normalizeError?.(err)?.message || "Error";
        console.error("[admin] deleteBook:", err);
        alert(msg);
    }
}

function clearPreparedCover() {
    preparedCoverBlob = null;
    if (preparedCoverPreviewUrl) { URL.revokeObjectURL(preparedCoverPreviewUrl); preparedCoverPreviewUrl = null; }
    const preview = document.getElementById("bookCoverPreview");
    if (preview) { preview.src = "#"; preview.style.display = "none"; }
    const promptText = document.getElementById("uploadPromptText");
    if (promptText) promptText.style.display = "block";
    const hint = document.getElementById("coverCompressHint");
    if (hint) hint.hidden = true;
}

// ========================
// نظام تعديل الكتاب المتكامل
// ========================

function openAddBookModal() {
    editingBookId = null;
    document.getElementById("editingBookIdInput").value = "";
    const t = translations[currentLang];
    document.getElementById("addBookModalTitle").innerHTML = t.addBookModalTitle;
    document.getElementById("btnSubmitBook").innerHTML = t.btnSubmitBook;
    document.getElementById("addBookForm").reset();
    clearPreparedCover();
    document.getElementById("currentCoverInfo").style.display = "none";
    document.getElementById("bookCoverFile").required = false;
    document.getElementById("addBookModal").classList.add("open");
}

function openEditBookModal(bookId) {
    const t = translations[currentLang];
    if (!bookId) { showAdminToast(t.bookUpdatedError, "error"); return; }

    const book = currentBooks.find(b => b.id === bookId);
    if (!book) {
        showAdminDashboardAlert(
            currentLang === "ar" ? "لم يتم العثور على الكتاب." : "Book not found.",
            "error"
        );
        return;
    }

    editingBookId = bookId;
    document.getElementById("editingBookIdInput").value = bookId;
    document.getElementById("addBookModalTitle").innerHTML = t.editBookModalTitle;
    document.getElementById("btnSubmitBook").innerHTML = t.btnUpdateBook;

    document.getElementById("bookTitleInput").value = book.title || "";
    document.getElementById("bookAuthorInput").value = book.author || "";
    document.getElementById("bookPriceInput").value = book.price || "";
    document.getElementById("bookCategoryInput").value = book.category || "novels";
    document.getElementById("bookLanguageInput").value = book.language || "ar";
    document.getElementById("bookDescInput").value = book.description || "";

    document.getElementById("bookCoverFile").required = false;

    clearPreparedCover();

    const coverInfo = document.getElementById("currentCoverInfo");
    const preview = document.getElementById("bookCoverPreview");
    const promptText = document.getElementById("uploadPromptText");

    if (book.image_url) {
        const coverSrc = window.dmBooks?.bookCoverUrl
            ? window.dmBooks.bookCoverUrl(book.image_url, 200)
            : book.image_url;
        preview.src = coverSrc;
        preview.style.display = "inline-block";
        promptText.style.display = "none";
        coverInfo.style.display = "block";
        coverInfo.innerHTML = `<span style="color:var(--ink-muted);font-size:13px;">${t.currentCoverLabel}</span>
            <span style="color:var(--gold);font-weight:700;font-size:13px;margin-right:4px;">${book.title}</span>
            <br><span style="color:var(--ink-muted);font-size:12px;">${t.coverNotChanged}</span>`;
    } else {
        coverInfo.style.display = "none";
        preview.style.display = "none";
        promptText.style.display = "block";
    }

    document.getElementById("addBookModal").classList.add("open");
}

async function handleBookSubmit(e) {
    e.preventDefault();
    const bookId = document.getElementById("editingBookIdInput").value;
    if (bookId) {
        await updateBook(bookId);
    } else {
        await addBook();
    }
}

function validateBookForm() {
    const t = translations[currentLang];
    const title = document.getElementById("bookTitleInput").value.trim();
    const author = document.getElementById("bookAuthorInput").value.trim();
    const price = document.getElementById("bookPriceInput").value.trim();

    if (!title || !author || !price) {
        showAdminToast(t.validationRequired, "error");
        return false;
    }
    return true;
}

function validateFileType(file) {
    if (!file) return true;
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
        showAdminToast(translations[currentLang].validationImageType, "error");
        return false;
    }
    return true;
}

function validateFileSize(file) {
    if (!file) return true;
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        showAdminToast(translations[currentLang].validationImageSize, "error");
        return false;
    }
    return true;
}

async function addBook() {
    const t = translations[currentLang];
    const saveBtn = document.getElementById("btnSubmitBook");
    const originalBtn = saveBtn.innerHTML;

    if (!validateBookForm()) return;

    saveBtn.disabled = true;
    saveBtn.innerHTML = t.saving;

    const title = document.getElementById("bookTitleInput").value.trim();
    const author = document.getElementById("bookAuthorInput").value.trim();
    const price = parseFloat(document.getElementById("bookPriceInput").value);
    const category = document.getElementById("bookCategoryInput").value;
    const language = document.getElementById("bookLanguageInput").value;
    const description = document.getElementById("bookDescInput").value.trim();
    const fileInput = document.getElementById("bookCoverFile");
    const rawFile = fileInput.files[0];

    if (rawFile && (!validateFileType(rawFile) || !validateFileSize(rawFile))) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalBtn;
        return;
    }

    let coverBlob = preparedCoverBlob || rawFile;

    try {
        const { data: inserted } = await adminRun("admin.books.insert", () =>
            getSb()
                .from("books")
                .insert([{ title, author, price, category, language, description, image_url: null, in_stock: true }])
                .select()
                .single()
        );

        const newBook = inserted;
        if (coverBlob) newBook._coverUploading = true;

        currentBooks.unshift(newBook);
        if (activeTab !== "books") switchTab("books");
        else filterBooks();

        closeAddBookModal();
        showAdminToast(t.bookAddedSuccess, "success");

        if (coverBlob && newBook.id) {
            uploadCoverInBackground(newBook.id, coverBlob).catch(() => {
                const b = currentBooks.find((x) => x.id === newBook.id);
                if (b) { b._coverUploading = false; filterBooks(); }
            });
        }

        localStorage.setItem("dm_books_cache_time", "0");
    } catch (err) {
        const msg = window.dmApiGuard?.normalizeError?.(err)?.message ||
            (currentLang === "ar" ? "فشل الإضافة" : "Failed to add book");
        console.error("[admin] addBook:", err);
        showAdminToast(msg, "error");
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalBtn;
    }
}

async function updateBook(bookId) {
    const t = translations[currentLang];
    const saveBtn = document.getElementById("btnSubmitBook");
    const originalBtn = saveBtn.innerHTML;

    if (!validateBookForm()) return;

    saveBtn.disabled = true;
    saveBtn.innerHTML = t.saving;

    const title = document.getElementById("bookTitleInput").value.trim();
    const author = document.getElementById("bookAuthorInput").value.trim();
    const price = parseFloat(document.getElementById("bookPriceInput").value);
    const category = document.getElementById("bookCategoryInput").value;
    const language = document.getElementById("bookLanguageInput").value;
    const description = document.getElementById("bookDescInput").value.trim();
    const fileInput = document.getElementById("bookCoverFile");
    const rawFile = fileInput.files[0];

    if (rawFile && (!validateFileType(rawFile) || !validateFileSize(rawFile))) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalBtn;
        return;
    }

    const hasNewCover = !!(preparedCoverBlob || rawFile);

    try {
        const updateData = {
            title,
            author,
            price,
            category,
            language,
            description,
        };

        const { error: updateError } = await getSb()
            .from("books")
            .update(updateData)
            .eq("id", bookId);

        if (updateError) throw updateError;

        if (hasNewCover) {
            const coverBlob = preparedCoverBlob || rawFile;
            const sb = getSb();
            const filePath = `covers/${bookId}.jpg`;

            const { error: uploadError } = await sb.storage
                .from("book-covers")
                .upload(filePath, coverBlob, { contentType: "image/jpeg", upsert: true });

            if (uploadError) throw uploadError;

            const { data: urlData } = sb.storage.from("book-covers").getPublicUrl(filePath);

            const { error: urlUpdateError } = await getSb()
                .from("books")
                .update({ image_url: urlData.publicUrl })
                .eq("id", bookId);

            if (urlUpdateError) throw urlUpdateError;

            const book = currentBooks.find((b) => b.id === bookId);
            if (book) {
                book.image_url = urlData.publicUrl;
                book._coverUploading = false;
            }
        }

        const updatedBook = currentBooks.find((b) => b.id === bookId);
        if (updatedBook) {
            updatedBook.title = title;
            updatedBook.author = author;
            updatedBook.price = price;
            updatedBook.category = category;
            updatedBook.language = language;
            updatedBook.description = description;
        }

        localStorage.setItem("dm_books_cache_time", "0");
        window.dmBooks?.clearCache?.();

        closeAddBookModal();
        filterBooks();
        showAdminToast(t.bookUpdatedSuccess, "success");
    } catch (err) {
        const msg = window.dmApiGuard?.normalizeError?.(err)?.message ||
            t.bookUpdatedError;
        console.error("[admin] updateBook:", err);
        showAdminToast(msg, "error");
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalBtn;
    }
}

function closeAddBookModal() {
    editingBookId = null;
    document.getElementById("editingBookIdInput").value = "";
    document.getElementById("addBookModal").classList.remove("open");
    document.getElementById("addBookForm").reset();
    clearPreparedCover();
    document.getElementById("currentCoverInfo").style.display = "none";
}

function triggerFileInput() { document.getElementById("bookCoverFile").click(); }

async function previewImage(e) {
    const file = e.target.files[0];
    const preview = document.getElementById("bookCoverPreview");
    const promptText = document.getElementById("uploadPromptText");
    const hint = document.getElementById("coverCompressHint");

    clearPreparedCover();
    if (!file) return;

    if (hint) { hint.hidden = false; hint.textContent = currentLang === "ar" ? "جاري تحضير الصورة..." : "Preparing image..."; }

    try {
        const compress = window.dmImageUtils?.compressCoverImage;
        preparedCoverBlob = compress ? await compress(file) : file;

        preparedCoverPreviewUrl = URL.createObjectURL(preparedCoverBlob);
        preview.src = preparedCoverPreviewUrl;
        preview.style.display = "inline-block";
        promptText.style.display = "none";

        if (hint) {
            const kb = Math.round(preparedCoverBlob.size / 1024);
            hint.textContent = currentLang === "ar" ? `جاهزة للرفع (${kb} ك.ب)` : `Ready (${kb} KB)`;
        }
    } catch (err) {
        preparedCoverBlob = file;
        if (hint) hint.hidden = true;
    }
}

async function uploadCoverInBackground(bookId, blob) {
    if (!blob || !bookId) return;
    const sb = getSb();
    const filePath = `covers/${bookId}.jpg`;

    const { error: uploadError } = await sb.storage.from("book-covers").upload(filePath, blob, { contentType: "image/jpeg", upsert: true });
    if (uploadError) throw uploadError;

    const { data: urlData } = sb.storage.from("book-covers").getPublicUrl(filePath);
    await sb.from("books").update({ image_url: urlData.publicUrl }).eq("id", bookId);

    const book = currentBooks.find((b) => b.id === bookId);
    if (book) {
        book.image_url = urlData.publicUrl;
        book._coverUploading = false;
        filterBooks();
    }
}

// ---------------------------
// تفاصيل الطلب وتحديث الحالة
// ---------------------------

async function openOrderDetailsModal(orderId) {
    selectedOrderId = orderId;
    const modal = document.getElementById("orderDetailsModal");
    const t = translations[currentLang];
    
    document.getElementById("detCustName").innerText = t.loading;
    document.getElementById("detCustPhone").innerText = "-";
    document.getElementById("detOrderItemsBody").innerHTML = `<tr><td colspan="4" style="text-align:center;">${t.loading}</td></tr>`;
    
    modal.classList.add("open");
    
    const order = currentOrders.find(o => o.id === orderId);
    if (!order) return;
    
    document.getElementById("detCustName").innerText = order.customer_name;
    document.getElementById("detCustPhone").innerText = order.customer_phone;
    document.getElementById("detCustPhone").href = `tel:${order.customer_phone}`;
    document.getElementById("detCustGov").innerText = order.governorate;
    document.getElementById("detCustAddress").innerText = order.address;
    document.getElementById("detCustNotes").innerText = order.notes || (currentLang === "ar" ? "لا يوجد" : "None");
    
    const orderDate = new Date(order.created_at).toLocaleDateString(currentLang === "ar" ? "ar-EG" : "en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    document.getElementById("detOrderDate").innerText = orderDate;
    document.getElementById("detOrderStatusSelect").value = order.status;
    
    try {
        const { data } = await adminRun("admin.order_items", () =>
            getSb()
                .from("order_items")
                .select(`id, quantity, price, books (title, author)`)
                .eq("order_id", orderId)
        );
        
        let itemsSubtotal = 0;
        document.getElementById("detOrderItemsBody").innerHTML = (data || []).map(item => {
            const itemTitle = item.books ? item.books.title : (currentLang === "ar" ? "كتاب غير معروف" : "Unknown Book");
            const itemTotal = item.price * item.quantity;
            itemsSubtotal += itemTotal;
            return `<tr><td style="font-weight:700;">${itemTitle}</td><td>${item.quantity}</td><td>${item.price} ${t.currency}</td><td style="font-weight:700;">${itemTotal.toFixed(2)} ${t.currency}</td></tr>`;
        }).join("");
        
        const shipping = parseFloat(order.shipping_cost);
        document.getElementById("detSubtotalPrice").innerText = `${itemsSubtotal.toFixed(2)} ${t.currency}`;
        document.getElementById("detShippingPrice").innerText = `${shipping.toFixed(2)} ${t.currency}`;
        document.getElementById("detTotalPrice").innerText = `${(itemsSubtotal + shipping).toFixed(2)} ${t.currency}`;
    } catch (err) {
        const msg = window.dmApiGuard?.normalizeError?.(err)?.message ||
            (currentLang === "ar" ? "خطأ في التحميل." : "Load failed.");
        console.error("[admin] order details:", err);
        document.getElementById("detOrderItemsBody").innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--danger);">${msg}</td></tr>`;
    }
}

function closeOrderDetailsModal() {
    document.getElementById("orderDetailsModal").classList.remove("open");
    selectedOrderId = null;
}

async function updateOrderStatus() {
    if (!selectedOrderId) return;
    const newStatus = document.getElementById("detOrderStatusSelect").value;
    try {
        await adminRun("admin.orders.status", () =>
            getSb().from("orders").update({ status: newStatus }).eq("id", selectedOrderId)
        );
        const order = currentOrders.find(o => o.id === selectedOrderId);
        if (order) order.status = newStatus;
        filterOrders();
    } catch (err) {
        console.error("[admin] updateOrderStatus:", err);
        showAdminDashboardAlert(window.dmApiGuard?.normalizeError?.(err)?.message || "Error", "error");
    }
}

async function deleteOrder() {
    if (!selectedOrderId) return;
    const t = translations[currentLang];
    if (!confirm(t.deleteConfirm)) return;
    
    try {
        await adminRun("admin.orders.delete", () =>
            getSb().from("orders").delete().eq("id", selectedOrderId)
        );
        currentOrders = currentOrders.filter(o => o.id !== selectedOrderId);
        filterOrders();
        closeOrderDetailsModal();
    } catch (err) {
        console.error("[admin] deleteOrder:", err);
        alert(window.dmApiGuard?.normalizeError?.(err)?.message || "Error");
    }
}

// منع توقف السكربت بسبب Promise مرفوضة غير ملتقطة
window.dmApiGuard?.installUnhandledRejectionGuard?.("admin", (err) => {
    showAdminDashboardAlert(err.message, "error");
    const ordersBody = document.getElementById("ordersTableBody");
    const booksBody = document.getElementById("booksTableBody");
    if (ordersBody?.querySelector("td")?.textContent?.includes("جاري") ||
        ordersBody?.querySelector("td")?.textContent?.includes("Loading")) {
        ordersBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--danger);">${err.message}</td></tr>`;
    }
    if (booksBody?.querySelector("td")?.textContent?.includes("جاري") ||
        booksBody?.querySelector("td")?.textContent?.includes("Loading")) {
        booksBody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--danger);">${err.message}</td></tr>`;
    }
});
