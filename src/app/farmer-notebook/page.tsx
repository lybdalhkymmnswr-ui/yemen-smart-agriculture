'use client';

import Link from 'next/link';

// بيانات الخواطر - 10 خواطر قصيرة
const thoughts = [
  {
    id: 1,
    title: 'الماء قبل السماد',
    content: 'كثير من المزارعين يضعون السماد على تربة جافة ويتعجبون ليش ما نفع. السماد يحتاج رطوبة حتى يذوب ويوصل للجذور. اسقِ أولاً، ثم سمّد.',
    category: 'نصيحة',
  },
  {
    id: 2,
    title: 'لا تقارن مزرعتك بمزرعة جارك',
    content: 'كل أرض لها طبيعتها، وكل موسم له ظروفه. اللي نجح مع جارك قد لا ينجح معك. راقب أرضك أنت، وتعلم منها.',
    category: 'وعي',
  },
  {
    id: 3,
    title: 'المبيد ليس حل لكل مشكلة',
    content: 'أحياناً النبات يصفر من العطش أو نقص عنصر، وليس من آفة. قبل ما ترش، اسأل نفسك: هل المشكلة فعلاً حشرة أو مرض؟',
    category: 'خطأ شائع',
  },
  {
    id: 4,
    title: 'سجّل كل شيء',
    content: 'التاريخ، الكمية، النتيجة. بعد سنة ستشكر نفسك. الذاكرة تخون، لكن الدفتر لا يكذب.',
    category: 'نصيحة',
  },
  {
    id: 5,
    title: 'الصبر نصف الزراعة',
    content: 'لا تستعجل النتيجة. النبات يحتاج وقته. اللي يستعجل يخسر، واللي يصبر يحصد.',
    category: 'وعي',
  },
  {
    id: 6,
    title: 'رخيص السماد غالي الخسارة',
    content: 'السماد المغشوش يوفر لك ألف ريال ويخسرك مئة ألف في المحصول. الجودة استثمار، والغش خسارة مؤجلة.',
    category: 'خطأ شائع',
  },
  {
    id: 7,
    title: 'اسأل قبل ما تجرب',
    content: 'التجربة العشوائية مكلفة. اسأل من جرّب قبلك، واقرأ، وتعلم من أخطاء غيرك بدل ما تدفع ثمنها من جيبك.',
    category: 'نصيحة',
  },
  {
    id: 8,
    title: 'التربة أساس كل شيء',
    content: 'لو التربة مريضة، كل شيء فوقها سيتعب. اهتم بتربتك قبل ما تهتم بالنبات. التربة الصحية = نبات قوي.',
    category: 'وعي',
  },
  {
    id: 9,
    title: 'الري الزائد قاتل صامت',
    content: 'كثير يظنون أن الماء الكثير أفضل. الحقيقة: الري الزائد يخنق الجذور ويسبب أمراض أكثر من الجفاف.',
    category: 'خطأ شائع',
  },
  {
    id: 10,
    title: 'المزارع الناجح يتعلم كل يوم',
    content: 'لا أحد يعرف كل شيء. أفضل المزارعين هم الذين يسألون ويتعلمون ويجربون بوعي. الجهل ليس عيباً، لكن البقاء عليه هو العيب.',
    category: 'وعي',
  },
];

// ألوان التصنيفات
const categoryColors: { [key: string]: string } = {
  'نصيحة': 'bg-green-100 text-green-800',
  'وعي': 'bg-blue-100 text-blue-800',
  'خطأ شائع': 'bg-red-100 text-red-800',
};

// أيقونات التصنيفات
const categoryIcons: { [key: string]: string } = {
  'نصيحة': '💡',
  'وعي': '🌱',
  'خطأ شائع': '⚠️',
};

export default function FarmerNotebookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">📒</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">دفتر المزارع</h1>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto">
            خواطر قصيرة من الحقل... وعي وتجارب وأخطاء نتعلم منها
          </p>
          <p className="text-amber-200 text-sm mt-2">
            ⏱️ كل خاطرة أقل من 20 ثانية قراءة
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="flex justify-center gap-6 mb-8 text-sm">
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-amber-200">
            <span className="text-amber-600 font-bold">{thoughts.length}</span>
            <span className="text-gray-600 mr-1">خاطرة</span>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-amber-200">
            <span className="text-green-600 font-bold">{thoughts.filter(t => t.category === 'نصيحة').length}</span>
            <span className="text-gray-600 mr-1">نصيحة</span>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-amber-200">
            <span className="text-red-600 font-bold">{thoughts.filter(t => t.category === 'خطأ شائع').length}</span>
            <span className="text-gray-600 mr-1">خطأ شائع</span>
          </div>
        </div>

        {/* Thoughts Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {thoughts.map((thought) => (
            <article
              key={thought.id}
              className="bg-white rounded-xl shadow-sm border border-amber-100 p-5 hover:shadow-md transition-shadow"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-3 py-1 rounded-full ${categoryColors[thought.category]}`}>
                  {categoryIcons[thought.category]} {thought.category}
                </span>
                <span className="text-gray-400 text-xs">#{thought.id}</span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {thought.title}
              </h2>

              {/* Content */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {thought.content}
              </p>
            </article>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="bg-amber-50 rounded-xl p-6 max-w-xl mx-auto border border-amber-200">
            <p className="text-amber-800 text-sm mb-2">
              📝 هذه النسخة الأولية من دفتر المزارع
            </p>
            <p className="text-amber-600 text-xs">
              نقيّم التفاعل قبل إضافة المزيد من الخواطر
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            → العودة للصفحة الرئيسية
          </Link>
        </div>
      </main>
    </div>
  );
}
