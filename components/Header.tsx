// components/Header.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import logoSvg from "@/assets/logo.svg";

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

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="#home" className="flex shrink-0 items-center gap-2">
          <Image
            src={logoSvg}
            alt="لوگوی دیوان"
            width={32}
            height={32}
            priority
          />
          <span className="text-lg font-extrabold tracking-tight text-divan-primary">
            دیوان
          </span>
        </Link>

        {/* منوی اصلی (مخصوص دسکتاپ) */}
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-divan-secondary hover:text-divan-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/posts"
            className="shrink-0 rounded-md border border-divan-primary px-4 py-2 text-sm font-medium text-divan-primary transition-colors hover:bg-divan-primary hover:text-white"
          >
            ورود به مجله
          </Link>

          {/* دکمه منوی همبرگری با انیمیشن چرخش */}
          <button
            onClick={toggleMenu}
            aria-label="باز کردن منو"
            className="grid size-9 place-items-center overflow-hidden rounded-md border border-border text-foreground transition-colors hover:bg-surface md:hidden"
          >
            <div
              className={`transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </div>
          </button>
        </div>
      </div>

      {/* منوی کشویی موبایل */}
      {isOpen && (
        <nav className="animate-in fade-in slide-in-from-top-2 duration-200 border-b border-border bg-background px-5 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-divan-secondary hover:text-divan-primary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}