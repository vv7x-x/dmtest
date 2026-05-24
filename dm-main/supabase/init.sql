-- Supabase initialization SQL for dm bookstore (نسخة أساسية)
-- ⚠️ للإصلاح الكامل والسياسات المحدّثة شغّل: supabase/fix-database.sql
-- Run this in Supabase SQL Editor or via psql (with service role DB connection)

-- 1. UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tables

-- Books table
CREATE TABLE IF NOT EXISTS public.books (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  author text,
  price numeric,
  category text,
  language text,
  description text,
  image_url text,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_name text,
  customer_phone text,
  governorate text,
  address text,
  notes text,
  total_price numeric,
  shipping_cost numeric,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Order items
CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  book_id uuid REFERENCES public.books(id),
  quantity int,
  price numeric
);

-- Admin users table (list of auth UIDs that are allowed elevated rights)
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY
);

-- Profiles table: store public profile data per user; includes is_admin flag for client-side checks
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY,
  full_name text,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 3. Row Level Security (RLS) and Policies
-- Enable RLS where appropriate, then add safe policies.

-- Enable RLS
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if present so this script can be re-run safely
DROP POLICY IF EXISTS public_select_books ON public.books;
DROP POLICY IF EXISTS anon_insert_orders ON public.orders;
DROP POLICY IF EXISTS anon_select_orders ON public.orders;

DROP POLICY IF EXISTS admins_select_books ON public.books;
DROP POLICY IF EXISTS admins_insert_books ON public.books;
DROP POLICY IF EXISTS admins_update_books ON public.books;
DROP POLICY IF EXISTS admins_delete_books ON public.books;

DROP POLICY IF EXISTS admins_select_orders ON public.orders;
DROP POLICY IF EXISTS admins_insert_orders ON public.orders;
DROP POLICY IF EXISTS admins_update_orders ON public.orders;
DROP POLICY IF EXISTS admins_delete_orders ON public.orders;

DROP POLICY IF EXISTS admins_select_admins ON public.admin_users;
DROP POLICY IF EXISTS admins_insert_admins ON public.admin_users;
DROP POLICY IF EXISTS admins_update_admins ON public.admin_users;
DROP POLICY IF EXISTS admins_delete_admins ON public.admin_users;

DROP POLICY IF EXISTS profiles_select_self ON public.profiles;
DROP POLICY IF EXISTS profiles_insert_self ON public.profiles;
DROP POLICY IF EXISTS profiles_update_self ON public.profiles;
DROP POLICY IF EXISTS profiles_delete_admin ON public.profiles;

-- Allow public read-only access to books (catalog)
CREATE POLICY public_select_books ON public.books
  FOR SELECT USING (true);

-- Allow anonymous users to create orders (checkout)
CREATE POLICY anon_insert_orders ON public.orders
  FOR INSERT USING (true);

-- Prevent anonymous selects on orders by default
CREATE POLICY anon_select_orders ON public.orders
  FOR SELECT USING (auth.uid() IS NOT NULL AND exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

-- Allow order owners to see their own order (if you store owner uid in orders, adjust accordingly)
-- Note: For this app we assume orders are created anonymously; you can extend this policy later.

-- Admins: allow full management of books and orders if their auth.uid() exists in admin_users
-- Admins: allow full management of books and orders if their auth.uid() exists in admin_users
-- Split into per-command policies so INSERT only uses WITH CHECK (required by Postgres)
CREATE POLICY admins_select_books ON public.books
  FOR SELECT USING (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

CREATE POLICY admins_insert_books ON public.books
  FOR INSERT WITH CHECK (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

CREATE POLICY admins_update_books ON public.books
  FOR UPDATE USING (exists (select 1 from public.admin_users a where a.user_id = auth.uid())) WITH CHECK (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

CREATE POLICY admins_delete_books ON public.books
  FOR DELETE USING (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

CREATE POLICY admins_select_orders ON public.orders
  FOR SELECT USING (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

CREATE POLICY admins_insert_orders ON public.orders
  FOR INSERT WITH CHECK (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

CREATE POLICY admins_update_orders ON public.orders
  FOR UPDATE USING (exists (select 1 from public.admin_users a where a.user_id = auth.uid())) WITH CHECK (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

CREATE POLICY admins_delete_orders ON public.orders
  FOR DELETE USING (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

-- Admins (admin_users): split policies so INSERT uses only WITH CHECK
CREATE POLICY admins_select_admins ON public.admin_users
  FOR SELECT USING (auth.role() = 'supabase_admin');

CREATE POLICY admins_insert_admins ON public.admin_users
  FOR INSERT WITH CHECK (auth.role() = 'supabase_admin');

CREATE POLICY admins_update_admins ON public.admin_users
  FOR UPDATE USING (auth.role() = 'supabase_admin') WITH CHECK (auth.role() = 'supabase_admin');

CREATE POLICY admins_delete_admins ON public.admin_users
  FOR DELETE USING (auth.role() = 'supabase_admin');

-- Profiles policies: allow users to manage/select their own profile, and allow service-role to manage all
CREATE POLICY profiles_select_self ON public.profiles
  FOR SELECT USING (auth.uid() = id OR auth.role() = 'supabase_admin');

CREATE POLICY profiles_insert_self ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id OR auth.role() = 'supabase_admin');

CREATE POLICY profiles_update_self ON public.profiles
  FOR UPDATE USING (auth.uid() = id OR auth.role() = 'supabase_admin') WITH CHECK (auth.uid() = id OR auth.role() = 'supabase_admin');

CREATE POLICY profiles_delete_admin ON public.profiles
  FOR DELETE USING (auth.role() = 'supabase_admin');

-- 4. Indexes (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_books_category ON public.books(category);
CREATE INDEX IF NOT EXISTS idx_books_created_at ON public.books(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- 5. Notes:
-- - After running this script, create an admin auth user (via Auth > Users) and insert their user_id
--   into public.admin_users, or run the helper script provided in the repository to do that automatically.
-- - If you prefer public access to book covers, you can create a public storage bucket and use
--   getPublicUrl when uploading images from the client. Otherwise use signed URLs and server-side
--   access for private buckets.
