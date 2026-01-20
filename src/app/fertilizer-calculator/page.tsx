'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

// أنواع التربة
const soilTypes = [
  { value: 'sandy', label: 'التربة الرملية' },
  { value: 'arid', label: 'التربة الجافة' },
  { value: 'mixed', label: 'التربة الطينية المختلطة' },
  { value: 'dark', label: 'التربة السوداء الخصبة' },
  { value: 'clay', label: 'التربة الطينية الثقيلة' },
];

// أنواع المحاصيل
const cropTypes = [
  { value: 'qat', label: 'قات' },
  { value: 'vegetables', label: 'خضروات' },
];

// مراحل النمو
const growthStages = [
  { value: 'start', label: 'بداية (إنبات وتأسيس)' },
  { value: 'growth', label: 'نمو خضري' },
  { value: 'production', label: 'إنتاج (إزهار وإثمار)' },
];

// طرق الري
const irrigationMethods = [
  { value: 'drip', label: 'تنقيط' },
  { value: 'flood', label: 'غمر' },
  { value: 'rain', label: 'مطري' },
];

// قاعدة بيانات التوصيات
const getRecommendation = (soil: string, crop: string, stage: string, irrigation: string) => {
  // التوصيات الأساسية حسب مرحلة النمو
  const baseNPK: Record<string, Record<string, string>> = {
    start: {
      qat: '20-20-20 (متوازن)',
      vegetables: '15-30-15 (عالي الفوسفور)',
    },
    growth: {
      qat: '30-10-10 (عالي النيتروجين)',
      vegetables: '25-10-10 (عالي النيتروجين)',
    },
    production: {
      qat: '15-10-30 (عالي البوتاسيوم)',
      vegetables: '12-12-17 (عالي البوتاسيوم)',
    },
  };

  // تعديلات حسب نوع التربة
  const soilAdjustments: Record<string, { npkNote: string; warning: string }> = {
    sandy: {
      npkNote: 'أضف 20% نيتروجين إضافي',
      warning: 'التربة الرملية تفقد العناصر بسرعة. قسّم الجرعة على دفعات صغيرة متكررة، وتجنب الري الغزير بعد التسميد مباشرة.',
    },
    arid: {
      npkNote: 'أضف عناصر صغرى (حديد، زنك)',
      warning: 'التربة الجافة قد تحتاج تحسين بالمادة العضوية أولاً. تأكد من ترطيب التربة قبل التسميد.',
    },
    mixed: {
      npkNote: 'التوصية الأساسية مناسبة',
      warning: 'تربة جيدة للزراعة. راقب مستوى الرطوبة وتجنب التسميد في الأوقات الحارة.',
    },
    dark: {
      npkNote: 'قلل النيتروجين 15%',
      warning: 'التربة غنية طبيعياً. لا تفرط في التسميد النيتروجيني لتجنب النمو الخضري الزائد.',
    },
    clay: {
      npkNote: 'أضف كبريت زراعي',
      warning: 'التربة الطينية بطيئة الامتصاص. سمّد قبل الري بوقت كافٍ، وتجنب التسميد في التربة المشبعة بالماء.',
    },
  };

  // معدل التسميد حسب طريقة الري ومرحلة النمو
  const frequencyMap: Record<string, Record<string, string>> = {
    drip: {
      start: 'مرة واحدة أسبوعياً بتركيز خفيف',
      growth: '2-3 مرات أسبوعياً بكميات صغيرة',
      production: '2 مرات أسبوعياً بتركيز متوسط',
    },
    flood: {
      start: 'مرة كل أسبوعين قبل الري',
      growth: 'مرة أسبوعياً قبل الري مباشرة',
      production: 'مرة أسبوعياً مع الري',
    },
    rain: {
      start: 'مرة واحدة عند توقع المطر',
      growth: 'مرة كل أسبوعين قبل موسم المطر',
      production: 'مرة شهرياً مع مراقبة الطقس',
    },
  };

  const npk = baseNPK[stage]?.[crop] || '20-20-20 (متوازن)';
  const soilData = soilAdjustments[soil] || soilAdjustments.mixed;
  const frequency = frequencyMap[irrigation]?.[stage] || 'مرة أسبوعياً';

  return {
    npk,
    npkNote: soilData.npkNote,
    frequency,
    warning: soilData.warning,
  };
};

// النصائح السياقية الذكية
const getContextualTips = (soil: string, stage: string, irrigation: string): { icon: string; tip: string; type: 'warning' | 'info' | 'success' }[] => {
  const tips: { icon: string; tip: string; type: 'warning' | 'info' | 'success' }[] = [];

  // نصائح حسب التربة + طريقة الري
  if (soil === 'clay' && irrigation === 'drip') {
    tips.push({
      icon: '⚠️',
      tip: 'التربة الطينية مع التنقيط: احذر من تراكم الأملاح حول النقاطات. اغسل التربة بري غزير كل أسبوعين.',
      type: 'warning'
    });
  }

  if (soil === 'clay' && irrigation === 'flood') {
    tips.push({
      icon: '🚫',
      tip: 'تحذير مهم: التربة الطينية مع الغمر قد تسبب اختناق الجذور. قلل كمية الماء وتأكد من الصرف الجيد.',
      type: 'warning'
    });
  }

  if (soil === 'sandy' && irrigation === 'flood') {
    tips.push({
      icon: '💧',
      tip: 'التربة الرملية مع الغمر: الماء يتسرب بسرعة ويغسل السماد. قسّم الري على دفعات قصيرة متكررة.',
      type: 'warning'
    });
  }

  if (soil === 'sandy' && irrigation === 'drip') {
    tips.push({
      icon: '✅',
      tip: 'اختيار ممتاز! التنقيط مثالي للتربة الرملية. يحافظ على السماد قرب الجذور.',
      type: 'success'
    });
  }

  // نصائح حسب التربة + مرحلة النمو
  if (soil === 'sandy' && stage === 'growth') {
    tips.push({
      icon: '📌',
      tip: 'نصيحة مهمة: في مرحلة النمو الخضري، التربة الرملية تحتاج زيادة عدد مرات التسميد وليس الكمية. قسّم الجرعة على 3-4 دفعات.',
      type: 'info'
    });
  }

  if (soil === 'dark' && stage === 'growth') {
    tips.push({
      icon: '🌱',
      tip: 'التربة السوداء غنية بالنيتروجين طبيعياً. في مرحلة النمو الخضري، قلل السماد النيتروجيني لتجنب النمو المفرط.',
      type: 'info'
    });
  }

  if (soil === 'clay' && stage === 'start') {
    tips.push({
      icon: '🌾',
      tip: 'في مرحلة البداية: التربة الطينية تحتفظ بالسماد جيداً. ابدأ بجرعة خفيفة وراقب استجابة النبات.',
      type: 'info'
    });
  }

  if (soil === 'arid' && stage === 'production') {
    tips.push({
      icon: '🔆',
      tip: 'في مرحلة الإنتاج: التربة الجافة تحتاج عناصر صغرى إضافية (حديد، زنك، منغنيز) لتحسين جودة الثمار.',
      type: 'info'
    });
  }

  // نصائح حسب طريقة الري + مرحلة النمو
  if (irrigation === 'rain' && stage === 'growth') {
    tips.push({
      icon: '🌧️',
      tip: 'الري المطري في مرحلة النمو: سمّد قبل المطر المتوقع بيوم أو يومين لضمان وصول السماد للجذور.',
      type: 'info'
    });
  }

  if (irrigation === 'flood' && stage === 'production') {
    tips.push({
      icon: '💡',
      tip: 'في مرحلة الإنتاج مع الغمر: قلل كمية الماء لتجنب تخفيف السماد. الري المتوسط أفضل من الغزير.',
      type: 'info'
    });
  }

  if (irrigation === 'drip' && stage === 'production') {
    tips.push({
      icon: '🎯',
      tip: 'التنقيط في مرحلة الإنتاج: يمكنك إضافة السماد مع ماء الري (التسميد بالتنقيط) للحصول على أفضل النتائج.',
      type: 'success'
    });
  }

  // نصائح عامة إضافية
  if (soil === 'mixed') {
    tips.push({
      icon: '👍',
      tip: 'التربة المختلطة متوازنة وسهلة الإدارة. التزم بالتوصيات الأساسية وراقب استجابة المحصول.',
      type: 'success'
    });
  }

  // إذا لم تكن هناك نصائح محددة، أضف نصيحة عامة
  if (tips.length === 0) {
    tips.push({
      icon: '📋',
      tip: 'التزم بالتوصيات المذكورة أعلاه، وراقب حالة النبات. إذا لاحظت اصفرار أو ضعف، استشر خبيراً.',
      type: 'info'
    });
  }

  return tips;
};

export default function FertilizerCalculatorPage() {
  const [soilType, setSoilType] = useState('');
  const [cropType, setCropType] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [irrigationMethod, setIrrigationMethod] = useState('');
  const [result, setResult] = useState<{
    npk: string;
    npkNote: string;
    frequency: string;
    warning: string;
  } | null>(null);
  const [contextualTips, setContextualTips] = useState<{ icon: string; tip: string; type: 'warning' | 'info' | 'success' }[]>([]);
  const [error, setError] = useState('');

  const handleCalculate = useCallback(() => {
    // التحقق من اكتمال الحقول
    if (!soilType || !cropType || !growthStage || !irrigationMethod) {
      setError('يرجى اختيار جميع الحقول للحصول على التوصية');
      setResult(null);
      setContextualTips([]);
      return;
    }

    setError('');
    const recommendation = getRecommendation(soilType, cropType, growthStage, irrigationMethod);
    setResult(recommendation);
    
    // الحصول على النصائح السياقية
    const tips = getContextualTips(soilType, growthStage, irrigationMethod);
    setContextualTips(tips);
  }, [soilType, cropType, growthStage, irrigationMethod]);

  const isFormComplete = soilType && cropType && growthStage && irrigationMethod;

  const getTipBgColor = (type: 'warning' | 'info' | 'success') => {
    switch (type) {
      case 'warning': return 'bg-red-50 border-red-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      case 'success': return 'bg-green-50 border-green-200';
    }
  };

  const getTipTextColor = (type: 'warning' | 'info' | 'success') => {
    switch (type) {
      case 'warning': return 'text-red-700';
      case 'info': return 'text-blue-700';
      case 'success': return 'text-green-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-green-700 hover:text-green-800">
            <span className="text-2xl">🌱</span>
            <span className="font-bold">الزراعة الذكية</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <span className="text-4xl">🌿</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">حاسبة التسميد المبسطة</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            أداة استرشادية تساعدك على تحديد الأسمدة المناسبة لمحصولك بناءً على نوع التربة ومرحلة النمو.
            للحصول على أفضل النتائج، نوصي دائمًا بتحليل التربة.
          </p>
        </div>

        {/* Calculator Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* نوع التربة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع التربة
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              >
                <option value="">-- اختر نوع التربة --</option>
                {soilTypes.map((soil) => (
                  <option key={soil.value} value={soil.value}>
                    {soil.label}
                  </option>
                ))}
              </select>
            </div>

            {/* نوع المحصول */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اختر نوع المحصول
              </label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              >
                <option value="">-- اختر نوع المحصول --</option>
                {cropTypes.map((crop) => (
                  <option key={crop.value} value={crop.value}>
                    {crop.label}
                  </option>
                ))}
              </select>
            </div>

            {/* مرحلة النمو */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اختر مرحلة النمو الحالية
              </label>
              <select
                value={growthStage}
                onChange={(e) => setGrowthStage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              >
                <option value="">-- اختر مرحلة النمو --</option>
                {growthStages.map((stage) => (
                  <option key={stage.value} value={stage.value}>
                    {stage.label}
                  </option>
                ))}
              </select>
            </div>

            {/* طريقة الري */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اختر طريقة الري المتبعة
              </label>
              <select
                value={irrigationMethod}
                onChange={(e) => setIrrigationMethod(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              >
                <option value="">-- اختر طريقة الري --</option>
                {irrigationMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            disabled={!isFormComplete}
            className={`w-full mt-6 py-4 rounded-lg font-bold text-lg transition-colors ${
              isFormComplete
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            احسب التوصية
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border-2 border-green-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">✅</span>
              التوصية المقترحة
            </h2>

            <div className="space-y-4">
              {/* NPK Recommendation */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-2">نوع السماد (NPK)</h3>
                <p className="text-2xl font-bold text-green-700">{result.npk}</p>
                <p className="text-sm text-green-600 mt-1">{result.npkNote}</p>
              </div>

              {/* Frequency */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-2">معدل التسميد</h3>
                <p className="text-lg text-blue-700">{result.frequency}</p>
              </div>

              {/* Warning */}
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                  <span>⚠️</span>
                  تحذير خاص بنوع التربة
                </h3>
                <p className="text-amber-700">{result.warning}</p>
              </div>

              {/* Fixed Disclaimer */}
              <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
                <p className="text-gray-700 text-sm">
                  <strong>تنبيه هام:</strong> هذه توصية عامة ومبسطة، وقد تختلف الاحتياجات الفعلية لأرضك.
                  لا تعتبر بديلاً عن تحليل التربة والاستشارة المتخصصة.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Educational Section - Why This Recommendation */}
        {result && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border-2 border-indigo-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📚</span>
              لماذا هذه التوصية؟
            </h2>

            <div className="space-y-6">
              {/* سبب التوصية */}
              <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                  <span>🎯</span>
                  سبب التوصية
                </h3>
                <p className="text-indigo-700 leading-relaxed">
                  {growthStage === 'start' && 'في مرحلة البداية، يحتاج النبات إلى فوسفور عالي لتقوية الجذور وتأسيس نمو سليم. الجذور القوية = نبات قوي طوال الموسم.'}
                  {growthStage === 'growth' && 'في مرحلة النمو الخضري، يحتاج النبات إلى نيتروجين عالي لبناء الأوراق والسيقان. النيتروجين هو "وقود" النمو الأخضر.'}
                  {growthStage === 'production' && 'في مرحلة الإنتاج، يحتاج النبات إلى بوتاسيوم عالي لتحسين جودة الثمار وزيادة الحلاوة ومقاومة الأمراض.'}
                </p>
              </div>

              {/* مثال عملي */}
              <div className="bg-teal-50 rounded-lg p-4">
                <h3 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
                  <span>💡</span>
                  مثال عملي
                </h3>
                <p className="text-teal-700 leading-relaxed">
                  {soilType === 'sandy' && 'مثال: لو عندك حوض 10×10 متر تربة رملية، بدل ما تضع كيس سماد كامل مرة واحدة، قسّمه على 4 دفعات خلال الشهر. التربة الرملية مثل "الغربال" - السماد ينزل بسرعة مع الماء.'}
                  {soilType === 'clay' && 'مثال: لو عندك أرض طينية، سمّد قبل الري بساعتين على الأقل. التربة الطينية "تمسك" السماد، لكن لو سمّدت وهي مبللة، السماد يبقى على السطح ولا ينزل للجذور.'}
                  {soilType === 'arid' && 'مثال: التربة الجافة تحتاج "تنشيط" أولاً. أضف سماد عضوي (روث) قبل السماد الكيماوي بأسبوع. هذا يحسّن قدرة التربة على الاحتفاظ بالعناصر.'}
                  {soilType === 'dark' && 'مثال: التربة السوداء غنية طبيعياً. لو أضفت نفس كمية السماد التي يضيفها جارك في التربة الرملية، ستحرق النبات. قلل الكمية 20-30%.'}
                  {soilType === 'mixed' && 'مثال: التربة المختلطة متوازنة. اتبع التوصيات الأساسية، وراقب لون الأوراق. لو اصفرّت = زِد النيتروجين. لو احمرّت الحواف = زِد البوتاسيوم.'}
                </p>
              </div>

              {/* تحذير من خطأ شائع */}
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <span>🚫</span>
                  خطأ شائع تجنّبه
                </h3>
                <p className="text-red-700 leading-relaxed">
                  {irrigationMethod === 'drip' && 'خطأ شائع: وضع السماد الجاف بعيداً عن النقاطات. السماد يجب أن يكون في دائرة الترطيب حتى يذوب ويصل للجذور. الأفضل: استخدم سماد سائل مع ماء التنقيط.'}
                  {irrigationMethod === 'flood' && 'خطأ شائع: التسميد بعد الري مباشرة. الماء الزائد يغسل السماد بعيداً عن الجذور. الصحيح: سمّد قبل الري، أو انتظر حتى تجف التربة قليلاً.'}
                  {irrigationMethod === 'rain' && 'خطأ شائع: التسميد أثناء المطر الغزير. المطر القوي يغسل السماد قبل أن يمتصه النبات. الصحيح: سمّد قبل المطر الخفيف المتوقع، أو بعد المطر بيوم.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contextual Tips Section */}
        {contextualTips.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border-2 border-purple-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              تنبيهات مهمة حسب أرضك
            </h2>

            <div className="space-y-3">
              {contextualTips.map((tip, index) => (
                <div 
                  key={index} 
                  className={`rounded-lg p-4 border ${getTipBgColor(tip.type)}`}
                >
                  <p className={`${getTipTextColor(tip.type)} flex items-start gap-2`}>
                    <span className="text-xl flex-shrink-0">{tip.icon}</span>
                    <span>{tip.tip}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <span>🧮</span>
            حاسبة الري
          </Link>
          <Link
            href="/soil-types"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
          >
            <span>🌾</span>
            دليل أنواع التربة
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <span>🏠</span>
            الصفحة الرئيسية
          </Link>
        </div>
      </main>
    </div>
  );
}
