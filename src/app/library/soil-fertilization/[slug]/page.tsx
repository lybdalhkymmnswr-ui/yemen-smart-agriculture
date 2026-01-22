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
  'poor-soil-signs': {
    title: 'كيف تعرف أن تربتك فقيرة؟',
    description: '7 علامات واضحة تدل على أن تربتك تحتاج تحسين. تعلم كيف تشخص المشكلة وتعالجها.',
    readTime: '4 دقائق',
    tags: ['تشخيص التربة', 'علامات', 'تحسين'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          التربة الفقيرة هي السبب الرئيسي لضعف المحاصيل. لكن كيف تعرف أن تربتك تحتاج تحسين؟
          في هذا الدليل نقدم لك 7 علامات واضحة يمكنك ملاحظتها بسهولة.
        </p>

        <h2>العلامات السبع للتربة الفقيرة</h2>
        
        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <h3 className="font-bold text-red-800 mb-2">1. لون التربة فاتح جداً</h3>
          <p className="text-red-700">
            التربة الصحية لونها بني غامق أو أسود. إذا كانت تربتك فاتحة اللون (رمادية أو صفراء)، فهذا يعني نقص المادة العضوية.
          </p>
        </div>

        <div className="bg-orange-50 border-r-4 border-orange-500 p-4 my-4">
          <h3 className="font-bold text-orange-800 mb-2">2. النباتات صفراء وضعيفة</h3>
          <p className="text-orange-700">
            إذا كانت نباتاتك صفراء رغم الري والتسميد، فالمشكلة غالباً في التربة نفسها وليس في الرعاية.
          </p>
        </div>

        <div className="bg-yellow-50 border-r-4 border-yellow-500 p-4 my-4">
          <h3 className="font-bold text-yellow-800 mb-2">3. الماء لا يتسرب أو يتسرب بسرعة</h3>
          <p className="text-yellow-700">
            التربة الطينية الثقيلة تحتفظ بالماء كثيراً (تغرق). التربة الرملية تسرب الماء بسرعة. كلاهما يحتاج تحسين.
          </p>
        </div>

        <div className="bg-green-50 border-r-4 border-green-500 p-4 my-4">
          <h3 className="font-bold text-green-800 mb-2">4. لا توجد ديدان أرض</h3>
          <p className="text-green-700">
            ديدان الأرض علامة على تربة صحية. إذا حفرت ولم تجد ديدان، فالتربة تحتاج مادة عضوية.
          </p>
        </div>

        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 my-4">
          <h3 className="font-bold text-blue-800 mb-2">5. قشرة صلبة على السطح</h3>
          <p className="text-blue-700">
            إذا تكونت قشرة صلبة على سطح التربة بعد الري، فهذا يعني أن التربة مضغوطة وتحتاج تهوية.
          </p>
        </div>

        <div className="bg-purple-50 border-r-4 border-purple-500 p-4 my-4">
          <h3 className="font-bold text-purple-800 mb-2">6. الجذور سطحية وضعيفة</h3>
          <p className="text-purple-700">
            إذا كانت جذور نباتاتك قصيرة ولا تتعمق، فالتربة إما مضغوطة أو فقيرة بالعناصر.
          </p>
        </div>

        <div className="bg-pink-50 border-r-4 border-pink-500 p-4 my-4">
          <h3 className="font-bold text-pink-800 mb-2">7. رائحة كريهة من التربة</h3>
          <p className="text-pink-700">
            التربة الصحية رائحتها ترابية منعشة. الرائحة الكريهة تعني تعفن بسبب سوء الصرف.
          </p>
        </div>

        <h2>ماذا تفعل؟</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
          <h3 className="font-bold text-amber-800 mb-2">💡 الحل العام</h3>
          <ul className="text-amber-700 space-y-2">
            <li>• أضف سماد عضوي (روث حيواني متحلل) بمعدل 2-3 طن/دونم</li>
            <li>• اخلط التربة جيداً لتحسين التهوية</li>
            <li>• استخدم حاسبة التسميد لمعرفة احتياجاتك الدقيقة</li>
          </ul>
        </div>
      </>
    ),
  },
  'organic-vs-chemical-fertilizer': {
    title: 'الفرق بين السماد العضوي والكيماوي',
    description: 'متى تستخدم كل نوع؟ مميزات وعيوب كل منهما. دليل عملي للاختيار الصحيح.',
    readTime: '5 دقائق',
    tags: ['سماد عضوي', 'سماد كيماوي', 'مقارنة'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          كثير من المزارعين يحتارون بين السماد العضوي والكيماوي. الحقيقة أن كلاهما له مكانه،
          والاختيار الصحيح يعتمد على حالتك واحتياجاتك.
        </p>

        <h2>مقارنة سريعة</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-gray-300 px-4 py-2">المعيار</th>
                <th className="border border-gray-300 px-4 py-2">السماد العضوي</th>
                <th className="border border-gray-300 px-4 py-2">السماد الكيماوي</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">سرعة المفعول</td>
                <td className="border border-gray-300 px-4 py-2">بطيء (أسابيع)</td>
                <td className="border border-gray-300 px-4 py-2">سريع (أيام)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-bold">مدة التأثير</td>
                <td className="border border-gray-300 px-4 py-2">طويلة (شهور)</td>
                <td className="border border-gray-300 px-4 py-2">قصيرة (أسابيع)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">تحسين التربة</td>
                <td className="border border-gray-300 px-4 py-2">✅ نعم</td>
                <td className="border border-gray-300 px-4 py-2">❌ لا</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-bold">التكلفة</td>
                <td className="border border-gray-300 px-4 py-2">أقل (إذا متوفر محلياً)</td>
                <td className="border border-gray-300 px-4 py-2">أعلى</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">خطر الحرق</td>
                <td className="border border-gray-300 px-4 py-2">منخفض</td>
                <td className="border border-gray-300 px-4 py-2">عالي</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>متى تستخدم السماد العضوي؟</h2>
        <div className="bg-green-50 border-r-4 border-green-500 p-4 my-4">
          <ul className="text-green-700 space-y-2">
            <li>• عند تجهيز الأرض قبل الزراعة</li>
            <li>• لتحسين بنية التربة الرملية أو الطينية</li>
            <li>• للأشجار المثمرة (مرة في السنة)</li>
            <li>• عندما تريد تقليل التكاليف على المدى الطويل</li>
          </ul>
        </div>

        <h2>متى تستخدم السماد الكيماوي؟</h2>
        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 my-4">
          <ul className="text-blue-700 space-y-2">
            <li>• عند ظهور علامات نقص واضحة (اصفرار، ضعف)</li>
            <li>• للمحاصيل السريعة (خضروات)</li>
            <li>• كدفعة تنشيطية في مراحل النمو الحرجة</li>
            <li>• عندما تحتاج نتيجة سريعة</li>
          </ul>
        </div>

        <h2>النصيحة الذهبية</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
          <h3 className="font-bold text-amber-800 mb-2">💡 الجمع بين النوعين</h3>
          <p className="text-amber-700">
            أفضل نتيجة تحصل عليها بالجمع: استخدم السماد العضوي كأساس لتحسين التربة،
            ثم أضف السماد الكيماوي بكميات صغيرة حسب الحاجة.
          </p>
        </div>
      </>
    ),
  },
  'sandy-soil-fertilization-mistakes': {
    title: '5 أخطاء شائعة في تسميد التربة الرملية',
    description: 'التربة الرملية لها طبيعة خاصة. تعرف على الأخطاء التي يقع فيها المزارعون وكيف تتجنبها.',
    readTime: '4 دقائق',
    tags: ['تربة رملية', 'أخطاء', 'نصائح'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          التربة الرملية منتشرة في كثير من مناطق اليمن. لها مميزات (تصريف جيد، سهلة الحرث)
          لكنها تحتاج معاملة خاصة في التسميد.
        </p>

        <h2>الأخطاء الخمسة الشائعة</h2>

        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <h3 className="font-bold text-red-800 mb-2">❌ الخطأ 1: إضافة كمية كبيرة دفعة واحدة</h3>
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> التربة الرملية لا تحتفظ بالعناصر. الكمية الكبيرة تُغسل مع الري.
          </p>
          <p className="text-green-700">
            <strong>✅ الحل:</strong> قسّم الكمية على دفعات صغيرة كل أسبوع أو أسبوعين.
          </p>
        </div>

        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <h3 className="font-bold text-red-800 mb-2">❌ الخطأ 2: استخدام اليوريا فقط</h3>
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> اليوريا سريعة الذوبان وتُفقد بسرعة في التربة الرملية.
          </p>
          <p className="text-green-700">
            <strong>✅ الحل:</strong> استخدم سماد بطيء الذوبان أو أضف مادة عضوية أولاً.
          </p>
        </div>

        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <h3 className="font-bold text-red-800 mb-2">❌ الخطأ 3: إهمال السماد العضوي</h3>
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> بدون مادة عضوية، التربة الرملية لا تحتفظ بالماء ولا بالعناصر.
          </p>
          <p className="text-green-700">
            <strong>✅ الحل:</strong> أضف سماد عضوي (روث أو كمبوست) قبل الزراعة.
          </p>
        </div>

        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <h3 className="font-bold text-red-800 mb-2">❌ الخطأ 4: التسميد في وقت الحر الشديد</h3>
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> الحرارة العالية تُبخر النيتروجين قبل أن يصل للجذور.
          </p>
          <p className="text-green-700">
            <strong>✅ الحل:</strong> سمّد في الصباح الباكر أو المساء، ثم اروِ مباشرة.
          </p>
        </div>

        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <h3 className="font-bold text-red-800 mb-2">❌ الخطأ 5: عدم اختبار التربة</h3>
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> التسميد العشوائي قد يسبب خلل في توازن العناصر.
          </p>
          <p className="text-green-700">
            <strong>✅ الحل:</strong> استخدم دليل التربة لفهم احتياجات أرضك.
          </p>
        </div>

        <h2>ملخص سريع</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
          <h3 className="font-bold text-amber-800 mb-2">💡 قاعدة ذهبية للتربة الرملية</h3>
          <p className="text-amber-700">
            &quot;كميات صغيرة، مرات كثيرة&quot; - هذه القاعدة تضمن استفادة النبات من السماد قبل أن يُغسل.
          </p>
        </div>
      </>
    ),
  },
  'when-how-to-fertilize': {
    title: 'متى وكيف تضيف السماد؟',
    description: 'التوقيت الصحيح والطريقة المثلى لإضافة السماد. نصائح عملية لأفضل النتائج.',
    readTime: '4 دقائق',
    tags: ['توقيت', 'طريقة', 'تطبيق عملي'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          التسميد في الوقت الخطأ أو بالطريقة الخطأ يُهدر المال ويضر النبات.
          في هذا الدليل نشرح لك التوقيت والطريقة الصحيحة.
        </p>

        <h2>أفضل أوقات التسميد</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-gray-300 px-4 py-2">الوقت</th>
                <th className="border border-gray-300 px-4 py-2">مناسب لـ</th>
                <th className="border border-gray-300 px-4 py-2">ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold">الصباح الباكر</td>
                <td className="border border-gray-300 px-4 py-2">جميع الأسمدة</td>
                <td className="border border-gray-300 px-4 py-2">أفضل وقت - الجو بارد</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-bold">المساء</td>
                <td className="border border-gray-300 px-4 py-2">الأسمدة الورقية</td>
                <td className="border border-gray-300 px-4 py-2">جيد في الصيف</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold text-red-600">الظهيرة</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">❌ تجنب</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600">الحرارة تُفقد النيتروجين</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>طرق إضافة السماد</h2>

        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 my-4">
          <h3 className="font-bold text-blue-800 mb-2">1. النثر حول النبات</h3>
          <p className="text-blue-700 mb-2">
            <strong>الطريقة:</strong> وزّع السماد في دائرة حول النبات على بعد 20-30 سم من الجذع.
          </p>
          <p className="text-blue-700">
            <strong>مناسب لـ:</strong> الأشجار والشجيرات (مثل القات).
          </p>
        </div>

        <div className="bg-green-50 border-r-4 border-green-500 p-4 my-4">
          <h3 className="font-bold text-green-800 mb-2">2. في خطوط بجانب النباتات</h3>
          <p className="text-green-700 mb-2">
            <strong>الطريقة:</strong> ضع السماد في خط على بعد 10-15 سم من صف النباتات.
          </p>
          <p className="text-green-700">
            <strong>مناسب لـ:</strong> الخضروات والمحاصيل الصفية.
          </p>
        </div>

        <div className="bg-purple-50 border-r-4 border-purple-500 p-4 my-4">
          <h3 className="font-bold text-purple-800 mb-2">3. الرش على الأوراق</h3>
          <p className="text-purple-700 mb-2">
            <strong>الطريقة:</strong> ذوّب السماد في الماء ورشه على الأوراق.
          </p>
          <p className="text-purple-700">
            <strong>مناسب لـ:</strong> علاج نقص العناصر السريع.
          </p>
        </div>

        <h2>نصائح مهمة</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
          <ul className="text-amber-700 space-y-2">
            <li>• <strong>اروِ بعد التسميد مباشرة</strong> لإذابة السماد وإيصاله للجذور</li>
            <li>• <strong>لا تضع السماد على الجذع</strong> مباشرة لتجنب الحرق</li>
            <li>• <strong>لا تسمّد النبات العطشان</strong> - اروِ أولاً ثم سمّد</li>
            <li>• <strong>استخدم حاسبة التسميد</strong> لمعرفة الكمية المناسبة</li>
          </ul>
        </div>
      </>
    ),
  },
};

export default function SoilFertilizationArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articlesData[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white" dir="rtl">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">الرئيسية</Link>
            <span>/</span>
            <Link href="/library" className="hover:text-green-600">المكتبة الزراعية</Link>
            <span>/</span>
            <Link href="/library/soil-fertilization" className="hover:text-green-600">صحة التربة والتسميد</Link>
            <span>/</span>
            <span className="text-amber-600 font-medium">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-8 px-4 bg-gradient-to-b from-amber-600 to-amber-700 text-white">
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
          <p className="text-amber-100 text-lg mb-4">{article.description}</p>
          <div className="flex items-center gap-4 text-amber-200">
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
      <section className="py-8 px-4 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">هل تحتاج توصية تسميد مخصصة؟</h3>
              <p className="text-gray-600">استخدم حاسبة التسميد للحصول على توصية دقيقة لمحصولك.</p>
            </div>
            <Link
              href="/fertilizer-calculator"
              className="px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-colors whitespace-nowrap"
            >
              🌿 حاسبة التسميد
            </Link>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/library/soil-fertilization"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            العودة لقسم صحة التربة والتسميد
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
