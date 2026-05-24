-- ═══════════════════════════════════════════════════════════════
-- dm bookstore — إصلاح الباك اند (Supabase) — شغّل مرة واحدة
-- يجمع: checkout + admin + RLS + صلاحيات + تخزين الصور
-- آمن لإعادة التشغيل (idempotent)
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. دوال مساعدة ───────────────────────────────────────────

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

-- ─── 2. إتمام الطلب (Checkout) — تجاوز RLS للضيف ───────────────

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

  -- ربط الطلب بالمستخدم المسجّل إن وُجدت جلسة ولم يُمرَّر user_id
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

-- ─── 3. سياسات RLS — تصحيح الثغرات ─────────────────────────────

DROP POLICY IF EXISTS orders_public_insert ON public.orders;
CREATE POLICY orders_public_insert ON public.orders
  FOR INSERT
  WITH CHECK (
    (auth.uid() IS NULL AND user_id IS NULL)
    OR (auth.uid() IS NOT NULL AND user_id = auth.uid())
  );

DROP POLICY IF EXISTS order_items_public_insert ON public.order_items;
CREATE POLICY order_items_authenticated_insert ON public.order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_id AND o.user_id = auth.uid()
    )
  );

-- الأدمن: إدارة كاملة لعناصر الطلب (إن لم تكن موجودة)
DROP POLICY IF EXISTS order_items_admin_all ON public.order_items;
CREATE POLICY order_items_admin_all ON public.order_items
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- admin_users — التحقق من الصلاحية
DROP POLICY IF EXISTS admin_users_self_check ON public.admin_users;
CREATE POLICY admin_users_self_check ON public.admin_users
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS admin_users_admin_select ON public.admin_users;
CREATE POLICY admin_users_admin_select ON public.admin_users
  FOR SELECT USING (public.is_admin());

-- ─── 4. صلاحيات GRANT (تقليل صلاحيات anon) ───────────────────

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

GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.place_order TO anon, authenticated;

-- ─── 5. مزامنة is_admin + Storage أغلفة الكتب ─────────────────

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
-- 1) Settings → API → Reload schema (أو انتظر دقيقة)
-- 2) أضف مشرفاً:
--    INSERT INTO public.admin_users (user_id)
--    SELECT id FROM auth.users WHERE email = 'بريدك@هنا.com' LIMIT 1;
