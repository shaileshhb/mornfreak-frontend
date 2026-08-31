import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

const inputClassName =
  "h-10 w-full rounded-md border border-input bg-background px-3 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40";

export function FormField({
  id,
  label,
  className,
  ...props
}: ComponentProps<"input"> & { label: string }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="font-sans text-sm font-medium text-foreground">
        {label}
      </label>
      <input id={id} className={inputClassName} {...props} />
    </div>
  );
}

export function FormError({ message }: { message?: string | null }) {
  if (!message) return null;

  return (
    <p className="font-sans text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}
