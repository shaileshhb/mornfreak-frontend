import type { ProductId } from "@/types/product";

export type ProductImage = {
  url: string;
  alt: string;
};

export type ProductStat = {
  label: string;
  value: string;
};

export type ProductIngredient = {
  name: string;
  image: string;
  imageAlt: string;
  description: string;
  keyFeatures: string[];
};

export type ProductHowToUseStep = {
  text: string;
};

export type ProductHowToUseMedia = ProductImage & {
  shape: "portrait" | "square";
  caption: string;
};

export type ProductProofPointIcon =
  | "zap"
  | "leaf"
  | "droplet"
  | "check"
  | "clock"
  | "wheat"
  | "shield"
  | "dumbbell";

export type ProductProofPoint = {
  label: string;
  icon: ProductProofPointIcon;
};

export type ProductGalleryCalloutIcon =
  | ProductProofPointIcon
  | "heart"
  | "scale";

export type ProductGalleryCallout = {
  icon: ProductGalleryCalloutIcon;
  label: string;
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
  label: string;
  name: string;
  tagline: string;
  description: string;
  images: ProductImage[];
  overlayBadge?: string;
  galleryCallouts?: ProductGalleryCallout[];
  price: number;
  compareAtPrice: number | null;
  currency: string;
  stats: ProductStat[];
  trustBadges: string[];
  servingInfo: string;
  comingSoon: boolean;
  howToUse: ProductHowToUseStep[];
  howToUseMedia?: ProductHowToUseMedia;
  ingredientStatement: string;
  nutrition: NutritionRow[];
  nutritionCaption: string;
  ingredients: ProductIngredient[];
  proofPoints: ProductProofPoint[];
  reviews: ProductReviews;
};
