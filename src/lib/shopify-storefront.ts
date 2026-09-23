import "server-only";

import type {
  Cart,
  CartLine,
  CommerceProduct,
  CommerceVariant,
  Money,
} from "@/features/products/types";
import {
  DEFAULT_MARKET,
  SUPPORTED_MARKETS,
  type MarketCountryCode,
} from "@/lib/markets";

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

const CART_FRAGMENT = /* GraphQL */ `
  id
  checkoutUrl
  totalQuantity
  lines(first: 50) {
    nodes {
      id
      quantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      merchandise {
        ... on ProductVariant {
          id
          title
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          product {
            title
            handle
            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  }
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
`;

const CART_QUERY = /* GraphQL */ `
  query Cart($cartId: ID!, $country: CountryCode!)
  @inContext(country: $country) {
    cart(id: $cartId) {
      ${CART_FRAGMENT}
    }
  }
`;

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate(
    $lines: [CartLineInput!],
    $buyerIdentity: CartBuyerIdentityInput!,
    $country: CountryCode!
  )
  @inContext(country: $country) {
    cartCreate(input: { lines: $lines, buyerIdentity: $buyerIdentity }) {
      cart {
        ${CART_FRAGMENT}
      }
      userErrors {
        field
        message
        code
      }
      warnings {
        message
      }
    }
  }
`;

const CART_BUYER_IDENTITY_UPDATE_MUTATION = /* GraphQL */ `
  mutation CartBuyerIdentityUpdate(
    $cartId: ID!,
    $buyerIdentity: CartBuyerIdentityInput!,
    $country: CountryCode!
  )
  @inContext(country: $country) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        ${CART_FRAGMENT}
      }
      userErrors {
        field
        message
        code
      }
      warnings {
        message
      }
    }
  }
`;

const CART_LINES_ADD_MUTATION = /* GraphQL */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!, $country: CountryCode!)
  @inContext(country: $country) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FRAGMENT}
      }
      userErrors {
        field
        message
        code
      }
      warnings {
        message
      }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = /* GraphQL */ `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!, $country: CountryCode!)
  @inContext(country: $country) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FRAGMENT}
      }
      userErrors {
        field
        message
        code
      }
      warnings {
        message
      }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = /* GraphQL */ `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!, $country: CountryCode!)
  @inContext(country: $country) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ${CART_FRAGMENT}
      }
      userErrors {
        field
        message
        code
      }
      warnings {
        message
      }
    }
  }
`;

type StorefrontConfig = {
  graphqlUrl: string;
  token: string;
};

type StorefrontRequestOptions = {
  cache?: "default" | "no-store";
  country?: MarketCountryCode;
  tags?: string[];
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

type RawCart = {
  id?: string;
  checkoutUrl?: string;
  totalQuantity?: number;
  lines?: {
    nodes?: RawCartLine[] | null;
  } | null;
  cost?: {
    subtotalAmount?: RawMoney | null;
    totalAmount?: RawMoney | null;
  } | null;
};

type RawCartLine = {
  id?: string;
  quantity?: number;
  cost?: {
    totalAmount?: RawMoney | null;
  } | null;
  merchandise?: {
    id?: string;
    title?: string;
    price?: RawMoney | null;
    selectedOptions?: { name?: string; value?: string }[];
    product?: {
      title?: string;
      handle?: string;
      featuredImage?: {
        url?: string;
        altText?: string | null;
      } | null;
    } | null;
  } | null;
};

type CartPayload = {
  cart?: RawCart | null;
  userErrors?: { field?: string[] | null; message?: string; code?: string }[];
  warnings?: { message?: string }[];
};

type CartData = {
  cart?: RawCart | null;
};

type CartCreateData = {
  cartCreate?: CartPayload | null;
};

type CartBuyerIdentityUpdateData = {
  cartBuyerIdentityUpdate?: CartPayload | null;
};

type CartLinesAddData = {
  cartLinesAdd?: CartPayload | null;
};

type CartLinesUpdateData = {
  cartLinesUpdate?: CartPayload | null;
};

type CartLinesRemoveData = {
  cartLinesRemove?: CartPayload | null;
};

type StorefrontCart = Cart & {
  checkoutUrl: string;
};

export class CatalogUnavailableError extends Error {
  constructor(message = "The Shopify catalog is unavailable") {
    super(message);
    this.name = "CatalogUnavailableError";
  }
}

export class CartOperationError extends Error {
  constructor(
    message = "Cart operation failed",
    public readonly status = 400,
  ) {
    super(message);
    this.name = "CartOperationError";
  }
}

export class CartCurrencyMismatchError extends CartOperationError {
  constructor(message = "Cart currency does not match the selected market") {
    super(message, 409);
    this.name = "CartCurrencyMismatchError";
  }
}

function getStorefrontConfig(): StorefrontConfig {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim();

  if (!domain || !token) {
    throw new CatalogUnavailableError("Shopify Storefront env is not configured");
  }

  return {
    graphqlUrl: `https://${domain}/api/${STOREFRONT_API_VERSION}/graphql.json`,
    token,
  };
}

function getShopifyStoreHost(): string {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  return domain
    ? domain.replace(/^https?:\/\//, "").replace(/\/$/, "").toLowerCase()
    : "";
}

function parseCheckoutUrl(value: string | undefined): string | null {
  if (!value) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  const allowedHost = getShopifyStoreHost();
  if (url.protocol !== "https:" || !allowedHost) return null;
  if (url.hostname.toLowerCase() !== allowedHost) return null;

  return url.toString();
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
  options: StorefrontRequestOptions = {},
): Promise<T> {
  const config = getStorefrontConfig();
  const headers = new Headers({
    "Content-Type": "application/json",
    "Shopify-Storefront-Private-Token": config.token,
    "User-Agent": "mornfreak-storefront",
  });

  let response: Response;
  try {
    response = await fetch(config.graphqlUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables: {
          ...variables,
          country: options.country ?? DEFAULT_MARKET.countryCode,
        },
      }),
      signal: AbortSignal.timeout(STOREFRONT_TIMEOUT_MS),
      ...(options.cache === "no-store"
        ? { cache: "no-store" as const }
        : {
            next: {
              revalidate: STOREFRONT_REVALIDATE_SECONDS,
              tags: options.tags ?? [],
            },
          }),
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

export async function fetchStorefrontProducts(
  country: MarketCountryCode = DEFAULT_MARKET.countryCode,
): Promise<CommerceProduct[]> {
  const data = await storefrontGraphql<ListingProductsData>(
    LISTING_PRODUCTS_QUERY,
    { first: LISTING_PRODUCTS_FIRST },
    { country, tags: ["shopify:catalog", `shopify:catalog:${country}`] },
  );

  return (data.products?.nodes ?? []).flatMap((product) => {
    const parsed = parseProduct(product);
    return parsed ? [parsed] : [];
  });
}

export async function fetchStorefrontProduct(
  handle: string,
  country: MarketCountryCode = DEFAULT_MARKET.countryCode,
): Promise<CommerceProduct | null> {
  const data = await storefrontGraphql<ProductByHandleData>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
    {
      country,
      tags: [
        "shopify:catalog",
        `shopify:catalog:${country}`,
        `shopify:product:${handle}`,
      ],
    },
  );

  return data.product ? parseProduct(data.product) : null;
}

function parseCartLine(value: RawCartLine): CartLine | null {
  const merchandise = value.merchandise;
  const product = merchandise?.product;
  const price = parseMoney(merchandise?.price);
  const total = parseMoney(value.cost?.totalAmount);

  if (
    !value.id ||
    typeof value.quantity !== "number" ||
    !merchandise?.id ||
    !merchandise.title ||
    !product?.title ||
    !product.handle ||
    !price ||
    !total
  ) {
    return null;
  }

  return {
    id: value.id,
    quantity: value.quantity,
    total,
    merchandise: {
      id: merchandise.id,
      title: merchandise.title,
      price,
      selectedOptions: (merchandise.selectedOptions ?? []).flatMap((option) =>
        option.name && option.value
          ? [{ name: option.name, value: option.value }]
          : [],
      ),
      product: {
        title: product.title,
        handle: product.handle,
        image: product.featuredImage?.url
          ? {
              url: product.featuredImage.url,
              alt: product.featuredImage.altText ?? product.title,
            }
          : null,
      },
    },
  };
}

function parseCart(value: RawCart | null | undefined): StorefrontCart | null {
  const checkoutUrl = parseCheckoutUrl(value?.checkoutUrl);
  const subtotal = parseMoney(value?.cost?.subtotalAmount);
  const total = parseMoney(value?.cost?.totalAmount);

  if (
    !value?.id ||
    !checkoutUrl ||
    typeof value.totalQuantity !== "number" ||
    !subtotal ||
    !total
  ) {
    return null;
  }

  return {
    totalQuantity: value.totalQuantity,
    checkoutUrl,
    subtotal,
    total,
    lines: (value.lines?.nodes ?? []).flatMap((line) => {
      const parsed = parseCartLine(line);
      return parsed ? [parsed] : [];
    }),
  };
}

function expectedCurrencyForCountry(country: MarketCountryCode): string {
  return (
    Object.values(SUPPORTED_MARKETS).find(
      (market) => market.countryCode === country,
    )?.currencyCode ?? DEFAULT_MARKET.currencyCode
  );
}

function isCartCurrencyValid(
  cart: StorefrontCart,
  country: MarketCountryCode,
): boolean {
  const expectedCurrency = expectedCurrencyForCountry(country);
  const cartCurrencies = [
    cart.subtotal.currencyCode,
    cart.total.currencyCode,
    ...cart.lines.flatMap((line) => [
      line.total.currencyCode,
      line.merchandise.price.currencyCode,
    ]),
  ];

  return cartCurrencies.every((currency) => currency === expectedCurrency);
}

function assertCartCurrency(
  cart: StorefrontCart,
  country: MarketCountryCode,
): void {
  if (!isCartCurrencyValid(cart, country)) {
    throw new CartCurrencyMismatchError();
  }
}

function validateCartPayload(payload: CartPayload | null | undefined): void {
  const error = payload?.userErrors?.find((item) => item.message);
  if (error?.message) {
    throw new CartOperationError(error.message);
  }
}

function cartFromPayload(
  payload: CartPayload | null | undefined,
  country: MarketCountryCode = DEFAULT_MARKET.countryCode,
): { cart: Cart; cartId: string } {
  validateCartPayload(payload);

  const cart = parseCart(payload?.cart);
  if (!cart || !payload?.cart?.id) {
    throw new CartOperationError("Cart is unavailable", 404);
  }

  assertCartCurrency(cart, country);

  return { cart: toPublicCart(cart), cartId: payload.cart.id };
}

function cartCheckoutFromPayload(
  payload: CartPayload | null | undefined,
  country: MarketCountryCode = DEFAULT_MARKET.countryCode,
): { cart: Cart; cartId: string; checkoutUrl: string } {
  validateCartPayload(payload);

  const cart = parseCart(payload?.cart);
  if (!cart || !payload?.cart?.id) {
    throw new CartOperationError("Cart is unavailable", 404);
  }

  assertCartCurrency(cart, country);

  return {
    cart: toPublicCart(cart),
    cartId: payload.cart.id,
    checkoutUrl: cart.checkoutUrl,
  };
}

async function updateCartBuyerIdentity(
  cartId: string,
  country: MarketCountryCode,
  options: StorefrontRequestOptions = {},
): Promise<{ cart: Cart; cartId: string; checkoutUrl: string }> {
  const data = await storefrontGraphql<CartBuyerIdentityUpdateData>(
    CART_BUYER_IDENTITY_UPDATE_MUTATION,
    { cartId, buyerIdentity: { countryCode: country } },
    { ...options, country, cache: "no-store" },
  );

  return cartCheckoutFromPayload(data.cartBuyerIdentityUpdate, country);
}

function toPublicCart(cart: StorefrontCart): Cart {
  return {
    lines: cart.lines,
    totalQuantity: cart.totalQuantity,
    subtotal: cart.subtotal,
    total: cart.total,
  };
}

export async function fetchCart(
  cartId: string,
  options: StorefrontRequestOptions = {},
): Promise<Cart | null> {
  const country = options.country ?? DEFAULT_MARKET.countryCode;
  const data = await storefrontGraphql<CartData>(
    CART_QUERY,
    { cartId },
    { ...options, cache: "no-store" },
  );

  const cart = parseCart(data.cart);
  if (!cart) return null;

  if (!isCartCurrencyValid(cart, country)) {
    const updated = await updateCartBuyerIdentity(cartId, country, options);
    return updated.cart;
  }

  return toPublicCart(cart);
}

export async function fetchCartCheckout(
  cartId: string,
  options: StorefrontRequestOptions = {},
): Promise<{ cart: Cart; checkoutUrl: string } | null> {
  const country = options.country ?? DEFAULT_MARKET.countryCode;
  const result = await updateCartBuyerIdentity(cartId, country, options);

  return { cart: result.cart, checkoutUrl: result.checkoutUrl };
}

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[],
  options: StorefrontRequestOptions = {},
): Promise<{ cart: Cart; cartId: string }> {
  const country = options.country ?? DEFAULT_MARKET.countryCode;
  const data = await storefrontGraphql<CartCreateData>(
    CART_CREATE_MUTATION,
    { lines, buyerIdentity: { countryCode: country } },
    { ...options, cache: "no-store" },
  );

  return cartFromPayload(data.cartCreate, country);
}

export async function addCartLines(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
  options: StorefrontRequestOptions = {},
): Promise<{ cart: Cart; cartId: string }> {
  const country = options.country ?? DEFAULT_MARKET.countryCode;
  await updateCartBuyerIdentity(cartId, country, options);

  const data = await storefrontGraphql<CartLinesAddData>(
    CART_LINES_ADD_MUTATION,
    { cartId, lines },
    { ...options, cache: "no-store" },
  );

  return cartFromPayload(data.cartLinesAdd, country);
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[],
  options: StorefrontRequestOptions = {},
): Promise<{ cart: Cart; cartId: string }> {
  const country = options.country ?? DEFAULT_MARKET.countryCode;
  await updateCartBuyerIdentity(cartId, country, options);

  const data = await storefrontGraphql<CartLinesUpdateData>(
    CART_LINES_UPDATE_MUTATION,
    { cartId, lines },
    { ...options, cache: "no-store" },
  );

  return cartFromPayload(data.cartLinesUpdate, country);
}

export async function removeCartLines(
  cartId: string,
  lineIds: string[],
  options: StorefrontRequestOptions = {},
): Promise<{ cart: Cart; cartId: string }> {
  const country = options.country ?? DEFAULT_MARKET.countryCode;
  await updateCartBuyerIdentity(cartId, country, options);

  const data = await storefrontGraphql<CartLinesRemoveData>(
    CART_LINES_REMOVE_MUTATION,
    { cartId, lineIds },
    { ...options, cache: "no-store" },
  );

  return cartFromPayload(data.cartLinesRemove, country);
}
