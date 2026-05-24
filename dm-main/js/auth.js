// Auth helpers for login, register, profile, and password reset
(function () {
  function client() {
    const c = window.getSupabaseClient && window.getSupabaseClient();
    if (!c || !c.auth) {
      throw new Error('تعذر الاتصال بخدمة المصادقة. حدّث الصفحة وحاول مرة أخرى.');
    }
    return c;
  }

  function showAuthMessage(text, type) {
    const el = document.getElementById('authMessage');
    if (!el) {
      if (text) alert(text);
      return;
    }
    el.textContent = text || '';
    el.className = 'auth-message' + (type ? ` auth-message--${type}` : '');
    el.hidden = !text;
  }

  function setAuthLoading(formId, loading) {
    const form = document.getElementById(formId);
    if (!form) return;
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    if (loading) {
      btn.dataset.originalHtml = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري المعالجة...';
    } else {
      btn.disabled = false;
      if (btn.dataset.originalHtml) btn.innerHTML = btn.dataset.originalHtml;
    }
  }

  function friendlyAuthError(err) {
    const msg = (err && (err.message || err.error_description || err.msg)) || String(err || '');
    const map = {
      'Invalid login credentials': 'البريد أو كلمة المرور غير صحيحة.',
      'Email not confirmed': 'يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول.',
      'User already registered': 'هذا البريد مسجّل مسبقاً. جرّب تسجيل الدخول.',
      'Password should be at least 6 characters': 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.',
      'Unable to validate email address: invalid format': 'صيغة البريد الإلكتروني غير صحيحة.',
      'Signup requires a valid password': 'أدخل كلمة مرور صالحة.'
    };
    for (const [key, ar] of Object.entries(map)) {
      if (msg.includes(key)) return ar;
    }
    return msg || 'حدث خطأ غير متوقع. حاول مرة أخرى.';
  }

  async function ensureProfile(userId, fullName) {
    if (!userId) return;
    try {
      await client().from('profiles').upsert(
        { id: userId, full_name: fullName || null },
        { onConflict: 'id' }
      );
    } catch (e) {
      console.warn('profile upsert:', e.message || e);
    }
  }

  window.authSignUp = async function authSignUp(e) {
    e.preventDefault();
    showAuthMessage('');
    setAuthLoading('registerForm', true);
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const fullName = (document.getElementById('regName') || {}).value
      ? document.getElementById('regName').value.trim()
      : '';

    if (password.length < 6) {
      showAuthMessage('كلمة المرور يجب أن تكون 6 أحرف على الأقل.', 'error');
      setAuthLoading('registerForm', false);
      return;
    }

    try {
      const { data, error } = await client().auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName || null } }
      });
      if (error) throw error;

      const userId = data?.user?.id;
      if (userId) await ensureProfile(userId, fullName);

      if (data?.session) {
        showAuthMessage('تم إنشاء الحساب بنجاح! جاري تحويلك...', 'success');
        setTimeout(() => {
          window.location.href = appHref('account/profile.html');
        }, 600);
        return;
      }

      showAuthMessage('تم إنشاء الحساب. يمكنك تسجيل الدخول الآن.', 'success');
      setTimeout(() => {
        window.location.href = appHref('auth/login.html');
      }, 1200);
    } catch (err) {
      console.error(err);
      showAuthMessage(friendlyAuthError(err), 'error');
    } finally {
      setAuthLoading('registerForm', false);
    }
  };

  window.authSignIn = async function authSignIn(e) {
    e.preventDefault();
    showAuthMessage('');
    setAuthLoading('loginForm', true);
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
      const { data, error } = await client().auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data?.session) throw new Error('لم يتم إنشاء جلسة. حاول مرة أخرى.');

      const userId = data.user?.id;
      if (userId) await ensureProfile(userId, data.user.user_metadata?.full_name);

      showAuthMessage('تم تسجيل الدخول بنجاح!', 'success');
      const next = new URLSearchParams(location.search).get('next');
      const target = next ? decodeURIComponent(next) : appHref('account/profile.html');
      setTimeout(() => { window.location.href = target; }, 400);
    } catch (err) {
      console.error(err);
      showAuthMessage(friendlyAuthError(err), 'error');
    } finally {
      setAuthLoading('loginForm', false);
    }
  };

  window.authSignOut = async function authSignOut() {
    try {
      await client().auth.signOut();
      window.location.href = appHref('index.html');
    } catch (err) {
      console.error(err);
      alert(friendlyAuthError(err));
    }
  };

  window.authSendReset = async function authSendReset(e) {
    e.preventDefault();
    showAuthMessage('');
    setAuthLoading('resetForm', true);
    const email = document.getElementById('resetEmail').value.trim();

    try {
      const redirectTo = `${location.origin}${appHref('auth/login.html')}`;
      const { error } = await client().auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw error;
      showAuthMessage('تم إرسال رابط استعادة كلمة المرور إلى بريدك.', 'success');
    } catch (err) {
      console.error(err);
      showAuthMessage(friendlyAuthError(err), 'error');
    } finally {
      setAuthLoading('resetForm', false);
    }
  };

  window.loadProfile = async function loadProfile() {
    try {
      const { data: { session } } = await client().auth.getSession();
      if (!session) {
        window.location.href = appHref(`auth/login.html?next=${encodeURIComponent(location.pathname)}`);
        return;
      }
      const user = session.user;
      const emailEl = document.getElementById('profileEmail');
      if (emailEl) emailEl.textContent = user.email || '—';

      const { data, error } = await client()
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle();

      const nameEl = document.getElementById('profileName');
      if (nameEl && !error && data) nameEl.value = data.full_name || '';
      else if (nameEl) nameEl.value = user.user_metadata?.full_name || '';
    } catch (err) {
      console.error(err);
    }
  };

  window.updateProfile = async function updateProfile() {
    try {
      const { data: { session } } = await client().auth.getSession();
      if (!session) {
        alert('يجب تسجيل الدخول أولاً');
        return;
      }
      const full_name = document.getElementById('profileName').value.trim();
      const { error } = await client()
        .from('profiles')
        .upsert({ id: session.user.id, full_name }, { onConflict: 'id' });
      if (error) throw error;
      alert('تم تحديث الملف الشخصي');
    } catch (err) {
      console.error(err);
      alert(friendlyAuthError(err));
    }
  };

  window.loadUserOrders = async function loadUserOrders() {
    try {
      const { data: { session } } = await client().auth.getSession();
      if (!session) {
        window.location.href = appHref('auth/login.html');
        return;
      }
      const container = document.getElementById('userOrders');
      if (!container) return;

      const { data, error } = await client()
        .from('orders')
        .select('*, order_items(id, quantity, price, book_id)')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!data || !data.length) {
        container.innerHTML = '<p class="empty-state">لا توجد طلبات حتى الآن. <a href="' + appHref('index.html#catalog') + '">تسوق الآن</a></p>';
        return;
      }
      const statusAr = { pending: 'قيد المراجعة', confirmed: 'مؤكد', shipped: 'تم الشحن', delivered: 'تم التسليم', cancelled: 'ملغي' };
      container.innerHTML = data
        .map((o) => {
          const itemsCount = (o.order_items || []).reduce((s, i) => s + (i.quantity || 1), 0);
          const total = Number(o.total_price || 0).toFixed(2);
          const st = statusAr[o.status] || o.status || 'pending';
          return `<article class="order-card uiglass">
            <div class="order-card-head">
              <strong>طلب #${String(o.id).slice(0, 8)}</strong>
              <span class="order-status order-status--${o.status || 'pending'}">${st}</span>
            </div>
            <p class="order-meta">${o.customer_name || '—'} · ${itemsCount} منتج · ${total} ج.م</p>
            <p class="order-meta">${o.governorate || ''} — ${new Date(o.created_at).toLocaleString('ar-EG')}</p>
          </article>`;
        })
        .join('');
    } catch (err) {
      console.error(err);
      const container = document.getElementById('userOrders');
      if (container) container.innerHTML = '<p class="auth-message auth-message--error">تعذر تحميل الطلبات.</p>';
    }
  };

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const { data: { session } } = await client().auth.getSession();
      const onLoginPage = /auth\/login\.html$/i.test(location.pathname);
      const onRegisterPage = /auth\/register\.html$/i.test(location.pathname);
      if (session && (onLoginPage || onRegisterPage)) {
        window.location.replace(appHref('account/profile.html'));
        return;
      }
    } catch (e) {
      console.warn('session check', e);
    }

    if (/\/account\/profile\.html$/i.test(location.pathname)) loadProfile();
    if (/\/account\/orders\.html$/i.test(location.pathname)) loadUserOrders();
  });
})();
