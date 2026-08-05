"use client";

import { ArrowRight, BatteryCharging, Dumbbell, Leaf, Sprout, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/use-in-view";

const HERO_BENEFITS = [
  { label: "26g Protein", detail: "Per 100g", icon: Dumbbell },
  { label: "Prebiotics", detail: "Gut friendly", icon: Sprout },
  { label: "Sustained Energy", detail: "No crash", icon: BatteryCharging },
  { label: "Super Seeds", detail: "Nuts & fibre", icon: Leaf },
] as const;

export function HomeHero() {
  const [textRef, textInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-7.25rem)] w-full items-center overflow-hidden bg-foreground"
      aria-label="Hero"
    >
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <Image
          src="/images/oats_2.jpeg"
          alt="Mornfreak Rich Chocolate Protein Oats with fruit, seeds and nuts"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="animate-ken-burns object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#1e1109_0%,rgba(30,17,9,.97)_38%,rgba(30,17,9,.56)_68%,rgba(30,17,9,.15)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(30,17,9,.72)_0%,#1e1109_63%)]" />
      <div className="absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-primary/25 blur-3xl" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <div
            ref={textRef}
            className={cn(
              "flex flex-col transition-all duration-700",
              textInView ? "animate-rise opacity-100" : "opacity-0",
            )}
          >
            <div className="mb-5 flex items-center gap-3 text-white">
              <span className="flex gap-0.5 text-orange" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} aria-hidden size={14} fill="currentColor" />
                ))}
              </span>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.16em]">
                5.0 Stars <span className="mx-1 text-white/40">|</span> Loved by early tasters
              </span>
            </div>
            <h1 className="max-w-xl font-display text-[clamp(2.75rem,6vw,5.5rem)] uppercase italic leading-[0.95] tracking-[0.01em] text-white">
              Fuel your day.
              <span className="mt-2 block text-orange">Feed your goals.</span>
            </h1>
            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-white/75 sm:text-lg">
              Rich chocolate oats with 26g protein, super seeds, nuts and prebiotics.
              Built for powerful mornings without added sugar or preservatives.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center gap-2 bg-orange px-7 font-sans text-sm font-bold uppercase tracking-[0.12em] text-foreground transition-transform hover:-translate-y-0.5"
              >
                Shop now <ArrowRight aria-hidden size={17} />
              </Link>
              <Link
                href="/products"
                className="inline-flex h-12 items-center justify-center border border-white/40 px-7 font-sans text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-foreground"
              >
                Explore flavours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
