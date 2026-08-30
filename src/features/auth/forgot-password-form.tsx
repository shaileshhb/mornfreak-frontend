"use client";

import { forgotPassword } from "./api";
import { EmailRequestForm } from "./email-request-form";

export function ForgotPasswordForm() {
  return (
    <EmailRequestForm
      idPrefix="forgot-password"
      submitLabel="Send reset link"
      pendingLabel="Sending…"
      onSubmit={forgotPassword}
    />
  );
}
