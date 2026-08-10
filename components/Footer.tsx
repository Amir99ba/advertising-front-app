// components/Footer.tsx
import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "خانه", href: "#home" },
  { label: "خدمات ما", href: "#services" },
  { label: "درباره ما", href: "#about" },
  { label: "نظرات مشتریان", href: "#testimonials" },
  { label: "تماس با ما", href: "#contact" },
];

export function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <span className="text-lg font-extrabold tracking-tight text-divan-primary">دیوان</span>
          <p className="mt-3 max-w-xs text-sm leading-7 text-muted-foreground">
            آژانس تبلیغاتی تمام‌سرویس؛ استراتژی، خلاقیت و اجرا در یک تیم.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="صفحه ایکس (توییتر)"
              className="grid size-9 place-items-center rounded-md border border-border transition-colors hover:border-divan-primary hover:text-divan-primary"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                <path d="M18.9 2h3.3l-7.2 8.3L23 22h-6.6l-5.2-6.8L5.3 22H2l7.7-8.9L1.7 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.4 3.9H5.4L17.7 20Z" />
              </svg>
            </a>
          </div>
        </div>

        <nav className="flex flex-col gap-3">
          <h3 className="text-sm font-bold">دسترسی سریع</h3>
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-divan-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold">اطلاعات تماس</h3>
          <a
            href="tel:02191002233"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone className="size-4 shrink-0 text-divan-primary" />
            شماره تماس: ۰۲۱-۹۱۰۰۲۲۳۳
          </a>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0 text-divan-primary" />
            آدرس: تهران، خیابان ولیعصر، پلاک ۱۲۴
          </p>
          <a
            href="mailto:hello@arka.agency"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-4 shrink-0 text-divan-primary" />
            ایمیل: hello@arka.agency
          </a>
        </div>
      </div>

      <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
        © ۱۴۰۴ آژانس تبلیغاتی دیوان — تمامی حقوق محفوظ است.
      </p>
    </footer>
  );
}