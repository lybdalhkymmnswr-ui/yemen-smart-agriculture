'use client';

// AUTH DISABLED: صفحة التسجيل معطلة مؤقتاً
// الكود الأصلي محفوظ في التعليقات للرجوع له لاحقاً

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Feature Flag: تعطيل تسجيل الدخول
const AUTH_ENABLED = false;

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // إعادة التوجيه للصفحة الرئيسية إذا كان التسجيل معطلاً
    if (!AUTH_ENABLED) {
      router.replace('/');
    }
  }, [router]);

  // عرض رسالة مؤقتة أثناء إعادة التوجيه
  if (!AUTH_ENABLED) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 py-12 px-4" dir="rtl">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-6xl">🌱</div>
          <h1 className="text-2xl font-bold text-green-800">
            منصة الزراعة الذكية اليمنية
          </h1>
          <p className="text-gray-600">
            إنشاء حساب غير مطلوب حالياً
          </p>
          <p className="text-sm text-gray-500">
            جميع الميزات متاحة مباشرة بدون حساب
          </p>
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  // الكود الأصلي للتسجيل (معطل حالياً)
  return null;
}

/* 
=== الكود الأصلي محفوظ للرجوع له لاحقاً ===

'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { register, error, clearError, loading } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationError(null);
    
    if (password !== confirmPassword) {
      setValidationError('كلمتا المرور غير متطابقتين');
      return;
    }
    
    if (password.length < 6) {
      setValidationError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    
    if (displayName.trim().length < 2) {
      setValidationError('الاسم يجب أن يكون حرفين على الأقل');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register(email, password, displayName.trim());
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayError = validationError || error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-800">
            🌱 منصة الزراعة الذكية اليمنية
          </h1>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">
            إنشاء حساب جديد
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            انضم إلى مجتمع الزراعة الذكية في اليمن
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
          {displayError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {displayError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                الاسم الكامل
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="أدخل اسمك الكامل"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="example@email.com"
                dir="ltr"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                كلمة المرور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="6 أحرف على الأقل"
                dir="ltr"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                تأكيد كلمة المرور
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="أعد كتابة كلمة المرور"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">لديك حساب بالفعل؟ </span>
            <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
              تسجيل الدخول
            </Link>
          </div>
        </form>

        <div className="text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
*/
