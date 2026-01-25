import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'من نحن',
  description: 'تعرف على منصة الزراعة الذكية اليمنية - مرجعك الزراعي الموثوق',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-beige">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-soil mb-8 font-cairo text-center">
          من نحن
        </h1>
        
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-soil mb-4 font-cairo">رؤيتنا</h2>
            <p className="text-soil/80 leading-relaxed font-noto">
              منصة الزراعة الذكية اليمنية هي مرجع زراعي متكامل يهدف إلى تقديم المعرفة العملية 
              للمزارع اليمني. نسعى لأن نكون الوجهة الأولى للمزارعين الباحثين عن معلومات موثوقة 
              وحلول عملية لتحدياتهم الزراعية.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-soil mb-4 font-cairo">ما نقدمه</h2>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-beige rounded-lg">
                <h3 className="font-bold text-soil mb-2 font-cairo">📚 المكتبة الزراعية</h3>
                <p className="text-sm text-soil/70 font-noto">
                  مقالات تعليمية شاملة عن زراعة القات، صحة التربة، الري، ومكافحة الآفات.
                </p>
              </div>
              <div className="p-4 bg-beige rounded-lg">
                <h3 className="font-bold text-soil mb-2 font-cairo">🧮 الحاسبات الذكية</h3>
                <p className="text-sm text-soil/70 font-noto">
                  أدوات حساب الري والأسمدة لمساعدتك في اتخاذ قرارات زراعية صحيحة.
                </p>
              </div>
              <div className="p-4 bg-beige rounded-lg">
                <h3 className="font-bold text-soil mb-2 font-cairo">🌡️ إنذار الطقس</h3>
                <p className="text-sm text-soil/70 font-noto">
                  تنبيهات مبكرة عن الصقيع والظروف الجوية التي قد تؤثر على محصولك.
                </p>
              </div>
              <div className="p-4 bg-beige rounded-lg">
                <h3 className="font-bold text-soil mb-2 font-cairo">🧪 مبيد اليوم</h3>
                <p className="text-sm text-soil/70 font-noto">
                  معلومات توعوية يومية عن المبيدات والاستخدام الآمن.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-soil mb-4 font-cairo">مبادئنا</h2>
            <ul className="space-y-2 text-soil/80 font-noto">
              <li className="flex items-start gap-2">
                <span className="text-growth">✓</span>
                <span>المعرفة للجميع: نؤمن بأن المعلومة الزراعية الصحيحة حق لكل مزارع.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-growth">✓</span>
                <span>الموثوقية: نقدم معلومات مبنية على الخبرة العملية والعلم.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-growth">✓</span>
                <span>البساطة: نبسط المفاهيم الزراعية بلغة يفهمها المزارع.</span>
              </li>
            </ul>
          </section>

          <div className="pt-6 border-t border-soil/10 text-center">
            <p className="text-soil/60 font-noto">
              منصة الزراعة الذكية اليمنية - مرجعك الزراعي الموثوق
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
