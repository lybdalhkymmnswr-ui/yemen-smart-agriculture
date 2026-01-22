// Home Page - Yemen Smart Agriculture Platform
'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    <div className="min-h-screen bg-beige" dir="rtl">
      <Header />

      {/* Hero Section - خلفية بنمط المدرجات */}
      <section className="py-20 px-4 bg-terraces">
        <div className="max-w-4xl mx-auto text-center">
          {/* الشعار الكبير */}
          <div className="flex justify-center mb-6">
            <Image 
              src="/logo-knowledge-tree.webp"
              priority={true} 
              alt="شجرة المعرفة الزراعية" 
              width={120} 
              height={120}
              className="w-28 h-28 md:w-32 md:h-32"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-soil mb-6 font-cairo">
            منصة الزراعة الذكية
            <span className="text-growth"> اليمنية</span>
          </h1>
          <p className="text-xl text-soil/80 mb-8 font-noto leading-relaxed">
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
                placeholder="ابحث عن مقال أو دليل زراعي..."
                className="w-full px-6 py-4 pr-12 text-lg border-2 border-soil/20 rounded-xl focus:outline-none focus:border-growth shadow-sm bg-white font-noto"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-soil/60 hover:text-growth"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-soil/60 mt-2 font-noto">
              جرب البحث عن: أبامكتين، تسميد، مكافحة الآفات
            </p>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/library"
              className="px-8 py-3 bg-growth text-white text-lg font-medium rounded-lg hover:bg-growth-dark transition-colors font-cairo"
            >
              تصفح المكتبة الزراعية
            </Link>
            <Link
              href="/farm-calculator"
              className="px-8 py-3 border-2 border-soil text-soil text-lg font-medium rounded-lg hover:bg-soil/5 transition-colors font-cairo"
            >
              حِسبة المزرعة
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-soil mb-12 font-cairo">
            لماذا منصة الزراعة الذكية؟
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-growth/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🌾</span>
              </div>
              <h3 className="text-xl font-semibold text-soil mb-2 font-cairo">للمزارعين</h3>
              <p className="text-soil/70 font-noto">
                ابحث عن أفضل المنتجات الزراعية واحصل على نصائح من الخبراء
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-water/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🏪</span>
              </div>
              <h3 className="text-xl font-semibold text-soil mb-2 font-cairo">للموردين</h3>
              <p className="text-soil/70 font-noto">
                اعرض منتجاتك وتواصل مع المزارعين في جميع أنحاء اليمن
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-sun/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">👨‍🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-soil mb-2 font-cairo">للخبراء</h3>
              <p className="text-soil/70 font-noto">
                شارك معرفتك وقدم استشارات للمزارعين المحتاجين
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-soil/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-soil mb-2 font-cairo">بحث ذكي</h3>
              <p className="text-soil/70 font-noto">
                ابحث في المنتجات والمقالات والخبراء من مكان واحد
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Agriculture Tools Section */}
      <section className="py-16 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-soil mb-4 font-cairo">
            أدوات الزراعة الذكية
          </h2>
          <p className="text-center text-soil/70 mb-12 max-w-2xl mx-auto font-noto">
            ابدأ من التعرف على تربتك، ثم احسب احتياجاتك، وإذا واجهت مشكلة معقدة — اسأل الخبير.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tool 1: Soil Guide */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-soil/10 hover:border-soil/30 transition-colors">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-soil/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌾</span>
                </div>
                <span className="inline-block px-3 py-1 bg-growth/10 text-growth text-sm font-medium rounded-full mb-2 font-cairo">
                  مجاني
                </span>
                <h3 className="text-lg font-bold text-soil font-cairo">دليل التربة</h3>
              </div>
              <p className="text-soil/70 text-center text-sm mb-4 font-noto">
                تعرف على نوع تربتك ومشاكلها الشائعة وكيف تتعامل معها.
              </p>
              <p className="text-xs text-soil/60 text-center mb-4 font-noto">
                <strong>متى تستخدمه؟</strong> لفهم طبيعة أرضك.
              </p>
              <Link
                href="/soil-types"
                className="block w-full text-center py-2.5 bg-soil text-white rounded-lg hover:bg-soil-dark transition-colors font-medium text-sm font-cairo"
              >
                دليل التربة
              </Link>
            </div>

            {/* Tool 2: Irrigation Calculator */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-growth/10 hover:border-growth/30 transition-colors">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-growth/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🧮</span>
                </div>
                <span className="inline-block px-3 py-1 bg-growth/10 text-growth text-sm font-medium rounded-full mb-2 font-cairo">
                  مجاني
                </span>
                <h3 className="text-lg font-bold text-soil font-cairo">حاسبة الري</h3>
              </div>
              <p className="text-soil/70 text-center text-sm mb-4 font-noto">
                احصل على توصية ري عامة بناءً على نوع تربتك ومحصولك.
              </p>
              <p className="text-xs text-soil/60 text-center mb-4 font-noto">
                <strong>متى تستخدمها؟</strong> لتحديد كمية الري المناسبة.
              </p>
              <Link
                href="/calculator"
                className="block w-full text-center py-2.5 bg-growth text-white rounded-lg hover:bg-growth-dark transition-colors font-medium text-sm font-cairo"
              >
                حاسبة الري
              </Link>
            </div>

            {/* Tool 3: Fertilizer Calculator */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-growth/10 hover:border-growth/30 transition-colors">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-growth/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌿</span>
                </div>
                <span className="inline-block px-3 py-1 bg-growth/10 text-growth text-sm font-medium rounded-full mb-2 font-cairo">
                  مجاني
                </span>
                <h3 className="text-lg font-bold text-soil font-cairo">حاسبة الأسمدة</h3>
              </div>
              <p className="text-soil/70 text-center text-sm mb-4 font-noto">
                حدد نوع السماد المناسب حسب مرحلة النمو ونوع التربة.
              </p>
              <p className="text-xs text-soil/60 text-center mb-4 font-noto">
                <strong>متى تستخدمها؟</strong> لاختيار السماد الأنسب لمحصولك.
              </p>
              <Link
                href="/fertilizer-calculator"
                className="block w-full text-center py-2.5 bg-growth text-white rounded-lg hover:bg-growth-dark transition-colors font-medium text-sm font-cairo"
              >
                حاسبة الأسمدة
              </Link>
            </div>

            {/* Tool 4: Ask Murad */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-soil/10 hover:border-soil/30 transition-colors">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-soil/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">👨‍🌾</span>
                </div>
                <span className="inline-block px-3 py-1 bg-soil/10 text-soil text-sm font-medium rounded-full mb-2 font-cairo">
                  استشارة متخصصة
                </span>
                <h3 className="text-lg font-bold text-soil font-cairo">اسأل مراد</h3>
              </div>
              <p className="text-soil/70 text-center text-sm mb-4 font-noto">
                صوّر مشكلتك واحصل على تشخيص وحل مخصص من خبير زراعي.
              </p>
              <p className="text-xs text-soil/60 text-center mb-4 font-noto">
                <strong>متى تستخدمها؟</strong> عند وجود مشكلة معقدة.
              </p>
              <Link
                href="/ask-murad"
                className="block w-full text-center py-2.5 bg-soil text-white rounded-lg hover:bg-soil-dark transition-colors font-medium text-sm font-cairo"
              >
                استشر الخبير
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-growth/10 text-growth rounded-full text-sm font-medium mb-4 font-cairo">
              جديد
            </span>
            <h2 className="text-3xl font-bold text-soil mb-4 font-cairo">
              المكتبة الزراعية
            </h2>
            <p className="text-soil/70 max-w-2xl mx-auto font-noto">
              مرجعك الشامل للزراعة في اليمن. مقالات عملية، جداول مبسطة، وحلول للمشاكل الشائعة.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Qat Guide */}
            <Link
              href="/library/qat-guide"
              className="bg-beige rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border-2 border-growth/10 hover:border-growth/30"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-growth/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌳</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-soil font-cairo">دليل زراعة القات</h3>
                  <p className="text-sm text-soil/60 font-noto">4 مقالات</p>
                </div>
              </div>
              <p className="text-soil/70 text-sm font-noto">
                برامج تسميد وري، علامات نقص العناصر، وأخطاء شائعة.
              </p>
            </Link>

            {/* Soil & Fertilization */}
            <Link
              href="/library/soil-fertilization"
              className="bg-beige rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border-2 border-soil/10 hover:border-soil/30"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-soil/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌍</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-soil font-cairo">صحة التربة والتسميد</h3>
                  <p className="text-sm text-soil/60 font-noto">4 مقالات</p>
                </div>
              </div>
              <p className="text-soil/70 text-sm font-noto">
                كيف تعرف تربتك؟ الفرق بين الأسمدة، وأخطاء التسميد.
              </p>
            </Link>

            {/* Irrigation */}
            <Link
              href="/library/irrigation-management"
              className="bg-beige rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border-2 border-water/10 hover:border-water/30"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-water/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">💧</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-soil font-cairo">الري وإدارة المياه</h3>
                  <p className="text-sm text-soil/60 font-noto">4 مقالات</p>
                </div>
              </div>
              <p className="text-soil/70 text-sm font-noto">
                متى تسقي؟ علامات الإفراط، وتوفير المياه.
              </p>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/library"
              className="inline-flex items-center gap-2 px-8 py-4 bg-growth text-white rounded-xl hover:bg-growth-dark transition-colors font-bold text-lg font-cairo"
            >
              <span>📚</span>
              تصفح المكتبة الكاملة
            </Link>
          </div>
        </div>
      </section>

      {/* Mobeed Alyawm Section */}
      <section className="py-16 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-growth/20">
            <div className="md:flex">
              {/* Content Side */}
              <div className="p-8 md:p-12 md:w-2/3">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block px-4 py-2 bg-growth/10 text-growth rounded-full text-sm font-bold font-cairo">
                    🧪 توعية يومية
                  </span>
                  <span className="inline-block px-3 py-1 bg-sun/20 text-sun-dark rounded-full text-xs font-medium animate-pulse font-cairo">
                    جديد
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-soil mb-4 font-cairo">
                  مبيد اليوم
                </h2>
                <p className="text-soil/70 text-lg mb-6 leading-relaxed font-noto">
                  صفحة توعوية يومية توضّح حقيقة المبيدات، المواد الفعالة، الأخطاء الشائعة، والبدائل الآمنة بلغة المزارع.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-soil/80 font-noto">
                    <span className="w-6 h-6 bg-growth/10 rounded-full flex items-center justify-center text-growth">✓</span>
                    <span>كيف تفرق بين المبيد الأصلي والمغشوش؟</span>
                  </li>
                  <li className="flex items-center gap-3 text-soil/80 font-noto">
                    <span className="w-6 h-6 bg-growth/10 rounded-full flex items-center justify-center text-growth">✓</span>
                    <span>متى الوقت الصحيح للرش؟</span>
                  </li>
                  <li className="flex items-center gap-3 text-soil/80 font-noto">
                    <span className="w-6 h-6 bg-growth/10 rounded-full flex items-center justify-center text-growth">✓</span>
                    <span>أخطاء شائعة في خلط المبيدات</span>
                  </li>
                  <li className="flex items-center gap-3 text-soil/80 font-noto">
                    <span className="w-6 h-6 bg-growth/10 rounded-full flex items-center justify-center text-growth">✓</span>
                    <span>بدائل طبيعية آمنة</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/mobeed-alyawm"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-growth text-white rounded-xl hover:bg-growth-dark transition-colors font-bold text-lg shadow-lg hover:shadow-xl font-cairo"
                  >
                    <span>🧪</span>
                    ادخل مبيد اليوم
                  </Link>
                  <a
                    href="https://www.facebook.com/profile.php?id=61586143498963"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-water text-water rounded-xl hover:bg-water/5 transition-colors font-medium font-cairo"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    تابعنا على فيسبوك
                  </a>
                </div>
              </div>
              {/* Visual Side */}
              <div className="md:w-1/3 bg-gradient-to-br from-growth to-growth-dark p-8 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-8xl mb-4">🧪</div>
                  <p className="text-2xl font-bold mb-2 font-cairo">معلومة كل يوم</p>
                  <p className="text-growth-light font-noto">لحماية محصولك وصحتك</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-soil">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl font-bold font-cairo">50+</p>
              <p className="text-beige/80 mt-1 font-noto">دليل ومقال</p>
            </div>
            <div>
              <p className="text-4xl font-bold font-cairo">{articles.length}+</p>
              <p className="text-beige/80 mt-1 font-noto">مقال تعليمي</p>
            </div>
            <div>
              <p className="text-4xl font-bold font-cairo">{experts.length}+</p>
              <p className="text-beige/80 mt-1 font-noto">خبير زراعي</p>
            </div>
            <div>
              <p className="text-4xl font-bold font-cairo">1000+</p>
              <p className="text-beige/80 mt-1 font-noto">مزارع مسجل</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-soil font-cairo">أحدث المقالات</h2>
            <Link href="/articles" className="text-growth hover:underline font-cairo">
              عرض الكل
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(0, 2).map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="bg-beige rounded-xl hover:bg-beige-dark transition-colors overflow-hidden flex"
              >
                <div className="w-32 bg-gradient-to-br from-growth/20 to-growth/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">{article.imageEmoji}</span>
                </div>
                <div className="p-4 flex-1">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-growth/10 text-growth text-xs rounded-full font-noto">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-soil line-clamp-1 font-cairo">{article.title}</h3>
                  <p className="text-sm text-soil/60 mt-1 font-noto">{article.authorName}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AUTH DISABLED: قسم التسجيل مخفي مؤقتاً */}

      {/* Footer */}
      <footer className="bg-soil text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image 
                  src="/logo-knowledge-tree.webp"
              priority={true} 
                  alt="شجرة المعرفة الزراعية" 
                  width={32} 
                  height={32}
                  className="w-8 h-8"
                />
                <span className="font-bold font-cairo">الزراعة الذكية</span>
              </div>
              <p className="text-beige/70 text-sm font-noto">
                منصة متكاملة للزراعة في اليمن
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-cairo">روابط سريعة</h4>
              <ul className="space-y-2 text-beige/70 font-noto">
                <li><Link href="/products" className="hover:text-white">المنتجات</Link></li>
                <li><Link href="/articles" className="hover:text-white">المقالات</Link></li>
                <li><Link href="/experts" className="hover:text-white">الخبراء</Link></li>
              </ul>
            </div>
            {/* AUTH DISABLED: روابط الحساب مخفية مؤقتاً */}
            <div>
              <h4 className="font-semibold mb-4 font-cairo">تواصل معنا</h4>
              <p className="text-beige/70 text-sm font-noto">
                info@yemen-agri.com
              </p>
            </div>
          </div>
          <div className="border-t border-beige/20 mt-8 pt-8 text-center text-beige/70 font-noto">
            <p>© 2024 منصة الزراعة الذكية اليمنية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
