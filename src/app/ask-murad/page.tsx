import Link from 'next/link';

export default function AskMuradPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-green-600 to-green-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">👨‍🌾</div>
          <h1 className="text-4xl font-bold mb-4">اسأل مراد</h1>
          <p className="text-xl text-green-100">
            استشارة زراعية شخصية من خبير متخصص
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            احصل على تشخيص دقيق لمشكلتك الزراعية
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed text-center mb-8">
            هل تواجه مشكلة في محصولك ولا تعرف السبب؟ صوّر المشكلة، أرسل سؤالك، 
            واحصل على تشخيص وحل مخصص من الخبير مراد مباشرة.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <div className="text-4xl mb-3">📸</div>
              <h3 className="font-bold text-gray-800 mb-2">تشخيص بالصور</h3>
              <p className="text-gray-600 text-sm">
                أرسل صورة المشكلة واحصل على تحليل دقيق
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-bold text-gray-800 mb-2">إجابة مباشرة</h3>
              <p className="text-gray-600 text-sm">
                تواصل مباشر مع الخبير للحصول على حلول عملية
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold text-gray-800 mb-2">خصوصية تامة</h3>
              <p className="text-gray-600 text-sm">
                استشارتك خاصة بينك وبين الخبير فقط
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a
              href="https://askmurad-gnyphssw.manus.space"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              ابدأ الآن ⭐
            </a>
            <p className="text-gray-500 text-sm mt-4">
              خدمة مدفوعة - استشارة متخصصة وشخصية
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link 
            href="/" 
            className="text-green-600 hover:text-green-700 font-medium"
          >
            ← العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
