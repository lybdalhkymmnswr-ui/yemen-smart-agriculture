'use client';

// Farmer Dashboard Page (Phase 1 - Placeholder)
// Full farmer dashboard will be added in Phase 2

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function FarmerDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-green-700">
            🌱 منصة الزراعة الذكية اليمنية
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">مرحباً، {user?.displayName}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <span className="text-6xl block mb-4">🌾</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            لوحة تحكم المزارع
          </h1>
          <p className="text-gray-600 mb-6">
            هذه الصفحة قيد التطوير وستكون متاحة في المرحلة الثانية.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </main>
    </div>
  );
}
