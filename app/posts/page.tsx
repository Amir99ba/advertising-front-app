// app/posts/page.tsx
'use client';

import React, { useState } from 'react';
import { usePosts } from '@/hooks/usePosts';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Search,
  ImageIcon,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';

// اینترفیس مشخص برای پست‌ها
interface Post {
  id: string;
  title: string;
  content: string;
  category?: string;
  createdAt?: string;
  fileUrl?: string | null;
  fileType?: string | null;
  [key: string]: any;
}

// تعداد پست‌هایی که در هر مرحله نمایش داده می‌شوند
const POSTS_PER_PAGE = 6;

// تابع محاسبه زمان خواندن
function calculateReadTime(content?: string): number {
  if (!content) return 1;
  const wordsPerMinute = 200;
  const wordsCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordsCount / wordsPerMinute);
  return readTime < 1 ? 1 : readTime;
}

// تابع فرمت تاریخ
function formatDate(dateString?: string): string {
  if (!dateString) return '';
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

// تابع ایمن‌سازی آدرس عکس
function getValidImageUrl(src?: string | null): string {
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

export default function PostsListPage() {
  const { posts = [], isLoading, isError, error } = usePosts();
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(POSTS_PER_PAGE);

  // اطمینان از آرایه بودن posts
  const safePosts: Post[] = Array.isArray(posts) ? posts : [];

  // استخراج دسته‌بندی‌های یکتا با تایپ صریح string[]
  const categories: string[] = [
    'همه',
    ...Array.from(
      new Set(
        safePosts
          .map((p: Post) => p.category)
          .filter((cat): cat is string => Boolean(cat))
      )
    ),
  ];

  // فیلتر کردن پست‌ها بر اساس جستجو و دسته‌بندی
  const filteredPosts = safePosts.filter((post: Post) => {
    const matchesCategory =
      selectedCategory === 'همه' || post.category === selectedCategory;
    const matchesSearch =
      (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.content || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // پست اول (اصلی)
  const mainPost = filteredPosts[0];
  // بقیه پست‌ها
  const remainingPosts = filteredPosts.slice(1);
  // پست‌های قابل نمایش فعلی بر اساس Load More
  const visiblePosts = remainingPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <main className="max-w-6xl mx-auto space-y-10">
        
        {/* ۱. هدر مجله */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary-divan)]/10 text-[var(--primary-divan)] text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مجله و مقالات دیوان</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: 'var(--primary-divan)' }}
            >
              تازه‌ترین روایت‌ها و تحلیل‌ها
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              جدیدترین مطالب در حوزه مارکتینگ، برندینگ و رشد کسب‌وکارها
            </p>
          </div>

          {/* کادر جستجو */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="جستجو در مقالات..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(POSTS_PER_PAGE);
              }}
              className="w-full bg-white border border-slate-200 rounded-full pr-4 pl-10 py-2.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-[var(--primary-divan)]/20 transition-all shadow-sm placeholder:text-slate-400 font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </header>

        {/* ۲. فیلتر دسته‌بندی‌ها */}
        {!isLoading && !isError && categories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat: string) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(POSTS_PER_PAGE);
                  }}
                  style={
                    isActive
                      ? { backgroundColor: 'var(--primary-divan)', color: '#fff' }
                      : {}
                  }
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'shadow-md shadow-[var(--primary-divan)]/20'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* حالت لودینگ */}
        {isLoading && (
          <div className="space-y-8">
            <div className="w-full h-80 bg-slate-200/70 rounded-3xl animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-4 h-80 animate-pulse border border-slate-100 flex flex-col justify-between"
                >
                  <div className="w-full h-44 bg-slate-200/70 rounded-2xl" />
                  <div className="h-4 bg-slate-200/70 rounded-full w-3/4 my-2" />
                  <div className="h-3 bg-slate-200/70 rounded-full w-full" />
                  <div className="h-3 bg-slate-200/70 rounded-full w-1/2" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* حالت خطا */}
        {isError && (
          <div className="p-4 bg-rose-50 border border-rose-100 text-rose-700 text-sm font-medium rounded-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{typeof error === 'string' ? error : 'خطایی در دریافت لیست مقالات رخ داد.'}</span>
          </div>
        )}

        {/* حالت نبود مقاله */}
        {!isLoading && !isError && filteredPosts.length === 0 && (
          <div className="text-center py-16 text-slate-500 bg-white rounded-3xl border border-dashed border-slate-200">
            <BookOpen className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-semibold text-slate-700">هیچ مقاله‌ای یافت نشد!</p>
            <p className="text-xs text-slate-400 mt-1">عبارت دیگری را جستجو کنید یا فیلترها را تغییر دهید.</p>
          </div>
        )}

        {/* ۳. لیست مقالات */}
        {!isLoading && !isError && filteredPosts.length > 0 && (
          <div className="space-y-10">
            
            {/* کارت مقاله اصلی (متن سمت راست / عکس سمت چپ) */}
            {mainPost && (
              <Link
                href={`/posts/${mainPost.id}`}
                className="group relative block bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="grid lg:grid-cols-12 items-center">
                  
                  {/* اطلاعات پست اصلی (سمت راست - RTL) */}
                  <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between h-full order-2 lg:order-1">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        {mainPost.category && (
                          <span
                            className="px-3.5 py-1 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: 'oklch(0.95 0.03 22.69)',
                              color: 'var(--primary-divan)',
                            }}
                          >
                            {mainPost.category}
                          </span>
                        )}
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(mainPost.createdAt)}</span>
                        </div>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[var(--primary-divan)] line-clamp-2 transition-colors mb-3 leading-snug">
                        {mainPost.title}
                      </h2>

                      <p className="text-slate-600 text-xs sm:text-sm leading-6 line-clamp-3 mb-6">
                        {mainPost.content}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-full">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{calculateReadTime(mainPost.content)} دقیقه مطالعه</span>
                      </span>

                      <span
                        className="inline-flex items-center gap-1.5 font-bold transition-transform group-hover:-translate-x-1"
                        style={{ color: 'var(--primary-divan)' }}
                      >
                        <span>ادامه مطلب</span>
                        <ArrowLeft className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* تصویر پست اصلی (سمت چپ - RTL) */}
                  <div className="lg:col-span-6 relative h-72 sm:h-96 w-full bg-slate-100 overflow-hidden order-1 lg:order-2">
                    {mainPost.fileUrl &&
                    mainPost.fileType?.startsWith('image/') ? (
                      <Image
                        src={getValidImageUrl(mainPost.fileUrl)}
                        alt={mainPost.title || 'تصویر مقاله'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                        <ImageIcon className="w-10 h-10 stroke-[1.5]" />
                        <span className="text-xs font-medium">بدون تصویر</span>
                      </div>
                    )}
                  </div>

                </div>
              </Link>
            )}

            {/* گرید مقالات بعدی */}
            {visiblePosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visiblePosts.map((post: Post) => {
                  const isImage =
                    post.fileUrl &&
                    post.fileType &&
                    post.fileType.startsWith('image/');
                  const readTime = calculateReadTime(post.content);

                  return (
                    <Link
                      href={`/posts/${post.id}`}
                      key={post.id}
                      className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* تصویر کارت */}
                      <div className="w-full h-48 bg-slate-100 relative overflow-hidden">
                        {isImage && post.fileUrl ? (
                          <Image
                            src={getValidImageUrl(post.fileUrl)}
                            alt={post.title || 'تصویر مقاله'}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-1.5">
                            <ImageIcon className="w-8 h-8 stroke-[1.5]" />
                            <span className="text-[11px] font-medium">بدون تصویر</span>
                          </div>
                        )}
                        {post.category && (
                          <span
                            className="absolute top-3 right-3 text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md bg-white/90 shadow-sm"
                            style={{ color: 'var(--primary-divan)' }}
                          >
                            {post.category}
                          </span>
                        )}
                      </div>

                      {/* بدنه کارت */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 group-hover:text-[var(--primary-divan)] line-clamp-2 mb-2 transition-colors leading-snug">
                            {post.title}
                          </h3>

                          <p className="text-slate-500 text-xs line-clamp-3 mb-4 leading-6 font-normal">
                            {post.content}
                          </p>
                        </div>

                        {/* متادیتا پایینی کارت */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-full text-slate-600">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{readTime} دقیقه</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* دکمه بارگذاری مقالات بیشتر */}
            {visibleCount < remainingPosts.length && (
              <div className="pt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  style={{ backgroundColor: 'var(--primary-divan)' }}
                  className="inline-flex items-center gap-2 text-white text-xs font-bold px-8 py-3.5 rounded-full shadow-lg hover:opacity-95 transition-all duration-200 active:scale-95"
                >
                  <span>مشاهده مقالات بیشتر</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </button>
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}