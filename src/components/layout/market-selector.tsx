"use client";

import { ChevronDown, Globe2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState, useTransition } from "react";

import { cn } from "@/lib/cn";
import {
  getMarketCode,
  SUPPORTED_MARKETS,
  type MarketCode,
} from "@/lib/markets";

type MarketSelectorProps = {
  currentMarketCode: MarketCode;
  className?: string;
};

const MARKET_OPTIONS = Object.values(SUPPORTED_MARKETS);

export function MarketSelector({
  currentMarketCode,
  className,
}: MarketSelectorProps) {
  const router = useRouter();
  const selectId = useId();
  const [selectedMarketCode, setSelectedMarketCode] =
    useState(currentMarketCode);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, startTransition] = useTransition();
  const [saving, setSaving] = useState(false);
  const pending = saving || isRefreshing;

  async function updateMarket(nextMarketCode: MarketCode) {
    setError(null);
    setSaving(true);
    setSelectedMarketCode(nextMarketCode);

    try {
      const response = await fetch("/api/market", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ market: nextMarketCode }),
      });

      if (!response.ok) {
        throw new Error("Market update failed");
      }

      startTransition(() => {
        router.refresh();
      });
    } catch {
      setSelectedMarketCode(currentMarketCode);
      setError("Could not switch market");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={cn("relative inline-flex flex-col", className)}>
      <label htmlFor={selectId} className="sr-only">
        Country/region
      </label>
      <div className="relative inline-flex items-center">
        <Globe2
          aria-hidden
          size={16}
          className="pointer-events-none absolute left-3 text-muted-foreground"
        />
        <select
          id={selectId}
          value={selectedMarketCode}
          disabled={pending}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${selectId}-error` : undefined}
          onChange={(event) => {
            void updateMarket(event.target.value as MarketCode);
          }}
          className="h-9 min-w-[6.75rem] appearance-none rounded-md border border-border bg-card py-0 pl-9 pr-8 font-sans text-sm font-semibold text-foreground outline-none transition-colors hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
        >
          {MARKET_OPTIONS.map((market) => (
            <option key={market.countryCode} value={getMarketCode(market)}>
              {market.shortLabel}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          size={14}
          className="pointer-events-none absolute right-3 text-muted-foreground"
        />
      </div>
      {error && (
        <p
          id={`${selectId}-error`}
          className="absolute left-0 top-full mt-1 whitespace-nowrap font-sans text-xs font-semibold text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
