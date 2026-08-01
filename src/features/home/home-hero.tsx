"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/use-in-view";

export function HomeHero() {
  const [textRef, textInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      className="relative flex min-h-[calc(100svh-4rem)] w-full items-center overflow-hidden bg-primary"
      aria-label="Hero"
    >
      {/* Background texture / gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary via-primary to-orange/60 opacity-80"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text block */}
          <div
            ref={textRef}
            className={cn(
              "flex flex-col gap-6 transition-all duration-700",
              textInView ? "animate-rise opacity-100" : "opacity-0",
            )}
          >
            <div className="inline-flex w-fit items-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5">
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">
                Breakfast. Elevated.
              </span>
            </div>
            <h1 className="font-display text-6xl uppercase leading-none tracking-wide text-primary-foreground sm:text-7xl lg:text-8xl">
              Fuel
              <br />
              Your
              <br />
              Start.
            </h1>
            <p className="max-w-sm font-sans text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
              Protein-forward breakfast for people who train, work, and move
              fast in the morning. No excuses. No compromise.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                size="lg"
                disabled
                className="cursor-not-allowed opacity-80"
              >
                Coming Soon
              </Button>
              <a href="#products">
                <Button variant="ghost" size="lg" className="text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/10">
                  Explore Products
                </Button>
              </a>
            </div>
          </div>

          {/* Product images */}
          <div className="relative flex items-center justify-center gap-4 lg:justify-end">
            <div className="relative h-64 w-44 overflow-hidden rounded-2xl shadow-lg sm:h-80 sm:w-56 lg:h-96 lg:w-64 -rotate-3 transition-transform hover:rotate-0 duration-500">
              <Image
                src="/images/oats_1.jpeg"
                alt="Mornfreak Protein Oats — Rich Chocolate"
                fill
                sizes="(max-width: 640px) 176px, (max-width: 1024px) 224px, 256px"
                className="object-cover"
                priority
              />
            </div>
            <div className="relative h-64 w-44 overflow-hidden rounded-2xl shadow-lg sm:h-80 sm:w-56 lg:h-96 lg:w-64 rotate-3 transition-transform hover:rotate-0 duration-500 mt-8">
              <Image
                src="/images/peanut_butter_powder_1.jpeg"
                alt="Mornfreak Pure Peanut Butter Powder"
                fill
                sizes="(max-width: 640px) 176px, (max-width: 1024px) 224px, 256px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-primary-foreground/50"
      >
        <span className="font-sans text-xs uppercase tracking-widest">Scroll</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-bounce"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
