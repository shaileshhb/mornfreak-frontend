"use client";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { StatChip } from "@/components/ui/stat-chip";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/use-in-view";

const STATS = [
  { value: "26g", label: "Protein / 100g", variant: "primary" as const },
  { value: "10%", label: "Fibre", variant: "orange" as const },
  { value: "0%", label: "Added Sugar", variant: "outline" as const },
  { value: "0%", label: "Preservatives", variant: "outline" as const },
];

export function MadeBetter() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <Section className="bg-secondary">
      <Container>
        <div
          ref={ref}
          className={cn(
            "flex flex-col items-center gap-10 text-center transition-all duration-700",
            inView ? "animate-rise opacity-100" : "opacity-0",
          )}
        >
          <div className="flex flex-col gap-3">
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-orange">
              Made Better
            </span>
            <Heading variant="h2">The Numbers Don&apos;t Lie</Heading>
            <Text variant="lead" className="mx-auto max-w-lg">
              Every macro is there for a reason. Every ingredient earns its
              place. This is what breakfast looks like when you stop
              compromising.
            </Text>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {STATS.map((stat) => (
              <StatChip
                key={stat.label}
                value={stat.value}
                label={stat.label}
                variant={stat.variant}
                size="lg"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-4 w-full max-w-2xl">
            {[
              {
                icon: "🌾",
                title: "Complex Carbs",
                body: "Sustained energy that lasts through your workout and your workday.",
              },
              {
                icon: "🌱",
                title: "All Natural",
                body: "Dates, seeds, nuts, oats — real food with nothing hidden on the label.",
              },
              {
                icon: "💪",
                title: "Protein-First",
                body: "Built around your protein target so you hit your macros before you even leave home.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 text-center"
              >
                <span className="text-3xl" role="img" aria-hidden>
                  {item.icon}
                </span>
                <p className="font-sans font-semibold text-foreground">{item.title}</p>
                <p className="font-sans text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
