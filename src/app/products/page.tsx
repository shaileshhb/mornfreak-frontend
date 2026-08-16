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
      <section className="bg-primary py-16">
        <Container>
          <div className="flex flex-col gap-3">
            <span className="font-sans text-s font-semibold uppercase tracking-widest text-primary-foreground/60">
              Our Products
            </span>
            <Heading variant="display" className="text-primary-foreground" as="h1">
              Made Better.
            </Heading>
            <Text variant="lead" className="max-w-md text-primary-foreground/80">
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
