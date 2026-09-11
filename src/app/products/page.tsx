import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { getListingProducts } from "@/features/products/api/get-listing-products";
import { ProductListingCard } from "@/features/products/product-listing-card";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Two high-performance breakfast staples. Real ingredients, real results. Mornfreak Protein Oats and Pure Peanut Butter Powder.",
};

export default async function ProductsPage() {
  const products = await getListingProducts();

  return (
    <>
      <section className="relative bg-background">
        <div className="relative aspect-[3/2] w-full overflow-hidden lg:aspect-[4/1]">
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
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[40%] bg-gradient-to-r from-ink/55 to-transparent lg:block"
          />
        </div>

        <Container className="relative z-10 max-w-[90rem] lg:absolute lg:inset-0 lg:flex lg:items-center lg:pl-6">
          <div className="flex max-w-md flex-col gap-3 py-10 lg:max-w-sm lg:py-0 2xl:-ml-8">
            <span className="font-sans text-lg font-semibold uppercase text-muted-foreground lg:text-paper/80">
              Our Products
            </span>
            <Heading
              variant="display"
              className="text-foreground lg:leading-[0.9] lg:text-paper"
              as="h1">
              Made Better.
            </Heading>
            <Text variant="lead" className="max-w-md text-muted-foreground lg:text-paper/80">
              Real ingredients, real results.
            </Text>
          </div>
        </Container>
      </section>

      <Section>
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
