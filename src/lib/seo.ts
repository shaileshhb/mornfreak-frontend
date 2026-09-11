import type { Metadata } from "next";

import type { ProductDetail, ProductListing } from "@/features/products/types";

export const SITE_URL = "https://mornfreak.com";
export const SITE_NAME = "MORNFREAK";
export const SITE_LOCALE = "en_AE";
export const SITE_LANGUAGE = "en-AE";

export const DEFAULT_DESCRIPTION =
  "Protein-forward breakfast for the UAE. Shop Mornfreak Protein Oats and Pure Peanut Butter Powder with clean ingredients and no added sugar.";

export const UAE_MARKET_DESCRIPTION =
  "Shop Mornfreak protein oats and peanut butter powder online in the UAE. High-protein breakfast staples with clean ingredients, no added sugar, and UAE delivery.";

export const PRIVATE_ROUTE_METADATA: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return new URL(path, SITE_URL).toString();
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/images/logo.avif"),
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@mornfreak.com",
      contactType: "customer support",
      areaServed: "AE",
      availableLanguage: ["en"],
    },
    sameAs: [
      "https://www.instagram.com/mornfreak",
      "https://www.tiktok.com/@mornfreak",
    ],
  };
}

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: SITE_LANGUAGE,
  };
}

export function createBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function availabilitySchema(availability: ProductListing["availability"]) {
  if (availability === "sold_out") return "https://schema.org/OutOfStock";
  if (availability === "backorder") return "https://schema.org/PreOrder";
  return "https://schema.org/InStock";
}

export function createProductJsonLd(product: ProductDetail) {
  const productUrl = absoluteUrl(`/products/${product.slug}`);
  const imageUrls = product.images.map((image) => absoluteUrl(image.url));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: imageUrls,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    sku: product.selectedVariant.sku ?? product.selectedVariant.id,
    url: productUrl,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: product.selectedVariant.price.currencyCode,
      price: product.selectedVariant.price.amount,
      availability: availabilitySchema(product.availability),
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      areaServed: {
        "@type": "Country",
        name: "United Arab Emirates",
      },
    },
    ...(product.reviews.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.reviews.averageRating.toFixed(1),
            reviewCount: product.reviews.count,
          },
          review: product.reviews.items.slice(0, 5).map((review) => ({
            "@type": "Review",
            author: {
              "@type": "Person",
              name: review.author,
            },
            datePublished: review.date,
            name: review.title,
            reviewBody: review.body,
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating,
              bestRating: 5,
              worstRating: 1,
            },
          })),
        }
      : {}),
  };
}
