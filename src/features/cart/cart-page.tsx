"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/features/products/utils";

import { useCart } from "./cart-provider";

export function CartPage() {
  const {
    cart,
    loading,
    error,
    updateLine,
    removeLine,
    clearCart,
    // checkout,
  } = useCart();
  const [busyLineId, setBusyLineId] = useState<string | null>(null);
  // const [checkingOut, setCheckingOut] = useState(false);
  // const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function handleQuantity(lineId: string, quantity: number) {
    setBusyLineId(lineId);
    try {
      await updateLine(lineId, quantity);
    } finally {
      setBusyLineId(null);
    }
  }

  async function handleRemove(lineId: string) {
    setBusyLineId(lineId);
    try {
      await removeLine(lineId);
    } finally {
      setBusyLineId(null);
    }
  }

  // async function handleCheckout() {
  //   setCheckoutError(null);
  //   setCheckingOut(true);
  //   try {
  //     const checkoutUrl = await checkout();
  //     window.location.assign(checkoutUrl);
  //   } catch (requestError) {
  //     setCheckoutError(
  //       requestError instanceof Error
  //         ? requestError.message
  //         : "Checkout is unavailable",
  //     );
  //     setCheckingOut(false);
  //   }
  // }

  const hasItems = Boolean(cart?.lines.length);

  return (
    <Section className="bg-background">
      <Container className="max-w-6xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Heading variant="display" as="h1">
              Cart
            </Heading>
            <Text variant="muted" className="mt-2">
              Your Mornfreak order is synced with Shopify checkout.
            </Text>
          </div>
          {hasItems && (
            <Button variant="ghost" size="sm" onClick={() => void clearCart()}>
              Clear cart
            </Button>
          )}
        </div>

        {loading ? (
          <div className="rounded-lg border border-border bg-card px-6 py-12 text-center">
            <Text variant="muted">Loading cart...</Text>
          </div>
        ) : !hasItems ? (
          <div className="rounded-lg border border-border bg-card px-6 py-12 text-center">
            <Heading variant="h2" as="h2">
              Your cart is empty
            </Heading>
            <Text variant="muted" className="mt-3">
              Add your breakfast fuel from the shop.
            </Text>
            <Link
              href="/products"
              className={cn(buttonVariants({ variant: "primary", size: "md" }), "mt-6")}
            >
              Shop products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <div className="flex flex-col gap-4">
              {cart?.lines.map((line) => {
                const product = line.merchandise.product;
                const optionLabel = line.merchandise.selectedOptions
                  .map((option) => option.value)
                  .filter((value) => value !== "Default Title")
                  .join(" / ");
                const lineBusy = busyLineId === line.id;

                return (
                  <article
                    key={line.id}
                    className={cn(
                      "grid gap-4 rounded-lg border border-border bg-card p-4 sm:grid-cols-[7rem_minmax(0,1fr)_auto]",
                      lineBusy && "opacity-70",
                    )}
                  >
                    <Link
                      href={`/products/${product.handle}`}
                      className="relative aspect-square overflow-hidden rounded-lg bg-background"
                    >
                      {product.image && (
                        <Image
                          src={product.image.url}
                          alt={product.image.alt}
                          fill
                          sizes="7rem"
                          className="object-contain"
                        />
                      )}
                    </Link>

                    <div className="min-w-0">
                      <Link
                        href={`/products/${product.handle}`}
                        className="font-display text-xl font-bold text-foreground outline-none hover:text-primary focus-visible:text-primary"
                      >
                        {product.title}
                      </Link>
                      {optionLabel && (
                        <p className="mt-1 font-sans text-sm text-muted-foreground">
                          {optionLabel}
                        </p>
                      )}
                      <p className="mt-2 font-sans text-sm font-semibold">
                        {formatMoney(line.merchandise.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                      <div className="inline-flex h-10 items-center rounded-md border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          disabled={lineBusy || line.quantity <= 1}
                          onClick={() =>
                            void handleQuantity(line.id, line.quantity - 1)
                          }
                          className="flex h-10 w-10 items-center justify-center hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
                        >
                          <Minus aria-hidden size={15} />
                        </button>
                        <span className="min-w-9 text-center font-sans text-sm font-semibold tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          disabled={lineBusy || line.quantity >= 99}
                          onClick={() =>
                            void handleQuantity(line.id, line.quantity + 1)
                          }
                          className="flex h-10 w-10 items-center justify-center hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
                        >
                          <Plus aria-hidden size={15} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-sans text-sm font-bold">
                          {formatMoney(line.total)}
                        </p>
                        <button
                          type="button"
                          disabled={lineBusy}
                          onClick={() => void handleRemove(line.id)}
                          className="mt-2 inline-flex items-center gap-1 font-sans text-xs font-semibold text-muted-foreground hover:text-destructive disabled:pointer-events-none disabled:opacity-40"
                        >
                          <Trash2 aria-hidden size={14} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="rounded-lg border border-border bg-card p-5 lg:sticky lg:top-24">
              <Heading variant="h2" as="h2" className="text-2xl">
                Order summary
              </Heading>
              <div className="mt-5 flex items-center justify-between border-b border-border pb-4 font-sans text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">
                  {cart ? formatMoney(cart.subtotal) : ""}
                </span>
              </div>
              <p className="mt-4 font-sans text-sm text-muted-foreground">
                Shipping, taxes, and discounts are calculated in Shopify checkout.
              </p>
              {error && (
                <p className="mt-4 font-sans text-sm font-semibold text-destructive">
                  {error}
                </p>
              )}
              <Button size="lg" className="mt-5 w-full" disabled>
                Coming soon
              </Button>
            </aside>
          </div>
        )}
      </Container>
    </Section>
  );
}
