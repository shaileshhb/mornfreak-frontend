import { ALL_PRODUCTS, type ProductContent } from "@/lib/products";
import { fetchStorefrontProducts } from "@/lib/shopify-storefront";

/**
 * Map Shopify handles that differ from local slugs.
 * Identity matching is the default (`handle` === `ProductContent.slug`).
 */
const SHOPIFY_HANDLE_TO_SLUG: Record<string, string> = {
  "protein-oats": "protein-oats-425g",
};

export async function getListingProducts(): Promise<ProductContent[]> {
  const shopifyProducts = await fetchStorefrontProducts();
  if (!shopifyProducts?.length) return ALL_PRODUCTS;

  const matchedSlugs = new Set<string>();

  for (const product of shopifyProducts) {
    const slug = SHOPIFY_HANDLE_TO_SLUG[product.handle] ?? product.handle;
    matchedSlugs.add(slug);
  }

  const ordered = ALL_PRODUCTS.filter((product) => matchedSlugs.has(product.slug));
  return ordered.length > 0 ? ordered : ALL_PRODUCTS;
}
