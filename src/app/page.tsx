// Home Page - Yemen Smart Agriculture Platform
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { articles, experts } from '@/data/seed';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white" dir="rtl">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            منصة الزراعة الذكية
            <span className="text-green-600"> اليمنية</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            مرجع زراعي متكامل يقدم المعرفة العملية للمزارع اليمني.
            حاسبات ذكية، مقالات تعليمية، ونصائح من خبرة المزارعين.
          </p>
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن منتج أو مقال أو خبير..."
                className="w-full px-6 py-4 pr-12 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 shadow-sm"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-green-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              جرب البحث عن: أبامكتين، تسميد، مكافحة الآفات
            </p>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/library"
              className="px-8 py-3 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              تصفح المكتبة الزراعية
            </Link>
            <Link
              href="/farm-calculator"
              className="px-8 py-3 border-2 border-green-600 text-green-600 text-lg font-medium rounded-lg hover:bg-green-50 transition-colors"
            >
              حِسبة المزرعة
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            لماذا منصة الزراعة الذكية؟
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🌾</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">للمزارعين</h3>
              <p className="text-gray-600">
                ابحث عن أفضل المنتجات الزراعية واحصل على نصائح من الخبراء
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🏪</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">للموردين</h3>
              <p className="text-gray-600">
                اعرض منتجاتك وتواصل مع المزارعين في جميع أنحاء اليمن
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">👨‍🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">للخبراء</h3>
              <p className="text-gray-600">
                شارك معرفتك وقدم استشارات للمزارعين المحتاجين
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">بحث ذكي</h3>
              <p className="text-gray-600">
                ابحث في المنتجات والمقالات والخبراء من مكان واحد
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Agriculture Tools Section */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            أدوات الزراعة الذكية
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            ابدأ من التعرف على تربتك، ثم احسب احتياجاتك، وإذا واجهت مشكلة معقدة — اسأل الخبير.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tool 1: Soil Guide */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-100 hover:border-amber-300 transition-colors">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌾</span>
                </div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-2">
                  مجاني
                </span>
                <h3 className="text-lg font-bold text-gray-900">دليل التربة</h3>
              </div>
              <p className="text-gray-600 text-center text-sm mb-4">
                تعرف على نوع تربتك ومشاكلها الشائعة وكيف تتعامل معها.
              </p>
              <p className="text-xs text-gray-500 text-center mb-4">
                <strong>متى تستخدمه؟</strong> لفهم طبيعة أرضك.
              </p>
              <Link
                href="/soil-types"
                className="block w-full text-center py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium text-sm"
              >
                دليل التربة
              </Link>
            </div>

            {/* Tool 2: Irrigation Calculator */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100 hover:border-green-300 transition-colors">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🧮</span>
                </div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-2">
                  مجاني
                </span>
                <h3 className="text-lg font-bold text-gray-900">حاسبة الري</h3>
              </div>
              <p className="text-gray-600 text-center text-sm mb-4">
                احصل على توصية ري عامة بناءً على نوع تربتك ومحصولك.
              </p>
              <p className="text-xs text-gray-500 text-center mb-4">
                <strong>متى تستخدمها؟</strong> لتحديد كمية الري المناسبة.
              </p>
              <Link
                href="/calculator"
                className="block w-full text-center py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
              >
                حاسبة الري
              </Link>
            </div>

            {/* Tool 3: Fertilizer Calculator */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-teal-100 hover:border-teal-300 transition-colors">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌿</span>
                </div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-2">
                  مجاني
                </span>
                <h3 className="text-lg font-bold text-gray-900">حاسبة الأسمدة</h3>
              </div>
              <p className="text-gray-600 text-center text-sm mb-4">
                حدد نوع السماد المناسب حسب مرحلة النمو ونوع التربة.
              </p>
              <p className="text-xs text-gray-500 text-center mb-4">
                <strong>متى تستخدمها؟</strong> لاختيار السماد الأنسب لمحصولك.
              </p>
              <Link
                href="/fertilizer-calculator"
                className="block w-full text-center py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm"
              >
                حاسبة الأسمدة
              </Link>
            </div>

            {/* Tool 4: Ask Murad */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100 hover:border-purple-300 transition-colors">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">👨‍🌾</span>
                </div>
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full mb-2">
                  استشارة متخصصة
                </span>
                <h3 className="text-lg font-bold text-gray-900">اسأل مراد</h3>
              </div>
              <p className="text-gray-600 text-center text-sm mb-4">
                صوّر مشكلتك واحصل على تشخيص وحل مخصص من خبير زراعي.
              </p>
              <p className="text-xs text-gray-500 text-center mb-4">
                <strong>متى تستخدمها؟</strong> عند وجود مشكلة معقدة.
              </p>
              <Link
                href="/ask-murad"
                className="block w-full text-center py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
              >
                استشر الخبير
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              جديد
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              المكتبة الزراعية
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              مرجعك الشامل للزراعة في اليمن. مقالات عملية، جداول مبسطة، وحلول للمشاكل الشائعة.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Qat Guide */}
            <Link
              href="/library/qat-guide"
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border-2 border-green-100 hover:border-green-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌳</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">دليل زراعة القات</h3>
                  <p className="text-sm text-gray-500">4 مقالات</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                برامج تسميد وري، علامات نقص العناصر، وأخطاء شائعة.
              </p>
            </Link>

            {/* Soil & Fertilization */}
            <Link
              href="/library/soil-fertilization"
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border-2 border-amber-100 hover:border-amber-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌍</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">صحة التربة والتسميد</h3>
                  <p className="text-sm text-gray-500">4 مقالات</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                كيف تعرف تربتك؟ الفرق بين الأسمدة، وأخطاء التسميد.
              </p>
            </Link>

            {/* Irrigation */}
            <Link
              href="/library/irrigation-management"
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border-2 border-blue-100 hover:border-blue-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">💧</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">الري وإدارة المياه</h3>
                  <p className="text-sm text-gray-500">4 مقالات</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                متى تسقي؟ علامات الإفراط، وتوفير المياه.
              </p>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/library"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-bold text-lg"
            >
              <span>📚</span>
              تصفح المكتبة الكاملة
            </Link>
          </div>
        </div>
      </section>

      {/* Mobeed Alyawm Section */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-orange-200">
            <div className="md:flex">
              {/* Content Side */}
              <div className="p-8 md:p-12 md:w-2/3">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold">
                    🧪 توعية يومية
                  </span>
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium animate-pulse">
                    جديد
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  مبيد اليوم
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  صفحة توعوية يومية توضّح حقيقة المبيدات، المواد الفعالة، الأخطاء الشائعة، والبدائل الآمنة بلغة المزارع.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span>
                    <span>كيف تفرق بين المبيد الأصلي والمغشوش؟</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span>
                    <span>متى الوقت الصحيح للرش؟</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span>
                    <span>أخطاء شائعة في خلط المبيدات</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span>
                    <span>بدائل طبيعية آمنة</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/mobeed-alyawm"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-bold text-lg shadow-lg hover:shadow-xl"
                  >
                    <span>🧪</span>
                    ادخل مبيد اليوم
                  </Link>
                  <a
                    href="https://www.facebook.com/profile.php?id=61586143498963"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-blue-500 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    تابعنا على فيسبوك
                  </a>
                </div>
              </div>
              {/* Visual Side */}
              <div className="md:w-1/3 bg-gradient-to-br from-orange-400 to-orange-600 p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-8xl mb-4">🧪</div>
                  <p className="text-2xl font-bold mb-2">معلومة كل يوم</p>
                  <p className="text-orange-100">لحماية محصولك وصحتك</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl font-bold">50+</p>
              <p className="text-green-100 mt-1">دليل ومقال</p>
            </div>
            <div>
              <p className="text-4xl font-bold">{articles.length}+</p>
              <p className="text-green-100 mt-1">مقال تعليمي</p>
            </div>
            <div>
              <p className="text-4xl font-bold">{experts.length}+</p>
              <p className="text-green-100 mt-1">خبير زراعي</p>
            </div>
            <div>
              <p className="text-4xl font-bold">1000+</p>
              <p className="text-green-100 mt-1">مزارع مسجل</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products - مخفي مؤقتاً */}
      {/* سيتم إعادة تفعيله لاحقاً */}

      {/* Latest Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">أحدث المقالات</h2>
            <Link href="/articles" className="text-blue-600 hover:underline">
              عرض الكل
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(0, 2).map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors overflow-hidden flex"
              >
                <div className="w-32 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">{article.imageEmoji}</span>
                </div>
                <div className="p-4 flex-1">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{article.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{article.authorName}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            انضم إلينا حسب تخصصك
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Farmer Card */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-center mb-6">
                <span className="text-5xl">🌾</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-4">مزارع</h3>
              </div>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  تصفح المنتجات الزراعية
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  قراءة المقالات التعليمية
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  طلب استشارات من الخبراء
                </li>
              </ul>
              <Link
                href="/register?role=farmer"
                className="block w-full text-center py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                سجل كمزارع
              </Link>
            </div>

            {/* Supplier Card */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-center mb-6">
                <span className="text-5xl">🏪</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-4">مورد</h3>
              </div>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  عرض منتجاتك للمزارعين
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  إدارة المخزون والأسعار
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  التواصل المباشر مع العملاء
                </li>
              </ul>
              <Link
                href="/register?role=supplier"
                className="block w-full text-center py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                سجل كمورد
              </Link>
            </div>

            {/* Expert Card */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-center mb-6">
                <span className="text-5xl">👨‍🔬</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-4">خبير زراعي</h3>
              </div>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  نشر مقالات تعليمية
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  تقديم استشارات للمزارعين
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  بناء سمعتك المهنية
                </li>
              </ul>
              <Link
                href="/register?role=expert"
                className="block w-full text-center py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                سجل كخبير
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌱</span>
                <span className="font-bold">الزراعة الذكية</span>
              </div>
              <p className="text-gray-400 text-sm">
                منصة متكاملة للزراعة في اليمن
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/products" className="hover:text-white">المنتجات</Link></li>
                <li><Link href="/articles" className="hover:text-white">المقالات</Link></li>
                <li><Link href="/experts" className="hover:text-white">الخبراء</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">الحساب</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/login" className="hover:text-white">تسجيل الدخول</Link></li>
                <li><Link href="/register" className="hover:text-white">إنشاء حساب</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">تواصل معنا</h4>
              <p className="text-gray-400 text-sm">
                info@yemen-agri.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 منصة الزراعة الذكية اليمنية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
