import { PRODUCTS, type ProductId, type ProductTokens } from "@/design/tokens/products";

export function getProduct(id: ProductId): ProductTokens {
  return PRODUCTS[id];
}

export function isProductId(value: string): value is ProductId {
  return value in PRODUCTS;
}
