import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import {
  getCurrentCustomer,
  hasRefreshToken,
  readUnexpiredAccessToken,
} from "@/lib/shopify-auth";

export const metadata: Metadata = {
  title: "Account",
  description: "Your Mornfreak account.",
};

export default async function AccountPage() {
  const accessToken = await readUnexpiredAccessToken();

  if (!accessToken && (await hasRefreshToken())) {
    redirect("/api/auth/refresh?next=/account");
  }

  const customer = await getCurrentCustomer();

  if (!customer) {
    redirect("/login");
  }

  const name = [customer.firstName, customer.lastName].filter(Boolean).join(" ");

  return (
    <section className="bg-background py-20 sm:py-28">
      <Container className="max-w-xl">
        <div className="border border-foreground/10 bg-card px-6 py-12 text-center sm:px-10 sm:py-16">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Account
          </p>
          <Heading variant="display" as="h1" className="mt-4 leading-none">
            {name || "Your account"}
          </Heading>
          {customer.email ? (
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {customer.email}
            </p>
          ) : (
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              You are signed in.
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/products">
              <Button variant="primary" size="lg">
                Shop products
              </Button>
            </Link>
            <a href="/api/auth/logout">
              <Button variant="outline" size="lg">
                Log out
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
