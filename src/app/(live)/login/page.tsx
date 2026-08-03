import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Mornfreak account. Account access is coming soon.",
};

export default function LoginPage() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <Container className="max-w-xl">
        <div className="border border-foreground/10 bg-[#fff9ef] px-6 py-12 text-center sm:px-10 sm:py-16">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Account
          </p>
          <h1 className="mt-4 font-display text-6xl uppercase leading-none tracking-wide sm:text-7xl">
            Login
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Account access is coming soon. We&apos;re building a cleaner way to
            manage your orders, favourites, and morning routine.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/products">
              <Button variant="primary" size="lg">
                Shop products
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
