import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes, createElement } from "react";

import { cn } from "@/lib/cn";

const headingVariants = cva("text-foreground", {
  variants: {
    variant: {
      display:
        "font-display text-[clamp(2.25rem,7vw,4.5rem)] tracking-wide uppercase text-balance",
      h1: "font-display text-[clamp(2rem,6vw,3.75rem)] tracking-wide uppercase text-balance",
      h2: "font-display text-3xl tracking-wide uppercase sm:text-4xl",
      h3: "font-sans text-2xl font-semibold tracking-tight",
      h4: "font-sans text-xl font-semibold tracking-tight",
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
