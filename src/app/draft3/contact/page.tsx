import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";
import { Draft3ContactForm } from "@/features/draft3/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mornfreak. Questions, feedback, or just to say hi.",
};

export default function Draft3ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary pt-28 pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary to-orange"
        />
        <Container className="relative z-10">
          <div className="flex flex-col gap-3">
            <Heading variant="h1" className="text-primary-foreground" as="h1">
              Contact Us
            </Heading>
            <Text variant="lead" className="max-w-md text-primary-foreground/90">
              Questions, feedback, wholesale enquiries, or just to say hi.
              We&apos;re here.
            </Text>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="flex flex-col gap-8 lg:col-span-1">
              <div>
                <h2 className="font-sans text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Email
                </h2>
                <a
                  href="mailto:hello@mornfreak.com"
                  className="mt-1.5 block font-sans text-base text-foreground transition-colors hover:text-primary"
                >
                  hello@mornfreak.com
                </a>
              </div>
              <div>
                <h2 className="font-sans text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Instagram
                </h2>
                <a
                  href="https://www.instagram.com/mornfreak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 block font-sans text-base text-foreground transition-colors hover:text-primary"
                >
                  @mornfreak
                </a>
              </div>
              <div>
                <h2 className="font-sans text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Response time
                </h2>
                <p className="mt-1.5 font-sans text-base text-muted-foreground">
                  Within 24 hours, weekdays.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Draft3ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
