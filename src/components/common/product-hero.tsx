import { type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { ProductId } from "@/types/product";

export type ProductHeroProps = HTMLAttributes<HTMLElement> & {
  product: ProductId;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function ProductHero({
  product,
  title,
  description,
  action,
  className,
  children,
  ...props
}: ProductHeroProps) {
  return (
    <section
      data-product={product}
      className={cn(
        "relative w-full overflow-hidden bg-product-background text-product-foreground",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-product-glow opacity-40 blur-3xl"
      />
      <div className="relative z-10 flex flex-col gap-4 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <h2 className="font-display text-4xl tracking-wide uppercase text-product-primary sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-xl text-base text-product-foreground/85 sm:text-lg">
            {description}
          </p>
        ) : null}
        {action ? <div className="pt-2">{action}</div> : null}
        {children}
      </div>
    </section>
  );
}
