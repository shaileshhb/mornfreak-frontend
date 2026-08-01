import type { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { ALL_PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Two high-performance breakfast staples. Real ingredients, real results. Mornfreak Protein Oats and Pure Peanut Butter Powder.",
};

export default function Draft3ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary pt-28 pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary via-primary to-orange"
        />
        <Container className="relative z-10">
          <div className="flex flex-col gap-3">
            <Heading
              variant="display"
              className="text-primary-foreground"
              as="h1"
            >
              Products
            </Heading>
            <Text variant="lead" className="max-w-md text-primary-foreground/90">
              Two high-performance breakfast staples. Buy online soon.
            </Text>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="flex flex-col divide-y divide-border border-y border-border">
            {ALL_PRODUCTS.map((product) => (
              <article
                key={product.id}
                id={product.slug}
                data-product-id={product.id}
                className="grid grid-cols-1 items-center gap-8 py-12 lg:grid-cols-[280px_1fr_auto] lg:gap-12"
              >
                <div className="relative aspect-square w-full max-w-xs overflow-hidden bg-secondary lg:max-w-none">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 80vw, 280px"
                    className="object-contain p-4"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="font-display text-3xl uppercase tracking-wide text-foreground sm:text-4xl">
                      {product.name}
                    </h2>
                    <p className="mt-2 font-sans text-lg text-orange">
                      {product.tagline}
                    </p>
                  </div>

                  <p className="max-w-xl font-sans text-sm leading-relaxed text-foreground/80">
                    {product.description}
                  </p>

                  <dl className="grid grid-cols-3 gap-4 border-y border-border py-4">
                    {product.stats.slice(0, 3).map((stat) => (
                      <div key={stat.label}>
                        <dt className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                          {stat.label}
                        </dt>
                        <dd className="mt-1 font-display text-2xl uppercase tracking-wide text-primary">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                    {product.badges.join(" · ")}
                  </p>

                  <p className="font-sans text-xs text-muted-foreground">
                    {product.weight}
                  </p>
                </div>

                <div className="flex lg:self-center">
                  <Button
                    variant="primary"
                    size="lg"
                    disabled
                    className="w-full cursor-not-allowed opacity-80 lg:min-w-[180px]"
                  >
                    Buy — Coming Soon
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
