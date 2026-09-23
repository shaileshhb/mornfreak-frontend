import "server-only";

import type { NextRequest, NextResponse } from "next/server";

import { DEFAULT_MARKET, type MarketCountryCode } from "@/lib/markets";

const CART_COOKIE = "mf_cart";
const CART_MAX_AGE = 60 * 60 * 24 * 30;

function cartCookieName(country: MarketCountryCode): string {
  return `${CART_COOKIE}_${country}`;
}

function cookieSecure(): boolean {
  const appUrl = process.env.SHOPIFY_APP_URL?.trim() ?? "https://";
  return !appUrl.startsWith("http://");
}

function cartCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: cookieSecure(),
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

function isSafeStoredCartId(value: string | undefined): value is string {
  if (!value || value.length > 500) return false;
  return !/[\u0000-\u001f\u007f\s]/.test(value);
}

export function readCartId(
  request: NextRequest,
  country: MarketCountryCode,
): string | null {
  const value =
    request.cookies.get(cartCookieName(country))?.value ??
    (country === DEFAULT_MARKET.countryCode
      ? request.cookies.get(CART_COOKIE)?.value
      : undefined);
  return isSafeStoredCartId(value) ? value : null;
}

export function setCartCookie(
  response: NextResponse,
  cartId: string,
  country: MarketCountryCode,
): void {
  if (!isSafeStoredCartId(cartId)) return;
  response.cookies.set(
    cartCookieName(country),
    cartId,
    cartCookieOptions(CART_MAX_AGE),
  );
}

export function clearCartCookie(
  response: NextResponse,
  country: MarketCountryCode,
): void {
  response.cookies.set(cartCookieName(country), "", cartCookieOptions(0));
  if (country === DEFAULT_MARKET.countryCode) {
    response.cookies.set(CART_COOKIE, "", cartCookieOptions(0));
  }
}

export function getBuyerIp(request: NextRequest): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const value = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip");
  if (!value || value.length > 100) return null;
  return /^[a-zA-Z0-9.:_-]+$/.test(value) ? value : null;
}
