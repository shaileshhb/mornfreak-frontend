"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";

import { register } from "./api";
import { AuthCard } from "./auth-card";
import { useAuth } from "./auth-provider";
import { COUNTRIES, DEFAULT_COUNTRY_CODE } from "./countries";
import { Field, SelectField } from "./form-field";
import { FormNotice } from "./form-notice";
import { getPasswordError, PASSWORD_HINT } from "./password-rules";
import { SignedInPanel } from "./signed-in-panel";

export function RegisterView() {
  const { status } = useAuth();

  if (status === "loading") {
    return (
      <AuthCard kicker="Account" title="Create account">
        <p className="font-sans text-sm text-muted-foreground">
          Checking your session…
        </p>
      </AuthCard>
    );
  }

  if (status === "signedIn") {
    return (
      <AuthCard
        kicker="Account"
        title="You're signed in"
        description="Log out first if you want to create another account."
      >
        <SignedInPanel />
      </AuthCard>
    );
  }

  return (
    <AuthCard
      kicker="Account"
      title="Create account"
      width="wide"
      description="We need a shipping address so your first order can go out the moment you place it."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}

function optionalValue(form: FormData, key: string): string | undefined {
  const value = String(form.get(key) ?? "").trim();
  return value.length > 0 ? value : undefined;
}

function RegisterForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const name = String(form.get("name") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const passwordError = getPasswordError(password);
    if (passwordError) {
      setError(null);
      setFieldErrors({ password: passwordError });
      return;
    }

    setError(null);
    setFieldErrors({});
    setPending(true);

    try {
      const response = await register({
        name,
        email: String(form.get("email") ?? "").trim(),
        password,
        phone: optionalValue(form, "phone"),
        address: {
          type: "SHIPPING",
          fullName: optionalValue(form, "address.fullName") ?? name,
          line1: String(form.get("address.line1") ?? "").trim(),
          line2: optionalValue(form, "address.line2"),
          city: String(form.get("address.city") ?? "").trim(),
          state: optionalValue(form, "address.state"),
          country: String(form.get("address.country") ?? ""),
          postalCode: String(form.get("address.postalCode") ?? "").trim(),
        },
      });
      setSuccessMessage(response.message);
    } catch (caught) {
      if (caught instanceof ApiError) {
        setError(caught.message);
        setFieldErrors(caught.fieldErrors);
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setPending(false);
    }
  }

  if (successMessage) {
    return (
      <div className="flex flex-col gap-5">
        <FormNotice tone="success">{successMessage}</FormNotice>
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          Open the link in that email to verify your address, then sign in.{" "}
          <Link
            href="/resend-verification"
            className="font-medium text-primary hover:underline"
          >
            Didn&apos;t get it?
          </Link>
        </p>
        <Link href="/login">
          <Button variant="outline" size="lg" className="w-full">
            Go to login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      {error ? <FormNotice tone="error">{error}</FormNotice> : null}

      <fieldset className="flex flex-col gap-5">
        <legend className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Your details
        </legend>
        <Field
          id="register-name"
          name="name"
          label="Name"
          required
          maxLength={100}
          autoComplete="name"
          placeholder="Your name"
          error={fieldErrors.name}
        />
        <Field
          id="register-email"
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          error={fieldErrors.email}
        />
        <Field
          id="register-password"
          name="password"
          label="Password"
          type="password"
          required
          minLength={10}
          maxLength={128}
          autoComplete="new-password"
          hint={PASSWORD_HINT}
          error={fieldErrors.password}
        />
        <Field
          id="register-phone"
          name="phone"
          label="Phone"
          type="tel"
          optional
          autoComplete="tel"
          placeholder="+91 98765 43210"
          error={fieldErrors.phone}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Shipping address
        </legend>
        <Field
          id="register-address-fullName"
          name="address.fullName"
          label="Recipient name"
          optional
          maxLength={120}
          autoComplete="shipping name"
          placeholder="Same as your name"
          error={fieldErrors["address.fullName"]}
        />
        <Field
          id="register-address-line1"
          name="address.line1"
          label="Address line 1"
          required
          maxLength={200}
          autoComplete="shipping address-line1"
          placeholder="House number and street"
          error={fieldErrors["address.line1"]}
        />
        <Field
          id="register-address-line2"
          name="address.line2"
          label="Address line 2"
          optional
          maxLength={200}
          autoComplete="shipping address-line2"
          placeholder="Apartment, landmark"
          error={fieldErrors["address.line2"]}
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            id="register-address-city"
            name="address.city"
            label="City"
            required
            maxLength={100}
            autoComplete="shipping address-level2"
            error={fieldErrors["address.city"]}
          />
          <Field
            id="register-address-state"
            name="address.state"
            label="State"
            optional
            maxLength={100}
            autoComplete="shipping address-level1"
            error={fieldErrors["address.state"]}
          />
          <Field
            id="register-address-postalCode"
            name="address.postalCode"
            label="Postal code"
            required
            minLength={2}
            maxLength={16}
            autoComplete="shipping postal-code"
            error={fieldErrors["address.postalCode"]}
          />
          <SelectField
            id="register-address-country"
            name="address.country"
            label="Country"
            required
            defaultValue={DEFAULT_COUNTRY_CODE}
            autoComplete="shipping country"
            error={fieldErrors["address.country"]}
          >
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </SelectField>
        </div>
      </fieldset>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="sm:self-start"
        disabled={pending}
      >
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
