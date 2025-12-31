// Seed Data for Yemen Smart Agriculture Platform
// Static data used across all pages

import { pesticides, searchPesticides, Pesticide } from './pesticides';

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  activeIngredient: string;
  originCountry: string;
  priceRetail: number;
  description: string;
  imageEmoji: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  authorName: string;
  tags: string[];
  excerpt: string;
  publishedAt: string;
  imageEmoji: string;
}

export interface Expert {
  uid: string;
  displayName: string;
  specialties: string[];
  bio: string;
  articlesCount: number;
  consultationsCount: number;
  imageEmoji: string;
}

// Convert pesticides to Product format for backward compatibility
export const products: Product[] = pesticides.slice(0, 50).map(p => ({
  id: p.id,
  title: p.name,
  slug: p.slug,
  category: p.category,
  activeIngredient: p.activeIngredient,
  originCountry: p.country,
  priceRetail: 5000, // Default price
  description: p.description,
  imageEmoji: p.emoji,
}));

// Sample Articles
export const articles: Article[] = [
  {
    id: 'article-1',
    title: 'دليل مكافحة الآفات الحشرية في القات',
    slug: 'pest-control-guide-qat',
    authorName: 'م. أحمد الزراعي',
    tags: ['آفات', 'قات', 'مكافحة', 'مبيدات'],
    excerpt: 'يعتبر القات من أهم المحاصيل في اليمن، ويتعرض للعديد من الآفات الحشرية التي تؤثر على جودته وإنتاجيته.',
    publishedAt: '2024-12-15',
    imageEmoji: '🌿',
  },
  {
    id: 'article-2',
    title: 'أساسيات التسميد للمحاصيل الورقية',
    slug: 'fertilization-basics-leafy-crops',
    authorName: 'د. سارة المهندسة',
    tags: ['تسميد', 'محاصيل ورقية', 'NPK', 'زراعة'],
    excerpt: 'التسميد المتوازن ضروري للحصول على محاصيل ورقية عالية الجودة. تعرف على أساسيات التسميد.',
    publishedAt: '2024-12-10',
    imageEmoji: '📝',
  },
  {
    id: 'article-3',
    title: 'طرق الري الحديثة وتوفير المياه',
    slug: 'modern-irrigation-methods',
    authorName: 'م. خالد العمري',
    tags: ['ري', 'توفير مياه', 'تقنيات حديثة'],
    excerpt: 'في ظل شح المياه، أصبح من الضروري استخدام طرق الري الحديثة لتوفير المياه وزيادة الإنتاجية.',
    publishedAt: '2024-12-05',
    imageEmoji: '💧',
  },
  {
    id: 'article-4',
    title: 'أمراض البن اليمني وطرق الوقاية',
    slug: 'yemeni-coffee-diseases',
    authorName: 'د. فاطمة الحسني',
    tags: ['بن', 'أمراض', 'وقاية', 'يمن'],
    excerpt: 'البن اليمني يتعرض لعدة أمراض فطرية وبكتيرية. تعرف على أهم هذه الأمراض وطرق الوقاية منها.',
    publishedAt: '2024-11-28',
    imageEmoji: '☕',
  },
];

// Sample Experts
export const experts: Expert[] = [
  {
    uid: 'expert-1',
    displayName: 'م. أحمد الزراعي',
    specialties: ['أمراض النبات', 'مكافحة الآفات', 'القات'],
    bio: 'مهندس زراعي متخصص في أمراض النبات ومكافحة الآفات، خبرة 15 عاماً في الزراعة اليمنية.',
    articlesCount: 12,
    consultationsCount: 156,
    imageEmoji: '👨‍🔬',
  },
  {
    uid: 'expert-2',
    displayName: 'د. سارة المهندسة',
    specialties: ['التسميد', 'الري الحديث', 'الزراعة العضوية'],
    bio: 'دكتوراه في علوم التربة والتسميد، متخصصة في الزراعة المستدامة والعضوية.',
    articlesCount: 8,
    consultationsCount: 89,
    imageEmoji: '👩‍🔬',
  },
  {
    uid: 'expert-3',
    displayName: 'م. خالد العمري',
    specialties: ['الري الحديث', 'تقنيات الزراعة', 'البيوت المحمية'],
    bio: 'خبير في تقنيات الري الحديثة والزراعة المحمية، عمل في عدة مشاريع زراعية كبرى.',
    articlesCount: 6,
    consultationsCount: 72,
    imageEmoji: '👨‍💼',
  },
  {
    uid: 'expert-4',
    displayName: 'د. فاطمة الحسني',
    specialties: ['البن اليمني', 'المحاصيل الاستوائية', 'الجودة'],
    bio: 'متخصصة في زراعة البن اليمني وتحسين جودته، باحثة في مركز البحوث الزراعية.',
    articlesCount: 10,
    consultationsCount: 45,
    imageEmoji: '👩‍🏫',
  },
];

// Search function - now includes pesticides
export function searchAll(query: string): {
  products: Product[];
  articles: Article[];
  experts: Expert[];
  pesticides: Pesticide[];
} {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return { products: [], articles: [], experts: [], pesticides: [] };
  }

  // Search in pesticides (main product database)
  const matchedPesticides = searchPesticides(normalizedQuery).slice(0, 20);

  // Convert matched pesticides to Product format
  const matchedProducts = matchedPesticides.slice(0, 10).map(p => ({
    id: p.id,
    title: p.name,
    slug: p.slug,
    category: p.category,
    activeIngredient: p.activeIngredient,
    originCountry: p.country,
    priceRetail: 5000,
    description: p.description,
    imageEmoji: p.emoji,
  }));

  const matchedArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(normalizedQuery) ||
      a.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
      a.excerpt.toLowerCase().includes(normalizedQuery) ||
      a.authorName.toLowerCase().includes(normalizedQuery)
  );

  const matchedExperts = experts.filter(
    (e) =>
      e.displayName.toLowerCase().includes(normalizedQuery) ||
      e.specialties.some((s) => s.toLowerCase().includes(normalizedQuery)) ||
      e.bio.toLowerCase().includes(normalizedQuery)
  );

  return {
    products: matchedProducts,
    articles: matchedArticles,
    experts: matchedExperts,
    pesticides: matchedPesticides,
  };
}
