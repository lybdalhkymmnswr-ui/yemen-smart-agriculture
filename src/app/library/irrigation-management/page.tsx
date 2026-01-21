'use client';

import Link from 'next/link';
import Header from '@/components/Header';

const articles = [
  {
    slug: 'flood-to-drip-irrigation',
    title: 'متى تتحول من الغمر إلى التنقيط؟',
    description: 'مقارنة شاملة بين طريقتي الري. متى يكون التحول مفيداً؟ وكيف تبدأ؟',
    readTime: '5 دقائق',
    tags: ['ري بالتنقيط', 'ري بالغمر', 'مقارنة'],
  },
  {
    slug: 'overwatering-signs',
    title: 'علامات الإفراط في الري',
    description: 'كيف تعرف أنك تسقي أكثر من اللازم؟ 6 علامات واضحة وكيف تعالج المشكلة.',
    readTime: '4 دقائق',
    tags: ['إفراط', 'تشخيص', 'علاج'],
  },
  {
    slug: 'water-saving-agriculture',
    title: 'توفير المياه في الزراعة',
    description: '10 طرق عملية لتقليل استهلاك المياه دون التأثير على المحصول.',
    readTime: '5 دقائق',
    tags: ['توفير المياه', 'كفاءة', 'نصائح'],
  },
  {
    slug: 'drip-system-maintenance',
    title: 'صيانة نظام التنقيط',
    description: 'كيف تحافظ على نظام التنقيط يعمل بكفاءة؟ جدول صيانة بسيط ومشاكل شائعة.',
    readTime: '4 دقائق',
    tags: ['صيانة', 'تنقيط', 'مشاكل'],
  },
];

export default function IrrigationManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">الرئيسية</Link>
            <span>/</span>
            <Link href="/library" className="hover:text-green-600">المكتبة الزراعية</Link>
            <span>/</span>
            <span className="text-blue-600 font-medium">الري وإدارة المياه</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <span className="text-5xl">💧</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">الري وإدارة المياه</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            أساسيات الري الصحيح، متى تسقي ومتى تتوقف، والفرق بين طرق الري المختلفة.
            المياه ثروة ثمينة، تعلم كيف تستخدمها بحكمة.
          </p>
        </div>
      </section>

      {/* Quick Tool Link */}
      <section className="py-6 bg-blue-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-gray-700 font-medium">🔗 أداة مرتبطة:</span>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold shadow-lg"
            >
              <span>💧</span>
              استخدم حاسبة الري الآن
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
                href={`/library/irrigation-management/${article.slug}`}
                className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-blue-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{article.description}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-gray-500">⏱️ {article.readTime}</span>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <section className="py-12 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">احصل على توصية ري مخصصة</h2>
            <p className="text-blue-100 mb-6">
              أدخل بيانات أرضك في حاسبة الري واحصل على توصية دقيقة بناءً على نوع التربة والمحصول والموسم.
            </p>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-xl hover:bg-blue-50 transition-colors font-bold text-lg"
            >
              <span>💧</span>
              استخدم حاسبة الري الآن
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
