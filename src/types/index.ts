// Type definitions for Yemen Smart Agriculture Platform

import { Timestamp } from 'firebase/firestore';

// User Roles
export type UserRole = 'farmer' | 'supplier' | 'expert' | 'admin';

// User Status
export type UserStatus = 'active' | 'pending' | 'suspended';

// Verification Status
export type VerificationStatus = 'none' | 'submitted' | 'verified' | 'rejected';

// Product Status
export type ProductStatus = 'active' | 'inactive';

// Article Status
export type ArticleStatus = 'draft' | 'published';

// Search Index Type
export type SearchIndexType = 'product' | 'article' | 'expert';

// Farmer Profile
export interface FarmerProfile {
  governorate?: string;
  district?: string;
  crops?: string[];
}

// Supplier Profile
export interface SupplierProfile {
  companyName?: string;
  wholesaleEnabled: boolean;
  verificationDocsStatus: VerificationStatus;
}

// Expert Profile
export interface ExpertProfile {
  specialties?: string[];
  verifiedBadge: boolean;
}

// User Document (users/{uid})
export interface UserDocument {
  uid: string;
  role: UserRole;
  displayName: string;
  phone?: string;
  photoURL?: string;
  status: UserStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  // Role-specific profiles (optional)
  farmerProfile?: FarmerProfile;
  supplierProfile?: SupplierProfile;
  expertProfile?: ExpertProfile;
}

// Product Document (products/{productId})
export interface ProductDocument {
  title: string;
  slug: string;
  supplierId: string;
  category: string;
  activeIngredient?: string;
  originCountry?: string;
  concentration?: string;
  formulation?: string;
  company?: string;
  registrationNumber?: string;
  registrationStatus?: 'allowed' | 'not_allowed';
  emoji?: string;
  description?: string;
  priceRetail?: number;
  priceWholesale?: number;
  stockQty?: number;
  ratingAvg: number;
  ratingCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: ProductStatus;
}

// Article Document (articles/{articleId})
export interface ArticleDocument {
  title: string;
  slug: string;
  authorId: string;
  tags?: string[];
  content: string;
  status: ArticleStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Search Index Document (search_index/{docId})
export interface SearchIndexDocument {
  type: SearchIndexType;
  refId: string;
  title: string;
  subtitle?: string;
  keywords: string[];
  slugOrPath: string;
  updatedAt: Timestamp;
}

// Dashboard paths for each role
export const DASHBOARD_PATHS: Record<UserRole, string> = {
  farmer: '/dashboard/farmer',
  supplier: '/dashboard/supplier',
  expert: '/dashboard/expert',
  admin: '/dashboard/admin',
};

// Search result item
export interface SearchResultItem {
  type: SearchIndexType;
  refId: string;
  title: string;
  subtitle?: string;
  slugOrPath: string;
}

// Grouped search results
export interface GroupedSearchResults {
  products: SearchResultItem[];
  articles: SearchResultItem[];
  experts: SearchResultItem[];
}
