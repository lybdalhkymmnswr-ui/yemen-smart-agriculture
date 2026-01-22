import { NextRequest, NextResponse } from 'next/server';

// استخدام Open-Meteo API (مجاني بدون مفتاح)
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

// Rate Limiting بسيط (في الذاكرة - للـ MVP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 دقيقة
const RATE_LIMIT_MAX_REQUESTS = 30; // 30 طلب في الدقيقة

function getRateLimitKey(request: NextRequest): string {
  // استخدام IP أو fallback
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return ip;
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count };
}

// Input Validation
function validateCoordinates(lat: string | null, lon: string | null): { valid: boolean; error?: string } {
  if (!lat || !lon) {
    return { valid: false, error: 'يرجى تحديد الإحداثيات (lat, lon)' };
  }

  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);

  // التحقق من أن القيم أرقام صحيحة
  if (isNaN(latNum) || isNaN(lonNum)) {
    return { valid: false, error: 'الإحداثيات يجب أن تكون أرقام صحيحة' };
  }

  // التحقق من النطاق الجغرافي (اليمن تقريباً)
  // خط العرض: 12-19، خط الطول: 42-55
  if (latNum < 10 || latNum > 25 || lonNum < 40 || lonNum > 60) {
    return { valid: false, error: 'الإحداثيات خارج النطاق المدعوم (اليمن)' };
  }

  return { valid: true };
}

// منع Open Redirect
function sanitizeInput(input: string): string {
  // إزالة أي محاولات حقن
  return input.replace(/[<>\"\'&;]/g, '');
}

export async function GET(request: NextRequest) {
  try {
    // Rate Limiting
    const rateLimitKey = getRateLimitKey(request);
    const { allowed, remaining } = checkRateLimit(rateLimitKey);

    if (!allowed) {
      return NextResponse.json(
        { error: 'تم تجاوز الحد الأقصى للطلبات. يرجى المحاولة لاحقاً.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60',
          }
        }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    // Input Validation
    const validation = validateCoordinates(lat, lon);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // تنظيف المدخلات
    const safeLat = sanitizeInput(lat!);
    const safeLon = sanitizeInput(lon!);

    // جلب بيانات الطقس من Open-Meteo (مجاني)
    const response = await fetch(
      `${WEATHER_API_URL}?latitude=${safeLat}&longitude=${safeLon}&daily=temperature_2m_min&timezone=Asia/Aden&forecast_days=1`,
      { next: { revalidate: 3600 } } // Cache لمدة ساعة
    );

    if (!response.ok) {
      throw new Error('فشل في جلب بيانات الطقس');
    }

    const data = await response.json();

    // استخراج أقل درجة حرارة متوقعة لليوم
    const minTemp = data.daily?.temperature_2m_min?.[0];

    if (minTemp === undefined || minTemp === null) {
      throw new Error('لم يتم العثور على بيانات درجة الحرارة');
    }

    return NextResponse.json(
      {
        minTemp: Math.round(minTemp),
        unit: 'celsius',
        date: data.daily?.time?.[0] || new Date().toISOString().split('T')[0],
      },
      {
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
        }
      }
    );
  } catch (error) {
    console.error('Weather API Error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب بيانات الطقس' },
      { status: 500 }
    );
  }
}
