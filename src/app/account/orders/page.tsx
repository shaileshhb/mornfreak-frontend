import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { OrdersList } from "@/features/account";
import { getCurrentCustomer } from "@/lib/shopify-auth";
import { PRIVATE_ROUTE_METADATA } from "@/lib/seo";

export const metadata: Metadata = {
  ...PRIVATE_ROUTE_METADATA,
  title: "Orders",
  description: "Your Mornfreak orders.",
};

export default async function AccountOrders() {
  const customer = await getCurrentCustomer();

  if (!customer) {
    redirect("/?authError=token");
  }

  return <OrdersList customer={customer} />;
}
