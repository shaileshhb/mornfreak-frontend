import type { ProductReview, ProductReviews } from "../types";

export function toProductReviews(items: ProductReview[]): ProductReviews {
  const sum = items.reduce((total, item) => total + item.rating, 0);
  const averageRating = Math.round((sum / items.length) * 10) / 10;

  return {
    averageRating,
    count: items.length,
    items,
  };
}
