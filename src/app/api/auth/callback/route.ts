import { NextRequest, NextResponse } from "next/server";

import {
  COOKIE,
  clearPkceCookies,
  exchangeAuthorizationCode,
  getShopifyAuthConfig,
  setSessionCookies,
  statesMatch,
} from "@/lib/shopify-auth";

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const loginError = (code: string) => {
    const response = NextResponse.redirect(new URL(`/login?error=${code}`, origin));
    clearPkceCookies(response);
    return response;
  };

  const code = request.nextUrl.searchParams.get("code");
  const returnedState = request.nextUrl.searchParams.get("state");
  const oauthError = request.nextUrl.searchParams.get("error");

  if (oauthError) {
    return loginError("denied");
  }

  if (!code || !returnedState) {
    return loginError("missing");
  }

  const expectedState = request.cookies.get(COOKIE.state)?.value;
  const codeVerifier = request.cookies.get(COOKIE.verifier)?.value;

  if (!expectedState || !codeVerifier || !statesMatch(expectedState, returnedState)) {
    return loginError("csrf");
  }

  let config: ReturnType<typeof getShopifyAuthConfig>;

  try {
    config = getShopifyAuthConfig();
  } catch {
    return loginError("config");
  }

  let tokens: Awaited<ReturnType<typeof exchangeAuthorizationCode>>;

  try {
    tokens = await exchangeAuthorizationCode({
      config,
      code,
      codeVerifier,
    });
  } catch {
    return loginError("token");
  }

  if (!tokens.access_token || !tokens.expires_in) {
    return loginError("token");
  }

  const response = NextResponse.redirect(new URL("/account", origin));
  clearPkceCookies(response);
  setSessionCookies(response, {
    accessToken: tokens.access_token,
    expiresIn: tokens.expires_in,
    idToken: tokens.id_token,
    refreshToken: tokens.refresh_token,
  });
  return response;
}
