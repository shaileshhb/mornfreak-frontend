import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { AuthCard } from "@/features/auth/auth-card";
import { ResetPasswordForm } from "@/features/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Choose a new password for your Mornfreak account.",
};

export default function ResetPasswordPage() {
  return (
    <AuthCard
      kicker="Account"
      title="Reset password"
      description="Choose a new password. This signs you out everywhere else."
      footer={
        <>
          Changed your mind?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Back to login
          </Link>
        </>
      }
    >
      <Suspense
        fallback={
          <p className="font-sans text-sm text-muted-foreground">Loading…</p>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthCard>
  );
}
