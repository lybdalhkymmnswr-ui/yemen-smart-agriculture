'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// تعريف نوع المنشور
interface Post {
  id: number;
  title: string;
  date: string;
  content: string;
  tags: string[];
  facebookUrl: string;
  featured?: boolean;
  image?: string;
}

// بيانات المنشورات - يمكن تحديثها يدوياً
const posts: Post[] = [
  {
    id: 0,
    title: 'مبيد اليوم: لماذا خسر كثير من المزارعين رغم الرش؟',
    date: '2026-01-21',
    featured: true,
    image: '/images/mobeed-alyawm-intro.jpg',
    content: `يا إخواني المزارعين،
كثرت المنتجات وامتلأ السوق بالمبيدات المغشوشة، وصار الواحد يخسر وهو حاسب إنه يعالج زرعه.

كثير منا رش مبيد، تعب وصرف، وفي الأخير ما شاف نتيجة.
والسبب غالبًا واحد من ثلاثة:
• معلومة غلط
• استخدام المبيد في غير وقته
• الجهل بالمادة الفعالة الموجودة داخل العلبة

ومن أجل نوقف الخسارة ونتكاتف مع بعض، جاءت فكرة مبيد اليوم.

هذه الصفحة ليست للبيع ولا للترويج،
هدفها الوعي فقط.

كل يوم سنتكلم عن مبيد واحد:
• ما هي مادته الفعالة
• متى ينفع ومتى يضر
• أخطاء الاستخدام الشائعة
• هل له بديل؟ ومتى نلجأ له

رأيكم يهمنا 👇
هل هذا النوع من المحتوى يفيدكم؟
وما هو أول مبيد تحبوا نبدأ به؟`,
    tags: ['توعية', 'مبيدات', 'أخطاء شائعة', 'مادة فعالة', 'وعي زراعي'],
    facebookUrl: 'https://www.facebook.com/share/p/1MiVieLSDp/?mibextid=wwXIfr'
  },
  {
    id: 100,
    title: 'مبيد اليوم | ديفيزول تحت المجهر 🔍',
    date: '2026-01-21',
    featured: true,
    image: '/images/divizole-post.jpg',
    content: `كثير منكم طلب نبدأ بمبيد ديفيزول،
وقبل أي شيء خلّونا نوضّح نقطة مهمة من البداية:

هذا المنشور للنقاش فقط
لا ترويج، ولا إعلان، ولا دعوة لشراء أي مبيد.
نحن نعرض المعلومة، ونترك الحكم والتجربة لكم أنتم.

━━━━━━━━━━

🔹 الأسماء التجارية

ديفيزول – ديكيزول – ديفيكور
أسماء مختلفة، لكن المادة الفعالة واحدة:

ديفينوكونازول 25٪

الصنع: سعودي
الشركة: واحدة
وبالنسبة للي يبحث عن البديل الأرخص
يوجد نوع صيني (وإذا حبيتم ننزل صورته لاحقًا).

━━━━━━━━━━

🔹 المعلومة الأهم

القوة ليست في الاسم التجاري
ولا في شكل العلبة
القوة الحقيقية في:
• المادة الفعالة
• توقيت الاستخدام
• طريقة التطبيق

━━━━━━━━━━

✅ متى قد ينفع ديفيزول؟
• إذا كان القات جاهز
• وظهر غفان خفيف أو في بدايته

كثير من المزارعين يقولوا إنه:
• ينفع في هذه المرحلة
• ما يمحق القات
• ولا يضر القطفة إذا استُخدم صح

الجرعة الشائعة بين المزارعين:
50 مل لكل 100 لتر ماء

━━━━━━━━━━

❌ متى قد لا ينفع؟
• إذا كان الغفان قوي أو منتشر بشكل كبير

تجارب كثيرة تشير:
• ما يعطي نتيجة واضحة في هذه المرحلة

وفي هذه الحالات
بعض المزارعين يفضّلوا الانتقال إلى مبيد أقوى
مثل:
• بوسكال
• أو كابرس
(حسب شدة الإصابة ووضع الجربة)

━━━━━━━━━━

⚠️ ملاحظة صادقة

كثير من المبيدات تُتَّهَم بالفشل
والسبب أحيانًا:
• اختلاف الجودة
• أو الاستخدام في مرحلة غير مناسبة
وليس لأنها سيئة بالضرورة.

━━━━━━━━━━

🟢 فلسفة "مبيد اليوم"

نحن لا نعطي أحكام
ولا نقول هذا ممتاز وهذا فاشل

نضع الصورة كاملة
ونترك التجربة هي الحكم.

━━━━━━━━━━

🟢 سؤالك كمزارع مهم 👇

إذا استخدمت ديفيزول أو أحد بدائله
شاركنا رأيك بصراحة:
• نفع
• نفع جزئيًا
• ما نفع

رأيك قد:
• يحمي مزارع غيرك من خسارة
• أو يساعده يختار القرار الصح`,
    tags: ['مبيد اليوم', 'ديفيزول', 'ديفينوكونازول', 'غفان القات', 'مبيدات فطرية', 'وعي زراعي'],
    facebookUrl: 'https://m.facebook.com/story.php?story_fbid=pfbid0EgTcxdKA29sLZtmhr2PX4WNUs9NbKzFUcTxziwSxSe8fEKbTqavd7gFbvELCQ8e6l&id=61586143498963&mibextid=wwXIfr'
  },
  {
    id: 1,
    title: 'الفرق بين المبيد الأصلي والمغشوش',
    date: '2026-01-21',
    content: `كثير من المزارعين يشتكون: "رشيت المبيد ولم يؤثر!"
    
السبب في الغالب: المبيد مغشوش أو منتهي الصلاحية.

كيف تفرق؟
• المبيد الأصلي له رائحة مميزة ثابتة
• العبوة مختومة بإحكام وعليها تاريخ الإنتاج والانتهاء
• الملصق واضح ومطبوع بجودة عالية
• السعر المنخفض جداً علامة تحذيرية

نصيحة: اشترِ من موردين موثوقين فقط.`,
    tags: ['توعية', 'غش', 'جودة'],
    facebookUrl: 'https://www.facebook.com/profile.php?id=61586143498963'
  },
  {
    id: 2,
    title: 'متى ترش المبيد؟ التوقيت الصحيح',
    date: '2026-01-20',
    content: `أفضل وقت للرش: الصباح الباكر أو قبل الغروب

لماذا؟
• درجة الحرارة معتدلة (المبيد لا يتبخر بسرعة)
• الرياح هادئة (الرش يصل للهدف)
• الحشرات نشطة في هذه الأوقات

تجنب الرش في:
• وقت الظهيرة الحار
• أثناء هبوب الرياح القوية
• قبل المطر مباشرة

الرش في الوقت الخطأ = إهدار للمبيد والمال!`,
    tags: ['توقيت', 'رش', 'نصائح'],
    facebookUrl: 'https://www.facebook.com/profile.php?id=61586143498963'
  },
  {
    id: 3,
    title: 'خطأ شائع: خلط المبيدات بدون معرفة',
    date: '2026-01-19',
    content: `"أخلط مبيدين مع بعض عشان يكون أقوى" - خطأ خطير!

المشاكل المحتملة:
• بعض المبيدات تتفاعل وتصبح سامة جداً
• قد يبطل مفعول أحدهما الآخر
• قد تحرق النبات

القاعدة الذهبية:
لا تخلط أي مبيدين إلا إذا كان مكتوب على العبوة أنه آمن للخلط.

إذا احتجت أكثر من مبيد: رش كل واحد لوحده بفارق يوم أو يومين.`,
    tags: ['أخطاء', 'خلط', 'تحذير'],
    facebookUrl: 'https://www.facebook.com/profile.php?id=61586143498963'
  },
  {
    id: 4,
    title: 'المادة الفعالة: ما هي ولماذا مهمة؟',
    date: '2026-01-18',
    content: `المادة الفعالة هي "السر" داخل المبيد الذي يقتل الآفة.

مثال: مبيد "أبامكتين" - المادة الفعالة هي Abamectin

لماذا مهم تعرف المادة الفعالة؟
• نفس المادة قد تباع بأسماء تجارية مختلفة
• تساعدك على المقارنة بين الأسعار
• تمنعك من شراء نفس المبيد مرتين باسم مختلف

نصيحة: اقرأ الملصق الخلفي دائماً - المادة الفعالة مكتوبة هناك.`,
    tags: ['مادة فعالة', 'تعليم', 'أساسيات'],
    facebookUrl: 'https://www.facebook.com/profile.php?id=61586143498963'
  },
  {
    id: 5,
    title: 'بدائل طبيعية: زيت النيم',
    date: '2026-01-17',
    content: `زيت النيم: مبيد طبيعي فعال وآمن

يعمل ضد:
• المن (القمل)
• العنكبوت الأحمر
• الذبابة البيضاء
• كثير من الحشرات الصغيرة

مميزاته:
• آمن على الإنسان والبيئة
• لا يترك بقايا سامة
• يمكن استخدامه قرب الحصاد

طريقة الاستخدام:
5 مل زيت نيم + 1 لتر ماء + قطرات صابون سائل
رش في الصباح الباكر كل 7-10 أيام.`,
    tags: ['بدائل', 'طبيعي', 'نيم'],
    facebookUrl: 'https://www.facebook.com/profile.php?id=61586143498963'
  }
];

export default function MobeedAlyawmPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // جمع كل التاجات
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  // فلترة المنشورات حسب التاج المختار
  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <div className="bg-gradient-to-l from-green-600 to-green-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🧪</div>
          <h1 className="text-4xl font-bold mb-4">مبيد اليوم</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            صفحة توعوية يومية توضّح حقيقة المبيدات، المواد الفعالة، الأخطاء الشائعة، والبدائل الآمنة بلغة المزارع.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a 
              href="https://www.facebook.com/profile.php?id=61586143498963"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-700 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              تابعنا على فيسبوك
            </a>
          </div>
        </div>
      </div>

      {/* Tags Filter */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTag === null 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            الكل
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <article 
              key={post.id}
              className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${
                post.featured ? 'border-green-300 ring-2 ring-green-100' : 'border-gray-100'
              }`}
            >
              {/* صورة المنشور المميز */}
              {post.image && (
                <div className="relative h-64 w-full">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority={post.featured}
                  />
                  {post.featured && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                      🌟 المنشور الرئيسي
                    </div>
                  )}
                </div>
              )}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {post.featured && !post.image && (
                      <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                        🌟 المنشور الرئيسي
                      </span>
                    )}
                    <h2 className={`font-bold text-gray-900 mb-2 ${
                      post.featured ? 'text-2xl' : 'text-xl'
                    }`}>
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>📅</span>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('ar-YE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>
                  {!post.image && <div className="text-3xl">🧪</div>}
                </div>

                {/* Content */}
                <div className="text-gray-700 whitespace-pre-line leading-relaxed mb-4">
                  {post.content}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Facebook Link */}
                <div className="pt-4 border-t border-gray-100">
                  <a
                    href={post.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    🔗 شاهد المنشور الأصلي وشارك برأيك على فيسبوك
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500">لا توجد منشورات بهذا التصنيف</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-green-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            هل لديك سؤال عن مبيد معين؟
          </h2>
          <p className="text-gray-600 mb-6">
            تواصل معنا على صفحتنا في فيسبوك وسنجيب على استفساراتك
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://www.facebook.com/profile.php?id=61586143498963"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              اسألنا على فيسبوك
            </a>
            <Link
              href="/library"
              className="bg-white text-green-700 border-2 border-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
            >
              📚 تصفح المكتبة الزراعية
            </Link>
          </div>
        </div>
      </div>

      {/* SEO Footer Note */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            مبيد اليوم - مبادرة توعوية من منصة الزراعة الذكية اليمنية لنشر الوعي حول الاستخدام الآمن للمبيدات الزراعية.
          </p>
        </div>
      </div>
    </div>
  );
}
