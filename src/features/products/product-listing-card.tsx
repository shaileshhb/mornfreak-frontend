import { Droplet, Dumbbell, ShoppingBag, Wheat, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { ProductContent, ProductStat } from "@/lib/products";

import { PRODUCT_DETAIL_FIXTURES } from "./fixtures/product-details";

function iconForStat(label: string): LucideIcon {
  const key = label.toLowerCase();
  if (key.includes("protein")) return Dumbbell;
  if (key.includes("fibre") || key.includes("fiber")) return Wheat;
  return Droplet;
}

function ListingStat({ stat }: { stat: ProductStat }) {
  const Icon = iconForStat(stat.label);

  return (
    <div className="flex items-center gap-2 text-foreground">
      <Icon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
      <p className="font-sans text-sm">
        <span className="font-semibold">{stat.value}</span>{" "}
        <span className="text-muted-foreground">{stat.label}</span>
      </p>
    </div>
  );
}

function ListingCartCta({
  canPurchase,
  ctaLabel,
}: {
  canPurchase: boolean;
  ctaLabel: string;
}) {
  if (!canPurchase) {
    return (
      <span
        aria-disabled="true"
        className="inline-flex shrink-0 cursor-default items-center gap-1.5 font-sans text-sm font-medium text-muted-foreground"
      >
        <ShoppingBag aria-hidden size={15} />
        {ctaLabel}
      </span>
    );
  }

  return (
    <button
      type="button"
      className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 font-sans text-sm font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:underline"
    >
      <ShoppingBag aria-hidden size={15} />
      {ctaLabel}
    </button>
  );
}

export function ProductListingCard({ product }: { product: ProductContent }) {
  const stats = product.stats.slice(0, 2);
  const href = `/products/${product.slug}`;
  const comingSoon = PRODUCT_DETAIL_FIXTURES[product.slug]?.comingSoon ?? true;
  const canPurchase = !comingSoon;
  const ctaLabel = comingSoon ? "Coming Soon" : "Add to Cart";

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
        <ListingCartCta canPurchase={canPurchase} ctaLabel={ctaLabel} />
      </div>
    </article>
  );
}
