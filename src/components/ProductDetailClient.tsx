'use client';

import Link from 'next/link';
import ProductReviews from './ProductReviews';
import { ProductDocument } from '@/types';

interface ProductDetailClientProps {
  product: ProductDocument;
  productId: string;
}

export default function ProductDetailClient({ product, productId }: ProductDetailClientProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-8 text-sm text-gray-600">
        <Link href="/" className="hover:text-green-600">
          الرئيسية
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-green-600">
          المنتجات
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.title}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-12 flex items-center justify-center min-h-[400px]">
            <span className="text-[120px]">{product.emoji || '🌾'}</span>
          </div>

          {/* Product Info */}
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                {product.category}
              </span>
              {product.registrationStatus === 'allowed' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  مسجل ✓
                </span>
              )}
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                {product.formulation}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
            
            <p className="text-gray-600 mb-6">
              {product.activeIngredient} - {product.concentration} - {product.formulation}
            </p>

            {/* Product Details Table */}
            <div className="border rounded-xl overflow-hidden mb-6">
              <table className="w-full">
                <tbody className="divide-y">
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-600 font-medium">المادة الفعالة</td>
                    <td className="px-4 py-3 text-gray-900">{product.activeIngredient}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600 font-medium">التركيز</td>
                    <td className="px-4 py-3 text-gray-900">{product.concentration}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-600 font-medium">الصيغة</td>
                    <td className="px-4 py-3 text-gray-900">{product.formulation}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-600 font-medium">الشركة المصنعة</td>
                    <td className="px-4 py-3 text-gray-900">{product.company}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-600 font-medium">بلد المنشأ</td>
                    <td className="px-4 py-3 text-gray-900">{product.originCountry}</td>
                  </tr>
                  {product.registrationNumber && (
                    <tr>
                      <td className="px-4 py-3 text-gray-600 font-medium">رقم التسجيل</td>
                      <td className="px-4 py-3 text-gray-900">{product.registrationNumber}</td>
                    </tr>
                  )}
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-600 font-medium">حالة التسجيل</td>
                    <td className="px-4 py-3">
                      {product.registrationStatus === 'allowed' ? (
                        <span className="text-green-600 font-medium">مسموح ✓</span>
                      ) : (
                        <span className="text-red-600 font-medium">غير مسجل</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium">
                طلب عرض سعر
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                إضافة للمفضلة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ProductReviews productId={productId} productName={product.title} />
    </main>
  );
}
