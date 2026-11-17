import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: { float: "var(--float-shadow)" },
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
        "line-strong": "var(--border-strong)",
        card: "var(--card)",
        "saffron-text": "var(--saffron-text)",
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
