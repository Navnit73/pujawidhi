import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        warm: "var(--surface-warm)",
        ink: "var(--ink)",
        muted: "var(--ink-muted)",
        saffron: "var(--saffron)",
        "on-saffron": "var(--on-saffron)",
        sindoor: "var(--sindoor)",
        tulsi: "var(--tulsi)",
        gold: "var(--gold)",
        line: "var(--border)",
      },
      fontFamily: {
        heading: ["var(--font-heading-l)", "var(--font-heading-d)", "Georgia", "serif"],
        body: ["var(--font-latin)", "var(--font-deva)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
