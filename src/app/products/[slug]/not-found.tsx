import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export default function NotFound() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <Container className="max-w-xl text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
          404
        </p>
        <Heading variant="h2" as="h1" className="mt-3">
          Product not found
        </Heading>
        <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
          That product isn&apos;t in our catalogue — or the link may be outdated.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 font-sans text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Back to shop
        </Link>
      </Container>
    </section>
  );
}
