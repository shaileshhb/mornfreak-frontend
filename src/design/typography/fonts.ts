import {
  DM_Sans,
  Manrope,
  Montserrat,
  Oswald,
  Source_Sans_3,
} from "next/font/google";
import localFont from "next/font/local";

export const fontDisplay = Montserrat({
  weight: "700",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable}`;

/** Draft2 “Ember Signal” — Oswald display + Manrope body */
export const fontDraft2Display = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const fontDraft2Sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const draft2FontVariables = `${fontDraft2Display.variable} ${fontDraft2Sans.variable}`;

/**
 * Draft3 “Heat Wake” — Big Shoulders + Source Sans 3
 * Self-hosted via `next/font/local` (rather than `next/font/google`) because
 * Next's bundled fallback-metrics table has no entry for the bare "Big
 * Shoulders" family, which otherwise logs a build-time error on every request.
 */
export const fontDraft3Display = localFont({
  src: "./fonts/big-shoulders/BigShoulders-Variable.woff2",
  weight: "100 900",
  variable: "--font-big-shoulders",
  display: "swap",
});

export const fontDraft3Sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const draft3FontVariables = `${fontDraft3Display.variable} ${fontDraft3Sans.variable}`;
