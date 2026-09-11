import { ALL_PRODUCTS } from "@/lib/products";
import { fetchStorefrontProducts } from "@/lib/shopify-storefront";
import type { ProductListing } from "../types";

import { composeListingProduct } from "./product-mappers";

export async function getListingProducts(): Promise<ProductListing[]> {
  const shopifyProducts = await fetchStorefrontProducts();
  const commerceByHandle = new Map(
    shopifyProducts.map((product) => [product.handle, product]),
  );

  // Preserve the intentional local merchandising order, but only include
  // products that Shopify publishes to the configured market.
  return ALL_PRODUCTS.flatMap((local) => {
    const commerce = commerceByHandle.get(local.shopifyHandle);
    if (!commerce) return [];
    const product = composeListingProduct(local, commerce);
    return product ? [product] : [];
  });
}
