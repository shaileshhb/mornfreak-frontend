import { NextRequest, NextResponse } from "next/server";

import { clearCartCookie, getBuyerIp, readCartId } from "@/features/cart/server";
import {
  CartOperationError,
  CatalogUnavailableError,
  fetchCartCheckout,
} from "@/lib/shopify-storefront";

export async function POST(request: NextRequest) {
  const cartId = readCartId(request);

  if (!cartId) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  try {
    const checkout = await fetchCartCheckout(cartId, {
      buyerIp: getBuyerIp(request),
    });

    if (!checkout || checkout.cart.totalQuantity < 1) {
      const response = NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 },
      );
      if (!checkout) clearCartCookie(response);
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

    if (error instanceof CartOperationError) {
      const response = NextResponse.json(
        { error: error.message || "Checkout is unavailable" },
        { status: error.status },
      );
      clearCartCookie(response);
      return response;
    }

    throw error;
  }
}
