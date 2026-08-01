import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { ALL_PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Mornfreak was built for the people who refuse to skip breakfast: the ones who train, work hard, and need real fuel.",
};

// TODO: Replace all placeholder copy below with final brand-approved text.

const VALUES = [
  {
    icon: "🌾",
    title: "Real Ingredients",
    body: "Every ingredient is there because it works: oats, peanuts, dates, seeds. Nothing synthetic, nothing unnecessary.",
  },
  {
    icon: "🌅",
    title: "Built for Mornings",
    body: "Designed around the constraints of a real morning: fast, easy, and genuinely nourishing. Not just \"healthy-ish\".",
  },
  {
    icon: "⚡",
    title: "No Compromise",
    body: "Protein targets met. Sugar kept to zero. Taste uncompromised. The brief was simple: don't make people choose.",
  },
  {
    icon: "🏷️",
    title: "Clean Label",
    body: "Every ingredient is declared and deliberate. No hidden additives, no proprietary blends. What's on the label is everything that's in the bag.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero band */}
      <section className="bg-primary py-20">
        <Container>
          <div className="flex flex-col gap-4">
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
              Our Story
            </span>
            <Heading variant="display" className="text-primary-foreground max-w-lg" as="h1">
              Why Mornfreak?
            </Heading>
            <Text variant="lead" className="max-w-xl text-primary-foreground/80">
              {/* TODO: Replace with final copy */}
              Because mornings are not the time to compromise.
            </Text>
          </div>
        </Container>
      </section>

      {/* Brand narrative */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="prose prose-neutral max-w-none">
              {/* TODO: Replace paragraphs below with final brand copy. */}
              <p className="font-sans text-base leading-relaxed text-foreground">
                Mornfreak started with a simple frustration: why does breakfast have to be boring, weak,
                or full of sugar just to taste good? We looked at the options on shelves and saw either
                bland "health food" nobody actually wanted to eat, or flavour-forward products loaded with
                junk that undid every morning workout.
              </p>
              <p className="mt-5 font-sans text-base leading-relaxed text-foreground">
                We built Mornfreak for the people who train before sunrise, who commute far, who sit in
                long meetings and need to actually think clearly by 11am. The brief was uncompromising:
                high protein, zero added sugar, genuinely delicious. If it falls short, we don&apos;t ship it.
              </p>
              <p className="mt-5 font-sans text-base leading-relaxed text-foreground">
                Right now we have two products and a lot of conviction. Our Protein Oats bring 26g of
                protein per 100g with nothing hidden on the label. Our Pure Peanut Butter Powder gives
                you 100% peanut, 87% less fat. This is just the start. Morning has always belonged to
                the freaks who show up.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values grid */}
      <Section className="bg-secondary">
        <Container>
          <div className="flex flex-col gap-10">
            <div className="text-center">
              <Heading variant="h2">What We Stand For</Heading>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {VALUES.map((value) => (
                <div
                  key={value.title}
                  className="flex gap-4 rounded-xl border border-border bg-card p-6"
                >
                  <span className="text-3xl shrink-0" role="img" aria-hidden>
                    {value.icon}
                  </span>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-1.5 font-sans text-sm text-muted-foreground">{value.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Product teasers */}
      <Section>
        <Container>
          <div className="flex flex-col gap-10">
            <div className="text-center">
              <Heading variant="h2">Our Products</Heading>
              <Text variant="lead" className="mt-2">
                Two products. Zero compromise.
              </Text>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {ALL_PRODUCTS.map((product) => (
                <Link
                  key={product.id}
                  href="/products"
                  className="group relative overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={product.heroImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-display text-2xl uppercase tracking-wide text-primary-foreground">
                        {product.name}
                      </h3>
                      <p className="mt-1 font-sans text-sm text-primary-foreground/80">
                        {product.tagline}
                      </p>
                      <span className="mt-3 inline-block font-sans text-sm font-medium text-primary underline-offset-2 group-hover:underline">
                        View Product →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Instagram CTA */}
      <section className="bg-foreground py-16">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <Heading variant="h2" className="text-primary-foreground">
              Follow the journey
            </Heading>
            <Text className="text-primary-foreground/60 max-w-sm">
              We&apos;re just getting started. Stay in the loop on Instagram.
            </Text>
            <a
              href="https://www.instagram.com/mornfreak"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="lg">
                @mornfreak on Instagram
              </Button>
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
