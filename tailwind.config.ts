import type { Config } from "tailwindcss";

/**
 * Hero carousel design tokens (theme.extend).
 * Also mirrored in `src/app/globals.css` `@theme` for Tailwind v4 utility generation.
 */
const config: Config = {
  theme: {
    extend: {
      colors: {
        "cocoa-espresso": "#2B1B14",
        ink: "#1C1A17",
        "oat-cream": "#F1E9DA",
        "toasted-almond": "#C9A876",
        "sage-prebiotic": "#7C8B6F",
        "ember-clay": "#B5502E",
        paper: "#FAF7F1",
      },
      fontSize: {
        kicker: [
          "clamp(0.75rem, 0.65rem + 0.3vw, 0.875rem)",
          { letterSpacing: "0.08em" },
        ],
        h1: [
          "clamp(2.1rem, 1.3rem + 3.2vw, 4.25rem)",
          { lineHeight: "1.08", letterSpacing: "-0.01em" },
        ],
        h2: [
          "clamp(1.75rem, 1.2rem + 2.2vw, 3rem)",
          { lineHeight: "1.08", letterSpacing: "-0.01em" },
        ],
        body: [
          "clamp(1rem, 0.94rem + 0.25vw, 1.125rem)",
          { lineHeight: "1.55" },
        ],
        cta: [
          "clamp(0.95rem, 0.9rem + 0.2vw, 1.05rem)",
          { lineHeight: "1.2" },
        ],
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        accent: ["var(--font-fraunces)", "serif"],
      },
    },
  },
};

export default config;
