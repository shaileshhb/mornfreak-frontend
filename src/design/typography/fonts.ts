import { Inter, Manrope } from "next/font/google";

/** Brand / display — marketing headings, product titles, metrics */
export const fontDisplay = Manrope({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

/** UI / body — navigation, buttons, labels, forms, copy */
export const fontSans = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable}`;
