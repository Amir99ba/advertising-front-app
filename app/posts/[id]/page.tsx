// app/posts/[id]/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchSinglePostApi } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  ImageIcon,
  AlertCircle,
} from 'lucide-react';

// تابع محاسبه زمان خواندن
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordsCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordsCount / wordsPerMinute);
  return readTime < 1 ? 1 : readTime;
}

// تابع فرمت تاریخ
function formatDate(dateString: string): string {
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

// تابع اصلاح آدرس تصویر برای جلوگیری از خطای Next.js Image
function getValidImageUrl(src?: string): string {
  if (!src) return '';
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('/')
  ) {
    return encodeURI(src);
  }
  return encodeURI(`/${src}`);
}

export default function SinglePostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // دریافت اطلاعات پست
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchSinglePostApi(id),
    enabled: !!id,
  });

  // ثبت بازدید پست
  useEffect(() => {
    if (!post?.id) return;
    const key = `viewed-post:${post.id}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
    void fetch(`/api/posts/${post.id}/view`, {
      method: 'POST',
      keepalive: true,
    });
  }, [post?.id]);

  const isImage =
    post?.fileUrl && post?.fileType && post.fileType.startsWith('image/');
  const readTime = post?.content ? calculateReadTime(post.content) : 1;
  const validImageUrl = getValidImageUrl(post?.fileUrl);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased"
    >
      <main className="max-w-3xl mx-auto my-6">
        
        {/* دکمه بازگشت به لیست پست‌ها */}
        <div className="mb-6">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors bg-white px-4 py-2.5 rounded-full shadow-sm border border-slate-100"
          >
            <ArrowRight className="w-4 h-4" />
            <span>بازگشت به همه پست‌ها</span>
          </Link>
        </div>

        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100">
          
          {/* حالت لودینگ (Skeleton) */}
          {isLoading && (
            <div className="animate-pulse space-y-6">
              <div className="w-full h-72 sm:h-96 bg-slate-100 rounded-3xl" />
              <div className="flex gap-4">
                <div className="h-6 bg-slate-100 rounded-full w-24" />
                <div className="h-6 bg-slate-100 rounded-full w-32" />
              </div>
              <div className="h-10 bg-slate-100 rounded-2xl w-3/4" />
              <div className="space-y-3 pt-4">
                <div className="h-4 bg-slate-100 rounded-full w-full" />
                <div className="h-4 bg-slate-100 rounded-full w-full" />
                <div className="h-4 bg-slate-100 rounded-full w-2/3" />
              </div>
            </div>
          )}

          {/* حالت خطا */}
          {(isError || (!isLoading && !post)) && (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-sm font-medium flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>
                  {error instanceof Error
                    ? error.message
                    : 'پست مورد نظر یافت نشد.'}
                </span>
              </div>
              <Link
                href="/posts"
                className="text-xs font-semibold text-slate-600 hover:underline"
              >
                بازگشت به لیست پست‌ها
              </Link>
            </div>
          )}

          {/* نمایش کامل مقاله */}
          {!isLoading && post && (
            <article>
              
              {/* ۱. تصویر اصلی مقاله */}
              <div className="w-full h-72 sm:h-[420px] bg-slate-100 relative rounded-3xl overflow-hidden mb-8 border border-slate-100 shadow-inner">
                {isImage && validImageUrl ? (
                  <Image
                    src={validImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                    <ImageIcon className="w-12 h-12 stroke-[1.5]" />
                    <span className="text-xs font-medium">تصویری برای این پست قرار داده نشده است</span>
                  </div>
                )}
              </div>

              {/* ۲. اطلاعات متادیتا (دسته‌بندی، تاریخ، زمان مطالعه) */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-3">
                  <span
                    className="font-bold px-3.5 py-1.5 rounded-full text-xs"
                    style={{
                      backgroundColor: 'oklch(0.95 0.03 22.69)',
                      color: 'var(--primary-divan)',
                    }}
                  >
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-full text-slate-600 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>زمان مطالعه: {readTime} دقیقه</span>
                </div>
              </div>

              {/* ۳. عنوان اصلی مقاله */}
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 leading-snug sm:leading-relaxed tracking-tight"
                style={{ color: 'var(--primary-divan)' }}
              >
                {post.title}
              </h1>

              {/* ۴. متن محتوای مقاله */}
              <div className="text-slate-700 leading-9 text-justify whitespace-pre-line font-normal text-base sm:text-lg">
                {post.content}
              </div>

              {/* ۵. برچسب‌ها (Tags) */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-slate-400 ml-2 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>برچسب‌ها:</span>
                  </div>
                  {post.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full font-medium hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

            </article>
          )}

        </section>
      </main>
    </div>
  );
}