import type { Metadata, Viewport } from "next";
import { THEME_INIT } from "@/components/ThemeToggle";
import { SWRegister } from "@/components/SWRegister";
import { ConsentGate } from "@/components/ConsentGate";
import { htmlLang, pathFor, SITE_NAME, SITE_URL } from "./site";
import type { Lang } from "./schema";

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icons/180.png" },
  appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

export const rootViewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#FFFFFF" }, { media: "(prefers-color-scheme: dark)", color: "#1A0F0A" }],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Shared by both root layouts: <html lang> differs per language tree (en-IN vs hi-IN). */
export function RootShell({ lang, fonts, children }: { lang: Lang; fonts: string; children: React.ReactNode }) {
  return (
    <html lang={htmlLang(lang)} className={fonts} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: THEME_INIT }} /></head>
      <body>
        {children}
        <ConsentGate lang={lang} privacyHref={pathFor(lang, "privacy")} />
        <SWRegister />
      </body>
    </html>
  );
}
