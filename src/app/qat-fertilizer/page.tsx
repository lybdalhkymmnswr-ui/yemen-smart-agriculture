'use client';

import { useState } from 'react';
import Header from '@/components/Header';

// جداول البيانات حسب المواصفات V2.0
const STAGE_REQUIREMENTS = {
  'بقشة': { N: 36, P: 18, K: 45, micro: 8 },
  'بلوط': { N: 45, P: 30, K: 18, micro: 6 },
  'عادي': { N: 35, P: 20, K: 30, micro: 7 },
};

const SALINITY_FACTORS = {
  'منخفضة': { factor: 1.00, extraDoses: 0, warning: '' },
  'متوسطة': { factor: 0.85, extraDoses: 1, warning: 'قلّل الجرعة ولا تغمر التربة بالماء' },
  'عالية': { factor: 0.70, extraDoses: 2, warning: 'لا تسمّد قبل غسيل التربة واخلط مياه الري بمياه نظيفة' },
};

const FERTILIZER_TYPE_FACTORS = {
  'ذواب': 0.625,
  'محبب': 1.0,
};

// تصنيف التربة للرسالة
const SOIL_CATEGORIES: Record<string, string> = {
  'طينية ثقيلة': 'الطينية',
  'طينية': 'الطينية',
  'متوسطة': 'الجبلية',
  'رملية': 'الرملية',
  'مختلطة': 'المختلطة',
  'حجرية': 'الجبلية',
};

const SOIL_TYPES = ['طينية ثقيلة', 'طينية', 'متوسطة', 'رملية', 'مختلطة', 'حجرية'];
const SALINITY_LEVELS = ['منخفضة', 'متوسطة', 'عالية'];
const TREE_AGES = ['صغيرة', 'متوسطة', 'كبيرة'];
const QAT_STAGES = ['بقشة', 'بلوط', 'عادي'];
const FERTILIZER_TYPES = ['ذواب', 'محبب'];

export default function QatFertilizerCalculator() {
  // المدخلات (8 حقول - بدون ملوحة التربة في الواجهة الأمامية حسب الطلب الجديد)
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(5);
  const [plotCount, setPlotCount] = useState<number>(1);
  const [soilType, setSoilType] = useState<string>('متوسطة');
  const [salinity, setSalinity] = useState<string>('منخفضة');
  const [treeAge, setTreeAge] = useState<string>('متوسطة');
  const [qatStage, setQatStage] = useState<string>('عادي');
  const [npkN, setNpkN] = useState<number>(20);
  const [npkP, setNpkP] = useState<number>(20);
  const [npkK, setNpkK] = useState<number>(20);
  const [fertilizerType, setFertilizerType] = useState<string>('محبب');

  // النتائج
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<Record<string, any> | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const calculateFertilizer = () => {
    // 1. حساب عدد الأشجار (الطريقة اليمنية)
    const tilamCount = Math.floor(width / 0.7);
    const treesPerTilam = length * 3;
    const totalTrees = tilamCount * treesPerTilam * plotCount;

    // 2. حساب المساحة
    const totalArea = length * width * plotCount;

    // 3. احتياج العناصر حسب المرحلة
    const stageReq = STAGE_REQUIREMENTS[qatStage as keyof typeof STAGE_REQUIREMENTS] || STAGE_REQUIREMENTS['عادي'];

    // التحقق من وجود البيانات
    if (!stageReq) {
      console.error('لم يتم العثور على بيانات المرحلة:', qatStage);
      return;
    }

    // 4. تحويل الاحتياج إلى كمية سماد مركب
    const totalN_g = stageReq.N * totalArea;
    const totalP_g = stageReq.P * totalArea;
    const totalK_g = stageReq.K * totalArea;

    // حساب كمية السماد لكل عنصر
    const fertN_kg = npkN > 0 ? (totalN_g / 1000) / (npkN / 100) : 0;
    const fertP_kg = npkP > 0 ? (totalP_g / 1000) / (npkP / 100) : 0;
    const fertK_kg = npkK > 0 ? (totalK_g / 1000) / (npkK / 100) : 0;

    // الكمية النهائية = الأكبر من الثلاثة
    let baseFertilizer_kg = Math.max(fertN_kg, fertP_kg, fertK_kg);

    // 5. معامل نوع السماد
    const fertTypeFactor = FERTILIZER_TYPE_FACTORS[fertilizerType as keyof typeof FERTILIZER_TYPE_FACTORS];
    baseFertilizer_kg = baseFertilizer_kg * fertTypeFactor;

    // 6. معامل الملوحة
    const salinityData = SALINITY_FACTORS[salinity as keyof typeof SALINITY_FACTORS];
    const finalFertilizer_kg = baseFertilizer_kg * salinityData.factor;

    // 7. عدد الدفعات (افتراضي صيف = 2 دفعات)
    const baseDoses = 2;
    const totalDoses = baseDoses + salinityData.extraDoses;
    const perDose_kg = finalFertilizer_kg / totalDoses;

    // حساب لكل متر مربع ولكل شجرة
    const perSqMeter_g = (finalFertilizer_kg * 1000) / totalArea;
    const perTree_g = totalTrees > 0 ? (finalFertilizer_kg * 1000) / totalTrees : 0;

    // تصنيف التربة للرسالة
    const soilCategory = SOIL_CATEGORIES[soilType] || 'المتوسطة';

    setResults({
      // معلومات البرجة
      length,
      width,
      plotCount,
      totalArea,
      totalTrees,
      
      // المدخلات
      soilType,
      soilCategory,
      salinity,
      treeAge,
      qatStage,
      npk: `${npkN}-${npkP}-${npkK}`,
      fertilizerType,
      
      // النتائج
      finalFertilizer_kg: finalFertilizer_kg.toFixed(1),
      perSqMeter_g: perSqMeter_g.toFixed(1),
      perTree_g: perTree_g.toFixed(1),
      totalDoses,
      perDose_kg: perDose_kg.toFixed(2),
      microElements_g: stageReq.micro,
      
      // التحذيرات
      salinityWarning: salinityData.warning,
      
      // معلومات الري
      irrigationNote: getIrrigationNote(soilType),
    });

    setShowResults(true);
    setShowDetails(false);
  };

  const getIrrigationNote = (soil: string): string => {
    if (soil === 'رملية' || soil === 'حجرية') {
      return 'ري خفيف ومتكرر (كل 2-3 أيام)';
    } else if (soil === 'طينية ثقيلة' || soil === 'طينية') {
      return 'ري متوسط (كل 5-7 أيام)';
    }
    return 'ري متوسط (كل 4-5 أيام)';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white" dir="rtl">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* العنوان */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-earth-800 mb-2">
              حاسبة أسمدة القات
            </h1>
            <p className="text-earth-600">
              احسب كمية السماد المناسبة لمزرعتك بالطريقة اليمنية
            </p>
          </div>

          {/* نموذج المدخلات */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-earth-800 mb-6 border-b pb-2">
              أدخل بيانات مزرعتك
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* طول الجربة */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">
                  طول الجربة (متر)
                </label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-growth-500 focus:border-growth-500"
                />
              </div>

              {/* عرض الجربة */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">
                  عرض الجربة (متر)
                </label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-growth-500 focus:border-growth-500"
                />
              </div>

              {/* عدد الجربات */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">
                  عدد الجربات
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={plotCount}
                  onChange={(e) => setPlotCount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-growth-500 focus:border-growth-500"
                />
              </div>

              {/* نوع التربة */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">
                  نوع التربة
                </label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-growth-500 focus:border-growth-500"
                >
                  {SOIL_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* ملوحة التربة */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">
                  ملوحة التربة
                </label>
                <select
                  value={salinity}
                  onChange={(e) => setSalinity(e.target.value)}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-growth-500 focus:border-growth-500"
                >
                  {SALINITY_LEVELS.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* عمر الأشجار */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">
                  عمر الأشجار
                </label>
                <select
                  value={treeAge}
                  onChange={(e) => setTreeAge(e.target.value)}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-growth-500 focus:border-growth-500"
                >
                  {TREE_AGES.map((age) => (
                    <option key={age} value={age}>{age}</option>
                  ))}
                </select>
              </div>

              {/* مرحلة القات */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">
                  مرحلة القات
                </label>
                <select
                  value={qatStage}
                  onChange={(e) => setQatStage(e.target.value)}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-growth-500 focus:border-growth-500"
                >
                  {QAT_STAGES.map((stage) => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>

              {/* تركيبة السماد NPK */}
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-earth-700 mb-1">
                  تركيبة السماد (N-P-K)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={npkN}
                    onChange={(e) => setNpkN(Number(e.target.value))}
                    placeholder="N"
                    className="w-1/3 px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-growth-500 focus:border-growth-500 text-center"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={npkP}
                    onChange={(e) => setNpkP(Number(e.target.value))}
                    placeholder="P"
                    className="w-1/3 px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-growth-500 focus:border-growth-500 text-center"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={npkK}
                    onChange={(e) => setNpkK(Number(e.target.value))}
                    placeholder="K"
                    className="w-1/3 px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-growth-500 focus:border-growth-500 text-center"
                  />
                </div>
              </div>

              {/* نوع السماد */}
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">
                  نوع السماد
                </label>
                <select
                  value={fertilizerType}
                  onChange={(e) => setFertilizerType(e.target.value)}
                  className="w-full px-3 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-growth-500 focus:border-growth-500"
                >
                  {FERTILIZER_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* زر الحساب */}
            <div className="mt-8 text-center">
              <button
                onClick={calculateFertilizer}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
              >
                احسب كمية السماد
              </button>
            </div>

            {/* النتيجة المختصرة - تظهر فوراً تحت الزر */}
            {showResults && results && (
              <div className="mt-8 space-y-4">
                {/* الرسالة الرئيسية */}
                <div className="bg-green-50 border-2 border-green-400 rounded-xl p-5 text-center">
                  <p className="text-lg font-bold text-green-800 mb-3">
                    ✅ التركيبة {results.npk} مناسبة تماماً لتربتك {results.soilCategory}!
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-lg">
                    <span className="bg-white px-4 py-2 rounded-lg shadow">
                      🌳 <strong>{results.totalTrees}</strong> شجرة
                    </span>
                    <span className="bg-white px-4 py-2 rounded-lg shadow">
                      💊 <strong>{results.finalFertilizer_kg}</strong> كيلو
                    </span>
                    <span className="bg-white px-4 py-2 rounded-lg shadow">
                      ⏰ <strong>{results.totalDoses}</strong> دفعات كل 15 يوم
                    </span>
                  </div>
                </div>

                {/* منبه الري الفوري */}
                <div className="bg-blue-50 border border-blue-300 rounded-xl p-4">
                  <p className="text-blue-800 font-bold text-center">
                    💧 سقي فوراً خلال 30 دقيقة بعد التسميد
                  </p>
                  <p className="text-blue-700 text-center text-sm mt-1">
                    {results.irrigationNote}
                  </p>
                </div>

                {/* رسائل التوعية */}
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 space-y-2">
                  <p className="text-amber-800">
                    ⚠️ <strong>الجودة ضرورية</strong> – جرب كيلو أولاً من سماد موثوق قبل أن تشتري الكمية الكاملة
                  </p>
                  <p className="text-amber-700 text-sm">
                    💡 السماد الرخيص غالباً ما يكون بدون عناصر صغرى أو مغشوش
                  </p>
                  <p className="text-amber-700 text-sm">
                    ✅ اطلب سماد فيه شعار المصنع وتاريخ صلاحية واضح
                  </p>
                </div>

                {/* تحذير الملوحة إن وجد */}
                {results.salinityWarning && (
                  <div className="bg-red-50 border border-red-300 rounded-xl p-4">
                    <p className="text-red-800 font-bold">
                      ⚠️ تحذير الملوحة: {results.salinityWarning}
                    </p>
                  </div>
                )}

                {/* أزرار الإجراءات */}
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="bg-gray-100 hover:bg-gray-200 text-earth-700 font-bold py-2 px-6 rounded-lg transition-colors border border-gray-300"
                  >
                    {showDetails ? '🔼 إخفاء التفاصيل' : '🔽 تفاصيل أكثر'}
                  </button>
                </div>

                {/* التفاصيل الإضافية (مخفية افتراضياً) */}
                {showDetails && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6 mt-4 space-y-4">
                    <h3 className="text-lg font-bold text-earth-800 border-b pb-2">📊 التفاصيل الكاملة</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* معلومات المزرعة */}
                      <div className="bg-earth-50 p-4 rounded-lg">
                        <h4 className="font-bold text-earth-700 mb-2">معلومات المزرعة</h4>
                        <p className="text-sm text-earth-600">الأبعاد: {results.length} × {results.width} متر</p>
                        <p className="text-sm text-earth-600">عدد الجربات: {results.plotCount}</p>
                        <p className="text-sm text-earth-600">المساحة الكلية: {results.totalArea} م²</p>
                        <p className="text-sm text-earth-600">نوع التربة: {results.soilType}</p>
                        <p className="text-sm text-earth-600">المرحلة: {results.qatStage}</p>
                      </div>

                      {/* الكميات التفصيلية */}
                      <div className="bg-growth-50 p-4 rounded-lg">
                        <h4 className="font-bold text-growth-700 mb-2">الكميات التفصيلية</h4>
                        <p className="text-sm text-earth-600">الكمية لكل متر مربع: <strong>{results.perSqMeter_g} غرام</strong></p>
                        <p className="text-sm text-earth-600">الكمية لكل شجرة: <strong>{results.perTree_g} غرام</strong></p>
                        <p className="text-sm text-earth-600">الكمية لكل دفعة: <strong>{results.perDose_kg} كيلو</strong></p>
                        <p className="text-sm text-earth-600">العناصر الصغرى المطلوبة: <strong>{results.microElements_g} غ/م²</strong></p>
                      </div>
                    </div>

                    {/* منبه الري المفصل */}
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                      <h4 className="font-bold text-cyan-800 mb-2">💧 منبه الري المفصل</h4>
                      <ul className="text-cyan-700 space-y-1 text-sm">
                        <li>• اسقِ خلال <strong>30-60 دقيقة</strong> بعد التسميد</li>
                        <li>• {results.irrigationNote}</li>
                        <li>• لا تغمر التربة بالماء - ري خفيف ومنتظم أفضل</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
