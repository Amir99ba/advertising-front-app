// app/admin/posts/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useAdminPosts } from '@/hooks/useAdminPosts';
import {
  Search,
  Edit2,
  Trash2,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';

function formatDate(dateString: string): string {
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

export default function AdminPostsPage() {
  const {
    posts,
    pagination,
    isLoading,
    isError,
    error,
    page,
    setPage,
    search,
    setSearch,
    deletePost,
    isDeleting,
  } = useAdminPosts();

  const handleDelete = (id: string, title: string) => {
    if (confirm(`آیا از حذف پست "${title}" اطمینان دارید؟`)) {
      deletePost(id);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#e8ecef] flex flex-col lg:flex-row font-sans antialiased"
    >
      {/* منوی کناری تمام‌ارتفاع */}
      <Sidebar />

      {/* محتوای اصلی با پدینگ مناسب */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto">
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {/* هدر بخش و کادر جستجو */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1
                className="text-3xl font-bold tracking-tight"
                style={{ color: 'var(--primary-divan)' }}
              >
                مدیریت پست‌ها
              </h1>
              <p className="text-sm text-slate-400 mt-1 font-medium">
                <span
                  className="font-semibold"
                  style={{ color: 'var(--primary-divan)' }}
                >
                  {pagination?.totalPosts || 0} مورد در مجموع
                </span>
                ، در دسترس جهت مدیریت
              </p>
            </div>

            {/* کادر جستجو */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="جستجو در عنوان، متن یا دسته‌بندی..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-slate-100/80 text-slate-700 text-sm rounded-full pr-4 pl-10 py-2.5 outline-none focus:ring-2 focus:ring-slate-300 placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* پیغام خطا */}
          {isError && (
            <div className="p-4 mb-6 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl text-sm font-medium">
              {error || 'خطایی در دریافت اطلاعات رخ داده است.'}
            </div>
          )}

          {/* جدول پست‌ها */}
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-medium text-slate-400">
                  <th className="pb-3 w-12 text-center">#</th>
                  <th className="pb-3 font-medium">عنوان پست</th>
                  <th className="pb-3 font-medium">دسته‌بندی</th>
                  <th className="pb-3 font-medium">تاریخ انتشار</th>
                  <th className="pb-3 font-medium text-center w-32">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs sm:text-sm">
                {isLoading ? (
                  [1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="animate-pulse">
                      <td className="py-4 text-center">
                        <div className="h-4 bg-slate-100 rounded w-4 mx-auto" />
                      </td>
                      <td className="py-4">
                        <div className="h-4 bg-slate-100 rounded w-48" />
                      </td>
                      <td className="py-4">
                        <div className="h-4 bg-slate-100 rounded w-20" />
                      </td>
                      <td className="py-4">
                        <div className="h-4 bg-slate-100 rounded w-28" />
                      </td>
                      <td className="py-4">
                        <div className="h-4 bg-slate-100 rounded w-20 mx-auto" />
                      </td>
                    </tr>
                  ))
                ) : posts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-slate-400 font-medium">
                      هیچ پستی یافت نشد.
                    </td>
                  </tr>
                ) : (
                  posts.map((post, index) => {
                    const rowNumber = (page - 1) * 10 + index + 1;

                    return (
                      <tr
                        key={post.id}
                        className="group hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="py-4 text-center font-medium text-slate-400">
                          {rowNumber}
                        </td>
                        <td className="py-4 font-semibold text-slate-900 line-clamp-1">
                          {post.title}
                        </td>
                        <td className="py-4">
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                            style={{
                              backgroundColor: 'oklch(0.95 0.03 22.69)',
                              color: 'var(--primary-divan)',
                            }}
                          >
                            {post.category}
                          </span>
                        </td>
                        <td className="py-4 text-slate-500 font-medium">
                          {formatDate(post.createdAt)}
                        </td>
                        <td className="py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              href={`/admin/posts/edit/${post.id}`}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                              title="ویرایش"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(post.id, post.title)}
                              disabled={isDeleting}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* صفحه‌بندی */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-slate-500">
              <span>
                صفحه {pagination.currentPage} از {pagination.totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1 || isLoading}
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>قبلی</span>
                </button>
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, pagination.totalPages))
                  }
                  disabled={page === pagination.totalPages || isLoading}
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>بعدی</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}