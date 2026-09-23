"use client";

import { useEffect, useRef, useState } from "react";

import { AddToCartButton } from "@/features/cart";
import { cn } from "@/lib/cn";

import type { ProductDetail } from "./types";
import { formatMoney, hasVisibleCompareAtPrice } from "./utils";

type StickyMobileCartBarProps = {
  product: ProductDetail;
  sentinelId?: string;
};

export function StickyMobileCartBar({
  product,
  sentinelId = "buy-box-sentinel",
}: StickyMobileCartBarProps) {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry?.isIntersecting);
      },
      { threshold: 0 },
    );
    observerRef.current.observe(sentinel);

    return () => observerRef.current?.disconnect();
  }, [sentinelId]);

  const soldOut = product.availability === "sold_out";
  const label =
    product.availability === "backorder" ? "Pre-order" : "Add to cart";
  const price = product.selectedVariant.price;
  const compareAtPrice = product.selectedVariant.compareAtPrice;
  const showCompareAtPrice = hasVisibleCompareAtPrice(price, compareAtPrice);

  return (
    <div
      data-product={product.id}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden motion-safe:transition-transform motion-safe:duration-200",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      aria-hidden={!visible}
      {...(!visible ? { inert: true as const } : {})}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-sans text-xs text-muted-foreground">
            {product.name}
          </p>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <p className="font-display text-lg font-bold tracking-wide">
              {formatMoney(price)}
            </p>
            {showCompareAtPrice && (
              <p className="font-sans text-xs font-medium text-muted-foreground line-through">
                {formatMoney(compareAtPrice)}
              </p>
            )}
          </div>
        </div>
        <AddToCartButton
          merchandiseId={product.selectedVariant.id}
          available={!soldOut}
          label={label}
          variant="primary"
          size="md"
          className={cn(
            "shrink-0 bg-product-primary text-primary-foreground",
            soldOut && "cursor-not-allowed opacity-80",
          )}
        />
      </div>
    </div>
  );
}
