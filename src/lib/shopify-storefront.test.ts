import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const originalEnv = { ...process.env };

function cartPayload(checkoutUrl: string) {
  return {
    data: {
      cartCreate: {
        cart: {
          id: "gid://shopify/Cart/cart-1",
          checkoutUrl,
          totalQuantity: 1,
          lines: {
            nodes: [
              {
                id: "gid://shopify/CartLine/line-1",
                quantity: 1,
                cost: {
                  totalAmount: { amount: "299.00", currencyCode: "INR" },
                },
                merchandise: {
                  id: "gid://shopify/ProductVariant/variant-1",
                  title: "Default Title",
                  price: { amount: "299.00", currencyCode: "INR" },
                  selectedOptions: [{ name: "Title", value: "Default Title" }],
                  product: {
                    title: "Protein Oats",
                    handle: "protein-oats",
                    featuredImage: null,
                  },
                },
              },
            ],
          },
          cost: {
            subtotalAmount: { amount: "299.00", currencyCode: "INR" },
            totalAmount: { amount: "299.00", currencyCode: "INR" },
          },
        },
        userErrors: [],
        warnings: [],
      },
    },
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
  process.env = { ...originalEnv };
});

describe("createCart", () => {
  it("accepts Shopify checkout URLs hosted on a different HTTPS domain", async () => {
    process.env.SHOPIFY_STORE_DOMAIN = "morn-freak.myshopify.com";
    process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN = "test-token";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json(
          cartPayload("https://www.mornfreak.com/checkouts/cn/cart-1"),
        ),
      ),
    );

    const { createCart } = await import("./shopify-storefront");
    const result = await createCart(
      [{ merchandiseId: "gid://shopify/ProductVariant/variant-1", quantity: 1 }],
      { country: "IN" },
    );

    expect(result.cartId).toBe("gid://shopify/Cart/cart-1");
    expect(result.cart.totalQuantity).toBe(1);
  });
});
