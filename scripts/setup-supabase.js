#!/usr/bin/env node
/*
  setup-supabase.js

  Usage:
    SUPABASE_URL="https://your-project.supabase.co" \
    SUPABASE_SERVICE_ROLE="<SERVICE_ROLE_KEY>" \
    ADMIN_EMAIL="admin@example.com" \
    ADMIN_PASSWORD="StrongPassword123" \
    node scripts/setup-supabase.js

  This script will:
    1. Create an auth user (admin) via Supabase Admin API
    2. Insert the admin's user_id into the `admin_users` table via PostgREST
    3. Create a storage bucket `book-covers` and make it public (optional)

  Notes:
    - Requires the Supabase project's SERVICE ROLE key. Keep it secret.
    - The SQL migration `supabase/init.sql` should be executed first (manually via SQL Editor or psql).
*/

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const BUCKET_NAME = process.env.BUCKET_NAME || 'book-covers';
const MAKE_BUCKET_PUBLIC = (process.env.MAKE_BUCKET_PUBLIC || 'true') === 'true';

if (!SUPABASE_URL || !SERVICE_ROLE || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Missing required environment variables. See script header for usage.');
  process.exit(1);
}

const fetch = global.fetch || require('node-fetch');

async function createAdminUser() {
  const url = `${SUPABASE_URL.replace(/\/+$/,'')}/auth/v1/admin/users`;
  const body = {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE,
      'Authorization': `Bearer ${SERVICE_ROLE}`
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Create user failed: ${res.status} ${txt}`);
  }

  const data = await res.json();
  return data;
}

async function insertAdminUserToTable(userId) {
  const url = `${SUPABASE_URL.replace(/\/+$/,'')}/rest/v1/admin_users`;
  const body = { user_id: userId };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE,
      'Authorization': `Bearer ${SERVICE_ROLE}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(body)
  });

  if (![200,201].includes(res.status)) {
    const txt = await res.text();
    throw new Error(`Insert admin_users failed: ${res.status} ${txt}`);
  }

  return await res.json();
}

async function upsertProfile(userId) {
  const url = `${SUPABASE_URL.replace(/\/+$/,'')}/rest/v1/profiles`;
  const body = { id: userId, full_name: 'Admin', is_admin: true };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE,
      'Authorization': `Bearer ${SERVICE_ROLE}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(body)
  });

  // If profile exists, try to update instead (upsert behaviour)
  if (res.status === 201 || res.status === 200) {
    return await res.json();
  }

  // Try PATCH to upsert (PostgREST upsert alternative)
  const patchRes = await fetch(url + `?id=eq.${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE,
      'Authorization': `Bearer ${SERVICE_ROLE}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ full_name: 'Admin', is_admin: true })
  });

  if (![200,201].includes(patchRes.status)) {
    const txt = await patchRes.text();
    throw new Error(`Upsert profile failed: ${patchRes.status} ${txt}`);
  }

  return await patchRes.json();
}

async function createBucket(name, isPublic=true) {
  const url = `${SUPABASE_URL.replace(/\/+$/,'')}/storage/v1/bucket`;
  const body = { name, public: isPublic };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE,
      'Authorization': `Bearer ${SERVICE_ROLE}`
    },
    body: JSON.stringify(body)
  });

  const text = await res.text();
  if (!res.ok) {
    // If bucket already exists, supabase returns 409; we'll treat as ok
    if (res.status === 409) {
      console.log(`Bucket ${name} already exists (status 409).`);
      return { name };
    }
    throw new Error(`Create bucket failed: ${res.status} ${text}`);
  }

  try { return JSON.parse(text); } catch (e) { return { name }; }
}

(async () => {
  try {
    console.log('1) Creating admin user...');
    const user = await createAdminUser();
    const userId = user.id || (user.user && user.user.id) || null;
    if (!userId) {
      console.warn('Could not read user id from response, response body:');
      console.log(user);
      throw new Error('No user id returned');
    }

    console.log('Admin user created with id:', userId);

    console.log('2) Inserting admin id into admin_users table...');
    const insertRes = await insertAdminUserToTable(userId);
    console.log('Inserted admin_users row:', insertRes);

    console.log('3) Upserting profile with is_admin flag...');
    const profileRes = await upsertProfile(userId);
    console.log('Upserted profile row:', profileRes);

    console.log(`4) Creating storage bucket '${BUCKET_NAME}' (public=${MAKE_BUCKET_PUBLIC})...`);
    const bucket = await createBucket(BUCKET_NAME, MAKE_BUCKET_PUBLIC);
    console.log('Bucket result:', bucket);

    console.log('\nSetup complete. Next steps:');
    console.log('- Run the SQL in supabase/init.sql (SQL Editor) if you have not yet.');
    console.log('- In client code keep only the ANON key. Use service role only on server-side scripts like this.');
    console.log(`- Public covers URL (example): ${SUPABASE_URL.replace(/\/+$/,'')}/storage/v1/object/public/${BUCKET_NAME}/<filePath>`);

  } catch (err) {
    console.error('Error during setup:', err.message || err);
    process.exit(1);
  }
})();
