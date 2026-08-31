import { NextRequest, NextResponse } from "next/server";

import {
  COOKIE,
  buildLogoutUrl,
  clearPkceCookies,
  clearSessionCookies,
  getShopifyAuthConfig,
} from "@/lib/shopify-auth";

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const idToken = request.cookies.get(COOKIE.idToken)?.value;

  let destination = new URL("/", origin);

  try {
    const config = getShopifyAuthConfig();
    if (idToken) {
      destination = new URL(buildLogoutUrl(config, idToken));
    }
  } catch {
    destination = new URL("/", origin);
  }

  const response = NextResponse.redirect(destination);
  clearPkceCookies(response);
  clearSessionCookies(response);
  return response;
}
