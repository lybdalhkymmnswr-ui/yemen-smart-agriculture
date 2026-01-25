import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية',
  description: 'سياسة الخصوصية لمنصة الزراعة الذكية اليمنية',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-beige">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-soil mb-8 font-cairo text-center">
          سياسة الخصوصية
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-soil mb-4 font-cairo">مقدمة</h2>
            <p className="text-soil/80 leading-relaxed font-noto">
              نحن في منصة الزراعة الذكية اليمنية نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. 
              توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي تقدمها لنا.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-soil mb-4 font-cairo">المعلومات التي نجمعها</h2>
            <p className="text-soil/80 leading-relaxed font-noto">
              المنصة حالياً تعمل بوضع الضيف (Guest Mode) ولا تتطلب تسجيل دخول. 
              نحن لا نجمع أي معلومات شخصية محددة للهوية. المعلومات التي قد نجمعها تشمل:
            </p>
            <ul className="list-disc list-inside mt-2 text-soil/80 font-noto space-y-1 mr-4">
              <li>معلومات الاستخدام العامة (الصفحات المزارة، وقت الزيارة)</li>
              <li>معلومات الجهاز والمتصفح لتحسين تجربة المستخدم</li>
              <li>الموقع الجغرافي التقريبي (للميزات المتعلقة بالطقس)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-soil mb-4 font-cairo">كيف نستخدم المعلومات</h2>
            <p className="text-soil/80 leading-relaxed font-noto">
              نستخدم المعلومات المجمعة لتحسين خدماتنا وتقديم محتوى زراعي مفيد للمزارعين اليمنيين. 
              لا نبيع أو نشارك معلوماتك مع أطراف ثالثة لأغراض تجارية.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-soil mb-4 font-cairo">حماية البيانات</h2>
            <p className="text-soil/80 leading-relaxed font-noto">
              نتخذ إجراءات أمنية مناسبة لحماية المعلومات من الوصول غير المصرح به أو التعديل أو الإفصاح.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-soil mb-4 font-cairo">تواصل معنا</h2>
            <p className="text-soil/80 leading-relaxed font-noto">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية، يمكنك التواصل معنا عبر صفحة التواصل في المنصة.
            </p>
          </section>

          <div className="pt-6 border-t border-soil/10">
            <p className="text-sm text-soil/60 font-noto">
              آخر تحديث: يناير 2026
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-growth text-white rounded-lg hover:bg-growth-dark transition-colors font-cairo"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </main>
    </div>
  );
}
