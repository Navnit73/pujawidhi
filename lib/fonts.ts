import { Inter, Noto_Sans_Devanagari, Tiro_Devanagari_Hindi } from "next/font/google";

export const heading = Tiro_Devanagari_Hindi({ weight: "400", subsets: ["devanagari", "latin"], display: "swap", variable: "--font-heading", fallback: ["Georgia", "serif"] });
// Latin text uses Inter; Devanagari glyphs fall through to Noto Sans Devanagari (stack order in globals.css).
export const latin = Inter({ weight: ["400", "600", "700"], subsets: ["latin"], display: "swap", variable: "--font-latin" });
export const deva = Noto_Sans_Devanagari({ weight: ["400", "600", "700"], subsets: ["devanagari"], display: "swap", variable: "--font-deva" });

export const fontVars = `${heading.variable} ${latin.variable} ${deva.variable}`;
