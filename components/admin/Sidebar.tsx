// components/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import logoSvg from "@/assets/logo.svg";
import { usePathname } from 'next/navigation';
import {
  SquarePlus,
  FolderKanban,
  BarChart3,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';

// --- داده‌های منو ---
const NAV_ITEMS = [
  { id: 'create-post', label: 'ایجاد پست', icon: SquarePlus, href: '/admin/posts/create' },
  { id: 'manage-posts', label: 'مدیریت پست', icon: FolderKanban, href: '/admin/posts' },
  { id: 'data-analysis', label: 'تحلیل داده', icon: BarChart3, href: '/admin/analytics' },
];

// --- عملیات خروج ---
const handleLogout = async () => {
  try {
    await fetch('/api/admin/logout', { method: 'POST' });
  } catch (error) {
    console.error('خطا در خروج:', error);
  } finally {
    window.location.href = '/admin/login';
  }
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 h-auto lg:h-screen lg:sticky lg:top-0 bg-white p-6 flex flex-col justify-between shrink-0 shadow-sm border-l border-slate-100 z-20">
      <div className="space-y-8">
        {/* لوگو دیوان */}
        <div className="flex items-center gap-3 px-2 pt-2">
          <Image
            src={logoSvg}
            alt="لوگوی دیوان"
            width={32}
            height={32}
            priority
          />
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: 'var(--primary-divan)' }}
          >
            دیوان (DIVAN)
          </span>
        </div>

        {/* منوی ناوبری */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                style={
                  isActive
                    ? { backgroundColor: 'var(--primary-divan)', color: '#ffffff' }
                    : {}
                }
                className={`w-full flex items-center justify-between px-4 py-3 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'shadow-md'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* دکمه خروج از حساب */}
      <div className="pt-6 pb-2 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-full text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>خروج از حساب</span>
        </button>
      </div>
    </aside>
  );
}