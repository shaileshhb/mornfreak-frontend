import { NextResponse } from "next/server";

import { getProductBySlug } from "@/features/products/api/get-product-by-slug";
import { getCurrentMarket } from "@/lib/market-server";
import { CatalogUnavailableError } from "@/lib/shopify-storefront";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

const MARKET_RESPONSE_HEADERS = {
  "Cache-Control": "no-store",
  Vary: "Cookie, x-vercel-ip-country",
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const market = await getCurrentMarket();
  let product;

  try {
    product = await getProductBySlug(slug, market.countryCode);
  } catch (error) {
    if (error instanceof CatalogUnavailableError) {
      return NextResponse.json(
        { error: "Product catalog is temporarily unavailable" },
        { headers: MARKET_RESPONSE_HEADERS, status: 503 },
      );
    }
    throw error;
  }

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { headers: MARKET_RESPONSE_HEADERS, status: 404 },
    );
  }

  return NextResponse.json(product, {
    headers: MARKET_RESPONSE_HEADERS,
  });
}
