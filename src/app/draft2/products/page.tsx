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

export default function Draft2ProductsPage() {
  return (
    <>
      <section className="bg-primary pt-28 pb-16">
        <Container>
          <div className="flex flex-col gap-3">
            <Heading variant="display" className="text-primary-foreground" as="h1">
              Products
            </Heading>
            <Text variant="lead" className="max-w-md text-primary-foreground/85">
              Two high-performance breakfast staples. Real ingredients, real results.
            </Text>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="flex flex-col gap-20">
            {ALL_PRODUCTS.map((product, index) => (
              <article
                key={product.id}
                id={product.slug}
                data-product-id={product.id}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  className={`relative aspect-square w-full overflow-hidden bg-secondary ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-6"
                  />
                </div>

                <div
                  className={`flex flex-col gap-5 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div>
                    <h2 className="font-display text-3xl uppercase tracking-wide text-foreground sm:text-4xl">
                      {product.name}
                    </h2>
                    <p className="mt-2 font-sans text-lg text-muted-foreground">
                      {product.tagline}
                    </p>
                  </div>

                  <p className="max-w-md font-sans text-sm leading-relaxed text-foreground/80">
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

                  <Button
                    variant="primary"
                    size="lg"
                    disabled
                    className="mt-2 w-full cursor-not-allowed opacity-80 sm:w-auto"
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
