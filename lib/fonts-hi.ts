import { Inter, Noto_Sans_Devanagari, Tiro_Devanagari_Hindi } from "next/font/google";

/** Hindi tree: Devanagari is critical (preloaded, two weights only). Inter is for the odd Latin word, so not preloaded. */
const headingDeva = Tiro_Devanagari_Hindi({ weight: "400", subsets: ["devanagari"], display: "swap", variable: "--font-heading-d", fallback: ["Georgia", "serif"] });
const headingLatin = Tiro_Devanagari_Hindi({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-heading-l", preload: false });
const latin = Inter({ weight: ["400", "600", "700"], subsets: ["latin"], display: "swap", variable: "--font-latin", preload: false });
const deva = Noto_Sans_Devanagari({ weight: ["400", "700"], subsets: ["devanagari"], display: "swap", variable: "--font-deva" });
export const fontVars = `${headingLatin.variable} ${headingDeva.variable} ${latin.variable} ${deva.variable}`;
