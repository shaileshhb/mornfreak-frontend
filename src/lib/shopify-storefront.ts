import "server-only";

import type {
  CommerceProduct,
  CommerceVariant,
  Money,
} from "@/features/products/types";

const STOREFRONT_API_VERSION = "2026-07";
const LISTING_PRODUCTS_FIRST = 50;
const VARIANTS_FIRST = 50;
const STOREFRONT_REVALIDATE_SECONDS = 30;
const STOREFRONT_TIMEOUT_MS = 8_000;

const COMMERCE_FIELDS = /* GraphQL */ `
  id
  handle
  title
  description
  variants(first: ${VARIANTS_FIRST}) {
    nodes {
      id
      title
      sku
      availableForSale
      currentlyNotInStock
      quantityAvailable
      price {
        amount
        currencyCode
      }
      compareAtPrice {
        amount
        currencyCode
      }
      selectedOptions {
        name
        value
      }
    }
  }
`;

const LISTING_PRODUCTS_QUERY = /* GraphQL */ `
  query ListingProducts($first: Int!, $country: CountryCode!)
  @inContext(country: $country) {
    products(first: $first) {
      nodes {
        ${COMMERCE_FIELDS}
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!, $country: CountryCode!)
  @inContext(country: $country) {
    product(handle: $handle) {
      ${COMMERCE_FIELDS}
    }
  }
`;

type StorefrontConfig = {
  graphqlUrl: string;
  token: string;
  country: string;
};

type RawMoney = {
  amount?: string;
  currencyCode?: string;
};

type RawVariant = {
  id?: string;
  title?: string;
  sku?: string | null;
  availableForSale?: boolean;
  currentlyNotInStock?: boolean;
  quantityAvailable?: number | null;
  price?: RawMoney;
  compareAtPrice?: RawMoney | null;
  selectedOptions?: { name?: string; value?: string }[];
};

type RawProduct = {
  id?: string;
  handle?: string;
  title?: string;
  description?: string;
  variants?: { nodes?: RawVariant[] | null } | null;
};

type ListingProductsData = {
  products?: { nodes?: RawProduct[] | null } | null;
};

type ProductByHandleData = {
  product?: RawProduct | null;
};

export class CatalogUnavailableError extends Error {
  constructor(message = "The Shopify catalog is unavailable") {
    super(message);
    this.name = "CatalogUnavailableError";
  }
}

function getStorefrontConfig(): StorefrontConfig {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim();
  const country = (
    process.env.SHOPIFY_STOREFRONT_COUNTRY?.trim() || "AE"
  ).toUpperCase();

  if (!domain || !token) {
    throw new CatalogUnavailableError("Shopify Storefront env is not configured");
  }

  if (!/^[A-Z]{2}$/.test(country)) {
    throw new CatalogUnavailableError(
      "SHOPIFY_STOREFRONT_COUNTRY must be an ISO country code",
    );
  }

  return {
    graphqlUrl: `https://${domain}/api/${STOREFRONT_API_VERSION}/graphql.json`,
    token,
    country,
  };
}

function parseMoney(value: RawMoney | null | undefined): Money | null {
  if (!value?.amount || !value.currencyCode) return null;
  return { amount: value.amount, currencyCode: value.currencyCode };
}

function parseVariant(value: RawVariant): CommerceVariant | null {
  const price = parseMoney(value.price);
  if (!value.id || !value.title || !price) return null;

  return {
    id: value.id,
    title: value.title,
    sku: value.sku ?? null,
    availableForSale: value.availableForSale === true,
    currentlyNotInStock: value.currentlyNotInStock === true,
    quantityAvailable:
      typeof value.quantityAvailable === "number"
        ? value.quantityAvailable
        : null,
    price,
    compareAtPrice: parseMoney(value.compareAtPrice),
    selectedOptions: (value.selectedOptions ?? []).flatMap((option) =>
      option.name && option.value
        ? [{ name: option.name, value: option.value }]
        : [],
    ),
  };
}

function parseProduct(value: RawProduct): CommerceProduct | null {
  if (!value.id || !value.handle || !value.title) return null;

  const variants = (value.variants?.nodes ?? []).flatMap((variant) => {
    const parsed = parseVariant(variant);
    return parsed ? [parsed] : [];
  });

  if (variants.length === 0) return null;

  return {
    id: value.id,
    handle: value.handle,
    title: value.title,
    description: value.description ?? "",
    variants,
  };
}

async function storefrontGraphql<T>(
  query: string,
  variables: Record<string, unknown>,
  tags: string[],
): Promise<T> {
  const config = getStorefrontConfig();

  let response: Response;
  try {
    response = await fetch(config.graphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Shopify-Storefront-Private-Token": config.token,
        "User-Agent": "mornfreak-storefront",
      },
      body: JSON.stringify({
        query,
        variables: { ...variables, country: config.country },
      }),
      signal: AbortSignal.timeout(STOREFRONT_TIMEOUT_MS),
      next: { revalidate: STOREFRONT_REVALIDATE_SECONDS, tags },
    });
  } catch {
    throw new CatalogUnavailableError();
  }

  if (!response.ok) {
    throw new CatalogUnavailableError(`Shopify returned HTTP ${response.status}`);
  }

  let payload: {
    data?: T;
    errors?: { message?: string }[];
  };

  try {
    payload = (await response.json()) as typeof payload;
  } catch {
    throw new CatalogUnavailableError("Shopify returned an invalid response");
  }

  if (payload.errors?.length || !payload.data) {
    throw new CatalogUnavailableError("Shopify returned a GraphQL error");
  }

  return payload.data;
}

export async function fetchStorefrontProducts(): Promise<CommerceProduct[]> {
  const data = await storefrontGraphql<ListingProductsData>(
    LISTING_PRODUCTS_QUERY,
    { first: LISTING_PRODUCTS_FIRST },
    ["shopify:catalog"],
  );

  return (data.products?.nodes ?? []).flatMap((product) => {
    const parsed = parseProduct(product);
    return parsed ? [parsed] : [];
  });
}

export async function fetchStorefrontProduct(
  handle: string,
): Promise<CommerceProduct | null> {
  const data = await storefrontGraphql<ProductByHandleData>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
    ["shopify:catalog", `shopify:product:${handle}`],
  );

  return data.product ? parseProduct(data.product) : null;
}
