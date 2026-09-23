import "server-only";

import { cookies, headers } from "next/headers";

import {
  getMarketByCode,
  getMarketByVisitorCountry,
  isMarketCode,
  MARKET_COOKIE,
} from "./markets";

const COUNTRY_HEADER_CANDIDATES = ["x-vercel-ip-country"] as const;

function getVisitorCountry(headerStore: Headers): string | null {
  if (process.env.VERCEL !== "1") return null;

  for (const header of COUNTRY_HEADER_CANDIDATES) {
    const value = headerStore.get(header)?.trim();
    if (value) return value;
  }

  return null;
}

export async function getCurrentMarket() {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const storedMarket = cookieStore.get(MARKET_COOKIE)?.value;

  if (isMarketCode(storedMarket)) {
    return getMarketByCode(storedMarket);
  }

  return getMarketByVisitorCountry(getVisitorCountry(headerStore));
}
