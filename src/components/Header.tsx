'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">🌱</span>
            <span className="text-lg font-bold text-green-800 hidden sm:inline">الزراعة الذكية</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن منتج أو مقال أو خبير..."
                className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-green-600"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/products" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
              المنتجات
            </Link>
            <Link href="/articles" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
              المقالات
            </Link>
            <Link href="/experts" className="text-gray-600 hover:text-green-600 transition-colors text-sm">
              الخبراء
            </Link>
            <Link href="/soil-types" className="text-amber-600 hover:text-amber-700 transition-colors text-sm font-medium">
              دليل التربة
            </Link>
            
            {loading ? (
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
            ) : user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">
                  مرحباً، {user.displayName || 'مستخدم'}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  خروج
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  دخول
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  تسجيل
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث..."
                  className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-2">
              <Link
                href="/products"
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                المنتجات
              </Link>
              <Link
                href="/articles"
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                المقالات
              </Link>
              <Link
                href="/experts"
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                الخبراء
              </Link>
              <Link
                href="/soil-types"
                className="px-4 py-2 text-amber-600 hover:bg-amber-50 rounded-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                دليل التربة
              </Link>
              
              {loading ? (
                <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg mt-2"></div>
              ) : user ? (
                <div className="mt-2 space-y-2">
                  <div className="px-4 py-2 text-gray-700 bg-gray-50 rounded-lg">
                    مرحباً، {user.displayName || 'مستخدم'}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-red-600 border border-red-600 rounded-lg"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 mt-2">
                  <Link
                    href="/login"
                    className="flex-1 text-center px-4 py-2 text-green-600 border border-green-600 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    دخول
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 text-center px-4 py-2 bg-green-600 text-white rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    تسجيل
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
