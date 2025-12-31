// Article Detail Page
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { articles } from '@/data/seed';

interface ArticlePageProps {
  params: { slug: string };
}

// Generate static params for all articles
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = articles.find((a) => a.slug === params.slug);
  
  if (!article) {
    return {
      title: 'مقال غير موجود - منصة الزراعة الذكية اليمنية',
    };
  }

  return {
    title: `${article.title} - منصة الزراعة الذكية اليمنية`,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  // Get related articles (same tags)
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.tags.some((tag) => article.tags.includes(tag)))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">الرئيسية</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-green-600">المقالات</Link>
          <span>/</span>
          <span className="text-gray-900 truncate">{article.title}</span>
        </nav>
      </div>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Article Header Image */}
          <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-8xl">{article.imageEmoji}</span>
          </div>

          {/* Article Content */}
          <div className="p-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 font-medium">
                  {article.authorName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{article.authorName}</p>
                <p className="text-sm text-gray-500">تاريخ النشر: {article.publishedAt}</p>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {article.excerpt}
              </p>
              
              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">مقدمة</h2>
              <p className="text-gray-600 leading-relaxed">
                في هذا المقال سنتناول موضوعاً مهماً يتعلق بالزراعة في اليمن. سنستعرض أهم النقاط
                والممارسات التي يجب على المزارعين معرفتها لتحسين إنتاجيتهم وجودة محاصيلهم.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">النقاط الرئيسية</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>فهم أساسيات الموضوع وأهميته للزراعة اليمنية</li>
                <li>التعرف على أفضل الممارسات والتقنيات الحديثة</li>
                <li>تطبيق المعرفة بشكل عملي في المزرعة</li>
                <li>متابعة التطورات والاستفادة من خبرات الآخرين</li>
              </ul>

              <div className="bg-blue-50 border-r-4 border-blue-500 p-4 my-6">
                <p className="text-blue-800">
                  <strong>نصيحة:</strong> تابع المقالات الجديدة للحصول على أحدث المعلومات الزراعية
                  واستشر الخبراء عند الحاجة.
                </p>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">الخلاصة</h2>
              <p className="text-gray-600 leading-relaxed">
                نأمل أن يكون هذا المقال قد أفادكم. لا تترددوا في التواصل معنا أو مع الخبراء
                المتخصصين للحصول على مزيد من المعلومات والاستشارات.
              </p>
            </div>

            {/* Share Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-500 mb-4">شارك هذا المقال:</p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  فيسبوك
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  واتساب
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                  نسخ الرابط
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">مقالات ذات صلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/articles/${relatedArticle.slug}`}
                  className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{relatedArticle.imageEmoji}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-1">{relatedArticle.title}</h3>
                    <p className="text-sm text-gray-500">{relatedArticle.authorName}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
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
