import Image from "next/image";
import Link from "next/link";

import { ProductBadge } from "@/components/common/product-badge";
import { ProductCard } from "@/components/common/product-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { ALL_PRODUCTS } from "@/lib/products";

import {
  BrandStrip,
  HomeHero,
  InstagramTeaser,
  MadeBetter,
} from "@/features/home";

export default function Home() {
  return (
    <>
      <HomeHero />
      <BrandStrip />

      {/* Products section */}
      <Section id="products" className="scroll-mt-20">
        <Container>
          <div className="mb-12 text-center">
            <Heading variant="h2" className="text-foreground">
              Our Products
            </Heading>
            <Text variant="lead" className="mt-3 mx-auto max-w-xl">
              Two high-performance breakfast staples. Real ingredients, real results.
            </Text>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {ALL_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href="/products"
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
              >
                <ProductCard
                  product={product.id}
                  title={product.name}
                  description={product.tagline}
                  badge={
                    <div className="flex flex-wrap gap-2">
                      {product.badges.slice(0, 3).map((b) => (
                        <ProductBadge key={b} product={product.id}>
                          {b}
                        </ProductBadge>
                      ))}
                    </div>
                  }
                  action={
                    <span className="font-sans text-sm font-medium text-product-primary transition-all group-hover:underline">
                      View Product →
                    </span>
                  }
                  className="h-full transition-shadow group-hover:shadow-lg"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-md bg-product-background/50">
                    <Image
                      src={product.heroImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="font-sans text-xs text-product-foreground/60">{product.weight}</p>
                </ProductCard>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <MadeBetter />
      <InstagramTeaser />

      {/* CTA banner */}
      <section className="bg-primary py-20">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <Heading
              variant="display"
              className="text-primary-foreground"
              as="h2"
            >
              Morning is yours.
            </Heading>
            <Text variant="lead" className="max-w-md text-primary-foreground/80">
              Stop settling for a weak start. Fuel up, show up, and own the day.
            </Text>
            <Button
              variant="secondary"
              size="lg"
              disabled
              className="cursor-not-allowed opacity-80"
            >
              Coming Soon
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
