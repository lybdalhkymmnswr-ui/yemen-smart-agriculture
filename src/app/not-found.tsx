'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center" dir="rtl">
      <div className="max-w-md mx-auto px-6 py-12 text-center">
        {/* أيقونة */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-amber-100 rounded-full mb-4">
            <span className="text-6xl">🌱</span>
          </div>
        </div>

        {/* رقم الخطأ */}
        <h1 className="text-8xl font-bold text-amber-600 mb-4">404</h1>

        {/* العنوان */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          الصفحة غير موجودة
        </h2>

        {/* الوصف */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير متوفرة حالياً.
          <br />
          ربما تم نقلها أو حذفها، أو أن الرابط غير صحيح.
        </p>

        {/* أزرار الإجراءات */}
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors"
          >
            🏠 العودة للصفحة الرئيسية
          </Link>
          
          <Link
            href="/library"
            className="block w-full px-6 py-3 bg-amber-100 text-amber-700 rounded-xl font-bold hover:bg-amber-200 transition-colors"
          >
            📚 تصفح المكتبة الزراعية
          </Link>
        </div>

        {/* رسالة مساعدة */}
        <p className="mt-8 text-sm text-gray-500">
          إذا كنت تعتقد أن هذا خطأ، يرجى التواصل معنا عبر صفحة الفيسبوك
        </p>
      </div>
    </div>
  );
}
