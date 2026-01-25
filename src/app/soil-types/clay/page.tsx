// Heavy Clay Soil Detail Page - Static Content
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'التربة الطينية الثقيلة - دليل أنواع التربة | الزراعة الذكية اليمنية',
  description: 'تعرف على التربة الطينية الثقيلة ومشاكلها وأفضل طرق الري والتسميد للحصول على أفضل إنتاج زراعي',
};

export default function ClaySoilPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-amber-600">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link href="/soil-types" className="hover:text-amber-600">دليل التربة</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">التربة الطينية الثقيلة</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-br from-gray-500 to-gray-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="text-6xl">🧱</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">التربة الطينية الثقيلة (المتشققة)</h1>
              <p className="text-gray-300">تغطي حوالي 5% من مساحة اليمن</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 space-y-8">
          
          {/* What is it */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">❓</span>
              ما هي التربة الطينية الثقيلة؟
            </h2>
            <p className="text-gray-700 leading-relaxed">
              هذه تربة طينية كثيفة، تعرفها من التشققات العميقة التي تظهر على سطحها عندما تجف. 
              عندما تكون رطبة تصبح لزجة وتلتصق بالأحذية والأدوات. لونها رمادي أو بني داكن.
            </p>
          </section>

          {/* Problems */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600">⚠️</span>
              مشاكلها الرئيسية
            </h2>
            <div className="space-y-4">
              <div className="bg-red-50 border-r-4 border-red-400 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-1">صعبة الخدمة</h3>
                <p className="text-red-700 text-sm">
                  عندما تكون رطبة لا تستطيع حراثتها لأنها لزجة، وعندما تجف تصبح صلبة كالحجر.
                </p>
              </div>
              <div className="bg-red-50 border-r-4 border-red-400 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-1">تخنق الجذور</h3>
                <p className="text-red-700 text-sm">
                  تحتفظ بالماء لفترة طويلة جداً، مما قد يسبب تعفن الجذور.
                </p>
              </div>
              <div className="bg-red-50 border-r-4 border-red-400 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-1">تتحرك وتتشقق</h3>
                <p className="text-red-700 text-sm">
                  عندما تجف تنكمش وتتشقق، وعندما تبتل تتمدد. هذه الحركة قد تقطع الجذور الصغيرة.
                </p>
              </div>
            </div>
          </section>

          {/* Mistakes to Avoid */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">🚫</span>
              أخطاء شائعة
            </h2>
            <div className="space-y-4">
              <div className="bg-orange-50 border-r-4 border-orange-500 p-4 rounded-lg">
                <p className="font-bold text-orange-800 mb-1">إياك أن تحرث وهي مبللة جداً أو جافة جداً!</p>
                <p className="text-orange-700 text-sm">
                  في الحالتين ستدمر بنيتها. انتظر حتى تكون رطبة بشكل معتدل.
                </p>
              </div>
              <div className="bg-orange-50 border-r-4 border-orange-500 p-4 rounded-lg">
                <p className="font-bold text-orange-800 mb-1">إياك أن تزرع محاصيل لا تتحمل الرطوبة الزائدة!</p>
                <p className="text-orange-700 text-sm">
                  اختر محاصيل تناسب طبيعة هذه التربة.
                </p>
              </div>
              <div className="bg-orange-50 border-r-4 border-orange-500 p-4 rounded-lg">
                <p className="font-bold text-orange-800 mb-1">إياك أن تهمل إضافة المواد العضوية!</p>
                <p className="text-orange-700 text-sm">
                  بدونها ستبقى صعبة الخدمة وغير منتجة.
                </p>
              </div>
            </div>
          </section>

          {/* Recommendations */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">✅</span>
              توصيات عملية
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <span>💧</span> للري
                </h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  كن حذراً جداً مع الري. لا تغرق التربة لأنها ستحتفظ بالماء طويلاً. 
                  أفضل وقت للري هو عندما تبدأ تشققات صغيرة بالظهور على السطح. اسقِ ببطء حتى يتشرب الماء تدريجياً.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <span>🌿</span> للتسميد
                </h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  أضف كميات كبيرة من السماد العضوي (الكمبوست أو الروث المتحلل). هذا سيحسن بنيتها ويجعلها أسهل في الخدمة وأفضل في التهوية. 
                  اختر محاصيل ذات جذور قوية يمكنها التعامل مع طبيعة هذه التربة.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Link 
            href="/soil-types/dark" 
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            التربة السوداء الخصبة
          </Link>
          <Link 
            href="/soil-types" 
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            العودة لدليل التربة
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 منصة الزراعة الذكية اليمنية</p>
        </div>
      </footer>
    </div>
  );
}
