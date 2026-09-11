import type {
  CommerceProduct,
  CommerceVariant,
  LocalProductDetail,
  ProductAvailability,
  ProductDetail,
  ProductListing,
} from "../types";
import type { ProductContent } from "@/lib/products";

export function getVariantAvailability(
  variant: CommerceVariant,
): ProductAvailability {
  // Mornfreak does not sell past tracked inventory, even if Shopify is
  // temporarily configured to continue selling an out-of-stock variant.
  if (variant.quantityAvailable === 0 || !variant.availableForSale) {
    return "sold_out";
  }

  if (variant.currentlyNotInStock) return "backorder";
  return "available";
}

export function selectDefaultVariant(
  variants: CommerceVariant[],
): CommerceVariant | null {
  return (
    variants.find(
      (variant) => getVariantAvailability(variant) === "available",
    ) ??
    variants.find(
      (variant) => getVariantAvailability(variant) === "backorder",
    ) ??
    variants[0] ??
    null
  );
}

export function selectListingVariant(
  variants: CommerceVariant[],
): CommerceVariant | null {
  const sellableVariants = variants.filter(
    (variant) => getVariantAvailability(variant) !== "sold_out",
  );
  const candidates = sellableVariants.length > 0 ? sellableVariants : variants;

  return (
    candidates.reduce<CommerceVariant | null>((lowest, variant) => {
      if (!lowest) return variant;

      return Number(variant.price.amount) < Number(lowest.price.amount)
        ? variant
        : lowest;
    }, null) ?? null
  );
}

export function composeListingProduct(
  local: ProductContent,
  commerce: CommerceProduct,
): ProductListing | null {
  const selectedVariant = selectListingVariant(commerce.variants);
  if (!selectedVariant) return null;

  const prices = new Set(
    commerce.variants.map(
      (variant) =>
        `${variant.price.amount}:${variant.price.currencyCode}`,
    ),
  );

  return {
    ...local,
    shopifyId: commerce.id,
    name: commerce.title,
    description: commerce.description,
    variants: commerce.variants,
    selectedVariant,
    availability: getVariantAvailability(selectedVariant),
    hasVariablePrice: prices.size > 1,
  };
}

export function composeProductDetail(
  local: LocalProductDetail,
  commerce: CommerceProduct,
): ProductDetail | null {
  const selectedVariant = selectDefaultVariant(commerce.variants);
  if (!selectedVariant) return null;

  return {
    ...local,
    shopifyId: commerce.id,
    name: commerce.title,
    description: commerce.description,
    variants: commerce.variants,
    selectedVariant,
    availability: getVariantAvailability(selectedVariant),
  };
}
