// Seed Script for Yemen Smart Agriculture Platform
// Creates sample data for testing: 3 products, 2 articles, 2 experts

/**
 * This script should be run after setting up Firebase credentials.
 * It creates sample data in Firestore for testing purposes.
 * 
 * To run:
 * 1. Set up Firebase credentials in .env.local
 * 2. Run: npx ts-node scripts/seed.ts
 * 
 * Note: For MVP demo, this data can also be added manually through Firebase Console.
 */

// Sample Products Data
export const sampleProducts = [
  {
    id: 'product-1',
    data: {
      title: 'أبامكتين 1.8%',
      slug: 'abamectin-18',
      supplierId: 'supplier-demo-1',
      category: 'مبيدات حشرية',
      activeIngredient: 'أبامكتين',
      originCountry: 'الصين',
      priceRetail: 5000,
      priceWholesale: 4500,
      stockQty: 100,
      status: 'active' as const,
    },
  },
  {
    id: 'product-2',
    data: {
      title: 'سماد NPK 20-20-20',
      slug: 'npk-20-20-20',
      supplierId: 'supplier-demo-1',
      category: 'أسمدة',
      activeIngredient: 'نيتروجين، فوسفور، بوتاسيوم',
      originCountry: 'مصر',
      priceRetail: 8000,
      priceWholesale: 7000,
      stockQty: 200,
      status: 'active' as const,
    },
  },
  {
    id: 'product-3',
    data: {
      title: 'مبيد فطري كاربندازيم',
      slug: 'carbendazim-fungicide',
      supplierId: 'supplier-demo-2',
      category: 'مبيدات فطرية',
      activeIngredient: 'كاربندازيم 50%',
      originCountry: 'الهند',
      priceRetail: 6500,
      priceWholesale: 5800,
      stockQty: 150,
      status: 'active' as const,
    },
  },
];

// Sample Articles Data
export const sampleArticles = [
  {
    id: 'article-1',
    data: {
      title: 'دليل مكافحة الآفات الحشرية في القات',
      slug: 'pest-control-guide-qat',
      authorId: 'expert-demo-1',
      tags: ['آفات', 'قات', 'مكافحة', 'مبيدات'],
      content: `
# دليل مكافحة الآفات الحشرية في القات

## مقدمة
يعتبر القات من أهم المحاصيل في اليمن، ويتعرض للعديد من الآفات الحشرية التي تؤثر على جودته وإنتاجيته.

## أهم الآفات
1. **المن الأخضر**: يهاجم الأوراق الصغيرة
2. **العنكبوت الأحمر**: يسبب اصفرار الأوراق
3. **الذبابة البيضاء**: تنقل الفيروسات

## طرق المكافحة
- استخدام المبيدات المناسبة
- المكافحة البيولوجية
- الممارسات الزراعية السليمة

## نصائح عامة
- الرش في الصباح الباكر أو المساء
- اتباع فترات الأمان قبل القطف
- التناوب بين المبيدات
      `,
      status: 'published' as const,
    },
  },
  {
    id: 'article-2',
    data: {
      title: 'أساسيات التسميد للمحاصيل الورقية',
      slug: 'fertilization-basics-leafy-crops',
      authorId: 'expert-demo-2',
      tags: ['تسميد', 'محاصيل ورقية', 'NPK', 'زراعة'],
      content: `
# أساسيات التسميد للمحاصيل الورقية

## أهمية التسميد
التسميد المتوازن ضروري للحصول على محاصيل ورقية عالية الجودة.

## العناصر الأساسية
- **النيتروجين (N)**: للنمو الخضري
- **الفوسفور (P)**: لتطور الجذور
- **البوتاسيوم (K)**: لمقاومة الأمراض

## برنامج التسميد
1. التسميد الأساسي قبل الزراعة
2. التسميد التكميلي خلال النمو
3. الرش الورقي للعناصر الصغرى

## نصائح مهمة
- تحليل التربة قبل التسميد
- عدم الإفراط في النيتروجين
- الري بعد التسميد مباشرة
      `,
      status: 'published' as const,
    },
  },
];

// Sample Experts Data (for search index)
export const sampleExperts = [
  {
    uid: 'expert-demo-1',
    displayName: 'م. أحمد الزراعي',
    specialties: ['أمراض النبات', 'مكافحة الآفات', 'القات'],
  },
  {
    uid: 'expert-demo-2',
    displayName: 'د. سارة المهندسة',
    specialties: ['التسميد', 'الري الحديث', 'الزراعة العضوية'],
  },
];

// Function to generate search keywords
function normalizeKeywords(texts: string[]): string[] {
  const keywords: Set<string> = new Set();
  
  texts.forEach(text => {
    if (!text) return;
    const words = text.toLowerCase().trim().split(/\s+/);
    words.forEach(word => {
      if (word.length > 1) {
        keywords.add(word);
        for (let i = 2; i <= word.length; i++) {
          keywords.add(word.substring(0, i));
        }
      }
    });
  });
  
  return Array.from(keywords);
}

// Generate search index entries
export const searchIndexEntries = [
  // Products
  ...sampleProducts.map(p => ({
    docId: `product_${p.id}`,
    type: 'product' as const,
    refId: p.id,
    title: p.data.title,
    subtitle: p.data.category,
    keywords: normalizeKeywords([
      p.data.title,
      p.data.category,
      p.data.activeIngredient || '',
      p.data.originCountry || '',
    ]),
    slugOrPath: `/products/${p.data.slug}`,
  })),
  // Articles
  ...sampleArticles.map(a => ({
    docId: `article_${a.id}`,
    type: 'article' as const,
    refId: a.id,
    title: a.data.title,
    subtitle: a.data.tags?.join(', ') || '',
    keywords: normalizeKeywords([a.data.title, ...(a.data.tags || [])]),
    slugOrPath: `/articles/${a.data.slug}`,
  })),
  // Experts
  ...sampleExperts.map(e => ({
    docId: `expert_${e.uid}`,
    type: 'expert' as const,
    refId: e.uid,
    title: e.displayName,
    subtitle: e.specialties.join(', '),
    keywords: normalizeKeywords([e.displayName, ...e.specialties]),
    slugOrPath: `/experts/${e.uid}`,
  })),
];

console.log('=== Sample Data for Yemen Smart Agriculture Platform ===\n');
console.log('Products:', sampleProducts.length);
console.log('Articles:', sampleArticles.length);
console.log('Experts:', sampleExperts.length);
console.log('Search Index Entries:', searchIndexEntries.length);
console.log('\n=== Search Index Preview ===');
searchIndexEntries.forEach(entry => {
  console.log(`- [${entry.type}] ${entry.title} → ${entry.slugOrPath}`);
});
console.log('\n=== Instructions ===');
console.log('1. Set up Firebase project and add credentials to .env.local');
console.log('2. Use Firebase Console or Admin SDK to add this data');
console.log('3. Test search functionality with keywords like "أبامكتين" or "تسميد"');
