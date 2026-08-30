"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";

import { verifyEmail } from "./api";
import { FormNotice } from "./form-notice";

type VerifyState =
  | { kind: "verifying" }
  | { kind: "verified"; message: string }
  | { kind: "failed"; message: string };

export function VerifyEmailPanel() {
  const token = useSearchParams().get("token");
  const [state, setState] = useState<VerifyState>({ kind: "verifying" });
  // Verification tokens are single-use, so the request must not run twice.
  const requested = useRef(false);

  useEffect(() => {
    if (!token || requested.current) return;
    requested.current = true;

    verifyEmail(token)
      .then((response) => setState({ kind: "verified", message: response.message }))
      .catch((caught) =>
        setState({
          kind: "failed",
          message:
            caught instanceof ApiError
              ? caught.message
              : "Something went wrong. Try again.",
        }),
      );
  }, [token]);

  if (!token) {
    return (
      <div className="flex flex-col gap-5">
        <FormNotice tone="error">
          This link is missing its verification token.
        </FormNotice>
        <Link href="/resend-verification">
          <Button variant="primary" size="lg" className="w-full">
            Send a new link
          </Button>
        </Link>
      </div>
    );
  }

  if (state.kind === "verifying") {
    return (
      <p className="font-sans text-sm text-muted-foreground">
        Verifying your email…
      </p>
    );
  }

  if (state.kind === "verified") {
    return (
      <div className="flex flex-col gap-5">
        <FormNotice tone="success">{state.message}</FormNotice>
        <Link href="/login">
          <Button variant="primary" size="lg" className="w-full">
            Go to login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <FormNotice tone="error">
        {state.message} Verification links expire after 24 hours and work only
        once.
      </FormNotice>
      <Link href="/resend-verification">
        <Button variant="primary" size="lg" className="w-full">
          Send a new link
        </Button>
      </Link>
    </div>
  );
}
