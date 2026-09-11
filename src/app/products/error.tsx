"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

export default function ProductsError({ reset }: { reset: () => void }) {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card px-6 py-12 text-center">
          <Heading variant="h2" as="h1">
            Products are temporarily unavailable
          </Heading>
          <Text variant="muted" className="mt-3">
            We could not load current pricing and availability from Shopify.
            Please try again.
          </Text>
          <Button className="mt-6" onClick={reset}>
            Try again
          </Button>
        </div>
      </Container>
    </Section>
  );
}
