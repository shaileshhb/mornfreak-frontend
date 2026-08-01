import type { Metadata } from "next";

import { ProductPageLayout } from "@/features/products";
import { getProductContent } from "@/lib/products";

const product = getProductContent("peanutButter");

export const metadata: Metadata = {
  title: product.name,
  description: product.description,
  openGraph: {
    title: product.name,
    description: product.description,
    images: [{ url: product.heroImage, alt: product.name }],
  },
};

export default function PeanutButterPowderPage() {
  return <ProductPageLayout product={product} />;
}
