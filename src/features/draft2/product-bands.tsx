"use client";

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { ALL_PRODUCTS } from "@/lib/products";
import { draft2Path } from "@/lib/draft2";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/use-in-view";

function ProductBand({
  product,
  reverse,
}: {
  product: (typeof ALL_PRODUCTS)[number];
  reverse: boolean;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14",
        inView ? "animate-rise opacity-100" : "opacity-0",
      )}
    >
      <div
        className={cn(
          "relative aspect-[4/5] w-full overflow-hidden bg-secondary sm:aspect-[5/4]",
          reverse && "lg:order-2",
        )}
      >
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={cn(
            "object-cover transition-transform duration-700",
            inView ? "scale-100" : "scale-105",
          )}
        />
      </div>

      <div className={cn("flex flex-col gap-4", reverse && "lg:order-1")}>
        <Heading variant="h2" as="h3">
          {product.name}
        </Heading>
        <Text variant="lead" className="max-w-md">
          {product.tagline}
        </Text>
        <p className="max-w-md font-sans text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
          {product.stats
            .slice(0, 3)
            .map((s) => `${s.value} ${s.label}`)
            .join(" · ")}
        </p>
        <Link
          href={draft2Path("/products")}
          className="mt-2 inline-flex w-fit font-sans text-sm font-semibold text-primary underline-offset-4 transition-colors hover:underline"
        >
          View in products
        </Link>
      </div>
    </div>
  );
}

export function Draft2ProductBands() {
  return (
    <Section>
      <Container>
        <div className="mb-14 max-w-xl">
          <Heading variant="h2">Two staples. Zero compromise.</Heading>
          <Text variant="lead" className="mt-3">
            High-protein breakfast built for real mornings — not sugar spikes.
          </Text>
        </div>

        <div className="flex flex-col gap-20">
          {ALL_PRODUCTS.map((product, index) => (
            <ProductBand
              key={product.id}
              product={product}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
