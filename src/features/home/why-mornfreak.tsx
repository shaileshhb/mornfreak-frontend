import { ArrowRight, Clock3, Leaf, Zap } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const REASONS = [
  {
    title: "Every ingredient earns its place.",
    body: "Real oats, super seeds, nuts and dates. Nothing is added unless it makes your breakfast work harder.",
    icon: Leaf,
  },
  {
    title: "Energy that stays with you.",
    body: "Protein, complex carbs and fibre work together to help you move through the morning without the crash.",
    icon: Zap,
  },
  {
    title: "Built for busy mornings.",
    body: "A complete, satisfying breakfast that is ready in minutes and easy to take wherever your day starts.",
    icon: Clock3,
  },
] as const;

export function WhyMornfreak() {
  return (
    <section className="bg-card py-5 sm:py-10">
      <Container className="max-w-[90rem]">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="order-1 lg:order-1 lg:min-h-[calc(100svh+24rem)] lg:py-6">
            <p className="font-sans text-s font-semibold uppercase tracking-[0.15em] text-primary">
              Why Mornfreak
            </p>
            <Heading variant="display" as="h2" className="mt-4 max-w-2xl leading-[0.92]">
              We don&apos;t just make breakfast.
              <span className="mt-1 block text-primary">We build better mornings.</span>
            </Heading>

            <div className="mt-10 flex max-w-2xl flex-col gap-4">
              {REASONS.map(({ title, body, icon: Icon }) => (
                <article
                  key={title}
                  className="flex items-start gap-4 rounded-xl bg-card px-5 py-5 shadow-md sm:gap-5 sm:px-6 sm:py-6"
                >
                  <Icon aria-hidden className="mt-0.5 shrink-0 text-primary" size={28} strokeWidth={1.7} />
                  <div>
                    <h3 className="font-sans text-base font-bold sm:text-lg">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {body}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <Link
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 bg-primary px-7 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5"
              href="/products">
              Shop now <ArrowRight aria-hidden size={17} />
            </Link>
          </div>

          <div className="order-2 min-h-0 lg:order-2">
            <div className="lg:sticky lg:top-28">
              <div className="relative h-[min(55vh,32rem)] overflow-hidden bg-muted lg:h-[calc(100svh-7rem)]">
                <video
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  src="/images/hero/why-mornfreak.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="A person moving through their morning routine, fuelled by Mornfreak"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
