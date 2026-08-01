"use client";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/use-in-view";

const PROOFS = [
  { value: "26g", label: "Protein per 100g oats" },
  { value: "0%", label: "Added sugar" },
  { value: "100%", label: "Peanuts in our powder" },
  { value: "Clean", label: "Labels. No fillers." },
] as const;

export function Draft2ProofStrip() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section className="border-y border-border bg-secondary py-14">
      <Container>
        <div
          ref={ref}
          className={cn(
            "grid grid-cols-2 gap-8 sm:grid-cols-4",
            inView ? "animate-fade-in opacity-100" : "opacity-0",
          )}
        >
          {PROOFS.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="font-display text-3xl uppercase tracking-wide text-primary sm:text-4xl">
                {item.value}
              </span>
              <span className="font-sans text-sm text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
