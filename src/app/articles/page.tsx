// Articles List Page
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import { articles } from '@/data/seed';

export const metadata: Metadata = {
  title: 'المقالات الزراعية - منصة الزراعة الذكية اليمنية',
  description: 'اقرأ أحدث المقالات والنصائح الزراعية من خبراء الزراعة في اليمن',
};

export default function ArticlesPage() {
  // Get all unique tags
  const allTags = Array.from(new Set(articles.flatMap((a) => a.tags)));

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />

      {/* Page Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">المقالات الزراعية</h1>
          <p className="text-blue-100">نصائح ومعلومات زراعية من خبراء متخصصين</p>
        </div>
      </div>

      {/* Tags Filter */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm">
              الكل ({articles.length})
            </span>
            {allTags.slice(0, 8).map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col sm:flex-row"
            >
              {/* Article Image */}
              <div className="sm:w-48 h-48 sm:h-auto bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                <span className="text-5xl group-hover:scale-110 transition-transform">
                  {article.imageEmoji}
                </span>
              </div>

              {/* Article Info */}
              <div className="p-4 flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{article.excerpt}</p>

                {/* Author & Date */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{article.authorName}</span>
                  <span className="text-gray-400">{article.publishedAt}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 منصة الزراعة الذكية اليمنية</p>
        </div>
      </footer>
    </div>
  );
}
