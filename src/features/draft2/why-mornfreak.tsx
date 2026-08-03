import { ArrowRight, Clock3, Leaf, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { draft2Path } from "@/lib/draft2";

const REASONS = [
  {
    number: "02",
    title: "Every ingredient earns its place.",
    body: "Sourced for functional benefit and real-life purpose. Nothing is here for filler, colour, or shelf life. Only for you.",
    icon: Leaf,
  },
  {
    number: "03",
    title: "Sustained energy, not sugar spikes.",
    body: "Slow-release carbohydrates, complete protein, and prebiotics to keep you fuelled from sunrise to lunch — without the crash.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Convenience without compromise.",
    body: "Nutritious meets to be breakfast that tastes legendary and performs like a supplement. Made for mornings that move fast.",
    icon: Clock3,
  },
] as const;

export function Draft2WhyMornfreak() {
  return (
    <section className="bg-[#fff9ef] py-20 sm:py-28">
      <Container className="max-w-[82rem]">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="lg:py-6">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-[#c1121f]">
              Why Mornfreak
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-5xl uppercase leading-[0.92] tracking-wide sm:text-7xl">
              We don&apos;t just make breakfast.
              <span className="mt-1 block text-[#c1121f]">We build better mornings.</span>
            </h2>

            <div className="mt-10 max-w-2xl space-y-4">
              {REASONS.map(({ number, title, body, icon: Icon }) => (
                <article
                  key={number}
                  className="grid grid-cols-[3.75rem_1fr] gap-5 rounded-2xl bg-white px-5 py-6 shadow-sm"
                >
                  <div className="text-[#c1121f]">
                    <span className="font-display text-3xl tracking-wide">{number}</span>
                    <Icon aria-hidden className="mt-2" size={21} strokeWidth={1.7} />
                  </div>
                  <div className="border-l border-[#c1121f]/40 pl-5">
                    <h3 className="font-sans text-lg font-bold">{title}</h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {body}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <Link
              href={draft2Path("/products")}
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 bg-[#c1121f] px-7 font-sans text-sm font-bold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5"
            >
              Shop now <ArrowRight aria-hidden size={17} />
            </Link>
          </div>

          <div className="relative min-h-[34rem] overflow-hidden rounded-3xl bg-[#ead5b9] lg:min-h-full">
            <Image
              src="/images/draft2/why-mornfreak.jpg"
              alt="Athlete stretching outdoors by the ocean at sunrise"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
