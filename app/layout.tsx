import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "آژانس تبلیغاتی دیوان | تبلیغات محیطی",
  description:
    "آرکا؛ آژانس تبلیغاتی تخصصی در حوزه برندسازی، دیجیتال مارکتینگ و تولید محتوا برای برندهای پیشرو.",
  openGraph: {
    title: "آژانس تبلیغاتی آرکا",
    description: "برندسازی، دیجیتال مارکتینگ و تولید محتوا برای برندهای پیشرو.",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}