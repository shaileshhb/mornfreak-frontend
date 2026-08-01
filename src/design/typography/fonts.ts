import { Bebas_Neue, DM_Sans } from "next/font/google";

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
