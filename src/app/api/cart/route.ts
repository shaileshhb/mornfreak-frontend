import { NextRequest, NextResponse } from "next/server";

import { clearCartCookie, getBuyerIp, readCartId } from "@/features/cart/server";
import {
  CartOperationError,
  CatalogUnavailableError,
  fetchCart,
} from "@/lib/shopify-storefront";

export async function GET(request: NextRequest) {
  const cartId = readCartId(request);

  if (!cartId) {
    return NextResponse.json({ cart: null });
  }

  try {
    const cart = await fetchCart(cartId, { buyerIp: getBuyerIp(request) });
    const response = NextResponse.json({ cart });

    if (!cart) {
      clearCartCookie(response);
    }

    return response;
  } catch (error) {
    if (error instanceof CatalogUnavailableError) {
      return NextResponse.json(
        { error: "Cart is temporarily unavailable" },
        { status: 503 },
      );
    }

    if (error instanceof CartOperationError) {
      const response = NextResponse.json({ cart: null });
      clearCartCookie(response);
      return response;
    }

    throw error;
  }
}

export async function DELETE() {
  const response = NextResponse.json({ cart: null });
  clearCartCookie(response);
  return response;
}
