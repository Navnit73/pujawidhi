import type { Lang } from "./schema";

export const SITE_NAME = "PujaWidhi";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://pujawidhi.co.in").replace(/\/$/, "");
export const TZ = "Asia/Kolkata";

export const htmlLang = (l: Lang) => (l === "hi" ? "hi-IN" : "en-IN");

/** Path for a page or hub. category/slug optional. Hinglish is the default (no prefix). */
export function pathFor(lang: Lang, category?: string, slug?: string): string {
  const prefix = lang === "hi" ? "/hi" : "";
  const parts = [category, slug].filter(Boolean).join("/");
  return `${prefix}${parts ? "/" + parts : ""}` || "/";
}

export const absUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

const HI_MONTHS = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-17" -> "17 नवंबर 2026" / "17 Nov 2026" (calendar date, no timezone shifts). */
export function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${(lang === "hi" ? HI_MONTHS : EN_MONTHS)[m - 1]} ${y}`;
}

export const INR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** UI strings used by shared chrome. */
export const T = {
  hinglish: {
    home: "Home", skip: "Content par jaayein", search: "Aarti ya puja khojein", searchPh: "Jaise: Ganesh ji ki aarti",
    onThisPage: "Is page par", quickLaunch: "Quick Launch", readerMode: "Reader mode", printSheet: "Print sheet banayein",
    aartiSangrah: "Aarti Sangrah", share: "WhatsApp par bhejein", print: "Print", updated: "Updated", reviewedBy: "Reviewed by",
    reviewPending: "Pandit reviewer sign-off baaki hai", stubNote: "Yeh page taiyaar ho raha hai. Poori jaankari jald hi yahan aayegi.",
    related: "Aur padhein", hub: "Poora hub dekhein", siblings: "Isi category mein", tools: "Upyogi tools", language: "हिंदी में पढ़ें",
    footerNote: "Parampara aur kshetra ke hisaab se vidhi mein antar ho sakta hai. Yahan prachlit roop diya gaya hai. Tithi aur muhurat ke liye panchang se milaan karein.",
    privacy: "Privacy", contact: "Contact", about: "Hamare baare mein", terms: "Terms", pages: "pages", allCategories: "Sabhi categories", breadcrumbHome: "Home",
    mostRead: "Sabse zyada padhi gayi aartiyan", festivals: "Aane waale tyohaar", festivalGuides: "Tyohaar ke puja guide", panchang: "Aaj ka panchang",
    theme: "Theme badlein", menu: "Menu", closeMenu: "Menu band karein", more: "Aur dekhein",
  },
  hi: {
    home: "होम", skip: "सामग्री पर जाएँ", search: "आरती या पूजा खोजें", searchPh: "जैसे: गणेश जी की आरती",
    onThisPage: "इस पेज पर", quickLaunch: "क्विक लॉन्च", readerMode: "रीडर मोड", printSheet: "प्रिंट शीट बनाएँ",
    aartiSangrah: "आरती संग्रह", share: "WhatsApp पर भेजें", print: "प्रिंट", updated: "अपडेट", reviewedBy: "समीक्षक",
    reviewPending: "पंडित समीक्षक की मंज़ूरी बाकी है", stubNote: "यह पेज तैयार हो रहा है। पूरी जानकारी जल्द ही यहाँ आएगी।",
    related: "और पढ़ें", hub: "पूरा हब देखें", siblings: "इसी श्रेणी में", tools: "उपयोगी टूल", language: "Read in Hinglish",
    footerNote: "परंपरा और क्षेत्र के अनुसार विधि में अंतर हो सकता है। यहाँ प्रचलित रूप दिया गया है। तिथि और मुहूर्त के लिए पंचांग से मिलान करें।",
    privacy: "गोपनीयता", contact: "संपर्क", about: "हमारे बारे में", terms: "शर्तें", pages: "पेज", allCategories: "सभी श्रेणियाँ", breadcrumbHome: "होम",
    mostRead: "सबसे ज़्यादा पढ़ी गई आरतियाँ", festivals: "आने वाले त्योहार", festivalGuides: "त्योहारों के पूजा गाइड", panchang: "आज का पंचांग",
    theme: "थीम बदलें", menu: "मेनू", closeMenu: "मेनू बंद करें", more: "और देखें",
  },
} as const;
