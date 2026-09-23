import { NextRequest, NextResponse } from "next/server";

import { clearCartCookie, readCartId } from "@/features/cart/server";
import { getCurrentMarket } from "@/lib/market-server";
import {
  CartCurrencyMismatchError,
  CartOperationError,
  CatalogUnavailableError,
  fetchCart,
} from "@/lib/shopify-storefront";

export async function GET(request: NextRequest) {
  const market = await getCurrentMarket();
  const country = market.countryCode;
  const cartId = readCartId(request, country);

  if (!cartId) {
    return NextResponse.json({ cart: null });
  }

  try {
    const cart = await fetchCart(cartId, {
      country,
    });
    const response = NextResponse.json({ cart });

    if (!cart) {
      clearCartCookie(response, country);
    }

    return response;
  } catch (error) {
    if (error instanceof CatalogUnavailableError) {
      return NextResponse.json(
        { error: "Cart is temporarily unavailable" },
        { status: 503 },
      );
    }

    if (error instanceof CartCurrencyMismatchError) {
      return NextResponse.json(
        { error: error.message || "Cart market is out of sync" },
        { status: error.status },
      );
    }

    if (error instanceof CartOperationError) {
      const response = NextResponse.json({ cart: null });
      clearCartCookie(response, country);
      return response;
    }

    throw error;
  }
}

export async function DELETE() {
  const market = await getCurrentMarket();
  const response = NextResponse.json({ cart: null });
  clearCartCookie(response, market.countryCode);
  return response;
}
