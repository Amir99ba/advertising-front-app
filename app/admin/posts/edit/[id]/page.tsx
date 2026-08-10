// app/admin/posts/edit/[id]/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEditPost } from '@/hooks/useEditPost';
import {
  Edit3,
  AlertCircle,
  Tag,
  FolderTree,
  FileText,
  Save,
  ArrowRight,
  ImageIcon,
} from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';

// تابع اصلاح و ایمن‌سازی آدرس تصویر برای جلوگیری از خطای Next.js Image
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

export default function EditPostPage({ params }: { params: { id: string } }) {
  const postId = params.id;
  const {
    formData,
    handleChange,
    handleSubmit,
    isFetching,
    isUpdating,
    error,
  } = useEditPost(postId);

  const isImage =
    formData.fileUrl &&
    formData.fileType &&
    formData.fileType.startsWith('image/');

  const validImageUrl = getValidImageUrl(formData.fileUrl);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#e8ecef] flex flex-col lg:flex-row font-sans antialiased"
    >
      {/* کامپوننت Sidebar تمام‌ارتفاع */}
      <Sidebar />

      {/* محتوای اصلی */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto">
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm max-w-4xl mx-auto w-full">
          
          {/* هدر بخش و دکمه بازگشت */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: 'var(--primary-divan)' }}
              >
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h1
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                  style={{ color: 'var(--primary-divan)' }}
                >
                  ویرایش پست
                </h1>
                <p className="text-sm text-slate-400 mt-0.5 font-medium">
                  اطلاعات پست انتخاب شده را به‌روزرسانی و ذخیره کنید
                </p>
              </div>
            </div>

            <Link
              href="/admin/posts"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors bg-slate-50 px-4 py-2.5 rounded-full"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به مدیریت پست‌ها</span>
            </Link>
          </div>

          {/* پیام خطا */}
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 text-sm font-medium rounded-2xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* حالت لودینگ اولیه (Skeleton) */}
          {isFetching ? (
            <div className="animate-pulse space-y-6">
              <div className="h-12 bg-slate-100 rounded-2xl w-full" />
              <div className="h-12 bg-slate-100 rounded-2xl w-full" />
              <div className="h-40 bg-slate-100 rounded-2xl w-full" />
              <div className="h-12 bg-slate-100 rounded-2xl w-full" />
              <div className="h-14 bg-slate-100 rounded-full w-full" />
            </div>
          ) : (
            /* فرم ویرایش پست */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* موضوع / عنوان */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>موضوع پست</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="عنوان پست..."
                  className="w-full bg-slate-100/80 border border-slate-200 text-slate-800 text-sm rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300 transition-all placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* دسته‌بندی */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-slate-400" />
                  <span>دسته‌بندی</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-100/80 border border-slate-200 text-slate-800 text-sm rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300 transition-all cursor-pointer font-medium"
                >
                  <option value="">یک دسته‌بندی انتخاب کنید</option>
                  <option value="technology">تکنولوژی</option>
                  <option value="education">آموزشی</option>
                  <option value="lifestyle">سبک زندگی</option>
                </select>
              </div>

              {/* متن پست */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-slate-400" />
                  <span>متن پست</span>
                </label>
                <textarea
                  name="content"
                  rows={6}
                  required
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="محتوای پست..."
                  className="w-full bg-slate-100/80 border border-slate-200 text-slate-800 text-sm rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300 transition-all placeholder:text-slate-400 font-medium resize-y"
                />
              </div>

              {/* تگ‌ها */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-slate-400" />
                  <span>تگ‌ها</span>
                  <span className="text-xs text-slate-400 font-normal">
                    (با کاما , جدا کنید)
                  </span>
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="مثال: برنامه‌نویسی, فرانت‌اند, وب"
                  className="w-full bg-slate-100/80 border border-slate-200 text-slate-800 text-sm rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300 transition-all placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* پیش‌نمایش تصویر یا فایل قبلی */}
              {formData.fileUrl && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="text-xs font-semibold text-slate-700 block">
                    فایل ضمیمه فعلی:
                  </span>
                  {isImage && validImageUrl ? (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                      <Image
                        src={validImageUrl}
                        alt="پیش‌نمایش تصویر"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ImageIcon className="w-4 h-4" />
                      <span className="truncate">{formData.fileUrl}</span>
                    </div>
                  )}
                </div>
              )}

              {/* دکمه ذخیره تغییرات */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isUpdating}
                  style={{ backgroundColor: 'var(--primary-divan)' }}
                  className="w-full text-white font-semibold py-3.5 px-6 rounded-full transition-transform active:scale-[0.99] shadow-md hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    {isUpdating ? 'در حال ذخیره تغییرات...' : 'ذخیره تغییرات'}
                  </span>
                </button>
              </div>

            </form>
          )}
        </section>
      </main>
    </div>
  );
}