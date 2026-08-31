import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AccountPage } from "@/features/account";
import {
  getCurrentCustomer,
  hasRefreshToken,
  readUnexpiredAccessToken,
} from "@/lib/shopify-auth";

export const metadata: Metadata = {
  title: "Account",
  description: "Your Mornfreak account.",
};

export default async function Account() {
  if (!(await readUnexpiredAccessToken())) {
    redirect(
      (await hasRefreshToken())
        ? "/api/auth/refresh?next=/account"
        : "/api/auth/login",
    );
  }

  const customer = await getCurrentCustomer();

  // The session is valid but Shopify would not return the customer. Sending the
  // visitor back to login here would loop, so surface the failure instead.
  if (!customer) {
    redirect("/?authError=token");
  }

  return <AccountPage customer={customer} />;
}
