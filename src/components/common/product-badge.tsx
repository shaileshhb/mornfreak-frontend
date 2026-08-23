import { type HTMLAttributes } from "react";

import { cn } from "@/lib/cn";
import type { ProductId } from "@/types/product";

export type ProductBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  product: ProductId;
};

export function ProductBadge({
  product,
  className,
  children,
  ...props
}: ProductBadgeProps) {
  return (
    <span
      data-product={product}
      className={cn(
        "inline-flex items-center rounded-md bg-product-badge px-2.5 py-0.5 font-sans text-xs font-semibold text-product-badge-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
