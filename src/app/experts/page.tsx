// Experts List Page
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import { experts } from '@/data/seed';

export const metadata: Metadata = {
  title: 'الخبراء الزراعيون - منصة الزراعة الذكية اليمنية',
  description: 'تواصل مع خبراء الزراعة المتخصصين واحصل على استشارات زراعية موثوقة',
};

export default function ExpertsPage() {
  // Get all unique specialties
  const allSpecialties = Array.from(new Set(experts.flatMap((e) => e.specialties)));

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />

      {/* Page Header */}
      <div className="bg-amber-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">الخبراء الزراعيون</h1>
          <p className="text-amber-100">تواصل مع خبراء متخصصين واحصل على استشارات موثوقة</p>
        </div>
      </div>

      {/* Specialties Filter */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 bg-amber-600 text-white rounded-full text-sm">
              الكل ({experts.length})
            </span>
            {allSpecialties.slice(0, 8).map((specialty) => (
              <span
                key={specialty}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Experts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <Link
              key={expert.uid}
              href={`/experts/${expert.uid}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              {/* Expert Avatar */}
              <div className="h-32 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <span className="text-4xl">{expert.imageEmoji}</span>
                </div>
              </div>

              {/* Expert Info */}
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                  {expert.displayName}
                </h2>

                {/* Specialties */}
                <div className="flex flex-wrap justify-center gap-1 mb-3">
                  {expert.specialties.slice(0, 2).map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{expert.bio}</p>

                {/* Stats */}
                <div className="flex justify-center gap-6 text-sm border-t pt-4">
                  <div className="text-center">
                    <p className="font-bold text-amber-600">{expert.articlesCount}</p>
                    <p className="text-gray-400 text-xs">مقال</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-green-600">{expert.consultationsCount}</p>
                    <p className="text-gray-400 text-xs">استشارة</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-amber-50 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">هل أنت خبير زراعي؟</h2>
          <p className="text-gray-600 mb-6">
            انضم إلى منصتنا وشارك خبرتك مع المزارعين في اليمن. ساعد في تطوير القطاع الزراعي.
          </p>
          <Link
            href="/register?role=expert"
            className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            سجل كخبير زراعي
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 منصة الزراعة الذكية اليمنية</p>
        </div>
      </footer>
    </div>
  );
}
