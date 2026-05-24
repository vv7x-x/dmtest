-- ═══════════════════════════════════════════════════════════════
-- dm bookstore — إضافة أعمدة تعديل الكتب + Trigger updated_at
-- شغّل مرة واحدة في Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. إضافة الأعمدة الجديدة لجدول الكتب
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS publisher text;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS pages int;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS quantity int DEFAULT 0;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS additional_images jsonb DEFAULT '[]'::jsonb;

-- 2. إنشاء Trigger لتحديث updated_at تلقائياً عند التعديل
CREATE OR REPLACE FUNCTION public.set_books_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS books_updated_at ON public.books;
CREATE TRIGGER books_updated_at
  BEFORE UPDATE ON public.books
  FOR EACH ROW EXECUTE FUNCTION public.set_books_updated_at();

-- 3. تحديث الكتب الموجودة: تعيين updated_at مساوياً لـ created_at
UPDATE public.books SET updated_at = created_at WHERE updated_at IS NULL;

-- 4. تعيين is_featured لبعض الكتب الموجودة (اختياري)
-- UPDATE public.books SET is_featured = true WHERE title ILIKE '%مميز%';
