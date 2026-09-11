import { cache } from "react";

import { ALL_PRODUCTS } from "@/lib/products";
import { fetchStorefrontProduct } from "@/lib/shopify-storefront";

import { LOCAL_PRODUCT_DETAILS } from "../fixtures/product-details";
import type { ProductDetail } from "../types";
import { composeProductDetail } from "./product-mappers";

/**
 * Compose Shopify commerce data with locally managed editorial content.
 * Shopify remains authoritative for publication, title, price and inventory.
 */
export const getProductBySlug = cache(
  async (slug: string): Promise<ProductDetail | null> => {
    const localSummary = ALL_PRODUCTS.find((product) => product.slug === slug);
    const localDetail = LOCAL_PRODUCT_DETAILS[slug];

    if (!localSummary || !localDetail) return null;

    const commerce = await fetchStorefrontProduct(localSummary.shopifyHandle);
    if (!commerce) return null;

    return composeProductDetail(localDetail, commerce);
  },
);
