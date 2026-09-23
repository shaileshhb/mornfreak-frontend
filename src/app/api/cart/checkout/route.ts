import { NextRequest, NextResponse } from "next/server";

import { clearCartCookie, readCartId } from "@/features/cart/server";
import { getCurrentMarket } from "@/lib/market-server";
import {
  CartCurrencyMismatchError,
  CartOperationError,
  CatalogUnavailableError,
  fetchCartCheckout,
} from "@/lib/shopify-storefront";

export async function POST(request: NextRequest) {
  const market = await getCurrentMarket();
  const country = market.countryCode;
  const cartId = readCartId(request, country);

  if (!cartId) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  try {
    const checkout = await fetchCartCheckout(cartId, {
      country,
    });

    if (!checkout || checkout.cart.totalQuantity < 1) {
      const response = NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 },
      );
      if (!checkout) clearCartCookie(response, country);
      return response;
    }

    return NextResponse.json({ checkoutUrl: checkout.checkoutUrl });
  } catch (error) {
    if (error instanceof CatalogUnavailableError) {
      return NextResponse.json(
        { error: "Checkout is temporarily unavailable" },
        { status: 503 },
      );
    }

    if (error instanceof CartCurrencyMismatchError) {
      return NextResponse.json(
        { error: error.message || "Checkout market is out of sync" },
        { status: error.status },
      );
    }

    if (error instanceof CartOperationError) {
      const response = NextResponse.json(
        { error: error.message || "Checkout is unavailable" },
        { status: error.status },
      );
      clearCartCookie(response, country);
      return response;
    }

    throw error;
  }
}
