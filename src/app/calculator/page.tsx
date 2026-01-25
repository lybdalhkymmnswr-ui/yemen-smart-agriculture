'use client';

// Smart Irrigation Calculator with ET0/Kc methodology
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';

// معاملات المحاصيل (Kc) - قيم علمية معتمدة من FAO
const cropCoefficients: Record<string, { kc: number; nameAr: string; nameEn: string }> = {
  qat: { kc: 0.85, nameAr: 'قات', nameEn: 'Qat' },
  coffee: { kc: 0.95, nameAr: 'بن', nameEn: 'Coffee' },
  vegetables: { kc: 1.05, nameAr: 'خضروات', nameEn: 'Vegetables' },
  fruits: { kc: 0.90, nameAr: 'فواكه', nameEn: 'Fruits' },
  grains: { kc: 1.15, nameAr: 'حبوب', nameEn: 'Grains' },
  citrus: { kc: 0.70, nameAr: 'حمضيات', nameEn: 'Citrus' },
};

// معامل كفاءة نظام الري
const irrigationEfficiency: Record<string, { efficiency: number; nameAr: string; nameEn: string }> = {
  drip: { efficiency: 0.90, nameAr: 'تنقيط', nameEn: 'Drip' },
  sprinkler: { efficiency: 0.75, nameAr: 'رش', nameEn: 'Sprinkler' },
  flood: { efficiency: 0.50, nameAr: 'غمر', nameEn: 'Flood' },
};

// حساب ET0 باستخدام معادلة Hargreaves المبسطة
function calculateET0(tempMax: number, tempMin: number): number {
  const tempMean = (tempMax + tempMin) / 2;
  const Ra = 15; // الإشعاع الشمسي التقريبي لليمن (MJ/m²/day)
  const ET0 = 0.0023 * (tempMean + 17.8) * Math.sqrt(tempMax - tempMin) * Ra * 0.408;
  return Math.max(ET0, 2); // الحد الأدنى 2 مم/يوم
}

export default function CalculatorPage() {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  // حالة النموذج
  const [cropType, setCropType] = useState<string>('');
  const [irrigationType, setIrrigationType] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [treeCount, setTreeCount] = useState<string>('');
  const [tempMax, setTempMax] = useState<string>('35');
  const [tempMin, setTempMin] = useState<string>('20');
  const [calculationType, setCalculationType] = useState<'area' | 'trees'>('area');
  
  // حالة النتيجة
  const [result, setResult] = useState<{
    waterPerDay: number;
    waterPerTree?: number;
    et0: number;
    etc: number;
  } | null>(null);

  // حساب كمية المياه
  const calculateWater = () => {
    if (!cropType || !irrigationType) return;
    
    const maxT = parseFloat(tempMax) || 35;
    const minT = parseFloat(tempMin) || 20;
    const areaValue = parseFloat(area) || 0;
    const trees = parseInt(treeCount) || 0;
    
    // حساب ET0 (التبخر-نتح المرجعي)
    const et0 = calculateET0(maxT, minT);
    
    // حساب ETc (التبخر-نتح للمحصول)
    const kc = cropCoefficients[cropType]?.kc || 1;
    const etc = et0 * kc;
    
    // حساب كمية المياه مع مراعاة كفاءة نظام الري
    const efficiency = irrigationEfficiency[irrigationType]?.efficiency || 0.7;
    
    if (calculationType === 'area' && areaValue > 0) {
      // لتر/متر مربع/يوم = ETc (مم) × 1 (لتر/متر²/مم) ÷ كفاءة الري
      const waterPerSqm = etc / efficiency;
      const totalWater = waterPerSqm * areaValue;
      
      setResult({
        waterPerDay: Math.round(totalWater),
        et0: Math.round(et0 * 10) / 10,
        etc: Math.round(etc * 10) / 10,
      });
    } else if (calculationType === 'trees' && trees > 0) {
      // لتر/شجرة/يوم = ETc × مساحة ظل الشجرة (تقريباً 4 م²) ÷ كفاءة الري
      const canopyArea = 4; // متوسط مساحة ظل الشجرة
      const waterPerTree = (etc * canopyArea) / efficiency;
      const totalWater = waterPerTree * trees;
      
      setResult({
        waterPerDay: Math.round(totalWater),
        waterPerTree: Math.round(waterPerTree * 10) / 10,
        et0: Math.round(et0 * 10) / 10,
        etc: Math.round(etc * 10) / 10,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-beige to-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* العنوان */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-soil mb-2 font-cairo">
            {isArabic ? '💧 حاسبة الري الذكية' : '💧 Smart Irrigation Calculator'}
          </h1>
          <p className="text-soil/70 font-noto">
            {isArabic 
              ? 'احسب كمية المياه المطلوبة لمحصولك بناءً على معادلة ET0/Kc العلمية'
              : 'Calculate water requirements based on scientific ET0/Kc methodology'}
          </p>
        </div>

        {/* النموذج */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {/* نوع الحساب */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-soil mb-2 font-cairo">
              {isArabic ? 'طريقة الحساب' : 'Calculation Method'}
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setCalculationType('area')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all font-cairo ${
                  calculationType === 'area'
                    ? 'border-growth bg-growth/10 text-growth'
                    : 'border-soil/20 text-soil/70 hover:border-growth/50'
                }`}
              >
                {isArabic ? '📐 حسب المساحة' : '📐 By Area'}
              </button>
              <button
                onClick={() => setCalculationType('trees')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all font-cairo ${
                  calculationType === 'trees'
                    ? 'border-growth bg-growth/10 text-growth'
                    : 'border-soil/20 text-soil/70 hover:border-growth/50'
                }`}
              >
                {isArabic ? '🌳 حسب عدد الأشجار' : '🌳 By Tree Count'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* نوع المحصول */}
            <div>
              <label className="block text-sm font-medium text-soil mb-2 font-cairo">
                {isArabic ? 'نوع المحصول' : 'Crop Type'} *
              </label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full p-3 border border-soil/20 rounded-lg focus:ring-2 focus:ring-growth focus:border-growth font-noto"
                aria-label={isArabic ? 'اختر نوع المحصول' : 'Select crop type'}
              >
                <option value="">{isArabic ? '-- اختر المحصول --' : '-- Select Crop --'}</option>
                {Object.entries(cropCoefficients).map(([key, value]) => (
                  <option key={key} value={key}>
                    {isArabic ? value.nameAr : value.nameEn} (Kc: {value.kc})
                  </option>
                ))}
              </select>
            </div>

            {/* نظام الري */}
            <div>
              <label className="block text-sm font-medium text-soil mb-2 font-cairo">
                {isArabic ? 'نظام الري' : 'Irrigation System'} *
              </label>
              <select
                value={irrigationType}
                onChange={(e) => setIrrigationType(e.target.value)}
                className="w-full p-3 border border-soil/20 rounded-lg focus:ring-2 focus:ring-growth focus:border-growth font-noto"
                aria-label={isArabic ? 'اختر نظام الري' : 'Select irrigation system'}
              >
                <option value="">{isArabic ? '-- اختر النظام --' : '-- Select System --'}</option>
                {Object.entries(irrigationEfficiency).map(([key, value]) => (
                  <option key={key} value={key}>
                    {isArabic ? value.nameAr : value.nameEn} ({Math.round(value.efficiency * 100)}% {isArabic ? 'كفاءة' : 'efficiency'})
                  </option>
                ))}
              </select>
            </div>

            {/* المساحة أو عدد الأشجار */}
            {calculationType === 'area' ? (
              <div>
                <label className="block text-sm font-medium text-soil mb-2 font-cairo">
                  {isArabic ? 'المساحة (متر مربع)' : 'Area (square meters)'} *
                </label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder={isArabic ? 'مثال: 1000' : 'e.g., 1000'}
                  className="w-full p-3 border border-soil/20 rounded-lg focus:ring-2 focus:ring-growth focus:border-growth font-noto"
                  min="1"
                  aria-label={isArabic ? 'أدخل المساحة' : 'Enter area'}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-soil mb-2 font-cairo">
                  {isArabic ? 'عدد الأشجار' : 'Number of Trees'} *
                </label>
                <input
                  type="number"
                  value={treeCount}
                  onChange={(e) => setTreeCount(e.target.value)}
                  placeholder={isArabic ? 'مثال: 50' : 'e.g., 50'}
                  className="w-full p-3 border border-soil/20 rounded-lg focus:ring-2 focus:ring-growth focus:border-growth font-noto"
                  min="1"
                  aria-label={isArabic ? 'أدخل عدد الأشجار' : 'Enter tree count'}
                />
              </div>
            )}

            {/* درجة الحرارة */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-soil mb-2 font-cairo">
                  {isArabic ? 'أعلى درجة حرارة (°م)' : 'Max Temperature (°C)'}
                </label>
                <input
                  type="number"
                  value={tempMax}
                  onChange={(e) => setTempMax(e.target.value)}
                  className="w-full p-3 border border-soil/20 rounded-lg focus:ring-2 focus:ring-growth focus:border-growth font-noto"
                  min="0"
                  max="50"
                  aria-label={isArabic ? 'أعلى درجة حرارة' : 'Maximum temperature'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-soil mb-2 font-cairo">
                  {isArabic ? 'أدنى درجة حرارة (°م)' : 'Min Temperature (°C)'}
                </label>
                <input
                  type="number"
                  value={tempMin}
                  onChange={(e) => setTempMin(e.target.value)}
                  className="w-full p-3 border border-soil/20 rounded-lg focus:ring-2 focus:ring-growth focus:border-growth font-noto"
                  min="0"
                  max="50"
                  aria-label={isArabic ? 'أدنى درجة حرارة' : 'Minimum temperature'}
                />
              </div>
            </div>
          </div>

          {/* زر الحساب */}
          <button
            onClick={calculateWater}
            disabled={!cropType || !irrigationType || (calculationType === 'area' ? !area : !treeCount)}
            className="w-full mt-6 py-4 bg-growth text-white rounded-lg font-bold text-lg hover:bg-growth-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-cairo"
          >
            {isArabic ? '🧮 احسب كمية المياه' : '🧮 Calculate Water'}
          </button>
        </div>

        {/* النتيجة */}
        {result && (
          <div className="bg-gradient-to-br from-growth/10 to-growth/5 rounded-2xl shadow-lg p-6 border-2 border-growth/20">
            <h2 className="text-xl font-bold text-growth mb-4 font-cairo text-center">
              {isArabic ? '📊 نتيجة الحساب' : '📊 Calculation Result'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* كمية المياه الإجمالية */}
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-4xl font-bold text-growth mb-1">
                  {result.waterPerDay.toLocaleString()}
                </div>
                <div className="text-soil/70 font-noto">
                  {isArabic ? 'لتر/يوم' : 'liters/day'}
                </div>
              </div>
              
              {/* كمية المياه لكل شجرة */}
              {result.waterPerTree && (
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-4xl font-bold text-soil mb-1">
                    {result.waterPerTree}
                  </div>
                  <div className="text-soil/70 font-noto">
                    {isArabic ? 'لتر/شجرة/يوم' : 'liters/tree/day'}
                  </div>
                </div>
              )}
            </div>

            {/* التفاصيل العلمية */}
            <div className="bg-white/50 rounded-xl p-4">
              <h3 className="font-bold text-soil mb-2 font-cairo">
                {isArabic ? '📐 التفاصيل العلمية:' : '📐 Scientific Details:'}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm font-noto">
                <div className="text-soil/70">
                  {isArabic ? 'التبخر-نتح المرجعي (ET0):' : 'Reference ET (ET0):'}
                </div>
                <div className="font-medium">{result.et0} {isArabic ? 'مم/يوم' : 'mm/day'}</div>
                
                <div className="text-soil/70">
                  {isArabic ? 'التبخر-نتح للمحصول (ETc):' : 'Crop ET (ETc):'}
                </div>
                <div className="font-medium">{result.etc} {isArabic ? 'مم/يوم' : 'mm/day'}</div>
                
                <div className="text-soil/70">
                  {isArabic ? 'معامل المحصول (Kc):' : 'Crop Coefficient (Kc):'}
                </div>
                <div className="font-medium">{cropCoefficients[cropType]?.kc || '-'}</div>
                
                <div className="text-soil/70">
                  {isArabic ? 'كفاءة نظام الري:' : 'Irrigation Efficiency:'}
                </div>
                <div className="font-medium">{Math.round((irrigationEfficiency[irrigationType]?.efficiency || 0) * 100)}%</div>
              </div>
            </div>

            {/* نصيحة */}
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-amber-800 text-sm font-noto">
                💡 {isArabic 
                  ? 'هذه القيم تقديرية. راقب حالة النباتات واضبط الري حسب الحاجة. في الأيام الحارة جداً قد تحتاج زيادة 20-30%.'
                  : 'These values are estimates. Monitor plant condition and adjust irrigation as needed. On very hot days, you may need to increase by 20-30%.'}
              </p>
            </div>
          </div>
        )}

        {/* روابط مفيدة */}
        <div className="mt-8 text-center">
          <Link 
            href="/fertilizer-calculator" 
            className="inline-flex items-center gap-2 text-growth hover:text-growth-dark font-medium font-cairo"
          >
            {isArabic ? '🧪 حاسبة الأسمدة NPK' : '🧪 NPK Fertilizer Calculator'}
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
