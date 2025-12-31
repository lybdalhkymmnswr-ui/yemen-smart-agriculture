'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import ProductDetailClient from '@/components/ProductDetailClient';
import { getProduct } from '@/lib/firestore';
import { ProductDocument } from '@/types';
import { pesticides } from '@/data/pesticides';

export default function ProductPage() {
  const params = useParams();
  const productId = params.productId as string;
  const [product, setProduct] = useState<ProductDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, try to find product in local data (by slug like pesticide-1)
        const localProduct = pesticides.find(p => p.slug === productId || p.id === productId);
        
        if (localProduct) {
          // Convert local product to ProductDocument format
          const productData = {
            title: localProduct.name,
            slug: localProduct.slug,
            category: localProduct.category,
            activeIngredient: localProduct.activeIngredient,
            concentration: localProduct.concentration,
            formulation: localProduct.formulation,
            company: localProduct.company,
            originCountry: localProduct.country,
            registrationStatus: localProduct.registrationStatus as 'allowed' | 'not_allowed' | undefined,
            registrationNumber: localProduct.registrationNumber,
            description: localProduct.description,
            ratingAvg: 0,
            ratingCount: 0,
          } as ProductDocument;
          setProduct(productData);
          return;
        }
        
        // If not found locally, try Firestore (for product_001 format)
        const firestoreProduct = await getProduct(productId);
        
        if (firestoreProduct) {
          setProduct(firestoreProduct);
          return;
        }
        
        // Product not found anywhere
        setError('المنتج غير موجود');
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('حدث خطأ في تحميل المنتج');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header />
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري تحميل المنتج...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header />
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error || 'المنتج غير موجود'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <ProductDetailClient product={product} productId={productId} />
    </div>
  );
}
