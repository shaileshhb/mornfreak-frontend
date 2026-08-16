import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ProductBadge } from "@/components/common/product-badge";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { StatChip } from "@/components/ui/stat-chip";
import { Text } from "@/components/ui/text";
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
              Two high-performance breakfast staples. Real ingredients, real results.
            </Text>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {ALL_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                data-product={product.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-product-background shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Product image */}
                <div className="relative aspect-square w-full bg-product-background">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-contain p-6"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-5 p-6">
                  <div>
                    <h2 className="font-display text-xl uppercase tracking-wide text-product-foreground">
                      {product.name}
                    </h2>
                    <p className="mt-1 font-sans text-sm text-product-foreground/70">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Key stats */}
                  <div className="flex flex-wrap gap-2">
                    {product.stats.slice(0, 3).map((stat) => (
                      <StatChip
                        key={stat.label}
                        value={stat.value}
                        label={stat.label}
                        variant="ghost"
                        size="sm"
                        className="border-product-primary/20 bg-product-background text-product-foreground"
                      />
                    ))}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {product.badges.slice(0, 3).map((badge) => (
                      <ProductBadge key={badge} product={product.id}>
                        {badge}
                      </ProductBadge>
                    ))}
                  </div>

                  <p className="font-sans text-xs text-product-foreground/50">{product.weight}</p>

                  <span className="mt-auto inline-flex h-10 w-full items-center justify-center rounded-md bg-product-primary px-4 font-sans text-sm font-medium text-primary-foreground">
                    View Product
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
