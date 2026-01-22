import { NextRequest, NextResponse } from 'next/server';

// استخدام Open-Meteo API (مجاني بدون مفتاح)
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
      return NextResponse.json(
        { error: 'يرجى تحديد الإحداثيات (lat, lon)' },
        { status: 400 }
      );
    }

    // جلب بيانات الطقس من Open-Meteo (مجاني)
    const response = await fetch(
      `${WEATHER_API_URL}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min&timezone=Asia/Aden&forecast_days=1`,
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

    return NextResponse.json({
      minTemp: Math.round(minTemp),
      unit: 'celsius',
      date: data.daily?.time?.[0] || new Date().toISOString().split('T')[0],
    });
  } catch (error) {
    console.error('Weather API Error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب بيانات الطقس' },
      { status: 500 }
    );
  }
}
