import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

import { FaqContent } from "./faq-content";

export function FaqPage() {
  return (
    <>
      <Section className="pb-0">
        <Container className="max-w-5xl">
          <header className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-sm text-muted-foreground">Have a question?</p>
            <Heading variant="h1" as="h1" className="mt-3">
              Frequently Asked Questions
            </Heading>
            <p className="mt-4 font-sans text-base text-muted-foreground sm:text-lg">
              Everything you need to know about Mornfreak Protein Oats and Peanut Butter Powder.
            </p>
          </header>

          <FaqContent />
        </Container>
      </Section>

      <Section>
        <Container className="max-w-5xl">
          <div className="rounded-2xl bg-cocoa-espresso px-6 py-10 text-center sm:px-10 sm:py-12">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-toasted-almond">
              Still have questions?
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-wide text-oat-cream sm:text-4xl">
              We&apos;re here.
            </h2>
            <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-oat-cream/70 sm:text-base">
              Drop us a line and we&apos;ll get back to you within 24 hours on weekdays.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "uppercase tracking-[0.12em]",
                )}
              >
                Contact us
              </Link>
              <a
                href="mailto:hello@mornfreak.com"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-oat-cream/25 bg-transparent uppercase tracking-[0.12em] text-oat-cream hover:bg-oat-cream/10 hover:text-oat-cream",
                )}
              >
                hello@mornfreak.com
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
