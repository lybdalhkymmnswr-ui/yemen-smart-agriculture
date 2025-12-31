# منصة الزراعة الذكية اليمنية
# Yemen Smart Agriculture Platform (MVP)

منصة متكاملة تجمع المزارعين والموردين والخبراء الزراعيين في اليمن.

## المميزات

### نظام RBAC (التحكم في الوصول القائم على الأدوار)
- **مزارع (Farmer)**: تصفح المنتجات والمقالات، طلب استشارات
- **مورد (Supplier)**: إدارة المنتجات الخاصة
- **خبير (Expert)**: كتابة المقالات وتقديم الاستشارات
- **مدير (Admin)**: إدارة كاملة للمنصة

### المصادقة
- تسجيل الدخول بالبريد الإلكتروني وكلمة المرور
- إعادة توجيه تلقائي حسب الدور بعد تسجيل الدخول
- حماية المسارات باستخدام Middleware

### البحث الموحد الذكي
- بحث في المنتجات والمقالات والخبراء من مكان واحد
- نتائج مجمعة حسب النوع
- بحث بالكلمات المفتاحية العربية

## التقنيات المستخدمة

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Firebase (Authentication + Firestore)
- **State Management**: React Context API

## هيكل المشروع

```
yemen-smart-agriculture/
├── src/
│   ├── app/                    # صفحات Next.js (App Router)
│   │   ├── login/              # صفحة تسجيل الدخول
│   │   ├── register/           # صفحة التسجيل
│   │   ├── dashboard/          # لوحات التحكم
│   │   │   ├── farmer/         # لوحة تحكم المزارع
│   │   │   ├── supplier/       # لوحة تحكم المورد
│   │   │   ├── expert/         # لوحة تحكم الخبير
│   │   │   └── admin/          # لوحة تحكم المدير
│   │   ├── products/[slug]/    # صفحة المنتج
│   │   ├── articles/[slug]/    # صفحة المقال
│   │   └── experts/[uid]/      # صفحة الخبير
│   ├── components/             # المكونات المشتركة
│   ├── contexts/               # سياقات React
│   ├── lib/                    # المكتبات والأدوات
│   ├── types/                  # أنواع TypeScript
│   └── middleware.ts           # Middleware لحماية المسارات
├── scripts/
│   └── seed.ts                 # سكريبت البيانات التجريبية
├── firestore.rules             # قواعد أمان Firestore
├── .env.example                # مثال متغيرات البيئة
└── README.md                   # هذا الملف
```

## التثبيت والتشغيل

### 1. استنساخ المشروع

```bash
git clone <repository-url>
cd yemen-smart-agriculture
```

### 2. تثبيت التبعيات

```bash
pnpm install
```

### 3. إعداد Firebase

1. أنشئ مشروع جديد في [Firebase Console](https://console.firebase.google.com)
2. فعّل **Authentication** مع Email/Password
3. أنشئ قاعدة بيانات **Firestore**
4. انسخ إعدادات التطبيق من Project Settings

### 4. إعداد متغيرات البيئة

```bash
cp .env.example .env.local
```

ثم عدّل `.env.local` بإعدادات Firebase الخاصة بك.

### 5. نشر قواعد Firestore

```bash
firebase deploy --only firestore:rules
```

### 6. تشغيل التطبيق

```bash
pnpm dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## اختبارات القبول

### اختبار 1: تسجيل مزارع
1. اذهب إلى `/register`
2. اختر "مزارع" وأدخل البيانات
3. بعد التسجيل، يجب أن تصل إلى `/dashboard/farmer`

### اختبار 2: تسجيل مورد
1. اذهب إلى `/register`
2. اختر "مورد" وأدخل البيانات
3. بعد التسجيل، يجب أن تصل إلى `/dashboard/supplier`

### اختبار 3: تسجيل خبير
1. اذهب إلى `/register`
2. اختر "خبير زراعي" وأدخل البيانات
3. بعد التسجيل، يجب أن تصل إلى `/dashboard/expert`

### اختبار 4: البحث الموحد
1. سجل الدخول بأي حساب
2. استخدم شريط البحث في الأعلى
3. ابحث عن "أبامكتين" (إذا تم إضافة البيانات التجريبية)
4. يجب أن تظهر النتائج مجمعة حسب النوع

### اختبار 5: حماية المسارات
1. سجل الدخول كمورد
2. حاول الوصول إلى `/dashboard/admin`
3. يجب أن يتم إعادة توجيهك إلى لوحة تحكم المورد

## نموذج بيانات Firestore

### مجموعة users/{uid}
```typescript
{
  uid: string,
  role: 'farmer' | 'supplier' | 'expert' | 'admin',
  displayName: string,
  phone?: string,
  photoURL?: string,
  status: 'active' | 'pending' | 'suspended',
  createdAt: Timestamp,
  updatedAt: Timestamp,
  farmerProfile?: { governorate?, district?, crops? },
  supplierProfile?: { companyName?, wholesaleEnabled, verificationDocsStatus },
  expertProfile?: { specialties?, verifiedBadge }
}
```

### مجموعة products/{productId}
```typescript
{
  title: string,
  slug: string,
  supplierId: string,
  category: string,
  activeIngredient?: string,
  originCountry?: string,
  priceRetail?: number,
  priceWholesale?: number,
  stockQty?: number,
  ratingAvg: number,
  ratingCount: number,
  status: 'active' | 'inactive',
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### مجموعة articles/{articleId}
```typescript
{
  title: string,
  slug: string,
  authorId: string,
  tags?: string[],
  content: string,
  status: 'draft' | 'published',
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### مجموعة search_index/{docId}
```typescript
{
  type: 'product' | 'article' | 'expert',
  refId: string,
  title: string,
  subtitle?: string,
  keywords: string[],
  slugOrPath: string,
  updatedAt: Timestamp
}
```

## الترخيص

MIT License

## المساهمة

نرحب بالمساهمات! يرجى فتح Issue أو Pull Request.

---

## 🚀 النشر على Vercel (Production Deployment)

### الخطوات

1. **رفع الكود إلى GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/yemen-smart-agriculture.git
   git push -u origin main
   ```

2. **إنشاء حساب Vercel**
   - اذهب إلى [vercel.com](https://vercel.com)
   - سجل الدخول باستخدام حساب GitHub

3. **إنشاء مشروع جديد**
   - اضغط "New Project"
   - اختر مستودع GitHub الخاص بالمشروع

4. **إضافة متغيرات البيئة**
   - في إعدادات المشروع، أضف جميع متغيرات `.env.local`

5. **النشر**
   - اضغط "Deploy"
   - انتظر اكتمال البناء والنشر

### ملاحظات مهمة

- تأكد من تحديث `NEXT_PUBLIC_SITE_URL` برابط Vercel الجديد
- قم بتحديث قواعد Firestore للسماح بالدومين الجديد
- راجع إعدادات Firebase Authentication لإضافة الدومين المسموح

---

## 📊 حالة المشروع (MVP)

| الميزة | الحالة |
|--------|--------|
| قائمة المنتجات | ✅ مكتمل |
| البحث والفلترة | ✅ مكتمل |
| صفحات المنتجات | ✅ مكتمل |
| نظام التقييمات | ✅ مكتمل |
| تسجيل الدخول | ✅ مكتمل |
| SEO & Metadata | ✅ مكتمل |
| Sitemap | ✅ مكتمل |

---

**آخر تحديث**: ديسمبر 2024
