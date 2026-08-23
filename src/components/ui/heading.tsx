import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes, createElement } from "react";

import { cn } from "@/lib/cn";

const headingVariants = cva("text-foreground", {
  variants: {
    variant: {
      display:
        "font-display text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] uppercase text-balance",
      h1: "font-display text-[clamp(2rem,6vw,3.75rem)] font-bold leading-[1.0] tracking-[-0.02em] uppercase text-balance",
      h2: "font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.02em] uppercase sm:text-4xl",
      h3: "font-display text-2xl font-bold tracking-tight",
      h4: "font-display text-xl font-bold tracking-tight",
    },
  },
  defaultVariants: {
    variant: "h2",
  },
});

const variantToTag = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
} as const;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

export function Heading({ className, variant = "h2", as, ...props }: HeadingProps) {
  const tag = as ?? variantToTag[variant ?? "h2"];

  return createElement(tag, {
    className: cn(headingVariants({ variant }), className),
    ...props,
  });
}

export { headingVariants };
