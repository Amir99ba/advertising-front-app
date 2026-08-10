// app/admin/login/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import logoSvg from "@/assets/logo.svg";
import { Phone, Lock, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'خطا در ورود به حساب کاربری');
      }

      // انتقال به صفحه مدیریت پست‌ها پس از ورود موفق
      router.push('/admin/posts');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('خطای غیرمنتظره‌ای رخ داده است.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#e8ecef] p-4 sm:p-6 lg:p-8 flex items-center justify-center font-sans antialiased"
    >
      <main className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-100 flex flex-col items-center">
        
        {/* لوگو دیوان */}
        <div className="flex items-center gap-3 mb-6">
          <Image
            src={logoSvg}
            alt="لوگوی دیوان"
            width={32}
            height={32}
            priority
          />
          <span
            className="text-2xl font-bold tracking-tight"
            style={{ color: 'var(--primary-divan)' }}
          >
            دیوان (DIVAN)
          </span>
        </div>

        {/* تیتر و توضیحات */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-slate-900">ورود مدیر سیستم</h1>
          <p className="text-xs text-slate-400 mt-1.5 font-medium leading-relaxed">
            جهت دسترسی به پنل مدیریت پست‌ها، شماره موبایل و رمز عبور خود را وارد کنید
          </p>
        </div>

        {/* پیام خطا */}
        {error && (
          <div className="w-full mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold rounded-2xl flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* فرم ورود */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          
          {/* ورودی شماره موبایل */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>شماره موبایل</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                required
                autoComplete="username"
                inputMode="tel"
                className="w-full bg-slate-100/80 border border-slate-200 text-slate-800 text-sm rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300 transition-all placeholder:text-slate-400 font-medium ltr text-right"
              />
            </div>
          </div>

          {/* ورودی رمز عبور */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>رمز عبور</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                maxLength={128}
                autoComplete="current-password"
                className="w-full bg-slate-100/80 border border-slate-200 text-slate-800 text-sm rounded-2xl pr-4 pl-11 py-3 outline-none focus:ring-2 focus:ring-slate-300 transition-all placeholder:text-slate-400 font-medium ltr text-right"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                title={showPassword ? 'مخفی‌سازی رمز' : 'نمایش رمز'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* دکمه ارسال */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              style={{ backgroundColor: 'var(--primary-divan)' }}
              className="w-full text-white font-semibold py-3.5 px-6 rounded-full transition-transform active:scale-[0.99] shadow-md hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>{isLoading ? 'در حال بررسی...' : 'ورود به پنل'}</span>
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}