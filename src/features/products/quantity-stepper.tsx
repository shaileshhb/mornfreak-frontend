"use client";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/cn";

type QuantityStepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
};

export function QuantityStepper({
  value,
  min = 1,
  max = 10,
  onChange,
  disabled = false,
  className,
}: QuantityStepperProps) {
  return (
    <div
      className={cn(
        "inline-flex h-12 items-center rounded-lg border border-border bg-background",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-full w-11 items-center justify-center text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
      >
        <Minus aria-hidden size={16} />
      </button>
      <span
        aria-live="polite"
        aria-atomic="true"
        className="min-w-10 text-center font-sans text-sm font-medium tabular-nums"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled || value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-full w-11 items-center justify-center text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
      >
        <Plus aria-hidden size={16} />
      </button>
    </div>
  );
}
