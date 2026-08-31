"use client";

import { Check, Mail } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { EmailMarketingState } from "@/lib/shopify-auth";

import { setEmailMarketing } from "./actions";
import { FormError } from "./form-field";

function isSubscribed(state: EmailMarketingState | null) {
  return state === "SUBSCRIBED" || state === "PENDING";
}

function canToggle(state: EmailMarketingState | null) {
  return state !== "INVALID" && state !== "REDACTED";
}

export function MarketingPreferences({
  marketingState,
}: {
  marketingState: EmailMarketingState | null;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subscribed = isSubscribed(marketingState);
  const enabled = canToggle(marketingState);

  async function toggle() {
    if (!enabled || pending) return;
    setPending(true);
    setError(null);
    const result = await setEmailMarketing(!subscribed);
    setPending(false);
    if (!result.ok) setError(result.error);
  }

  return (
    <section>
      <h2 className="mb-3 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        Marketing preferences
      </h2>
      <Card className="overflow-hidden p-0">
        <button
          type="button"
          onClick={() => void toggle()}
          disabled={!enabled || pending}
          className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-accent/40 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5"
          aria-pressed={subscribed}
        >
          <Mail aria-hidden className="size-5 shrink-0 text-muted-foreground" />
          <span className="flex-1 font-sans text-sm font-medium text-foreground sm:text-base">
            Email
          </span>
          <span
            className={cn(
              "flex size-7 items-center justify-center rounded-full border",
              subscribed
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-transparent text-muted-foreground",
            )}
            aria-hidden
          >
            {subscribed ? <Check className="size-4" /> : null}
          </span>
        </button>
      </Card>
      {pending ? (
        <p className="mt-2 font-sans text-sm text-muted-foreground">Updating…</p>
      ) : null}
      <FormError message={error} />
    </section>
  );
}
