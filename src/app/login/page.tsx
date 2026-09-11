import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { hasCustomerSession } from "@/lib/shopify-auth";
import { PRIVATE_ROUTE_METADATA } from "@/lib/seo";

export const metadata: Metadata = {
  ...PRIVATE_ROUTE_METADATA,
  title: "Login",
  description: "Sign in to your Mornfreak account.",
};

/**
 * Sign-in lives on Shopify. This route only keeps old /login links working.
 */
export default async function LoginPage() {
  redirect((await hasCustomerSession()) ? "/account" : "/api/auth/login");
}
