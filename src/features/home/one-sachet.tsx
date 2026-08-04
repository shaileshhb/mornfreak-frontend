import { ArrowRight, BatteryCharging, Dumbbell, HeartPulse, Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";

const BENEFITS = [
  { label: "High protein", icon: Dumbbell },
  { label: "Sustained energy", icon: BatteryCharging },
  { label: "Added prebiotics", icon: Sprout },
  { label: "Easy to digest", icon: HeartPulse },
] as const;

export function OneSachet() {
  return (
    <section className="overflow-hidden bg-background py-20 sm:py-28">
      <Container className="max-w-[82rem]">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Built for real mornings
            </p>
            <h2 className="mt-4 max-w-xl font-display text-6xl uppercase leading-[0.9] tracking-wide text-foreground sm:text-7xl">
              One sachet. Everything that matters.
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {BENEFITS.map(({ label, icon: Icon }) => (
                <div key={label}>
                  <Icon aria-hidden className="mb-3 text-primary" size={26} strokeWidth={1.7} />
                  <p className="max-w-24 font-sans text-xs font-bold uppercase leading-snug tracking-[0.1em]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/products"
              className="mt-10 inline-flex h-12 items-center justify-center gap-2 bg-foreground px-7 font-sans text-sm font-bold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5"
            >
              Shop Mornfreak <ArrowRight aria-hidden size={17} />
            </Link>
          </div>

          <div className="relative min-h-[28rem] overflow-hidden bg-card sm:min-h-[35rem]">
            <div
              aria-hidden
              className="absolute inset-8 border border-dashed border-primary/25 sm:inset-12"
            />
            <Image
              src="/images/oats_2.jpeg"
              alt="Mornfreak Protein Oats pouch, single serve sachet and prepared breakfast bowl"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.025]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
