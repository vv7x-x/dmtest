-- ═══════════════════════════════════════════════════════════════
-- dm bookstore — الإصدار النهائي: إضافة أعمدة التعديل + Trigger
-- شغّل مرة واحدة في Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. إضافة أعمدة التعديل (آمنة — IF NOT EXISTS)
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS publisher text;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS pages int;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS quantity int DEFAULT 0;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS additional_images jsonb DEFAULT '[]'::jsonb;

-- 2. Trigger لتحديث updated_at تلقائياً عند كل تعديل
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

-- 3. تعبئة updated_at للكتب الموجودة
UPDATE public.books SET updated_at = created_at WHERE updated_at IS NULL;

-- 4. (اختياري) تفعيل is_featured لكتب مميزة
-- UPDATE public.books SET is_featured = true WHERE title ILIKE '%مميز%';

-- 5. إنشاء index على updated_at للفرز
CREATE INDEX IF NOT EXISTS idx_books_updated_at ON public.books(updated_at DESC);
