// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const skip = (page - 1) * limit;

    // شرط جستجو بر اساس عنوان یا متن یا دسته‌بندی
    const whereCondition = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { content: { contains: search, mode: 'insensitive' as const } },
            { category: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    // دریافت پست‌ها و تعداد کل به‌صورت هم‌زمان
    const [posts, totalPosts] = await Promise.all([
      prisma.post.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' }, // مرتب‌سازی بر اساس تاریخ (جدیدترین)
        skip,
        take: limit,
      }),
      prisma.post.count({ where: whereCondition }),
    ]);

    const totalPages = Math.ceil(totalPosts / limit);

    return NextResponse.json({
      posts,
      pagination: {
        totalPosts,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching admin posts:', error);
    return NextResponse.json(
      { error: 'خطایی در دریافت پست‌ها رخ داد.' },
      { status: 500 }
    );
  }
}

// ۲. متد ثبت پست جدید (POST)
export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'دسترسی غیرمجاز است.' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { title, content, category, tags, fileUrl, fileType } = body;

    // اعتبارسنجی ورودی‌ها
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'عنوان، متن و دسته‌بندی الزامی هستند.' },
        { status: 400 }
      );
    }

    // ذخیره در دیتابیس PostgreSQL با Prisma
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        category,
        tags: tags || [],
        fileUrl: fileUrl || null,
        fileType: fileType || null,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'خطایی در ثبت پست رخ داد.' },
      { status: 500 }
    );
  }
}
