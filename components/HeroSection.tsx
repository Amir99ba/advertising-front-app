// components/HeroSection.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import officeImage from "@/assets/agency-office.jpg";

export function HeroSection() {
  return (
    <section id="home" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-divan-secondary/30 px-3 py-1 text-xs font-medium text-divan-primary">
            <span className="size-1.5 rounded-full bg-divan-primary" />
            آژانس تبلیغاتی تمام‌سرویس
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.25] tracking-tight sm:text-5xl">
            برند شما شایسته
            <span className="text-divan-primary"> روایتی متفاوت </span>
            است
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
            آرکا با تکیه بر تحلیل دقیق بازار، خلاقیت و اجرای منظم، از استراتژی تا کمپین را
            برای برندها طراحی می‌کند. ما هویت بصری، محتوا و رسانه را در یک مسیر منسجم کنار هم
            می‌گذاریم تا هر ریال هزینه تبلیغات شما به رشد واقعی تبدیل شود.
          </p>
          <div className="mt-8">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-md bg-divan-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              شروع همکاری
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <Image
            src={officeImage}
            alt="تیم خلاق آژانس تبلیغاتی آرکا در حال همفکری"
            priority
            className="h-[380px] w-full object-cover sm:h-[480px]"
          />
        </div>
      </div>
    </section>
  );
}