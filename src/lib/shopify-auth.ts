import "server-only";

import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

const SCOPE = "openid email customer-account-api:full";
const PKCE_MAX_AGE = 60 * 10;
const REFRESH_MAX_AGE = 60 * 60 * 24 * 30;
const ACCESS_EXPIRY_SKEW_SECONDS = 60;
const CUSTOMER_API_VERSION = "2026-07";

const ORDERS_PER_PAGE = 10;
const LINE_ITEMS_PER_ORDER = 3;

const CUSTOMER_QUERY = /* GraphQL */ `
  query CurrentCustomer($orders: Int!, $lineItems: Int!) {
    customer {
      id
      firstName
      lastName
      emailAddress {
        emailAddress
      }
      phoneNumber {
        phoneNumber
      }
      defaultAddress {
        formatted(withName: false)
      }
      orders(first: $orders, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          id
          name
          processedAt
          financialStatus
          fulfillmentStatus
          statusPageUrl
          totalPrice {
            amount
            currencyCode
          }
          lineItems(first: $lineItems) {
            nodes {
              title
            }
          }
        }
      }
    }
  }
`;

export const COOKIE = {
  verifier: "mf_ca_verifier",
  state: "mf_ca_state",
  access: "mf_ca_access",
  refresh: "mf_ca_refresh",
  idToken: "mf_ca_id",
  expiresAt: "mf_ca_expires",
} as const;

export type ShopifyAuthConfig = {
  shopId: string;
  clientId: string;
  appUrl: string;
  redirectUri: string;
  authorizeUrl: string;
  tokenUrl: string;
  logoutUrl: string;
  graphqlUrl: string;
};

export type CustomerOrder = {
  id: string;
  name: string;
  processedAt: string;
  financialStatus: string | null;
  fulfillmentStatus: string | null;
  statusPageUrl: string;
  total: { amount: string; currencyCode: string } | null;
  itemTitles: string[];
};

export type CurrentCustomer = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  /** Address lines already formatted by Shopify for the address' country. */
  addressLines: string[];
  orders: CustomerOrder[];
};

type CustomerQueryResult = {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  emailAddress?: { emailAddress?: string | null } | null;
  phoneNumber?: { phoneNumber?: string | null } | null;
  defaultAddress?: { formatted?: string[] } | null;
  orders?: {
    nodes?: {
      id: string;
      name: string;
      processedAt: string;
      financialStatus?: string | null;
      fulfillmentStatus?: string | null;
      statusPageUrl: string;
      totalPrice?: { amount: string; currencyCode: string } | null;
      lineItems?: { nodes?: { title: string }[] } | null;
    }[];
  } | null;
};

type TokenResponse = {
  access_token?: string;
  expires_in?: number;
  id_token?: string;
  refresh_token?: string;
};

export function getShopifyAuthConfig(): ShopifyAuthConfig {
  const shopId = process.env.SHOPIFY_SHOP_ID?.trim();
  const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID?.trim();
  const appUrl = process.env.SHOPIFY_APP_URL?.trim().replace(/\/$/, "");

  if (!shopId || !clientId || !appUrl) {
    throw new Error("Shopify Customer Account env is not configured");
  }

  return {
    shopId,
    clientId,
    appUrl,
    redirectUri: `${appUrl}/api/auth/callback`,
    authorizeUrl: `https://shopify.com/authentication/${shopId}/oauth/authorize`,
    tokenUrl: `https://shopify.com/authentication/${shopId}/oauth/token`,
    logoutUrl: `https://shopify.com/authentication/${shopId}/logout`,
    graphqlUrl: `https://shopify.com/${shopId}/account/customer/api/${CUSTOMER_API_VERSION}/graphql`,
  };
}

export function generateCodeVerifier(): string {
  return randomBytes(32).toString("base64url");
}

export function generateCodeChallenge(verifier: string): string {
  return createHash("sha256").update(verifier).digest("base64url");
}

export function generateState(): string {
  return randomBytes(16).toString("base64url");
}

export function statesMatch(expected: string, received: string): boolean {
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function cookieSecure(): boolean {
  const appUrl = process.env.SHOPIFY_APP_URL?.trim() ?? "https://";
  return !appUrl.startsWith("http://");
}

function pkceCookieOptions() {
  return {
    httpOnly: true,
    secure: cookieSecure(),
    sameSite: "lax" as const,
    path: "/api/auth",
    maxAge: PKCE_MAX_AGE,
  };
}

function tokenCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: cookieSecure(),
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export function buildAuthorizeUrl(
  config: ShopifyAuthConfig,
  params: { state: string; codeChallenge: string },
): string {
  const url = new URL(config.authorizeUrl);
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", config.redirectUri);
  url.searchParams.set("scope", SCOPE);
  url.searchParams.set("code_challenge", params.codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("state", params.state);
  return url.toString();
}

export function setPkceCookies(
  response: NextResponse,
  params: { verifier: string; state: string },
): void {
  const options = pkceCookieOptions();
  response.cookies.set(COOKIE.verifier, params.verifier, options);
  response.cookies.set(COOKIE.state, params.state, options);
}

export function clearPkceCookies(response: NextResponse): void {
  const options = { ...pkceCookieOptions(), maxAge: 0 };
  response.cookies.set(COOKIE.verifier, "", options);
  response.cookies.set(COOKIE.state, "", options);
}

async function postTokenRequest(
  config: ShopifyAuthConfig,
  body: URLSearchParams,
): Promise<TokenResponse> {
  const response = await fetch(config.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: config.appUrl,
      "User-Agent": "mornfreak-storefront",
    },
    body,
  });

  if (!response.ok) {
    throw new Error("token_request_failed");
  }

  return (await response.json()) as TokenResponse;
}

export async function exchangeAuthorizationCode(params: {
  config: ShopifyAuthConfig;
  code: string;
  codeVerifier: string;
}): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: params.config.clientId,
    redirect_uri: params.config.redirectUri,
    code: params.code,
    code_verifier: params.codeVerifier,
  });

  return postTokenRequest(params.config, body);
}

export async function exchangeRefreshToken(params: {
  config: ShopifyAuthConfig;
  refreshToken: string;
}): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: params.config.clientId,
    refresh_token: params.refreshToken,
  });

  return postTokenRequest(params.config, body);
}

export function setSessionCookies(
  response: NextResponse,
  tokens: {
    accessToken: string;
    expiresIn: number;
    idToken?: string;
    refreshToken?: string;
  },
): void {
  const accessMaxAge = Math.max(tokens.expiresIn, 60);
  const sessionMaxAge = tokens.refreshToken
    ? REFRESH_MAX_AGE
    : accessMaxAge;
  const expiresAt = String(Math.floor(Date.now() / 1000) + tokens.expiresIn);

  response.cookies.set(
    COOKIE.access,
    tokens.accessToken,
    tokenCookieOptions(accessMaxAge),
  );
  response.cookies.set(
    COOKIE.expiresAt,
    expiresAt,
    tokenCookieOptions(accessMaxAge),
  );

  if (tokens.idToken) {
    response.cookies.set(
      COOKIE.idToken,
      tokens.idToken,
      tokenCookieOptions(sessionMaxAge),
    );
  }

  if (tokens.refreshToken) {
    response.cookies.set(
      COOKIE.refresh,
      tokens.refreshToken,
      tokenCookieOptions(REFRESH_MAX_AGE),
    );
  }
}

export function clearSessionCookies(response: NextResponse): void {
  const names = [
    COOKIE.access,
    COOKIE.refresh,
    COOKIE.idToken,
    COOKIE.expiresAt,
  ] as const;

  for (const name of names) {
    response.cookies.set(name, "", tokenCookieOptions(0));
  }
}

export function buildLogoutUrl(config: ShopifyAuthConfig, idToken: string): string {
  const url = new URL(config.logoutUrl);
  url.searchParams.set("id_token_hint", idToken);
  url.searchParams.set("post_logout_redirect_uri", config.appUrl);
  return url.toString();
}

export function safeNextPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return "/account";
  }
  return value;
}

export async function hasCustomerSession(): Promise<boolean> {
  const store = await cookies();
  return Boolean(
    store.get(COOKIE.access)?.value || store.get(COOKIE.refresh)?.value,
  );
}

export async function readUnexpiredAccessToken(): Promise<string | null> {
  const store = await cookies();
  const access = store.get(COOKIE.access)?.value;
  if (!access) return null;

  const expiresAt = Number(store.get(COOKIE.expiresAt)?.value ?? 0);
  const now = Math.floor(Date.now() / 1000);
  if (expiresAt && expiresAt < now + ACCESS_EXPIRY_SKEW_SECONDS) {
    return null;
  }

  return access;
}

export async function hasRefreshToken(): Promise<boolean> {
  const store = await cookies();
  return Boolean(store.get(COOKIE.refresh)?.value);
}

export async function getCurrentCustomer(): Promise<CurrentCustomer | null> {
  const accessToken = await readUnexpiredAccessToken();
  if (!accessToken) return null;

  const config = getShopifyAuthConfig();
  const response = await fetch(config.graphqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
      Origin: config.appUrl,
    },
    body: JSON.stringify({
      query: CUSTOMER_QUERY,
      variables: {
        orders: ORDERS_PER_PAGE,
        lineItems: LINE_ITEMS_PER_ORDER,
      },
    }),
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as {
    data?: { customer?: CustomerQueryResult | null };
  };

  const customer = payload.data?.customer;
  if (!customer?.id) return null;

  return {
    id: customer.id,
    firstName: customer.firstName ?? null,
    lastName: customer.lastName ?? null,
    email: customer.emailAddress?.emailAddress ?? null,
    phone: customer.phoneNumber?.phoneNumber ?? null,
    addressLines: customer.defaultAddress?.formatted ?? [],
    orders: (customer.orders?.nodes ?? []).map((order) => ({
      id: order.id,
      name: order.name,
      processedAt: order.processedAt,
      financialStatus: order.financialStatus ?? null,
      fulfillmentStatus: order.fulfillmentStatus ?? null,
      statusPageUrl: order.statusPageUrl,
      total: order.totalPrice ?? null,
      itemTitles: (order.lineItems?.nodes ?? []).map((item) => item.title),
    })),
  };
}
