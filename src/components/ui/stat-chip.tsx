import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const statChipVariants = cva(
  "inline-flex flex-col items-center justify-center rounded-xl border px-4 py-3 text-center",
  {
    variants: {
      variant: {
        primary: "border-primary/20 bg-primary text-primary-foreground",
        orange: "border-orange/20 bg-orange text-orange-foreground",
        outline: "border-border bg-background text-foreground",
        ghost: "border-border bg-secondary text-foreground",
      },
      size: {
        sm: "min-w-[80px]",
        md: "min-w-[100px]",
        lg: "min-w-[120px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type StatChipProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof statChipVariants> & {
    value: string;
    label: string;
  };

export function StatChip({
  value,
  label,
  variant,
  size,
  className,
  ...props
}: StatChipProps) {
  return (
    <div className={cn(statChipVariants({ variant, size }), className)} {...props}>
      <span className="font-display text-2xl font-extrabold leading-none tracking-tight">{value}</span>
      <span className="mt-1 font-sans text-xs font-semibold uppercase tracking-widest opacity-80">
        {label}
      </span>
    </div>
  );
}

export { statChipVariants };
