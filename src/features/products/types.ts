import type { ProductId } from "@/types/product";

export type ProductImage = {
  url: string;
  alt: string;
};

export type ProductVariant = {
  id: string;
  label: string;
  sku: string;
  price: number;
  inStock: boolean;
};

export type ProductStat = {
  label: string;
  value: string;
};

export type ProductIngredient = {
  name: string;
  image: string;
  description: string;
  keyFeatures: string[];
};

export type NutritionRow = {
  label: string;
  value: string;
};

export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  body: string;
};

export type ProductReviews = {
  averageRating: number;
  count: number;
  items: ProductReview[];
};

export type ProductDetail = {
  id: ProductId;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  images: ProductImage[];
  price: number;
  compareAtPrice: number | null;
  currency: string;
  variants: ProductVariant[];
  stats: ProductStat[];
  trustBadges: string[];
  servingInfo: string;
  comingSoon: boolean;
  nutrition: NutritionRow[];
  ingredients: ProductIngredient[];
  reviews: ProductReviews;
};
