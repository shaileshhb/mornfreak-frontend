"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

import type { ProductDetail } from "./types";
import { formatMoney } from "./utils";

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

  const label = product.comingSoon ? "Coming Soon" : "Add to Cart";

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
          <p className="font-display text-lg tracking-wide">
            {formatMoney(product.price, product.currency)}
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          disabled
          className="shrink-0 cursor-not-allowed bg-product-primary text-primary-foreground opacity-80"
        >
          {label}
        </Button>
      </div>
    </div>
  );
}
