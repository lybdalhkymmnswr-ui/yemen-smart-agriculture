'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
// AUTH DISABLED: الكود محفوظ للرجوع له لاحقاً
// import { useAuth } from '@/contexts/AuthContext';

// Feature Flag: تعطيل تسجيل الدخول
const AUTH_ENABLED = false;

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { t, language } = useLanguage();
  
  // AUTH DISABLED: الكود محفوظ للرجوع له لاحقاً
  // const { user, logout, loading } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // AUTH DISABLED: الكود محفوظ للرجوع له لاحقاً
  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   }
  // };

  return (
    <header className="bg-beige shadow-sm sticky top-0 z-50 border-b border-soil/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - الشعار الجديد */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image 
              src="/logo-knowledge-tree.webp"
              priority={true} 
              alt={language === 'ar' ? 'شجرة المعرفة الزراعية' : 'Agricultural Knowledge Tree'} 
              width={40} 
              height={40}
              className="w-10 h-10"
            />
            <span className="text-lg font-bold text-soil hidden sm:inline font-cairo">
              {language === 'ar' ? 'الزراعة الذكية' : 'Smart Agriculture'}
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'ابحث عن مقال أو دليل زراعي...' : 'Search for articles or guides...'}
                className="w-full px-4 py-2 pr-10 text-sm border border-soil/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-growth focus:border-growth bg-white font-noto"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-soil/60 hover:text-growth"
                aria-label={language === 'ar' ? 'بحث' : 'Search'}
              >
                <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/library" className="text-growth hover:text-growth-dark transition-colors text-sm font-medium font-cairo">
              {t.nav.library}
            </Link>
            <Link href="/calculator" className="text-growth hover:text-growth-dark transition-colors text-sm font-medium font-cairo">
              {t.nav.calculator}
            </Link>
            <Link href="/fertilizer-calculator" className="text-growth hover:text-growth-dark transition-colors text-sm font-medium font-cairo">
              {t.nav.fertilizerCalc}
            </Link>
            <Link href="/soil-types" className="text-soil hover:text-soil-dark transition-colors text-sm font-medium font-cairo">
              {t.nav.soilTypes}
            </Link>
            <Link href="/mobeed-alyawm" className="text-growth hover:text-growth-dark transition-colors text-sm font-medium font-cairo">
              🧪 {t.nav.mobeedAlyawm}
            </Link>
            <Link href="/farm-alert" className="text-orange-600 hover:text-orange-700 transition-colors text-sm font-medium font-cairo">
              🌡️ {t.nav.farmAlert}
            </Link>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* AUTH DISABLED: أزرار تسجيل الدخول مخفية - الكود محفوظ للرجوع له لاحقاً */}
            {AUTH_ENABLED && (
              <>
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-sm text-growth border border-growth rounded-lg hover:bg-growth/5 transition-colors font-cairo"
                >
                  دخول
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-1.5 text-sm bg-growth text-white rounded-lg hover:bg-growth-dark transition-colors font-cairo"
                >
                  تسجيل
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-soil"
            aria-label={isMobileMenuOpen ? (language === 'ar' ? 'إغلاق القائمة' : 'Close menu') : (language === 'ar' ? 'فتح القائمة' : 'Open menu')}
            aria-expanded={isMobileMenuOpen}
          >
            <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="md:hidden mt-4 pb-4 border-t border-soil/10 pt-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'ar' ? 'ابحث...' : 'Search...'}
                  className="w-full px-4 py-2 pr-10 text-sm border border-soil/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-growth bg-white font-noto"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-soil/60"
                  aria-label={language === 'ar' ? 'بحث' : 'Search'}
                >
                  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-2">
              <Link
                href="/library"
                className="px-4 py-2 text-growth hover:bg-growth/5 rounded-lg font-medium font-cairo"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.library}
              </Link>
              <Link
                href="/calculator"
                className="px-4 py-2 text-growth hover:bg-growth/5 rounded-lg font-medium font-cairo"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.calculator}
              </Link>
              <Link
                href="/fertilizer-calculator"
                className="px-4 py-2 text-growth hover:bg-growth/5 rounded-lg font-medium font-cairo"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.fertilizerCalc}
              </Link>
              <Link
                href="/soil-types"
                className="px-4 py-2 text-soil hover:bg-soil/5 rounded-lg font-medium font-cairo"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.soilTypes}
              </Link>
              <Link
                href="/mobeed-alyawm"
                className="px-4 py-2 text-growth hover:bg-growth/5 rounded-lg font-medium font-cairo"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🧪 {t.nav.mobeedAlyawm}
              </Link>
              <Link
                href="/farm-alert"
                className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg font-medium font-cairo"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🌡️ {t.nav.farmAlert}
              </Link>
              
              {/* Language Switcher - Mobile */}
              <div className="px-4 py-2">
                <LanguageSwitcher />
              </div>
              
              {/* AUTH DISABLED: أزرار تسجيل الدخول مخفية - الكود محفوظ للرجوع له لاحقاً */}
              {AUTH_ENABLED && (
                <div className="flex gap-2 mt-2">
                  <Link
                    href="/login"
                    className="flex-1 text-center px-4 py-2 text-growth border border-growth rounded-lg font-cairo"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    دخول
                  </Link>
                  <Link
                    href="/register"
                    className="flex-1 text-center px-4 py-2 bg-growth text-white rounded-lg font-cairo"
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
