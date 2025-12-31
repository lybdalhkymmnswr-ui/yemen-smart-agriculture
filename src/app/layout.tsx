// Root Layout - Yemen Smart Agriculture Platform
// Wraps all pages with AuthProvider and global styles

import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: {
    default: 'منصة الزراعة الذكية اليمنية - Yemen Smart Agriculture',
    template: '%s | الزراعة الذكية اليمنية',
  },
  description: 'منصة متكاملة للمزارعين والموردين والخبراء الزراعيين في اليمن. قاعدة بيانات شاملة للمبيدات المسجلة، مقالات زراعية، واستشارات من خبراء متخصصين.',
  keywords: [
    'زراعة اليمن',
    'مبيدات زراعية',
    'الزراعة الذكية',
    'مزارعين يمنيين',
    'منتجات زراعية',
    'خبراء زراعيين',
    'مكافحة الآفات',
    'Yemen agriculture',
    'smart farming',
  ],
  authors: [{ name: 'منصة الزراعة الذكية اليمنية' }],
  creator: 'Yemen Smart Agriculture',
  publisher: 'Yemen Smart Agriculture',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_YE',
    url: 'https://yemen-smart-agriculture.vercel.app',
    siteName: 'منصة الزراعة الذكية اليمنية',
    title: 'منصة الزراعة الذكية اليمنية',
    description: 'منصة متكاملة للمزارعين والموردين والخبراء الزراعيين في اليمن',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'منصة الزراعة الذكية اليمنية',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'منصة الزراعة الذكية اليمنية',
    description: 'منصة متكاملة للمزارعين والموردين والخبراء الزراعيين في اليمن',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#16a34a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
