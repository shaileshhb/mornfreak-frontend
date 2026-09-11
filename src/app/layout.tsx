import type { Metadata } from "next";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { fontVariables } from "@/design/typography";
import { CartProvider } from "@/features/cart";
import { FirstVisitOfferModal } from "@/features/first-visit-offer/first-visit-offer-modal";
import { hasCustomerSession } from "@/lib/shopify-auth";
import {
  createOrganizationJsonLd,
  createWebsiteJsonLd,
  DEFAULT_DESCRIPTION,
  safeJsonLd,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MORNFREAK UAE: Protein Oats & Peanut Butter Powder",
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "Food & Beverage",
  keywords: [
    "protein oats UAE",
    "peanut butter powder UAE",
    "high protein breakfast UAE",
    "healthy breakfast Dubai",
    "Mornfreak",
  ],
  openGraph: {
    title: "MORNFREAK UAE: Protein Oats & Peanut Butter Powder",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/images/logo.avif", width: 800, height: 800, alt: "MORNFREAK logo" }],
    locale: SITE_LOCALE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MORNFREAK UAE: Protein Oats & Peanut Butter Powder",
    description: DEFAULT_DESCRIPTION,
    images: ["/images/logo.avif"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const signedIn = await hasCustomerSession();
  const jsonLd = [createOrganizationJsonLd(), createWebsiteJsonLd()];

  return (
    <html lang={SITE_LANGUAGE} className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(jsonLd),
          }}
        />
        <CartProvider>
          <AnnouncementBar />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <FirstVisitOfferModal signedIn={signedIn} />
        </CartProvider>
      </body>
    </html>
  );
}
