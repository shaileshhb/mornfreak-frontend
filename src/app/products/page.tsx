import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { getListingProducts } from "@/features/products/api/get-listing-products";
import { ProductListingCard } from "@/features/products/product-listing-card";
import { getCurrentMarket } from "@/lib/market-server";
import {
  getMarketFromSearchParams,
  marketAlternates,
  marketPath,
  type MarketSearchParams,
} from "@/lib/market-routing";
import {
  createBreadcrumbJsonLd,
  marketDescription,
  marketTitleLabel,
  safeJsonLd,
} from "@/lib/seo";

type ProductsPageProps = {
  searchParams: Promise<MarketSearchParams>;
};

async function resolveMarket(searchParams: Promise<MarketSearchParams>) {
  const params = await searchParams;
  return getMarketFromSearchParams(params) ?? (await getCurrentMarket());
}

export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const market = await resolveMarket(searchParams);
  const path = "/products";

  return {
    title: `Protein Oats & Peanut Butter Powder ${marketTitleLabel(market)}`,
    description: marketDescription(market),
    alternates: {
      canonical: marketPath(path, market),
      languages: marketAlternates(path),
    },
    openGraph: {
      title: `Protein Oats & Peanut Butter Powder ${marketTitleLabel(market)}`,
      description: marketDescription(market),
    },
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const market = await resolveMarket(searchParams);
  const products = await getListingProducts(market.countryCode);
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(breadcrumbJsonLd),
        }}
      />
      <section className="relative bg-background">
        <div className="relative h-[28svh] min-h-[180px] max-h-[220px] w-full overflow-hidden sm:h-[30svh] sm:max-h-[260px] lg:h-[28svh] lg:max-h-[300px]">
          <Image
            src="/images/shop/banner.avif"
            alt="Mornfreak Protein Oats pouch, peanut butter powder, branded cup, and a prepared bowl on a wooden table"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center] lg:object-[82%_center]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-ink/70 to-transparent sm:w-[50%] lg:w-[40%] lg:from-ink/55"
          />
        </div>

        <Container className="absolute inset-0 z-10 flex max-w-[90rem] items-center lg:pl-6">
          <div className="flex max-w-md flex-col gap-1.5 sm:gap-3 lg:max-w-sm 2xl:-ml-8">
            <span className="font-sans text-sm font-semibold uppercase text-paper/80 sm:text-lg">
              Our Products
            </span>
            <Heading
              variant="display"
              className="leading-[0.9] text-paper"
              as="h1">
              Made Better.
            </Heading>
            <Text variant="lead" className="max-w-md text-paper/80">
              Real ingredients, real results.
            </Text>
          </div>
        </Container>
      </section>

      <Section className="py-8 sm:py-10 lg:py-12">
        <Container>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-6">
              {products.map((product) => (
                <ProductListingCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center">
              <Heading variant="h2" as="h2">
                No products available
              </Heading>
              <Text variant="muted" className="mt-3">
                There are no products published for this market right now.
              </Text>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
