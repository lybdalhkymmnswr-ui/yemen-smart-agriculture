'use client';

import Link from 'next/link';
import Header from '@/components/Header';

// أقسام المكتبة
const libraryCategories = [
  {
    id: 'qat-guide',
    title: 'دليل زراعة القات',
    description: 'كل ما تحتاج معرفته عن زراعة القات: من اختيار الصنف إلى الحصاد. برامج تسميد وري مبسطة.',
    icon: '🌳',
    color: 'green',
    articles: [
      { title: 'برنامج تسميد القات الشهري', slug: 'qat-fertilization-program' },
      { title: 'علامات نقص العناصر في القات', slug: 'qat-nutrient-deficiency' },
      { title: 'جدول ري القات صيفاً وشتاءً', slug: 'qat-irrigation-schedule' },
      { title: 'أخطاء شائعة في زراعة القات', slug: 'qat-common-mistakes' },
    ],
  },
  {
    id: 'vegetables-guide',
    title: 'دليل زراعة الخضروات',
    description: 'نصائح عملية لزراعة الخضروات الأكثر انتشاراً في اليمن: الطماطم، البطاطس، الخيار وغيرها.',
    icon: '🥬',
    color: 'emerald',
    articles: [
      { title: 'زراعة الطماطم خطوة بخطوة', slug: 'tomato-growing-guide' },
      { title: 'تسميد البطاطس للحصول على محصول وفير', slug: 'potato-fertilization' },
      { title: 'جدول ري الخضروات الورقية', slug: 'leafy-vegetables-irrigation' },
      { title: 'مكافحة آفات الخضروات الشائعة', slug: 'vegetables-pest-control' },
    ],
  },
  {
    id: 'soil-fertilization',
    title: 'صحة التربة والتسميد',
    description: 'تعرف على تربتك وكيف تحسّنها. الفرق بين الأسمدة، وأخطاء التسميد الشائعة.',
    icon: '🌍',
    color: 'amber',
    linkedTool: { name: 'حاسبة التسميد', href: '/fertilizer-calculator' },
    articles: [
      { title: 'كيف تعرف أن تربتك فقيرة؟', slug: 'poor-soil-signs' },
      { title: 'الفرق بين السماد العضوي والكيماوي', slug: 'organic-vs-chemical-fertilizer' },
      { title: '5 أخطاء شائعة في تسميد التربة الرملية', slug: 'sandy-soil-fertilization-mistakes' },
      { title: 'متى وكيف تضيف السماد؟', slug: 'when-how-to-fertilize' },
    ],
  },
  {
    id: 'irrigation-management',
    title: 'الري وإدارة المياه',
    description: 'أساسيات الري الصحيح، متى تسقي ومتى تتوقف، والفرق بين طرق الري المختلفة.',
    icon: '💧',
    color: 'blue',
    linkedTool: { name: 'حاسبة الري', href: '/calculator' },
    articles: [
      { title: 'متى تتحول من الغمر إلى التنقيط؟', slug: 'flood-to-drip-irrigation' },
      { title: 'علامات الإفراط في الري', slug: 'overwatering-signs' },
      { title: 'توفير المياه في الزراعة', slug: 'water-saving-agriculture' },
      { title: 'صيانة نظام التنقيط', slug: 'drip-system-maintenance' },
    ],
  },
  {
    id: 'problems-solutions',
    title: 'مشاكل وحلول سريعة',
    description: 'إجابات مباشرة على أكثر المشاكل التي تواجه المزارع اليمني. حلول عملية ومجربة.',
    icon: '⚠️',
    color: 'red',
    articles: [
      { title: 'لماذا تصفر أوراق القات؟', slug: 'qat-yellow-leaves' },
      { title: 'علاج تعفن جذور الطماطم', slug: 'tomato-root-rot' },
      { title: 'كيفية التعامل مع ملوحة التربة', slug: 'soil-salinity-treatment' },
      { title: 'مكافحة الحشرات بدون كيماويات', slug: 'organic-pest-control' },
    ],
  },
];

// دالة للحصول على ألوان القسم
const getCategoryColors = (color: string) => {
  const colors: Record<string, { bg: string; border: string; text: string; light: string }> = {
    green: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-700', light: 'bg-green-50' },
    emerald: { bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-700', light: 'bg-emerald-50' },
    amber: { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-700', light: 'bg-amber-50' },
    blue: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700', light: 'bg-blue-50' },
    red: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-700', light: 'bg-red-50' },
  };
  return colors[color] || colors.green;
};

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white" dir="rtl">
      <Header />

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <span className="text-5xl">📚</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            المكتبة الزراعية
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            مرجعك الشامل للزراعة في اليمن. مقالات عملية، جداول مبسطة، وحلول للمشاكل الشائعة.
            كل المحتوى مجاني ومتاح للجميع.
          </p>
        </div>
      </section>

      {/* Quick Links to Tools */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors font-medium"
            >
              <span>💧</span>
              حاسبة الري
            </Link>
            <Link
              href="/fertilizer-calculator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors font-medium"
            >
              <span>🌿</span>
              حاسبة التسميد
            </Link>
            <Link
              href="/soil-types"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors font-medium"
            >
              <span>🌾</span>
              دليل التربة
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {libraryCategories.map((category) => {
              const colors = getCategoryColors(category.color);
              return (
                <div
                  key={category.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${colors.border} hover:shadow-xl transition-shadow`}
                >
                  {/* Category Header */}
                  <div className={`${colors.bg} p-6`}>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-3xl">{category.icon}</span>
                      </div>
                      <div>
                        <h2 className={`text-xl font-bold ${colors.text}`}>{category.title}</h2>
                        {category.linkedTool && (
                          <Link
                            href={category.linkedTool.href}
                            className={`text-sm ${colors.text} hover:underline flex items-center gap-1`}
                          >
                            <span>🔗</span>
                            {category.linkedTool.name}
                          </Link>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-3 text-sm">{category.description}</p>
                  </div>

                  {/* Articles List */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-500 mb-3">المقالات:</h3>
                    <ul className="space-y-2">
                      {category.articles.map((article, index) => (
                        <li key={index}>
                          <Link
                            href={`/library/${category.id}/${article.slug}`}
                            className={`block p-3 ${colors.light} rounded-lg hover:${colors.bg} transition-colors text-gray-700 text-sm`}
                          >
                            <span className="ml-2">📄</span>
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            هل تحتاج توصية مخصصة لأرضك؟
          </h2>
          <p className="text-gray-600 mb-6">
            استخدم أدواتنا المجانية للحصول على توصيات دقيقة بناءً على نوع تربتك ومحصولك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fertilizer-calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-bold text-lg"
            >
              <span>🌿</span>
              احسب توصية التسميد
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg"
            >
              <span>💧</span>
              احسب توصية الري
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
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              الرئيسية
            </Link>
            <Link href="/soil-types" className="text-gray-400 hover:text-white transition-colors">
              دليل التربة
            </Link>
            <Link href="/calculator" className="text-gray-400 hover:text-white transition-colors">
              حاسبة الري
            </Link>
            <Link href="/fertilizer-calculator" className="text-gray-400 hover:text-white transition-colors">
              حاسبة التسميد
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
