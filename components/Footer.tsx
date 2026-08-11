// components/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone, ArrowUpLeft, Send } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  { label: "صفحه اصلی", href: "/" },
  { label: "مجله و مقالات", href: "/posts" },
  { label: "خدمات تخصصی", href: "/#services" },
  { label: "درباره ما", href: "/" },
  { label: "نظرات مشتریان", href: "/#testimonials" },
];

export function Footer() {
  const pathname = usePathname();

  // TODO: Social Media Links Config
  const hasSocialMedia = false; 

  // const socialLinks: SocialLink[] = [
  //   {
  //     label: "اینستاگرام",
  //     href: "https://instagram.com/diwan.agency",
  //     icon: <Instagram className="size-4" />,
  //   },
  //   {
  //     label: "لینکدین",
  //     href: "https://linkedin.com/company/diwan-agency",
  //     icon: <Linkedin className="size-4" />,
  //   },
  //   {
  //     label: "تلگرام",
  //     href: "https://t.me/diwan_agency",
  //     icon: <Send className="size-4" />,
  //   },
  // ];

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer id="contact" className="relative w-full overflow-hidden bg-[#f8fafc] pt-12 pb-8 font-sans select-none border-t border-slate-200/60">
      {/* هالوژن نوری پس‌زمینه */}
      <div className="pointer-events-none absolute left-1/2 bottom-0 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--primary-divan)]/10 blur-[130px]" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 w-full space-y-12">
        
        {/* کادر اصلی فوتر */}
        <div className="rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 grid gap-8 lg:grid-cols-12 items-start">
          
          {/* ستون ۱: معرفی دیوان (۴ ستون از ۱۲ ستون) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2.5">
                <div
                  className="size-8 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm"
                  style={{ backgroundColor: "var(--primary-divan)" }}
                >
                  د
                </div>
                <span
                  className="text-2xl font-black tracking-tight"
                  style={{ color: "var(--primary-divan)" }}
                >
                  دیوان
                </span>
              </div>

              <p className="mt-4 max-w-sm text-xs sm:text-sm leading-7 text-slate-500 font-normal">
                آژانس تبلیغاتی ۳۶۰ درجه؛ ترکیب هوشمندانه استراتژی، خلاقیت بی‌مرز و اجرای مدرن برای خلق رشد پایدار برندها.
              </p>
            </div>

            {hasSocialMedia && (
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:bg-[var(--primary-divan)] hover:text-white hover:border-[var(--primary-divan)] hover:scale-105"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ستون ۲: دسترسی سریع (۳ ستون از ۱۲ ستون) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h3 className="text-sm font-extrabold text-slate-900 mb-1">دسترسی سریع</h3>
            {navLinks.map((l) => {
              const isActive =
                l.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(l.href) &&
                    l.href !== "/#services" &&
                    l.href !== "/#about" &&
                    l.href !== "/#contact";

              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`group flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? "text-[var(--primary-divan)] font-bold"
                      : "text-slate-500 hover:text-[var(--primary-divan)]"
                  }`}
                >
                  <ArrowUpLeft className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span>{l.label}</span>
                </Link>
              );
            })}
          </div>

          {/* ستون ۳: اطلاعات تماس و آدرس‌ها (۵ ستون از ۱۲ ستون جهت جلوگیری از شکستن خط) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-slate-900 mb-1">اطلاعات تماس</h3>
            
            <a
              href="tel:02182800091"
              className="group flex items-center gap-3 text-xs font-bold text-slate-700 transition-colors hover:text-[var(--primary-divan)]"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 group-hover:bg-[var(--primary-divan)] group-hover:text-white transition-colors">
                <Phone className="size-4" />
              </div>
              <span className="whitespace-nowrap">۰۲۱-۸۲۸۰۰۰۹۱</span>
            </a>

            <a
              href="mailto:contact@diwan.agency"
              className="group flex items-center gap-3 text-xs font-bold text-slate-700 transition-colors hover:text-[var(--primary-divan)]"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 group-hover:bg-[var(--primary-divan)] group-hover:text-white transition-colors">
                <Mail className="size-4" />
              </div>
              <span className="whitespace-nowrap">contact@diwan.agency</span>
            </a>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <MapPin className="size-4 shrink-0 text-[var(--primary-divan)]" />
                <span className="whitespace-nowrap">تهران، بلوار نلسون ماندلا، خیابان دستگردی، پلاک ۳۲۶، واحد ۱۰۵</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <MapPin className="size-4 shrink-0 text-[var(--primary-divan)]" />
                <span className="whitespace-nowrap">مشهد، بلوار هفت تیر، میدان صارمی، ساختمان شماره ۷، واحد ۱۴</span>
              </div>
            </div>
          </div>

        </div>

        {/* کپی‌رایت پایینی */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-slate-400 px-2">
          <p>© ۱۴۰۴ آژانس تبلیغاتی دیوان — تمامی حقوق محفوظ است.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-600 transition-colors">حریم خصوصی</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-600 transition-colors">قوانین و مقررات</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}