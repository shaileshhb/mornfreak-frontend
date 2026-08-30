import type { Metadata } from "next";

import { RegisterView } from "@/features/auth/register-view";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a Mornfreak account to track orders and reorder faster.",
};

export default function RegisterPage() {
  return <RegisterView />;
}
