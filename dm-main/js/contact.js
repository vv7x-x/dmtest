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

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإرسال...';
    if (msgEl) { msgEl.hidden = true; msgEl.textContent = ''; }

    try {
      const supabase = window.getSupabaseClient();
      if (!supabase) throw new Error('تعذر الاتصال بالخادم');

      let user_id = null;
      const { data: { session } } = await supabase.auth.getSession();
      if (session) user_id = session.user.id;

      const { error } = await supabase.from('contact_messages').insert([{
        user_id,
        name,
        email,
        message
      }]);
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
