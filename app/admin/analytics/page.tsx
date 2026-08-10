// app/admin/analytics/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  AnalyticsData,
  AnalyticsMetric as Metric,
  MOCK_ANALYTICS_DATA,
} from '@/lib/analytics-data';
import { TrendingUp, PieChart, Tag, Eye } from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';

const chartColors = [
  'var(--primary-divan)',
  'var(--secondary-divan)',
  '#2563eb',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#64748b',
];

const numberFormatter = new Intl.NumberFormat('fa-IR');

async function fetchAnalytics(): Promise<AnalyticsData> {
  try {
    const response = await fetch('/api/admin/analytics', { cache: 'no-store' });
    if (!response.ok) return MOCK_ANALYTICS_DATA;
    return await response.json();
  } catch {
    return MOCK_ANALYTICS_DATA;
  }
}

// --- کامپوننت نمودار دایره‌ای دسته‌بندی‌ها ---
function CategoryPie({ items }: { items: Metric[] }) {
  const total = items.reduce((sum, item) => sum + item.views, 0);
  let cursor = 0;
  const stops = items.map((item, index) => {
    const start = cursor;
    cursor += total ? (item.views / total) * 100 : 0;
    return `${chartColors[index % chartColors.length]} ${start}% ${cursor}%`;
  });

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-6">
      <div
        className="relative h-44 w-44 shrink-0 rounded-full transition-transform hover:scale-105"
        style={{
          background: total ? `conic-gradient(${stops.join(',')})` : '#e2e8f0',
        }}
        role="img"
        aria-label={`مجموع بازدید دسته‌بندی‌ها: ${numberFormatter.format(total)}`}
      >
        <div className="absolute inset-7 flex flex-col items-center justify-center rounded-full bg-white shadow-inner">
          <strong
            className="text-xl font-bold"
            style={{ color: 'var(--primary-divan)' }}
          >
            {numberFormatter.format(total)}
          </strong>
          <span className="text-xs text-slate-400 font-medium mt-0.5">بازدید</span>
        </div>
      </div>
      <div className="w-full min-w-0 space-y-2.5">
        {items.length ? (
          items.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2 text-xs">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: chartColors[index % chartColors.length] }}
              />
              <span className="min-w-0 flex-1 truncate text-slate-600 font-medium">
                {item.name}
              </span>
              <span
                className="font-bold tabular-nums"
                style={{ color: 'var(--primary-divan)' }}
              >
                {numberFormatter.format(item.views)}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-xs text-slate-400 py-4">
            هنوز بازدیدی ثبت نشده است.
          </p>
        )}
      </div>
    </div>
  );
}

// --- کامپوننت میله‌ای برچسب‌ها ---
function TagBars({ items }: { items: Metric[] }) {
  const maximum = Math.max(...items.map((item) => item.views), 1);
  return (
    <div className="space-y-3.5">
      {items.length ? (
        items.map((item) => (
          <div key={item.name}>
            <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
              <span className="truncate text-slate-600 font-medium">
                #{item.name}
              </span>
              <span
                className="font-bold tabular-nums"
                style={{ color: 'var(--primary-divan)' }}
              >
                {numberFormatter.format(item.views)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(item.views / maximum) * 100}%`,
                  backgroundColor: 'var(--primary-divan)',
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="py-8 text-center text-xs text-slate-400">
          برای نمایش نمودار، بازدید و برچسب لازم است.
        </p>
      )}
    </div>
  );
}

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: fetchAnalytics,
  });

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#e8ecef] flex flex-col lg:flex-row font-sans antialiased"
    >
      {/* کامپوننت Sidebar تمام‌ارتفاع */}
      <Sidebar />

      {/* محتوای اصلی */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto">
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {/* هدر بخش */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-slate-100 pb-6">
            <div>
              <h1
                className="text-3xl font-bold tracking-tight"
                style={{ color: 'var(--primary-divan)' }}
              >
                تحلیل داده و آمار
              </h1>
              <p className="text-sm text-slate-400 mt-1 font-medium">
                نمای کلی بازدید پست‌ها، دسته‌بندی‌ها و برچسب‌های وب‌سایت
              </p>
            </div>
            <Link
              href="/admin/posts"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <span>مدیریت پست‌ها</span>
              <span className="text-slate-400">←</span>
            </Link>
          </div>

          {/* حالت لودینگ */}
          {isLoading ? (
            <div className="grid animate-pulse gap-6 md:grid-cols-2">
              <div className="h-[520px] rounded-3xl bg-slate-100" />
              <div className="space-y-6">
                <div className="h-60 rounded-3xl bg-slate-100" />
                <div className="h-60 rounded-3xl bg-slate-100" />
              </div>
            </div>
          ) : data ? (
            <div className="grid gap-6 lg:grid-cols-12">
              
              {/* جدول ۲۰ پست پربازدید */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <TrendingUp
                      className="w-5 h-5"
                      style={{ color: 'var(--primary-divan)' }}
                    />
                    <h2 className="font-bold text-slate-900 text-base">
                      ۲۰ پست پربازدید
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    مرتب‌شده بر اساس بازدید
                  </span>
                </div>

                <div className="overflow-x-auto max-h-[580px]">
                  <table className="w-full text-right border-collapse min-w-[480px]">
                    <thead className="sticky top-0 z-10 bg-slate-50 text-xs font-medium text-slate-400">
                      <tr>
                        <th className="py-3 px-3 text-center w-12">رتبه</th>
                        <th className="py-3 px-3">عنوان پست</th>
                        <th className="py-3 px-3">دسته‌بندی</th>
                        <th className="py-3 px-3 text-left">بازدید</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-xs sm:text-sm">
                      {data.topPosts.length ? (
                        data.topPosts.map((post, index) => (
                          <tr
                            key={post.id}
                            className="group hover:bg-slate-50/50 transition-colors"
                          >
                            <td className="py-3.5 px-3 text-center font-medium text-slate-400">
                              {numberFormatter.format(index + 1)}
                            </td>
                            <td className="py-3.5 px-3 font-semibold text-slate-900 max-w-[220px]">
                              {data.isMock ? (
                                <span className="block truncate">{post.title}</span>
                              ) : (
                                <Link
                                  href={`/posts/${post.id}`}
                                  className="block truncate hover:underline"
                                  style={{ color: 'var(--primary-divan)' }}
                                >
                                  {post.title}
                                </Link>
                              )}
                            </td>
                            <td className="py-3.5 px-3">
                              <span
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                                style={{
                                  backgroundColor: 'oklch(0.95 0.03 22.69)',
                                  color: 'var(--primary-divan)',
                                }}
                              >
                                {post.category}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 text-left font-bold tabular-nums text-slate-900">
                              <div className="flex items-center justify-end gap-1.5">
                                <Eye className="w-3.5 h-3.5 text-slate-400" />
                                <span>{numberFormatter.format(post.views)}</span>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="py-16 text-center text-slate-400 font-medium"
                          >
                            هنوز پستی وجود ندارد.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* آمار دسته‌بندی و برچسب‌ها */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* نمودار دسته‌بندی */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                    <PieChart
                      className="w-5 h-5"
                      style={{ color: 'var(--primary-divan)' }}
                    />
                    <h2 className="font-bold text-slate-900 text-base">
                      بازدید بر اساس دسته‌بندی
                    </h2>
                  </div>
                  <CategoryPie items={data.categories} />
                </div>

                {/* نمودار برچسب‌ها */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                    <Tag
                      className="w-5 h-5"
                      style={{ color: 'var(--primary-divan)' }}
                    />
                    <h2 className="font-bold text-slate-900 text-base">
                      بازدید بر اساس برچسب
                    </h2>
                  </div>
                  <TagBars items={data.tags} />
                </div>

              </div>

            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}