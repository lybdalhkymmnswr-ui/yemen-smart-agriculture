'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FarmCalculatorPage() {
  // مدخلات الحاسبة
  const [workers, setWorkers] = useState<number | ''>('');
  const [dailyWage, setDailyWage] = useState<number | ''>('');
  const [days, setDays] = useState<number | ''>('');
  const [transportCost, setTransportCost] = useState<number | ''>('');
  const [foodCost, setFoodCost] = useState<number | ''>('');
  const [otherCosts, setOtherCosts] = useState<number | ''>('');
  
  // النتيجة
  const [result, setResult] = useState<{
    laborCost: number;
    additionalCosts: number;
    totalCost: number;
    costPerWorkerPerDay: number;
  } | null>(null);

  // حساب التكلفة
  const calculateCost = () => {
    const workersNum = Number(workers) || 0;
    const wageNum = Number(dailyWage) || 0;
    const daysNum = Number(days) || 0;
    const transportNum = Number(transportCost) || 0;
    const foodNum = Number(foodCost) || 0;
    const otherNum = Number(otherCosts) || 0;

    if (workersNum <= 0 || wageNum <= 0 || daysNum <= 0) {
      alert('يرجى إدخال عدد العمال والأجر اليومي وعدد الأيام');
      return;
    }

    const laborCost = workersNum * wageNum * daysNum;
    const additionalCosts = transportNum + foodNum + otherNum;
    const totalCost = laborCost + additionalCosts;
    const costPerWorkerPerDay = totalCost / (workersNum * daysNum);

    setResult({
      laborCost,
      additionalCosts,
      totalCost,
      costPerWorkerPerDay
    });
  };

  // إعادة تعيين
  const resetCalculator = () => {
    setWorkers('');
    setDailyWage('');
    setDays('');
    setTransportCost('');
    setFoodCost('');
    setOtherCosts('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <div className="bg-gradient-to-l from-amber-600 to-amber-700 text-white py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-3">🧮</div>
          <h1 className="text-3xl font-bold mb-3">حِسبة المزرعة</h1>
          <p className="text-lg text-amber-100">
            احسب تكاليف مزرعتك بدقة واتخذ قرارات مالية صحيحة
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* عنوان الحاسبة */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl">
              ✂️
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">حاسبة تكلفة القطفة</h2>
              <p className="text-gray-600 text-sm">احسب إجمالي تكلفة قطفة القات أو أي محصول</p>
            </div>
          </div>

          {/* المدخلات الأساسية */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 border-b pb-2">المدخلات الأساسية</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عدد العمال <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={workers}
                  onChange={(e) => setWorkers(e.target.value ? Number(e.target.value) : '')}
                  placeholder="مثال: 5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الأجر اليومي (ريال) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={dailyWage}
                  onChange={(e) => setDailyWage(e.target.value ? Number(e.target.value) : '')}
                  placeholder="مثال: 3000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عدد الأيام <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={days}
                  onChange={(e) => setDays(e.target.value ? Number(e.target.value) : '')}
                  placeholder="مثال: 3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg"
                />
              </div>
            </div>
          </div>

          {/* التكاليف الإضافية */}
          <div className="space-y-4 mt-6">
            <h3 className="font-semibold text-gray-700 border-b pb-2">
              التكاليف الإضافية <span className="text-gray-400 text-sm font-normal">(اختياري)</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تكلفة النقل (ريال)
                </label>
                <input
                  type="number"
                  min="0"
                  value={transportCost}
                  onChange={(e) => setTransportCost(e.target.value ? Number(e.target.value) : '')}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تكلفة الطعام (ريال)
                </label>
                <input
                  type="number"
                  min="0"
                  value={foodCost}
                  onChange={(e) => setFoodCost(e.target.value ? Number(e.target.value) : '')}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تكاليف أخرى (ريال)
                </label>
                <input
                  type="number"
                  min="0"
                  value={otherCosts}
                  onChange={(e) => setOtherCosts(e.target.value ? Number(e.target.value) : '')}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg"
                />
              </div>
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={calculateCost}
              className="flex-1 bg-amber-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>🧮</span>
              احسب التكلفة
            </button>
            <button
              onClick={resetCalculator}
              className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              مسح
            </button>
          </div>
        </div>

        {/* النتيجة */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-amber-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📊</span>
              نتيجة الحساب
            </h3>

            <div className="space-y-3">
              {/* تكلفة العمالة */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">تكلفة العمالة:</span>
                <span className="font-bold text-gray-800 text-lg">
                  {result.laborCost.toLocaleString('ar-YE')} ريال
                </span>
              </div>

              {/* التكاليف الإضافية */}
              {result.additionalCosts > 0 && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">التكاليف الإضافية:</span>
                  <span className="font-bold text-gray-800 text-lg">
                    {result.additionalCosts.toLocaleString('ar-YE')} ريال
                  </span>
                </div>
              )}

              {/* الإجمالي */}
              <div className="flex justify-between items-center py-4 bg-amber-50 rounded-lg px-4 mt-2">
                <span className="text-amber-800 font-semibold text-lg">إجمالي تكلفة القطفة:</span>
                <span className="font-bold text-amber-700 text-2xl">
                  {result.totalCost.toLocaleString('ar-YE')} ريال
                </span>
              </div>

              {/* متوسط التكلفة */}
              <div className="flex justify-between items-center py-3 text-sm">
                <span className="text-gray-500">متوسط التكلفة لكل عامل/يوم:</span>
                <span className="text-gray-600">
                  {result.costPerWorkerPerDay.toLocaleString('ar-YE', { maximumFractionDigits: 0 })} ريال
                </span>
              </div>
            </div>

            {/* تنبيه توعوي */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="font-bold text-blue-800 mb-1">نصيحة مالية</h4>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    احرص على تسجيل تكاليف كل قطفة لمقارنتها مع الإيرادات. معرفة التكلفة الحقيقية 
                    تساعدك في تحديد سعر البيع المناسب وتجنب الخسارة.
                  </p>
                </div>
              </div>
            </div>

            {/* تحذير */}
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h4 className="font-bold text-amber-800 mb-1">تذكير مهم</h4>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    لا تنسَ احتساب تكاليف المبيدات والأسمدة والري ضمن تكلفة الموسم الكلية، 
                    وليس فقط تكلفة القطفة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* قسم تعليمي */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📚</span>
            لماذا تحسب تكلفة القطفة؟
          </h3>

          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">✅ سبب الأهمية</h4>
              <p className="text-green-700 text-sm leading-relaxed">
                كثير من المزارعين يبيعون محصولهم بدون معرفة التكلفة الحقيقية، 
                وقد يخسرون بدون أن يشعروا. حساب التكلفة يساعدك في:
              </p>
              <ul className="text-green-700 text-sm mt-2 space-y-1 mr-4">
                <li>• تحديد الحد الأدنى لسعر البيع</li>
                <li>• معرفة هامش الربح الحقيقي</li>
                <li>• مقارنة تكاليف المواسم المختلفة</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">📝 مثال عملي</h4>
              <p className="text-blue-700 text-sm leading-relaxed">
                إذا كان لديك 5 عمال بأجر 3,000 ريال/يوم لمدة 3 أيام:
                <br />
                <strong>تكلفة العمالة = 5 × 3,000 × 3 = 45,000 ريال</strong>
                <br />
                أضف تكاليف النقل والطعام للحصول على التكلفة الكاملة.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">❌ خطأ شائع</h4>
              <p className="text-red-700 text-sm leading-relaxed">
                بعض المزارعين يحسبون أجور العمال فقط وينسون تكاليف النقل والطعام 
                والمصاريف الصغيرة التي تتراكم وتؤثر على الربح النهائي.
              </p>
            </div>
          </div>
        </div>

        {/* الحاسبات القادمة */}
        <div className="bg-gray-100 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span>🔜</span>
            حاسبات قادمة
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-4 opacity-60">
              <div className="text-2xl mb-2">💰</div>
              <h4 className="font-semibold text-gray-600">حاسبة ربح الموسم</h4>
              <span className="text-xs text-gray-400">قريباً</span>
            </div>
            <div className="bg-white rounded-lg p-4 opacity-60">
              <div className="text-2xl mb-2">🌱</div>
              <h4 className="font-semibold text-gray-600">حاسبة تكلفة السماد</h4>
              <span className="text-xs text-gray-400">قريباً</span>
            </div>
            <div className="bg-white rounded-lg p-4 opacity-60">
              <div className="text-2xl mb-2">❄️</div>
              <h4 className="font-semibold text-gray-600">حاسبة خسارة الصقيع</h4>
              <span className="text-xs text-gray-400">قريباً</span>
            </div>
            <div className="bg-white rounded-lg p-4 opacity-60">
              <div className="text-2xl mb-2">💧</div>
              <h4 className="font-semibold text-gray-600">حاسبة تكلفة الري</h4>
              <span className="text-xs text-gray-400">قريباً</span>
            </div>
          </div>
        </div>

        {/* روابط مفيدة */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-3">أدوات أخرى قد تفيدك:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href="/fertilizer-calculator"
              className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm hover:bg-green-200 transition-colors"
            >
              🌱 حاسبة التسميد
            </Link>
            <Link 
              href="/irrigation-calculator"
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors"
            >
              💧 حاسبة الري
            </Link>
            <Link 
              href="/library"
              className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm hover:bg-purple-200 transition-colors"
            >
              📚 المكتبة الزراعية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
