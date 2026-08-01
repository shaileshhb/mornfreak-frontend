import type { Metadata } from "next";

import { fontVariables } from "@/design/typography";

import "./globals.css";

export const metadata: Metadata = {
  title: "MORNFREAK",
  description: "For the freaks who take breakfast seriously",
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
