// Arid Soil Detail Page - Static Content
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'التربة الجافة - دليل أنواع التربة | الزراعة الذكية اليمنية',
  description: 'تعرف على التربة الجافة ومشاكلها وأفضل طرق الري والتسميد للحصول على أفضل إنتاج زراعي',
};

export default function AridSoilPage() {
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
            <span className="text-gray-900">التربة الجافة</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="text-6xl">☀️</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">التربة الجافة</h1>
              <p className="text-orange-100">تغطي حوالي 20% من مساحة اليمن</p>
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
              ما هي التربة الجافة؟
            </h2>
            <p className="text-gray-700 leading-relaxed">
              هذه التربة تجدها في المناطق التي يقل فيها المطر. لونها فاتح وتبدو «ميتة» لأنها تفتقر للمواد العضوية. 
              بنيتها ضعيفة وتتفكك بسهولة. غالباً ما ترى على سطحها طبقة بيضاء من الأملاح، خاصة في الصيف.
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
                <h3 className="font-semibold text-red-800 mb-1">الملوحة</h3>
                <p className="text-red-700 text-sm">
                  الأملاح تتراكم على السطح لأن الماء يتبخر بسرعة ويترك الأملاح وراءه. هذه الأملاح تحرق جذور النباتات وتمنعها من امتصاص الماء.
                </p>
              </div>
              <div className="bg-red-50 border-r-4 border-red-400 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-1">ضعيفة ومفككة</h3>
                <p className="text-red-700 text-sm">
                  الرياح تحملها بسهولة، وبدون غطاء نباتي تتآكل بسرعة.
                </p>
              </div>
              <div className="bg-red-50 border-r-4 border-red-400 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-1">فقيرة جداً</h3>
                <p className="text-red-700 text-sm">
                  لا تحتوي تقريباً على أي مواد عضوية، مما يجعلها غير قادرة على دعم نمو النباتات بشكل جيد.
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
                <p className="font-bold text-orange-800 mb-1">إياك أن تسقي بماء مالح أو ماء بئر فيه أملاح!</p>
                <p className="text-orange-700 text-sm">
                  ستزيد المشكلة وتجعل الأرض غير صالحة للزراعة نهائياً.
                </p>
              </div>
              <div className="bg-orange-50 border-r-4 border-orange-500 p-4 rounded-lg">
                <p className="font-bold text-orange-800 mb-1">إياك أن تحرث بعمق كبير وبشكل متكرر!</p>
                <p className="text-orange-700 text-sm">
                  ستدمر البنية الضعيفة أصلاً وتزيد من سرعة تفكك التربة.
                </p>
              </div>
              <div className="bg-orange-50 border-r-4 border-orange-500 p-4 rounded-lg">
                <p className="font-bold text-orange-800 mb-1">إياك أن تزرع بدون إضافة مواد عضوية أولاً!</p>
                <p className="text-orange-700 text-sm">
                  بدون تحسين التربة، أي محصول سيفشل.
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
                  استخدم التنقيط أو الري تحت السطح إذا أمكن، لأن هذا يقلل التبخر وبالتالي يقلل تراكم الأملاح. 
                  إذا كانت الأملاح كثيرة، حاول غسل التربة بماء عذب من وقت لآخر لتخفيف الملوحة.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <span>🌿</span> للتسميد
                </h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  ركّز على إضافة السماد العضوي بكميات كبيرة قبل أي شيء آخر. هذا سيحسن قدرة التربة على الاحتفاظ بالماء والغذاء. 
                  الأسمدة الكيماوية وحدها لن تفيد في هذه التربة.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Link 
            href="/soil-types/sandy" 
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            التربة الرملية
          </Link>
          <Link 
            href="/soil-types/mixed" 
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            التربة الطينية المختلطة
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
