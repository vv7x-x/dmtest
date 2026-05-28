/**
 * طبقة حماية مشتركة — Supabase / fetch / Promises
 * تمنع Uncaught (in promise) وتوفّر رسائل واضحة للمستخدم
 */
(function () {
  const REQUEST_TIMEOUT_MS = 45000;

  function t(ar, en) {
    const lang = localStorage.getItem("lang") || "ar";
    return lang === "ar" ? ar : en;
  }

  /** هل الخطأ من نوع FetchError (شبكة / CORS / السيرفر لا يرد) */
  function isFetchError(err) {
    if (!err) return false;
    const name = err.name || err.constructor?.name || "";
    if (name === "FetchError") return true;
    const s = String(err.message || err);
    return s.includes("FetchError") || s.includes("Failed to fetch");
  }

  /** توحيد الأخطاء — Supabase قد يرمي Object وليس Error */
  function normalizeError(err) {
    if (!err) return new Error(t("خطأ غير معروف.", "Unknown error."));

    if (isFetchError(err)) {
      return new Error(
        t(
          "عذراً، حدث خطأ في الاتصال بالسيرفر. يرجى المحاولة مرة أخرى.",
          "Sorry, a server connection error occurred. Please try again."
        )
      );
    }

    if (err instanceof Error && err.message) return err;

    const msg = String(
      err.message || err.msg || err.error_description || err.details || ""
    ).trim();
    const status = err.status || err.statusCode;

    if (status && Number(status) >= 400) {
      const httpErr = new Error(
        t(`رفض السيرفر الطلب (${status}).`, `Server rejected the request (${status}).`) +
          (msg ? ` ${msg}` : "")
      );
      httpErr.status = status;
      httpErr.code = err.code;
      return httpErr;
    }

    if (typeof err === "object") {
      const wrapped = new Error(msg || JSON.stringify(err));
      wrapped.name = err.name || "ApiError";
      wrapped.code = err.code;
      wrapped.status = status;
      return wrapped;
    }

    return new Error(String(err));
  }

  /**
   * تنفيذ طلب async مع مهلة — إذا كان رد Supabase فيه error يُرمى استثناء
   */
  async function runRequest(label, requestFn, timeoutMs) {
    const ms = timeoutMs || REQUEST_TIMEOUT_MS;
    let timeoutId;

    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(
          new Error(
            t("انتهت مهلة الاتصال. تحقق من الشبكة.", "Request timed out. Check your network.")
          )
        );
      }, ms);
    });

    try {
      const result = await Promise.race([requestFn(), timeoutPromise]);
      clearTimeout(timeoutId);

      if (result && typeof result === "object" && "error" in result && result.error) {
        throw normalizeError(result.error);
      }

      return result;
    } catch (err) {
      clearTimeout(timeoutId);
      const normalized = normalizeError(err);
      normalized.apiLabel = label;
      throw normalized;
    }
  }

  /** تسجيل خطأ + رسالة للمستخدم (اختياري alert) */
  function reportError(context, err, options) {
    const opts = options || {};
    const normalized = normalizeError(err);
    console.error(`[dm] ${context}:`, normalized);
    console.error("[dm] تفاصيل:", { raw: err, label: normalized.apiLabel });

    if (opts.alert !== false) {
      const msg = opts.userMessage || normalized.message;
      if (opts.showInEl && document.getElementById(opts.showInEl)) {
        const el = document.getElementById(opts.showInEl);
        el.textContent = msg;
        el.className = "auth-message auth-message--error";
        el.hidden = false;
      }
      if (opts.useAlert) alert(msg);
    }

    return normalized;
  }

  /** منع تعليق الصفحة — معالجة Promise مرفوضة غير ملتقطة */
  function installUnhandledRejectionGuard(pageId, onRecover) {
    window.addEventListener("unhandledrejection", (event) => {
      const path = location.pathname || "";
      const onPage =
        pageId === "index"
          ? /index\.html$/i.test(path) || path.endsWith("/") || path === ""
          : pageId === "admin"
            ? /admin\.html$/i.test(path)
            : pageId === "checkout"
              ? /checkout\.html$/i.test(path)
              : false;

      if (!onPage) return;

      console.error(`[dm:${pageId}] unhandledrejection:`, event.reason);
      event.preventDefault();
      const normalized = normalizeError(event.reason);
      if (typeof onRecover === "function") onRecover(normalized);
    });
  }

  window.dmApiGuard = {
    isFetchError,
    normalizeError,
    runRequest,
    reportError,
    installUnhandledRejectionGuard,
    t,
  };
})();
