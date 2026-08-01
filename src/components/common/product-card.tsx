import { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { ProductId } from "@/types/product";

export type ProductCardProps = HTMLAttributes<HTMLDivElement> & {
  product: ProductId;
  title: string;
  description?: string;
  badge?: ReactNode;
  action?: ReactNode;
};

export function ProductCard({
  product,
  title,
  description,
  badge,
  action,
  className,
  children,
  ...props
}: ProductCardProps) {
  return (
    <div
      data-product={product}
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-border bg-product-background p-6 text-product-foreground shadow-sm",
        className,
      )}
      {...props}
    >
      {badge ? <div>{badge}</div> : null}
      <div className="flex flex-col gap-2">
        <h3 className="font-sans text-lg font-semibold tracking-tight text-product-foreground">
          {title}
        </h3>
        {description ? (
          <p className="text-sm text-product-foreground/80">{description}</p>
        ) : null}
      </div>
      {children}
      {action ? <div className="mt-auto pt-2">{action}</div> : null}
    </div>
  );
}
