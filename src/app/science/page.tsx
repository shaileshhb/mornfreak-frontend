import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Dumbbell,
  Droplet,
  Sprout,
  TrendingDown,
  Wheat,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { MorningProgress } from "@/features/science/morning-progress";

export const metadata: Metadata = {
  title: "Science",
  description:
    "The science of better mornings. How protein oats and peanut butter powder work together as one daily habit.",
};

const FORMULA = [
  {
    eyebrow: "Nutrition",
    title: "Protein Oats",
    body: "Complex carbs, protein and fiber to fuel your day.",
    highlighted: false,
  },
  {
    eyebrow: "Protein Boost",
    title: "Peanut Butter Powder",
    body: "High protein, low fat nutrition for muscle support.",
    highlighted: false,
  },
  {
    eyebrow: "One Habit",
    title: "Full, Strong & Energized",
    body: "Balanced nutrition that works with your lifestyle.",
    highlighted: true,
  },
] as const;

type Benefit = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const OATS_BENEFITS: Benefit[] = [
  {
    icon: Dumbbell,
    title: "High Protein",
    body: "Supports muscle and strength.",
  },
  {
    icon: Wheat,
    title: "High Fiber",
    body: "Keeps you full for longer.",
  },
  {
    icon: Sprout,
    title: "Gut Friendly",
    body: "Prebiotic fiber from chicory root nourishes good gut bacteria.",
  },
  {
    icon: Zap,
    title: "Sustained Energy",
    body: "Complex carbs from oats & super seeds provide long-lasting energy.",
  },
];

const PB_BENEFITS: Benefit[] = [
  {
    icon: BadgeCheck,
    title: "100% Roasted Peanuts",
    body: "Made from premium quality peanuts.",
  },
  {
    icon: Droplet,
    title: "Defatted",
    body: "Fats removed for a lighter, cleaner option.",
  },
  {
    icon: Dumbbell,
    title: "High Protein",
    body: "More protein in every serving.",
  },
  {
    icon: TrendingDown,
    title: "Low Calories & Low Carbs",
    body: "Smarter choice for your daily nutrition.",
  },
];

const LIFESTYLE = [
  {
    title: "Fuel Your Day",
    body: "Our protein oats and Peanut Butter Powder are crafted to keep you full, focused and energized, every morning.",
    image: "/images/science/fuel-your-day.jpg",
    alt: "Couple sharing breakfast in a sunlit kitchen",
  },
  {
    title: "Built for Performance",
    body: "High-protein, clean ingredients and smart nutrition to support your training and recovery.",
    image: "/images/science/performance.jpeg",
    alt: "Athletes high-fiving over barbells after a workout",
  },
] as const;

function BenefitList({ benefits }: { benefits: Benefit[] }) {
  return (
    <ul className="mt-6 space-y-5">
      {benefits.map(({ icon: Icon, title, body }) => (
        <li key={title} className="flex gap-4">
          <Icon aria-hidden className="mt-0.5 shrink-0 text-primary" size={22} strokeWidth={1.7} />
          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
              {title}
            </p>
            <p className="mt-1 font-sans text-sm leading-relaxed text-muted-foreground">{body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function SciencePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <Image
          src="/images/science/banner.png"
          alt="Motion-blurred runner in a dark industrial setting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <Container className="relative z-10 flex min-h-[22rem] items-center justify-center py-16 text-center sm:min-h-[28rem] lg:min-h-[32rem]">
          <div className="max-w-3xl">
            <Heading variant="display" as="h1" className="text-paper leading-[0.92]">
              How It Works.
              <br />
              One Habit.
              <br />
              Big Impact.
            </Heading>
            <p className="mt-4 font-sans text-base text-paper/90 sm:text-lg">
              The Science of Better Mornings.
            </p>
          </div>
        </Container>
      </section>

      {/* Formula */}
      <Section>
        <Container className="max-w-[82rem]">
          <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:gap-3">
            {FORMULA.map((item, index) => (
              <div key={item.title} className="contents">
                {index > 0 && (
                  <div
                    className="flex items-center justify-center font-display text-2xl text-primary lg:px-1"
                    aria-hidden>
                    {index === 1 ? "+" : "="}
                  </div>
                )}
                <article
                  className={
                    item.highlighted
                      ? "flex-1 rounded-2xl border border-primary bg-primary p-6 text-primary-foreground sm:p-7"
                      : "flex-1 rounded-2xl border border-border bg-card p-6 sm:p-7"
                  }>
                  <p
                    className={
                      item.highlighted
                        ? "font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70"
                        : "font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary"
                    }>
                    {item.eyebrow}
                  </p>
                  <h2
                    className={
                      item.highlighted
                        ? "mt-2 font-display text-xl font-bold uppercase tracking-wide text-primary-foreground sm:text-xl"
                        : "mt-2 font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-2xl"
                    }
                  >
                    {item.title}
                  </h2>
                  <p
                    className={
                      item.highlighted
                        ? "mt-3 font-sans text-sm leading-relaxed text-primary-foreground/85"
                        : "mt-3 font-sans text-sm leading-relaxed text-muted-foreground"
                    }
                  >
                    {item.body}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Build a Better Morning */}
      <Section className="bg-secondary">
        <Container className="max-w-3xl text-center">
          <Heading variant="h2">Build a Better Morning.</Heading>
          <Text variant="lead" className="mt-4">
            Great mornings aren&apos;t built overnight. They&apos;re built with consistent, balanced
            nutrition.
          </Text>

          <MorningProgress />

          <Text className="mx-auto mt-10 max-w-2xl">
            Protein-rich oats, fiber, healthy fats, and clean ingredients work together to fuel your
            body, support digestion, and keep you satisfied throughout the morning.
          </Text>
        </Container>
      </Section>

      {/* Power of Smart Nutrition */}
      <Section>
        <Container className="max-w-[82rem]">
          <div className="text-center">
            <Heading variant="h2">The Power of Smart Nutrition.</Heading>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="rounded-lg bg-foreground px-4 py-3">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground">
                  Protein Oats
                </p>
              </div>
              <BenefitList benefits={OATS_BENEFITS} />
            </article>

            <article className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="rounded-lg bg-primary px-4 py-3">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground">
                  Peanut Butter Powder
                </p>
              </div>
              <BenefitList benefits={PB_BENEFITS} />
            </article>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <Text className="max-w-md font-medium">
              Backed by science. Made for real results.
            </Text>
            <Link href="/products">
              <Button variant="primary" size="lg" className="uppercase tracking-[0.12em]">
                Shop Mornfreak
                <ArrowRight aria-hidden size={17} />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Lifestyle pair */}
      <Section className="bg-secondary">
        <Container className="max-w-[82rem]">
          <div className="grid gap-8 md:grid-cols-2">
            {LIFESTYLE.map((item) => (
              <article key={item.title}>
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
