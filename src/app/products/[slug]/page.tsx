import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getProductBySlug,
  ProductDetailPage,
} from "@/features/products";
import {
  createBreadcrumbJsonLd,
  createProductJsonLd,
  marketDisplayName,
  marketTitleLabel,
  safeJsonLd,
} from "@/lib/seo";
import { getCurrentMarket } from "@/lib/market-server";
import {
  getMarketFromSearchParams,
  marketAlternates,
  marketPath,
  type MarketSearchParams,
} from "@/lib/market-routing";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<MarketSearchParams>;
};

async function resolveMarket(searchParams: Promise<MarketSearchParams>) {
  const params = await searchParams;
  return getMarketFromSearchParams(params) ?? (await getCurrentMarket());
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const market = await resolveMarket(searchParams);
  const product = await getProductBySlug(slug, market.countryCode);

  if (!product) {
    return { title: "Product not found" };
  }

  const title = `${product.name} ${marketTitleLabel(market)}`;
  const description = `${product.description} Shop online in ${marketDisplayName(market)} from Mornfreak.`;
  const path = `/products/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: marketPath(path, market),
      languages: marketAlternates(path),
    },
    openGraph: {
      title,
      description,
      images: product.images[0]
        ? [{ url: product.images[0].url, alt: product.images[0].alt }]
        : undefined,
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const market = await resolveMarket(searchParams);
  const product = await getProductBySlug(slug, market.countryCode);

  if (!product) {
    notFound();
  }

  const jsonLd = [
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: product.name, path: `/products/${product.slug}` },
    ]),
    createProductJsonLd(product, market),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(jsonLd),
        }}
      />
      <ProductDetailPage product={product} />
    </>
  );
}
