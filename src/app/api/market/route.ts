import { NextRequest, NextResponse } from "next/server";

import {
  getMarketByCode,
  getMarketCode,
  isMarketCode,
  MARKET_COOKIE,
  MARKET_COOKIE_MAX_AGE,
} from "@/lib/markets";

type MarketBody = {
  market?: unknown;
};

function cookieSecure(): boolean {
  const appUrl = process.env.SHOPIFY_APP_URL?.trim() ?? "https://";
  return !appUrl.startsWith("http://");
}

async function readJson<T>(request: NextRequest): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

function isSameOriginRequest(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).host === request.nextUrl.host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { error: "Invalid request origin" },
      { status: 403 },
    );
  }

  const body = await readJson<MarketBody>(request);
  const market = body?.market;

  if (!isMarketCode(market)) {
    return NextResponse.json({ error: "Unsupported market" }, { status: 400 });
  }

  const selectedMarket = getMarketByCode(market);
  const response = NextResponse.json({ market: selectedMarket });

  response.cookies.set(MARKET_COOKIE, getMarketCode(selectedMarket), {
    httpOnly: true,
    maxAge: MARKET_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: cookieSecure(),
  });

  return response;
}
