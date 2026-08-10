// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

// ۱. دریافت اطلاعات یک پست تکی
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'پست مورد نظر یافت نشد.' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'خطایی در دریافت اطلاعات پست رخ داد.' },
      { status: 500 }
    );
  }
}

// ۲. ویرایش پست (PUT)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'دسترسی غیرمجاز است.' }, { status: 401 });
  }
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content, category, tags, fileUrl, fileType } = body;

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'عنوان، متن و دسته‌بندی الزامی هستند.' },
        { status: 400 }
      );
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        category,
        tags: tags || [],
        fileUrl: fileUrl || null,
        fileType: fileType || null,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'خطایی در ویرایش پست رخ داد.' },
      { status: 500 }
    );
  }
}

// ۳. حذف پست (DELETE)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'دسترسی غیرمجاز است.' }, { status: 401 });
  }
  try {
    const { id } = params;

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'پست با موفقیت حذف شد.' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'خطایی در حذف پست رخ داد.' },
      { status: 500 }
    );
  }
}
