// components/TestimonialsSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  role: string;
  initials: string;
  text: string;
}

const testimonialsData: Testimonial[] = [
  {
    name: "سارا محمدی",
    role: "مدیر بازاریابی، گروه آرمان",
    initials: "س م",
    text: "همکاری با دیوان مسیر برند ما را کاملاً تغییر داد؛ کمپین‌ها دقیق و نتیجه‌محور اجرا شدند.",
  },
  {
    name: "رضا کاظمی",
    role: "بنیان‌گذار، استارتاپ نیوا",
    initials: "ر ک",
    text: "تیمی حرفه‌ای با درک عمیق از بازار. رشد فروش ما در شش ماه بیش از دو برابر شد.",
  },
  {
    name: "نگار رستمی",
    role: "مدیر ارتباطات، شرکت پارس",
    initials: "ن ر",
    text: "کیفیت محتوا و نظم اجرایی دیوان فراتر از انتظار ما بود و همکاری را ادامه می‌دهیم.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        {/* تیتر بخش */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          نظرات مشتریان
        </motion.h2>

        {/* کارت‌های نظرات */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonialsData.map((t, index) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <blockquote className="text-sm leading-8 text-muted-foreground">
                «{t.text}»
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-divan-secondary text-xs font-bold text-divan-primary">
                  {t.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{t.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}