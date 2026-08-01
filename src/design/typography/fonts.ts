import { Bebas_Neue, DM_Sans, Manrope, Oswald } from "next/font/google";

export const fontDisplay = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
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
