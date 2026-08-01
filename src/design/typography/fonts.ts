import {
  Bebas_Neue,
  Big_Shoulders,
  DM_Sans,
  Manrope,
  Oswald,
  Source_Sans_3,
} from "next/font/google";

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

/** Draft3 “Heat Wake” — Big Shoulders + Source Sans 3 */
export const fontDraft3Display = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-big-shoulders",
  display: "swap",
});

export const fontDraft3Sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const draft3FontVariables = `${fontDraft3Display.variable} ${fontDraft3Sans.variable}`;
