import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.post.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
      select: { id: true },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'پست یافت نشد.' }, { status: 404 });
    }
    console.error('Could not record post view:', error);
    return NextResponse.json({ error: 'ثبت بازدید انجام نشد.' }, { status: 500 });
  }
}
