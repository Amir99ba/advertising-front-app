// app/api/admin/logout/route.ts
import { NextResponse } from 'next/server';
import { sessionCookie } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({ message: 'خروج موفقیت‌آمیز بود' });
  
  // پاک کردن کوکی جلسات
  response.cookies.set(sessionCookie.name, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
    path: '/',
  });

  return response;
}
