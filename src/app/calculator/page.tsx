'use client';

// Soil and Irrigation Calculator - Static Page with Simple JavaScript Logic
import { useState, useCallback } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

// Recommendation data - simple object-based logic
const recommendations: Record<string, {
  recommendation: string;
  recommendationLevel: 'light' | 'medium' | 'careful';
  warning: string;
  tip: string;
}> = {
  // التربة الرملية - قات
  'sandy-qat-drip': {
    recommendation: 'المتوسط',
    recommendationLevel: 'medium',
    warning: 'انتبه من غسل الأسمدة بسرعة في هذه التربة. استخدم أسمدة بطيئة الذوبان.',
    tip: 'الري بالتنقيط يوفر حتى 50% من الماء مقارنة بالغمر في التربة الرملية.'
  },
  'sandy-qat-flood': {
    recommendation: 'الحذر',
    recommendationLevel: 'careful',
    warning: 'الغمر في التربة الرملية يهدر الماء بسرعة. حاول التحول للتنقيط إن أمكن.',
    tip: 'قسّم الري على مرات متعددة خلال اليوم بدلاً من مرة واحدة لتقليل الفاقد.'
  },
  // التربة الرملية - خضروات
  'sandy-vegetables-drip': {
    recommendation: 'المتوسط',
    recommendationLevel: 'medium',
    warning: 'الخضروات تحتاج ري منتظم. راقب رطوبة التربة يومياً.',
    tip: 'أضف طبقة من القش حول النباتات لتقليل تبخر الماء من سطح التربة.'
  },
  'sandy-vegetables-flood': {
    recommendation: 'الحذر',
    recommendationLevel: 'careful',
    warning: 'الغمر قد يغسل العناصر الغذائية بعيداً عن جذور الخضروات.',
    tip: 'اسقِ في الصباح الباكر أو المساء لتقليل التبخر.'
  },
  // التربة الجافة - قات
  'arid-qat-drip': {
    recommendation: 'المتوسط',
    recommendationLevel: 'medium',
    warning: 'احذر من تراكم الأملاح حول منطقة التنقيط. اغسل التربة دورياً.',
    tip: 'التنقيط هو الخيار الأفضل للتربة الجافة لأنه يقلل تراكم الأملاح على السطح.'
  },
  'arid-qat-flood': {
    recommendation: 'الحذر',
    recommendationLevel: 'careful',
    warning: 'الغمر يزيد من مشكلة الملوحة في التربة الجافة. تجنبه إن أمكن.',
    tip: 'إذا اضطررت للغمر، استخدم ماء عذب قدر الإمكان واغسل التربة بعمق من وقت لآخر.'
  },
  // التربة الجافة - خضروات
  'arid-vegetables-drip': {
    recommendation: 'المتوسط',
    recommendationLevel: 'medium',
    warning: 'اختر خضروات تتحمل الملوحة مثل الطماطم والباذنجان.',
    tip: 'أضف سماد عضوي بكميات كبيرة قبل الزراعة لتحسين قدرة التربة على الاحتفاظ بالماء.'
  },
  'arid-vegetables-flood': {
    recommendation: 'الحذر',
    recommendationLevel: 'careful',
    warning: 'الغمر في التربة الجافة يرفع الأملاح للسطح ويضر بالخضروات.',
    tip: 'حاول التحول للتنقيط أو الري بالرش لنتائج أفضل.'
  },
  // التربة الطينية المختلطة - قات
  'mixed-qat-drip': {
    recommendation: 'الخفيف',
    recommendationLevel: 'light',
    warning: 'هذه التربة تحتفظ بالماء جيداً. لا تبالغ في الري.',
    tip: 'التنقيط ممتاز لهذه التربة. راقب رطوبة التربة قبل كل ري.'
  },
  'mixed-qat-flood': {
    recommendation: 'المتوسط',
    recommendationLevel: 'medium',
    warning: 'تأكد من وجود تصريف جيد لمنع تجمع الماء حول الجذور.',
    tip: 'اترك التربة تجف قليلاً بين الريات لتجنب تعفن الجذور.'
  },
  // التربة الطينية المختلطة - خضروات
  'mixed-vegetables-drip': {
    recommendation: 'الخفيف',
    recommendationLevel: 'light',
    warning: 'هذه التربة مثالية للخضروات. حافظ على انتظام الري.',
    tip: 'استفد من خصوبة هذه التربة بتغيير المحاصيل كل موسم.'
  },
  'mixed-vegetables-flood': {
    recommendation: 'المتوسط',
    recommendationLevel: 'medium',
    warning: 'لا تعمل في الأرض وهي مبللة جداً حتى لا تتضغط التربة.',
    tip: 'أضف البقوليات في الدورة الزراعية لإثراء التربة بالنيتروجين طبيعياً.'
  },
  // التربة السوداء الخصبة - قات
  'dark-qat-drip': {
    recommendation: 'الخفيف',
    recommendationLevel: 'light',
    warning: 'هذه التربة ممتازة وتحتفظ بالماء. لا تفرط في الري.',
    tip: 'استفد من خصوبتها الطبيعية وقلل من الأسمدة الكيماوية.'
  },
  'dark-qat-flood': {
    recommendation: 'الخفيف',
    recommendationLevel: 'light',
    warning: 'حتى مع الغمر، هذه التربة تتعامل جيداً مع الماء. فقط تأكد من التصريف.',
    tip: 'أعد بقايا المحاصيل للتربة بدلاً من حرقها للحفاظ على خصوبتها.'
  },
  // التربة السوداء الخصبة - خضروات
  'dark-vegetables-drip': {
    recommendation: 'الخفيف',
    recommendationLevel: 'light',
    warning: 'تربة مثالية للخضروات. حافظ على انتظام الري فقط.',
    tip: 'يمكنك زراعة معظم أنواع الخضروات بنجاح في هذه التربة.'
  },
  'dark-vegetables-flood': {
    recommendation: 'الخفيف',
    recommendationLevel: 'light',
    warning: 'تجنب الإفراط في الري حتى لا تخنق الجذور.',
    tip: 'غيّر المحصول كل موسم للحفاظ على صحة التربة ومنع الآفات.'
  },
  // التربة الطينية الثقيلة - قات
  'clay-qat-drip': {
    recommendation: 'الحذر',
    recommendationLevel: 'careful',
    warning: 'هذه التربة تحتفظ بالماء طويلاً جداً. راقب بعناية.',
    tip: 'اسقِ عندما تظهر تشققات صغيرة على السطح، وليس قبل ذلك.'
  },
  'clay-qat-flood': {
    recommendation: 'الحذر',
    recommendationLevel: 'careful',
    warning: 'الغمر خطر في هذه التربة. قد يسبب تعفن الجذور.',
    tip: 'إذا اضطررت للغمر، اسقِ ببطء شديد واترك الماء يتشرب تدريجياً.'
  },
  // التربة الطينية الثقيلة - خضروات
  'clay-vegetables-drip': {
    recommendation: 'الحذر',
    recommendationLevel: 'careful',
    warning: 'اختر خضروات ذات جذور قوية تتحمل التربة الثقيلة.',
    tip: 'أضف كميات كبيرة من السماد العضوي لتحسين تهوية التربة.'
  },
  'clay-vegetables-flood': {
    recommendation: 'الحذر',
    recommendationLevel: 'careful',
    warning: 'تجنب الغمر قدر الإمكان. هذه التربة لا تصرف الماء جيداً.',
    tip: 'ارفع أحواض الزراعة قليلاً عن مستوى الأرض لتحسين التصريف.'
  },
};

export default function CalculatorPage() {
  // Controlled state for form fields
  const [soilType, setSoilType] = useState<string>('');
  const [cropType, setCropType] = useState<string>('');
  const [irrigationType, setIrrigationType] = useState<string>('');
  
  // Result state
  const [result, setResult] = useState<typeof recommendations[string] | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  
  // Error state
  const [showError, setShowError] = useState<boolean>(false);

  // Check if form is complete
  const isFormComplete = Boolean(soilType && cropType && irrigationType);

  // Handle soil type change
  const handleSoilChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSoilType(e.target.value);
    setShowResult(false);
    setShowError(false);
  }, []);

  // Handle crop type change
  const handleCropChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCropType(e.target.value);
    setShowResult(false);
    setShowError(false);
  }, []);

  // Handle irrigation type change
  const handleIrrigationChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setIrrigationType(e.target.value);
    setShowResult(false);
    setShowError(false);
  }, []);

  // Handle calculate button click
  const handleCalculate = useCallback(() => {
    // Validate all fields are selected
    if (!soilType || !cropType || !irrigationType) {
      setShowError(true);
      setShowResult(false);
      return;
    }

    // Build the key and get recommendation
    const key = `${soilType}-${cropType}-${irrigationType}`;
    const recommendation = recommendations[key];
    
    if (recommendation) {
      setResult(recommendation);
      setShowResult(true);
      setShowError(false);
    }
  }, [soilType, cropType, irrigationType]);

  // Get color based on recommendation level
  const getRecommendationColor = (level: string): string => {
    switch (level) {
      case 'light':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'careful':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">🧮</span>
          <h1 className="text-3xl font-bold mb-2">حاسبة التربة والري المبسطة</h1>
          <p className="text-green-100">أدخل بيانات حقلك لتحصل على توصية سريعة</p>
        </div>
      </div>

      {/* Calculator Form */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          
          {/* Error Message */}
          {showError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                <span>يرجى اختيار جميع الحقول قبل الحساب</span>
              </p>
            </div>
          )}
          
          {/* Input Fields */}
          <div className="space-y-6">
            
            {/* Soil Type */}
            <div>
              <label htmlFor="soil-type" className="block text-sm font-medium text-gray-700 mb-2">
                1. نوع التربة
              </label>
              <select
                id="soil-type"
                name="soilType"
                value={soilType}
                onChange={handleSoilChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white ${
                  showError && !soilType ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">-- اختر نوع التربة --</option>
                <option value="sandy">التربة الرملية</option>
                <option value="arid">التربة الجافة</option>
                <option value="mixed">التربة الطينية المختلطة</option>
                <option value="dark">التربة السوداء الخصبة</option>
                <option value="clay">التربة الطينية الثقيلة</option>
              </select>
            </div>

            {/* Crop Type */}
            <div>
              <label htmlFor="crop-type" className="block text-sm font-medium text-gray-700 mb-2">
                2. نوع المحصول
              </label>
              <select
                id="crop-type"
                name="cropType"
                value={cropType}
                onChange={handleCropChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white ${
                  showError && !cropType ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">-- اختر نوع المحصول --</option>
                <option value="qat">قات</option>
                <option value="vegetables">خضروات ورقية</option>
              </select>
            </div>

            {/* Irrigation Type */}
            <div>
              <label htmlFor="irrigation-type" className="block text-sm font-medium text-gray-700 mb-2">
                3. طريقة الري
              </label>
              <select
                id="irrigation-type"
                name="irrigationType"
                value={irrigationType}
                onChange={handleIrrigationChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white ${
                  showError && !irrigationType ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">-- اختر طريقة الري --</option>
                <option value="drip">تنقيط</option>
                <option value="flood">غمر</option>
              </select>
            </div>

            {/* Calculate Button */}
            <button
              type="button"
              onClick={handleCalculate}
              disabled={!isFormComplete}
              className={`w-full py-4 px-6 rounded-lg text-lg font-bold transition-all ${
                isFormComplete
                  ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer active:bg-green-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              احسب توصية الري
            </button>
          </div>

          {/* Result Section */}
          {showResult && result && (
            <div className="mt-8 space-y-4">
              
              {/* Result Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">💧</span>
                  توصيتك السريعة
                </h3>

                {/* Recommendation Level */}
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">توصية الري:</p>
                  <span className={`inline-block px-4 py-2 rounded-full text-lg font-bold border-2 ${getRecommendationColor(result.recommendationLevel)}`}>
                    {result.recommendation}
                  </span>
                </div>

                {/* Warning */}
                <div className="bg-orange-50 border-r-4 border-orange-400 p-4 rounded-lg mb-4">
                  <p className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">⚠️</span>
                    <span className="text-orange-800">{result.warning}</span>
                  </p>
                </div>

                {/* Tip */}
                <div className="bg-blue-50 border-r-4 border-blue-400 p-4 rounded-lg">
                  <p className="flex items-start gap-2">
                    <span className="text-xl flex-shrink-0">💡</span>
                    <span className="text-blue-800">{result.tip}</span>
                  </p>
                </div>
              </div>

              {/* Upgrade CTA */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                <h4 className="font-bold text-gray-900 mb-2">هل تريد توصية احترافية؟</h4>
                <p className="text-gray-600 text-sm mb-4">
                  للحصول على توصية موسعة ودقيقة حسب منطقتك، عمر النبات، ونوع السماد، يمكنك طلب النسخة المدفوعة.
                </p>
                <button
                  type="button"
                  disabled
                  className="w-full py-3 px-4 bg-amber-200 text-amber-700 rounded-lg font-medium cursor-not-allowed opacity-75"
                >
                  اطلب التوصية الموسعة (قريباً)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Link to Soil Types */}
        <div className="mt-6 text-center">
          <Link 
            href="/soil-types" 
            className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-2"
          >
            <span>📚</span>
            تعرف أكثر على أنواع التربة في دليل التربة
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 منصة الزراعة الذكية اليمنية</p>
        </div>
      </footer>
    </div>
  );
}
