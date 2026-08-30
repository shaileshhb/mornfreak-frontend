"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";

import { Field } from "./form-field";
import { FormNotice } from "./form-notice";

type EmailRequestFormProps = {
  idPrefix: string;
  submitLabel: string;
  pendingLabel: string;
  onSubmit: (email: string) => Promise<{ message: string }>;
};

/**
 * Shared shape for the two endpoints that take only an email and answer with a
 * deliberately generic message: forgot-password and resend-verification.
 */
export function EmailRequestForm({
  idPrefix,
  submitLabel,
  pendingLabel,
  onSubmit,
}: EmailRequestFormProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setError(null);
    setPending(true);

    try {
      const response = await onSubmit(String(form.get("email") ?? "").trim());
      setSuccessMessage(response.message);
    } catch (caught) {
      setError(
        caught instanceof ApiError
          ? (caught.fieldErrors.email ?? caught.message)
          : "Something went wrong. Try again.",
      );
    } finally {
      setPending(false);
    }
  }

  if (successMessage) {
    return <FormNotice tone="success">{successMessage}</FormNotice>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {error ? <FormNotice tone="error">{error}</FormNotice> : null}
      <Field
        id={`${idPrefix}-email`}
        name="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        placeholder="your@email.com"
      />
      <Button type="submit" variant="primary" size="lg" disabled={pending}>
        {pending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}
