import { NextRequest, NextResponse } from "next/server";

import {
  buildAuthorizeUrl,
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
  getShopifyAuthConfig,
  setPkceCookies,
} from "@/lib/shopify-auth";

export async function GET(request: NextRequest) {
  let config: ReturnType<typeof getShopifyAuthConfig>;

  try {
    config = getShopifyAuthConfig();
  } catch {
    return NextResponse.redirect(
      new URL("/?authError=config", request.nextUrl.origin),
    );
  }

  const verifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(verifier);
  const state = generateState();
  const authorizeUrl = buildAuthorizeUrl(config, { state, codeChallenge });

  const response = NextResponse.redirect(authorizeUrl);
  setPkceCookies(response, { verifier, state });
  return response;
}
