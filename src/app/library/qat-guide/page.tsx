'use client';

import Link from 'next/link';
import Header from '@/components/Header';

const articles = [
  {
    slug: 'qat-fertilization-program',
    title: 'برنامج تسميد القات الشهري',
    description: 'جدول تسميد شامل للقات على مدار السنة. تعرف على الأسمدة المناسبة لكل مرحلة نمو.',
    readTime: '5 دقائق',
    tags: ['تسميد', 'برنامج شهري', 'NPK'],
  },
  {
    slug: 'qat-nutrient-deficiency',
    title: 'علامات نقص العناصر في القات',
    description: 'كيف تعرف أن القات يعاني من نقص النيتروجين أو الفوسفور أو البوتاسيوم؟ علامات واضحة وحلول سريعة.',
    readTime: '4 دقائق',
    tags: ['نقص العناصر', 'تشخيص', 'علاج'],
  },
  {
    slug: 'qat-irrigation-schedule',
    title: 'جدول ري القات صيفاً وشتاءً',
    description: 'متى تسقي القات؟ كم مرة في الأسبوع؟ الفرق بين الري في الصيف والشتاء.',
    readTime: '4 دقائق',
    tags: ['ري', 'جدول موسمي', 'توفير المياه'],
  },
  {
    slug: 'qat-common-mistakes',
    title: 'أخطاء شائعة في زراعة القات',
    description: '10 أخطاء يقع فيها معظم المزارعين وكيف تتجنبها. نصائح من خبرة الميدان.',
    readTime: '6 دقائق',
    tags: ['أخطاء شائعة', 'نصائح', 'تحسين الإنتاج'],
  },
];

export default function QatGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white" dir="rtl">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">الرئيسية</Link>
            <span>/</span>
            <Link href="/library" className="hover:text-green-600">المكتبة الزراعية</Link>
            <span>/</span>
            <span className="text-green-600 font-medium">دليل زراعة القات</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <span className="text-5xl">🌳</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">دليل زراعة القات</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            كل ما تحتاج معرفته عن زراعة القات: من اختيار الصنف المناسب إلى برامج التسميد والري.
            معلومات عملية مبنية على خبرة المزارعين اليمنيين.
          </p>
        </div>
      </section>

      {/* Quick Tool Link */}
      <section className="py-6 bg-green-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-gray-700">أدوات مرتبطة:</span>
            <Link
              href="/fertilizer-calculator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-green-300 text-green-700 rounded-full hover:bg-green-100 transition-colors font-medium"
            >
              <span>🌿</span>
              حاسبة التسميد
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-blue-300 text-blue-700 rounded-full hover:bg-blue-100 transition-colors font-medium"
            >
              <span>💧</span>
              حاسبة الري
            </Link>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">المقالات المتاحة</h2>
          
          <div className="space-y-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/library/qat-guide/${article.slug}`}
                className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{article.description}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-gray-500">⏱️ {article.readTime}</span>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">هل تريد توصية تسميد مخصصة للقات؟</h2>
            <p className="text-green-100 mb-6">
              أدخل بيانات أرضك في حاسبة التسميد واحصل على توصية دقيقة بناءً على نوع التربة ومرحلة النمو.
            </p>
            <Link
              href="/fertilizer-calculator"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 rounded-xl hover:bg-green-50 transition-colors font-bold text-lg"
            >
              <span>🌿</span>
              استخدم حاسبة التسميد الآن
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 منصة الزراعة الذكية اليمنية - جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
}
