-- ═══════════════════════════════════════════════════════════════
-- dm bookstore — إشعارات الأدمن (Admin Notifications)
-- شغّل الملف كاملاً مرة واحدة في Supabase SQL Editor.
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. جدول الإشعارات ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  type text NOT NULL DEFAULT 'order',
  title text NOT NULL,
  message text,
  reference_id uuid,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ─── 2. الفهارس ────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);

-- ─── 3. RLS ────────────────────────────────────────────────────

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE pol record;
BEGIN
  FOR pol IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'notifications'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.notifications', pol.policyname);
  END LOOP;
END $$;

CREATE POLICY notifications_admin_select ON public.notifications
  FOR SELECT USING (public.is_admin());

CREATE POLICY notifications_admin_insert ON public.notifications
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY notifications_admin_update ON public.notifications
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY notifications_admin_delete ON public.notifications
  FOR DELETE USING (public.is_admin());

-- ─── 4. محفّز الإشعارات عند إنشاء طلب جديد ────────────────────

CREATE OR REPLACE FUNCTION public.notify_new_order()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_title text;
  v_message text;
BEGIN
  IF current_setting('role', true) = 'anon' THEN
    v_title := 'طلب جديد';
    v_message := 'طلب جديد من ' || COALESCE(NEW.customer_name, 'عميل') || ' - ' || COALESCE(NEW.governorate, '');
  ELSE
    v_title := 'طلب جديد';
    v_message := 'طلب جديد من ' || COALESCE(NEW.customer_name, 'عميل') || ' - ' || COALESCE(NEW.governorate, '');
  END IF;

  INSERT INTO public.notifications (type, title, message, reference_id)
  VALUES ('order', v_title, v_message, NEW.id);

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_order_created ON public.orders;
CREATE TRIGGER on_order_created
  AFTER INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_order();

-- ─── 5. محفّز الإشعارات عند إرسال رسالة تواصل جديدة ──────────

CREATE OR REPLACE FUNCTION public.notify_new_contact()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.notifications (type, title, message, reference_id)
  VALUES (
    'contact',
    'رسالة جديدة',
    'رسالة جديدة من ' || COALESCE(NEW.name, 'زائر'),
    NEW.id
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_contact_created ON public.contact_messages;
CREATE TRIGGER on_contact_created
  AFTER INSERT ON public.contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_contact();

-- ─── 6. الصلاحيات ──────────────────────────────────────────────

GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
