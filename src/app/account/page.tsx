import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ProfilePage } from "@/features/account";
import { getCurrentCustomer } from "@/lib/shopify-auth";
import { PRIVATE_ROUTE_METADATA } from "@/lib/seo";

export const metadata: Metadata = {
  ...PRIVATE_ROUTE_METADATA,
  title: "Account",
  description: "Your Mornfreak account.",
};

export default async function Account() {
  const customer = await getCurrentCustomer();

  if (!customer) {
    redirect("/?authError=token");
  }

  return <ProfilePage customer={customer} />;
}
