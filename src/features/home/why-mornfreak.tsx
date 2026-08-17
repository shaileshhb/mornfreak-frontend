import { ArrowRight, Clock3, Leaf, Zap } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const REASONS = [
  {
    number: "01",
    title: "Every ingredient earns its place.",
    body: "Real oats, super seeds, nuts and dates. Nothing is added unless it makes your breakfast work harder.",
    icon: Leaf,
  },
  {
    number: "02",
    title: "Energy that stays with you.",
    body: "Protein, complex carbs and fibre work together to help you move through the morning without the crash.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Built for busy mornings.",
    body: "A complete, satisfying breakfast that is ready in minutes and easy to take wherever your day starts.",
    icon: Clock3,
  },
] as const;

export function WhyMornfreak() {
  return (
    <section className="bg-card py-20 sm:py-28">
      <Container className="max-w-[82rem]">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="lg:py-6">
            <p className="font-sans text-s font-bold uppercase tracking-[0.15em] text-primary">
              Why Mornfreak
            </p>
            <Heading variant="display" as="h2" className="mt-4 max-w-2xl leading-[0.92]">
              We don&apos;t just make breakfast.
              <span className="mt-1 block text-primary">We build better mornings.</span>
            </Heading>

            <div className="mt-10 max-w-2xl divide-y divide-foreground/15">
              {REASONS.map(({ number, title, body, icon: Icon }) => (
                <article key={number} className="grid grid-cols-[3.75rem_1fr] gap-5 py-7 first:pt-0">
                  <div className="text-primary">
                    <span className="font-display text-3xl tracking-wide">{number}</span>
                    <Icon aria-hidden className="mt-2" size={21} strokeWidth={1.7} />
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-bold">{title}</h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {body}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <Link
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 bg-primary px-7 font-sans text-sm font-bold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5"
              href="/products">
              Shop now <ArrowRight aria-hidden size={17} />
            </Link>
          </div>

          <div className="relative min-h-[34rem] overflow-hidden bg-muted lg:min-h-full">
            <video
              className="absolute inset-0 h-full w-full object-cover object-center"
              src="/images/hero/why-mornfreak.mp4"
              poster="/images/why-mornfreak.avif"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="A person moving through their morning routine, fuelled by Mornfreak"
            />
            <div className="absolute inset-5" aria-hidden />
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full border-[2.5rem] border-primary/10" aria-hidden />
          </div>
        </div>
      </Container>
    </section>
  );
}
