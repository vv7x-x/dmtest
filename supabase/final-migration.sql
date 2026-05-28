-- ═══════════════════════════════════════════════════════════════
-- dm bookstore — التحديثات النهائية (شغّل مرة واحدة)
-- آمن لإعادة التشغيل (Idempotent)
-- ═══════════════════════════════════════════════════════════════

-- 1. أعمدة إضافية للكتب (إن لم تكن موجودة)
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS publisher text;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS pages int;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS quantity int DEFAULT 0;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS discount_percentage integer DEFAULT 0;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS additional_images jsonb DEFAULT '[]'::jsonb;

-- 2. تفعيل is_featured لبعض الكتب (اختياري — عدّل حسب رغبتك)
-- UPDATE public.books SET is_featured = true WHERE title ILIKE '%مميز%';
