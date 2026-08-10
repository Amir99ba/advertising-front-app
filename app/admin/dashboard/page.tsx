"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  SquarePlus,
  FolderKanban,
  BarChart3,
  CheckCircle2,
  Clock3,
  ChevronLeft,
  ChevronDown,
  MessageCircle,
  Paperclip,
  LogOut,
} from "lucide-react";

// --- تایپ‌ها و اینترفیس‌ها ---

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  active?: boolean;
}

interface TaskItem {
  id: string;
  name: string;
  adminName: string;
  adminAvatar: string;
  membersCount: number;
  status: "در حال انجام" | "تکمیل شده";
  runTime: string;
  finishDate: string;
}

// --- داده‌های نمونه ---

const NAV_ITEMS: NavigationItem[] = [
  { id: "create-post", label: "ایجاد پست", icon: SquarePlus, active: true },
  { id: "manage-posts", label: "مدیریت پست", icon: FolderKanban },
  { id: "data-analysis", label: "تحلیل داده", icon: BarChart3 },
];

const TASKS: TaskItem[] = [
  {
    id: "1",
    name: "آنبوردینگ مشتری - سرکل",
    adminName: "سامانتا ج.",
    adminAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    membersCount: 3,
    status: "در حال انجام",
    runTime: "۶ ساعت",
    finishDate: "۶ دوشنبه",
  },
  {
    id: "2",
    name: "جلسه با وب‌فلو و نوشن",
    adminName: "باب پ.",
    adminAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    membersCount: 4,
    status: "تکمیل شده",
    runTime: "۲ ساعت",
    finishDate: "۷ سه‌شنبه",
  },
  {
    id: "3",
    name: "تحویل اولیه به مهندسین",
    adminName: "کیت ا.",
    adminAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    membersCount: 10,
    status: "در حال انجام",
    runTime: "۳ روز",
    finishDate: "۱۰ جمعه",
  },
  {
    id: "4",
    name: "پیش‌نویس مشتری (۲) با لارنس",
    adminName: "جک ف.",
    adminAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    membersCount: 7,
    status: "در حال انجام",
    runTime: "۱ هفته",
    finishDate: "۱۹ یکشنبه",
  },
];

// --- زیرکامپوننت‌ها ---

function Sidebar() {
  const [activeTab, setActiveTab] = useState<string>("create-post");

  const handleLogout = () => {
    // منطق خروج از حساب کاربر در اینجا قرار می‌گیرد
    console.log("کاربر خارج شد");
  };

  return (
    <aside className="w-full lg:w-64 bg-white rounded-3xl p-6 flex flex-col justify-between shrink-0 shadow-sm">
      <div className="space-y-8">
        {/* لوگو */}
        <div className="flex items-center gap-3 px-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shadow-sm"
            style={{ backgroundColor: "var(--primary-divan)" }}
          >
            <div
              className="w-4 h-4 border-2 border-white transform rotate-45 rounded-sm"
              style={{ backgroundColor: "var(--primary-divan)" }}
            />
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--primary-divan)" }}
          >
            دیوان (DIVAN)
          </span>
        </div>

        {/* منوی ناوبری */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={
                  isActive
                    ? { backgroundColor: "var(--primary-divan)", color: "#ffffff" }
                    : {}
                }
                className={`w-full flex items-center justify-between px-4 py-3 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "shadow-md"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    style={{
                      backgroundColor: isActive
                        ? "var(--secondary-divan)"
                        : "var(--primary-divan)",
                      color: isActive ? "var(--primary-divan)" : "#ffffff",
                    }}
                    className="px-2 py-0.5 text-xs font-semibold rounded-full"
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* دکمه خروج جایگزین پروفایل کاربر */}
      <div className="pt-6 border-t border-slate-100">
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

function TasksSection() {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedTasks.length === TASKS.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(TASKS.map((t) => t.id));
    }
  };

  const toggleSelectTask = (id: string) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
      {/* هدر بخش و آمار */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: "var(--primary-divan)" }}
          >
            آخرین وظایف
          </h2>
          <p className="text-sm text-slate-400 mt-1 font-medium">
            <span
              className="font-semibold"
              style={{ color: "var(--primary-divan)" }}
            >
              ۱۱۷ مورد در مجموع
            </span>
            ، جهت بررسی و انجام
          </p>
        </div>

        <div className="flex items-center gap-8 self-end sm:self-auto">
          <div className="text-left sm:text-right">
            <span
              className="text-3xl font-bold"
              style={{ color: "var(--primary-divan)" }}
            >
              ۹۴
            </span>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              تکمیل شده
            </p>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-left sm:text-right">
            <span
              className="text-3xl font-bold"
              style={{ color: "var(--primary-divan)" }}
            >
              ۲۳
            </span>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              در حال انجام
            </p>
          </div>
        </div>
      </div>

      {/* جدول وظایف */}
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-medium text-slate-400">
              <th className="pb-3 w-10">
                <input
                  type="checkbox"
                  checked={
                    selectedTasks.length === TASKS.length && TASKS.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 h-4 w-4 cursor-pointer"
                  style={{ accentColor: "var(--primary-divan)" }}
                />
              </th>
              <th className="pb-3 font-medium">عنوان</th>
              <th className="pb-3 font-medium">مدیر</th>
              <th className="pb-3 font-medium">اعضا</th>
              <th className="pb-3 font-medium">وضعیت</th>
              <th className="pb-3 font-medium">زمان اجرا</th>
              <th className="pb-3 font-medium text-left">تاریخ تحویل</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs sm:text-sm">
            {TASKS.map((task) => {
              const isSelected = selectedTasks.includes(task.id);
              return (
                <tr
                  key={task.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectTask(task.id)}
                      className="rounded border-slate-300 h-4 w-4 cursor-pointer"
                      style={{ accentColor: "var(--primary-divan)" }}
                    />
                  </td>
                  <td className="py-4 font-semibold text-slate-900">
                    {task.name}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={task.adminAvatar}
                        alt={task.adminName}
                        width={24}
                        height={24}
                        className="rounded-full object-cover"
                        unoptimized
                      />
                      <span className="text-slate-600 font-medium">
                        {task.adminName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-slate-600 font-medium">
                    {task.membersCount} نفر
                  </td>
                  <td className="py-4">
                    {task.status === "در حال انجام" ? (
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: "oklch(0.95 0.03 22.69)",
                          color: "var(--primary-divan)",
                        }}
                      >
                        <Clock3 className="w-3.5 h-3.5" />
                        در حال انجام
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        تکمیل شده
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-slate-500 font-medium">
                    {task.runTime}
                  </td>
                  <td className="py-4 text-left font-semibold text-slate-700">
                    {task.finishDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProductivitySection() {
  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between">
      {/* هدر */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 text-base">بهره‌وری</h3>
        <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
          <span>۱۱ تا ۱۷ اردیبهشت</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* راهنمای نمودار */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "var(--primary-divan)" }}
            />
            <span className="font-medium text-slate-600">تحقیق</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "var(--secondary-divan)" }}
            />
            <span className="font-medium text-slate-600">طراحی</span>
          </div>
        </div>
        <span>بروزرسانی هر ۳ ساعت</span>
      </div>

      {/* نمودار خطی */}
      <div className="relative w-full h-36 mt-2">
        {/* تولتیپ روی نمودار */}
        <div className="absolute right-[54%] top-[12%] translate-x-1/2 flex flex-col items-center z-10">
          <div
            className="text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-md mb-1"
            style={{ backgroundColor: "var(--primary-divan)" }}
          >
            ۳ ساعت ۱۰ دقیقه
          </div>
          <div
            className="w-2 h-2 rounded-full border-2 border-white shadow"
            style={{ backgroundColor: "var(--secondary-divan)" }}
          />
          <div
            className="w-px h-16 border-r border-dashed mt-0.5"
            style={{ borderColor: "var(--primary-divan)" }}
          />
        </div>

        {/* خطوط SVG نمودار */}
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 300 100"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="50" x2="300" y2="50" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="80" x2="300" y2="80" stroke="#f1f5f9" strokeWidth="1" />

          {/* خط اول: تحقیق */}
          <path
            d="M 0 65 Q 45 35 90 60 T 165 25 T 240 20 T 300 45"
            fill="none"
            stroke="var(--primary-divan)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* خط دوم: طراحی */}
          <path
            d="M 0 50 Q 45 80 90 55 T 165 70 T 240 65 T 300 75"
            fill="none"
            stroke="var(--secondary-divan)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* محور عمودی Y */}
        <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-slate-300 font-medium pointer-events-none">
          <span>۴</span>
          <span>۳</span>
          <span>۲</span>
          <span>۱</span>
          <span>۰</span>
        </div>
      </div>

      {/* محور افقی X */}
      <div className="flex justify-between text-xs text-slate-400 font-medium mt-4 px-2">
        <span>شنبه</span>
        <span>۱شنبه</span>
        <span>۲شنبه</span>
        <span>۳شنبه</span>
        <span>۴شنبه</span>
        <span>۵شنبه</span>
        <span>جمعه</span>
      </div>
    </section>
  );
}

function ProjectsInProgressSection() {
  return (
    <section
      style={{ backgroundColor: "var(--primary-divan)" }}
      className="rounded-3xl p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-sm"
    >
      <div className="flex items-center justify-between z-10">
        <h3 className="font-semibold text-base tracking-wide text-slate-100">
          پروژه‌های در حال جریان:
        </h3>
      </div>

      {/* کارت‌های لایه‌ای روی هم */}
      <div className="relative my-6 min-h-[160px] flex items-center">
        {/* لایه‌های پس‌زمینه */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[70%] h-[120px] bg-white/10 rounded-2xl border border-white/10 -translate-x-2" />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-[70%] h-[130px] bg-white/15 rounded-2xl border border-white/15 -translate-x-1" />
        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-[70%] h-[140px] bg-white/20 rounded-2xl border border-white/20" />

        {/* کارت اصلی رویی */}
        <div className="relative z-10 bg-white text-slate-900 rounded-2xl p-5 w-[82%] shadow-xl">
          {/* برچسب‌ها */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold"
              style={{
                backgroundColor: "oklch(0.95 0.03 22.69)",
                color: "var(--primary-divan)",
              }}
            >
              بازخورد
            </span>
            <span
              className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold"
              style={{
                backgroundColor: "var(--secondary-divan)",
                color: "var(--primary-divan)",
              }}
            >
              باگ
            </span>
          </div>

          <h4 className="font-bold text-sm text-slate-900">
            بهبود خوانایی کارت‌ها
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">۱۴۰۱/۰۱/۰۱</p>

          {/* جزییات پایین کارت */}
          <div className="flex items-center justify-between mt-4 pt-2">
            <div className="flex -space-x-2 space-x-reverse overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                alt="کاربر"
                width={24}
                height={24}
                className="inline-block rounded-full ring-2 ring-white object-cover"
                unoptimized
              />
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                alt="کاربر"
                width={24}
                height={24}
                className="inline-block rounded-full ring-2 ring-white object-cover"
                unoptimized
              />
              <div className="w-6 h-6 rounded-full bg-slate-100 ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-slate-600">
                +۸
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-400 text-xs">
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">۱۲ نظر</span>
              </div>
              <div className="flex items-center gap-1">
                <Paperclip className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">۰ فایل</span>
              </div>
            </div>
          </div>
        </div>

        {/* دکمه اسلاید به چپ */}
        <button
          style={{ color: "var(--primary-divan)" }}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-slate-100 transition-transform active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

// --- کامپوننت اصلی ---

export default function DashboardLayout() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#e8ecef] p-4 sm:p-6 lg:p-8 flex items-center justify-center font-sans antialiased"
    >
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row gap-6">
        {/* نوار کناری راست */}
        <Sidebar />

        {/* محتوای اصلی */}
        <main className="flex-1 flex flex-col gap-6">
          {/* جدول اصلی وظایف */}
          <TasksSection />

          {/* بخش دو ستونه پایین */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductivitySection />
            <ProjectsInProgressSection />
          </div>
        </main>
      </div>
    </div>
  );
}