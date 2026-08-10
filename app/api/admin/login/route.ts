import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSessionToken, sessionCookie } from '@/lib/auth';

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;
const DUMMY_HASH = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxKtbm7N7QOrqJf2q4gBxP7yVjK';

function normalizePhone(value: unknown) {
  if (typeof value !== 'string') return '';
  const persian = '۰۱۲۳۴۵۶۷۸۹';
  const arabic = '٠١٢٣٤٥٦٧٨٩';
  let phone = value.trim().replace(/[۰-۹]/g, (digit) => String(persian.indexOf(digit)));
  phone = phone.replace(/[٠-٩]/g, (digit) => String(arabic.indexOf(digit))).replace(/[\s()-]/g, '');
  if (phone.startsWith('+98')) phone = `0${phone.slice(3)}`;
  if (phone.startsWith('0098')) phone = `0${phone.slice(4)}`;
  return phone;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const phone = normalizePhone(body?.phone);
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!/^09\d{9}$/.test(phone) || password.length < 8 || password.length > 128) {
      return NextResponse.json({ error: 'شماره موبایل یا رمز عبور نادرست است.' }, { status: 401 });
    }

    const admin = await prisma.admin.findUnique({ where: { phone } });
    const passwordMatches = await bcrypt.compare(password, admin?.password ?? DUMMY_HASH);
    const isLocked = Boolean(admin?.lockedUntil && admin.lockedUntil > new Date());

    if (!admin || !passwordMatches || isLocked) {
      if (admin && !isLocked) {
        const attempts = admin.failedLoginAttempts + 1;
        await prisma.admin.update({
          where: { id: admin.id },
          data: {
            failedLoginAttempts: attempts >= MAX_ATTEMPTS ? 0 : attempts,
            lockedUntil: attempts >= MAX_ATTEMPTS ? new Date(Date.now() + LOCK_MINUTES * 60 * 1000) : null,
          },
        });
      }
      return NextResponse.json({ error: 'شماره موبایل یا رمز عبور نادرست است.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
    }

    await prisma.admin.update({ where: { id: admin.id }, data: { failedLoginAttempts: 0, lockedUntil: null } });
    const response = NextResponse.json({ message: 'ورود موفقیت‌آمیز بود.' });
    response.cookies.set(sessionCookie.name, await createSessionToken(admin), sessionCookie.options);
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    console.error('Admin login failed:', error);
    return NextResponse.json({ error: 'ورود در حال حاضر ممکن نیست.' }, { status: 500 });
  }
}
