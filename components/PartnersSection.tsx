// components/PartnersSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Handshake, Building2 } from "lucide-react";

interface Partner {
  name: string;
  category: string;
}

const partnersData: Partner[] = [
  { name: "سرای ایرانی", category: "فروش حضوری" },
  { name: "دیجی‌کالا", category: "تجارت الکترونیک" },
  { name: "بانک آینده", category: "خدمات مالی" },
  { name: "کافه بازار", category: "استور اپلیکیشن" },
  { name: "علی‌بابا", category: "گردشگری" },
  { name: "همراه اول", category: "ارتباطات" },
];

export function PartnersSection() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#f8fafc] py-8 font-sans select-none border-y border-slate-200/60"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 w-full">
        
        {/* ۱. هدر جمع‌وجور */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 text-center sm:text-right">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-xl text-[var(--primary-divan)] shadow-xs"
              style={{ backgroundColor: "oklch(0.96 0.02 22.69)" }}
            >
              <Handshake className="size-5 stroke-[1.75]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                همکاران و مشتریان دیوان
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                برندهای پیشرویی که افتخار همراهی‌شان را داشته‌ایم
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>بیش از ۱۰ همکار فعال</span>
          </div>
        </div>

        {/* ۲. نوار چرخشی تعاملی بدون حتی یک پیکسل جای خالی در شروع */}
        <div className="relative w-full overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max select-none" dir="ltr">
            
            {/* ساخت ۲ گروه تراک متصل به هم برای پر ساختن کامل عرض در ثانیه صفر */}
            {[1, 2].map((groupIndex) => (
              <motion.div
                key={groupIndex}
                className="flex shrink-0 items-center gap-4 pr-4"
                animate={{ x: ["0%", "100%"] }}
                transition={{
                  ease: "linear",
                  duration: 22,
                  repeat: Infinity,
                }}
              >
                {partnersData.map((p, index) => (
                  <div
                    key={`${p.name}-${groupIndex}-${index}`}
                    dir="rtl"
                    className="group relative flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white px-5 py-3 shadow-2xs transition-all duration-300 hover:scale-105 hover:border-[var(--primary-divan)] hover:shadow-md hover:shadow-[var(--primary-divan)]/10 shrink-0 cursor-pointer"
                  >
                    <div
                      className="flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors group-hover:bg-[var(--primary-divan)] group-hover:text-white"
                      style={{ backgroundColor: "oklch(0.97 0.01 22.69)" }}
                    >
                      <Building2 className="size-4 stroke-[1.75]" />
                    </div>

                    <div className="flex flex-col text-right">
                      <span className="text-sm font-bold text-slate-800 transition-colors group-hover:text-[var(--primary-divan)]">
                        {p.name}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400 transition-colors group-hover:text-slate-600">
                        {p.category}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}