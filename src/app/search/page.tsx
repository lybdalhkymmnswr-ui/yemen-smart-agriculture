'use client';

// Search Results Page
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/Header';
import { searchAll, Product, Article, Expert } from '@/data/seed';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const results = searchAll(query);
  const totalResults = results.products.length + results.articles.length + results.experts.length;

  return (
    <>
      {/* Search Info */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            نتائج البحث عن: &ldquo;{query}&rdquo;
          </h1>
          <p className="text-gray-500">
            {totalResults > 0
              ? `تم العثور على ${totalResults} نتيجة`
              : 'لم يتم العثور على نتائج'}
          </p>
        </div>
      </div>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {totalResults === 0 ? (
          <div className="text-center py-16">
            <span className="text-6xl block mb-4">🔍</span>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">لا توجد نتائج</h2>
            <p className="text-gray-500 mb-6">جرب كلمات بحث مختلفة أو تصفح الأقسام</p>
            <div className="flex justify-center gap-4">
              <Link href="/products" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                تصفح المنتجات
              </Link>
              <Link href="/articles" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                تصفح المقالات
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Products Results */}
            {results.products.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    📦 المنتجات ({results.products.length})
                  </h2>
                  <Link href="/products" className="text-green-600 hover:underline text-sm">
                    عرض الكل
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.products.map((product: Product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex items-center gap-4"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{product.imageEmoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{product.title}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <p className="text-sm font-bold text-green-600">
                          {product.priceRetail.toLocaleString()} ر.ي
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Articles Results */}
            {results.articles.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    📝 المقالات ({results.articles.length})
                  </h2>
                  <Link href="/articles" className="text-blue-600 hover:underline text-sm">
                    عرض الكل
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.articles.map((article: Article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.slug}`}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex items-center gap-4"
                    >
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{article.imageEmoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{article.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{article.excerpt}</p>
                        <p className="text-xs text-gray-400 mt-1">{article.authorName}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Experts Results */}
            {results.experts.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    👨‍🔬 الخبراء ({results.experts.length})
                  </h2>
                  <Link href="/experts" className="text-amber-600 hover:underline text-sm">
                    عرض الكل
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.experts.map((expert: Expert) => (
                    <Link
                      key={expert.uid}
                      href={`/experts/${expert.uid}`}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex items-center gap-4"
                    >
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{expert.imageEmoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{expert.displayName}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {expert.specialties.join('، ')}
                        </p>
                        <p className="text-xs text-amber-600 mt-1">
                          {expert.articlesCount} مقال • {expert.consultationsCount} استشارة
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      }>
        <SearchResults />
      </Suspense>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 منصة الزراعة الذكية اليمنية</p>
        </div>
      </footer>
    </div>
  );
}
