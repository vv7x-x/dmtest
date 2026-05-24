Admin setup — إنشاء مستخدم أدمن (Supabase)

هذا الملف يشرح كيف تضيف مستخدم أدمن صالح لتسجيل الدخول إلى لوحة الأدمن (`admin.html`).

خلاصة (مُوصَى به):
- نفّذ ملف الهجرة `supabase/init.sql` في Supabase SQL Editor.
- استخدم سكربت الخادم `scripts/setup-supabase.js` لإنشاء مستخدم أدمن جديد وإدراجه في جدول `public.admin_users`.

1) تشغيل الـ SQL migration
- افتح مشروع Supabase > SQL Editor
- انسخ محتوى `supabase/init.sql` والصقه ثم نفّذه.

2) إنشاء مستخدم أدمن تلقائياً (مُفضَّل)
- استخدم السكربت `scripts/setup-supabase.js` الموجود في المستودع. يحتاج مفتاح الـ SERVICE ROLE (سري) ومعلومات المستخدم.

مثال تنفيذ محلي (مصدر المتغيّرات في الشل):

```bash
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE="<SERVICE_ROLE_KEY>"   # لا ترفع هذا المفتاح أبداً
export ADMIN_EMAIL="admin@example.com"
export ADMIN_PASSWORD="StrongPassword123"
node scripts/setup-supabase.js
```

ما الذي يفعله السكربت:
- ينشئ مستخدماً في Auth (نموذجي: email/password) ويؤكّد البريد.
- يُدخِل الـ `user_id` الناتج في جدول `public.admin_users` عبر REST API (باستخدام مفتاح الـ service role).
- يُنشئ دلو التخزين `book-covers` (اختياري).

3) إنشاؤه يدوياً (بدون السكربت)
- من لوحة Supabase > Authentication > Users: أنشئ مستخدماً (Email + Password)
- انسخ الـ `id` (UUID) للمستخدم الذي تم إنشاؤه
- في SQL Editor شغّل الاستعلام التالي (يتطلب صلاحيات إدخال في الجدول):

```sql
INSERT INTO public.admin_users (user_id) VALUES ('<USER_UUID>');
```

4) التحقق
- بعد إنشاء المستخدم وإدراج الـ UUID، افتح `http://<your-site>/admin.html` وحاول تسجيل الدخول بالبريد/كلمة المرور التي أنشأتها.
- في حال نجاح تسجيل الدخول لكن لا تظهر لوحة الأدمن، تأكد أن المستخدم الذي سجَّل الدخول موجود في `public.admin_users`.

ملاحظات أمان
- لا تستخدم ملفات إعداد client-side لحفظ كلمات المرور.
- مفتاح `SUPABASE_SERVICE_ROLE` يجب أن يبقى على الخادم وليس في الواجهة الأمامية.
- لحماية حقيقية: ضع endpoint سيرفري (e.g., Netlify Function, Vercel Serverless, small Express app) لتشغيل أداة الادارة مع `SERVICE_ROLE` محفوظة في متغيرات البيئة.

مساعدة إضافية
- أستطيع توليد أمر `psql` جاهز لوصولك المباشر إلى قاعدة البيانات إذا أعطيتني عنوان الاتصال الداخلي (غير حساس) — لا ترسل مفاتيح عبر الدردشة.
- إن أردت أعدّل `admin.html` و`js/admin.js` لعرض رسالة أو إعادة توجيه أو لإظهار خطوات مساعدة إذا لم يكن المستخدم مُدرجًا في `admin_users`.
