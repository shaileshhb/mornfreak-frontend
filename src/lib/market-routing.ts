import {
  DEFAULT_MARKET,
  SUPPORTED_MARKETS,
  getMarketByCode,
  getMarketCode,
  isMarketCode,
  type Market,
} from "@/lib/markets";

export type MarketSearchParams = {
  market?: string | string[];
};

export function getMarketFromSearchParams(
  searchParams: MarketSearchParams | null | undefined,
): Market | null {
  const value = Array.isArray(searchParams?.market)
    ? searchParams.market[0]
    : searchParams?.market;

  return isMarketCode(value) ? getMarketByCode(value) : null;
}

export function marketPath(path: string, market: Market): string {
  const code = getMarketCode(market);
  return `${path}?market=${code}`;
}

export function marketAlternates(path: string) {
  return {
    [SUPPORTED_MARKETS.AE.locale]: marketPath(path, SUPPORTED_MARKETS.AE),
    [SUPPORTED_MARKETS.IN.locale]: marketPath(path, SUPPORTED_MARKETS.IN),
    "x-default": marketPath(path, DEFAULT_MARKET),
  };
}
