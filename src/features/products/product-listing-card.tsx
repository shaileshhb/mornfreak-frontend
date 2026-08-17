import { Droplet, Dumbbell, Wheat, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { ProductContent, ProductStat } from "@/lib/products";

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

export function ProductListingCard({ product }: { product: ProductContent }) {
  const stats = product.stats.slice(0, 2);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col gap-5 outline-none"
    >
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-card">
        <Image
          src={product.heroImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 28rem"
          className="object-contain transition-opacity duration-500 ease-in-out group-hover:opacity-0 group-focus-within:opacity-0 motion-reduce:transition-none"
        />
        <Image
          src={product.hoverImage}
          alt=""
          fill
          loading="eager"
          sizes="(max-width: 640px) 100vw, 28rem"
          className="object-contain opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
        />
      </div>

      <div className="flex flex-col gap-3 px-1">
        <div>
          <h2 className="font-sans text-xl font-semibold tracking-tight text-foreground">
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

        <span className="mt-1 font-sans text-sm font-medium text-foreground underline-offset-4 group-hover:underline group-focus-within:underline">
          View product
        </span>
      </div>
    </Link>
  );
}
