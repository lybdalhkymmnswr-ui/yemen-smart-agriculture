// Dark Fertile Soil Detail Page - Static Content
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'التربة السوداء الخصبة - دليل أنواع التربة | الزراعة الذكية اليمنية',
  description: 'تعرف على التربة السوداء الخصبة ومشاكلها وأفضل طرق الري والتسميد للحصول على أفضل إنتاج زراعي',
};

export default function DarkSoilPage() {
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
            <span className="text-gray-900">التربة السوداء الخصبة</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-br from-stone-600 to-stone-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="text-6xl">🌱</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">التربة السوداء الخصبة</h1>
              <p className="text-stone-300">تغطي حوالي 10% من مساحة اليمن</p>
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
              ما هي التربة السوداء الخصبة؟
            </h2>
            <p className="text-gray-700 leading-relaxed">
              هذه أفضل أنواع التربة للزراعة. لونها داكن (بني غامق أو أسود) لأنها غنية بالمواد العضوية المتحللة. 
              ملمسها ناعم ورائحتها مثل رائحة الأرض بعد المطر. تجدها في بعض المناطق المرتفعة ذات المناخ المعتدل.
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
                <h3 className="font-semibold text-red-800 mb-1">تحتاج صيانة</h3>
                <p className="text-red-700 text-sm">
                  رغم خصوبتها، إذا زرعتها باستمرار بدون إعادة المواد العضوية إليها، ستفقد خصوبتها مع الوقت.
                </p>
              </div>
              <div className="bg-red-50 border-r-4 border-red-400 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-1">قد تنضغط</h3>
                <p className="text-red-700 text-sm">
                  إذا مشيت عليها كثيراً أو استخدمت آلات ثقيلة، تتضغط وتصبح صلبة.
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
                <p className="font-bold text-orange-800 mb-1">إياك أن تظن أنها لا تحتاج عناية لأنها خصبة!</p>
                <p className="text-orange-700 text-sm">
                  حتى أفضل التربة تحتاج إعادة ما تأخذه منها المحاصيل.
                </p>
              </div>
              <div className="bg-orange-50 border-r-4 border-orange-500 p-4 rounded-lg">
                <p className="font-bold text-orange-800 mb-1">إياك أن تزرع نفس المحصول سنة بعد سنة!</p>
                <p className="text-orange-700 text-sm">
                  ستستهلك التربة وتجلب الأمراض والآفات.
                </p>
              </div>
              <div className="bg-orange-50 border-r-4 border-orange-500 p-4 rounded-lg">
                <p className="font-bold text-orange-800 mb-1">إياك أن تحرق بقايا المحاصيل!</p>
                <p className="text-orange-700 text-sm">
                  هذه البقايا هي غذاء التربة، أعدها للأرض بدلاً من حرقها.
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
                  هذه التربة تحتفظ بالماء جيداً، فلا تبالغ في الري. اسقِ عندما تجف الطبقة العلوية، وتأكد أن الماء يصل للجذور دون إغراق.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <span>🌿</span> للتسميد
                </h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  أفضل طريقة للحفاظ على خصوبتها هي الدورة الزراعية: غيّر المحصول كل موسم، وأدخل البقوليات في الدورة. 
                  أعد بقايا المحاصيل للأرض كسماد عضوي. في هذه التربة، يمكنك تقليل الأسمدة الكيماوية والاعتماد أكثر على الطبيعة.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Link 
            href="/soil-types/mixed" 
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            التربة الطينية المختلطة
          </Link>
          <Link 
            href="/soil-types/clay" 
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            التربة الطينية الثقيلة
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
