-- ═══════════════════════════════════════════════════════════════
-- dm bookstore — إشعارات البريد الإلكتروني (Email Notifications)
-- ═══════════════════════════════════════════════════════════════
--
-- قبل تشغيل هذا الملف:
-- 1) فعّل pg_net extension من Supabase Dashboard → Database → Extensions
-- 2) أنشئ Edge Function: supabase functions deploy send-admin-notification --no-verify-jwt
-- 3) اضبط المتغيرات:
--    supabase secrets set RESEND_API_KEY=re_xxxxxxxxxx
--    supabase secrets set ADMIN_EMAIL=admin@example.com
--    supabase secrets set STORE_URL=https://your-domain.com
-- 4) أدخل بيانات الاتصال بالـ Edge Function:
--    INSERT INTO public.admin_settings (key, value) VALUES ('supabase_url', 'https://xxxxx.supabase.co');
--    INSERT INTO public.admin_settings (key, value) VALUES ('supabase_anon_key', 'eyJhbGciOi...');
--
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. تفعيل pg_net (تعمل من Dashboard أو من هنا لو متاح) ───
CREATE EXTENSION IF NOT EXISTS pg_net;

-- ─── 2. جدول إعدادات الأدمن ───────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- ─── 3. RLS لإعدادات الأدمن ───────────────────────────────────
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE pol record;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'admin_settings'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.admin_settings', pol.policyname);
  END LOOP;
END $$;

CREATE POLICY admin_settings_select ON public.admin_settings
  FOR SELECT USING (public.is_admin());

CREATE POLICY admin_settings_insert ON public.admin_settings
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY admin_settings_update ON public.admin_settings
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

GRANT SELECT, INSERT, UPDATE ON public.admin_settings TO authenticated;

-- ─── 4. دالة مساعدة لجلب إعداد ───────────────────────────────
CREATE OR REPLACE FUNCTION public.get_admin_setting(p_key text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_value text;
BEGIN
  SELECT value INTO v_value FROM public.admin_settings WHERE key = p_key;
  RETURN v_value;
END;
$$;

-- ─── 5. تحديث محفّز الطلبات ──────────────────────────────────
CREATE OR REPLACE FUNCTION public.notify_new_order()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_title text;
  v_message text;
  v_supabase_url text;
  v_anon_key text;
  v_admin_email text;
BEGIN
  v_title := 'طلب جديد';
  v_message := 'طلب جديد من ' || COALESCE(NEW.customer_name, 'عميل')
    || ' - ' || COALESCE(NEW.governorate, '')
    || ' - تليفون: ' || COALESCE(NEW.customer_phone, '');

  INSERT INTO public.notifications (type, title, message, reference_id)
  VALUES ('order', v_title, v_message, NEW.id);

  -- إرسال إيميل عبر Edge Function
  v_supabase_url := public.get_admin_setting('supabase_url');
  v_anon_key := public.get_admin_setting('supabase_anon_key');

  IF v_supabase_url IS NOT NULL AND v_anon_key IS NOT NULL THEN
    PERFORM net.http_post(
      url := v_supabase_url || '/functions/v1/send-admin-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || v_anon_key
      ),
      body := jsonb_build_object(
        'type', 'order',
        'title', v_title,
        'message', v_message,
        'reference_id', NEW.id::text
      )::text
    );
  END IF;

  RETURN NEW;
END;
$$;

-- ─── 6. تحديث محفّز رسائل التواصل ────────────────────────────
CREATE OR REPLACE FUNCTION public.notify_new_contact()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_title text;
  v_message text;
  v_supabase_url text;
  v_anon_key text;
  v_admin_email text;
BEGIN
  v_title := 'رسالة جديدة';
  v_message := 'رسالة جديدة من ' || COALESCE(NEW.name, 'زائر')
    || ' - بريد: ' || COALESCE(NEW.email, '')
    || ' - هاتف: ' || COALESCE(NEW.phone, '');

  INSERT INTO public.notifications (type, title, message, reference_id)
  VALUES ('contact', v_title, v_message, NEW.id);

  -- إرسال إيميل
  v_supabase_url := public.get_admin_setting('supabase_url');
  v_anon_key := public.get_admin_setting('supabase_anon_key');

  IF v_supabase_url IS NOT NULL AND v_anon_key IS NOT NULL THEN
    PERFORM net.http_post(
      url := v_supabase_url || '/functions/v1/send-admin-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || v_anon_key
      ),
      body := jsonb_build_object(
        'type', 'contact',
        'title', v_title,
        'message', v_message,
        'reference_id', NEW.id::text
      )::text
    );
  END IF;

  RETURN NEW;
END;
$$;

-- ─── 7. ترقية جدول الطلبات لو عايز تدخل رقم التيليفون ──────
-- (اختياري) أضف customer_phone لو مش موجود
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'orders' AND column_name = 'customer_phone'
  ) THEN
    ALTER TABLE public.orders ADD COLUMN customer_phone text;
  END IF;
END $$;
