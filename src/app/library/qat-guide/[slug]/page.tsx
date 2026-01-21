'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';

// بيانات المقالات
const articlesData: Record<string, {
  title: string;
  description: string;
  content: React.ReactNode;
  readTime: string;
  tags: string[];
}> = {
  'qat-fertilization-program': {
    title: 'برنامج تسميد القات الشهري',
    description: 'جدول تسميد شامل للقات على مدار السنة مع توصيات محددة لكل مرحلة نمو.',
    readTime: '5 دقائق',
    tags: ['تسميد', 'برنامج شهري', 'NPK'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          يحتاج القات إلى تغذية متوازنة على مدار السنة للحصول على أوراق خضراء قوية وإنتاج وفير.
          في هذا الدليل، نقدم لك برنامج تسميد مبسط يمكنك تطبيقه بسهولة.
        </p>

        <h2>العناصر الأساسية التي يحتاجها القات</h2>
        <ul>
          <li><strong>النيتروجين (N):</strong> للنمو الخضري وخضرة الأوراق</li>
          <li><strong>الفوسفور (P):</strong> لتقوية الجذور</li>
          <li><strong>البوتاسيوم (K):</strong> لمقاومة الأمراض وجودة الأوراق</li>
        </ul>

        <h2>جدول التسميد الشهري</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-gray-300 px-4 py-2">الشهر</th>
                <th className="border border-gray-300 px-4 py-2">نوع السماد</th>
                <th className="border border-gray-300 px-4 py-2">الكمية (كجم/دونم)</th>
                <th className="border border-gray-300 px-4 py-2">ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">يناير - فبراير</td>
                <td className="border border-gray-300 px-4 py-2">يوريا (46-0-0)</td>
                <td className="border border-gray-300 px-4 py-2">15-20</td>
                <td className="border border-gray-300 px-4 py-2">بداية موسم النمو</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">مارس - أبريل</td>
                <td className="border border-gray-300 px-4 py-2">NPK (20-20-20)</td>
                <td className="border border-gray-300 px-4 py-2">20-25</td>
                <td className="border border-gray-300 px-4 py-2">تغذية متوازنة</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">مايو - يونيو</td>
                <td className="border border-gray-300 px-4 py-2">يوريا + بوتاسيوم</td>
                <td className="border border-gray-300 px-4 py-2">15 + 10</td>
                <td className="border border-gray-300 px-4 py-2">قبل الحصاد</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">يوليو - أغسطس</td>
                <td className="border border-gray-300 px-4 py-2">NPK (20-20-20)</td>
                <td className="border border-gray-300 px-4 py-2">20</td>
                <td className="border border-gray-300 px-4 py-2">تجديد النمو</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">سبتمبر - أكتوبر</td>
                <td className="border border-gray-300 px-4 py-2">يوريا</td>
                <td className="border border-gray-300 px-4 py-2">15</td>
                <td className="border border-gray-300 px-4 py-2">دفعة خريفية</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">نوفمبر - ديسمبر</td>
                <td className="border border-gray-300 px-4 py-2">سماد عضوي</td>
                <td className="border border-gray-300 px-4 py-2">500-1000</td>
                <td className="border border-gray-300 px-4 py-2">تحسين التربة</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>نصائح مهمة</h2>
        <div className="bg-amber-50 border-r-4 border-amber-500 p-4 my-4">
          <h3 className="font-bold text-amber-800 mb-2">⚠️ تحذير</h3>
          <p className="text-amber-700">
            لا تضع السماد الكيماوي مباشرة على الجذع أو الأوراق. وزّعه حول الشجرة على بعد 30-50 سم من الجذع.
          </p>
        </div>

        <ul>
          <li>أضف السماد بعد الري مباشرة أو قبل المطر</li>
          <li>قسّم الكمية الشهرية على دفعتين (كل أسبوعين)</li>
          <li>راقب لون الأوراق: الاصفرار يعني نقص النيتروجين</li>
        </ul>

        <h2>خطأ شائع تجنّبه</h2>
        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <p className="text-red-700">
            <strong>الخطأ:</strong> إضافة كمية كبيرة من اليوريا دفعة واحدة.
            <br />
            <strong>النتيجة:</strong> حرق الجذور واصفرار الأوراق.
            <br />
            <strong>الحل:</strong> قسّم الكمية على دفعات صغيرة كل أسبوعين.
          </p>
        </div>
      </>
    ),
  },
  'qat-nutrient-deficiency': {
    title: 'علامات نقص العناصر في القات',
    description: 'كيف تعرف أن القات يعاني من نقص العناصر الغذائية؟ دليل مصور للتشخيص والعلاج.',
    readTime: '4 دقائق',
    tags: ['نقص العناصر', 'تشخيص', 'علاج'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          عندما يعاني القات من نقص في العناصر الغذائية، تظهر عليه علامات واضحة يمكنك ملاحظتها.
          التشخيص المبكر يساعدك على علاج المشكلة قبل أن تؤثر على المحصول.
        </p>

        <h2>علامات نقص النيتروجين (N)</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
          <h3 className="font-bold text-yellow-800 mb-2">🟡 الأعراض:</h3>
          <ul className="text-yellow-700">
            <li>اصفرار الأوراق القديمة (السفلية) أولاً</li>
            <li>ضعف النمو وصغر حجم الأوراق</li>
            <li>الأوراق الجديدة فاتحة اللون</li>
          </ul>
          <h3 className="font-bold text-yellow-800 mt-4 mb-2">💊 العلاج:</h3>
          <p className="text-yellow-700">
            أضف سماد يوريا (46-0-0) بمعدل 10-15 كجم/دونم، أو رش محلول يوريا 1% على الأوراق.
          </p>
        </div>

        <h2>علامات نقص الفوسفور (P)</h2>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 my-4">
          <h3 className="font-bold text-purple-800 mb-2">🟣 الأعراض:</h3>
          <ul className="text-purple-700">
            <li>تحول الأوراق للون البنفسجي أو الأرجواني</li>
            <li>ضعف نمو الجذور</li>
            <li>تأخر النضج</li>
          </ul>
          <h3 className="font-bold text-purple-800 mt-4 mb-2">💊 العلاج:</h3>
          <p className="text-purple-700">
            أضف سماد سوبر فوسفات (0-46-0) بمعدل 15-20 كجم/دونم حول الجذور.
          </p>
        </div>

        <h2>علامات نقص البوتاسيوم (K)</h2>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 my-4">
          <h3 className="font-bold text-orange-800 mb-2">🟠 الأعراض:</h3>
          <ul className="text-orange-700">
            <li>احتراق حواف الأوراق (تصبح بنية)</li>
            <li>ضعف مقاومة النبات للأمراض</li>
            <li>الأوراق تبدو ذابلة رغم الري</li>
          </ul>
          <h3 className="font-bold text-orange-800 mt-4 mb-2">💊 العلاج:</h3>
          <p className="text-orange-700">
            أضف سماد سلفات البوتاسيوم (0-0-50) بمعدل 10-15 كجم/دونم.
          </p>
        </div>

        <h2>جدول ملخص</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-gray-300 px-4 py-2">العنصر</th>
                <th className="border border-gray-300 px-4 py-2">العلامة الرئيسية</th>
                <th className="border border-gray-300 px-4 py-2">مكان الظهور</th>
                <th className="border border-gray-300 px-4 py-2">العلاج السريع</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">النيتروجين</td>
                <td className="border border-gray-300 px-4 py-2">اصفرار</td>
                <td className="border border-gray-300 px-4 py-2">الأوراق القديمة</td>
                <td className="border border-gray-300 px-4 py-2">يوريا</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">الفوسفور</td>
                <td className="border border-gray-300 px-4 py-2">لون بنفسجي</td>
                <td className="border border-gray-300 px-4 py-2">كل النبات</td>
                <td className="border border-gray-300 px-4 py-2">سوبر فوسفات</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">البوتاسيوم</td>
                <td className="border border-gray-300 px-4 py-2">احتراق الحواف</td>
                <td className="border border-gray-300 px-4 py-2">الأوراق القديمة</td>
                <td className="border border-gray-300 px-4 py-2">سلفات البوتاسيوم</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-green-50 border-r-4 border-green-500 p-4 my-4">
          <h3 className="font-bold text-green-800 mb-2">💡 نصيحة</h3>
          <p className="text-green-700">
            إذا لم تكن متأكداً من نوع النقص، استخدم سماد NPK متوازن (20-20-20) كحل وسط آمن.
          </p>
        </div>
      </>
    ),
  },
  'qat-irrigation-schedule': {
    title: 'جدول ري القات صيفاً وشتاءً',
    description: 'متى تسقي القات؟ كم مرة في الأسبوع؟ دليل شامل للري حسب الموسم ونوع التربة.',
    readTime: '4 دقائق',
    tags: ['ري', 'جدول موسمي', 'توفير المياه'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          الري الصحيح هو أحد أهم عوامل نجاح زراعة القات. الإفراط في الري يسبب تعفن الجذور،
          والتقصير يسبب ذبول الأوراق. في هذا الدليل نقدم لك جدول ري مبسط.
        </p>

        <h2>جدول الري حسب الموسم</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-4 py-2">الموسم</th>
                <th className="border border-gray-300 px-4 py-2">عدد مرات الري</th>
                <th className="border border-gray-300 px-4 py-2">كمية المياه</th>
                <th className="border border-gray-300 px-4 py-2">أفضل وقت</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">الصيف (يونيو - أغسطس)</td>
                <td className="border border-gray-300 px-4 py-2">3-4 مرات/أسبوع</td>
                <td className="border border-gray-300 px-4 py-2">30-40 لتر/شجرة</td>
                <td className="border border-gray-300 px-4 py-2">الصباح الباكر أو المساء</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">الربيع/الخريف</td>
                <td className="border border-gray-300 px-4 py-2">2-3 مرات/أسبوع</td>
                <td className="border border-gray-300 px-4 py-2">25-30 لتر/شجرة</td>
                <td className="border border-gray-300 px-4 py-2">الصباح</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">الشتاء (ديسمبر - فبراير)</td>
                <td className="border border-gray-300 px-4 py-2">1-2 مرة/أسبوع</td>
                <td className="border border-gray-300 px-4 py-2">20-25 لتر/شجرة</td>
                <td className="border border-gray-300 px-4 py-2">منتصف النهار</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>الري حسب نوع التربة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-bold text-amber-800 mb-2">🏜️ التربة الرملية</h3>
            <ul className="text-amber-700 text-sm">
              <li>تحتاج ري أكثر تكراراً</li>
              <li>كميات أقل في كل مرة</li>
              <li>الري كل يوم أو يومين في الصيف</li>
            </ul>
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
            <h3 className="font-bold text-stone-800 mb-2">🌍 التربة الطينية</h3>
            <ul className="text-stone-700 text-sm">
              <li>تحتفظ بالماء أطول</li>
              <li>ري أقل تكراراً</li>
              <li>احذر من الإفراط (تعفن الجذور)</li>
            </ul>
          </div>
        </div>

        <h2>علامات تحتاج الري</h2>
        <ul>
          <li>ذبول الأوراق في الصباح (ليس فقط وقت الحر)</li>
          <li>جفاف التربة على عمق 5 سم</li>
          <li>تغير لون الأوراق للأخضر الباهت</li>
        </ul>

        <h2>علامات الإفراط في الري</h2>
        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <ul className="text-red-700">
            <li>اصفرار الأوراق الجديدة (ليس القديمة)</li>
            <li>رائحة كريهة من التربة</li>
            <li>ظهور فطريات أو عفن على الجذع</li>
            <li>سقوط الأوراق رغم أنها خضراء</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 my-4">
          <h3 className="font-bold text-blue-800 mb-2">💡 نصيحة ذهبية</h3>
          <p className="text-blue-700">
            استخدم نظام التنقيط بدلاً من الغمر. يوفر 40-60% من المياه ويعطي نتائج أفضل.
          </p>
        </div>
      </>
    ),
  },
  'qat-common-mistakes': {
    title: 'أخطاء شائعة في زراعة القات',
    description: '10 أخطاء يقع فيها معظم المزارعين وكيف تتجنبها. نصائح من خبرة الميدان.',
    readTime: '6 دقائق',
    tags: ['أخطاء شائعة', 'نصائح', 'تحسين الإنتاج'],
    content: (
      <>
        <h2>مقدمة</h2>
        <p>
          حتى المزارعين ذوي الخبرة يقعون في بعض الأخطاء. جمعنا لك أكثر 10 أخطاء شيوعاً
          في زراعة القات مع الحلول العملية لتجنبها.
        </p>

        <h2>الخطأ #1: الإفراط في التسميد</h2>
        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> إضافة كميات كبيرة من السماد دفعة واحدة ظناً أنه سيسرّع النمو.
          </p>
          <p className="text-green-700">
            <strong>الحل:</strong> قسّم الكمية الشهرية على 2-3 دفعات. الزيادة تحرق الجذور.
          </p>
        </div>

        <h2>الخطأ #2: الري وقت الظهيرة في الصيف</h2>
        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> الري عندما تكون الشمس حارقة يسبب صدمة حرارية للجذور.
          </p>
          <p className="text-green-700">
            <strong>الحل:</strong> اسقِ في الصباح الباكر (قبل 8 صباحاً) أو المساء (بعد 5 مساءً).
          </p>
        </div>

        <h2>الخطأ #3: إهمال التقليم</h2>
        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> ترك الشجرة تنمو بشكل عشوائي يقلل الإنتاج ويصعّب الحصاد.
          </p>
          <p className="text-green-700">
            <strong>الحل:</strong> قلّم الأفرع الميتة والمتشابكة بانتظام. حافظ على شكل الشجرة.
          </p>
        </div>

        <h2>الخطأ #4: زراعة القات في تربة سيئة الصرف</h2>
        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> التربة التي تحتفظ بالماء طويلاً تسبب تعفن الجذور.
          </p>
          <p className="text-green-700">
            <strong>الحل:</strong> حسّن الصرف بإضافة رمل، أو ازرع على مصاطب مرتفعة.
          </p>
        </div>

        <h2>الخطأ #5: استخدام مياه مالحة</h2>
        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> المياه عالية الملوحة تتراكم في التربة وتضر بالجذور.
          </p>
          <p className="text-green-700">
            <strong>الحل:</strong> افحص ملوحة المياه. إذا كانت عالية، اخلطها بمياه عذبة أو استخدم مصدراً آخر.
          </p>
        </div>

        <h2>الخطأ #6: الحصاد الجائر</h2>
        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> قطع كل الأوراق يضعف الشجرة ويقلل الإنتاج المستقبلي.
          </p>
          <p className="text-green-700">
            <strong>الحل:</strong> اترك 30-40% من الأوراق على الشجرة دائماً.
          </p>
        </div>

        <h2>الخطأ #7: تجاهل الآفات حتى تنتشر</h2>
        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> الانتظار حتى تنتشر الآفة يجعل المكافحة صعبة ومكلفة.
          </p>
          <p className="text-green-700">
            <strong>الحل:</strong> افحص الأشجار أسبوعياً. عالج فور ظهور أي علامة.
          </p>
        </div>

        <h2>الخطأ #8: عدم تدوير الأسمدة</h2>
        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> استخدام نفس السماد دائماً يسبب نقص بعض العناصر.
          </p>
          <p className="text-green-700">
            <strong>الحل:</strong> نوّع بين الأسمدة (يوريا، NPK، عضوي) حسب الموسم.
          </p>
        </div>

        <h2>الخطأ #9: الزراعة الكثيفة جداً</h2>
        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> المسافات الضيقة بين الأشجار تقلل التهوية وتنشر الأمراض.
          </p>
          <p className="text-green-700">
            <strong>الحل:</strong> اترك مسافة 2-3 متر بين الأشجار على الأقل.
          </p>
        </div>

        <h2>الخطأ #10: إهمال صحة التربة</h2>
        <div className="bg-red-50 border-r-4 border-red-500 p-4 my-4">
          <p className="text-red-700 mb-2">
            <strong>المشكلة:</strong> التركيز على السماد الكيماوي فقط وإهمال المادة العضوية.
          </p>
          <p className="text-green-700">
            <strong>الحل:</strong> أضف سماد عضوي (روث) مرة واحدة سنوياً على الأقل لتحسين بنية التربة.
          </p>
        </div>

        <div className="bg-green-50 border-r-4 border-green-500 p-4 my-4">
          <h3 className="font-bold text-green-800 mb-2">💡 الخلاصة</h3>
          <p className="text-green-700">
            معظم هذه الأخطاء يمكن تجنبها بالمراقبة المنتظمة والتعلم المستمر.
            استخدم أدواتنا المجانية للحصول على توصيات دقيقة لأرضك.
          </p>
        </div>
      </>
    ),
  },
};

export default function QatArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articlesData[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">المقال غير موجود</h1>
          <Link href="/library/qat-guide" className="text-green-600 hover:underline">
            العودة لدليل زراعة القات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white" dir="rtl">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">الرئيسية</Link>
            <span>/</span>
            <Link href="/library" className="hover:text-green-600">المكتبة الزراعية</Link>
            <span>/</span>
            <Link href="/library/qat-guide" className="hover:text-green-600">دليل زراعة القات</Link>
            <span>/</span>
            <span className="text-green-600 font-medium">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{article.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>⏱️ وقت القراءة: {article.readTime}</span>
            <span>📅 آخر تحديث: يناير 2024</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-green max-w-none">
            <style jsx global>{`
              .prose h2 {
                color: #166534;
                font-size: 1.5rem;
                font-weight: 700;
                margin-top: 2rem;
                margin-bottom: 1rem;
                border-bottom: 2px solid #dcfce7;
                padding-bottom: 0.5rem;
              }
              .prose h3 {
                color: #15803d;
                font-size: 1.25rem;
                font-weight: 600;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
              }
              .prose p {
                color: #374151;
                line-height: 1.8;
                margin-bottom: 1rem;
              }
              .prose ul {
                list-style-type: disc;
                padding-right: 1.5rem;
                margin-bottom: 1rem;
              }
              .prose li {
                color: #374151;
                margin-bottom: 0.5rem;
                line-height: 1.6;
              }
              .prose strong {
                color: #166534;
              }
              .prose table {
                width: 100%;
                margin: 1.5rem 0;
              }
            `}</style>
            {article.content}
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-8 px-4 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">هل تريد توصية مخصصة؟</h2>
            <p className="text-green-100 mb-6">
              استخدم حاسباتنا المجانية للحصول على توصيات دقيقة بناءً على نوع تربتك ومحصولك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/fertilizer-calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-700 rounded-xl hover:bg-green-50 transition-colors font-bold"
              >
                <span>🌿</span>
                حاسبة التسميد
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-400 transition-colors font-bold"
              >
                <span>💧</span>
                حاسبة الري
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">مقالات ذات صلة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(articlesData)
              .filter(([key]) => key !== slug)
              .slice(0, 2)
              .map(([key, relatedArticle]) => (
                <Link
                  key={key}
                  href={`/library/qat-guide/${key}`}
                  className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-900 mb-2 hover:text-green-600">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-sm text-gray-600">{relatedArticle.description}</p>
                </Link>
              ))}
          </div>
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
