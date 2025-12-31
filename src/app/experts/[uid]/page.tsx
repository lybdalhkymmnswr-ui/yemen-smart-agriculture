// Expert Detail Page
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import { experts, articles } from '@/data/seed';

interface ExpertPageProps {
  params: { uid: string };
}

// Generate static params for all experts
export async function generateStaticParams() {
  return experts.map((expert) => ({
    uid: expert.uid,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ExpertPageProps): Promise<Metadata> {
  const expert = experts.find((e) => e.uid === params.uid);
  
  if (!expert) {
    return {
      title: 'خبير غير موجود - منصة الزراعة الذكية اليمنية',
    };
  }

  return {
    title: `${expert.displayName} - منصة الزراعة الذكية اليمنية`,
    description: expert.bio,
  };
}

export default function ExpertPage({ params }: ExpertPageProps) {
  const expert = experts.find((e) => e.uid === params.uid);

  if (!expert) {
    notFound();
  }

  // Get expert's articles (matching author name)
  const expertArticles = articles.filter((a) => a.authorName === expert.displayName);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />

      {/* Expert Header */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-6xl">{expert.imageEmoji}</span>
            </div>

            {/* Info */}
            <div className="text-center sm:text-right flex-1">
              <h1 className="text-3xl font-bold mb-2">{expert.displayName}</h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                {expert.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-white/20 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              <div className="flex justify-center sm:justify-start gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{expert.articlesCount}</p>
                  <p className="text-amber-100 text-sm">مقال</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{expert.consultationsCount}</p>
                  <p className="text-amber-100 text-sm">استشارة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">الرئيسية</Link>
          <span>/</span>
          <Link href="/experts" className="hover:text-green-600">الخبراء</Link>
          <span>/</span>
          <span className="text-gray-900">{expert.displayName}</span>
        </nav>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">نبذة عن الخبير</h2>
              <p className="text-gray-600 leading-relaxed">{expert.bio}</p>
            </div>

            {/* Expert's Articles */}
            {expertArticles.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">مقالات الخبير</h2>
                <div className="space-y-4">
                  {expertArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.slug}`}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">{article.imageEmoji}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{article.title}</h3>
                        <p className="text-sm text-gray-500">{article.publishedAt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Specialties Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">التخصصات</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expert.specialties.map((specialty) => (
                  <div
                    key={specialty}
                    className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg"
                  >
                    <span className="text-2xl">✓</span>
                    <span className="text-gray-900">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">تواصل مع الخبير</h3>
              <button className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors mb-3">
                طلب استشارة
              </button>
              <button className="w-full border border-amber-600 text-amber-600 py-3 rounded-lg hover:bg-amber-50 transition-colors">
                إرسال رسالة
              </button>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">إحصائيات</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">المقالات</span>
                  <span className="font-bold text-gray-900">{expert.articlesCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">الاستشارات</span>
                  <span className="font-bold text-gray-900">{expert.consultationsCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">التقييم</span>
                  <span className="text-amber-500">⭐ 4.8</span>
                </div>
              </div>
            </div>

            {/* Verification Badge */}
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <span className="text-3xl block mb-2">✓</span>
              <p className="font-medium text-green-800">خبير موثق</p>
              <p className="text-sm text-green-600">تم التحقق من الهوية والمؤهلات</p>
            </div>
          </div>
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
