import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { AuthCard } from "@/features/auth/auth-card";
import { VerifyEmailPanel } from "@/features/auth/verify-email-panel";

export const metadata: Metadata = {
  title: "Verify email",
  description: "Confirm your Mornfreak email address.",
};

export default function VerifyEmailPage() {
  return (
    <AuthCard
      kicker="Account"
      title="Verify email"
      titleClassName="whitespace-nowrap text-[clamp(1.75rem,5vw,2.85rem)]"
      footer={
        <>
          Need a new link?{" "}
          <Link
            href="/resend-verification"
            className="font-medium text-primary hover:underline"
          >
            Resend verification
          </Link>
        </>
      }
    >
      <Suspense
        fallback={
          <p className="font-sans text-sm text-muted-foreground">
            Verifying your email…
          </p>
        }
      >
        <VerifyEmailPanel />
      </Suspense>
    </AuthCard>
  );
}
