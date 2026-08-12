// app/portfolio/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Building2, Sparkles } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  client: string;
  category: string;
  image: string;
  featured?: boolean;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'کمپین ۳۶۰ درجه ریبرندینگ و حضور قدرتمند در بازار',
    client: 'اسنپ‌فود',
    category: 'کمپین ۳۶۰',
    image:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'طراحی هویت بصری و سیستم جامع هویت برند',
    client: 'بانک آینده',
    category: 'برندسازی',
    image:
      'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'ساخت تیزر سینمایی و عکاسی صنعتی از محصولات',
    client: 'کافه بازار',
    category: 'تیزر و ویدیو',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'کمپین دیجیتال مارکتینگ و بهینه‌سازی لندینگ پیج‌ها',
    client: 'دیجی‌کالا',
    category: 'دیجیتال مارکتینگ',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'استراتژی محتوا و مدیریت شبکه‌های اجتماعی',
    client: 'علی‌بابا',
    category: 'تولید محتوا',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 6,
    title: 'طراحی بیلبوردهای سراسری و اکران شهری',
    client: 'همراه اول',
    category: 'کمپین ۳۶۰',
    image:
      'https://images.unsplash.com/photo-1542744094-3a317272018a?w=800&auto=format&fit=crop&q=80',
  },
];

const categories = [
  'همه',
  'کمپین ۳۶۰',
  'برندسازی',
  'دیجیتال مارکتینگ',
  'تیزر و ویدیو',
  'تولید محتوا',
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('همه');

  const filteredProjects = projectsData.filter((p) =>
    selectedCategory === 'همه' ? true : p.category === selectedCategory
  );

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 font-sans select-none overflow-hidden"
    >
      {/* هالوژن‌های نوری پس‌زمینه */}
      <div className="pointer-events-none absolute right-10 top-20 -z-10 h-[500px] w-[500px] rounded-full bg-[var(--primary-divan)]/10 blur-[140px]" />
      <div className="pointer-events-none absolute left-10 top-1/3 -z-10 h-[450px] w-[450px] rounded-full bg-[var(--secondary-divan)]/15 blur-[130px]" />

      <main className="max-w-6xl mx-auto space-y-10">
        {/* ۱. هدر صفحه */}
        <header className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary-divan)]/20 bg-white px-4 py-1.5 text-xs font-bold text-[var(--primary-divan)] shadow-xs">
            <Briefcase className="size-3.5" />
            <span>نمونه‌کارهای دیوان</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-snug">
            داستان‌های موفقیت و <br />
            <span className="text-divan-primary">
              پروژه‌های تحول‌آفرین
            </span>
          </h1>
        </header>

        {/* ۲. فیلتر دسته‌بندی */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={
                  isActive
                    ? {
                        backgroundColor: 'var(--primary-divan)',
                        color: '#fff',
                      }
                    : {}
                }
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'shadow-lg shadow-[var(--primary-divan)]/25 scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ۳. گرید نمونه‌کارها */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className={`group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${
                  project.featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* کانتینر تصویر با افکت زوم */}
                <div
                  className={`relative w-full overflow-hidden bg-slate-100 ${
                    project.featured ? 'h-80 sm:h-96' : 'h-80'
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    unoptimized
                  />

                  {/* سایه مشکی پایین تصویر برای خوانایی بهتر متن */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                  {/* کپسول خوانای سفارش‌دهنده و دسته‌بندی (بالای کارت) */}
                  <div className="absolute top-4 right-4 left-4 flex items-center justify-between z-10">
                    
                    {/* نام کارفرما کاملاً خوانا با پس‌زمینه سفید/شیشه‌ای */}
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-extrabold text-slate-900 shadow-md backdrop-blur-md">
                      <Building2 className="size-3.5 text-[var(--primary-divan)]" />
                      <span>{project.client}</span>
                    </div>

                    {/* دسته‌بندی */}
                    <span className="rounded-full bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-white shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* عنوان پروژه (پایین کارت) */}
                  <div className="absolute bottom-0 right-0 left-0 p-6 text-white z-10">
                    <h3 className="text-lg sm:text-xl font-bold leading-snug group-hover:text-amber-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}