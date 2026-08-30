"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";

import { AuthCard } from "./auth-card";
import { useAuth } from "./auth-provider";
import { Field } from "./form-field";
import { FormNotice } from "./form-notice";

export function LoginView() {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "signedIn") {
      router.replace("/products");
    }
  }, [status, router]);

  if (status === "loading" || status === "signedIn") {
    return (
      <AuthCard kicker="Account" title="Login">
        <p className="font-sans text-sm text-muted-foreground">
          {status === "signedIn" ? "Taking you to products…" : "Checking your session…"}
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      kicker="Account"
      title="Login"
      description="Sign in to manage your orders and your morning routine."
      footer={
        <>
          New here?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}

function LoginForm() {
  const { login } = useAuth();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unverifiedHint, setUnverifiedHint] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setError(null);
    setUnverifiedHint(false);
    setPending(true);

    try {
      await login({
        email: String(form.get("email") ?? ""),
        password: String(form.get("password") ?? ""),
      });
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 401) {
        // The API returns the same 401 for a wrong password and an
        // unverified email, so the copy has to cover both.
        setError("That email or password is wrong, or this email is not verified yet.");
        setUnverifiedHint(true);
      } else {
        setError(
          caught instanceof ApiError ? caught.message : "Something went wrong. Try again.",
        );
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {error ? (
        <FormNotice tone="error">
          {error}
          {unverifiedHint ? (
            <>
              {" "}
              <Link href="/resend-verification" className="font-medium underline">
                Resend the verification email
              </Link>
              .
            </>
          ) : null}
        </FormNotice>
      ) : null}

      <Field
        id="login-email"
        name="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        placeholder="your@email.com"
      />
      <Field
        id="login-password"
        name="password"
        label="Password"
        type="password"
        required
        maxLength={128}
        autoComplete="current-password"
        placeholder="Your password"
      />

      <Button type="submit" variant="primary" size="lg" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>

      <Link
        href="/forgot-password"
        className="text-center font-sans text-sm text-muted-foreground hover:text-primary hover:underline"
      >
        Forgot your password?
      </Link>
    </form>
  );
}
