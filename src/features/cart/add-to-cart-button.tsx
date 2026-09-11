"use client";

import { ShoppingBag } from "lucide-react";
import { useState } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/cn";

import { useCart } from "./cart-provider";

type AddToCartButtonProps = Omit<ButtonProps, "onClick" | "children"> & {
  merchandiseId: string;
  quantity?: number;
  available: boolean;
  label?: string;
  soldOutLabel?: string;
  onAdded?: () => void;
};

export function AddToCartButton({
  merchandiseId,
  quantity = 1,
  available,
  label = "Add to cart",
  soldOutLabel = "Sold out",
  className,
  disabled,
  onAdded,
  ...props
}: AddToCartButtonProps) {
  const { addLine } = useCart();
  const [status, setStatus] = useState<"idle" | "adding" | "added" | "error">(
    "idle",
  );
  const isDisabled = disabled || !available || status === "adding";

  async function handleClick() {
    if (isDisabled) return;

    setStatus("adding");
    try {
      await addLine(merchandiseId, quantity);
      setStatus("added");
      onAdded?.();
      window.setTimeout(() => setStatus("idle"), 1600);
    } catch {
      setStatus("error");
    }
  }

  const buttonLabel = !available
    ? soldOutLabel
    : status === "adding"
      ? "Adding..."
      : status === "added"
        ? "Added"
        : status === "error"
          ? "Try again"
          : label;

  return (
    <Button
      {...props}
      disabled={isDisabled}
      aria-live="polite"
      onClick={handleClick}
      className={cn(status === "error" && "bg-destructive hover:bg-destructive/90", className)}
    >
      <ShoppingBag aria-hidden size={16} />
      {buttonLabel}
    </Button>
  );
}
