export const MARKET_COOKIE = "mf_market";
export const MARKET_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

export const SUPPORTED_MARKETS = {
  AE: {
    countryCode: "AE",
    currencyCode: "AED",
    label: "United Arab Emirates",
    locale: "en-AE",
    shortLabel: "UAE",
  },
  IN: {
    countryCode: "IN",
    currencyCode: "INR",
    label: "India",
    locale: "en-IN",
    shortLabel: "India",
  },
} as const;

export type MarketCode = keyof typeof SUPPORTED_MARKETS;
export type Market = (typeof SUPPORTED_MARKETS)[MarketCode];
export type MarketCountryCode = Market["countryCode"];

export const DEFAULT_MARKET = SUPPORTED_MARKETS.AE;

export function isMarketCode(value: unknown): value is MarketCode {
  return (
    typeof value === "string" &&
    Object.hasOwn(SUPPORTED_MARKETS, value.toUpperCase())
  );
}

export function getMarketByCode(value: unknown): Market {
  if (!isMarketCode(value)) return DEFAULT_MARKET;
  return SUPPORTED_MARKETS[value.toUpperCase() as MarketCode];
}

export function getMarketByVisitorCountry(value: unknown): Market {
  if (typeof value !== "string") return DEFAULT_MARKET;
  return value.trim().toUpperCase() === "IN"
    ? SUPPORTED_MARKETS.IN
    : DEFAULT_MARKET;
}

export function getMarketCode(market: Market): MarketCode {
  return market.countryCode as MarketCode;
}
