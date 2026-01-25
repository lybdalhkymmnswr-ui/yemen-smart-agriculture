'use client';

import Link from 'next/link';
import Header from '@/components/Header';

const articles = [
  {
    slug: 'tomato-growing-guide',
    title: 'زراعة الطماطم خطوة بخطوة',
    description: 'دليل شامل لزراعة الطماطم من البذرة إلى الحصاد. نصائح لزيادة الإنتاج.',
    readTime: '6 دقائق',
    tags: ['طماطم', 'دليل شامل', 'خطوات'],
  },
  {
    slug: 'potato-fertilization',
    title: 'تسميد البطاطس للحصول على محصول وفير',
    description: 'برنامج تسميد البطاطس من الزراعة إلى الحصاد. الكميات والتوقيت المناسب.',
    readTime: '5 دقائق',
    tags: ['بطاطس', 'تسميد', 'برنامج'],
  },
  {
    slug: 'leafy-vegetables-irrigation',
    title: 'جدول ري الخضروات الورقية',
    description: 'كم تحتاج الخضروات الورقية من الماء؟ جدول ري مبسط للخس والجرجير والسبانخ.',
    readTime: '4 دقائق',
    tags: ['خضروات ورقية', 'ري', 'جدول'],
  },
  {
    slug: 'vegetables-pest-control',
    title: 'مكافحة آفات الخضروات الشائعة',
    description: 'أهم الآفات التي تصيب الخضروات في اليمن وطرق مكافحتها الفعالة.',
    readTime: '5 دقائق',
    tags: ['آفات', 'مكافحة', 'خضروات'],
  },
];

export default function VegetablesGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white" dir="rtl">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">الرئيسية</Link>
            <span>/</span>
            <Link href="/library" className="hover:text-green-600">المكتبة الزراعية</Link>
            <span>/</span>
            <span className="text-emerald-600 font-medium">دليل زراعة الخضروات</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <span className="text-5xl">🥬</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">دليل زراعة الخضروات</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            نصائح عملية لزراعة الخضروات الأكثر انتشاراً في اليمن.
            من الطماطم والبطاطس إلى الخضروات الورقية.
          </p>
        </div>
      </section>

      {/* Quick Tool Link */}
      <section className="py-6 bg-emerald-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-gray-700">أدوات مرتبطة:</span>
            <Link
              href="/fertilizer-calculator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-emerald-300 text-emerald-700 rounded-full hover:bg-emerald-100 transition-colors font-medium"
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
                href={`/library/vegetables-guide/${article.slug}`}
                className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-emerald-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-emerald-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{article.description}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-gray-500">⏱️ {article.readTime}</span>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
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
      <section className="py-12 px-4 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-emerald-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">هل تريد توصية مخصصة لخضرواتك؟</h2>
            <p className="text-emerald-100 mb-6">
              استخدم حاسباتنا المجانية للحصول على توصيات دقيقة بناءً على نوع المحصول والتربة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/fertilizer-calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-xl hover:bg-emerald-50 transition-colors font-bold"
              >
                <span>🌿</span>
                حاسبة التسميد
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-400 transition-colors font-bold"
              >
                <span>💧</span>
                حاسبة الري
              </Link>
            </div>
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
