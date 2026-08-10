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
  type LucideIcon,
} from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const services: Service[] = [
  {
    icon: BarChart3,
    title: "دیجیتال مارکتینگ",
    desc: "طراحی و اجرای کمپین‌های داده‌محور در فضای آنلاین با تمرکز بر بازگشت سرمایه.",
  },
  {
    icon: Sparkles,
    title: "برندسازی",
    desc: "ساخت هویت بصری و کلامی منسجم که برند شما را متمایز و ماندگار می‌کند.",
  },
  {
    icon: PenTool,
    title: "تولید محتوا",
    desc: "محتوای متنی، بصری و ویدیویی متناسب با لحن برند و مخاطب هدف شما.",
  },
  {
    icon: Megaphone,
    title: "تبلیغات محیطی",
    desc: "انتخاب هوشمند رسانه و اجرای کمپین‌های شهری با بیشترین میزان دیده‌شدن.",
  },
  {
    icon: Camera,
    title: "عکاسی و تیزر",
    desc: "تولید تیزر تبلیغاتی و عکاسی صنعتی با استانداردهای حرفه‌ای و کیفیت بالا.",
  },
  {
    icon: Lightbulb,
    title: "مشاوره استراتژی",
    desc: "تدوین نقشه راه بازاریابی بر پایه تحلیل بازار، رقبا و مسیر رشد برند.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        {/* انیمیشن تیتر و توضیحات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">خدمات ما</h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
            مجموعه‌ای کامل از خدمات تبلیغاتی، از ایده تا اجرا و اندازه‌گیری نتایج.
          </p>
        </motion.div>

        {/* کارت‌های خدمات با انیمیشن پله‌ای (Staggered) */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, index) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08, // ایجاد فاصله زمانی متوالی بین ظاهر شدن کارت‌ها
                  ease: "easeOut",
                }}
                className="group rounded-lg border border-border bg-card p-6 transition-colors hover:-translate-y-1 hover:border-divan-primary"
              >
                <span className="grid size-10 place-items-center rounded-md bg-divan-secondary text-divan-primary transition-colors group-hover:bg-divan-primary group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-base font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}