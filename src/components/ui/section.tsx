import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/cn";

export type SectionProps = HTMLAttributes<HTMLElement>;

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("w-full py-16 sm:py-20 lg:py-24", className)}
        {...props}
      />
    );
  },
);

Section.displayName = "Section";
