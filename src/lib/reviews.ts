// Reviews and Ratings Service
// Handles product reviews and ratings with Firestore

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
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProductRating {
  averageRating: number;
  totalReviews: number;
}

// Collection path helper
const getReviewsCollection = (productId: string) => 
  collection(db, 'products', productId, 'reviews');

/**
 * Add a new review for a product
 * Note: userId is passed directly from the authenticated user in the component
 * This avoids issues with auth.currentUser being null in some cases
 */
export async function addReview(
  productId: string,
  userId: string,
  userName: string,
  rating: number,
  comment: string
): Promise<Review> {
  // Debug: Log parameters
  console.log('=== addReview Debug ===');
  console.log('productId:', productId);
  console.log('userId (from param):', userId);
  console.log('userName:', userName);
  console.log('rating:', rating);
  console.log('comment:', comment);
  
  // Validate that userId is provided
  if (!userId) {
    throw new Error('يجب تسجيل الدخول لإضافة تقييم');
  }
  
  // Validate rating
  if (rating < 1 || rating > 5) {
    throw new Error('التقييم يجب أن يكون بين 1 و 5');
  }

  // Check if user already reviewed this product
  const existingReview = await getUserReviewForProduct(productId, userId);
  if (existingReview) {
    throw new Error('لقد قمت بتقييم هذا المنتج مسبقاً');
  }

  const reviewsRef = getReviewsCollection(productId);
  const reviewId = `${userId}_${Date.now()}`;
  const reviewDoc = doc(reviewsRef, reviewId);

  // Only send required fields to Firestore (userId, rating, comment, createdAt)
  // Firestore Rules explicitly check for these fields only
  const reviewData = {
    userId,  // Use userId passed from the authenticated user
    rating,
    comment,
    createdAt: serverTimestamp(),
  };

  console.log('reviewData to be sent:', reviewData);
  console.log('reviewDoc path:', reviewDoc.path);

  try {
    await setDoc(reviewDoc, reviewData);
    console.log('Review added successfully!');
  } catch (error) {
    console.error('Firestore setDoc error:', error);
    throw error;
  }

  // Create local Review object for return
  const review: Review = {
    id: reviewId,
    productId,
    userId,
    userName,
    rating,
    comment,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  // Update product rating statistics
  await updateProductRatingStats(productId);

  return review;
}

/**
 * Update an existing review
 */
export async function updateReview(
  productId: string,
  reviewId: string,
  userId: string,
  rating: number,
  comment: string
): Promise<void> {
  // Validate rating
  if (rating < 1 || rating > 5) {
    throw new Error('التقييم يجب أن يكون بين 1 و 5');
  }

  const reviewDoc = doc(getReviewsCollection(productId), reviewId);
  const reviewSnap = await getDoc(reviewDoc);

  if (!reviewSnap.exists()) {
    throw new Error('التعليق غير موجود');
  }

  const existingReview = reviewSnap.data() as Review;
  
  // Check ownership
  if (existingReview.userId !== userId) {
    throw new Error('لا يمكنك تعديل تعليق شخص آخر');
  }

  await updateDoc(reviewDoc, {
    rating,
    comment,
    updatedAt: serverTimestamp(),
  });

  // Update product rating statistics
  await updateProductRatingStats(productId);
}

/**
 * Delete a review
 */
export async function deleteReview(
  productId: string,
  reviewId: string,
  userId: string
): Promise<void> {
  const reviewDoc = doc(getReviewsCollection(productId), reviewId);
  const reviewSnap = await getDoc(reviewDoc);

  if (!reviewSnap.exists()) {
    throw new Error('التعليق غير موجود');
  }

  const existingReview = reviewSnap.data() as Review;
  
  // Check ownership
  if (existingReview.userId !== userId) {
    throw new Error('لا يمكنك حذف تعليق شخص آخر');
  }

  await deleteDoc(reviewDoc);

  // Update product rating statistics
  await updateProductRatingStats(productId);
}

/**
 * Get all reviews for a product
 */
export async function getProductReviews(
  productId: string,
  limitCount: number = 50
): Promise<Review[]> {
  const reviewsRef = getReviewsCollection(productId);
  const q = query(
    reviewsRef,
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );

  const querySnapshot = await getDocs(q);
  console.log('=== getProductReviews Debug ===');
  console.log('productId:', productId);
  console.log('docs count:', querySnapshot.docs.length);
  
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    console.log('Review doc id:', doc.id, 'data:', data);
    return {
      id: doc.id,
      productId,
      userId: data.userId || '',
      userName: data.userName || 'مستخدم',
      rating: data.rating || 0,
      comment: data.comment || '',
      createdAt: data.createdAt,
      updatedAt: data.updatedAt || data.createdAt,
    } as Review;
  });
}

/**
 * Get user's review for a specific product
 */
export async function getUserReviewForProduct(
  productId: string,
  userId: string
): Promise<Review | null> {
  const reviewsRef = getReviewsCollection(productId);
  const q = query(
    reviewsRef,
    where('userId', '==', userId),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  const data = doc.data();
  return {
    id: doc.id,
    productId,
    userId: data.userId || '',
    userName: data.userName || 'مستخدم',
    rating: data.rating || 0,
    comment: data.comment || '',
    createdAt: data.createdAt,
    updatedAt: data.updatedAt || data.createdAt,
  } as Review;
}

/**
 * Get product rating statistics
 */
export async function getProductRatingStats(productId: string): Promise<ProductRating> {
  const reviews = await getProductReviews(productId, 1000);
  
  if (reviews.length === 0) {
    return { averageRating: 0, totalReviews: 0 };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  return {
    averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    totalReviews: reviews.length,
  };
}

/**
 * Update product rating statistics (called after add/update/delete review)
 */
async function updateProductRatingStats(productId: string): Promise<void> {
  const stats = await getProductRatingStats(productId);
  
  // Update product document with new stats
  const productDoc = doc(db, 'products', productId);
  
  try {
    await updateDoc(productDoc, {
      ratingAvg: stats.averageRating,
      ratingCount: stats.totalReviews,
      updatedAt: serverTimestamp(),
    });
  } catch {
    // Product might not exist in Firestore yet (using local data)
    console.log('Product not in Firestore, skipping stats update');
  }
}

/**
 * Get rating distribution for a product
 */
export async function getRatingDistribution(productId: string): Promise<Record<number, number>> {
  const reviews = await getProductReviews(productId, 1000);
  
  const distribution: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  reviews.forEach(review => {
    distribution[review.rating]++;
  });

  return distribution;
}
