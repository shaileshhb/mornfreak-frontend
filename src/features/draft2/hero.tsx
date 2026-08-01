"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { draft2Path } from "@/lib/draft2";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/use-in-view";

export function Draft2Hero() {
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
          className="object-cover animate-ken-burns"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/55 to-foreground/15"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-primary/20"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div
          ref={textRef}
          className={cn(
            "flex max-w-xl flex-col gap-5 transition-all duration-700",
            textInView ? "animate-rise opacity-100" : "opacity-0",
          )}
        >
          <p className="font-display text-5xl uppercase leading-none tracking-[0.04em] text-primary sm:text-6xl lg:text-7xl">
            MORNFREAK
          </p>
          <h1 className="font-display text-4xl uppercase leading-none tracking-wide text-primary-foreground sm:text-5xl lg:text-6xl">
            Fuel Your Start.
          </h1>
          <p className="max-w-md font-sans text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            Protein-forward breakfast for people who train, work, and move fast
            in the morning.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href={draft2Path("/products")}>
              <Button variant="primary" size="lg">
                Explore Products
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="lg"
              disabled
              className="cursor-not-allowed border border-primary-foreground/30 text-primary-foreground opacity-80 hover:bg-transparent"
            >
              Shop — Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
