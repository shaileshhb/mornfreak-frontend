import type { ProductId } from "@/types/product";
import type { ProductContent } from "@/lib/products";

export type Money = {
  amount: string;
  currencyCode: string;
};

export type ProductAvailability = "available" | "backorder" | "sold_out";

export type CommerceVariant = {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  currentlyNotInStock: boolean;
  quantityAvailable: number | null;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: { name: string; value: string }[];
};

export type CommerceProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  variants: CommerceVariant[];
};

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

export type LocalProductDetail = {
  id: ProductId;
  slug: string;
  label: string;
  tagline: string;
  images: ProductImage[];
  overlayBadge?: string;
  galleryCallouts?: ProductGalleryCallout[];
  stats: ProductStat[];
  trustBadges: string[];
  servingInfo: string;
  howToUse: ProductHowToUseStep[];
  howToUseMedia?: ProductHowToUseMedia;
  ingredientStatement: string;
  nutrition: NutritionRow[];
  nutritionCaption: string;
  ingredients: ProductIngredient[];
  proofPoints: ProductProofPoint[];
  reviews: ProductReviews;
};

export type ProductDetail = LocalProductDetail & {
  shopifyId: string;
  name: string;
  description: string;
  variants: CommerceVariant[];
  selectedVariant: CommerceVariant;
  availability: ProductAvailability;
};

export type ProductListing = ProductContent & {
  shopifyId: string;
  name: string;
  description: string;
  variants: CommerceVariant[];
  selectedVariant: CommerceVariant;
  availability: ProductAvailability;
  hasVariablePrice: boolean;
};
