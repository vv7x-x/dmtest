// Manage header links visibility based on Supabase auth session
window.initSession = async function initSession() {
  var supabase = window.getSupabaseClient && window.getSupabaseClient();
  if (!supabase) return;

  async function updateHeader() {
    try {
      var { data: { session } } = await supabase.auth.getSession();
      var isLoggedIn = !!session;
      var navLogin = document.getElementById('navLogin');
      var navRegister = document.getElementById('navRegister');
      var navAccount = document.getElementById('navAccount');

      if (navLogin) navLogin.style.display = isLoggedIn ? 'none' : '';
      if (navRegister) navRegister.style.display = isLoggedIn ? 'none' : '';
      if (navAccount) {
        navAccount.style.display = isLoggedIn ? '' : 'none';
        if (isLoggedIn) navAccount.href = window.appHref ? appHref('account/profile.html') : '/account/profile.html';
      }

      var logoutBtn = document.getElementById('navLogout');
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
            if (window.dmRouter) { dmRouter.navigate('index.html'); } else { window.location.href = window.appHref ? appHref('index.html') : '/'; }
          });
          var header = document.querySelector('.header-actions') || document.querySelector('.header-container');
          if (header) header.appendChild(logoutBtn);
        }
      } else if (logoutBtn) {
        logoutBtn.remove();
      }
    } catch (err) {
      console.error('updateHeader error', err);
    }
  }

  updateHeader().catch(function (err) {
    console.warn("[session] updateHeader:", err);
  });

  if (supabase.auth && supabase.auth.onAuthStateChange) {
    supabase.auth.onAuthStateChange(function () {
      updateHeader().catch(function (err) {
        console.warn("[session] onAuthStateChange:", err);
      });
    });
  }
};
document.addEventListener('DOMContentLoaded', window.initSession);
