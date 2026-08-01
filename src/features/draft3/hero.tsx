"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { draft3Path } from "@/lib/draft3";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/use-in-view";

export function Draft3Hero() {
  const [textRef, textInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/oats_2.jpeg"
          alt="Mornfreak Protein Oats ready to serve"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%] animate-ken-burns"
        />
        {/* Single heat wash — vermillion from the bottom only */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-primary from-15% via-primary/70 via-40% to-transparent to-55% transition-opacity duration-1000",
            textInView ? "opacity-100" : "opacity-0",
          )}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-14 pt-28 sm:px-6 sm:pb-16 lg:px-8 lg:pb-24">
        <div
          ref={textRef}
          className={cn(
            "flex max-w-3xl flex-col gap-4 transition-all duration-700 sm:gap-5",
            textInView ? "animate-rise opacity-100" : "opacity-0",
          )}
        >
          <p
            className="font-display uppercase leading-none tracking-[0.02em] text-primary-foreground"
            style={{ fontSize: "clamp(2.75rem, 10vw, 8.5rem)" }}
          >
            MORNFREAK
          </p>

          <div
            aria-hidden
            className="h-0.5 w-16 bg-orange sm:w-20"
          />

          <h1 className="font-display text-2xl uppercase leading-none tracking-wide text-orange sm:text-3xl lg:text-4xl">
            Wake Up Hot.
          </h1>

          <p className="max-w-md font-sans text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            Protein-forward breakfast for people who train, work, and move fast
            in the morning.
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
            <Link href={draft3Path("/products")}>
              <Button
                variant="secondary"
                size="lg"
                className="w-full bg-primary-foreground text-foreground hover:bg-primary-foreground/90 sm:w-auto"
              >
                Explore Products
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="lg"
              disabled
              className="w-full cursor-not-allowed border border-primary-foreground/40 text-primary-foreground opacity-80 hover:bg-transparent sm:w-auto"
            >
              Shop — Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
