// Contact form — saves to contact_messages
window.initContact = function initContact() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  // Avoid duplicate listeners
  if (form.dataset.initContact) return;
  form.dataset.initContact = '1';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    var msgEl = document.getElementById('contactMessage');
    var btn = form.querySelector('button[type="submit"]');
    var orig = btn.innerHTML;

    var name = document.getElementById('contactName').value.trim();
    var email = document.getElementById('contactEmail').value.trim();
    var message = document.getElementById('contactBody').value.trim();

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإرسال...';
    if (msgEl) { msgEl.hidden = true; msgEl.textContent = ''; }

    try {
      var supabase = window.getSupabaseClient();
      if (!supabase) throw new Error('تعذر الاتصال بالخادم');

      var user_id = null;
      var { data: { session } } = await supabase.auth.getSession();
      if (session) user_id = session.user.id;

      var { error } = await supabase.from('contact_messages').insert([{
        user_id: user_id,
        name: name,
        email: email,
        message: message
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
      var supabase = window.getSupabaseClient();
      var { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      var emailInput = document.getElementById('contactEmail');
      if (emailInput && !emailInput.value) emailInput.value = session.user.email || '';
      var { data: profile } = await supabase.from('profiles').select('full_name').eq('id', session.user.id).maybeSingle();
      var nameInput = document.getElementById('contactName');
      if (nameInput && !nameInput.value) {
        nameInput.value = profile?.full_name || session.user.user_metadata?.full_name || '';
      }
    } catch (e) { /* ignore */ }
  })();
};
document.addEventListener('DOMContentLoaded', window.initContact);
