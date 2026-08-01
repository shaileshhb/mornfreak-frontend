import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes, createElement } from "react";

import { cn } from "@/lib/cn";

const textVariants = cva("font-sans", {
  variants: {
    variant: {
      body: "text-base text-foreground",
      muted: "text-base text-muted-foreground",
      caption: "text-sm text-muted-foreground",
      lead: "text-lg text-muted-foreground sm:text-xl",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export type TextProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    as?: "p" | "span" | "div";
  };

export function Text({ className, variant, as = "p", ...props }: TextProps) {
  return createElement(as, {
    className: cn(textVariants({ variant }), className),
    ...props,
  });
}

export { textVariants };
