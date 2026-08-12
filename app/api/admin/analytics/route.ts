import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import { MOCK_ANALYTICS_DATA } from '@/lib/analytics-data';

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'دسترسی غیرمجاز است.' }, { status: 401 });
  }

  try {
    const posts = await prisma.post.findMany({
      select: { id: true, title: true, category: true, tags: true, views: true },
      orderBy: { views: 'desc' },
    });
    if (posts.length === 0) {
      return NextResponse.json(MOCK_ANALYTICS_DATA, { headers: { 'Cache-Control': 'no-store' } });
    }
    const categoryTotals = new Map<string, number>();
    const tagTotals = new Map<string, number>();
    for (const post of posts) {
      const category = post.category.trim() || 'بدون دسته‌بندی';
      categoryTotals.set(category, (categoryTotals.get(category) ?? 0) + post.views);
      for (const rawTag of Array.from(new Set(post.tags as string[]))) {
        const tag = typeof rawTag === 'string' ? rawTag.trim() : '';
        if (tag) tagTotals.set(tag, (tagTotals.get(tag) ?? 0) + post.views);
      }
    }
    const descending = (a: [string, number], b: [string, number]) => b[1] - a[1];
    return NextResponse.json({
      topPosts: posts.slice(0, 20),
      categories: Array.from(categoryTotals.entries()).sort(descending).map(([name, views]) => ({ name, views })),
      tags: Array.from(tagTotals.entries()).sort(descending).slice(0, 12).map(([name, views]) => ({ name, views })),
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Could not load analytics:', error);
    return NextResponse.json(MOCK_ANALYTICS_DATA, { headers: { 'Cache-Control': 'no-store' } });
  }
}
