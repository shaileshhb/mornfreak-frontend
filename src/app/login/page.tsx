import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { hasCustomerSession } from "@/lib/shopify-auth";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in or create a Mornfreak account.",
};

const ERROR_MESSAGES: Record<string, string> = {
  config: "Account login is not configured yet.",
  csrf: "That sign-in attempt expired. Try again.",
  denied: "Sign-in was cancelled.",
  missing: "Shopify did not return a valid authorization code.",
  token: "We could not complete sign-in. Try again.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const signedIn = await hasCustomerSession();
  const errorMessage = error ? ERROR_MESSAGES[error] : undefined;

  return (
    <section className="bg-background py-20 sm:py-28">
      <Container className="max-w-xl">
        <div className="border border-foreground/10 bg-card px-6 py-12 text-center sm:px-10 sm:py-16">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Account
          </p>
          <Heading variant="display" as="h1" className="mt-4 leading-none">
            {signedIn ? "You're in" : "Login"}
          </Heading>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {signedIn
              ? "You are signed in to your Mornfreak account."
              : "Sign in or create an account on Shopify. We'll send you back here after."}
          </p>
          {errorMessage ? (
            <p className="mx-auto mt-4 max-w-md text-sm text-destructive" role="alert">
              {errorMessage}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {signedIn ? (
              <>
                <Link href="/account">
                  <Button variant="primary" size="lg">
                    View account
                  </Button>
                </Link>
                <a href="/api/auth/logout">
                  <Button variant="outline" size="lg">
                    Log out
                  </Button>
                </a>
              </>
            ) : (
              <>
                <a href="/api/auth/login">
                  <Button variant="primary" size="lg">
                    Sign in
                  </Button>
                </a>
                <a href="/api/auth/register">
                  <Button variant="outline" size="lg">
                    Create account
                  </Button>
                </a>
              </>
            )}
          </div>
          <p className="mt-6">
            <Link
              href="/"
              className="font-sans text-sm font-medium text-foreground/70 underline-offset-4 hover:text-primary hover:underline"
            >
              Back to home
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
