"use client";

import Image from "next/image";

import { ProductBadge } from "@/components/common/product-badge";
import { ProductHero } from "@/components/common/product-hero";
import { ProductSection } from "@/components/common/product-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { StatChip } from "@/components/ui/stat-chip";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/use-in-view";
import type { ProductContent } from "@/lib/products";

type ProductPageLayoutProps = {
  product: ProductContent;
};

export function ProductPageLayout({ product }: ProductPageLayoutProps) {
  const [statsRef, statsInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [benefitsRef, benefitsInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [serveRef, serveInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <>
      {/* Hero */}
      <ProductHero
        product={product.id}
        title={product.name}
        description={product.description}
        action={
          <Button
            variant="primary"
            size="lg"
            disabled
            className="cursor-not-allowed opacity-80 bg-product-primary text-primary-foreground"
          >
            Coming Soon
          </Button>
        }
      >
        <div className="relative mt-6 aspect-video w-full max-w-lg overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 512px"
            className="object-cover"
            priority
          />
        </div>
      </ProductHero>

      {/* Stats bar */}
      <ProductSection product={product.id}>
        <Container>
          <div
            ref={statsRef}
            className={cn(
              "flex flex-col items-center gap-8 transition-all duration-700",
              statsInView ? "animate-rise opacity-100" : "opacity-0",
            )}
          >
            <div className="text-center">
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-product-primary/70">
                {product.tagline}
              </span>
              <Heading variant="h2" className="mt-2 text-product-foreground">
                The Numbers
              </Heading>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {product.stats.map((stat) => (
                <StatChip
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  variant="ghost"
                  size="lg"
                  className="border-product-primary/20 bg-product-background text-product-foreground"
                />
              ))}
            </div>
            <Text variant="muted" className="max-w-md text-center text-product-foreground/70">
              {product.weight}
            </Text>
          </div>
        </Container>
      </ProductSection>

      {/* Benefits */}
      <Section>
        <Container>
          <div
            ref={benefitsRef}
            className={cn(
              "flex flex-col gap-10 transition-all duration-700",
              benefitsInView ? "animate-rise opacity-100" : "opacity-0",
            )}
          >
            <div className="text-center">
              <Heading variant="h2">Why It Works</Heading>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {product.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <h3 className="font-sans text-base font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-muted-foreground">
                    {benefit.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Serving suggestion */}
      <Section className="bg-secondary">
        <Container>
          <div
            ref={serveRef}
            className={cn(
              "flex flex-col items-center gap-8 transition-all duration-700",
              serveInView ? "animate-rise opacity-100" : "opacity-0",
            )}
          >
            <div className="text-center">
              <Heading variant="h2">Serving Suggestion</Heading>
              <Text variant="lead" className="mt-2">
                Ready in minutes. Ready to fuel anything.
              </Text>
            </div>
            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl shadow-lg aspect-[16/9]">
              <Image
                src={product.serveImage}
                alt={`${product.name} serving suggestion`}
                fill
                sizes="(max-width: 640px) 100vw, 672px"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust badges + CTA */}
      <ProductSection product={product.id} className="py-12">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {product.badges.map((badge) => (
                <ProductBadge key={badge} product={product.id}>
                  {badge}
                </ProductBadge>
              ))}
            </div>
            <Heading variant="h3" className="text-product-foreground">
              Ready to fuel your morning?
            </Heading>
            <Button
              variant="primary"
              size="lg"
              disabled
              className="cursor-not-allowed opacity-80 bg-product-primary text-primary-foreground"
            >
              Coming Soon
            </Button>
          </div>
        </Container>
      </ProductSection>
    </>
  );
}
