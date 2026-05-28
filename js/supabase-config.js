// Supabase Configuration for dm bookstore
const SUPABASE_URL = 'https://vjibucksajumamngxcku.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ydyFxFJepey5ShxRX6FcMg_BGAYpWD1';

function getSupabaseCreateFn() {
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    return window.supabase.createClient.bind(window.supabase);
  }
  if (typeof createClient === 'function') return createClient;
  return null;
}

function initSupabaseClient() {
  const create = getSupabaseCreateFn();
  if (!create) {
    console.error('Supabase SDK not found. Load @supabase/supabase-js before supabase-config.js');
    return null;
  }
  const client = create(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
  window.supabaseClient = client;
  window.supabase = client;
  return client;
}

window.getSupabaseClient = function getSupabaseClient() {
  if (window.supabaseClient) return window.supabaseClient;
  if (window.supabase && typeof window.supabase.auth !== 'undefined') return window.supabase;
  return initSupabaseClient();
};

/** Build app URLs that work from root, /auth/, and /account/ */
window.appHref = function appHref(relativePath) {
  const clean = String(relativePath || '').replace(/^\/+/, '');
  const metaRoot = document.querySelector('meta[name="app-root"]');
  if (metaRoot && metaRoot.content) {
    const base = metaRoot.content.replace(/\/?$/, '');
    return `${base}/${clean}`;
  }
  const parts = location.pathname.split('/').filter(Boolean);
  const last = parts[parts.length - 1] || '';
  const inSubfolder = last.endsWith('.html') && parts.length > 1;
  if (!inSubfolder) return clean;
  return `${'../'.repeat(parts.length - 1)}${clean}`;
};

function bootSupabase() {
  window.getSupabaseClient();
  if (window.dmBooks?.prefetchBooksList) {
    window.dmBooks.prefetchBooksList();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootSupabase);
} else {
  bootSupabase();
}
