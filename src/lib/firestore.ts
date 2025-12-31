// Firestore Database Operations
// Helper functions for CRUD operations on Firestore collections

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  UserDocument,
  ProductDocument,
  ArticleDocument,
  SearchIndexDocument,
  UserRole,
  UserStatus,
  SearchIndexType,
  GroupedSearchResults,
  SearchResultItem,
} from '@/types';

// Collection references
const COLLECTIONS = {
  users: 'users',
  products: 'products',
  articles: 'articles',
  searchIndex: 'search_index',
};

// ============================================
// USER OPERATIONS
// ============================================

/**
 * Create a new user document
 */
export async function createUser(
  uid: string,
  role: UserRole,
  displayName: string,
  additionalData?: Partial<UserDocument>
): Promise<void> {
  const userRef = doc(db, COLLECTIONS.users, uid);
  
  // Determine initial status based on role
  const status: UserStatus = role === 'farmer' ? 'active' : 'pending';
  
  const userData: UserDocument = {
    uid,
    role,
    displayName,
    status,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    ...additionalData,
  };
  
  // Add role-specific default profiles
  if (role === 'farmer') {
    userData.farmerProfile = { crops: [] };
  } else if (role === 'supplier') {
    userData.supplierProfile = {
      wholesaleEnabled: false,
      verificationDocsStatus: 'none',
    };
  } else if (role === 'expert') {
    userData.expertProfile = {
      specialties: [],
      verifiedBadge: false,
    };
  }
  
  await setDoc(userRef, userData);
  
  // If expert, also create search index entry
  if (role === 'expert') {
    await updateSearchIndex('expert', uid, {
      title: displayName,
      subtitle: userData.expertProfile?.specialties?.join(', ') || '',
      keywords: normalizeKeywords([displayName, ...(userData.expertProfile?.specialties || [])]),
      slugOrPath: `/experts/${uid}`,
    });
  }
}

/**
 * Get user document by UID
 */
export async function getUser(uid: string): Promise<UserDocument | null> {
  const userRef = doc(db, COLLECTIONS.users, uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data() as UserDocument;
  }
  return null;
}

/**
 * Update user document
 */
export async function updateUser(
  uid: string,
  data: Partial<UserDocument>
): Promise<void> {
  const userRef = doc(db, COLLECTIONS.users, uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ============================================
// PRODUCT OPERATIONS
// ============================================

/**
 * Create a new product
 */
export async function createProduct(
  productId: string,
  data: Omit<ProductDocument, 'createdAt' | 'updatedAt' | 'ratingAvg' | 'ratingCount'>
): Promise<void> {
  const productRef = doc(db, COLLECTIONS.products, productId);
  
  const productData: ProductDocument = {
    ...data,
    ratingAvg: 0,
    ratingCount: 0,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
  
  await setDoc(productRef, productData);
  
  // Update search index
  await updateSearchIndex('product', productId, {
    title: data.title,
    subtitle: data.category,
    keywords: normalizeKeywords([
      data.title,
      data.category,
      data.activeIngredient || '',
      data.originCountry || '',
    ]),
    slugOrPath: `/products/${data.slug}`,
  });
}

/**
 * Get product by ID
 */
export async function getProduct(productId: string): Promise<ProductDocument | null> {
  const productRef = doc(db, COLLECTIONS.products, productId);
  const productSnap = await getDoc(productRef);
  
  if (productSnap.exists()) {
    return productSnap.data() as ProductDocument;
  }
  return null;
}

/**
 * Get product by slug
 */
export async function getProductBySlug(slug: string): Promise<ProductDocument | null> {
  const productsRef = collection(db, COLLECTIONS.products);
  const q = query(productsRef, where('slug', '==', slug), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data() as ProductDocument;
  }
  return null;
}

/**
 * Get products by supplier
 */
export async function getProductsBySupplierId(supplierId: string): Promise<ProductDocument[]> {
  const productsRef = collection(db, COLLECTIONS.products);
  const q = query(
    productsRef,
    where('supplierId', '==', supplierId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => doc.data() as ProductDocument);
}

// ============================================
// ARTICLE OPERATIONS
// ============================================

/**
 * Create a new article
 */
export async function createArticle(
  articleId: string,
  data: Omit<ArticleDocument, 'createdAt' | 'updatedAt'>
): Promise<void> {
  const articleRef = doc(db, COLLECTIONS.articles, articleId);
  
  const articleData: ArticleDocument = {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
  
  await setDoc(articleRef, articleData);
  
  // Update search index if published
  if (data.status === 'published') {
    await updateSearchIndex('article', articleId, {
      title: data.title,
      subtitle: data.tags?.join(', ') || '',
      keywords: normalizeKeywords([data.title, ...(data.tags || [])]),
      slugOrPath: `/articles/${data.slug}`,
    });
  }
}

/**
 * Get article by ID
 */
export async function getArticle(articleId: string): Promise<ArticleDocument | null> {
  const articleRef = doc(db, COLLECTIONS.articles, articleId);
  const articleSnap = await getDoc(articleRef);
  
  if (articleSnap.exists()) {
    return articleSnap.data() as ArticleDocument;
  }
  return null;
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(slug: string): Promise<ArticleDocument | null> {
  const articlesRef = collection(db, COLLECTIONS.articles);
  const q = query(articlesRef, where('slug', '==', slug), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data() as ArticleDocument;
  }
  return null;
}

/**
 * Get articles by author
 */
export async function getArticlesByAuthorId(authorId: string): Promise<ArticleDocument[]> {
  const articlesRef = collection(db, COLLECTIONS.articles);
  const q = query(
    articlesRef,
    where('authorId', '==', authorId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => doc.data() as ArticleDocument);
}

// ============================================
// SEARCH INDEX OPERATIONS
// ============================================

/**
 * Normalize text into searchable keywords
 */
export function normalizeKeywords(texts: string[]): string[] {
  const keywords: Set<string> = new Set();
  
  texts.forEach(text => {
    if (!text) return;
    
    // Convert to lowercase and split by spaces
    const words = text.toLowerCase().trim().split(/\s+/);
    
    words.forEach(word => {
      if (word.length > 1) {
        keywords.add(word);
        // Also add prefix variations for better search
        for (let i = 2; i <= word.length; i++) {
          keywords.add(word.substring(0, i));
        }
      }
    });
  });
  
  return Array.from(keywords);
}

/**
 * Update or create search index entry
 */
export async function updateSearchIndex(
  type: SearchIndexType,
  refId: string,
  data: Omit<SearchIndexDocument, 'type' | 'refId' | 'updatedAt'>
): Promise<void> {
  const docId = `${type}_${refId}`;
  const indexRef = doc(db, COLLECTIONS.searchIndex, docId);
  
  const indexData: SearchIndexDocument = {
    type,
    refId,
    ...data,
    updatedAt: Timestamp.now(),
  };
  
  await setDoc(indexRef, indexData);
}

/**
 * Delete search index entry
 */
export async function deleteSearchIndex(type: SearchIndexType, refId: string): Promise<void> {
  const docId = `${type}_${refId}`;
  const indexRef = doc(db, COLLECTIONS.searchIndex, docId);
  await deleteDoc(indexRef);
}

/**
 * Unified search across products, articles, and experts
 */
export async function unifiedSearch(
  searchQuery: string,
  limitPerType: number = 5
): Promise<GroupedSearchResults> {
  const results: GroupedSearchResults = {
    products: [],
    articles: [],
    experts: [],
  };
  
  if (!searchQuery.trim()) {
    return results;
  }
  
  // Normalize search query into tokens
  const tokens = searchQuery.toLowerCase().trim().split(/\s+/).filter(t => t.length > 1);
  
  if (tokens.length === 0) {
    return results;
  }
  
  // Use the first token for array-contains query (Firestore limitation)
  const searchToken = tokens[0];
  
  const searchIndexRef = collection(db, COLLECTIONS.searchIndex);
  
  // Query search index
  const q = query(
    searchIndexRef,
    where('keywords', 'array-contains', searchToken),
    orderBy('updatedAt', 'desc'),
    limit(limitPerType * 3) // Get more results to distribute among types
  );
  
  const querySnapshot = await getDocs(q);
  
  // Group results by type
  querySnapshot.docs.forEach(doc => {
    const data = doc.data() as SearchIndexDocument;
    const item: SearchResultItem = {
      type: data.type,
      refId: data.refId,
      title: data.title,
      subtitle: data.subtitle,
      slugOrPath: data.slugOrPath,
    };
    
    switch (data.type) {
      case 'product':
        if (results.products.length < limitPerType) {
          results.products.push(item);
        }
        break;
      case 'article':
        if (results.articles.length < limitPerType) {
          results.articles.push(item);
        }
        break;
      case 'expert':
        if (results.experts.length < limitPerType) {
          results.experts.push(item);
        }
        break;
    }
  });
  
  return results;
}

// ============================================
// BATCH OPERATIONS FOR SEEDING
// ============================================

/**
 * Batch create multiple documents (for seeding)
 */
export async function batchSeed(
  products: Array<{ id: string; data: Omit<ProductDocument, 'createdAt' | 'updatedAt' | 'ratingAvg' | 'ratingCount'> }>,
  articles: Array<{ id: string; data: Omit<ArticleDocument, 'createdAt' | 'updatedAt'> }>,
  experts: Array<{ uid: string; displayName: string; specialties: string[] }>
): Promise<void> {
  const batch = writeBatch(db);
  const now = Timestamp.now();
  
  // Add products and their search index entries
  products.forEach(({ id, data }) => {
    const productRef = doc(db, COLLECTIONS.products, id);
    batch.set(productRef, {
      ...data,
      ratingAvg: 0,
      ratingCount: 0,
      createdAt: now,
      updatedAt: now,
    });
    
    const searchRef = doc(db, COLLECTIONS.searchIndex, `product_${id}`);
    batch.set(searchRef, {
      type: 'product',
      refId: id,
      title: data.title,
      subtitle: data.category,
      keywords: normalizeKeywords([data.title, data.category, data.activeIngredient || '', data.originCountry || '']),
      slugOrPath: `/products/${data.slug}`,
      updatedAt: now,
    });
  });
  
  // Add articles and their search index entries
  articles.forEach(({ id, data }) => {
    const articleRef = doc(db, COLLECTIONS.articles, id);
    batch.set(articleRef, {
      ...data,
      createdAt: now,
      updatedAt: now,
    });
    
    if (data.status === 'published') {
      const searchRef = doc(db, COLLECTIONS.searchIndex, `article_${id}`);
      batch.set(searchRef, {
        type: 'article',
        refId: id,
        title: data.title,
        subtitle: data.tags?.join(', ') || '',
        keywords: normalizeKeywords([data.title, ...(data.tags || [])]),
        slugOrPath: `/articles/${data.slug}`,
        updatedAt: now,
      });
    }
  });
  
  // Add expert search index entries
  experts.forEach(({ uid, displayName, specialties }) => {
    const searchRef = doc(db, COLLECTIONS.searchIndex, `expert_${uid}`);
    batch.set(searchRef, {
      type: 'expert',
      refId: uid,
      title: displayName,
      subtitle: specialties.join(', '),
      keywords: normalizeKeywords([displayName, ...specialties]),
      slugOrPath: `/experts/${uid}`,
      updatedAt: now,
    });
  });
  
  await batch.commit();
}
