"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";

import { resetPassword } from "./api";
import { Field } from "./form-field";
import { FormNotice } from "./form-notice";
import { getPasswordError, PASSWORD_HINT } from "./password-rules";

export function ResetPasswordForm() {
  const token = useSearchParams().get("token");

  if (!token) {
    return (
      <div className="flex flex-col gap-5">
        <FormNotice tone="error">
          This link is missing its reset token. Request a new one.
        </FormNotice>
        <Link href="/forgot-password">
          <Button variant="primary" size="lg" className="w-full">
            Request a new link
          </Button>
        </Link>
      </div>
    );
  }

  return <ResetPasswordFields token={token} />;
}

function ResetPasswordFields({ token }: { token: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const newPassword = String(form.get("newPassword") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    const passwordError = getPasswordError(newPassword);
    if (passwordError) {
      setError(null);
      setFieldError(passwordError);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(null);
      setFieldError("Both passwords must match.");
      return;
    }

    setError(null);
    setFieldError(null);
    setPending(true);

    try {
      const response = await resetPassword(token, newPassword);
      setSuccessMessage(response.message);
    } catch (caught) {
      if (caught instanceof ApiError) {
        setError(caught.message);
        setFieldError(caught.fieldErrors.newPassword ?? null);
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
        <Link href="/login">
          <Button variant="primary" size="lg" className="w-full">
            Go to login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {error ? <FormNotice tone="error">{error}</FormNotice> : null}
      <Field
        id="reset-password"
        name="newPassword"
        label="New password"
        type="password"
        required
        minLength={10}
        maxLength={128}
        autoComplete="new-password"
        hint={PASSWORD_HINT}
        error={fieldError ?? undefined}
      />
      <Field
        id="reset-password-confirm"
        name="confirmPassword"
        label="Confirm new password"
        type="password"
        required
        maxLength={128}
        autoComplete="new-password"
      />
      <Button type="submit" variant="primary" size="lg" disabled={pending}>
        {pending ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
