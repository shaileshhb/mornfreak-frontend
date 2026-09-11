import { NextResponse } from "next/server";

import { getProductBySlug } from "@/features/products/api/get-product-by-slug";
import { CatalogUnavailableError } from "@/lib/shopify-storefront";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  let product;

  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    if (error instanceof CatalogUnavailableError) {
      return NextResponse.json(
        { error: "Product catalog is temporarily unavailable" },
        { status: 503 },
      );
    }
    throw error;
  }

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
