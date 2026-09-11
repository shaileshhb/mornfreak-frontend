import { Droplet, Dumbbell, Wheat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/features/cart";
import { cn } from "@/lib/cn";

import type { ProductListing, ProductStat } from "./types";
import { formatMoney } from "./utils";

function StatIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  const className = "size-4 shrink-0 text-muted-foreground";

  if (key.includes("protein")) {
    return <Dumbbell aria-hidden className={className} />;
  }
  if (key.includes("fibre") || key.includes("fiber")) {
    return <Wheat aria-hidden className={className} />;
  }
  return <Droplet aria-hidden className={className} />;
}

function ListingStat({ stat }: { stat: ProductStat }) {
  return (
    <div className="flex items-center gap-2 text-foreground">
      <StatIcon label={stat.label} />
      <p className="font-sans text-sm">
        <span className="font-semibold">{stat.value}</span>{" "}
        <span className="text-muted-foreground">{stat.label}</span>
      </p>
    </div>
  );
}

export function ProductListingCard({ product }: { product: ProductListing }) {
  const stats = product.stats.slice(0, 2);
  const href = `/products/${product.slug}`;
  const available = product.availability !== "sold_out";

  return (
    <article className="flex flex-col gap-5">
      <Link href={href} className="group flex flex-col gap-5 outline-none">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-card">
          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-opacity duration-500 ease-in-out group-hover:opacity-0 group-focus-within:opacity-0 motion-reduce:transition-none"
          />
          <Image
            src={product.hoverImage}
            alt=""
            fill
            loading="eager"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
          />
        </div>

        <div className="flex flex-col gap-3 px-1">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
              {product.name}
            </h2>
            <p className="mt-1 font-sans text-sm text-muted-foreground">{product.tagline}</p>
            <p className="mt-2 font-sans text-base font-semibold text-foreground">
              {product.hasVariablePrice ? "From " : ""}
              {formatMoney(product.selectedVariant.price)}
            </p>
          </div>

          <div className="h-px w-full bg-foreground/80" />

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {stats.map((stat) => (
              <ListingStat key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </Link>

      <div className="flex min-h-10 items-center justify-between gap-3 px-1">
        <Link
          href={href}
          className="font-sans text-sm font-medium text-foreground underline-offset-4 outline-none hover:underline focus-visible:underline"
        >
          View product
        </Link>
        <AddToCartButton
          merchandiseId={product.selectedVariant.id}
          available={available}
          variant={available ? "ghost" : "outline"}
          size="sm"
          label={product.availability === "backorder" ? "Pre-order" : "Add to cart"}
          className={cn(
            "h-8 shrink-0 px-2 text-sm text-primary hover:text-primary",
            !available && "cursor-not-allowed text-muted-foreground",
          )}
        />
      </div>
    </article>
  );
}
