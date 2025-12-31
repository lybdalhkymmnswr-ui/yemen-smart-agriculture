'use client';

// Product Reviews Component (Phase 1)
// Uses Firebase Auth displayName - no Firestore users collection
// Waits for authReady before allowing review submission

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Review,
  getProductReviews,
  addReview,
  updateReview,
  deleteReview,
  getUserReviewForProduct,
  getProductRatingStats,
  ProductRating,
} from '@/lib/reviews';
import Link from 'next/link';

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const { user, authReady, isAnonymous } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ProductRating>({ averageRating: 0, totalReviews: 0 });
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Debug: Log auth state (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    console.log('=== ProductReviews: Auth State ===');
    console.log('user:', user);
    console.log('user?.uid:', user?.uid);
    console.log('authReady:', authReady);
    console.log('isAnonymous:', isAnonymous);
  }, [user, authReady, isAnonymous]);

  const loadReviews = useCallback(async () => {
    try {
      setLoading(true);
      const [reviewsData, statsData] = await Promise.all([
        getProductReviews(productId),
        getProductRatingStats(productId),
      ]);
      setReviews(reviewsData);
      setStats(statsData);
    } catch (err) {
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const checkUserReview = useCallback(async () => {
    if (!user) return;
    try {
      const review = await getUserReviewForProduct(productId, user.uid);
      setUserReview(review);
      if (review) {
        setRating(review.rating);
        setComment(review.comment);
      }
    } catch (err) {
      console.error('Error checking user review:', err);
    }
  }, [productId, user]);

  // Load reviews
  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // Check if user has reviewed
  useEffect(() => {
    if (user) {
      checkUserReview();
    } else {
      setUserReview(null);
    }
  }, [user, checkUserReview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Double-check auth state before submitting
    if (!user || !authReady) {
      setError('يرجى الانتظار حتى يتم تحميل حالة المصادقة');
      return;
    }

    console.log('=== handleSubmit: Submitting review ===');
    console.log('user.uid:', user.uid);
    console.log('user.displayName:', user.displayName);
    console.log('user.isAnonymous:', user.isAnonymous);
    console.log('rating:', rating);
    console.log('comment:', comment);

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEditing && userReview) {
        await updateReview(productId, userReview.id, user.uid, rating, comment);
        setSuccess('تم تحديث تقييمك بنجاح');
      } else {
        // Use displayName from Firebase Auth (set during registration)
        // For anonymous users, use a default name
        const userName = user.displayName || (user.isAnonymous ? 'زائر' : 'مستخدم');
        console.log('Calling addReview with userName:', userName);
        await addReview(productId, user.uid, userName, rating, comment);
        setSuccess('تم إضافة تقييمك بنجاح');
      }
      
      setIsEditing(false);
      await loadReviews();
      await checkUserReview();
    } catch (err: unknown) {
      console.error('Review submission error:', err);
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!user || !userReview) return;
    
    if (!confirm('هل أنت متأكد من حذف تقييمك؟')) return;

    setSubmitting(true);
    setError(null);

    try {
      await deleteReview(productId, userReview.id, user.uid);
      setSuccess('تم حذف تقييمك بنجاح');
      setUserReview(null);
      setRating(5);
      setComment('');
      await loadReviews();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (count: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={interactive ? () => setRating(star) : undefined}
            disabled={!interactive}
            className={`text-2xl ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
          >
            {star <= count ? '⭐' : '☆'}
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (timestamp: { seconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('ar-YE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Check if user can submit reviews
  const canSubmitReview = authReady && user && !isAnonymous;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        التقييمات والتعليقات
      </h2>

      {/* Rating Summary */}
      <div className="flex items-center gap-6 mb-8 p-4 bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600">
            {stats.averageRating || '-'}
          </div>
          <div className="text-sm text-gray-500">من 5</div>
        </div>
        <div>
          {renderStars(Math.round(stats.averageRating))}
          <div className="text-sm text-gray-500 mt-1">
            {stats.totalReviews} تقييم
          </div>
        </div>
      </div>

      {/* Auth Status Debug (can be removed in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-2 bg-yellow-50 text-xs text-yellow-800 rounded">
          Debug: authReady={String(authReady)}, user={user?.uid?.slice(0,8) || 'null'}, isAnonymous={String(isAnonymous)}
        </div>
      )}

      {/* Add/Edit Review Form */}
      {!authReady ? (
        <div className="mb-8 p-4 bg-gray-50 rounded-xl text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto mb-2"></div>
          <p className="text-gray-600">جاري تحميل حالة المصادقة...</p>
        </div>
      ) : canSubmitReview ? (
        <div className="mb-8 p-4 border border-gray-200 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4">
            {userReview && !isEditing ? 'تقييمك' : isEditing ? 'تعديل تقييمك' : 'أضف تقييمك'}
          </h3>

          {userReview && !isEditing ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {renderStars(userReview.rating)}
                <span className="text-gray-500 text-sm">
                  {formatDate(userReview.createdAt)}
                </span>
              </div>
              <p className="text-gray-700">{userReview.comment}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  تعديل
                </button>
                <button
                  onClick={handleDelete}
                  disabled={submitting}
                  className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                >
                  حذف
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تقييمك
                </label>
                {renderStars(rating, true)}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تعليقك
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  required
                  minLength={10}
                  placeholder={`شاركنا رأيك في ${productName}...`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                  {success}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting || comment.length < 10 || !authReady || !user}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'جاري الإرسال...' : isEditing ? 'حفظ التعديلات' : 'إرسال التقييم'}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      if (userReview) {
                        setRating(userReview.rating);
                        setComment(userReview.comment);
                      }
                    }}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    إلغاء
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-xl text-center">
          <p className="text-gray-600 mb-3">
            {isAnonymous 
              ? 'أنت تتصفح كزائر. يجب تسجيل الدخول لإضافة تقييم'
              : 'يجب تسجيل الدخول لإضافة تقييم'
            }
          </p>
          <Link
            href="/login"
            className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            تسجيل الدخول
          </Link>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">
          جميع التقييمات ({reviews.length})
        </h3>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">جاري تحميل التقييمات...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <span className="text-4xl block mb-2">💬</span>
            لا توجد تقييمات بعد. كن أول من يقيّم هذا المنتج!
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`p-4 rounded-xl border ${
                  user && review.userId === user.uid
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        {review.userName}
                      </span>
                      {user && review.userId === user.uid && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                          أنت
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-sm">
                            {star <= review.rating ? '⭐' : '☆'}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
