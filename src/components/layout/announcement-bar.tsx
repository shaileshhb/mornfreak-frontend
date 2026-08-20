"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

const MESSAGES = [
  "Same day delivery available in dubai",
  "Free delivery above 99 AED",
] as const;

const DWELL_MS = 4000;
const SLIDE_MS = 550;

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const nextIndex = (index + 1) % MESSAGES.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (hovered) return;

    if (reducedMotion) {
      setSliding(false);
      const dwell = window.setTimeout(() => {
        setIndex((current) => (current + 1) % MESSAGES.length);
      }, DWELL_MS);
      return () => window.clearTimeout(dwell);
    }

    const dwell = window.setTimeout(() => {
      setSliding(true);
    }, DWELL_MS);

    return () => window.clearTimeout(dwell);
  }, [hovered, index, reducedMotion]);

  useEffect(() => {
    if (!sliding || reducedMotion) return;

    const slide = window.setTimeout(() => {
      setIndex((current) => (current + 1) % MESSAGES.length);
      setSliding(false);
    }, SLIDE_MS);

    return () => window.clearTimeout(slide);
  }, [sliding, reducedMotion]);

  const slideClass = sliding
    ? "transition-transform duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
    : "";

  return (
    <Link
      className="block bg-foreground px-4 py-2.5 text-center text-[0.7rem] font-bold uppercase tracking-[0.08em] text-background transition-colors hover:bg-primary hover:text-primary-foreground sm:text-xs"
      href="/products"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="relative block h-[1.25em] overflow-hidden">
        {reducedMotion ? (
          <span aria-live="polite" className="block truncate">
            {MESSAGES[index]}
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
              {MESSAGES[index]}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0 flex items-center justify-center whitespace-nowrap",
                slideClass,
                sliding ? "translate-x-0" : "translate-x-full",
              )}
            >
              {MESSAGES[nextIndex]}
            </span>
          </>
        )}
      </span>
    </Link>
  );
}
