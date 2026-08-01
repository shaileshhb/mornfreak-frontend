import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { ALL_PRODUCTS } from "@/lib/products";
import { draft2Path } from "@/lib/draft2";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Mornfreak was built for the people who refuse to skip breakfast: the ones who train, work hard, and need real fuel.",
};

const VALUES = [
  {
    title: "Real Ingredients",
    body: "Every ingredient is there because it works: oats, peanuts, dates, seeds. Nothing synthetic, nothing unnecessary.",
  },
  {
    title: "Built for Mornings",
    body: "Designed around the constraints of a real morning: fast, easy, and genuinely nourishing. Not just \"healthy-ish\".",
  },
  {
    title: "No Compromise",
    body: "Protein targets met. Sugar kept to zero. Taste uncompromised. The brief was simple: don't make people choose.",
  },
  {
    title: "Clean Label",
    body: "Every ingredient is declared and deliberate. No hidden additives, no proprietary blends. What's on the label is everything that's in the bag.",
  },
];

export default function Draft2AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0">
          <Image
            src="/images/peanut_butter_powder_1.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/85 to-foreground/50"
          />
        </div>
        <Container className="relative z-10">
          <div className="flex max-w-xl flex-col gap-4">
            <Heading
              variant="display"
              className="text-primary-foreground"
              as="h1"
            >
              Why Mornfreak?
            </Heading>
            <Text variant="lead" className="text-primary-foreground/80">
              Because mornings are not the time to compromise.
            </Text>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl">
            <p className="font-sans text-base leading-relaxed text-foreground">
              Mornfreak started with a simple frustration: why does breakfast have to be boring, weak,
              or full of sugar just to taste good? We looked at the options on shelves and saw either
              bland &quot;health food&quot; nobody actually wanted to eat, or flavour-forward products loaded with
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
        </Container>
      </Section>

      <Section className="bg-secondary">
        <Container>
          <Heading variant="h2" className="mb-10">
            What We Stand For
          </Heading>
          <ul className="flex flex-col divide-y divide-border border-y border-border">
            {VALUES.map((value) => (
              <li
                key={value.title}
                className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-[220px_1fr] sm:gap-8"
              >
                <h3 className="font-display text-xl uppercase tracking-wide text-primary">
                  {value.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-10 flex flex-col gap-2">
            <Heading variant="h2">Our Products</Heading>
            <Text variant="lead">Two products. Zero compromise.</Text>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {ALL_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={draft2Path("/products")}
                className="group relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[4/3] w-full bg-secondary">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl uppercase tracking-wide text-primary-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-1 font-sans text-sm text-primary-foreground/80">
                      {product.tagline}
                    </p>
                    <span className="mt-3 inline-block font-sans text-sm font-semibold text-primary">
                      View products
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <section className="bg-foreground py-16">
        <Container>
          <div className="flex flex-col items-start gap-4 sm:items-center sm:text-center">
            <Heading variant="h2" className="text-primary-foreground">
              Follow the journey
            </Heading>
            <Text className="max-w-sm text-primary-foreground/60">
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
