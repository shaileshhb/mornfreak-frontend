"use client";

import Image from "next/image";
import Link from "next/link";

import { ALL_PRODUCTS } from "@/lib/products";
import { draft3Path } from "@/lib/draft3";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/use-in-view";

function HeatPanel({
  product,
  tone,
}: {
  product: (typeof ALL_PRODUCTS)[number];
  tone: "primary" | "orange";
}) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 });
  const isPrimary = tone === "primary";

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        isPrimary ? "bg-primary" : "bg-orange",
        inView ? "animate-rise opacity-100" : "opacity-0",
      )}
      aria-labelledby={`heat-${product.id}`}
    >
      <div className="mx-auto grid min-h-[70vh] max-w-6xl grid-cols-1 items-stretch lg:grid-cols-2">
        <div
          className={cn(
            "relative min-h-[320px] overflow-hidden lg:min-h-0",
            !isPrimary && "lg:order-2",
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
          <div
            aria-hidden
            className={cn(
              "absolute inset-0",
              isPrimary
                ? "bg-gradient-to-r from-transparent to-primary/40 lg:bg-gradient-to-l"
                : "bg-gradient-to-r from-transparent to-orange/40 lg:bg-gradient-to-r",
            )}
          />
        </div>

        <div
          className={cn(
            "flex flex-col justify-center gap-4 px-6 py-14 sm:px-10 lg:px-14 lg:py-20",
            !isPrimary && "lg:order-1",
          )}
        >
          <h2
            id={`heat-${product.id}`}
            className="font-display text-3xl uppercase leading-none tracking-wide text-primary-foreground sm:text-4xl lg:text-5xl"
          >
            {product.name}
          </h2>
          <p className="max-w-md font-sans text-lg text-primary-foreground/90">
            {product.tagline}
          </p>
          <p className="max-w-md font-sans text-sm leading-relaxed text-primary-foreground/75">
            {product.description}
          </p>
          <Link
            href={`${draft3Path("/products")}#${product.slug}`}
            className="mt-2 inline-flex w-fit border-b-2 border-primary-foreground/80 pb-0.5 font-sans text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-80"
          >
            View product
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Draft3ProductHeatPanels() {
  const [oats, peanut] = ALL_PRODUCTS;

  return (
    <>
      {oats && <HeatPanel product={oats} tone="primary" />}
      {peanut && <HeatPanel product={peanut} tone="orange" />}
    </>
  );
}
