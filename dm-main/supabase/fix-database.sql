-- ═══════════════════════════════════════════════════════════════
-- dm bookstore — إصلاح وتهيئة قاعدة البيانات (Supabase SQL Editor)
-- شغّل الملف كاملاً مرة واحدة. آمن لإعادة التشغيل (idempotent).
-- ═══════════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── 1. الجداول ───────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.books (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  author text,
  price numeric DEFAULT 0,
  category text,
  language text DEFAULT 'ar',
  description text,
  image_url text,
  is_best_seller boolean DEFAULT false,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name text,
  customer_phone text,
  customer_email text,
  governorate text,
  address text,
  notes text,
  total_price numeric DEFAULT 0,
  shipping_cost numeric DEFAULT 0,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  book_id uuid REFERENCES public.books(id) ON DELETE SET NULL,
  quantity int DEFAULT 1,
  price numeric DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone text,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- أعمدة إضافية إن وُجدت الجداول قديماً
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- ─── 2. الدوال والمحفزات ─────────────────────────────────────

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users a WHERE a.user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.check_is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_admin();
$$;

CREATE OR REPLACE FUNCTION public.sync_profile_admin_flag()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles SET is_admin = true, updated_at = now() WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_admin_user_added ON public.admin_users;
CREATE TRIGGER on_admin_user_added
  AFTER INSERT ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.sync_profile_admin_flag();

UPDATE public.profiles p
SET is_admin = true, updated_at = now()
WHERE EXISTS (SELECT 1 FROM public.admin_users a WHERE a.user_id = p.id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO UPDATE
    SET full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
        updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.set_profiles_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_profiles_updated_at();

-- مزامنة المستخدمين الحاليين إلى profiles
INSERT INTO public.profiles (id, full_name)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1))
FROM auth.users u
ON CONFLICT (id) DO NOTHING;

-- ─── 3. الفهارس ───────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_books_category ON public.books(category);
CREATE INDEX IF NOT EXISTS idx_books_created_at ON public.books(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact_messages(created_at DESC);

-- ─── 4. RLS ───────────────────────────────────────────────────

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- حذف السياسات القديمة
DO $$
DECLARE pol record;
BEGIN
  FOR pol IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('books','orders','order_items','admin_users','profiles','contact_messages')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- كتب: قراءة للجميع، إدارة للأدمن
CREATE POLICY books_public_select ON public.books
  FOR SELECT USING (true);

CREATE POLICY books_admin_insert ON public.books
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY books_admin_update ON public.books
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY books_admin_delete ON public.books
  FOR DELETE USING (public.is_admin());

-- طلبات: إنشاء للضيف (بدون user) أو للمسجّل (user_id = auth.uid())
CREATE POLICY orders_public_insert ON public.orders
  FOR INSERT WITH CHECK (
    (auth.uid() IS NULL AND user_id IS NULL)
    OR (auth.uid() IS NOT NULL AND user_id = auth.uid())
  );

CREATE POLICY orders_owner_select ON public.orders
  FOR SELECT USING (
    public.is_admin()
    OR (auth.uid() IS NOT NULL AND user_id = auth.uid())
  );

CREATE POLICY orders_admin_update ON public.orders
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY orders_admin_delete ON public.orders
  FOR DELETE USING (public.is_admin());

-- عناصر الطلب — الإدراج المباشر للمسجّلين فقط (الضيف عبر place_order)
CREATE POLICY order_items_authenticated_insert ON public.order_items
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_id AND o.user_id = auth.uid()
    )
  );

CREATE POLICY order_items_owner_select ON public.order_items
  FOR SELECT USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_id AND o.user_id = auth.uid()
    )
  );

CREATE POLICY order_items_admin_all ON public.order_items
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ملفات المستخدمين
CREATE POLICY profiles_select_self ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.is_admin());

CREATE POLICY profiles_insert_self ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id OR public.is_admin());

CREATE POLICY profiles_update_self ON public.profiles
  FOR UPDATE USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (auth.uid() = id OR public.is_admin());

-- رسائل التواصل
CREATE POLICY contact_public_insert ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY contact_admin_select ON public.contact_messages
  FOR SELECT USING (public.is_admin());

CREATE POLICY contact_admin_update ON public.contact_messages
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

-- جدول الأدمن: المستخدم يتحقق من صفه + المشرفون يرون الكل
CREATE POLICY admin_users_self_check ON public.admin_users
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY admin_users_admin_select ON public.admin_users
  FOR SELECT USING (public.is_admin());

-- ─── 5. بيانات تجريبية (كتب) — تُدرج فقط إن كان الجدول فارغاً ───

INSERT INTO public.books (title, author, price, category, language, description, in_stock)
SELECT * FROM (VALUES
  ('في قلبي أنثى عبرية', 'خولة حمدي', 120, 'novels', 'ar', 'رواية رومانسية عربية شهيرة.', true),
  ('Atomic Habits', 'James Clear', 250, 'self-development', 'en', 'بناء عادات إيجابية دائمة.', true),
  ('قصص الأنبياء للأطفال', 'مجموعة مؤلفين', 85, 'children', 'ar', 'قصص تربوية مبسّطة للأطفال.', true),
  ('الأيام', 'طه حسين', 95, 'novels', 'ar', 'سيرة ذاتية أدبية كلاسيكية.', true),
  ('Sapiens', 'Yuval Noah Harari', 320, 'history', 'en', 'تاريخ مختصر للبشرية.', true)
) AS v(title, author, price, category, language, description, in_stock)
WHERE NOT EXISTS (SELECT 1 FROM public.books LIMIT 1);

-- ─── 6. دالة إتمام الطلب (Checkout) ────────────────────────────

CREATE OR REPLACE FUNCTION public.place_order(
  p_customer_name text,
  p_customer_phone text,
  p_customer_email text,
  p_governorate text,
  p_address text,
  p_notes text,
  p_total_price numeric,
  p_shipping_cost numeric,
  p_user_id uuid DEFAULT NULL,
  p_items jsonb DEFAULT '[]'::jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_order_id uuid;
  v_item jsonb;
  v_book_id uuid;
  v_qty int;
BEGIN
  IF p_customer_name IS NULL OR length(trim(p_customer_name)) < 2 THEN
    RAISE EXCEPTION 'invalid_customer_name';
  END IF;
  IF p_customer_phone IS NULL OR length(trim(p_customer_phone)) < 8 THEN
    RAISE EXCEPTION 'invalid_phone';
  END IF;
  IF p_governorate IS NULL OR length(trim(p_governorate)) < 1 THEN
    RAISE EXCEPTION 'invalid_governorate';
  END IF;
  IF p_address IS NULL OR length(trim(p_address)) < 5 THEN
    RAISE EXCEPTION 'invalid_address';
  END IF;
  IF jsonb_array_length(COALESCE(p_items, '[]'::jsonb)) < 1 THEN
    RAISE EXCEPTION 'empty_cart';
  END IF;

  IF p_user_id IS NULL AND auth.uid() IS NOT NULL THEN
    p_user_id := auth.uid();
  END IF;

  INSERT INTO public.orders (
    user_id, customer_name, customer_phone, customer_email,
    governorate, address, notes, total_price, shipping_cost, status
  ) VALUES (
    p_user_id,
    trim(p_customer_name),
    trim(p_customer_phone),
    nullif(trim(COALESCE(p_customer_email, '')), ''),
    trim(p_governorate),
    trim(p_address),
    nullif(trim(COALESCE(p_notes, '')), ''),
    COALESCE(p_total_price, 0),
    COALESCE(p_shipping_cost, 0),
    'pending'
  )
  RETURNING id INTO v_order_id;

  FOR v_item IN SELECT value FROM jsonb_array_elements(p_items)
  LOOP
    v_book_id := (v_item->>'book_id')::uuid;
    v_qty := GREATEST(COALESCE((v_item->>'quantity')::int, 1), 1);

    IF NOT EXISTS (
      SELECT 1 FROM public.books b
      WHERE b.id = v_book_id AND COALESCE(b.in_stock, true) = true
    ) THEN
      RAISE EXCEPTION 'book_unavailable';
    END IF;

    INSERT INTO public.order_items (order_id, book_id, quantity, price)
    VALUES (
      v_order_id,
      v_book_id,
      v_qty,
      COALESCE((v_item->>'price')::numeric, 0)
    );
  END LOOP;

  RETURN jsonb_build_object('ok', true, 'order_id', v_order_id);
END;
$$;

-- ─── 7. منح الصلاحيات ─────────────────────────────────────────

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.books TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.books TO authenticated;

REVOKE ALL ON public.orders FROM anon;
GRANT INSERT ON public.orders TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;

REVOKE ALL ON public.order_items FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.order_items TO authenticated;

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.admin_users TO authenticated;
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE ON public.contact_messages TO authenticated;

GRANT EXECUTE ON FUNCTION public.check_is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.place_order TO anon, authenticated;

-- ─── 8. Storage — bucket أغلفة الكتب ─────────────────────────

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'book-covers',
  'book-covers',
  true,
  5242880,
  ARRAY['image/jpeg','image/png','image/webp','image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880;

DROP POLICY IF EXISTS book_covers_public_read ON storage.objects;
DROP POLICY IF EXISTS book_covers_admin_insert ON storage.objects;
DROP POLICY IF EXISTS book_covers_admin_update ON storage.objects;
DROP POLICY IF EXISTS book_covers_admin_delete ON storage.objects;

CREATE POLICY book_covers_public_read ON storage.objects
  FOR SELECT USING (bucket_id = 'book-covers');

CREATE POLICY book_covers_admin_insert ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'book-covers' AND public.is_admin());

CREATE POLICY book_covers_admin_update ON storage.objects
  FOR UPDATE USING (bucket_id = 'book-covers' AND public.is_admin());

CREATE POLICY book_covers_admin_delete ON storage.objects
  FOR DELETE USING (bucket_id = 'book-covers' AND public.is_admin());

-- ═══ بعد التشغيل ═══
-- 1) شغّل أيضاً backend-fix.sql إن كان المشروع قديماً
-- 2) Settings → API → Reload schema
-- 3) أضف مشرفاً: INSERT INTO admin_users (user_id) SELECT id FROM auth.users WHERE email = '...';
-- 4) تأكد أن Email provider مفعّل في Auth > Providers
