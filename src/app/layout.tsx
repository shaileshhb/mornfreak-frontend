import type { Metadata } from "next";

import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { fontVariables } from "@/design/typography";
import { CartProvider } from "@/features/cart";
import { FirstVisitOfferModal } from "@/features/first-visit-offer/first-visit-offer-modal";
import { getCurrentMarket } from "@/lib/market-server";
import { hasCustomerSession } from "@/lib/shopify-auth";
import {
  createOrganizationJsonLd,
  createRootMetadata,
  createWebsiteJsonLd,
  safeJsonLd,
} from "@/lib/seo";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const market = await getCurrentMarket();
  return createRootMetadata(market);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [signedIn, market] = await Promise.all([
    hasCustomerSession(),
    getCurrentMarket(),
  ]);
  const jsonLd = [createOrganizationJsonLd(), createWebsiteJsonLd(market)];

  return (
    <html lang={market.locale} className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(jsonLd),
          }}
        />
        <CartProvider key={market.countryCode}>
          <AnnouncementBar currentMarketCode={market.countryCode} />
          <Nav currentMarketCode={market.countryCode} />
          <main className="flex-1">{children}</main>
          <Footer />
          <FirstVisitOfferModal signedIn={signedIn} />
        </CartProvider>
      </body>
    </html>
  );
}
