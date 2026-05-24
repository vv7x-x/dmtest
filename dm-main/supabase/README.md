# قاعدة بيانات dm — Supabase (الباك اند)

## التثبيت السريع (مشروع جديد)

في **Supabase → SQL Editor** شغّل بالترتيب:

| # | الملف | الغرض |
|---|--------|--------|
| 1 | **`fix-database.sql`** | جداول + RLS + `place_order` + Storage |
| 2 | **`backend-fix.sql`** | إصلاح مشروع قديم أو تأكيد السياسات (آمن إعادة التشغيله) |

> مشروع **جديد**: يكفي `fix-database.sql` فقط.  
> مشروع **كان شغّال وفيه مشاكل**: شغّل `backend-fix.sql`.

بعد التشغيل: **Settings → API → Reload schema** (أو انتظر ~60 ثانية).

### إضافة مشرف

```sql
INSERT INTO public.admin_users (user_id)
SELECT id FROM auth.users WHERE email = 'بريدك@هنا.com' LIMIT 1;
```

---

## ماذا يوفّر الباك اند؟

| المكوّن | الوصف |
|---------|--------|
| `books` | كتالوج المتجر |
| `orders` / `order_items` | الطلبات |
| `profiles` | ملف المستخدم + محفز تلقائي عند التسجيل |
| `admin_users` | قائمة المشرفين |
| `contact_messages` | رسائل صفحة التواصل |
| `place_order()` | إنشاء طلب آمن للضيف والمسجّل (Checkout) |
| `check_is_admin()` | التحقق من صلاحية الأدمن |
| `book-covers` | bucket لصور الأغلفة |

---

## إصلاحات الأمان (backend-fix)

- **Checkout:** الضيف لا يستطيع `SELECT` بعد `INSERT` — الحل: دالة `place_order` بـ `SECURITY DEFINER`.
- **طلبات anon:** إزالة `UPDATE` عن الزوار؛ الإدراج المباشر للطلبات محدود بـ `user_id`.
- **order_items:** الزوار يمرّون عبر `place_order` فقط؛ المسجّل يربط العناصر بطلبه.
- **التحقق من الكتب:** `place_order` يرفض كتباً غير متوفرة (`book_unavailable`).

---

## اختبار سريع

```sql
-- يجب أن ترجع true بعد إضافة admin_users
SELECT public.check_is_admin();

-- يجب أن تظهر الدالة
SELECT proname FROM pg_proc WHERE proname = 'place_order';
```

---

## الملفات القديمة

- `init.sql` — مرجع قديم فقط
- `checkout-fix.sql` / `admin-fix.sql` — مُوجّهة إلى `backend-fix.sql`
