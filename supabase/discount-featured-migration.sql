-- ═══════════════════════════════════════════════════════════════
-- dm bookstore — إضافة أعمدة الخصم للكتب (آمن لإعادة التشغيل)
-- شغّل هذا الملف في Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. إضافة عمود نسبة الخصم للكتب
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS discount_percentage integer DEFAULT 0;

-- 2. تحديث RLS للتأكد من أن admin يقدر يعدل الحقول الجديدة (ال RLS موجودة بالفعل)
-- الأdmins يقدروا يعدلوا كل الأعمدة بما فيها discount_percentage
