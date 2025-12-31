'use client';

// Unified Search Component
// Global search bar that searches across Products, Articles, and Experts

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { unifiedSearch } from '@/lib/firestore';
import { GroupedSearchResults, SearchResultItem } from '@/types';

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function UnifiedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GroupedSearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search query (300ms)
  const debouncedQuery = useDebounce(query, 300);

  // Perform search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults(null);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const searchResults = await unifiedSearch(debouncedQuery, 5);
        setResults(searchResults);
        setIsOpen(true);
      } catch (err) {
        console.error('Search error:', err);
        setError('حدث خطأ أثناء البحث');
        setResults(null);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }, []);

  // Check if there are any results
  const hasResults = results && (
    results.products.length > 0 ||
    results.articles.length > 0 ||
    results.experts.length > 0
  );

  // Get type label in Arabic
  const getTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      product: 'منتج',
      article: 'مقال',
      expert: 'خبير',
    };
    return labels[type] || type;
  };

  // Get type icon
  const getTypeIcon = (type: string): string => {
    const icons: Record<string, string> = {
      product: '📦',
      article: '📝',
      expert: '👨‍🔬',
    };
    return icons[type] || '🔍';
  };

  // Render search result item
  const renderResultItem = (item: SearchResultItem) => (
    <Link
      key={`${item.type}_${item.refId}`}
      href={item.slugOrPath}
      onClick={() => {
        setIsOpen(false);
        setQuery('');
      }}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
    >
      <span className="text-xl">{getTypeIcon(item.type)}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
        {item.subtitle && (
          <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>
        )}
      </div>
      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
        {getTypeLabel(item.type)}
      </span>
    </Link>
  );

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => hasResults && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="ابحث عن منتج أو مقال أو خبير..."
          className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          dir="rtl"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {error ? (
            <div className="px-4 py-8 text-center text-red-500">
              <p>{error}</p>
            </div>
          ) : !hasResults ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <span className="text-3xl block mb-2">🔍</span>
              <p>لا توجد نتائج لـ &ldquo;{debouncedQuery}&rdquo;</p>
              <p className="text-sm mt-1">جرب كلمات بحث مختلفة</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {/* Products Section */}
              {results.products.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      📦 المنتجات ({results.products.length})
                    </h3>
                  </div>
                  <div>
                    {results.products.map(renderResultItem)}
                  </div>
                </div>
              )}

              {/* Articles Section */}
              {results.articles.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      📝 المقالات ({results.articles.length})
                    </h3>
                  </div>
                  <div>
                    {results.articles.map(renderResultItem)}
                  </div>
                </div>
              )}

              {/* Experts Section */}
              {results.experts.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      👨‍🔬 الخبراء ({results.experts.length})
                    </h3>
                  </div>
                  <div>
                    {results.experts.map(renderResultItem)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
