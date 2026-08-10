// components/PartnersSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const partnersData: string[] = [
  "اسنپ‌فود",
  "دیجی‌کالا",
  "بانک آینده",
  "کافه بازار",
  "علی‌بابا",
  "همراه اول",
];

export function PartnersSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      {/* تیتر و توضیحات */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">همکاران ما</h2>
        <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
          برندهایی که در مسیر رشدشان همراهشان بوده‌ایم.
        </p>
      </motion.div>

      {/* آیتم‌های همکاران با انیمیشن پله‌ای */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {partnersData.map((p, index) => (
          <motion.div
            key={p}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.4,
              delay: index * 0.06,
              ease: "easeOut",
            }}
            className="rounded-md border border-border bg-card px-4 py-5 text-center text-sm font-medium text-muted-foreground transition-colors hover:border-divan-primary hover:text-divan-primary"
          >
            {p}
          </motion.div>
        ))}
      </div>
    </section>
  );
}