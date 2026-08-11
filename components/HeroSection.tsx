// components/HeroSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, TrendingUp, Users, Play, Zap } from "lucide-react";
import officeImage from "@/assets/agency-office.jpg";
import delvese from "@/assets/delvese.svg";
import sarairani from "@/assets/sarairani.svg";
import snapp from "@/assets/snapp.svg";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] w-full flex flex-col justify-between overflow-hidden py-10 lg:py-16 select-none"
    >
      {/* پس‌زمینه‌های پویای نوری ملایم */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-divan)]/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 top-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-[var(--secondary-divan)]/20 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 w-full my-auto">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* ستون متن و توضیحات */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start text-right">
            
            {/* نشانگر بالای تیتر */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--primary-divan)]/20 bg-white/60 px-4 py-1.5 text-xs font-semibold text-[var(--primary-divan)] backdrop-blur-md shadow-sm">
              <span className="flex size-2 rounded-full bg-[var(--primary-divan)] animate-pulse" />
              <Sparkles className="size-3.5 text-[var(--primary-divan)]" />
              <span>آژانس تبلیغاتی ۳۶۰ درجه و خلاق دیوان</span>
            </div>

            {/* تیتر اصلی */}
            <h1 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.2] tracking-tight text-slate-900">
              برند شما شایسته <br />
              <span className="bg-gradient-to-r from-[var(--primary-divan)] via-purple-600 to-[var(--primary-divan)] bg-clip-text text-transparent">
                روایتی متفاوت و خلق رشد
              </span>{" "}
              است
            </h1>

            {/* توضیحات */}
            <p className="mt-6 max-w-2xl text-sm sm:text-base leading-8 text-slate-600 font-normal">
              دیوان با ترکیب تحلیل هوشمندانه بازار، هویت بصری استثنایی و کمپین‌های تبلیغاتی پربازده،
              مسیر رشد برند شما را هموار می‌کند. ما هزینه‌های تبلیغات شما را به ارزش واقعی تبدیل می‌کنیم.
            </p>

            {/* دکمه‌های اقدام */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              
              {/* دکمه اصلی */}
              <Link
                href="#contact"
                style={{ backgroundColor: "var(--primary-divan)" }}
                className="relative group overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[var(--primary-divan)]/25 transition-all duration-300 hover:opacity-95 hover:shadow-xl hover:shadow-[var(--primary-divan)]/35 active:scale-95 w-full sm:w-auto"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <Zap className="size-4 fill-current text-amber-300 animate-pulse" />
                <span>مشاوره و شروع همکاری</span>
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1.5" />
              </Link>

              {/* دکمه ثانویه */}
              <Link
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-4 text-sm font-semibold text-slate-700 backdrop-blur-md shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 w-full sm:w-auto"
              >
                <div className="flex size-6 items-center justify-center rounded-full bg-slate-100 text-slate-800">
                  <Play className="size-3 fill-current translate-x-[-1px]" />
                </div>
                <span>مشاهده نمونه‌کارها</span>
              </Link>

            </div>

            {/* بخش لوگوی مشتریان (با سایز بزرگ‌تر و واضح‌تر) */}
<div className="mt-10 flex flex-wrap items-center gap-6 pt-6 border-t border-slate-200/80">
  
  <div className="flex -space-x-3 space-x-reverse overflow-hidden items-center">
    {/* لوگوی اسنپ */}
    <div className="inline-flex size-12 items-center justify-center rounded-full bg-white ring-2 ring-slate-100 shadow-sm p-1.5 z-30">
      <Image
        src={snapp}
        alt="اسنپ"
        width={36}
        height={36}
        className="object-contain size-full"
      />
    </div>

    {/* لوگوی سرای ایرانی */}
    <div className="inline-flex size-12 items-center justify-center rounded-full bg-white ring-2 ring-slate-100 shadow-sm p-1.5 z-20">
      <Image
        src={sarairani}
        alt="سرای ایرانی"
        width={36}
        height={36}
        className="object-contain size-full"
      />
    </div>

    {/* لوگوی دلوسه */}
    <div className="inline-flex size-12 items-center justify-center rounded-full bg-white ring-2 ring-slate-100 shadow-sm p-1.5 z-10">
      <Image
        src={delvese}
        alt="دلوسه"
        width={36}
        height={36}
        className="object-contain size-full"
      />
    </div>


    {/* نشانگر شمارنده */}
    <div className="flex size-12 items-center justify-center rounded-full bg-slate-900 ring-2 ring-white text-xs font-bold text-white shadow-sm">
      +۱۲۰
    </div>
  </div>

  <div className="text-xs text-slate-500">
    <div className="font-bold text-slate-900 text-sm">اعتماد بیش از ۱۲۰ برند مطرح کشور</div>
    <div className="mt-0.5">افزایش میانگین ۳.۵ برابری نرخ بازگشت سرمایه (ROI)</div>
  </div>

</div>

          </div>

          {/* ستون تصویر با انیمیشن چرخش سه‌بعدی نرم */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            <div className="relative w-full transform lg:rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
              
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/50 p-2.5 shadow-2xl backdrop-blur-xl">
                <div className="relative overflow-hidden rounded-[2rem] h-[380px] sm:h-[460px] w-full">
                  <Image
                    src={officeImage}
                    alt="تیم خلاق آژانس تبلیغاتی دیوان"
                    priority
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                </div>
              </div>

              {/* کارت شناور ۱: بالا چپ */}
              <div className="absolute -top-4 -left-4 sm:-left-6 z-20 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-md border border-slate-100 flex items-center gap-3.5">
                <div
                  className="flex size-11 items-center justify-center rounded-xl text-white shadow-md"
                  style={{ backgroundColor: "var(--primary-divan)" }}
                >
                  <TrendingUp className="size-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">میانگین رشد فروش</div>
                  <div className="text-lg font-black text-slate-900 dir-ltr text-right">+۲۴۰٪</div>
                </div>
              </div>

              {/* کارت شناور ۲: پایین راست */}
              <div className="absolute -bottom-6 -right-2 sm:-right-4 z-20 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-md border border-slate-100 flex items-center gap-3.5">
                <div
                  className="flex size-11 items-center justify-center rounded-xl text-slate-900 font-extrabold shadow-md"
                  style={{ backgroundColor: "var(--secondary-divan)" }}
                >
                  <Users className="size-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">رضایت مشتریان</div>
                  <div className="text-lg font-black text-slate-900">۹۸.۵٪ عالی</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* راهنمای اسکرول در پایین */}
      <div className="mt-6 flex justify-center items-center">
        <a
          href="#services"
          className="group flex flex-col items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-800 transition-colors"
        >
          <span>مشاهده خدمات</span>
          <div className="w-5 h-9 rounded-full border-2 border-slate-300 group-hover:border-slate-800 flex justify-center p-1 transition-colors">
            <div
              className="w-1.5 h-2.5 rounded-full animate-bounce"
              style={{ backgroundColor: "var(--primary-divan)" }}
            />
          </div>
        </a>
      </div>

    </section>
  );
}