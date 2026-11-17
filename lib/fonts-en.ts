import { Inter, Noto_Sans_Devanagari, Tiro_Devanagari_Hindi } from "next/font/google";

/**
 * Hinglish tree: Latin text is critical, so Inter and the Latin cut of the heading font are preloaded.
 * Devanagari only appears in lyrics/mantras (below the fold), so those cuts are NOT preloaded; the browser fetches
 * them via unicode-range only when a page actually shows Devanagari.
 */
const headingLatin = Tiro_Devanagari_Hindi({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-heading-l", fallback: ["Georgia", "serif"] });
const headingDeva = Tiro_Devanagari_Hindi({ weight: "400", subsets: ["devanagari"], display: "swap", variable: "--font-heading-d", preload: false });
const latin = Inter({ weight: ["400", "600", "700"], subsets: ["latin"], display: "swap", variable: "--font-latin" });
const deva = Noto_Sans_Devanagari({ weight: ["400", "700"], subsets: ["devanagari"], display: "swap", variable: "--font-deva", preload: false });
export const fontVars = `${headingLatin.variable} ${headingDeva.variable} ${latin.variable} ${deva.variable}`;
