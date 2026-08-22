"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ProductBadge } from "@/components/common/product-badge";
import { Button } from "@/components/ui/button";
import { StatChip } from "@/components/ui/stat-chip";
import { cn } from "@/lib/cn";

import { ProductBuyBoxAccordions } from "./product-buy-box-accordions";
import { QuantityStepper } from "./quantity-stepper";
import type { ProductDetail } from "./types";
import { formatMoney } from "./utils";

type ProductBuyBoxProps = {
  product: ProductDetail;
};

function StarsSummary({
  rating,
  count,
}: {
  rating: number;
  count: number;
}) {
  const rounded = Math.round(rating);

  return (
    <a
      href="#reviews"
      className="inline-flex items-center gap-2 font-sans text-sm text-foreground/80 transition-colors hover:text-foreground"
    >
      <span className="flex gap-0.5 text-primary" aria-hidden>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={14}
            fill={index < rounded ? "currentColor" : "none"}
            className={index < rounded ? "" : "text-foreground/25"}
          />
        ))}
      </span>
      <span>
        <span className="font-semibold tabular-nums">{rating.toFixed(1)}</span>
        <span className="mx-1.5 text-foreground/30">·</span>
        <span className="underline decoration-foreground/30 underline-offset-4">
          {count} {count === 1 ? "review" : "reviews"}
        </span>
      </span>
    </a>
  );
}

export function ProductBuyBox({ product }: ProductBuyBoxProps) {
  const [quantity, setQuantity] = useState(1);
  const canPurchase = !product.comingSoon;
  const ctaLabel = product.comingSoon ? "Coming Soon" : "Add to Cart";

  return (
    <div data-product={product.id} className="flex flex-col gap-4">
      <nav aria-label="Breadcrumb" className="font-sans text-sm text-foreground/50">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/products" className="transition-colors hover:text-foreground">
              Shop
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div>
        <h1 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] uppercase leading-[0.95] tracking-wide text-product-foreground">
          {product.name}
        </h1>
        <p className="mt-1.5 font-sans text-base text-product-foreground/70">
          {product.tagline}
        </p>
      </div>

      {product.reviews.count > 0 && (
        <StarsSummary
          rating={product.reviews.averageRating}
          count={product.reviews.count}
        />
      )}

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

      <div>
        <div className="flex items-baseline gap-3">
          <p className="font-display text-3xl tracking-wide text-product-foreground">
            {formatMoney(product.price, product.currency)}
          </p>
          {product.compareAtPrice != null && product.compareAtPrice > product.price && (
            <p className="font-sans text-base text-product-foreground/45 line-through">
              {formatMoney(product.compareAtPrice, product.currency)}
            </p>
          )}
        </div>
        <p className="mt-1 font-sans text-sm text-product-foreground/60">
          {product.servingInfo}
        </p>
      </div>

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          disabled={!canPurchase}
        />
        <Button
          variant="primary"
          size="lg"
          disabled={!canPurchase}
          className={cn(
            "h-12 min-h-11 w-full min-w-0 flex-1 bg-product-primary text-primary-foreground sm:w-auto",
            !canPurchase && "cursor-not-allowed opacity-80",
          )}
        >
          {ctaLabel}
        </Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {product.trustBadges.map((badge) => (
          <ProductBadge key={badge} product={product.id}>
            {badge}
          </ProductBadge>
        ))}
      </div>

      <ProductBuyBoxAccordions product={product} />
    </div>
  );
}
