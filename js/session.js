// Manage header links visibility based on Supabase auth session
document.addEventListener('DOMContentLoaded', async () => {
  const supabase = window.getSupabaseClient && window.getSupabaseClient();
  if (!supabase) return;

  async function updateHeader() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const isLoggedIn = !!session;
      const navLogin = document.getElementById('navLogin');
      const navRegister = document.getElementById('navRegister');
      const navAccount = document.getElementById('navAccount');

      if (navLogin) navLogin.style.display = isLoggedIn ? 'none' : '';
      if (navRegister) navRegister.style.display = isLoggedIn ? 'none' : '';
      if (navAccount) {
        navAccount.style.display = isLoggedIn ? '' : 'none';
        if (isLoggedIn) navAccount.href = window.appHref ? appHref('account/profile.html') : '/account/profile.html';
      }

      let logoutBtn = document.getElementById('navLogout');
      if (isLoggedIn) {
        if (!logoutBtn) {
          logoutBtn = document.createElement('a');
          logoutBtn.id = 'navLogout';
          logoutBtn.href = '#';
          logoutBtn.className = 'nav-logout-link';
          logoutBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> خروج';
          logoutBtn.addEventListener('click', async (ev) => {
            ev.preventDefault();
            await supabase.auth.signOut();
            window.location.href = window.appHref ? appHref('index.html') : '/';
          });
          const header = document.querySelector('.header-actions') || document.querySelector('.header-container');
          if (header) header.appendChild(logoutBtn);
        }
      } else if (logoutBtn) {
        logoutBtn.remove();
      }
    } catch (err) {
      console.error('updateHeader error', err);
    }
  }

  updateHeader().catch((err) => {
    console.warn("[session] updateHeader:", err);
  });

  if (supabase.auth && supabase.auth.onAuthStateChange) {
    supabase.auth.onAuthStateChange(() => {
      updateHeader().catch((err) => {
        console.warn("[session] onAuthStateChange:", err);
      });
    });
  }
});
