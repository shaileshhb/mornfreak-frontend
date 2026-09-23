"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import type { MarketCode } from "@/lib/markets";

const MARKET_MESSAGES: Record<MarketCode, readonly string[]> = {
  AE: [
    "Same day delivery available in Dubai",
    "Free delivery above 99 AED",
  ],
  IN: [
    "India pricing now available",
    "Delivery available in selected India locations",
  ],
};

const DWELL_MS = 4000;
const SLIDE_MS = 550;

export function AnnouncementBar({
  currentMarketCode,
}: {
  currentMarketCode: MarketCode;
}) {
  const [index, setIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const messages = MARKET_MESSAGES[currentMarketCode];
  const currentIndex = index % messages.length;
  const nextIndex = (currentIndex + 1) % messages.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReducedMotion(mq.matches);
      if (mq.matches) setSliding(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (hovered) return;

    if (reducedMotion) {
      const dwell = window.setTimeout(() => {
        setIndex((current) => (current + 1) % messages.length);
      }, DWELL_MS);
      return () => window.clearTimeout(dwell);
    }

    const dwell = window.setTimeout(() => {
      setSliding(true);
    }, DWELL_MS);

    return () => window.clearTimeout(dwell);
  }, [hovered, index, messages.length, reducedMotion]);

  useEffect(() => {
    if (!sliding || reducedMotion) return;

    const slide = window.setTimeout(() => {
      setIndex((current) => (current + 1) % messages.length);
      setSliding(false);
    }, SLIDE_MS);

    return () => window.clearTimeout(slide);
  }, [messages.length, reducedMotion, sliding]);

  const slideClass = sliding
    ? "transition-transform duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
    : "";

  return (
    <Link
      className="block bg-foreground px-4 py-2.5 text-center font-sans text-[0.7rem] font-medium uppercase tracking-[0.08em] text-background transition-colors hover:bg-primary hover:text-primary-foreground sm:text-xs"
      href="/products"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="relative block h-[1.25em] overflow-hidden">
        {reducedMotion ? (
          <span aria-live="polite" className="block truncate">
            {messages[currentIndex]}
          </span>
        ) : (
          <>
            <span
              aria-live="polite"
              className={cn(
                "absolute inset-0 flex items-center justify-center whitespace-nowrap",
                slideClass,
                sliding ? "-translate-x-full" : "translate-x-0",
              )}
            >
              {messages[currentIndex]}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0 flex items-center justify-center whitespace-nowrap",
                slideClass,
                sliding ? "translate-x-0" : "translate-x-full",
              )}
            >
              {messages[nextIndex]}
            </span>
          </>
        )}
      </span>
    </Link>
  );
}
