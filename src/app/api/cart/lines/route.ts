import { NextRequest, NextResponse } from "next/server";

import {
  clearCartCookie,
  getBuyerIp,
  readCartId,
  setCartCookie,
} from "@/features/cart/server";
import {
  addCartLines,
  CartOperationError,
  CatalogUnavailableError,
  createCart,
  removeCartLines,
  updateCartLines,
} from "@/lib/shopify-storefront";

type AddLineBody = {
  merchandiseId?: unknown;
  quantity?: unknown;
};

type UpdateLineBody = {
  lineId?: unknown;
  quantity?: unknown;
};

type RemoveLineBody = {
  lineId?: unknown;
};

function isValidId(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 500;
}

function parseQuantity(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isInteger(value)) return null;
  if (value < 1 || value > 99) return null;
  return value;
}

async function readJson<T>(request: NextRequest): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

function isStaleCartError(error: CartOperationError): boolean {
  const message = error.message.toLowerCase();
  return (
    message.includes("cart") &&
    (message.includes("exist") ||
      message.includes("invalid") ||
      message.includes("not found"))
  );
}

function cartErrorResponse(error: CartOperationError) {
  return NextResponse.json(
    { error: error.message || "Cart operation failed" },
    { status: error.status },
  );
}

export async function POST(request: NextRequest) {
  const body = await readJson<AddLineBody>(request);
  const merchandiseId = body?.merchandiseId;
  const quantity = parseQuantity(body?.quantity ?? 1);

  if (!isValidId(merchandiseId) || !quantity) {
    return NextResponse.json({ error: "Invalid cart line" }, { status: 400 });
  }

  const buyerIp = getBuyerIp(request);
  const lines = [{ merchandiseId, quantity }];
  const existingCartId = readCartId(request);

  try {
    const result = existingCartId
      ? await addCartLines(existingCartId, lines, { buyerIp })
      : await createCart(lines, { buyerIp });
    const response = NextResponse.json({ cart: result.cart });
    setCartCookie(response, result.cartId);
    return response;
  } catch (error) {
    if (
      existingCartId &&
      error instanceof CartOperationError &&
      isStaleCartError(error)
    ) {
      try {
        const result = await createCart(lines, { buyerIp });
        const response = NextResponse.json({ cart: result.cart });
        setCartCookie(response, result.cartId);
        return response;
      } catch (createError) {
        if (createError instanceof CatalogUnavailableError) {
          return NextResponse.json(
            { error: "Cart is temporarily unavailable" },
            { status: 503 },
          );
        }

        if (createError instanceof CartOperationError) {
          return cartErrorResponse(createError);
        }

        throw createError;
      }
    }

    if (error instanceof CatalogUnavailableError) {
      return NextResponse.json(
        { error: "Cart is temporarily unavailable" },
        { status: 503 },
      );
    }

    if (error instanceof CartOperationError) {
      return cartErrorResponse(error);
    }

    throw error;
  }
}

export async function PATCH(request: NextRequest) {
  const cartId = readCartId(request);
  if (!cartId) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  const body = await readJson<UpdateLineBody>(request);
  const lineId = body?.lineId;
  const quantity = parseQuantity(body?.quantity);

  if (!isValidId(lineId) || !quantity) {
    return NextResponse.json({ error: "Invalid cart line" }, { status: 400 });
  }

  try {
    const result = await updateCartLines(
      cartId,
      [{ id: lineId, quantity }],
      { buyerIp: getBuyerIp(request) },
    );
    const response = NextResponse.json({ cart: result.cart });
    setCartCookie(response, result.cartId);
    return response;
  } catch (error) {
    if (error instanceof CatalogUnavailableError) {
      return NextResponse.json(
        { error: "Cart is temporarily unavailable" },
        { status: 503 },
      );
    }

    if (error instanceof CartOperationError) {
      if (isStaleCartError(error)) {
        const response = NextResponse.json({ cart: null }, { status: 404 });
        clearCartCookie(response);
        return response;
      }
      return cartErrorResponse(error);
    }

    throw error;
  }
}

export async function DELETE(request: NextRequest) {
  const cartId = readCartId(request);
  if (!cartId) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  const body = await readJson<RemoveLineBody>(request);
  const lineId = body?.lineId;

  if (!isValidId(lineId)) {
    return NextResponse.json({ error: "Invalid cart line" }, { status: 400 });
  }

  try {
    const result = await removeCartLines(cartId, [lineId], {
      buyerIp: getBuyerIp(request),
    });
    const response = NextResponse.json({ cart: result.cart });
    setCartCookie(response, result.cartId);
    return response;
  } catch (error) {
    if (error instanceof CatalogUnavailableError) {
      return NextResponse.json(
        { error: "Cart is temporarily unavailable" },
        { status: 503 },
      );
    }

    if (error instanceof CartOperationError) {
      if (isStaleCartError(error)) {
        const response = NextResponse.json({ cart: null }, { status: 404 });
        clearCartCookie(response);
        return response;
      }
      return cartErrorResponse(error);
    }

    throw error;
  }
}
