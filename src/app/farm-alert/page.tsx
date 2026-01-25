'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';

// بيانات المحافظات والمناطق مع الإحداثيات
const governorates: Record<string, { name: string; regions: { name: string; lat: number; lon: number }[] }> = {
  sanaa: {
    name: 'صنعاء',
    regions: [
      { name: 'بني حشيش', lat: 15.4167, lon: 44.3333 },
      { name: 'همدان', lat: 15.4500, lon: 44.1833 },
      { name: 'سنحان', lat: 15.2833, lon: 44.2167 },
      { name: 'بني مطر', lat: 15.3000, lon: 44.0500 },
      { name: 'الحيمة الخارجية', lat: 15.1667, lon: 43.9167 },
    ],
  },
  amran: {
    name: 'عمران',
    regions: [
      { name: 'عمران المدينة', lat: 15.6594, lon: 43.9436 },
      { name: 'ريدة', lat: 15.7167, lon: 43.9667 },
      { name: 'ثلاء', lat: 15.4833, lon: 43.8500 },
      { name: 'حبور ظليمة', lat: 15.8000, lon: 43.8500 },
    ],
  },
  dhamar: {
    name: 'ذمار',
    regions: [
      { name: 'ذمار المدينة', lat: 14.5500, lon: 44.4000 },
      { name: 'جهران', lat: 14.5833, lon: 44.4333 },
      { name: 'عنس', lat: 14.6167, lon: 44.3167 },
      { name: 'المنار', lat: 14.4833, lon: 44.3500 },
    ],
  },
  ibb: {
    name: 'إب',
    regions: [
      { name: 'إب المدينة', lat: 13.9667, lon: 44.1833 },
      { name: 'يريم', lat: 14.3000, lon: 44.3833 },
      { name: 'جبلة', lat: 13.9167, lon: 44.1500 },
      { name: 'العدين', lat: 13.8500, lon: 44.0167 },
    ],
  },
  taiz: {
    name: 'تعز',
    regions: [
      { name: 'تعز المدينة', lat: 13.5789, lon: 44.0219 },
      { name: 'التربة', lat: 13.5167, lon: 44.0333 },
      { name: 'شرعب السلام', lat: 13.6667, lon: 43.8833 },
      { name: 'المعافر', lat: 13.4500, lon: 44.0000 },
    ],
  },
  hajjah: {
    name: 'حجة',
    regions: [
      { name: 'حجة المدينة', lat: 15.6917, lon: 43.6028 },
      { name: 'كحلان عفار', lat: 15.7500, lon: 43.5500 },
      { name: 'شرس', lat: 15.8333, lon: 43.6667 },
    ],
  },
};

// مستويات الإنذار
type AlertLevel = 'normal' | 'warning' | 'danger';

interface AlertResult {
  minTemp: number;
  level: AlertLevel;
  message: string;
  action: string;
}

function getAlertLevel(temp: number): AlertResult {
  if (temp <= 0) {
    return {
      minTemp: temp,
      level: 'danger',
      message: 'خطر شديد - صقيع متوقع',
      action: 'قم بتغطية جميع شتلات القات فوراً باستخدام أغطية بلاستيكية أو قماشية. استخدم الري بالرش في الصباح الباكر لحماية الأوراق من التجمد.',
    };
  } else if (temp <= 5) {
    return {
      minTemp: temp,
      level: 'warning',
      message: 'خطر - برودة شديدة',
      action: 'قم بتغطية الشتلات الصغيرة والحساسة. تجنب الري في المساء. راقب الأوراق صباحاً للتأكد من عدم تضررها.',
    };
  } else {
    return {
      minTemp: temp,
      level: 'normal',
      message: 'الوضع طبيعي',
      action: 'لا حاجة لإجراءات خاصة. استمر في الرعاية المعتادة لمحصولك.',
    };
  }
}

const alertStyles: Record<AlertLevel, { bg: string; border: string; icon: string; textColor: string }> = {
  normal: {
    bg: 'bg-green-50',
    border: 'border-green-500',
    icon: '✅',
    textColor: 'text-green-700',
  },
  warning: {
    bg: 'bg-orange-50',
    border: 'border-orange-500',
    icon: '⚠️',
    textColor: 'text-orange-700',
  },
  danger: {
    bg: 'bg-red-50',
    border: 'border-red-500',
    icon: '🚨',
    textColor: 'text-red-700',
  },
};

export default function FarmAlertPage() {
  useLanguage(); // For RTL support
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AlertResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const regions = selectedGovernorate ? governorates[selectedGovernorate]?.regions || [] : [];

  const handleCheck = async () => {
    if (!selectedGovernorate || !selectedRegion) {
      setError('يرجى اختيار المحافظة والمنطقة');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const region = regions.find((r) => r.name === selectedRegion);
      if (!region) {
        throw new Error('المنطقة غير موجودة');
      }

      const response = await fetch(`/api/weather?lat=${region.lat}&lon=${region.lon}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'فشل في جلب بيانات الطقس');
      }

      const alertResult = getAlertLevel(data.minTemp);
      setResult(alertResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  const style = result ? alertStyles[result.level] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-beige to-white">
      <Header />
      <div className="max-w-md mx-auto px-4 py-8">
        {/* العنوان */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌡️</div>
          <h1 className="text-2xl font-bold text-amber-900 mb-2">إنذار المزارع</h1>
          <p className="text-amber-700 text-sm">تنبيه الصقيع والبرودة لمحصول القات</p>
        </div>

        {/* نموذج الاختيار */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="space-y-4">
            {/* اختيار المحافظة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المحافظة
              </label>
              <select
                value={selectedGovernorate}
                onChange={(e) => {
                  setSelectedGovernorate(e.target.value);
                  setSelectedRegion('');
                  setResult(null);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
              >
                <option value="">اختر المحافظة</option>
                {Object.entries(governorates).map(([key, gov]) => (
                  <option key={key} value={key}>
                    {gov.name}
                  </option>
                ))}
              </select>
            </div>

            {/* اختيار المنطقة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المنطقة
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  setResult(null);
                }}
                disabled={!selectedGovernorate}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">اختر المنطقة</option>
                {regions.map((region) => (
                  <option key={region.name} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            {/* زر التحقق */}
            <button
              onClick={handleCheck}
              disabled={loading || !selectedGovernorate || !selectedRegion}
              className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  جارٍ التحقق...
                </>
              ) : (
                <>
                  <span>🔍</span>
                  التحقق من الإنذار
                </>
              )}
            </button>
          </div>
        </div>

        {/* رسالة الخطأ */}
        {error && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6 text-red-700 text-center">
            {error}
          </div>
        )}

        {/* نتيجة الإنذار */}
        {result && style && (
          <div className={`${style.bg} border-2 ${style.border} rounded-xl p-6 shadow-md`}>
            <div className="text-center mb-4">
              <span className="text-4xl">{style.icon}</span>
              <h2 className={`text-xl font-bold mt-2 ${style.textColor}`}>
                {result.message}
              </h2>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">أقل حرارة متوقعة الليلة/الفجر</p>
                <p className={`text-4xl font-bold ${style.textColor}`}>
                  {result.minTemp}°
                </p>
                <p className="text-gray-500 text-xs">درجة مئوية</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <span>💡</span>
                ماذا أفعل الآن؟
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {result.action}
              </p>
            </div>
          </div>
        )}

        {/* ملاحظة */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>البيانات مبنية على توقعات الطقس وقد تختلف عن الواقع الفعلي</p>
          <p className="mt-1">يُنصح بمراقبة الطقس المحلي أيضاً</p>
        </div>
      </div>
    </div>
  );
}
