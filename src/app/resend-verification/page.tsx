import type { Metadata } from "next";
import Link from "next/link";

import { AuthCard } from "@/features/auth/auth-card";
import { ResendVerificationForm } from "@/features/auth/resend-verification-form";

export const metadata: Metadata = {
  title: "Resend verification",
  description: "Send yourself a new Mornfreak email verification link.",
};

export default function ResendVerificationPage() {
  return (
    <AuthCard
      kicker="Account"
      title="Verify your email"
      description="Verification links expire after 24 hours. Enter your email to get a fresh one."
      footer={
        <>
          Already verified?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Back to login
          </Link>
        </>
      }
    >
      <ResendVerificationForm />
    </AuthCard>
  );
}
