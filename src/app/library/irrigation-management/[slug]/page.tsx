'use client';

import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import Header from '@/components/Header';

// بيانات المقالات
const articlesData: Record<string, {
  title: string;
  description: string;
  content: React.ReactNode;
  readTime: string;
  tags: string[];
}> = {
  'flood-to-drip-irrigation': {
    title: 'متى تتحول من الغمر إلى التنقيط؟',
    description: 'مقارنة شاملة بين طريقتي الري. متى يكون التحول مفيداً؟ وكيف تبدأ؟',
    readTime: '5 دقائق',
    tags: ['ري بالتنقيط', 'ري بالغمر', 'مقارنة'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          الري بالغمر هو الطريقة التقليدية المنتشرة في اليمن، لكن الري بالتنقيط يوفر المياه ويحسن الإنتاج.
          متى يكون التحول مفيداً؟ وهل يناسب كل المزارعين؟
        </p>

        <h2>مقارنة بين الطريقتين</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-4 py-2">المعيار</th>
                <th className="border border-gray-300 px-4 py-2">الري بالغمر</th>
                <th className="border border-gray-300 px-4 py-2">الري بالتنقيط</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">استهلاك المياه</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">عالي جداً</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">منخفض (توفير 50-70%)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-bold">تكلفة التركيب</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">منخفضة</td>
                <td className="border border-gray-300 px-4 py-2 text-orange-600">متوسطة-عالية</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">الصيانة</td>
                <td className="border border-gray-300 px-4 py-2">بسيطة</td>
                <td className="border border-gray-300 px-4 py-2">تحتاج متابعة</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-bold">توزيع المياه</td>
                <td className="border border-gray-300 px-4 py-2">غير متساوي</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">متساوي ودقيق</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">الأعشاب الضارة</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">كثيرة</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600">قليلة</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>متى يكون التحول مفيداً؟</h2>
        <div className="bg-green-50 border-r-4 border-green-500 p-4 my-4">
          <h3 className="font-bold text-green-800 mb-2">✅ التنقيط مناسب إذا:</h3>
          <ul className="text-green-700 space-y-2">
            <li>• المياه شحيحة أو غالية في منطقتك</li>
            <li>• تزرع أشجار مثمرة أو قات (محاصيل دائمة)</li>
            <li>• أرضك منحدرة أو غير مستوية</li>
            <li>• تريد تقليل الأعشاب الضارة</li>
            <li>• مستعد للاستثمار الأولي</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 my-4">
          <h3 className="font-bold text-blue-800 mb-2">💧 الغمر مناسب إذا:</h3>
          <ul className="text-blue-700 space-y-2">
            <li>• المياه متوفرة ورخيصة</li>
            <li>• تزرع محاصيل موسمية (خضروات)</li>
            <li>• أرضك مستوية وتربتها طينية</li>
            <li>• لا تستطيع الاستثمار في نظام جديد</li>
          </ul>
        </div>

        <h2>كيف تبدأ بالتنقيط؟</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
          <h3 className="font-bold text-amber-800 mb-2">💡 خطوات عملية</h3>
          <ol className="text-amber-700 space-y-2 list-decimal list-inside">
            <li>ابدأ بجزء صغير من الأرض للتجربة</li>
            <li>اشترِ نظام بسيط (خراطيم + نقاطات)</li>
            <li>تأكد من وجود فلتر لمنع الانسداد</li>
            <li>راقب النتائج لموسم كامل</li>
            <li>وسّع تدريجياً إذا نجحت التجربة</li>
          </ol>
        </div>
      </>
    ),
  },
  'overwatering-signs': {
    title: 'علامات الإفراط في الري',
    description: 'كيف تعرف أنك تسقي أكثر من اللازم؟ 6 علامات واضحة وكيف تعالج المشكلة.',
    readTime: '4 دقائق',
    tags: ['إفراط', 'تشخيص', 'علاج'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          كثير من المزارعين يعتقدون أن المزيد من الماء يعني محصول أفضل. الحقيقة أن الإفراط في الري
          قد يكون أخطر من قلة الري! تعرف على العلامات وكيف تتجنب هذا الخطأ.
        </p>

        <h2>العلامات الستة للإفراط في الري</h2>

        <div className="bg-yellow-50 border-r-4 border-yellow-500 p-4 my-4">
          <h3 className="font-bold text-yellow-800 mb-2">1. اصفرار الأوراق السفلية</h3>
          <p className="text-yellow-700">
            إذا اصفرت الأوراق السفلية وسقطت، بينما الأوراق العلوية خضراء، فهذا غالباً بسبب كثرة الماء.
          </p>
        </div>

        <div className="bg-orange-50 border-r-4 border-orange-500 p-4 my-4">
          <h3 className="font-bold text-orange-800 mb-2">2. الأوراق طرية ومتدلية</h3>
          <p className="text-orange-700">
            النبات العطشان أوراقه جافة ومتيبسة. النبات المُغرق أوراقه طرية ومتدلية رغم وجود الماء.
          </p>
        </div>

        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <h3 className="font-bold text-red-800 mb-2">3. رائحة عفن من التربة</h3>
          <p className="text-red-700">
            إذا شممت رائحة كريهة من التربة، فهذا يعني تعفن الجذور بسبب الماء الزائد.
          </p>
        </div>

        <div className="bg-purple-50 border-r-4 border-purple-500 p-4 my-4">
          <h3 className="font-bold text-purple-800 mb-2">4. نمو الطحالب والفطريات</h3>
          <p className="text-purple-700">
            ظهور طبقة خضراء (طحالب) أو بيضاء (فطريات) على سطح التربة علامة على الرطوبة الزائدة.
          </p>
        </div>

        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 my-4">
          <h3 className="font-bold text-blue-800 mb-2">5. الماء راكد على السطح</h3>
          <p className="text-blue-700">
            إذا بقي الماء على سطح التربة لأكثر من ساعة بعد الري، فأنت تسقي أكثر من اللازم.
          </p>
        </div>

        <div className="bg-green-50 border-r-4 border-green-500 p-4 my-4">
          <h3 className="font-bold text-green-800 mb-2">6. الجذور بنية ولينة</h3>
          <p className="text-green-700">
            الجذور الصحية بيضاء أو بيج وقوية. الجذور المتعفنة بنية ولينة وتتفتت بسهولة.
          </p>
        </div>

        <h2>كيف تعالج المشكلة؟</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
          <h3 className="font-bold text-amber-800 mb-2">💡 خطوات العلاج</h3>
          <ol className="text-amber-700 space-y-2 list-decimal list-inside">
            <li>توقف عن الري فوراً حتى تجف التربة</li>
            <li>حسّن الصرف إذا كانت التربة طينية</li>
            <li>قلل كمية الري في المرات القادمة</li>
            <li>باعد بين فترات الري</li>
            <li>استخدم حاسبة الري لمعرفة الكمية المناسبة</li>
          </ol>
        </div>
      </>
    ),
  },
  'water-saving-agriculture': {
    title: 'توفير المياه في الزراعة',
    description: '10 طرق عملية لتقليل استهلاك المياه دون التأثير على المحصول.',
    readTime: '5 دقائق',
    tags: ['توفير المياه', 'كفاءة', 'نصائح'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          المياه في اليمن ثروة ثمينة ونادرة. توفير المياه ليس فقط لتقليل التكاليف،
          بل للحفاظ على هذا المورد للأجيال القادمة. إليك 10 طرق عملية.
        </p>

        <h2>الطرق العشر لتوفير المياه</h2>

        <div className="space-y-4">
          <div className="bg-blue-50 border-r-4 border-blue-500 p-4">
            <h3 className="font-bold text-blue-800 mb-2">1. اروِ في الصباح الباكر أو المساء</h3>
            <p className="text-blue-700">
              الري في الظهيرة يُفقد 30-50% من المياه بالتبخر. الري في الصباح الباكر أو بعد الغروب يوفر هذه الكمية.
            </p>
          </div>

          <div className="bg-blue-50 border-r-4 border-blue-500 p-4">
            <h3 className="font-bold text-blue-800 mb-2">2. استخدم التغطية (المُلش)</h3>
            <p className="text-blue-700">
              غطِّ التربة حول النباتات بقش أو أوراق جافة. هذا يقلل التبخر بنسبة 25-50%.
            </p>
          </div>

          <div className="bg-blue-50 border-r-4 border-blue-500 p-4">
            <h3 className="font-bold text-blue-800 mb-2">3. أصلح التسريبات فوراً</h3>
            <p className="text-blue-700">
              تسريب صغير يُهدر آلاف اللترات شهرياً. افحص الخراطيم والصمامات بانتظام.
            </p>
          </div>

          <div className="bg-blue-50 border-r-4 border-blue-500 p-4">
            <h3 className="font-bold text-blue-800 mb-2">4. اعرف احتياج محصولك الحقيقي</h3>
            <p className="text-blue-700">
              كثير من المزارعين يسقون أكثر من اللازم. استخدم حاسبة الري لمعرفة الكمية الصحيحة.
            </p>
          </div>

          <div className="bg-blue-50 border-r-4 border-blue-500 p-4">
            <h3 className="font-bold text-blue-800 mb-2">5. حسّن بنية التربة</h3>
            <p className="text-blue-700">
              أضف مادة عضوية للتربة. التربة الغنية بالمادة العضوية تحتفظ بالماء أفضل.
            </p>
          </div>

          <div className="bg-blue-50 border-r-4 border-blue-500 p-4">
            <h3 className="font-bold text-blue-800 mb-2">6. اختر محاصيل مناسبة للمنطقة</h3>
            <p className="text-blue-700">
              المحاصيل المحلية تتحمل الجفاف أفضل من المحاصيل المستوردة.
            </p>
          </div>

          <div className="bg-blue-50 border-r-4 border-blue-500 p-4">
            <h3 className="font-bold text-blue-800 mb-2">7. فكّر في الري بالتنقيط</h3>
            <p className="text-blue-700">
              التنقيط يوفر 50-70% من المياه مقارنة بالغمر، خاصة للأشجار.
            </p>
          </div>

          <div className="bg-blue-50 border-r-4 border-blue-500 p-4">
            <h3 className="font-bold text-blue-800 mb-2">8. اجمع مياه الأمطار</h3>
            <p className="text-blue-700">
              حتى في المناطق الجافة، يمكن جمع مياه الأمطار في خزانات للاستخدام لاحقاً.
            </p>
          </div>

          <div className="bg-blue-50 border-r-4 border-blue-500 p-4">
            <h3 className="font-bold text-blue-800 mb-2">9. سوِّ أرضك</h3>
            <p className="text-blue-700">
              الأرض غير المستوية تُهدر الماء في المناطق المنخفضة وتحرم المرتفعة.
            </p>
          </div>

          <div className="bg-blue-50 border-r-4 border-blue-500 p-4">
            <h3 className="font-bold text-blue-800 mb-2">10. راقب الطقس</h3>
            <p className="text-blue-700">
              لا تسقِ إذا كان المطر متوقعاً. استخدم إنذار المزارع لمتابعة الطقس.
            </p>
          </div>
        </div>

        <h2>ملخص</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
          <h3 className="font-bold text-amber-800 mb-2">💡 القاعدة الذهبية</h3>
          <p className="text-amber-700">
            &quot;الماء الذي لا يصل للجذور ماء مُهدر&quot; - ركّز على إيصال الماء للجذور بأقل فاقد ممكن.
          </p>
        </div>
      </>
    ),
  },
  'drip-system-maintenance': {
    title: 'صيانة نظام التنقيط',
    description: 'كيف تحافظ على نظام التنقيط يعمل بكفاءة؟ جدول صيانة بسيط ومشاكل شائعة.',
    readTime: '4 دقائق',
    tags: ['صيانة', 'تنقيط', 'مشاكل'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          نظام التنقيط استثمار ممتاز، لكنه يحتاج صيانة منتظمة ليعمل بكفاءة.
          الإهمال يؤدي لانسداد النقاطات وتوزيع غير متساوي للمياه.
        </p>

        <h2>جدول الصيانة الدورية</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-4 py-2">التكرار</th>
                <th className="border border-gray-300 px-4 py-2">المهمة</th>
                <th className="border border-gray-300 px-4 py-2">الهدف</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">يومياً</td>
                <td className="border border-gray-300 px-4 py-2">تفقد الضغط والتدفق</td>
                <td className="border border-gray-300 px-4 py-2">اكتشاف المشاكل مبكراً</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-bold">أسبوعياً</td>
                <td className="border border-gray-300 px-4 py-2">تنظيف الفلتر</td>
                <td className="border border-gray-300 px-4 py-2">منع الانسداد</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">شهرياً</td>
                <td className="border border-gray-300 px-4 py-2">فحص النقاطات</td>
                <td className="border border-gray-300 px-4 py-2">التأكد من التدفق المتساوي</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-bold">موسمياً</td>
                <td className="border border-gray-300 px-4 py-2">غسل الخطوط بالكلور</td>
                <td className="border border-gray-300 px-4 py-2">إزالة الطحالب والترسبات</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>المشاكل الشائعة وحلولها</h2>

        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <h3 className="font-bold text-red-800 mb-2">❌ المشكلة: انسداد النقاطات</h3>
          <p className="text-red-700 mb-2">
            <strong>السبب:</strong> أوساخ أو طحالب أو ترسبات معدنية.
          </p>
          <p className="text-green-700">
            <strong>✅ الحل:</strong> نظّف الفلتر بانتظام. اغسل الخطوط بمحلول كلور مخفف (1 لتر كلور لكل 1000 لتر ماء).
          </p>
        </div>

        <div className="bg-orange-50 border-r-4 border-orange-500 p-4 my-4">
          <h3 className="font-bold text-orange-800 mb-2">❌ المشكلة: ضغط ضعيف</h3>
          <p className="text-orange-700 mb-2">
            <strong>السبب:</strong> تسريب في الخطوط أو فلتر مسدود أو مضخة ضعيفة.
          </p>
          <p className="text-green-700">
            <strong>✅ الحل:</strong> افحص الخطوط للتسريبات. نظّف الفلتر. تأكد من قوة المضخة.
          </p>
        </div>

        <div className="bg-yellow-50 border-r-4 border-yellow-500 p-4 my-4">
          <h3 className="font-bold text-yellow-800 mb-2">❌ المشكلة: توزيع غير متساوي</h3>
          <p className="text-yellow-700 mb-2">
            <strong>السبب:</strong> بعض النقاطات مسدودة أو الخط طويل جداً.
          </p>
          <p className="text-green-700">
            <strong>✅ الحل:</strong> نظّف النقاطات المسدودة. قسّم الخطوط الطويلة.
          </p>
        </div>

        <h2>نصائح للحفاظ على النظام</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
          <ul className="text-amber-700 space-y-2">
            <li>• <strong>استخدم فلتر جيد</strong> - هو أهم جزء في النظام</li>
            <li>• <strong>افتح نهايات الخطوط</strong> شهرياً لطرد الأوساخ</li>
            <li>• <strong>أغلق النظام</strong> عند عدم الاستخدام لمنع نمو الطحالب</li>
            <li>• <strong>احمِ الخطوط</strong> من الشمس المباشرة إن أمكن</li>
          </ul>
        </div>
      </>
    ),
  },
};

export default function IrrigationArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articlesData[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">الرئيسية</Link>
            <span>/</span>
            <Link href="/library" className="hover:text-green-600">المكتبة الزراعية</Link>
            <span>/</span>
            <Link href="/library/irrigation-management" className="hover:text-green-600">الري وإدارة المياه</Link>
            <span>/</span>
            <span className="text-blue-600 font-medium">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-8 px-4 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/20 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-blue-100 text-lg mb-4">{article.description}</p>
          <div className="flex items-center gap-4 text-blue-200">
            <span>⏱️ {article.readTime} قراءة</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
            {article.content}
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-8 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">هل تحتاج توصية ري مخصصة؟</h3>
              <p className="text-gray-600">استخدم حاسبة الري للحصول على توصية دقيقة لمحصولك.</p>
            </div>
            <Link
              href="/calculator"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              💧 حاسبة الري
            </Link>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/library/irrigation-management"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            العودة لقسم الري وإدارة المياه
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 منصة الزراعة الذكية اليمنية - جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
}
