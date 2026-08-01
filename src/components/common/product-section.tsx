import { type HTMLAttributes } from "react";

import { cn } from "@/lib/cn";
import type { ProductId } from "@/types/product";

export type ProductSectionProps = HTMLAttributes<HTMLElement> & {
  product: ProductId;
};

export function ProductSection({
  product,
  className,
  children,
  ...props
}: ProductSectionProps) {
  return (
    <section
      data-product={product}
      className={cn(
        "w-full bg-product-background py-16 text-product-foreground sm:py-20 lg:py-24",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
