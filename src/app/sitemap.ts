import type { MetadataRoute } from "next";

import { ALL_PRODUCTS } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";

const publicRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/products", priority: 0.95, changeFrequency: "daily" },
  { path: "/ingredients", priority: 0.75, changeFrequency: "monthly" },
  { path: "/science", priority: 0.75, changeFrequency: "monthly" },
  { path: "/our-story", priority: 0.65, changeFrequency: "monthly" },
  { path: "/faqs", priority: 0.65, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/refund-policy", priority: 0.35, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.25, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.25, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...publicRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...ALL_PRODUCTS.map((product) => ({
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: product.images.map((image) => absoluteUrl(image)),
    })),
  ];
}
