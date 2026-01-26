'use client';

import { useState } from 'react';
import Header from '@/components/Header';

// ثوابت حاسبة الري اليمنية
const SOIL_TYPES = {
  'طينية ثقيلة': { waterFactor: 0.7, retentionDays: 10, warning: 'تربة ثقيلة - لا تغمر الماء' },
  'طينية': { waterFactor: 0.8, retentionDays: 8, warning: 'تربة طينية - ري متوسط' },
  'متوسطة': { waterFactor: 1.0, retentionDays: 6, warning: 'تربة متوسطة - ري عادي' },
  'رملية': { waterFactor: 1.3, retentionDays: 4, warning: 'تربة رملية - ري متكرر' },
  'جبلية': { waterFactor: 0.9, retentionDays: 7, warning: 'أرضك جبلية – ري عادي، لا تطول' },
  'مختلطة': { waterFactor: 1.0, retentionDays: 6, warning: 'تربة مختلطة - راقب الرطوبة' },
};

const TREE_AGES = {
  'صغيرة': { waterMultiplier: 0.6, label: 'صغيرة (1-3 سنوات)' },
  'متوسطة': { waterMultiplier: 0.85, label: 'متوسطة (3-7 سنوات)' },
  'كبيرة': { waterMultiplier: 1.0, label: 'كبيرة (أكثر من 7 سنوات)' },
};

const IRRIGATION_TYPES = {
  'تنقيط': { efficiency: 0.90, duration: 30, label: 'تنقيط' },
  'رش': { efficiency: 0.75, duration: 20, label: 'رش' },
  'غمر': { efficiency: 0.50, duration: 45, label: 'غمر' },
  'خريري': { efficiency: 0.60, duration: 35, label: 'خريري (تقليدي)' },
};

const SEASONS = {
  'صيف': { waterFactor: 1.4, irrigationDays: 5, optimalTime: '5:30 صباحاً', warning: 'الصيف الحار – خفف الري شوية' },
  'شتاء': { waterFactor: 0.6, irrigationDays: 12, optimalTime: '9:00 صباحاً', warning: 'الشتاء – قلل الري' },
  'ربيع': { waterFactor: 1.0, irrigationDays: 7, optimalTime: '6:30 صباحاً', warning: 'الربيع – ري معتدل' },
  'خريف': { waterFactor: 0.8, irrigationDays: 9, optimalTime: '7:00 صباحاً', warning: 'الخريف – ري متوسط' },
};

// حساب عدد الأشجار بالمعادلة اليمنية
function calculateTrees(length: number, width: number, plots: number): number {
  // المعادلة اليمنية: الملاتلا × التيلام × عدد الجربات
  const malatlaa = Math.floor(length / 1.5);
  const tilam = Math.floor(width / 2);
  return malatlaa * tilam * plots;
}

// حساب كمية الماء
function calculateWater(
  trees: number,
  soilType: string,
  treeAge: string,
  irrigationType: string,
  season: string
): {
  waterPerIrrigation: number;
  duration: number;
  irrigationsPerMonth: number;
  irrigationInterval: number;
  optimalTime: string;
  soilWarning: string;
  seasonWarning: string;
} {
  const soil = SOIL_TYPES[soilType as keyof typeof SOIL_TYPES] || SOIL_TYPES['متوسطة'];
  const age = TREE_AGES[treeAge as keyof typeof TREE_AGES] || TREE_AGES['متوسطة'];
  const irrigation = IRRIGATION_TYPES[irrigationType as keyof typeof IRRIGATION_TYPES] || IRRIGATION_TYPES['تنقيط'];
  const seasonData = SEASONS[season as keyof typeof SEASONS] || SEASONS['صيف'];

  // الكمية الأساسية: 5 لتر لكل شجرة كبيرة في ظروف عادية
  const baseWaterPerTree = 5;
  
  // حساب الكمية الفعلية
  const waterPerTree = baseWaterPerTree * soil.waterFactor * age.waterMultiplier * seasonData.waterFactor / irrigation.efficiency;
  const waterPerIrrigation = Math.round(waterPerTree * trees);
  
  // حساب الفترة بين الريات
  const irrigationInterval = Math.round((soil.retentionDays + seasonData.irrigationDays) / 2);
  const irrigationsPerMonth = Math.round(30 / irrigationInterval);
  
  // مدة الري
  const duration = irrigation.duration;

  return {
    waterPerIrrigation,
    duration,
    irrigationsPerMonth,
    irrigationInterval,
    optimalTime: seasonData.optimalTime,
    soilWarning: soil.warning,
    seasonWarning: seasonData.warning,
  };
}

interface IrrigationResult {
  trees: number;
  area: number;
  waterPerIrrigation: number;
  duration: number;
  irrigationsPerMonth: number;
  irrigationInterval: number;
  optimalTime: string;
  soilWarning: string;
  seasonWarning: string;
  waterPerSqm: number;
  waterPerTree: number;
}

export default function CalculatorPage() {
  // حالة المدخلات
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(5);
  const [plots, setPlots] = useState<number>(1);
  const [soilType, setSoilType] = useState<string>('متوسطة');
  const [treeAge, setTreeAge] = useState<string>('متوسطة');
  const [irrigationType, setIrrigationType] = useState<string>('تنقيط');
  const [season, setSeason] = useState<string>('صيف');
  
  // حالة النتائج
  const [results, setResults] = useState<IrrigationResult | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  // حساب الري
  const handleCalculate = () => {
    const trees = calculateTrees(length, width, plots);
    const area = length * width * plots;
    const irrigationData = calculateWater(trees, soilType, treeAge, irrigationType, season);
    
    setResults({
      trees,
      area,
      ...irrigationData,
      waterPerSqm: Math.round((irrigationData.waterPerIrrigation / area) * 10) / 10,
      waterPerTree: Math.round((irrigationData.waterPerIrrigation / trees) * 10) / 10,
    });
    setShowDetails(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white" dir="rtl">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* العنوان */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">حاسبة الري</h1>
          <p className="text-gray-600 text-sm">احسب كمية الماء المناسبة لمزرعتك بالطريقة اليمنية</p>
        </div>

        {/* نموذج المدخلات */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4 text-right">أدخل بيانات مزرعتك</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            {/* طول الجربة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">طول الجربة (متر)</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border-2 border-dashed border-red-300 rounded-lg text-center text-lg focus:border-green-500 focus:outline-none"
                min="1"
              />
            </div>
            
            {/* عرض الجربة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">عرض الجربة (متر)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border-2 border-dashed border-orange-300 rounded-lg text-center text-lg focus:border-green-500 focus:outline-none"
                min="1"
              />
            </div>
            
            {/* عدد الجربات */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">عدد الجربات</label>
              <input
                type="number"
                value={plots}
                onChange={(e) => setPlots(Number(e.target.value) || 1)}
                className="w-full px-3 py-2 border-2 border-dashed border-green-300 rounded-lg text-center text-lg focus:border-green-500 focus:outline-none"
                min="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* نوع التربة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">نوع التربة</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3 py-2 border-2 border-dashed border-red-300 rounded-lg focus:border-green-500 focus:outline-none"
              >
                {Object.keys(SOIL_TYPES).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {/* عمر الأشجار */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">عمر الأشجار</label>
              <select
                value={treeAge}
                onChange={(e) => setTreeAge(e.target.value)}
                className="w-full px-3 py-2 border-2 border-dashed border-orange-300 rounded-lg focus:border-green-500 focus:outline-none"
              >
                {Object.entries(TREE_AGES).map(([key, value]) => (
                  <option key={key} value={key}>{value.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* نوع الري */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">نوع الري</label>
              <select
                value={irrigationType}
                onChange={(e) => setIrrigationType(e.target.value)}
                className="w-full px-3 py-2 border-2 border-dashed border-green-300 rounded-lg focus:border-green-500 focus:outline-none"
              >
                {Object.entries(IRRIGATION_TYPES).map(([key, value]) => (
                  <option key={key} value={key}>{value.label}</option>
                ))}
              </select>
            </div>
            
            {/* الموسم */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">الموسم</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-3 py-2 border-2 border-dashed border-yellow-300 rounded-lg focus:border-green-500 focus:outline-none"
              >
                {Object.keys(SEASONS).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* زر احسب */}
          <button
            onClick={handleCalculate}
            className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors text-lg"
          >
            احسب كمية الماء
          </button>
        </div>

        {/* النتائج - تظهر فوراً تحت الزر */}
        {results && (
          <>
            {/* النتيجة المختصرة */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 mb-3">
              <div className="text-center mb-3">
                <span className="text-green-600 font-bold text-lg">✅ جدول الري لـ {results.trees} شجرة قات</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-gray-700">
                <span className="flex items-center gap-1">
                  <span className="text-blue-500">💧</span>
                  <span>كل رية: <strong>{results.waterPerIrrigation}</strong> لتر لمدة <strong>{results.duration}</strong> دقيقة</span>
                </span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-gray-700 mt-2">
                <span className="flex items-center gap-1">
                  <span className="text-red-400">⏰</span>
                  <span><strong>{results.irrigationsPerMonth}</strong> ريات هذا الشهر (كل <strong>{results.irrigationInterval}</strong> أيام)</span>
                </span>
              </div>
              
              <div className="flex justify-center mt-2">
                <span className="flex items-center gap-1 text-gray-700">
                  <span>🕐</span>
                  <span>الوقت الأمثل: <strong>{results.optimalTime}</strong></span>
                </span>
              </div>
            </div>

            {/* منبه الري */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 mb-3 text-center">
              <span className="text-blue-700">💧 <strong>سقي فوراً خلال 30 دقيقة</strong> بعد التسميد</span>
              <div className="text-blue-600 text-sm mt-1">ري متوسط (كل {results.irrigationInterval} أيام)</div>
            </div>

            {/* تحذيرات التربة والموسم */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-3 mb-3">
              <div className="text-yellow-800 mb-2">
                <span>⚠️</span> {results.soilWarning}
              </div>
              <div className="text-yellow-800 mb-2">
                <span>☀️</span> {results.seasonWarning}
              </div>
              <div className="text-yellow-800 font-bold">
                <span>⚠️</span> الري الصحيح = نتيجة ممتازة، الجفاف بعد الري = كارثة
              </div>
            </div>

            {/* زر تفاصيل أكثر */}
            <div className="text-center mb-3">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-6 py-2 border-2 border-green-300 rounded-xl text-green-700 hover:bg-green-50 transition-colors"
              >
                {showDetails ? '🔼 إخفاء التفاصيل' : '🔽 تفاصيل أكثر'}
              </button>
            </div>

            {/* التفاصيل الكاملة */}
            {showDetails && (
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 text-right flex items-center gap-2">
                  <span>📊</span> التفاصيل الكاملة
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* معلومات المزرعة */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">معلومات المزرعة</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>الأبعاد: {length} × {width} متر</div>
                      <div>عدد الجربات: {plots}</div>
                      <div>المساحة الكلية: {results.area} م²</div>
                      <div>نوع التربة: {soilType}</div>
                      <div>الموسم: {season}</div>
                    </div>
                  </div>
                  
                  {/* الكميات التفصيلية */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">الكميات التفصيلية</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>الكمية لكل متر مربع: {results.waterPerSqm} لتر</div>
                      <div>الكمية لكل شجرة: {results.waterPerTree} لتر</div>
                      <div>الكمية لكل رية: {results.waterPerIrrigation} لتر</div>
                      <div>مدة الري: {results.duration} دقيقة</div>
                    </div>
                  </div>
                </div>

                {/* منبه الري المفصل */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span>💧</span> منبه الري المفصل
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>اسقِ خلال <strong>30-60 دقيقة</strong> بعد التسميد</li>
                    <li>ري متوسط (كل {results.irrigationInterval} أيام)</li>
                    <li>لا تغمر التربة بالماء - ري خفيف ومنتظم أفضل</li>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
