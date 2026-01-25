'use client';

import Link from 'next/link';
import Header from '@/components/Header';

const articles = [
  {
    slug: 'poor-soil-signs',
    title: 'كيف تعرف أن تربتك فقيرة؟',
    description: '7 علامات واضحة تدل على أن تربتك تحتاج تحسين. تعلم كيف تشخص المشكلة وتعالجها.',
    readTime: '4 دقائق',
    tags: ['تشخيص التربة', 'علامات', 'تحسين'],
  },
  {
    slug: 'organic-vs-chemical-fertilizer',
    title: 'الفرق بين السماد العضوي والكيماوي',
    description: 'متى تستخدم كل نوع؟ مميزات وعيوب كل منهما. دليل عملي للاختيار الصحيح.',
    readTime: '5 دقائق',
    tags: ['سماد عضوي', 'سماد كيماوي', 'مقارنة'],
  },
  {
    slug: 'sandy-soil-fertilization-mistakes',
    title: '5 أخطاء شائعة في تسميد التربة الرملية',
    description: 'التربة الرملية لها طبيعة خاصة. تعرف على الأخطاء التي يقع فيها المزارعون وكيف تتجنبها.',
    readTime: '4 دقائق',
    tags: ['تربة رملية', 'أخطاء', 'نصائح'],
  },
  {
    slug: 'when-how-to-fertilize',
    title: 'متى وكيف تضيف السماد؟',
    description: 'التوقيت الصحيح والطريقة المثلى لإضافة السماد. نصائح عملية لأفضل النتائج.',
    readTime: '4 دقائق',
    tags: ['توقيت', 'طريقة', 'تطبيق عملي'],
  },
];

export default function SoilFertilizationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white" dir="rtl">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">الرئيسية</Link>
            <span>/</span>
            <Link href="/library" className="hover:text-green-600">المكتبة الزراعية</Link>
            <span>/</span>
            <span className="text-amber-600 font-medium">صحة التربة والتسميد</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <span className="text-5xl">🌍</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">صحة التربة والتسميد</h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            تعرف على تربتك وكيف تحسّنها. الفرق بين الأسمدة، وأخطاء التسميد الشائعة.
            معلومات عملية تساعدك على زيادة خصوبة أرضك.
          </p>
        </div>
      </section>

      {/* Quick Tool Link */}
      <section className="py-6 bg-amber-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-gray-700 font-medium">🔗 أداة مرتبطة:</span>
            <Link
              href="/fertilizer-calculator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors font-bold shadow-lg"
            >
              <span>🌿</span>
              استخدم حاسبة التسميد الآن
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
                href={`/library/soil-fertilization/${article.slug}`}
                className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-amber-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-amber-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{article.description}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-gray-500">⏱️ {article.readTime}</span>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full"
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
      <section className="py-12 px-4 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">احصل على توصية تسميد مخصصة</h2>
            <p className="text-amber-100 mb-6">
              أدخل بيانات أرضك في حاسبة التسميد واحصل على توصية دقيقة بناءً على نوع التربة والمحصول ومرحلة النمو.
            </p>
            <Link
              href="/fertilizer-calculator"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-700 rounded-xl hover:bg-amber-50 transition-colors font-bold text-lg"
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
