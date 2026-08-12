// components/TestimonialsSection.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Quote, Star, MessageSquareQuote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  initials: string;
  company: string;
  text: string;
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    id: 0,
    name: "سارا محمدی",
    role: "مدیر بازاریابی",
    company: "گروه صنعتی آرمان",
    initials: "س م",
    text: "همکاری با دیوان مسیر برند ما را کاملاً تغییر داد؛ کمپین‌ها دقیق، داده‌محور و با بالاترین نرخ بازگشت سرمایه اجرا شدند. منظم‌ترین تیمی که با آن‌ها کار کرده‌ایم.",
    rating: 5,
  },
  {
    id: 1,
    name: "رضا کاظمی",
    role: "بنیان‌گذار",
    company: "استارتاپ فناوری نیوا",
    initials: "ر ک",
    text: "تیمی فوق‌العاده حرفه‌ای با درک عمیق از رفتار مشتری. رشد فروش ما در شش ماه اول همکاری بیش از دو برابر شد و هنوز هم مسیر رشد ادامه دارد.",
    rating: 5,
  },
  {
    id: 2,
    name: "نگار رستمی",
    role: "مدیر ارتباطات",
    company: "پارس الکترونیک",
    initials: "ن ر",
    text: "کیفیت محتوا و استراتژی‌های برندسازی دیوان فراتر از انتظار ما بود. لحن برند ما بالاخره همان چیزی شد که سال‌ها دنبالش بودیم.",
    rating: 5,
  },
  {
    id: 3,
    name: "امیرحسین شایان",
    role: "مدیر ارشد رشد",
    company: "مجموعه فروشگاه‌های آریا",
    initials: "ا ش",
    text: "کمپین تبلیغات محیطی و دیجیتال دیوان پوشش فوق‌العاده‌ای در بازار ایجاد کرد. بازخورد مشتریان و آگاهی از برند ما رشد شگفت‌انگیزی داشت.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  // محاسبه موقعیت نسبی هر کارت
  const getCardStyle = (index: number) => {
    const total = testimonialsData.length;
    let diff = index - activeIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      // کارت مرکزی (کاملاً داخل کادر)
      return {
        position: "relative" as const,
        zIndex: 20,
        scale: 1,
        opacity: 1,
        x: "0%",
        filter: "blur(0px)",
        cursor: "default",
      };
    } else if (diff === -1 || (activeIndex === 0 && index === total - 1)) {
      // کارت سمت راست (محدودشده به درون کادر max-w-6xl)
      return {
        position: "absolute" as const,
        zIndex: 10,
        scale: 0.8,
        opacity: 0.4,
        x: "38%",
        filter: "blur(4px)",
        cursor: "pointer",
      };
    } else if (diff === 1 || (activeIndex === total - 1 && index === 0)) {
      // کارت سمت چپ (محدودشده به درون کادر max-w-6xl)
      return {
        position: "absolute" as const,
        zIndex: 10,
        scale: 0.8,
        opacity: 0.4,
        x: "-38%",
        filter: "blur(4px)",
        cursor: "pointer",
      };
    } else {
      // کارت‌های غایب
      return {
        position: "absolute" as const,
        zIndex: 0,
        scale: 0.6,
        opacity: 0,
        x: "0%",
        filter: "blur(8px)",
        cursor: "pointer",
      };
    }
  };

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-[#f8fafc] py-16 sm:py-24 font-sans select-none"
    >
      {/* هالوژن نوری پس‌زمینه */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-divan)]/10 blur-[120px]" />

      {/* محدودسازی به عرض استاندار بقیه صفحات (max-w-6xl) */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8 w-full">
        
        {/* ۱. هدر بخش */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary-divan)]/20 bg-white px-4 py-1.5 text-xs font-bold text-[var(--primary-divan)] shadow-xs mb-3">
            <MessageSquareQuote className="size-3.5" />
            <span>صدای مشتریان ما</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            تجربه برندهایی که با <br />
            <span className="text-divan-primary">
              دیوان مسیر رشد را پیمودند
            </span>
          </h2>
        </div>

        {/* ۲. دسته کارت‌های سه بعدی محصور شده در کادر اصلی */}
        <div className="relative flex min-h-[360px] sm:min-h-[320px] items-center justify-center overflow-hidden py-4">
          {testimonialsData.map((t, index) => {
            const style = getCardStyle(index);

            return (
              <motion.div
                key={t.id}
                initial={false}
                animate={{
                  scale: style.scale,
                  opacity: style.opacity,
                  x: style.x,
                  filter: style.filter,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.32, 0.72, 0, 1],
                }}
                onClick={() => index !== activeIndex && setActiveIndex(index)}
                style={{
                  position: style.position,
                  zIndex: style.zIndex,
                }}
                className="w-full max-w-md sm:max-w-lg rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-shadow hover:shadow-2xl"
              >
                {/* نقل قول و ستاره‌ها */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="flex size-10 items-center justify-center rounded-2xl text-[var(--primary-divan)]"
                    style={{ backgroundColor: "oklch(0.96 0.02 22.69)" }}
                  >
                    <Quote className="size-4 rotate-180" />
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* متن نظر */}
                <p className="text-xs sm:text-sm leading-7 text-slate-700 font-medium">
                  «{t.text}»
                </p>

                {/* پروفایل */}
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-md shadow-[var(--primary-divan)]/20"
                    style={{ backgroundColor: "var(--primary-divan)" }}
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0 text-right">
                    <span className="block truncate text-xs sm:text-sm font-extrabold text-slate-900">
                      {t.name}
                    </span>
                    <span className="block truncate text-[11px] text-slate-500 font-medium mt-0.5">
                      {t.role} ، <span className="text-[var(--primary-divan)]">{t.company}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ۳. دکمه‌های کنترل */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            aria-label="نظر قبلی"
            className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition-all hover:border-[var(--primary-divan)] hover:bg-[var(--primary-divan)] hover:text-white active:scale-90"
          >
            <ChevronRight className="size-4" />
          </button>

          <div className="flex items-center gap-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`رفتن به نظر شماره ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-7 bg-[var(--primary-divan)]"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="نظر بعدی"
            className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition-all hover:border-[var(--primary-divan)] hover:bg-[var(--primary-divan)] hover:text-white active:scale-90"
          >
            <ChevronLeft className="size-4" />
          </button>
        </div>

      </div>
    </section>
  );
}