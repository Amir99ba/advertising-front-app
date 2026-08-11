// components/ServicesSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Camera,
  Lightbulb,
  Megaphone,
  PenTool,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  badge?: string;
  featured?: boolean; // کارت خاص/ویژه
}

const services: Service[] = [
  {
    icon: Megaphone,
    title: "تبلیغات محیطی و انبوه",
    desc: "انتخاب هوشمندانه بیلبوردها و رسانه‌های شهری با بیشترین میزان بازدید و بالاترین نرخ درگیری.",
    badge: "پرتقاضاترین",
    featured: true, // فقط این کارت ویژه است
  },
  {
    icon: BarChart3,
    title: "دیجیتال مارکتینگ ۳۶۰",
    desc: "طراحی و اجرای کمپین‌های داده‌محور در فضای آنلاین با تمرکز مستقیم بر نرخ بازگشت سرمایه (ROI).",
    badge: "پایه رشد",
  },
  {
    icon: Sparkles,
    title: "برندسازی و هویت بصری",
    desc: "ساخت هویت بصری، لوگو و لحن کلامی منسجم که برند شما را متمایز و در ذهن مخاطب ماندگار می‌کند.",
  },
  {
    icon: PenTool,
    title: "تولید محتوای استراتژیک",
    desc: "تولید محتوای متنی، گرافیکی و ویدیویی متناسب با سفر مشتری و لحن اختصاصی برند شما.",
  },
  {
    icon: Camera,
    title: "عکاسی صنعتی و ساخت تیزر",
    desc: "تولید تیزرهای تبلیغاتی سینمایی و عکاسی صنعتی از محصولات با استانداردهای بین‌المللی.",
  },
  {
    icon: Lightbulb,
    title: "مشاوره و تدوین استراتژی",
    desc: "تحلیل عمیق بازار، رقبا و رفتارهای مشتری جهت ارائه نقشه راه دقیق برای جهش درآمدی.",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-[#f8fafc] py-16 sm:py-24 font-sans select-none"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 w-full">
        
        {/* هدر بخش */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary-divan)]/20 bg-white px-4 py-1.5 text-xs font-bold text-[var(--primary-divan)] shadow-xs mb-4">
            <Zap className="size-3.5 fill-current text-amber-500" />
            <span>راهکارهای جامع و نتیجه‌محور</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-snug">
            خدماتی که برند شما را به <br />
            <span className="bg-gradient-to-r from-[var(--primary-divan)] via-purple-600 to-[var(--primary-divan)] bg-clip-text text-transparent">
              سطح بعدی بازار
            </span>{" "}
            می‌رسانند
          </h2>
        </motion.div>

        {/* گرید کارت‌ها */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, index) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                className={`group relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                  s.featured
                    ? "bg-[var(--primary-divan)] text-white shadow-xl shadow-[var(--primary-divan)]/20" // کارت ویژه رنگ اصلی دارد
                    : "bg-white border border-slate-100 hover:border-[var(--primary-divan)]/40 hover:shadow-xl hover:shadow-slate-200/60 text-slate-900" // بقیه کارت‌ها سفید و تمیز
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`flex size-14 items-center justify-center rounded-2xl shadow-xs transition-transform duration-300 group-hover:scale-110 ${
                        s.featured
                          ? "bg-white/15 text-white"
                          : "bg-[oklch(0.96_0.02_22.69)] text-[var(--primary-divan)] group-hover:bg-[var(--primary-divan)] group-hover:text-white"
                      }`}
                    >
                      <Icon className="size-7 stroke-[1.75]" />
                    </div>

                    {s.badge && (
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                          s.featured
                            ? "bg-amber-400 text-slate-950"
                            : "bg-[var(--secondary-divan)] text-[var(--primary-divan)]"
                        }`}
                      >
                        {s.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p
                    className={`text-xs sm:text-sm leading-7 font-normal ${
                      s.featured ? "text-slate-100" : "text-slate-500"
                    }`}
                  >
                    {s.desc}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}