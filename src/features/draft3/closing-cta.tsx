import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { draft3Path } from "@/lib/draft3";

export function Draft3ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-foreground py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-orange/25"
      />
      <Container className="relative z-10">
        <div className="flex flex-col items-start gap-6 sm:items-center sm:text-center">
          <Heading
            variant="display"
            className="text-primary-foreground"
            as="h2"
          >
            Heat the morning.
          </Heading>
          <Text variant="lead" className="max-w-md text-primary-foreground/75">
            Stop settling for a weak start. Fuel up, show up, and own the day.
          </Text>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.instagram.com/mornfreak"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="primary"
                size="lg"
                className="bg-orange text-orange-foreground hover:bg-orange/90"
              >
                Follow @mornfreak
              </Button>
            </a>
            <Link href={draft3Path("/contact")}>
              <Button
                variant="ghost"
                size="lg"
                className="border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Contact us
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
