'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FarmCalculatorPage() {
  // ========== حاسبة تكلفة القطفة ==========
  const [workers, setWorkers] = useState<number | ''>('');
  const [dailyWage, setDailyWage] = useState<number | ''>('');
  const [days, setDays] = useState<number | ''>('');
  const [transportCost, setTransportCost] = useState<number | ''>('');
  const [foodCost, setFoodCost] = useState<number | ''>('');
  const [otherCosts, setOtherCosts] = useState<number | ''>('');
  
  const [harvestResult, setHarvestResult] = useState<{
    laborCost: number;
    additionalCosts: number;
    totalCost: number;
    costPerWorkerPerDay: number;
  } | null>(null);

  // ========== حاسبة ربح الموسم ==========
  const [totalProduction, setTotalProduction] = useState<number | ''>('');
  const [avgSellPrice, setAvgSellPrice] = useState<number | ''>('');
  const [harvestCount, setHarvestCount] = useState<number | ''>('');
  const [avgHarvestCost, setAvgHarvestCost] = useState<number | ''>('');
  const [pesticidesCost, setPesticidesCost] = useState<number | ''>('');
  const [fertilizersCost, setFertilizersCost] = useState<number | ''>('');
  const [irrigationCost, setIrrigationCost] = useState<number | ''>('');
  const [seasonOtherCosts, setSeasonOtherCosts] = useState<number | ''>('');
  const [useHarvestCalcResult, setUseHarvestCalcResult] = useState(false);

  const [seasonResult, setSeasonResult] = useState<{
    totalRevenue: number;
    totalCost: number;
    netProfit: number;
    profitStatus: 'profit' | 'loss' | 'breakeven';
    costPerKg: number;
    breakevenPrice: number;
    highestCostItem: { name: string; value: number };
  } | null>(null);

  // تحديث متوسط تكلفة القطفة من حاسبة القطفة
  useEffect(() => {
    if (useHarvestCalcResult && harvestResult) {
      setAvgHarvestCost(harvestResult.totalCost);
    }
  }, [useHarvestCalcResult, harvestResult]);

  // حساب تكلفة القطفة
  const calculateHarvestCost = () => {
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

    setHarvestResult({
      laborCost,
      additionalCosts,
      totalCost,
      costPerWorkerPerDay
    });
  };

  const resetHarvestCalculator = () => {
    setWorkers('');
    setDailyWage('');
    setDays('');
    setTransportCost('');
    setFoodCost('');
    setOtherCosts('');
    setHarvestResult(null);
  };

  // حساب ربح الموسم
  const calculateSeasonProfit = () => {
    const production = Number(totalProduction) || 0;
    const sellPrice = Number(avgSellPrice) || 0;
    const harvests = Number(harvestCount) || 0;
    const harvestCost = Number(avgHarvestCost) || 0;
    const pesticides = Number(pesticidesCost) || 0;
    const fertilizers = Number(fertilizersCost) || 0;
    const irrigation = Number(irrigationCost) || 0;
    const otherSeasonCosts = Number(seasonOtherCosts) || 0;

    if (production <= 0 || sellPrice <= 0) {
      alert('يرجى إدخال إجمالي الإنتاج ومتوسط سعر البيع');
      return;
    }

    // الإيرادات
    const totalRevenue = production * sellPrice;

    // التكاليف
    const totalHarvestCost = harvests * harvestCost;
    const totalCost = totalHarvestCost + pesticides + fertilizers + irrigation + otherSeasonCosts;

    // صافي الربح
    const netProfit = totalRevenue - totalCost;

    // حالة الربح
    let profitStatus: 'profit' | 'loss' | 'breakeven' = 'breakeven';
    if (netProfit > 0) profitStatus = 'profit';
    else if (netProfit < 0) profitStatus = 'loss';

    // تكلفة الكيلو
    const costPerKg = production > 0 ? totalCost / production : 0;

    // سعر التعادل
    const breakevenPrice = production > 0 ? totalCost / production : 0;

    // أكبر بند تكلفة
    const costItems = [
      { name: 'تكلفة القطفات', value: totalHarvestCost },
      { name: 'المبيدات', value: pesticides },
      { name: 'الأسمدة', value: fertilizers },
      { name: 'الري/الديزل/الماء', value: irrigation },
      { name: 'مصاريف أخرى', value: otherSeasonCosts }
    ];
    const highestCostItem = costItems.reduce((max, item) => 
      item.value > max.value ? item : max, costItems[0]);

    setSeasonResult({
      totalRevenue,
      totalCost,
      netProfit,
      profitStatus,
      costPerKg,
      breakevenPrice,
      highestCostItem
    });
  };

  const resetSeasonCalculator = () => {
    setTotalProduction('');
    setAvgSellPrice('');
    setHarvestCount('');
    setAvgHarvestCost('');
    setPesticidesCost('');
    setFertilizersCost('');
    setIrrigationCost('');
    setSeasonOtherCosts('');
    setUseHarvestCalcResult(false);
    setSeasonResult(null);
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ========== حاسبة تكلفة القطفة ========== */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
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
              onClick={calculateHarvestCost}
              className="flex-1 bg-amber-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>🧮</span>
              احسب التكلفة
            </button>
            <button
              onClick={resetHarvestCalculator}
              className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              مسح
            </button>
          </div>

          {/* نتيجة حاسبة القطفة */}
          {harvestResult && (
            <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-xl p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📊</span>
                نتيجة تكلفة القطفة
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-amber-100">
                  <span className="text-gray-600">تكلفة العمالة:</span>
                  <span className="font-bold text-gray-800">
                    {harvestResult.laborCost.toLocaleString('ar-YE')} ريال
                  </span>
                </div>

                {harvestResult.additionalCosts > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-amber-100">
                    <span className="text-gray-600">التكاليف الإضافية:</span>
                    <span className="font-bold text-gray-800">
                      {harvestResult.additionalCosts.toLocaleString('ar-YE')} ريال
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center py-3 bg-amber-100 rounded-lg px-4">
                  <span className="text-amber-800 font-semibold">إجمالي تكلفة القطفة:</span>
                  <span className="font-bold text-amber-700 text-xl">
                    {harvestResult.totalCost.toLocaleString('ar-YE')} ريال
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========== حاسبة ربح الموسم ========== */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
              💰
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">حاسبة ربح الموسم</h2>
              <p className="text-gray-600 text-sm">احسب صافي ربح أو خسارة موسمك الزراعي</p>
            </div>
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full mr-auto">جديد</span>
          </div>

          {/* الإيرادات */}
          <div className="space-y-4">
            <h3 className="font-semibold text-green-700 border-b border-green-200 pb-2">📈 الإيرادات</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  إجمالي إنتاج الموسم (كجم) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={totalProduction}
                  onChange={(e) => setTotalProduction(e.target.value ? Number(e.target.value) : '')}
                  placeholder="مثال: 500"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  متوسط سعر البيع للكيلو (ريال) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={avgSellPrice}
                  onChange={(e) => setAvgSellPrice(e.target.value ? Number(e.target.value) : '')}
                  placeholder="مثال: 5000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                />
              </div>
            </div>
          </div>

          {/* تكاليف القطفات */}
          <div className="space-y-4 mt-6">
            <h3 className="font-semibold text-amber-700 border-b border-amber-200 pb-2">✂️ تكاليف القطفات</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عدد القطفات في الموسم
                </label>
                <input
                  type="number"
                  min="0"
                  value={harvestCount}
                  onChange={(e) => setHarvestCount(e.target.value ? Number(e.target.value) : '')}
                  placeholder="مثال: 4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  متوسط تكلفة القطفة الواحدة (ريال)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={avgHarvestCost}
                    onChange={(e) => {
                      setAvgHarvestCost(e.target.value ? Number(e.target.value) : '');
                      setUseHarvestCalcResult(false);
                    }}
                    placeholder="مثال: 50000"
                    disabled={useHarvestCalcResult}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg ${useHarvestCalcResult ? 'bg-amber-50' : ''}`}
                  />
                </div>
                {harvestResult && (
                  <label className="flex items-center gap-2 mt-2 text-sm text-amber-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useHarvestCalcResult}
                      onChange={(e) => setUseHarvestCalcResult(e.target.checked)}
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    استخدم نتيجة حاسبة القطفة ({harvestResult.totalCost.toLocaleString('ar-YE')} ريال)
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* التكاليف الأخرى */}
          <div className="space-y-4 mt-6">
            <h3 className="font-semibold text-red-700 border-b border-red-200 pb-2">💸 التكاليف الأخرى</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  إجمالي تكلفة المبيدات (ريال)
                </label>
                <input
                  type="number"
                  min="0"
                  value={pesticidesCost}
                  onChange={(e) => setPesticidesCost(e.target.value ? Number(e.target.value) : '')}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  إجمالي تكلفة الأسمدة (ريال)
                </label>
                <input
                  type="number"
                  min="0"
                  value={fertilizersCost}
                  onChange={(e) => setFertilizersCost(e.target.value ? Number(e.target.value) : '')}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  إجمالي تكلفة الري/الديزل/الماء (ريال)
                </label>
                <input
                  type="number"
                  min="0"
                  value={irrigationCost}
                  onChange={(e) => setIrrigationCost(e.target.value ? Number(e.target.value) : '')}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  مصاريف أخرى (ريال) <span className="text-gray-400 text-xs">(اختياري)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={seasonOtherCosts}
                  onChange={(e) => setSeasonOtherCosts(e.target.value ? Number(e.target.value) : '')}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
                />
              </div>
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={calculateSeasonProfit}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>💰</span>
              احسب ربح الموسم
            </button>
            <button
              onClick={resetSeasonCalculator}
              className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              إعادة تعيين
            </button>
          </div>

          {/* نتيجة ربح الموسم */}
          {seasonResult && (
            <div className={`mt-6 rounded-xl p-5 border-2 ${
              seasonResult.profitStatus === 'profit' 
                ? 'bg-green-50 border-green-300' 
                : seasonResult.profitStatus === 'loss'
                ? 'bg-red-50 border-red-300'
                : 'bg-yellow-50 border-yellow-300'
            }`}>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📊</span>
                نتيجة الموسم
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* إجمالي الإيراد */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">إجمالي الإيراد</div>
                  <div className="text-2xl font-bold text-green-600">
                    {seasonResult.totalRevenue.toLocaleString('ar-YE')} ريال
                  </div>
                </div>

                {/* إجمالي التكلفة */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">إجمالي التكلفة</div>
                  <div className="text-2xl font-bold text-red-600">
                    {seasonResult.totalCost.toLocaleString('ar-YE')} ريال
                  </div>
                </div>
              </div>

              {/* صافي الربح/الخسارة */}
              <div className={`rounded-xl p-5 text-center mb-4 ${
                seasonResult.profitStatus === 'profit' 
                  ? 'bg-green-100' 
                  : seasonResult.profitStatus === 'loss'
                  ? 'bg-red-100'
                  : 'bg-yellow-100'
              }`}>
                <div className="text-lg mb-2">
                  {seasonResult.profitStatus === 'profit' && '🎉 مبروك! أنت رابح'}
                  {seasonResult.profitStatus === 'loss' && '⚠️ للأسف، هناك خسارة'}
                  {seasonResult.profitStatus === 'breakeven' && '⚖️ تعادل (لا ربح ولا خسارة)'}
                </div>
                <div className={`text-4xl font-bold ${
                  seasonResult.profitStatus === 'profit' 
                    ? 'text-green-700' 
                    : seasonResult.profitStatus === 'loss'
                    ? 'text-red-700'
                    : 'text-yellow-700'
                }`}>
                  {seasonResult.profitStatus === 'loss' && '-'}
                  {Math.abs(seasonResult.netProfit).toLocaleString('ar-YE')} ريال
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  صافي {seasonResult.profitStatus === 'profit' ? 'الربح' : seasonResult.profitStatus === 'loss' ? 'الخسارة' : 'النتيجة'}
                </div>
              </div>

              {/* معلومات إضافية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-xs text-gray-500">تكلفة الكيلو للموسم</div>
                  <div className="text-lg font-bold text-gray-800">
                    {seasonResult.costPerKg.toLocaleString('ar-YE', { maximumFractionDigits: 0 })} ريال/كجم
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-xs text-gray-500">سعر التعادل للكيلو</div>
                  <div className="text-lg font-bold text-gray-800">
                    {seasonResult.breakevenPrice.toLocaleString('ar-YE', { maximumFractionDigits: 0 })} ريال/كجم
                  </div>
                </div>
              </div>

              {/* أكبر بند تكلفة */}
              {seasonResult.highestCostItem.value > 0 && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h4 className="font-bold text-amber-800 mb-1">أكبر بند تكلفة</h4>
                      <p className="text-amber-700 text-sm">
                        <strong>{seasonResult.highestCostItem.name}</strong> هو أكبر بند تكلفة في موسمك 
                        ({seasonResult.highestCostItem.value.toLocaleString('ar-YE')} ريال). 
                        {seasonResult.highestCostItem.name === 'تكلفة القطفات' && 
                          ' حاول تقليل عدد أيام القطفة أو البحث عن عمالة بأسعار أفضل.'}
                        {seasonResult.highestCostItem.name === 'المبيدات' && 
                          ' راجع استخدامك للمبيدات وتأكد من الجرعات الصحيحة لتجنب الهدر.'}
                        {seasonResult.highestCostItem.name === 'الأسمدة' && 
                          ' استخدم حاسبة التسميد لتحديد الكميات المناسبة وتجنب الإفراط.'}
                        {seasonResult.highestCostItem.name === 'الري/الديزل/الماء' && 
                          ' فكر في تحسين نظام الري أو استخدام الري بالتنقيط لتوفير المياه والوقود.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* قسم تعليمي */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📚</span>
            لماذا تحسب تكاليف الموسم؟
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
                <li>• اتخاذ قرارات مالية صحيحة</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">📝 مثال عملي</h4>
              <p className="text-blue-700 text-sm leading-relaxed">
                إذا أنتجت 500 كجم وبعت بسعر 5,000 ريال/كجم = <strong>2,500,000 ريال إيراد</strong>
                <br />
                وكانت تكاليفك (قطفات + مبيدات + أسمدة + ري) = <strong>1,800,000 ريال</strong>
                <br />
                <strong>صافي ربحك = 700,000 ريال</strong>
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">❌ خطأ شائع</h4>
              <p className="text-red-700 text-sm leading-relaxed">
                بعض المزارعين يحسبون الإيراد فقط ويظنون أنه ربح! 
                لكن بدون خصم جميع التكاليف (قطفات، مبيدات، أسمدة، ري، نقل) 
                لن تعرف هل أنت رابح فعلاً أم خاسر.
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
              <div className="text-2xl mb-2">🌱</div>
              <h4 className="font-semibold text-gray-600">حاسبة تكلفة السماد</h4>
              <span className="text-xs text-gray-400">قريباً</span>
            </div>
            <div className="bg-white rounded-lg p-4 opacity-60">
              <div className="text-2xl mb-2">❄️</div>
              <h4 className="font-semibold text-gray-600">حاسبة خسارة الصقيع</h4>
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
