// Sandy Soil Detail Page - Static Content
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'التربة الرملية - دليل أنواع التربة | الزراعة الذكية اليمنية',
  description: 'تعرف على التربة الرملية ومشاكلها وأفضل طرق الري والتسميد للحصول على أفضل إنتاج زراعي',
};

export default function SandySoilPage() {
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
            <span className="text-gray-900">التربة الرملية</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="text-6xl">🏜️</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">التربة الرملية</h1>
              <p className="text-yellow-100">تغطي حوالي 50% من مساحة اليمن</p>
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
              ما هي التربة الرملية؟
            </h2>
            <p className="text-gray-700 leading-relaxed">
              هذه التربة خفيفة وسهلة الحفر، تجدها كثيراً في السهول الساحلية وعلى جوانب الأودية. 
              لونها فاتح وحبيباتها كبيرة، وإذا أمسكت منها قبضة ثم فتحت يدك ستتفتت بسرعة. 
              هي أكثر أنواع التربة انتشاراً في اليمن.
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
                <h3 className="font-semibold text-red-800 mb-1">لا تحتفظ بالماء</h3>
                <p className="text-red-700 text-sm">
                  الماء يمر من خلالها بسرعة كبيرة ولا يبقى حول الجذور. لهذا السبب، النباتات فيها تعطش بسرعة حتى لو سقيتها.
                </p>
              </div>
              <div className="bg-red-50 border-r-4 border-red-400 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-1">فقيرة بالغذاء</h3>
                <p className="text-red-700 text-sm">
                  العناصر الغذائية التي يحتاجها النبات لا تبقى فيها طويلاً، بل تنزل مع الماء إلى الأعماق بعيداً عن الجذور.
                </p>
              </div>
              <div className="bg-red-50 border-r-4 border-red-400 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-1">تسخن بسرعة</h3>
                <p className="text-red-700 text-sm">
                  في الصيف، سطحها يصبح حاراً جداً تحت الشمس، وهذا يضر بالجذور القريبة من السطح.
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
                <p className="font-bold text-orange-800 mb-1">إياك أن تسقي مرة واحدة بكمية كبيرة ثم تنتظر أياماً!</p>
                <p className="text-orange-700 text-sm">
                  الماء سينزل بسرعة ولن يستفيد منه النبات. ستخسر الماء والنبات معاً.
                </p>
              </div>
              <div className="bg-orange-50 border-r-4 border-orange-500 p-4 rounded-lg">
                <p className="font-bold text-orange-800 mb-1">إياك أن تهمل السماد العضوي (الكمبوست)!</p>
                <p className="text-orange-700 text-sm">
                  بدونه، التربة ستبقى فقيرة مهما أضفت من أسمدة كيماوية.
                </p>
              </div>
              <div className="bg-orange-50 border-r-4 border-orange-500 p-4 rounded-lg">
                <p className="font-bold text-orange-800 mb-1">إياك أن تترك سطح التربة مكشوفاً!</p>
                <p className="text-orange-700 text-sm">
                  غطِّه بالقش أو بقايا النباتات لحمايته من الشمس والرياح.
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
                  اسقِ بكميات قليلة لكن بشكل متكرر. الأفضل استخدام التنقيط إذا توفر، لأنه يوصل الماء مباشرة للجذور دون ضياع. 
                  إذا كنت تسقي يدوياً، قسّم الكمية على مرتين أو ثلاث خلال اليوم بدلاً من مرة واحدة.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <span>🌿</span> للتسميد
                </h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  أضف السماد العضوي (روث الحيوانات المتحلل أو الكمبوست) بانتظام. هذا يساعد التربة على الاحتفاظ بالماء والغذاء. 
                  إذا استخدمت سماداً كيماوياً، اختر الأنواع بطيئة الذوبان حتى يستفيد منها النبات قبل أن تنزل مع الماء.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Link 
            href="/soil-types" 
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            العودة لدليل التربة
          </Link>
          <Link 
            href="/soil-types/arid" 
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            التربة الجافة
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
