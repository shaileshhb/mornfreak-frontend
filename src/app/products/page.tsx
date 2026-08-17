import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { ProductListingCard } from "@/features/products/product-listing-card";
import { ALL_PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Two high-performance breakfast staples. Real ingredients, real results. Mornfreak Protein Oats and Pure Peanut Butter Powder.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative bg-background">
        <div className="relative aspect-[4/3] w-full overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
          <Image
            src="/images/shop/banner.png"
            alt="Mornfreak Protein Oats pouch, peanut butter powder, branded cup, and a prepared bowl on a wooden table"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[40%] bg-gradient-to-r from-ink/55 to-transparent lg:block"
          />
        </div>

        <Container className="relative z-10">
          <div className="flex max-w-md flex-col gap-3 py-10 lg:-ml-4 lg:min-h-[30rem] lg:max-w-sm lg:justify-center lg:py-16">
            <span className="font-sans text-s font-semibold uppercase tracking-widest text-muted-foreground lg:text-paper/60">
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
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
            {ALL_PRODUCTS.map((product) => (
              <ProductListingCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
