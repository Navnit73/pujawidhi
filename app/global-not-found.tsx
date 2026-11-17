import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { fontVars } from "@/lib/fonts-en";
import { THEME_INIT } from "@/components/ThemeToggle";

export const metadata: Metadata = { title: "Page nahi mila | PujaWidhi", robots: { index: false, follow: false } };

/** Branded 404 for both language trees (the app has two root layouts, so Next needs a global one). */
export default function GlobalNotFound() {
  return (
    <html lang="en-IN" className={fontVars} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: THEME_INIT }} /></head>
      <body>
        <main className="mx-auto grid min-h-screen max-w-xl place-items-center px-4 text-center">
          <div>
            <p className="font-heading text-6xl text-saffron" aria-hidden>404</p>
            <h1 className="mt-4 font-heading text-3xl text-sindoor">Yeh page nahi mila</h1>
            <p className="mt-2 text-muted">Link galat ho sakta hai ya page hata diya gaya hai. Aarti aur puja vidhi ke liye Home se khojein.</p>
            <h2 className="mt-6 font-heading text-2xl text-sindoor">यह पेज नहीं मिला</h2>
            <p className="mt-2 text-muted">लिंक ग़लत हो सकता है या पेज हटा दिया गया है। आरती और पूजा विधि के लिए होम से खोजें।</p>
            <p className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/" className="btn btn-primary">Home</Link>
              <Link href="/hi" className="btn btn-secondary">होम (हिंदी)</Link>
              <Link href="/puja-basics/aarti-sangrah" className="btn btn-ghost">Aarti Sangrah</Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
