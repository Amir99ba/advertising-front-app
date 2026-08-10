// app/posts/create/page.tsx
'use client';

import React from 'react';
import { useCreatePost } from '@/hooks/useCreatePost';
import {
  PenTool,
  Upload,
  CheckCircle2,
  AlertCircle,
  Tag,
  FolderTree,
  FileText,
  Send,
} from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';

export default function CreatePostPage() {
  const {
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
    isLoading,
    isSuccess,
    error,
  } = useCreatePost();

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
          
          {/* هدر صفحه */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: 'var(--primary-divan)' }}
            >
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h1
                className="text-2xl sm:text-3xl font-bold tracking-tight"
                style={{ color: 'var(--primary-divan)' }}
              >
                ایجاد پست جدید
              </h1>
              <p className="text-sm text-slate-400 mt-0.5 font-medium">
                اطلاعات و محتوای پست خود را جهت انتشار وارد کنید
              </p>
            </div>
          </div>

          {/* پیام موفقیت */}
          {isSuccess && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
              <span>پست با موفقیت در دیتابیس ثبت شد!</span>
            </div>
          )}

          {/* پیام خطا */}
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 text-sm font-medium rounded-2xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* فرم ایجاد پست */}
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
                placeholder="عنوان جذاب برای پست خود وارد کنید..."
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
                <PenTool className="w-4 h-4 text-slate-400" />
                <span>متن پست</span>
              </label>
              <textarea
                name="content"
                rows={6}
                required
                value={formData.content}
                onChange={handleChange}
                placeholder="محتوای کامل پست خود را بنویسید..."
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

            {/* آپلود فایل */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <Upload className="w-4 h-4 text-slate-400" />
                <span>فایل پیوست</span>
                <span className="text-xs text-slate-400 font-normal">
                  (عکس، ویدیو یا PDF)
                </span>
              </label>
              <div className="relative border-2 border-dashed border-slate-200 hover:border-slate-300 bg-slate-50/50 rounded-2xl p-6 text-center cursor-pointer transition-colors">
                <input
                  type="file"
                  accept="image/*,video/*,.pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="p-3 bg-white rounded-full shadow-sm">
                    <Upload className="w-5 h-5 text-slate-500" />
                  </div>
                  <p className="text-xs font-semibold text-slate-700">
                    برای آپلود فایل کلیک کنید یا فایل را به اینجا بکشید
                  </p>
                  <p className="text-[11px] text-slate-400">
                    فرمت‌های مجاز: عکس، ویدیو، PDF
                  </p>
                </div>
              </div>
            </div>

            {/* دکمه ثبت */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                style={{ backgroundColor: 'var(--primary-divan)' }}
                className="w-full text-white font-semibold py-3.5 px-6 rounded-full transition-transform active:scale-[0.99] shadow-md hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>{isLoading ? 'در حال ارسال...' : 'ارسال پست'}</span>
              </button>
            </div>

          </form>
        </section>
      </main>
    </div>
  );
}