// Soil Types List Page - Static Content
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'دليل أنواع التربة في اليمن - منصة الزراعة الذكية اليمنية',
  description: 'تعرف على أنواع التربة الرئيسية في اليمن ومشاكلها وأفضل طرق إدارتها للحصول على أفضل إنتاج زراعي',
};

const soilTypes = [
  {
    id: 'sandy',
    name: 'التربة الرملية',
    coverage: '50%',
    color: 'from-yellow-100 to-yellow-200',
    emoji: '🏜️',
    description: 'تربة خفيفة وسهلة الحفر، توجد في السهول الساحلية وجوانب الأودية',
  },
  {
    id: 'arid',
    name: 'التربة الجافة',
    coverage: '20%',
    color: 'from-orange-100 to-orange-200',
    emoji: '☀️',
    description: 'تربة المناطق الجافة، تفتقر للمواد العضوية وتعاني من الملوحة',
  },
  {
    id: 'mixed',
    name: 'التربة الطينية المختلطة',
    coverage: '15%',
    color: 'from-amber-100 to-amber-200',
    emoji: '🌾',
    description: 'تربة جيدة للزراعة، توجد في مناطق السيول والفيضانات الموسمية',
  },
  {
    id: 'dark',
    name: 'التربة السوداء الخصبة',
    coverage: '10%',
    color: 'from-stone-200 to-stone-300',
    emoji: '🌱',
    description: 'أفضل أنواع التربة للزراعة، غنية بالمواد العضوية',
  },
  {
    id: 'clay',
    name: 'التربة الطينية الثقيلة',
    coverage: '5%',
    color: 'from-gray-200 to-gray-300',
    emoji: '🧱',
    description: 'تربة طينية كثيفة، تتشقق عند الجفاف وتصبح لزجة عند البلل',
  },
];

export default function SoilTypesPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />

      {/* Page Header */}
      <div className="bg-amber-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">دليل أنواع التربة في اليمن</h1>
          <p className="text-amber-100">تعرف على تربتك لتحصل على أفضل إنتاج</p>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-gray-700 leading-relaxed">
            معرفة نوع التربة في أرضك هي الخطوة الأولى للنجاح في الزراعة. كل نوع من التربة له طريقة خاصة في الري والتسميد. 
            اختر نوع التربة أدناه لتتعرف على مشاكلها وكيفية التعامل معها بشكل صحيح.
          </p>
        </div>
      </div>

      {/* Soil Types Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {soilTypes.map((soil) => (
            <Link
              key={soil.id}
              href={`/soil-types/${soil.id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden group"
            >
              {/* Soil Image/Icon */}
              <div className={`h-32 bg-gradient-to-br ${soil.color} flex items-center justify-center`}>
                <span className="text-6xl group-hover:scale-110 transition-transform">
                  {soil.emoji}
                </span>
              </div>

              {/* Soil Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                    {soil.name}
                  </h2>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                    {soil.coverage} من اليمن
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{soil.description}</p>

                <div className="flex items-center text-amber-600 text-sm font-medium">
                  <span>اقرأ المزيد</span>
                  <svg aria-hidden="true" className="w-4 h-4 mr-1 group-hover:translate-x-[-4px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
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
