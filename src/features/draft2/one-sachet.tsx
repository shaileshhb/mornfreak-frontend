import { ArrowRight, BatteryCharging, Dumbbell, HeartPulse, Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { draft2Path } from "@/lib/draft2";

const BENEFITS = [
  { label: "26g Protein", detail: "Per Sachet", icon: Dumbbell },
  { label: "Sustained Energy", detail: "Complex Carbs & Fiber", icon: BatteryCharging },
  { label: "Prebiotics Added", detail: "Gut Friendly Nutrition", icon: Sprout },
  { label: "Easy to Digest", detail: "Gentle, Clean & Nutritious", icon: HeartPulse },
] as const;

export function Draft2OneSachet() {
  return (
    <section className="overflow-hidden bg-background py-20 sm:py-28">
      <Container className="max-w-[82rem]">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="max-w-xl font-display text-6xl uppercase leading-[0.9] tracking-wide text-foreground sm:text-7xl">
              One sachet.{" "}
              <span className="text-[#c29f6b]">Everything</span> that matters.
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {BENEFITS.map(({ label, detail, icon: Icon }) => (
                <div key={label}>
                  <Icon aria-hidden className="mb-3 text-foreground" size={26} strokeWidth={1.7} />
                  <p className="max-w-28 font-sans text-xs font-bold uppercase leading-snug tracking-[0.1em]">
                    {label}
                  </p>
                  <p className="mt-1 max-w-28 font-sans text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href={draft2Path("/products")}
              className="mt-10 inline-flex h-12 items-center justify-center gap-2 bg-foreground px-7 font-sans text-sm font-bold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5"
            >
              Shop Mornfreak <ArrowRight aria-hidden size={17} />
            </Link>
          </div>

          <div className="relative min-h-[28rem] overflow-hidden bg-[#fff9ef] sm:min-h-[35rem]">
            <Image
              src="/images/draft2/one-sachet.jpg"
              alt="Mornfreak Protein Oats sachet surrounded by oats, almonds, seeds and chocolate"
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
