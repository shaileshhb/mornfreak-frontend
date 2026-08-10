import { PRODUCT_DETAIL_FIXTURES } from "../fixtures/product-details";
import type { ProductDetail } from "../types";

/**
 * Fetch a product detail by slug.
 *
 * Currently served from a local fixture. To wire the live API, replace the
 * body with a one-line fetch against GET /api/products/{slug} (or your backend).
 */
export async function getProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  // LIVE API SWAP:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`, { next: { revalidate: 60 } });
  // if (res.status === 404) return null;
  // if (!res.ok) throw new Error("Failed to load product");
  // return res.json() as Promise<ProductDetail>;

  const product = PRODUCT_DETAIL_FIXTURES[slug] ?? null;

  // Simulate async boundary so loading.tsx / Suspense behave like a real fetch.
  await Promise.resolve();

  return product;
}

export async function getAllProductSlugs(): Promise<string[]> {
  return Object.keys(PRODUCT_DETAIL_FIXTURES);
}
