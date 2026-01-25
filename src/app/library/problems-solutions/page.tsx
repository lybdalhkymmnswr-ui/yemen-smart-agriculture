'use client';

import Link from 'next/link';
import Header from '@/components/Header';

const articles = [
  {
    slug: 'qat-yellow-leaves',
    title: 'لماذا تصفر أوراق القات؟',
    description: '5 أسباب رئيسية لاصفرار أوراق القات وكيف تحدد السبب وتعالجه بسرعة.',
    readTime: '3 دقائق',
    tags: ['قات', 'اصفرار', 'تشخيص سريع'],
  },
  {
    slug: 'tomato-root-rot',
    title: 'علاج تعفن جذور الطماطم',
    description: 'كيف تعرف أن الطماطم مصابة بتعفن الجذور؟ خطوات العلاج والوقاية.',
    readTime: '4 دقائق',
    tags: ['طماطم', 'تعفن', 'علاج'],
  },
  {
    slug: 'soil-salinity-treatment',
    title: 'كيفية التعامل مع ملوحة التربة',
    description: 'علامات ملوحة التربة وطرق عملية لتقليل الملوحة وتحسين الإنتاج.',
    readTime: '5 دقائق',
    tags: ['ملوحة', 'تحسين التربة', 'حلول'],
  },
  {
    slug: 'organic-pest-control',
    title: 'مكافحة الحشرات بدون كيماويات',
    description: 'طرق طبيعية وآمنة لمكافحة الآفات الشائعة. وصفات منزلية فعالة.',
    readTime: '4 دقائق',
    tags: ['مكافحة طبيعية', 'آفات', 'وصفات'],
  },
];

export default function ProblemsSolutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white" dir="rtl">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">الرئيسية</Link>
            <span>/</span>
            <Link href="/library" className="hover:text-green-600">المكتبة الزراعية</Link>
            <span>/</span>
            <span className="text-red-600 font-medium">مشاكل وحلول سريعة</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <span className="text-5xl">⚠️</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">مشاكل وحلول سريعة</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            إجابات مباشرة على أكثر المشاكل التي تواجه المزارع اليمني.
            حلول عملية ومجربة يمكنك تطبيقها فوراً.
          </p>
        </div>
      </section>

      {/* Quick Help Banner */}
      <section className="py-6 bg-red-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            <span className="text-gray-700">💡 لم تجد مشكلتك هنا؟</span>
            <Link
              href="/ask-murad"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors font-bold shadow-lg"
            >
              <span>⭐</span>
              اسأل الخبير مراد
            </Link>
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">المشاكل الشائعة وحلولها</h2>
          
          <div className="space-y-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/library/problems-solutions/${article.slug}`}
                className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-red-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-red-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{article.description}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-gray-500">⏱️ {article.readTime}</span>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
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

      {/* Tools Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">أدوات تساعدك في حل المشاكل</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/fertilizer-calculator"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-green-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌿</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">حاسبة التسميد</h3>
                  <p className="text-sm text-gray-600">احصل على توصية تسميد مخصصة</p>
                </div>
              </div>
            </Link>
            <Link
              href="/calculator"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-blue-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">💧</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">حاسبة الري</h3>
                  <p className="text-sm text-gray-600">احسب احتياجات الري الصحيحة</p>
                </div>
              </div>
            </Link>
            <Link
              href="/soil-types"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-amber-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌾</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">دليل التربة</h3>
                  <p className="text-sm text-gray-600">تعرف على نوع تربتك وخصائصها</p>
                </div>
              </div>
            </Link>
            <Link
              href="/ask-murad"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-purple-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">⭐</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">اسأل الخبير</h3>
                  <p className="text-sm text-gray-600">استشارة مباشرة من خبير زراعي</p>
                </div>
              </div>
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
