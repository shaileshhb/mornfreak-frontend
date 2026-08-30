"use client";

import { resendVerification } from "./api";
import { EmailRequestForm } from "./email-request-form";

export function ResendVerificationForm() {
  return (
    <EmailRequestForm
      idPrefix="resend-verification"
      submitLabel="Send verification link"
      pendingLabel="Sending…"
      onSubmit={resendVerification}
    />
  );
}
