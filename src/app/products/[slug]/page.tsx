import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getProductBySlug,
  ProductDetailPage,
} from "@/features/products";
import {
  createBreadcrumbJsonLd,
  createProductJsonLd,
  safeJsonLd,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} UAE`,
    description: `${product.description} Shop online in the UAE from Mornfreak.`,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} UAE`,
      description: `${product.description} Shop online in the UAE from Mornfreak.`,
      images: product.images[0]
        ? [{ url: product.images[0].url, alt: product.images[0].alt }]
        : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const jsonLd = [
    createBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: product.name, path: `/products/${product.slug}` },
    ]),
    createProductJsonLd(product),
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
