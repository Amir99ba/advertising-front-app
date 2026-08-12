import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// ۱. ایمپورت مستقیم خطاهای پریزما از @prisma/client
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'; 
// یا اگر بالا کار نکرد، از ایمپورت مستقیم زیر استفاده کنید:
// import { Prisma } from '@prisma/client';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.post.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // ۲. بررسی خطا با استفاده از نوع دقیق یا چک کردن کد خطا بدون اتکای مستقیم به namespace
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2025'
    ) {
      return NextResponse.json({ error: 'پست یافت نشد.' }, { status: 404 });
    }

    console.error('Could not record post view:', error);
    return NextResponse.json(
      { error: 'خطایی در ثبت بازدید رخ داد.' },
      { status: 500 }
    );
  }
}