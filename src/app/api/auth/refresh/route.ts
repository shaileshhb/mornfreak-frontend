import { NextRequest, NextResponse } from "next/server";

import {
  COOKIE,
  clearSessionCookies,
  exchangeRefreshToken,
  getShopifyAuthConfig,
  safeNextPath,
  setSessionCookies,
} from "@/lib/shopify-auth";

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const next = safeNextPath(request.nextUrl.searchParams.get("next"));
  const refreshToken = request.cookies.get(COOKIE.refresh)?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/api/auth/login", origin));
  }

  let config: ReturnType<typeof getShopifyAuthConfig>;

  try {
    config = getShopifyAuthConfig();
  } catch {
    return NextResponse.redirect(new URL("/?authError=config", origin));
  }

  try {
    const tokens = await exchangeRefreshToken({ config, refreshToken });

    if (!tokens.access_token || !tokens.expires_in) {
      throw new Error("token_request_failed");
    }

    const response = NextResponse.redirect(new URL(next, origin));
    setSessionCookies(response, {
      accessToken: tokens.access_token,
      expiresIn: tokens.expires_in,
      idToken: tokens.id_token,
      refreshToken: tokens.refresh_token,
    });
    return response;
  } catch {
    const response = NextResponse.redirect(new URL("/?authError=token", origin));
    clearSessionCookies(response);
    return response;
  }
}
