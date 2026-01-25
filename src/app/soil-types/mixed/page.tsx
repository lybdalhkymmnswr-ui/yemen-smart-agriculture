// Mixed Clay Soil Detail Page - Static Content
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'التربة الطينية المختلطة - دليل أنواع التربة | الزراعة الذكية اليمنية',
  description: 'تعرف على التربة الطينية المختلطة ومشاكلها وأفضل طرق الري والتسميد للحصول على أفضل إنتاج زراعي',
};

export default function MixedSoilPage() {
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
            <span className="text-gray-900">التربة الطينية المختلطة</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="text-6xl">🌾</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">التربة الطينية المختلطة</h1>
              <p className="text-amber-100">تغطي حوالي 15% من مساحة اليمن</p>
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
              ما هي التربة الطينية المختلطة؟
            </h2>
            <p className="text-gray-700 leading-relaxed">
              هذه تربة جيدة للزراعة، تجدها في مناطق السيول والفيضانات الموسمية، خاصة في الجنوب الغربي والشمال الغربي من اليمن. 
              لونها بني وبنيتها متماسكة. إذا أمسكت منها قبضة وهي رطبة، ستتشكل وتحافظ على شكلها.
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
                <h3 className="font-semibold text-red-800 mb-1">قد تتصلب</h3>
                <p className="text-red-700 text-sm">
                  أحياناً تتكون طبقة صلبة تحت السطح تمنع الجذور من النزول والماء من التسرب.
                </p>
              </div>
              <div className="bg-red-50 border-r-4 border-red-400 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-1">تحتفظ بالماء أكثر من اللازم</h3>
                <p className="text-red-700 text-sm">
                  إذا لم يكن هناك تصريف جيد، الماء يتجمع ويخنق الجذور.
                </p>
              </div>
              <div className="bg-red-50 border-r-4 border-red-400 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-1">تحتاج إدارة</h3>
                <p className="text-red-700 text-sm">
                  رغم أنها جيدة، إلا أن زراعة نفس المحصول فيها باستمرار يستهلكها.
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
                <p className="font-bold text-orange-800 mb-1">إياك أن تحرث أو تعمل في الأرض وهي مبللة جداً!</p>
                <p className="text-orange-700 text-sm">
                  ستضغطها وتدمر بنيتها الجيدة، وستصبح صلبة بعد أن تجف.
                </p>
              </div>
              <div className="bg-orange-50 border-r-4 border-orange-500 p-4 rounded-lg">
                <p className="font-bold text-orange-800 mb-1">إياك أن تزرع نفس المحصول كل موسم!</p>
                <p className="text-orange-700 text-sm">
                  هذا يستهلك عناصر معينة من التربة ويجلب الآفات.
                </p>
              </div>
              <div className="bg-orange-50 border-r-4 border-orange-500 p-4 rounded-lg">
                <p className="font-bold text-orange-800 mb-1">إياك أن تهمل فحص عمق التربة قبل الزراعة!</p>
                <p className="text-orange-700 text-sm">
                  قد تكون هناك طبقة صخرية أو صلبة قريبة تمنع نمو الجذور.
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
                  اسقِ بانتظام لكن تأكد أن الماء الزائد يخرج ولا يتجمع. إذا لاحظت أن الماء يبقى على السطح فترة طويلة، فالتربة تحتاج تحسين تصريف.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <span>🌿</span> للتسميد
                </h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  هذه التربة تستجيب جيداً للتسميد المتوازن. الأفضل أن تغيّر نوع المحصول كل موسم، وتزرع البقوليات (مثل الفول أو الفاصوليا) بين الحين والآخر لأنها تضيف النيتروجين للتربة بشكل طبيعي.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Link 
            href="/soil-types/arid" 
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            التربة الجافة
          </Link>
          <Link 
            href="/soil-types/dark" 
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            التربة السوداء الخصبة
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
