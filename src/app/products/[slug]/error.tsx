"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-background py-20 sm:py-28">
      <Container className="max-w-xl text-center">
        <Heading variant="h2" as="h1">
          Something went wrong
        </Heading>
        <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
          We couldn&apos;t load this product right now. Please try again.
        </p>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={reset}
          className="mt-8"
        >
          Try again
        </Button>
      </Container>
    </section>
  );
}
