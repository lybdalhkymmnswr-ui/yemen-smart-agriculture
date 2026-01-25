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
  'qat-yellow-leaves': {
    title: 'لماذا تصفر أوراق القات؟',
    description: '5 أسباب رئيسية لاصفرار أوراق القات وكيف تحدد السبب وتعالجه بسرعة.',
    readTime: '3 دقائق',
    tags: ['قات', 'اصفرار', 'تشخيص سريع'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          اصفرار أوراق القات من أكثر المشاكل شيوعاً. لكن الاصفرار له أسباب مختلفة،
          ومعرفة السبب الصحيح ضرورية للعلاج الفعال.
        </p>

        <h2>الأسباب الخمسة الرئيسية</h2>

        <div className="bg-yellow-50 border-r-4 border-yellow-500 p-4 my-4">
          <h3 className="font-bold text-yellow-800 mb-2">1. نقص النيتروجين</h3>
          <p className="text-yellow-700 mb-2">
            <strong>العلامة:</strong> الأوراق القديمة (السفلية) تصفر أولاً، ثم ينتشر للأعلى.
          </p>
          <p className="text-green-700">
            <strong>✅ العلاج:</strong> أضف سماد يوريا (10-15 كجم/دونم) أو رش محلول يوريا 1%.
          </p>
        </div>

        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 my-4">
          <h3 className="font-bold text-blue-800 mb-2">2. الإفراط في الري</h3>
          <p className="text-blue-700 mb-2">
            <strong>العلامة:</strong> الأوراق صفراء وطرية، والتربة رطبة دائماً.
          </p>
          <p className="text-green-700">
            <strong>✅ العلاج:</strong> قلل الري فوراً. اترك التربة تجف قبل الري التالي.
          </p>
        </div>

        <div className="bg-orange-50 border-r-4 border-orange-500 p-4 my-4">
          <h3 className="font-bold text-orange-800 mb-2">3. نقص الحديد</h3>
          <p className="text-orange-700 mb-2">
            <strong>العلامة:</strong> الأوراق الجديدة (العلوية) صفراء والعروق خضراء.
          </p>
          <p className="text-green-700">
            <strong>✅ العلاج:</strong> رش حديد مخلبي (Fe-EDDHA) على الأوراق.
          </p>
        </div>

        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <h3 className="font-bold text-red-800 mb-2">4. مشكلة في الجذور</h3>
          <p className="text-red-700 mb-2">
            <strong>العلامة:</strong> اصفرار مفاجئ وشامل، النبات يبدو ذابلاً.
          </p>
          <p className="text-green-700">
            <strong>✅ العلاج:</strong> افحص الجذور. إذا كانت بنية ومتعفنة، حسّن الصرف.
          </p>
        </div>

        <div className="bg-purple-50 border-r-4 border-purple-500 p-4 my-4">
          <h3 className="font-bold text-purple-800 mb-2">5. الإجهاد الحراري</h3>
          <p className="text-purple-700 mb-2">
            <strong>العلامة:</strong> اصفرار في الصيف الشديد، خاصة الأوراق المعرضة للشمس.
          </p>
          <p className="text-green-700">
            <strong>✅ العلاج:</strong> وفّر ظل خفيف. زد الري قليلاً في الحر الشديد.
          </p>
        </div>

        <h2>كيف تحدد السبب؟</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
          <h3 className="font-bold text-amber-800 mb-2">💡 دليل سريع</h3>
          <ul className="text-amber-700 space-y-2">
            <li>• <strong>الأوراق السفلية أولاً؟</strong> → نقص نيتروجين</li>
            <li>• <strong>الأوراق العلوية أولاً؟</strong> → نقص حديد</li>
            <li>• <strong>التربة رطبة دائماً؟</strong> → إفراط في الري</li>
            <li>• <strong>الجو حار جداً؟</strong> → إجهاد حراري</li>
          </ul>
        </div>
      </>
    ),
  },
  'tomato-root-rot': {
    title: 'علاج تعفن جذور الطماطم',
    description: 'كيف تعرف أن الطماطم مصابة بتعفن الجذور؟ خطوات العلاج والوقاية.',
    readTime: '4 دقائق',
    tags: ['طماطم', 'تعفن', 'علاج'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          تعفن الجذور من أخطر أمراض الطماطم لأنه يصيب الجذور تحت التربة قبل أن تلاحظه.
          التشخيص المبكر والعلاج السريع ضروريان لإنقاذ المحصول.
        </p>

        <h2>علامات الإصابة</h2>
        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <h3 className="font-bold text-red-800 mb-2">⚠️ علامات فوق التربة:</h3>
          <ul className="text-red-700 space-y-2">
            <li>• ذبول النبات رغم الري الكافي</li>
            <li>• اصفرار الأوراق السفلية</li>
            <li>• توقف النمو</li>
            <li>• موت النبات المفاجئ</li>
          </ul>
        </div>

        <div className="bg-orange-50 border-r-4 border-orange-500 p-4 my-4">
          <h3 className="font-bold text-orange-800 mb-2">⚠️ علامات تحت التربة:</h3>
          <ul className="text-orange-700 space-y-2">
            <li>• الجذور بنية اللون (بدلاً من بيضاء)</li>
            <li>• الجذور لينة وتتفتت بسهولة</li>
            <li>• رائحة عفن من التربة</li>
          </ul>
        </div>

        <h2>أسباب تعفن الجذور</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-red-100">
                <th className="border border-gray-300 px-4 py-2">السبب</th>
                <th className="border border-gray-300 px-4 py-2">كيف يحدث</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">الإفراط في الري</td>
                <td className="border border-gray-300 px-4 py-2">الماء الزائد يخنق الجذور ويشجع الفطريات</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-bold">سوء الصرف</td>
                <td className="border border-gray-300 px-4 py-2">التربة الطينية تحتفظ بالماء كثيراً</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">فطريات التربة</td>
                <td className="border border-gray-300 px-4 py-2">فطر Fusarium أو Pythium</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>خطوات العلاج</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
          <ol className="text-green-700 space-y-3 list-decimal list-inside">
            <li><strong>أوقف الري فوراً</strong> حتى تجف التربة</li>
            <li><strong>حسّن الصرف</strong> بإضافة رمل أو رفع الأحواض</li>
            <li><strong>أزل النباتات المصابة بشدة</strong> لمنع انتشار المرض</li>
            <li><strong>عالج التربة</strong> بمبيد فطري (مثل Ridomil)</li>
            <li><strong>قلل الري</strong> في المستقبل واروِ في الصباح فقط</li>
          </ol>
        </div>

        <h2>الوقاية</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
          <h3 className="font-bold text-amber-800 mb-2">💡 نصائح للوقاية</h3>
          <ul className="text-amber-700 space-y-2">
            <li>• لا تزرع طماطم في نفس المكان كل سنة</li>
            <li>• تأكد من جودة الصرف قبل الزراعة</li>
            <li>• استخدم شتلات سليمة من مصدر موثوق</li>
            <li>• لا تفرط في الري أبداً</li>
          </ul>
        </div>
      </>
    ),
  },
  'soil-salinity-treatment': {
    title: 'كيفية التعامل مع ملوحة التربة',
    description: 'علامات ملوحة التربة وطرق عملية لتقليل الملوحة وتحسين الإنتاج.',
    readTime: '5 دقائق',
    tags: ['ملوحة', 'تحسين التربة', 'حلول'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          ملوحة التربة مشكلة منتشرة في اليمن، خاصة في المناطق الساحلية والمناطق التي تُروى بمياه الآبار.
          الملوحة تقلل الإنتاج وقد تقتل النباتات إذا زادت.
        </p>

        <h2>علامات ملوحة التربة</h2>
        <div className="bg-orange-50 border-r-4 border-orange-500 p-4 my-4">
          <ul className="text-orange-700 space-y-2">
            <li>• <strong>قشرة بيضاء</strong> على سطح التربة</li>
            <li>• <strong>حواف الأوراق محترقة</strong> (بنية)</li>
            <li>• <strong>النباتات قزمة</strong> رغم التسميد</li>
            <li>• <strong>الإنبات ضعيف</strong> أو معدوم</li>
            <li>• <strong>ذبول النباتات</strong> رغم الري</li>
          </ul>
        </div>

        <h2>طرق تقليل الملوحة</h2>

        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 my-4">
          <h3 className="font-bold text-blue-800 mb-2">1. الغسيل بالماء</h3>
          <p className="text-blue-700">
            اروِ بكمية كبيرة من الماء (إذا كان متوفراً) لغسل الأملاح للأسفل.
            يحتاج صرف جيد لينجح.
          </p>
        </div>

        <div className="bg-green-50 border-r-4 border-green-500 p-4 my-4">
          <h3 className="font-bold text-green-800 mb-2">2. إضافة الجبس الزراعي</h3>
          <p className="text-green-700">
            الجبس يحل محل الصوديوم في التربة ويسهل غسله.
            أضف 500-1000 كجم/دونم حسب شدة الملوحة.
          </p>
        </div>

        <div className="bg-amber-50 border-r-4 border-amber-500 p-4 my-4">
          <h3 className="font-bold text-amber-800 mb-2">3. إضافة مادة عضوية</h3>
          <p className="text-amber-700">
            السماد العضوي يحسن بنية التربة ويساعد على تحمل الملوحة.
            أضف 2-3 طن/دونم من الروث المتحلل.
          </p>
        </div>

        <div className="bg-purple-50 border-r-4 border-purple-500 p-4 my-4">
          <h3 className="font-bold text-purple-800 mb-2">4. تحسين الصرف</h3>
          <p className="text-purple-700">
            بدون صرف جيد، الأملاح المغسولة ستعود للسطح.
            احفر قنوات صرف أو ارفع الأحواض.
          </p>
        </div>

        <h2>محاصيل تتحمل الملوحة</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-gray-300 px-4 py-2">درجة التحمل</th>
                <th className="border border-gray-300 px-4 py-2">المحاصيل</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold text-green-600">عالي</td>
                <td className="border border-gray-300 px-4 py-2">الشعير، البنجر، النخيل</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-bold text-yellow-600">متوسط</td>
                <td className="border border-gray-300 px-4 py-2">الطماطم، الذرة، القمح</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold text-red-600">منخفض</td>
                <td className="border border-gray-300 px-4 py-2">الفاصوليا، البصل، الجزر</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>نصيحة مهمة</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
          <h3 className="font-bold text-amber-800 mb-2">💡 الوقاية خير من العلاج</h3>
          <p className="text-amber-700">
            إذا كانت مياه الري مالحة، لا تستخدمها مباشرة. اخلطها بمياه عذبة إن أمكن،
            أو اروِ بكميات أكبر لغسل الأملاح باستمرار.
          </p>
        </div>
      </>
    ),
  },
  'organic-pest-control': {
    title: 'مكافحة الحشرات بدون كيماويات',
    description: 'طرق طبيعية وآمنة لمكافحة الآفات الشائعة. وصفات منزلية فعالة.',
    readTime: '4 دقائق',
    tags: ['مكافحة طبيعية', 'آفات', 'وصفات'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          المبيدات الكيماوية فعالة لكنها مكلفة وقد تضر بصحتك وبالبيئة.
          هناك بدائل طبيعية يمكنك تحضيرها في المنزل بتكلفة بسيطة.
        </p>

        <h2>وصفات طبيعية فعالة</h2>

        <div className="bg-green-50 border-r-4 border-green-500 p-4 my-4">
          <h3 className="font-bold text-green-800 mb-2">🧄 محلول الثوم والفلفل</h3>
          <p className="text-green-700 mb-2"><strong>يكافح:</strong> المن، الذبابة البيضاء، العناكب</p>
          <p className="text-green-700 mb-2"><strong>التحضير:</strong></p>
          <ul className="text-green-700 space-y-1 mr-4">
            <li>• اهرس 5 فصوص ثوم + 2 فلفل حار</li>
            <li>• انقعها في لتر ماء لمدة 24 ساعة</li>
            <li>• صفّي المحلول وأضف ملعقة صابون سائل</li>
            <li>• رش على النباتات المصابة</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-r-4 border-yellow-500 p-4 my-4">
          <h3 className="font-bold text-yellow-800 mb-2">🍋 محلول الصابون</h3>
          <p className="text-yellow-700 mb-2"><strong>يكافح:</strong> المن، الحشرات القشرية، البق الدقيقي</p>
          <p className="text-yellow-700 mb-2"><strong>التحضير:</strong></p>
          <ul className="text-yellow-700 space-y-1 mr-4">
            <li>• أذب 2 ملعقة صابون سائل (بدون عطر) في لتر ماء</li>
            <li>• رش مباشرة على الحشرات</li>
            <li>• كرر كل 3-4 أيام</li>
          </ul>
        </div>

        <div className="bg-orange-50 border-r-4 border-orange-500 p-4 my-4">
          <h3 className="font-bold text-orange-800 mb-2">🌿 زيت النيم</h3>
          <p className="text-orange-700 mb-2"><strong>يكافح:</strong> معظم الحشرات + فطريات</p>
          <p className="text-orange-700 mb-2"><strong>التحضير:</strong></p>
          <ul className="text-orange-700 space-y-1 mr-4">
            <li>• أضف 5 مل زيت نيم + 2 مل صابون سائل إلى لتر ماء</li>
            <li>• رج جيداً قبل الاستخدام</li>
            <li>• رش في المساء (الشمس تُفسده)</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 my-4">
          <h3 className="font-bold text-blue-800 mb-2">🥛 محلول الحليب</h3>
          <p className="text-blue-700 mb-2"><strong>يكافح:</strong> البياض الدقيقي (الفطر الأبيض)</p>
          <p className="text-blue-700 mb-2"><strong>التحضير:</strong></p>
          <ul className="text-blue-700 space-y-1 mr-4">
            <li>• اخلط 1 جزء حليب مع 9 أجزاء ماء</li>
            <li>• رش على الأوراق المصابة</li>
            <li>• كرر أسبوعياً</li>
          </ul>
        </div>

        <h2>نصائح مهمة</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
          <ul className="text-amber-700 space-y-2">
            <li>• <strong>جرّب على ورقة واحدة أولاً</strong> قبل رش النبات كله</li>
            <li>• <strong>رش في الصباح الباكر أو المساء</strong> لتجنب حرق الأوراق</li>
            <li>• <strong>كرر الرش</strong> كل 3-7 أيام حتى تختفي الآفة</li>
            <li>• <strong>الوقاية أفضل</strong> - رش وقائياً قبل ظهور المشكلة</li>
          </ul>
        </div>

        <h2>متى تستخدم المبيدات الكيماوية؟</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
          <p className="text-red-700">
            إذا فشلت الطرق الطبيعية والإصابة شديدة، قد تحتاج مبيد كيماوي.
            استشر خبيراً أو استخدم صفحة &quot;مبيد اليوم&quot; لمعرفة المبيد المناسب.
          </p>
        </div>
      </>
    ),
  },
};

export default function ProblemsSolutionsArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articlesData[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white" dir="rtl">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">الرئيسية</Link>
            <span>/</span>
            <Link href="/library" className="hover:text-green-600">المكتبة الزراعية</Link>
            <span>/</span>
            <Link href="/library/problems-solutions" className="hover:text-green-600">مشاكل وحلول سريعة</Link>
            <span>/</span>
            <span className="text-red-600 font-medium">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-8 px-4 bg-gradient-to-b from-red-600 to-red-700 text-white">
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
          <p className="text-red-100 text-lg mb-4">{article.description}</p>
          <div className="flex items-center gap-4 text-red-200">
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
      <section className="py-8 px-4 bg-red-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">هل تحتاج مساعدة متخصصة؟</h3>
              <p className="text-gray-600">استشر خبيراً زراعياً للحصول على تشخيص دقيق.</p>
            </div>
            <Link
              href="/ask-murad"
              className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              👨‍🌾 اسأل مراد
            </Link>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/library/problems-solutions"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            العودة لقسم مشاكل وحلول سريعة
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
