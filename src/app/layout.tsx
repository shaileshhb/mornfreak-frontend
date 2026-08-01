import type { Metadata } from "next";

import { fontVariables } from "@/design/typography";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mornfreak.com"),
  title: {
    default: "MORNFREAK: Fuel Your Start",
    template: "%s | MORNFREAK",
  },
  description:
    "Protein-forward breakfast for people who train, work, and move fast in the morning. Mornfreak Protein Oats and Pure Peanut Butter Powder.",
  openGraph: {
    title: "MORNFREAK: Fuel Your Start",
    description:
      "Protein-forward breakfast for people who train, work, and move fast in the morning.",
    url: "https://mornfreak.com",
    siteName: "MORNFREAK",
    images: [{ url: "/images/logo.jpeg", width: 800, height: 800, alt: "MORNFREAK logo" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MORNFREAK: Fuel Your Start",
    description:
      "Protein-forward breakfast for people who train, work, and move fast in the morning.",
    images: ["/images/logo.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
