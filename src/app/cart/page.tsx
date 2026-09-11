import type { Metadata } from "next";

import { CartPage } from "@/features/cart/cart-page";
import { PRIVATE_ROUTE_METADATA } from "@/lib/seo";

export const metadata: Metadata = {
  ...PRIVATE_ROUTE_METADATA,
  title: "Cart",
  description: "Review your Mornfreak cart and continue to Shopify checkout.",
};

export default function Page() {
  return <CartPage />;
}
