-- ═══════════════════════════════════════════════════════════════
-- dm bookstore — إضافة جداول المحافظات والمدن
-- شغّل هذا الملف في Supabase SQL Editor بعد fix-database.sql
-- آمن لإعادة التشغيل (idempotent)
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. جدول المحافظات ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.governorates (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name_ar text NOT NULL,
  name_en text NOT NULL,
  shipping_cost numeric NOT NULL DEFAULT 0,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ─── 2. جدول المدن / المراكز / الإدارات ────────────────────────
CREATE TABLE IF NOT EXISTS public.cities (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  governorate_id uuid NOT NULL REFERENCES public.governorates(id) ON DELETE CASCADE,
  name_ar text NOT NULL,
  name_en text NOT NULL,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ─── 3. الفهرس ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_cities_governorate_id ON public.cities(governorate_id);
CREATE INDEX IF NOT EXISTS idx_governorates_sort ON public.governorates(sort_order);
CREATE INDEX IF NOT EXISTS idx_cities_sort ON public.cities(sort_order);

-- ─── 4. RLS ────────────────────────────────────────────────────
ALTER TABLE public.governorates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE pol record;
BEGIN
  FOR pol IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('governorates','cities')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

CREATE POLICY gov_cities_public_select ON public.governorates
  FOR SELECT USING (true);

CREATE POLICY gov_admin_insert ON public.governorates
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY gov_admin_update ON public.governorates
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY gov_admin_delete ON public.governorates
  FOR DELETE USING (public.is_admin());

CREATE POLICY cities_public_select ON public.cities
  FOR SELECT USING (true);

CREATE POLICY cities_admin_insert ON public.cities
  FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY cities_admin_update ON public.cities
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY cities_admin_delete ON public.cities
  FOR DELETE USING (public.is_admin());

-- ─── 5. الصلاحيات ──────────────────────────────────────────────
GRANT SELECT ON public.governorates TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.governorates TO authenticated;

GRANT SELECT ON public.cities TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cities TO authenticated;

-- ─── 6. دوال RPC لجلب البيانات ─────────────────────────────────

-- جلب جميع المحافظات (مرتبة)
CREATE OR REPLACE FUNCTION public.get_governorates()
RETURNS SETOF public.governorates
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.governorates ORDER BY sort_order ASC, name_ar ASC;
$$;

GRANT EXECUTE ON FUNCTION public.get_governorates() TO anon, authenticated;

-- جلب مدن محافظة معينة
CREATE OR REPLACE FUNCTION public.get_cities(p_governorate_id uuid)
RETURNS SETOF public.cities
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.cities
  WHERE governorate_id = p_governorate_id
  ORDER BY sort_order ASC, name_ar ASC;
$$;

GRANT EXECUTE ON FUNCTION public.get_cities(uuid) TO anon, authenticated;

-- ─── 7. بيانات المحافظات (27 محافظة) ────────────────────────────

-- ندرج فقط إن كان الجدول فارغاً
INSERT INTO public.governorates (name_ar, name_en, shipping_cost, sort_order)
SELECT * FROM (VALUES
  ('القاهرة', 'Cairo', 50, 1),
  ('الجيزة', 'Giza', 50, 2),
  ('الإسكندرية', 'Alexandria', 55, 3),
  ('الدقهلية', 'Dakahlia', 60, 4),
  ('الشرقية', 'Sharqia', 60, 5),
  ('القليوبية', 'Qalyubia', 55, 6),
  ('الغربية', 'Gharbia', 60, 7),
  ('المنوفية', 'Menofia', 60, 8),
  ('البحيرة', 'Beheira', 60, 9),
  ('كفر الشيخ', 'Kafr El Sheikh', 65, 10),
  ('دمياط', 'Damietta', 65, 11),
  ('بورسعيد', 'Port Said', 65, 12),
  ('الإسماعيلية', 'Ismailia', 65, 13),
  ('السويس', 'Suez', 65, 14),
  ('شمال سيناء', 'North Sinai', 90, 15),
  ('جنوب سيناء', 'South Sinai', 90, 16),
  ('بني سويف', 'Beni Suef', 70, 17),
  ('الفيوم', 'Fayoum', 70, 18),
  ('المنيا', 'Minya', 75, 19),
  ('أسيوط', 'Assiut', 75, 20),
  ('سوهاج', 'Sohag', 80, 21),
  ('قنا', 'Qena', 80, 22),
  ('الأقصر', 'Luxor', 80, 23),
  ('أسوان', 'Aswan', 85, 24),
  ('البحر الأحمر', 'Red Sea', 90, 25),
  ('مطروح', 'Matrouh', 90, 26),
  ('الوادي الجديد', 'New Valley', 95, 27)
) AS v(name_ar, name_en, shipping_cost, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.governorates LIMIT 1);

-- ─── 8. بيانات المدن / المراكز / الإدارات ──────────────────────

-- ندرج المدن فقط إن كان الجدول فارغاً
INSERT INTO public.cities (governorate_id, name_ar, name_en, sort_order)
SELECT g.id, v.name_ar, v.name_en, v.sort_order
FROM (
  VALUES
    -- القاهرة (1)
    ('القاهرة', ' وسط البلد', 'Downtown', 1),
    ('القاهرة', 'مصر الجديدة', 'Heliopolis', 2),
    ('القاهرة', 'مدينة نصر', 'Nasr City', 3),
    ('القاهرة', 'المعادي', 'Maadi', 4),
    ('القاهرة', 'العباسية', 'Abbaseya', 5),
    ('القاهرة', 'شبرا', 'Shubra', 6),
    ('القاهرة', 'الزمالك', 'Zamalek', 7),
    ('القاهرة', 'المهندسين', 'Mohandeseen', 8),
    ('القاهرة', 'التجمع الخامس', 'Fifth Settlement', 9),
    ('القاهرة', 'مدينة الشروق', 'Shorouk City', 10),
    ('القاهرة', 'مدينة بدر', 'Badr City', 11),
    ('القاهرة', 'المرج', 'El Marg', 12),
    ('القاهرة', 'حلوان', 'Helwan', 13),
    ('القاهرة', 'المطرية', 'Matareya', 14),
    ('القاهرة', 'عين شمس', 'Ain Shams', 15),
    ('القاهرة', 'السلام', 'El Salam', 16),

    -- الجيزة (2)
    ('الجيزة', 'الدقي', 'Dokki', 1),
    ('الجيزة', 'العجوزة', 'Agouza', 2),
    ('الجيزة', 'الهرم', 'Haram', 3),
    ('الجيزة', 'فيصل', 'Faisal', 4),
    ('الجيزة', 'المهندسين', 'Mohandeseen', 5),
    ('الجيزة', 'السادس من أكتوبر', '6th October City', 6),
    ('الجيزة', 'الشيخ زايد', 'Sheikh Zayed', 7),
    ('الجيزة', 'إمبابة', 'Imbaba', 8),
    ('الجيزة', 'البدرشين', 'Badrasheen', 9),
    ('الجيزة', 'العياط', 'Aiyat', 10),
    ('الجيزة', 'أوسيم', 'Ossim', 11),
    ('الجيزة', 'كرداسة', 'Kerdasa', 12),
    ('الجيزة', 'الواحات', 'Oases', 13),

    -- الإسكندرية (3)
    ('الإسكندرية', 'وسط المدينة', 'Downtown', 1),
    ('الإسكندرية', 'سيدي جابر', 'Sidi Gaber', 2),
    ('الإسكندرية', 'سان ستيفانو', 'San Stefano', 3),
    ('الإسكندرية', 'محطة الرمل', 'Mahatet El Raml', 4),
    ('الإسكندرية', 'العصافرة', 'Asafra', 5),
    ('الإسكندرية', 'المنتزه', 'Montaza', 6),
    ('الإسكندرية', 'برج العرب', 'Borg El Arab', 7),
    ('الإسكندرية', 'أبو قير', 'Abu Qir', 8),
    ('الإسكندرية', 'كامب شيزار', 'Camp Caesar', 9),
    ('الإسكندرية', 'السيوف', 'El Soyof', 10),
    ('الإسكندرية', 'كرموز', 'Karmouz', 11),

    -- الدقهلية (4)
    ('الدقهلية', 'المنصورة', 'Mansoura', 1),
    ('الدقهلية', 'طلخا', 'Talkha', 2),
    ('الدقهلية', 'ميت غمر', 'Mit Ghamr', 3),
    ('الدقهلية', 'دكرنس', 'Dekernes', 4),
    ('الدقهلية', 'أجا', 'Aga', 5),
    ('الدقهلية', 'السنبلاوين', 'Sinbillawin', 6),
    ('الدقهلية', 'تمي الأمديد', 'Tami El Amdid', 7),
    ('الدقهلية', 'نبروه', 'Nabroh', 8),
    ('الدقهلية', 'بلقاس', 'Bilqas', 9),
    ('الدقهلية', 'شربين', 'Sherbin', 10),
    ('الدقهلية', 'الجمالية', 'Gamalia', 11),
    ('الدقهلية', 'منية النصر', 'Menia El Nasr', 12),

    -- الشرقية (5)
    ('الشرقية', 'الزقازيق', 'Zagazig', 1),
    ('الشرقية', 'بلبيس', 'Belbeis', 2),
    ('الشرقية', 'العاشر من رمضان', '10th of Ramadan', 3),
    ('الشرقية', 'منيا القمح', 'Minya El Qamh', 4),
    ('الشرقية', 'أبو حماد', 'Abu Hammad', 5),
    ('الشرقية', 'ههيا', 'Hehya', 6),
    ('الشرقية', 'أبو كبير', 'Abu Kebir', 7),
    ('الشرقية', 'فاقوس', 'Faqous', 8),
    ('الشرقية', 'كفر صقر', 'Kafr Saqr', 9),
    ('الشرقية', 'الحسينية', 'Husseiniya', 10),
    ('الشرقية', 'صان الحجر', 'San El Hagar', 11),

    -- القليوبية (6)
    ('القليوبية', 'بنها', 'Banha', 1),
    ('القليوبية', 'شبرا الخيمة', 'Shubra El Kheima', 2),
    ('القليوبية', 'قليوب', 'Qalyub', 3),
    ('القليوبية', 'الخانكة', 'Khanka', 4),
    ('القليوبية', 'كفر شكر', 'Kafr Shukr', 5),
    ('القليوبية', 'طوخ', 'Tukh', 6),
    ('القليوبية', 'قها', 'Qaha', 7),
    ('القليوبية', 'العبور', 'Obour', 8),

    -- الغربية (7)
    ('الغربية', 'طنطا', 'Tanta', 1),
    ('الغربية', 'المحلة الكبرى', 'Mahalla El Kubra', 2),
    ('الغربية', 'كفر الزيات', 'Kafr El Zayat', 3),
    ('الغربية', 'بسيون', 'Basyoun', 4),
    ('الغربية', 'السنطة', 'El Santa', 5),
    ('الغربية', 'قطور', 'Qutour', 6),
    ('الغربية', 'سمنود', 'Sammanoud', 7),
    ('الغربية', 'زفتى', 'Zefta', 8),

    -- المنوفية (8)
    ('المنوفية', 'شبين الكوم', 'Shebin El Kom', 1),
    ('المنوفية', 'منوف', 'Menouf', 2),
    ('المنوفية', 'الباجور', 'Bagour', 3),
    ('المنوفية', 'أشمون', 'Ashmon', 4),
    ('المنوفية', 'تلا', 'Tala', 5),
    ('المنوفية', 'قويسنا', 'Quesna', 6),
    ('المنوفية', 'الشهداء', 'Shohada', 7),
    ('المنوفية', 'بركة السبع', 'Berkat El Saba', 8),

    -- البحيرة (9)
    ('البحيرة', 'دمنهور', 'Damanhour', 1),
    ('البحيرة', 'كفر الدوار', 'Kafr El Dawar', 2),
    ('البحيرة', 'رشيد', 'Rashid', 3),
    ('البحيرة', 'إدكو', 'Edko', 4),
    ('البحيرة', 'أبو المطامير', 'Abu El Matamir', 5),
    ('البحيرة', 'المحمودية', 'Mahmoudia', 6),
    ('البحيرة', 'الرحمانية', 'Rahmaniya', 7),
    ('البحيرة', 'إيتاي البارود', 'Itay El Baroud', 8),
    ('البحيرة', 'حوش عيسى', 'Housh Eissa', 9),
    ('البحيرة', 'شبراخيت', 'Shubrakhit', 10),
    ('البحيرة', 'كوم حمادة', 'Kom Hamada', 11),
    ('البحيرة', 'بدر', 'Badr', 12),
    ('البحيرة', 'النوبارية', 'Nubaria', 13),

    -- كفر الشيخ (10)
    ('كفر الشيخ', 'كفر الشيخ', 'Kafr El Sheikh', 1),
    ('كفر الشيخ', 'دسوق', 'Desouq', 2),
    ('كفر الشيخ', 'بيلا', 'Bila', 3),
    ('كفر الشيخ', 'فوه', 'Fouh', 4),
    ('كفر الشيخ', 'سيدي سالم', 'Sidi Salem', 5),
    ('كفر الشيخ', 'الحامول', 'Hamoul', 6),
    ('كفر الشيخ', 'الرياض', 'Riyad', 7),
    ('كفر الشيخ', 'قلين', 'Qellen', 8),
    ('كفر الشيخ', 'مطوبس', 'Metobas', 9),

    -- دمياط (11)
    ('دمياط', 'دمياط', 'Damietta', 1),
    ('دمياط', 'رأس البر', 'Ras El Bar', 2),
    ('دمياط', 'فارسكور', 'Faraskour', 3),
    ('دمياط', 'كفر سعد', 'Kafr Saad', 4),
    ('دمياط', 'الزرقا', 'Zarqa', 5),
    ('دمياط', 'كفر البطيخ', 'Kafr El Batikh', 6),
    ('دمياط', 'دمياط الجديدة', 'New Damietta', 7),

    -- بورسعيد (12)
    ('بورسعيد', 'بورسعيد', 'Port Said', 1),
    ('بورسعيد', 'بورفؤاد', 'Port Fouad', 2),
    ('بورسعيد', 'الزهور', 'Zohour', 3),
    ('بورسعيد', 'المناخ', 'Manakh', 4),
    ('بورسعيد', 'العرب', 'Arab', 5),
    ('بورسعيد', 'جنوب بورسعيد', 'South Port Said', 6),

    -- الإسماعيلية (13)
    ('الإسماعيلية', 'الإسماعيلية', 'Ismailia', 1),
    ('الإسماعيلية', 'فايد', 'Fayed', 2),
    ('الإسماعيلية', 'القنطرة غرب', 'Qantara West', 3),
    ('الإسماعيلية', 'القنطرة شرق', 'Qantara East', 4),
    ('الإسماعيلية', 'التل الكبير', 'Tel El Kebir', 5),
    ('الإسماعيلية', 'أبو صوير', 'Abu Suwayr', 6),
    ('الإسماعيلية', 'القصاصين', 'Qassasin', 7),

    -- السويس (14)
    ('السويس', 'السويس', 'Suez', 1),
    ('السويس', 'عتاقة', 'Ataqa', 2),
    ('السويس', 'فيصل', 'Faisal', 3),
    ('السويس', 'الأربعين', 'Arbaeen', 4),
    ('السويس', 'الجناين', 'Ganayen', 5),
    ('السويس', 'بور توفيق', 'Port Tawfik', 6),

    -- شمال سيناء (15)
    ('شمال سيناء', 'العريش', 'Arish', 1),
    ('شمال سيناء', 'الشيخ زويد', 'Sheikh Zuweid', 2),
    ('شمال سيناء', 'رفح', 'Rafah', 3),
    ('شمال سيناء', 'بئر العبد', 'Bir El Abd', 4),
    ('شمال سيناء', 'نخل', 'Nakhl', 5),
    ('شمال سيناء', 'الحسنة', 'Hasana', 6),

    -- جنوب سيناء (16)
    ('جنوب سيناء', 'شرم الشيخ', 'Sharm El Sheikh', 1),
    ('جنوب سيناء', 'دهب', 'Dahab', 2),
    ('جنوب سيناء', 'نويبع', 'Nuweiba', 3),
    ('جنوب سيناء', 'طور سيناء', 'Tour Sinai', 4),
    ('جنوب سيناء', 'سانت كاترين', 'Saint Catherine', 5),
    ('جنوب سيناء', 'طابا', 'Taba', 6),
    ('جنوب سيناء', 'أبو رديس', 'Abu Rudeis', 7),
    ('جنوب سيناء', 'أبو زنيمة', 'Abu Zenima', 8),

    -- بني سويف (17)
    ('بني سويف', 'بني سويف', 'Beni Suef', 1),
    ('بني سويف', 'الواسطى', 'Waseta', 2),
    ('بني سويف', 'ناصر', 'Naser', 3),
    ('بني سويف', 'إهناسيا', 'Ehnasia', 4),
    ('بني سويف', 'ببا', 'Beba', 5),
    ('بني سويف', 'الفشن', 'Fashn', 6),
    ('بني سويف', 'سمسطا', 'Somosta', 7),

    -- الفيوم (18)
    ('الفيوم', 'الفيوم', 'Fayoum', 1),
    ('الفيوم', 'سنورس', 'Snores', 2),
    ('الفيوم', 'طامية', 'Tamia', 3),
    ('الفيوم', 'إطسا', 'Etsa', 4),
    ('الفيوم', 'أبشواي', 'Abshway', 5),
    ('الفيوم', 'يوسف الصديق', 'Youssef El Seddik', 6),

    -- المنيا (19)
    ('المنيا', 'المنيا', 'Minya', 1),
    ('المنيا', 'مغاغة', 'Maghagha', 2),
    ('المنيا', 'بني مزار', 'Beni Mazar', 3),
    ('المنيا', 'مطاي', 'Matay', 4),
    ('المنيا', 'سمالوط', 'Samalout', 5),
    ('المنيا', 'أبو قرقاص', 'Abu Qurqas', 6),
    ('المنيا', 'ملوي', 'Malawi', 7),
    ('المنيا', 'دير مواس', 'Deir Mawas', 8),
    ('المنيا', 'عدوة', 'Edwa', 9),

    -- أسيوط (20)
    ('أسيوط', 'أسيوط', 'Assiut', 1),
    ('أسيوط', 'ديروط', 'Dayrut', 2),
    ('أسيوط', 'البداري', 'Badari', 3),
    ('أسيوط', 'ساحل سليم', 'Sahel Selim', 4),
    ('أسيوط', 'الفتح', 'Fath', 5),
    ('أسيوط', 'منفلوط', 'Manfalut', 6),
    ('أسيوط', 'أبنوب', 'Abnoub', 7),
    ('أسيوط', 'أبو تيج', 'Abu Tij', 8),
    ('أسيوط', 'صدفا', 'Sedfa', 9),
    ('أسيوط', 'الغنايم', 'Ghanayem', 10),

    -- سوهاج (21)
    ('سوهاج', 'سوهاج', 'Sohag', 1),
    ('سوهاج', 'طهطا', 'Tahta', 2),
    ('سوهاج', 'طما', 'Tema', 3),
    ('سوهاج', 'المراغة', 'Maragha', 4),
    ('سوهاج', 'المنشأة', 'Mansha', 5),
    ('سوهاج', 'جرجا', 'Girga', 6),
    ('سوهاج', 'أخميم', 'Akhmim', 7),
    ('سوهاج', 'دار السلام', 'Dar El Salam', 8),
    ('سوهاج', 'ساقلته', 'Sakulta', 9),
    ('سوهاج', 'جهينة', 'Juhayna', 10),

    -- قنا (22)
    ('قنا', 'قنا', 'Qena', 1),
    ('قنا', 'نجع حمادي', 'Nag Hammadi', 2),
    ('قنا', 'دشنا', 'Dashna', 3),
    ('قنا', 'الوقف', 'Waqf', 4),
    ('قنا', 'قفط', 'Qift', 5),
    ('قنا', 'نقادة', 'Naqada', 6),
    ('قنا', 'فرشوط', 'Farshout', 7),
    ('قنا', 'أبو تشت', 'Abu Tesht', 8),

    -- الأقصر (23)
    ('الأقصر', 'الأقصر', 'Luxor', 1),
    ('الأقصر', 'البياضية', 'Bayadeya', 2),
    ('الأقصر', 'القرنة', 'Qurna', 3),
    ('الأقصر', 'الزينية', 'Zeneya', 4),
    ('الأقصر', 'أرمنت', 'Armant', 5),
    ('الأقصر', 'إسنا', 'Esna', 6),
    ('الأقصر', 'الطيبة', 'Tayba', 7),

    -- أسوان (24)
    ('أسوان', 'أسوان', 'Aswan', 1),
    ('أسوان', 'دراو', 'Drau', 2),
    ('أسوان', 'كوم أمبو', 'Kom Ombo', 3),
    ('أسوان', 'إدفو', 'Edfu', 4),
    ('أسوان', 'نصر النوبة', 'Nasr El Nuba', 5),
    ('أسوان', 'الرديسية', 'Redeysia', 6),

    -- البحر الأحمر (25)
    ('البحر الأحمر', 'الغردقة', 'Hurghada', 1),
    ('البحر الأحمر', 'سفاجا', 'Safaga', 2),
    ('البحر الأحمر', 'القصير', 'El Qusair', 3),
    ('البحر الأحمر', 'مرسى علم', 'Marsa Alam', 4),
    ('البحر الأحمر', 'رأس غارب', 'Ras Gharib', 5),
    ('البحر الأحمر', 'الشلاتين', 'Shalateen', 6),
    ('البحر الأحمر', 'حلايب', 'Halayeb', 7),

    -- مطروح (26)
    ('مطروح', 'مرسى مطروح', 'Marsa Matrouh', 1),
    ('مطروح', 'الحمام', 'Hammam', 2),
    ('مطروح', 'العلمين', 'Alamein', 3),
    ('مطروح', 'الضبعة', 'Dabaa', 4),
    ('مطروح', 'النجيلة', 'Negila', 5),
    ('مطروح', 'سيدي براني', 'Sidi Barrani', 6),
    ('مطروح', 'السلوم', 'Salloum', 7),
    ('مطروح', 'سيوة', 'Siwa', 8),

    -- الوادي الجديد (27)
    ('الوادي الجديد', 'الخارجة', 'Kharga', 1),
    ('الوادي الجديد', 'الداخلة', 'Dakhla', 2),
    ('الوادي الجديد', 'باريس', 'Paris', 3),
    ('الوادي الجديد', 'بلاط', 'Balat', 4),
    ('الوادي الجديد', 'الفرافرة', 'Farafra', 5)
) AS v(gov_name, name_ar, name_en, sort_order)
JOIN public.governorates g ON g.name_ar = v.gov_name
WHERE NOT EXISTS (SELECT 1 FROM public.cities LIMIT 1);

-- ═══ بعد التشغيل ═══
-- 1) Settings → API → Reload schema
-- 2) تأكد من ظهور الجداول governorates و cities في Table Editor
