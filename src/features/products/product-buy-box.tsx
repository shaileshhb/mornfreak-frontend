"use client";

import { Ban, Droplet, Dumbbell, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { AddToCartButton } from "@/features/cart";
import { cn } from "@/lib/cn";

import { ProductBuyBoxAccordions } from "./product-buy-box-accordions";
import { getVariantAvailability } from "./api/product-mappers";
import { QuantityStepper } from "./quantity-stepper";
import type { ProductDetail, ProductStat } from "./types";
import { formatMoney } from "./utils";

type ProductBuyBoxProps = {
  product: ProductDetail;
};

function StatIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  const props = {
    "aria-hidden": true,
    size: 16,
    strokeWidth: 1.75,
    className: "text-product-primary",
  } as const;

  if (key.includes("protein")) return <Dumbbell {...props} />;
  if (key.includes("sugar")) return <Ban {...props} />;
  return <Droplet {...props} />;
}

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
      className="inline-flex items-center gap-2 font-sans text-sm text-product-foreground/80 outline-none transition-colors hover:text-product-foreground focus-visible:ring-2 focus-visible:ring-product-primary focus-visible:ring-offset-2"
    >
      <span className="flex gap-0.5 text-product-primary" aria-hidden>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={14}
            fill={index < rounded ? "currentColor" : "none"}
            className={index < rounded ? "" : "text-product-foreground/25"}
          />
        ))}
      </span>
      <span>
        <span className="font-semibold tabular-nums">{rating.toFixed(1)}</span>
        <span className="mx-1.5 text-product-foreground/30">·</span>
        <span className="underline decoration-product-foreground/30 underline-offset-4">
          {count} {count === 1 ? "review" : "reviews"}
        </span>
      </span>
    </a>
  );
}

function BuyBoxStat({ stat }: { stat: ProductStat }) {
  return (
    <div className="flex min-w-[6.5rem] flex-1 flex-col items-center rounded-xl border border-product-primary/50 bg-product-background px-3 py-3 text-center text-product-foreground sm:min-w-[7.5rem] sm:px-4 sm:py-3.5">
      <StatIcon label={stat.label} />
      <span className="mt-1.5 font-display text-2xl font-bold leading-none tracking-wide">
        {stat.value}
      </span>
      <span className="mt-1 font-sans text-[0.6875rem] font-medium uppercase tracking-widest text-product-foreground/80">
        {stat.label}
      </span>
    </div>
  );
}

export function ProductBuyBox({ product }: ProductBuyBoxProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.selectedVariant.id,
  );
  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) ??
    product.selectedVariant;
  const availability = getVariantAvailability(selectedVariant);
  const soldOut = availability === "sold_out";
  const availabilityLabel = soldOut
    ? "Sold out"
    : availability === "backorder"
      ? "Available to order"
      : selectedVariant.quantityAvailable == null
        ? "In stock"
        : `${selectedVariant.quantityAvailable} in stock`;
  const ctaLabel =
    availability === "backorder" ? "Pre-order" : "Add to cart";
  const maxQuantity = Math.max(
    1,
    Math.min(selectedVariant.quantityAvailable ?? 10, 10),
  );
  const compareAtPrice = selectedVariant.compareAtPrice;
  const showCompareAtPrice =
    compareAtPrice != null &&
    compareAtPrice.currencyCode === selectedVariant.price.currencyCode &&
    Number(compareAtPrice.amount) > Number(selectedVariant.price.amount);
  const eyebrow =
    product.label !== product.name ? product.label : "Mornfreak";

  return (
    <div
      data-product={product.id}
      data-variant={selectedVariant.id}
      className="flex flex-col gap-5 sm:gap-6"
    >
      <nav aria-label="Breadcrumb" className="font-sans text-sm text-product-foreground/45">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link
              href="/"
              className="outline-none transition-colors hover:text-product-foreground focus-visible:ring-2 focus-visible:ring-product-primary"
            >
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link
              href="/products"
              className="outline-none transition-colors hover:text-product-foreground focus-visible:ring-2 focus-visible:ring-product-primary"
            >
              Shop
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-product-foreground/80" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div>
        <p className="font-sans text-kicker font-semibold uppercase text-product-primary">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-bold uppercase leading-[0.9] tracking-wide text-product-foreground">
          {product.name}
        </h1>
        <p className="mt-3 font-sans text-base leading-relaxed text-product-foreground/70 sm:text-lg">
          {product.tagline}
        </p>
      </div>

      {product.reviews.count > 0 && (
        <StarsSummary
          rating={product.reviews.averageRating}
          count={product.reviews.count}
        />
      )}

      <div>
        <div className="flex items-baseline gap-3">
          <p className="font-display text-[2rem] font-bold leading-none tracking-wide text-product-foreground sm:text-4xl">
            {formatMoney(selectedVariant.price)}
          </p>
          {showCompareAtPrice && (
            <p className="font-sans text-base text-product-foreground/45 line-through">
              {formatMoney(compareAtPrice)}
            </p>
          )}
        </div>
        <p
          className={cn(
            "mt-2 font-sans text-sm font-semibold",
            soldOut ? "text-destructive" : "text-product-primary",
          )}
        >
          {availabilityLabel}
        </p>
        <p className="mt-1.5 font-sans text-sm text-product-foreground/60">
          {product.servingInfo}
        </p>
      </div>

      {product.variants.length > 1 ? (
        <label className="flex flex-col gap-2 font-sans text-sm font-medium text-product-foreground">
          Option
          <select
            value={selectedVariant.id}
            onChange={(event) => {
              setSelectedVariantId(event.target.value);
              setQuantity(1);
            }}
            className="h-11 rounded-lg border border-product-primary/40 bg-product-background px-3 text-product-foreground outline-none focus-visible:ring-2 focus-visible:ring-product-primary"
          >
            {product.variants.map((variant) => {
              const variantAvailability = getVariantAvailability(variant);
              const optionLabel =
                variant.selectedOptions.map((option) => option.value).join(" / ") ||
                variant.title;

              return (
                <option key={variant.id} value={variant.id}>
                  {optionLabel} — {formatMoney(variant.price)}
                  {variantAvailability === "sold_out" ? " — Sold out" : ""}
                </option>
              );
            })}
          </select>
        </label>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {product.stats.slice(0, 3).map((stat) => (
          <BuyBoxStat key={stat.label} stat={stat} />
        ))}
      </div>

      <ul className="flex flex-wrap gap-2">
        {product.trustBadges.map((badge) => (
          <li key={badge}>
            <span className="inline-flex items-center rounded-full border border-product-primary/50 bg-product-background px-3 py-1 font-sans text-xs font-medium text-product-foreground">
              {badge}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          max={maxQuantity}
          disabled={soldOut}
        />
        <AddToCartButton
          merchandiseId={selectedVariant.id}
          quantity={quantity}
          available={!soldOut}
          label={ctaLabel}
          variant="primary"
          size="lg"
          className={cn(
            "h-12 min-h-11 w-full min-w-0 flex-1 bg-product-primary text-primary-foreground hover:bg-product-primary/90 sm:w-auto",
            soldOut && "cursor-not-allowed disabled:opacity-100",
          )}
        />
      </div>

      <ProductBuyBoxAccordions product={product} />
    </div>
  );
}
