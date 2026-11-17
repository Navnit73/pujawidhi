import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PujaWidhi: Aarti, Puja Vidhi aur Path",
    short_name: "PujaWidhi",
    description: "Aarti, puja vidhi aur path, Hinglish aur Hindi mein. Offline bhi.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FFF8EC",
    theme_color: "#F28C0F",
    lang: "en-IN",
    categories: ["lifestyle", "books"],
    icons: [
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/512-maskable", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
