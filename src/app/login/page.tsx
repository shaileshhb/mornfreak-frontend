import { redirect } from "next/navigation";

import { hasCustomerSession } from "@/lib/shopify-auth";

/**
 * Sign-in lives on Shopify. This route only keeps old /login links working.
 */
export default async function LoginPage() {
  redirect((await hasCustomerSession()) ? "/account" : "/api/auth/login");
}
