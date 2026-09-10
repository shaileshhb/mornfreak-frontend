import "server-only";

const STOREFRONT_API_VERSION = "2026-07";
const LISTING_PRODUCTS_FIRST = 50;

const LISTING_PRODUCTS_QUERY = /* GraphQL */ `
  query ListingProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        handle
      }
    }
  }
`;

export type StorefrontProduct = {
  id: string;
  handle: string;
};

type StorefrontConfig = {
  graphqlUrl: string;
  token: string;
};

type ListingProductsData = {
  products?: {
    nodes?: StorefrontProduct[] | null;
  } | null;
};

function getStorefrontConfig(): StorefrontConfig | null {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
  const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim();

  if (!domain || !token) return null;

  return {
    graphqlUrl: `https://${domain}/api/${STOREFRONT_API_VERSION}/graphql.json`,
    token,
  };
}

function storefrontHeaders(token: string, mode: "private" | "public"): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (mode === "private") {
    headers["Shopify-Storefront-Private-Token"] = token;
  } else {
    headers["X-Shopify-Storefront-Access-Token"] = token;
  }

  return headers;
}

async function storefrontGraphql<T>(
  config: StorefrontConfig,
  query: string,
  variables: Record<string, unknown>,
  mode: "private" | "public",
): Promise<{ ok: true; data: T } | { ok: false; status: number }> {
  const response = await fetch(config.graphqlUrl, {
    method: "POST",
    headers: storefrontHeaders(config.token, mode),
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    return { ok: false, status: response.status };
  }

  const payload = (await response.json()) as { data?: T; errors?: unknown };

  if (!payload.data) {
    return { ok: false, status: response.status };
  }

  return { ok: true, data: payload.data };
}

/**
 * Published Storefront catalog (handle + id). Returns null on missing env or API failure.
 */
export async function fetchStorefrontProducts(): Promise<StorefrontProduct[] | null> {
  const config = getStorefrontConfig();
  if (!config) return null;

  try {
    let result = await storefrontGraphql<ListingProductsData>(
      config,
      LISTING_PRODUCTS_QUERY,
      { first: LISTING_PRODUCTS_FIRST },
      "private",
    );

    if (!result.ok && (result.status === 401 || result.status === 403)) {
      result = await storefrontGraphql<ListingProductsData>(
        config,
        LISTING_PRODUCTS_QUERY,
        { first: LISTING_PRODUCTS_FIRST },
        "public",
      );
    }

    if (!result.ok) return null;

    return (result.data.products?.nodes ?? []).filter(
      (node): node is StorefrontProduct => Boolean(node?.id && node.handle),
    );
  } catch {
    return null;
  }
}
