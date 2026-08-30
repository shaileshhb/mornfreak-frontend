import type { Metadata } from "next";

import { LoginView } from "@/features/auth/login-view";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Mornfreak account.",
};

export default function LoginPage() {
  return <LoginView />;
}
