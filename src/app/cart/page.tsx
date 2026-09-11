import type { Metadata } from "next";

import { CartPage } from "@/features/cart/cart-page";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your Mornfreak cart and continue to Shopify checkout.",
};

export default function Page() {
  return <CartPage />;
}
