// Contact form — saves to contact_messages
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msgEl = document.getElementById('contactMessage');
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactBody').value.trim();

    if (name.length < 2 || email.length < 5 || message.length < 5) {
      if (msgEl) {
        msgEl.textContent = 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح.';
        msgEl.className = 'auth-message auth-message--error';
        msgEl.hidden = false;
      }
      btn.disabled = false;
      btn.innerHTML = orig;
      return;
    }

    if (message.length > 5000) {
      if (msgEl) {
        msgEl.textContent = 'الرسالة طويلة جداً. الحد الأقصى 5000 حرف.';
        msgEl.className = 'auth-message auth-message--error';
        msgEl.hidden = false;
      }
      btn.disabled = false;
      btn.innerHTML = orig;
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإرسال...';
    if (msgEl) { msgEl.hidden = true; msgEl.textContent = ''; }

    try {
      const supabase = window.getSupabaseClient();
      if (!supabase) throw new Error('تعذر الاتصال بالخادم');

      let user_id = null;
      const { data: { session } } = await supabase.auth.getSession();
      if (session) user_id = session.user.id;

      const sanitized = {
        user_id,
        name: name.slice(0, 200),
        email: email.slice(0, 320),
        message: message.slice(0, 5000)
      };
      const { error } = await supabase.from('contact_messages').insert([sanitized]);
      if (error) throw error;

      form.reset();
      if (msgEl) {
        msgEl.textContent = 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.';
        msgEl.className = 'auth-message auth-message--success';
        msgEl.hidden = false;
      }
    } catch (err) {
      console.error(err);
      if (msgEl) {
        msgEl.textContent = err.message || 'فشل الإرسال. حاول لاحقاً.';
        msgEl.className = 'auth-message auth-message--error';
        msgEl.hidden = false;
      }
    } finally {
      btn.disabled = false;
      btn.innerHTML = orig;
    }
  });

  // تعبئة تلقائية إن كان مسجّل الدخول
  (async () => {
    try {
      const supabase = window.getSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const emailInput = document.getElementById('contactEmail');
      if (emailInput && !emailInput.value) emailInput.value = session.user.email || '';
      const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', session.user.id).maybeSingle();
      const nameInput = document.getElementById('contactName');
      if (nameInput && !nameInput.value) {
        nameInput.value = profile?.full_name || session.user.user_metadata?.full_name || '';
      }
    } catch (e) { /* ignore */ }
  })();
});
